from flask_bcrypt import Bcrypt
from flask_cors import CORS

from .config import Configuration

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
CORS(app)
app.config.from_object(Configuration)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from .auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

from .quote import quote as quote_blueprint
app.register_blueprint(quote_blueprint)

from .user import user as user_blueprint
app.register_blueprint(user_blueprint)

from core import views


