from flask import Flask
from marshmallow import Schema, fields, pre_load, validate
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

ma = Marshmallow()
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    email = db.Column(db.String(128), unique=True, nullable=False)
    name = db.Column(db.String(128), nullable=False)
    birthdate = db.Column(db.String(10), nullable=False) # YYYY-MM-DD
    gender = db.Column(db.String(1), nullable=False)

    additional_info = db.Column(db.Text())

    active = db.Column(db.Boolean(), default=True, nullable=False)

    def __init__(self, email, name, birthdate, gender, additional_info):
        self.email = email
        self.name = name
        self.birthdate = birthdate
        self.gender = gender
        self.additional_info = additional_info

class UserSchema(ma.Schema):
    id = fields.Integer()
    name = fields.String(required=True)
    birthdate = fields.String(required=True)
    gender = fields.String(required=True)
