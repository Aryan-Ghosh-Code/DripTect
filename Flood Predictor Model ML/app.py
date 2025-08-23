from flask import Flask, request, jsonify
import pandas as pd
import pickle

app = Flask(__name__)

# Load model + features
with open("rainfall_prediction_model.pkl", "rb") as f:
    model_data = pickle.load(f)

model = model_data["model"]
feature_names = model_data["feature_names"]

# Global DataFrame log
log_df = pd.DataFrame()
data_counter = 0

@app.route("/predict", methods=["POST"])
def predict():
    global log_df, data_counter

    try:
        data = request.json
        print("Incoming JSON:", data)

        # Extract raw sensor values
        soil_adc = float(data.get("soil_moisture", 0))
        rain_adc = float(data.get("rainfall", 0))
        temperature = float(data.get("temperature", 0))
        humidity = float(data.get("humidity", 0))
        distance_cm = float(data.get("distance", 0))

        # Convert to usable units
        soil_moisture = (1 - (soil_adc / 4095)) * 100     # %
        rainfall_mm = (1 - (rain_adc / 4095)) * 243        # mm
        distance_km = distance_cm            # cm → km

        # ----- Map to TRAINED feature names -----
        feature_map = {
            "rainfall_mm": rainfall_mm,
            "distance_of_rain_km": distance_km,
            "temperature_C": temperature,
            "humidity_%": humidity
        }

        features_for_model = pd.DataFrame([[feature_map[col] for col in feature_names]],
                                          columns=feature_names)

        # Make prediction
        prediction = model.predict(features_for_model)[0]
        result = "Flood Likely" if prediction == 1 else "No Flood"

        # Build log row
        data_counter += 1
        new_row = {
            "Data No.": data_counter,
            "Soil Moisture(%)": soil_moisture,
            "Rainfall (mm)": rainfall_mm,
            "Disatnce of Rain (cm)": distance_km,
            "Temperature (C)": temperature,
            "Humidity(%)": humidity,
            "Prediction": result
        }

        # Append to DataFrame log
        log_df = pd.concat([log_df, pd.DataFrame([new_row])], ignore_index=True)

        # Print current log in tabular format
        print("\n========= Prediction Log =========")
        print(log_df.to_string(index=False))
        print("==================================\n")

        return jsonify({"prediction": int(prediction), "message": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
