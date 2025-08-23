import requests
import time

SERVER_URL = "http://10.50.61.182:5000/predict"

while True:
    try:
        # This script doesn't send data, just simulates reading logs.
        # If you want to see predictions from ESP posts, check app.py logs.
        print("Listening for new logs... (check Flask console for updates)")
        time.sleep(5)
    except KeyboardInterrupt:
        print("Listener stopped.")
        break
