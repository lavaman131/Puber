from flask import Flask, request, jsonify
import requests
import pandas as pd
import time
from datetime import datetime

app = Flask(__name__)
API_KEY_GOOGLE_CLOUD = 'XXX' # DO NOT FORGET TO DISABLE API KEYS AFTER THE HACKATHON
API_KEY_WEATHER_API = 'XXX' # DO NOT FORGET TO DISABLE API KEYS AFTER THE HACKATHON

@app.route('/api/get_prediction', methods=['GET', 'POST'])
def get_prediction():
    content = request.json
    prediction_data, status = get_prediction_data(content)
    if status != 200:
        return {'status': status}
    response = {'status': status}
    response.update({'prediction data': prediction_data})
    return jsonify(response)

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
                pred_data[entry['time_epoch']] = [distance, hour, entry['temp_f'], entry['cloud'], max(entry['chance_of_rain'],entry['chance_of_snow']), entry['humidity'], entry['wind_mph']]
    
    pred_data = dict(list(pred_data.items())[0: 6]) 
    #pred_data['status'] = 200
    #print(pred_data['status'])
    
    return pred_data, 200

def get_distance(loc_data):
    origin_loc = loc_data['origin'].replace(' ', '%20').replace(',', '%2C')
    destination_loc = loc_data['destination'].replace(' ', '%20').replace(',', '%2C')
    response = requests.get(f'https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin_loc}&destinations={destination_loc}&key={API_KEY_GOOGLE_CLOUD}')
    content = response.json();
    if content['rows'][0]['elements'][0]['status'] != 'OK':
        return -1;

    return int(content['rows'][0]['elements'][0]['distance']['value'])/1000/1.609

if __name__ == '__main__':
    print('Starting server...')
    app.run()
    print('Stopping server')