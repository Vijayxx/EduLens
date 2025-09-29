import pandas as pd
from sqlalchemy import create_engine

# DB connection details (change if needed)
USER = "vijay"
PASSWORD = "Vijay%40007"
HOST = "localhost"
PORT = "5432"
DB = "student_performance"

# create connection
engine = create_engine(f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}")

# pull the feature view
query = "SELECT * FROM student_features;"
df = pd.read_sql(query, engine)

print(df.head())
print("\nShape of dataset:", df.shape)
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# features + label
X = df[["entry_gpa", "attendance_pct", "avg_assessment"]]
y = df["at_risk"]

# split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# predictions
y_pred = model.predict(X_test)

print("\nModel Performance:\n")
print(classification_report(y_test, y_pred))

import matplotlib.pyplot as plt

importances = model.feature_importances_
features = X.columns

plt.bar(features, importances)
plt.title("Feature Importance")
plt.ylabel("Importance")
plt.show()