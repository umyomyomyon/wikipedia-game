from firebase_admin import db

from rooms import check_room_exists, init_room, destroy_room


#  init_room -> destroy_roomの順番でテストを実行すること
def test_init_room():
    room_id = 12345
    user_uuid = 'test_user_uuid'
    user_name = 'test_user_name'
    expected_data = {
        'isReady': False,
        'users': [{
            'name': user_name,
            'uuid': user_uuid
        }]
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


def room_decorator(f):
    room_id = 10000
    user_uuid = 'test_user_uuid'
    user_name = 'test_user_name'

    def _wrapper(*args, **kwargs):
        init_room(room_id, user_uuid, user_name)
        f(*args, **kwargs)
        destroy_room(room_id)
    return _wrapper


@room_decorator
def test_check_room_exists():
    room_id = 10000
    result = check_room_exists(room_id)
    assert result is True
