from flask import Blueprint, jsonify

from ..response_handler import ResponseHandler

user = Blueprint("user", __name__, url_prefix="/users")


@user.errorhandler(ResponseHandler)
def response_handler_func(e):
    return jsonify(e.to_dict()), e.status_code


from . import views
