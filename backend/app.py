from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv() # Load environment variables from .env file

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Placeholder for Groq AI API Key (from .env)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/health")
def health_check():
    return jsonify({"status": "ok", "message": "BizTone Converter backend is running."}), 200

@app.route("/api/convert", methods=["POST"])
def convert_text():
    data = request.get_json()
    text_to_convert = data.get("text", "")
    target_audience = data.get("target", "상사") # Default to '상사' if not provided

    if not text_to_convert:
        return jsonify({"error": "No text provided for conversion."}), 400

    # In Sprint 1, we will return a dummy response.
    # Actual Groq AI API integration will be done in later sprints.
    dummy_response = {
        "original_text": text_to_convert,
        "converted_text": f"[{target_audience}향 가상 변환]: {text_to_convert} (변환됨)",
        "target_audience": target_audience
    }
    
    # Simulate a delay for demonstration
    # import time
    # time.sleep(1) 

    return jsonify(dummy_response), 200

if __name__ == "__main__":
    app.run(debug=True)
