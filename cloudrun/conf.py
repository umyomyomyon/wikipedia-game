import os

MIN_ROOM_ID = 10000
MAX_ROOM_ID = 99999
FIREBASE_CRED_PATH = os.getenv('FIREBASE_CRED_PATH')
RTDB_URL = os.getenv('RTDB_URL')

CORS_WHITELIST = [
    'http://localhost:3000'
]
