from flask import Flask, jsonify, request
from flask_cors import CORS

from rooms import create_room_id, init_room, destroy_room
from exceptions import RoomNotExistException, RoomIdDuplicateException
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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)