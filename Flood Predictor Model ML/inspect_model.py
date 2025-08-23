import joblib
import pandas as pd

# Load model data (dictionary with model + feature names)
model_data = joblib.load("rainfall_prediction_model.pkl")
model = model_data["model"]
features = model_data["feature_names"]

print("Model loaded successfully!")
print(model)
print("\nFeatures used in training:", features)

# Show feature importances
importance = pd.DataFrame({
    "Feature": features,
    "Importance": model.feature_importances_
}).sort_values(by="Importance", ascending=False)

print("\nFeature Importances:")
print(importance)

# Example dummy input row (must match number/order of features exactly)
# Adjust values as per your domain
example_values = [30, 70, 12, 55]  # rainfall_mm, distance_of_rain_km, temperature_C, humidity_%

# Ensure sample matches feature length
if len(example_values) != len(features):
    raise ValueError(f"Expected {len(features)} values, but got {len(example_values)}")

sample = pd.DataFrame([example_values], columns=features)

print("\nSample Input Data:")
print(sample)

# Prediction
prediction = model.predict(sample)
print("\nPrediction for sample:", prediction)
