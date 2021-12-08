class RoomIdDuplicateException(Exception):
    status_code = 400
    message = 'create room id limit.'


class RoomNotExistException(Exception):
    status_code = 404
    message = 'room not exists.'
