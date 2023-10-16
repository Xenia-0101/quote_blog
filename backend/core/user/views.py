from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from sqlalchemy import update

from . import user
from .. import db
from ..auth.models import User
from ..response_handler import ResponseHandler


@user.route("/")
@jwt_required()
def get_users():
    """
    Returns list of user dictionaries:
    {id: ---, username: ---, about_user: ---}
    """
    data = User.query.all()
    all_users = User.format_list(data)
    raise ResponseHandler(status_code=200, message="Success", payload={"body": all_users})


@user.route("/<user_id>", methods=["GET", "DELETE", "PUT"])
@jwt_required()
def user_by_id(user_id):
    """
    Returns dict of a user based on provided id, allows to delete a user.
    :param user_id:
    :return: {id: ---, username: ---, about_user: ---}
    """
    data = User.query.where(User.id == user_id).first()
    if not data:
        raise ResponseHandler(status_code=404, message="User not found")
    one_user = User.format_data(data)

    if request.method == "DELETE":
        db.session.delete(data)
        db.session.commit()
        raise ResponseHandler(status_code=200)

    if request.method == "PUT":
        headers = request.get_json()
        data.about_user = headers["about_user"]
        db.session.commit()
        raise ResponseHandler(status_code=200)

    raise ResponseHandler(status_code=200, payload={"body": one_user})


@user.route("/current")
@jwt_required()
def current_auth_user():
    """
    Returns current authenticated user
    :return: {id: ---, username: ---, about_user: ---, quotes: ---}
    """
    data = User.query.where(User.id == get_jwt_identity()).first()
    if not data:
        raise ResponseHandler(status_code=404, message="User not found")
    current_user = User.format_data(data)
    if request.method == "GET":
        current_user["quotes"] = User.format_list(data.quotes.all())
        raise ResponseHandler(status_code=200, payload={"body": current_user})

    raise ResponseHandler(status_code=200, payload={"body": current_user})

