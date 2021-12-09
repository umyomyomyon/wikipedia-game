import pytest
from firebase_admin import db

from rooms import check_room_exists, init_room, destroy_room, _join_room
from exceptions import RoomNotExistException


#  init_room -> destroy_roomの順番でテストを実行すること
def test_init_room():
    room_id = 12345
    user_uuid = 'test_user_uuid'
    user_name = 'test_user_name'
    expected_data = {
        'isReady': False,
        'users': {
            user_uuid: user_name
        }
    }

    init_room(room_id, user_uuid, user_name)
    db_path = f'{room_id}/'
    ref = db.reference(db_path)
    data = ref.get()
    assert bool(data)
    assert data == expected_data


def test_destroy_room():
    room_id = 12345
    db_path = f'{room_id}/'
    destroy_room(room_id)
    ref = db.reference(db_path)
    assert not bool(ref.get())


def test_destroy_room_failed():
    with pytest.raises(RoomNotExistException):
        room_id = 22345
        destroy_room(room_id)


def room_decorator(room_id):
    def _room_decorator(f):
        _room_id = 10000 if room_id is None else room_id
        user_uuid = 'test_user_uuid'
        user_name = 'test_user_name'

        def _wrapper(*args, **kwargs):
            init_room(_room_id, user_uuid, user_name)
            f(*args, **kwargs)
            destroy_room(_room_id)
        return _wrapper
    return _room_decorator


@room_decorator(10000)
def test_check_room_exists():
    room_id = 10000
    result = check_room_exists(room_id)
    assert result is True


@room_decorator(20000)
def test_join_room():
    room_id = 20000
    user_uuid = 'test_user_uuid'
    user_name = 'test_user_name'
    _join_room(room_id, user_uuid, user_name)

    ref = db.reference(f'{room_id}/users/{user_uuid}/')
    registered_user_name = ref.get()
    assert registered_user_name == user_name


def test_join_room_failed():
    with pytest.raises(RoomNotExistException):
        room_id = 20001
        user_uuid = 'test_user_uuid'
        user_name = 'test_user_name'
        _join_room(room_id, user_uuid, user_name)
