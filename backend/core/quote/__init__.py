from flask import Blueprint, jsonify

from ..response_handler import ResponseHandler

quote = Blueprint("quote", __name__, url_prefix="/quotes")


@quote.errorhandler(ResponseHandler)
def response_handler_func(e):
    return jsonify(e.to_dict()), e.status_code

from . import views
