from flask import jsonify, request


"""
status codes:
401 - Unauthorised - If the request included authentication credentials, then the 401 response indicates that authorization has been refused for those credentials. 
403 - Forbidden -  the credentials provided are valid, but appropriate privileges to perform the requested action are missing.
409 - Conflict - The request could not be completed due to a conflict with the current state of the resource. This code is only allowed in situations where it is expected that the user might be able to resolve the conflict and resubmit the request. 
422 - Unprocessable entity - e.g. missing parameters in request, unable to process request
"""


class ResponseHandler(Exception):

    def __init__(self, status_code, message=None, payload=None):
        super().__init__()
        self.message = message
        if status_code is not None:
            if status_code == 200:
                self.message = "Success"
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv["message"] = self.message
        return rv
