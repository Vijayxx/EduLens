import os
import urllib.parse
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()  # loads .env

DB_USER = os.getenv("DB_USER", "vijay")
DB_PASS = os.getenv("DB_PASS", "")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "student_performance")

# URL-encode password (handles @, :, spaces)
DB_PASS_ENC = urllib.parse.quote_plus(DB_PASS)
DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASS_ENC}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# create engine
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

app = Flask(__name__)
CORS(app)  # allow cross-origin for dev

# Try to load ML model (optional)
MODEL = None
MODEL_PATH = os.getenv("MODEL_PATH", "risk_predictor.pkl")
try:
    import joblib
    if os.path.exists(MODEL_PATH):
        MODEL = joblib.load(MODEL_PATH)
        print("Loaded model:", MODEL_PATH)
    else:
        print("Model file not found at", MODEL_PATH)
except Exception as e:
    print("Model load failed:", e)
    MODEL = None

@app.route("/api/health")
def health():
    return jsonify({"status":"ok"})

# Return rows from student_features view (adjust SELECT as needed)
@app.route("/api/students")
def get_students():
    q = text("""
        SELECT student_id, name, entry_gpa, socio_econ, course_id, course_code, attendance_pct, final_score, at_risk
        FROM student_features
        LIMIT 2000;
    """)
    with engine.connect() as conn:
        df = pd.read_sql(q, conn)
    # Ensure JSON serializable types
    if 'at_risk' in df.columns:
        df['at_risk'] = df['at_risk'].astype(bool)
    recs = df.to_dict(orient='records')
    return jsonify(recs)

# Course-level aggregated stats for dashboard
@app.route("/api/courses")
def get_courses():
    q = text("""
        SELECT c.course_id, c.code, c.title,
               ROUND(AVG(f.final_score)::numeric,2) AS avg_final_score,
               ROUND(100.0 * SUM(CASE WHEN f.at_risk THEN 1 ELSE 0 END) / NULLIF(COUNT(f.*),0),2) AS risk_pct
        FROM courses c
        JOIN enroll e ON c.course_id = e.course_id
        JOIN finals f ON e.enroll_id = f.enroll_id
        GROUP BY c.course_id, c.code, c.title
        ORDER BY c.code;
    """)
    with engine.connect() as conn:
        df = pd.read_sql(q, conn)
    recs = df.to_dict(orient='records')
    return jsonify(recs)

# Run predictions using saved model (optional)
# POST /api/predict  { "enroll_ids": [1,2,3] }   OR POST empty to predict all
@app.route("/api/predict", methods=["POST"])
def predict():
    if MODEL is None:
        return jsonify({"error":"model not available on server"}), 503

    body = request.json or {}
    enroll_ids = body.get("enroll_ids", None)

    # Build data frame to predict: use the same features you trained on
    q_base = "SELECT enroll_id, entry_gpa, attendance_pct, avg_assessment FROM student_features"
    if enroll_ids:
        # safe paramized query
        ids_tuple = tuple(enroll_ids)
        q = text(q_base + " WHERE enroll_id IN :ids")
        with engine.connect() as conn:
            df = pd.read_sql(q, conn, params={"ids": ids_tuple})
    else:
        q = text(q_base)
        with engine.connect() as conn:
            df = pd.read_sql(q, conn)

    if df.empty:
        return jsonify([])

    # Ensure columns exist & ordered; use same columns as model expects
    X = df[["entry_gpa","attendance_pct","avg_assessment"]].fillna(0)
    preds = MODEL.predict(X)
    df["predicted_risk"] = preds.astype(bool)

    # Optionally write predictions back to DB (create/replace predictions table)
    out = df[["enroll_id","predicted_risk"]].copy()
    # write using pandas to_sql (replace)
    try:
        out.to_sql("predictions", engine, if_exists="replace", index=False)
    except Exception as e:
        print("Warning: unable to write predictions table:", e)

    recs = df.to_dict(orient="records")
    return jsonify(recs)

# Log an intervention (faculty can POST here)
@app.route("/api/intervention", methods=["POST"])
def add_intervention():
    data = request.json or {}
    enroll_id = data.get("enroll_id")
    itype = data.get("type", "tutoring")
    notes = data.get("notes", "")
    if not enroll_id:
        return jsonify({"error":"missing enroll_id"}), 400

    stmt = text("INSERT INTO intervention_logs (enroll_id, intervention_type, notes) VALUES (:enroll_id,:itype,:notes)")
    with engine.begin() as conn:
        conn.execute(stmt, {"enroll_id": enroll_id, "itype": itype, "notes": notes})
    return jsonify({"status":"ok"})

if __name__ == "__main__":
    # debug mode for dev only
    app.run(host="0.0.0.0", port=5001, debug=True)