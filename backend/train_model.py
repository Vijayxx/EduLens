import pandas as pd
from sqlalchemy import create_engine, text
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# connect to DB
engine = create_engine("postgresql+psycopg2://vijay@localhost:5432/student_performance")

# fetch features
q = text("SELECT entry_gpa, attendance_pct, final_score, at_risk FROM student_features;")
df = pd.read_sql(q, engine)

# X = features, y = label
X = df[["entry_gpa", "attendance_pct", "final_score"]].fillna(0)
y = df["at_risk"].astype(int)

# split + train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# save model
joblib.dump(model, "risk_predictor.pkl")
print("✅ Model trained & saved as risk_predictor.pkl")