import os

from werkzeug.utils import secure_filename
from flask import (
    Flask,
    jsonify,
    send_from_directory,
    request,
    redirect,
    url_for
)
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config.from_object("application.config.Config")

api = Api(app)

from resources import api_bp

app.register_blueprint(api_bp, url_prefix='/api/v1')

# Routes
@app.route("/health")
def hello_world():
    return "Ok"
