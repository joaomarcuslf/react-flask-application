import re
import datetime
from email_validator import validate_email, EmailNotValidError

from flask import request, jsonify
from flask_restful import Resource
from marshmallow.exceptions import ValidationError
from sqlalchemy.exc import IntegrityError, DataError
from models import db, User, UserSchema

user_schema = UserSchema()

class UserResource(Resource):
    def get(self, userid):
        try:
            user = User.query.get(userid)

            if not user:
                return {'status': 'error', 'message': 'User does not exist'}, 404

            user = user_schema.dump(user)

            return {'status': 'success', 'data': user}, 200
        except ValidationError as err:
            errors = {}

            for key in err:
                errors[key] = err[key]

            return {'status': 'error', 'data': errors}, 400

    def put(self, userid):
        try:
            user = User.query.get(userid)

            if not user:
                return {'status': 'error', 'message': 'User does not exist'}, 400

            validate_email(request.json.get('email'))

            if (request.json.get('gender') not in [ 'M', 'F', 'N' ] or len(request.json.get('gender')) != 1):
                return {
                    'status': 'error',
                    'message': 'Invalid gender',
                    'invalid_field': 'gender'
                }, 400

            if (not request.json.get('birthdate') or len(request.json.get('birthdate')) != 10):
                return {
                    'status': 'error',
                    'message': 'Invalid date format',
                    'invalid_field': 'birthdate'
                }, 400

            datetime.datetime.strptime(request.json.get('birthdate'), '%Y-%m-%d')

            if 'email' in request.json:
                user.email = request.json.get('email')
            if 'name' in request.json:
                user.name = request.json.get('name')
            if 'birthdate' in request.json:
                user.birthdate = request.json.get('birthdate')
            if 'gender' in request.json:
                user.gender = request.json.get('gender')
            if 'additional_info' in request.json:
                user.additional_info = request.json.get('additional_info')

            db.session.commit()
            data = user_schema.dump(user)

            return { 'status': 'success', 'data': data }, 201
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

    def delete(self, userid):
        user = User.query.get(userid)

        if not user:
            return {'status': 'error', 'message': 'User does not exists'}, 400

        db.session.delete(user)
        db.session.commit()

        result = user_schema.dump(user)

        return { "status": 'success', 'data': result}, 201
