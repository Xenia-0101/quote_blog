from sqlalchemy import inspect

from .. import db


class Quote(db.Model):
    __tablename__ = "quotes"

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100))
    text = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def format_data(self):
        res = {key: getattr(self, key) for key in inspect(self).attrs.keys()}
        res.pop("users")
        return res

    @staticmethod
    def format_list(data_list):
        return [data.format_data() for data in data_list]

    def __repr__(self):
        return "<author {}, text {}>".format(self.author, self.text)

