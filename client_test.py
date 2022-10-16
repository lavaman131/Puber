import requests
origin_address = 'South Station, Boston'
destination_address = 'SMFA, Boston'
res = requests.post('http://localhost:5000/api/get_prediction', json={'locations':{'origin':origin_address, 'destination':destination_address}})
if res.ok:
    print(res.json())