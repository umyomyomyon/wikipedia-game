class RoomIdDuplicateException(Exception):
    status_code = 400
    message = 'create room id limit.'


class RoomNotExistException(Exception):
    status_code = 404
    message = 'room not exists.'


class URLValidationException(Exception):
    status_code = 400
    message = None

    def __init__(self, parent_url, child_url):
        self.message = f'{child_url}は{parent_url}からたどれません'
