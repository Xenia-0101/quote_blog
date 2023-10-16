from hmac import compare_digest

from sqlalchemy import inspect
from werkzeug.security import generate_password_hash, check_password_hash

from .. import db, jwt


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password_hash = db.Column(db.String(60))
    about_user = db.Column(db.String(250))
    quotes = db.relationship("Quote", backref="users", lazy="dynamic")

    def format_data(self):
        res = {key: getattr(self, key) for key in inspect(self).attrs.keys()}
        res.pop("quotes")
        res.pop("password_hash")
        return res

    @staticmethod
    def format_list(data_list):
        return [data.format_data() for data in data_list]

    def __repr__(self):
        return "<id {}, username {}>".format(self.id, self.username)

