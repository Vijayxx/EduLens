import os
from flask import Blueprint, redirect, url_for, session, jsonify
from flask_dance.contrib.google import make_google_blueprint, google
from sqlalchemy import text
from app import app, engine

auth_bp = Blueprint("auth", __name__)

# Google OAuth setup
app.secret_key = os.getenv("SECRET_KEY", "supersecret")
google_bp = make_google_blueprint(
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    scope=["profile", "email"],
    redirect_url="/auth/callback"
)
app.register_blueprint(google_bp, url_prefix="/login")

@auth_bp.route("/auth/callback")
def callback():
    if not google.authorized:
        return redirect(url_for("google.login"))

    resp = google.get("/oauth2/v2/userinfo")
    if not resp.ok:
        return jsonify({"error": "Google login failed"}), 400

    user_info = resp.json()
    email = user_info["email"]

    # check or insert into users table
    stmt = text("SELECT user_id, role FROM users WHERE username=:u")
    with engine.connect() as conn:
        row = conn.execute(stmt, {"u": email}).fetchone()

    if not row:
        # default new users → student role
        stmt = text("INSERT INTO users (username, password_hash, role) VALUES (:u, '', 'student') RETURNING user_id, role")
        with engine.begin() as conn:
            row = conn.execute(stmt, {"u": email}).fetchone()

    user_id, role = row
    session["user"] = {"email": email, "role": role}

    return redirect("http://localhost:8080/")  # frontend home

@auth_bp.route("/auth/me")
def me():
    if "user" not in session:
        return jsonify({"error": "not logged in"}), 401
    return jsonify(session["user"])