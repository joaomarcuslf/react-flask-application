import re
import datetime
from email_validator import validate_email, EmailNotValidError

from flask import request
from flask_restful import Resource
from marshmallow.exceptions import ValidationError
from sqlalchemy.exc import IntegrityError

from models import db, User, UserSchema
from helpers.user_responses import (
    success_data,
    user_does_not_exists,
    date_cannot_be_greater_than_today,
    success_delete_data,
    invalid_gender,
    generic_error,
    invalid_date_format,
    invalid_date,
    invalid_email,
    error_with_info
)

user_schema = UserSchema()


class UserResource(Resource):
    def get(self, userid):
        try:
            user = User.query.get(userid)

            if not user:
                return user_does_not_exists()

            user = user_schema.dump(user)

            return success_data(user)
        except ValidationError as err:
            errors = {}

            for key in err:
                errors[key] = err[key]

            return generic_error(errors)

    def put(self, userid):
        try:
            user = User.query.get(userid)

            if not user:
                return user_does_not_exists()

            if 'email' in request.json:
                validate_email(request.json.get('email'))
                user.email = request.json.get('email')

            if 'name' in request.json:
                user.name = request.json.get('name')

            if 'birthdate' in request.json:
                if (len(request.json.get('birthdate')) != 10):
                    return invalid_date_format()

                birthdate = datetime.datetime.strptime(
                    request.json.get('birthdate'), '%Y-%m-%d').date()
                present = datetime.date.today()

                if (present - birthdate).days < 0:
                    return date_cannot_be_greater_than_today()

                user.birthdate = request.json.get('birthdate')

            if 'gender' in request.json:
                if request.json.get('gender') not in ['M', 'F', 'N'] or len(
                        request.json.get('gender')) != 1:
                    return invalid_gender()

                user.gender = request.json.get('gender')

            if 'additional_info' in request.json:
                user.additional_info = request.json.get('additional_info')

            db.session.commit()
            data = user_schema.dump(user)

            return success_data(data)
        except ValidationError as err:
            print (err)
            errors = {}

            for key in err:
                errors[key] = err[key]

            return generic_error(errors)
        except EmailNotValidError as err:
            return invalid_email()
        except IntegrityError as err:
            error_message = str(err.__dict__.get('orig'))

            return error_with_info(
                error_message,
                re.search(
                    r'"([A-Za-z0-9_\./\\-]*)"',
                    error_message).group(1))
        except ValueError as err:
            return invalid_date()

    def delete(self, userid):
        user = User.query.get(userid)

        if not user:
                return user_does_not_exists()

        db.session.delete(user)
        db.session.commit()

        user_schema.dump(user)

        return success_delete_data()
