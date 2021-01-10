import re
import datetime
from email_validator import validate_email, EmailNotValidError

from flask import request, jsonify
from flask_restful import Resource
from marshmallow.exceptions import ValidationError
from sqlalchemy.exc import IntegrityError, DataError
from models import db, User, UserSchema

users_schema = UserSchema(many=True)
user_schema = UserSchema()

class UsersResource(Resource):
    def get(self):
        users = User.query.all()
        users = users_schema.dump(users)

        return {'status': 'success', 'data': users}, 200

    def post(self):
        try:
            user = User.query.filter_by(email=request.json.get('email')).first()

            if user:
                return {'status': 'error', 'message': 'User already exists'}, 400

            if (not request.json.get('name')):
                return {
                    'status': 'error',
                    'message': 'No name provided',
                    'invalid_field': 'name'
                }, 400

            if (not request.json.get('birthdate') or len(request.json.get('birthdate')) != 10):
                return {
                    'status': 'error',
                    'message': 'Invalid date format',
                    'invalid_field': 'birthdate'
                }, 400

            birthdate = datetime.datetime.strptime(request.json.get('birthdate'), '%Y-%m-%d').date()
            present = datetime.date.today()


            if ((present - birthdate).days < 0):
                return {
                    'status': 'error',
                    'message': 'Date cannot begreater than today',
                    'invalid_field': 'birthdate'
                }, 400

            if (not request.json.get('email')):
                return {
                    'status': 'error',
                    'message': 'No name provided',
                    'invalid_field': 'name'
                }, 400

            validate_email(request.json.get('email'))


            if (request.json.get('gender') not in [ 'M', 'F', 'N' ] or len(request.json.get('gender')) != 1):
                return {
                    'status': 'error',
                    'message': 'Invalid gender',
                    'invalid_field': 'gender'
                }, 400

            user = User(
                email=request.json.get('email'),
                name=request.json.get('name'),
                birthdate=request.json.get('birthdate'),
                gender=request.json.get('gender'),
                additional_info=request.json.get('additional_info'),
            )

            db.session.add(user)
            db.session.commit()

            result = user_schema.dump(user)

            return { "status": 'success', 'data': result }, 201
        except ValidationError as err:
            errors = {}

            for key in err:
                errors[key] = err[key]

            return {'status': 'error', 'data': errors}, 400
        except EmailNotValidError as err:
            return {
                'status': 'error',
                'message': 'Invalid E-mail',
                'invalid_field': 'email'
            }, 400
        except IntegrityError as err:
            error_message = str(err.__dict__.get('orig'))

            return {
                'status': 'error',
                'message': error_message,
                'invalid_field': re.search(r'"([A-Za-z0-9_\./\\-]*)"', error_message).group(1)
            }, 400
        except ValueError as err:
            return {
                'status': 'error',
                'message': 'Invalid Date',
                'invalid_field': 'birthdate'
            }, 400

