import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.utils import resample
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import pickle

# ========= Load Dataset =========
# Load your Excel dataset (update filename if needed)
data = pd.read_csv(r"E:\Projects\DripTect\Flood Predictor Model ML\data.csv")

print(type(data))

# remove extra spaces in all columns
data.columns = data.columns.str.strip()

# checking missing values
print(data.isnull().sum())

# ========= Plots =========
sns.set(style="whitegrid")

plt.figure(figsize=(15, 10))
for i, column in enumerate(['rainfall_mm', 'soil_moisture_%', 'distance_of_rain_km', 'temperature_C', 'humidity_%'], 1):
    plt.subplot(2, 3, i)
    sns.histplot(data[column], kde=True)
    plt.title(f"Distribution of {column}")
plt.subplot(2, 3, 6)
sns.countplot(x='flood_occured', data=data)
plt.title("Distribution of flood_occured")
plt.tight_layout()
plt.show()

plt.figure(figsize=(6, 4))
sns.countplot(x="flood_occured", data=data)
plt.title("Distribution of floods")
plt.show()

# correlation matrix
plt.figure(figsize=(10, 8))
sns.heatmap(data.corr(numeric_only=True), annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Correlation heatmap")
plt.show()

plt.figure(figsize=(15, 10))
for i, column in enumerate(['temperature_C', 'rainfall_mm', 'soil_moisture_%', 'distance_of_rain_km', 'humidity_%'], 1):
    plt.subplot(3, 3, i)
    sns.boxplot(x=data[column])
    plt.title(f"Boxplot of {column}")
plt.tight_layout()
plt.show()

# ========= Correlation Handling =========
corr_matrix = data.corr(numeric_only=True).abs()
upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
to_drop = [column for column in upper.columns if any(upper[column] > 0.8)]
data = data.drop(columns=to_drop)
print("Dropped columns:", to_drop)

# ========= Balance Dataset =========
df_majority = data[data["flood_occured"] == 1]
df_minority = data[data["flood_occured"] == 0]
df_majority_downsampled = resample(df_majority, replace=True, n_samples=len(df_minority), random_state=42)
df_downsampled = pd.concat([df_majority_downsampled, df_minority])
df_downsampled = df_downsampled.sample(frac=1, random_state=42).reset_index(drop=True)

print(df_downsampled["flood_occured"].value_counts())

# ========= Split =========
X = df_downsampled.drop(columns=["flood_occured"])
y = df_downsampled["flood_occured"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ========= Random Forest + GridSearch =========
rf_model = RandomForestClassifier(random_state=42)
param_grid_rf = {
    "n_estimators": [50, 100, 200],
    "max_features": ["sqrt", "log2"],
    "max_depth": [None, 10, 20, 30],
    "min_samples_split": [2, 5, 10],
    "min_samples_leaf": [1, 2, 4]
}
grid_search_rf = GridSearchCV(estimator=rf_model, param_grid=param_grid_rf, cv=5, n_jobs=-1, verbose=2)
grid_search_rf.fit(X_train, y_train)
best_rf_model = grid_search_rf.best_estimator_

print("Best Parameters:", grid_search_rf.best_params_)
cv_scores = cross_val_score(best_rf_model, X_train, y_train, cv=5)
print("Cross-validation scores:", cv_scores)
print("Mean cross-validation score:", np.mean(cv_scores))

# ========= Test Performance =========
y_pred = best_rf_model.predict(X_test)
print("Test set Accuracy:", accuracy_score(y_test, y_pred))
print("Test set Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# ========= Save Model =========
model_data = {
    "model": best_rf_model,
    "feature_names": list(X.columns)
}
with open("rainfall_prediction_model.pkl", "wb") as f:
    pickle.dump(model_data, f)

print("Model trained and saved as rainfall_prediction_model.pkl")