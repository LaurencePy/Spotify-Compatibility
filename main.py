import os
import base64
from dotenv import load_dotenv
import requests
import json

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")



def get_artist(token):

    headers = {
    'Authorization': 'Bearer ' + token,
    }

    response = requests.get('https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb', headers=headers)
    artist = response.json().get('name')
    print(artist)



def get_token():
    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
    }

    response = requests.post('https://accounts.spotify.com/api/token', data=data)
    if response.status_code == 200:
        token = response.json().get('access_token')
        print(f"Token: {token}")
        #get_artist(token)
    else:
        print(f"Failed to get token. Status code: {response.status_code}")
        print(f"Error: {response.text}")

get_token()


