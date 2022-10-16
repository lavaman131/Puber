from flask import Flask, request, jsonify
import requests
import time
from datetime import datetime
from tensorflow.keras.models import load_model
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

API_KEY_GOOGLE_CLOUD = 'AIzaSyC8UFAfQUcHMPEa5sBc0RiJSsZ9qs0eNMQ'
API_KEY_WEATHER_API = 'b18956006b834338b91142236221510'
    
@app.route('/api/get_prediction', methods=['GET', 'POST'])
def get_prediction():
    content = request.json
    prediction_data, status = get_prediction_data(content)
    if status != 200:
        return {'status': status}
    response = {'status': status}
    response.update({'prediction data': prediction_data})
    return jsonify(response)

def get_distance(loc_data):
    origin_loc = loc_data['origin'].replace(' ', '%20').replace(',', '%2C')
    destination_loc = loc_data['destination'].replace(' ', '%20').replace(',', '%2C')
    response = requests.get(f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin_loc}&destinations={destination_loc}&key={API_KEY_GOOGLE_CLOUD}')
    content = response.json();
    if content['rows'][0]['elements'][0]['status'] != 'OK':
        return -1;

    return int(content['rows'][0]['elements'][0]['distance']['value'])/1000/1.609

def z_standardize(x, mu, sigma):
    return (x - mu) / sigma

def get_prediction_data(content):
    
    distance = get_distance(content['locations'])
    
    if distance == -1:
        return {'error': 'No Location Found'}, 404

    response = requests.get(f'http://api.weatherapi.com/v1/forecast.json?key={API_KEY_WEATHER_API}&q=Boston&days=2&aqi=no&alerts=no')
    weather_api_content = response.json()
    pred_data = {}
    current_time = time.time()
    for day in weather_api_content['forecast']['forecastday']:
        for entry in day['hour']:
            if entry['time_epoch']>=current_time: 
                hour = datetime.fromtimestamp(entry['time_epoch']).hour
                pred_data[entry['time_epoch']] = [entry['temp_f'], entry['cloud'] / 100, entry['chance_of_rain'] / 100, entry['humidity'] / 100, entry['wind_mph'], distance, hour]
    
    pred_data = dict(list(pred_data.items())[0: 11]) 

    model = load_model('MLP_model.h5')
    mu, sigma = np.load('scales.npy')

    preds_dict = {k: model.predict(z_standardize(np.array(v), mu, sigma).reshape(1, -1)).flatten().tolist()
                  for k, v in pred_data.items()}
    
    return preds_dict, 200


if __name__ == '__main__':
    print('Loading regression model...')
    print('Model loaded successfully')
    print('Starting server...')
    app.run(debug=True)
    print('Stopping server...')
