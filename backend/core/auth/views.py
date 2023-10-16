import datetime as dt

from flask import request
from flask_jwt_extended import create_access_token, verify_jwt_in_request, jwt_required

from .models import User
from . import auth

from .. import db, bcrypt
from ..response_handler import ResponseHandler


@auth.route("/login", methods=["POST"])
def login():

    headers = request.get_json()
    username = headers["username"]
    user = User.query.where(User.username == username).first()
    if not user:
        raise ResponseHandler(status_code=404, message="User not found")
    if not bcrypt.check_password_hash(user.password_hash, headers["password"]):
        raise ResponseHandler(status_code=401, message="Incorrect password")
    access_token = create_access_token(identity=user.id)

    raise ResponseHandler(status_code=200, payload={"access_token": access_token})


@auth.route("/register", methods=["POST"])
def register():
    headers = request.get_json()
    username = headers["username"]
    user = User.query.where(User.username == username).first()
    if user:
        raise ResponseHandler(status_code=409, message="Username already exists.")

    new_user = User(username=username,
                    about_user=headers["about_user"],
                    password_hash=bcrypt.generate_password_hash(headers["password"]).decode("utf-8"))
    db.session.add(new_user)
    db.session.commit()
    raise ResponseHandler(status_code=200)

@auth.route("/verify_token")
@jwt_required()
def verify_token():
    valid_until = verify_jwt_in_request()[1]["exp"]
    time_difference = valid_until - dt.datetime.timestamp(dt.datetime.now())
    print(dt.datetime.fromtimestamp(valid_until))
    print(dt.datetime.now())
    print(time_difference)
    return "data"





