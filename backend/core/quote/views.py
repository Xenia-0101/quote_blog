
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from .models import Quote
from . import quote

from .. import db, bcrypt
from ..auth.models import User
from ..initial_data import init_users, init_quotes
from ..response_handler import ResponseHandler


@quote.route("/", methods=["GET", "POST"])
@jwt_required()
def quotes():
    """
    Returns a list of all quotes, allows to post a new quote (gets user_id from identity)

    :return: [{id: ---, author: ---, text: ---, user_id: ---}, ...]
    """
    data = Quote.query.all()
    all_quotes = Quote.format_list(data)

    if request.method == "POST":
        headers = request.get_json()

        if headers["author"] is None:
            raise ResponseHandler(status_code=422, message="Missing 'author' ")
        if headers["text"] is None:
            raise ResponseHandler(status_code=422, message="Missing 'text' ")

        new_quote = Quote(text=headers["text"], author=headers["author"], user_id=get_jwt_identity())
        db.session.add(new_quote)
        db.session.commit()

        raise ResponseHandler(status_code=200, message="Success")

    raise ResponseHandler(status_code=200, message="Success", payload={"body": all_quotes})


@quote.route("/<quote_id>", methods=["GET", "DELETE"])
@jwt_required()
def quote_by_id(quote_id):
    """
    Returns quote based on quote_id, allows to delete quote if the quote.user_id
    corresponds to the current authenticated user.
    :param quote_id:
    :return: {id: ---, author: ---, text: ---, user_id: ---}
    """
    data = Quote.query.where(Quote.id == quote_id).first()

    if not data:
        raise ResponseHandler(status_code=404, message="Quote not found")

    one_quote = Quote.format_data(data)

    if request.method == "DELETE":
        if data.user_id != get_jwt_identity():
            raise ResponseHandler(status_code=403, message="Can´t delete foreign quote")
        db.session.delete(data)
        db.session.commit()
        raise ResponseHandler(status_code=200, message="Success")

    raise ResponseHandler(status_code=200, message="Success", payload={"body": one_quote})




@quote.route("/insert_initial")
def insert_initial():
    headers = {"password": "test"}
    for item in init_users:
        print(item["name"])
        print(item["about_user"])
        new_user = User(username=item["name"], about_user=item["about_user"],
                           password_hash=bcrypt.generate_password_hash(headers["password"]).decode("utf-8"))
        db.session.add(new_user)
        db.session.commit()

    for item in init_quotes:
        new_quote = Quote(user_id=item["user_id"], author=item["author"], text=item["text"])
        db.session.add(new_quote)
        db.session.commit()


    return "done"

