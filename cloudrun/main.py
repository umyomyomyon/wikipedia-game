from flask import Flask, jsonify, request
from flask_cors import CORS

from rooms import (create_room_id, init_room, destroy_room, _join_room, setting_article, _start_room,
                   change_player_progress)
from validation import validate_urls
from exceptions import RoomNotExistException, RoomIdDuplicateException, URLValidationException, NotInRoomUserException
from conf import CORS_WHITELIST

app = Flask(__name__)
CORS(app, origins=CORS_WHITELIST)


@app.route('/room', methods=['POST'])
def create_room():
    try:
        room_id = create_room_id()
        data = request.get_json()
        user_uuid, user_name = data['uuid'], data['name']
        init_room(room_id, user_uuid, user_name)
        return jsonify({'room_id': room_id}), 201
    except RoomIdDuplicateException as e:
        return jsonify({'message': e.message}), e.status_code
    except Exception as e:
        return jsonify({'message': 'create_room failed.'}), 400


@app.route('/room/start', methods=['POST'])
def start_room():
    try:
        data = request.get_json()
        user_uuid, room_id = data['uuid'], data['room_id']
        _start_room(room_id, user_uuid)
        return jsonify({'message': 'game started.'}), 200
    except RoomNotExistException as e:
        return jsonify({'message': e.message}), e.status_code
    except NotInRoomUserException as e:
        return jsonify({'message': e.message}), e.status_code
    except Exception as e:
        return jsonify({'message': 'game start failed.'}), 400


@app.route('/room', methods=['DELETE'])
def end_room():
    try:
        room_id = 11111
        destroy_room(room_id)
        return jsonify({'message': 'room deleted.'}), 204
    except RoomNotExistException as e:
        return jsonify({'message': e.message}), e.status_code
    except Exception as e:
        return jsonify({'message': 'error'}), 400


@app.route('/room/join', methods=['POST'])
def join_room():
    try:
        data = request.get_json()
        room_id, user_name, user_uuid = data['room_id'], data['name'], data['uuid']
        _join_room(room_id, user_uuid, user_name)
        return jsonify({'room_id': room_id}), 201
    except RoomNotExistException as e:
        return jsonify({'message': e.message}), e.status_code
    except Exception as e:
        return jsonify({'message': 'join room failed.'}), 400


@app.route('/room/articles', methods=['POST'])
def set_article():
    try:
        data = request.get_json()
        room_id, target, url = data['room_id'], data['target'], data['url']
        is_start = True if target == 'start' else False
        setting_article(room_id, url, is_start)
        return jsonify(), 201
    except RoomNotExistException as e:
        return jsonify({'message': e.message}), e.status_code
    except Exception as e:
        return jsonify({'message': 'set_article failed.'}), 400


@app.route('/room/done', methods=['POST'])
def done():
    try:
        data = request.get_json()
        room_id, urls, user_uuid = data['room_id'], data['urls'], data['uuid']
        change_player_progress(room_id, user_uuid)
        return jsonify({'message': 'urls is valid.'}), 200
    except RoomNotExistException as e:
        return jsonify({'message': e.message}), e.status_code
    except URLValidationException as e:
        return jsonify({'message': e.message}), e.status_code
    except Exception as e:
        return jsonify({'message': 'validation error.'}), 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
