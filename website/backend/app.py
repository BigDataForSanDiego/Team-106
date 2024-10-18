from flask import Flask, request, jsonify
import pickle

# Initialize the Flask app
app = Flask(__name__)

# Load the saved model from the pickle file
with open('my_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Define a route for predictions
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # JSON data sent from the frontend
    features = data['features']  # Extract features from the request data
    prediction = model.predict([features])  # Use the model to predict
    return jsonify({'prediction': prediction[0]})  # Return the prediction as a JSON response

if __name__ == '__main__':
    app.run(debug=True)
