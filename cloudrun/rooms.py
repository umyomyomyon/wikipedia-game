from random import randint

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from exceptions import RoomIdDuplicateException, RoomNotExistException
from conf import FIREBASE_CRED_PATH, RTDB_URL, MIN_ROOM_ID, MAX_ROOM_ID

cred = credentials.Certificate(FIREBASE_CRED_PATH)

firebase_admin.initialize_app(cred, {
    'databaseURL': RTDB_URL
})


def check_room_exists(room_id: int, return_ref=False):
    ref = db.reference(f'{room_id}/')
    if return_ref:
        return bool(ref.get()), ref
    return bool(ref.get())


def create_room_id():
    room_id = None
    is_room_already_exists = False
    retry_count = 0
    while retry_count < 5:
        room_id = randint(MIN_ROOM_ID, MAX_ROOM_ID)
        is_room_already_exists = check_room_exists(room_id)
        if not is_room_already_exists:
            break
        retry_count += 1
    if is_room_already_exists:
        raise RoomIdDuplicateException
    return room_id


def init_room(room_id: int, user_uuid: str, user_name: str):
    ref = db.reference(f'{room_id}/')
    ref.set({
        'isReady': False,
        'users': {
            user_uuid: user_name
        }
    })


def _join_room(room_id: int, user_uuid: str, user_name: str):
    is_room_exists = check_room_exists(room_id)
    if not is_room_exists:
        raise RoomNotExistException
    room_users_ref = db.reference(f'{room_id}/users/')
    current_users = room_users_ref.get()
    room_users_ref.set(current_users | {user_uuid: user_name})


def destroy_room(room_id: int):
    is_exists_room_id, ref = check_room_exists(room_id, return_ref=True)
    if not is_exists_room_id:
        raise RoomNotExistException
    ref.delete()


def setting_article(room_id: int, url: str, is_start: bool):
    is_room_exists = check_room_exists(room_id)
    if not is_room_exists:
        raise RoomNotExistException
    target = 'start' if is_start else 'goal'
    ref = db.reference(f'{room_id}/{target}/')
    ref.set(url)


def get_room_data(room_id: int):
    db_path = f'{room_id}/'
    ref = db.reference(db_path)
    data = ref.get()
    if data is None:
        raise RoomNotExistException
    return data
