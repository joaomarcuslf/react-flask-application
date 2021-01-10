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
    created_data,
    no_name_provided,
    user_already_exists,
    invalid_date_format,
    date_cannot_be_greater_than_today,
    no_email_provided,
    no_gender_provided,
    invalid_gender,
    generic_error,
    invalid_date,
    invalid_email,
    error_with_info
)

users_schema = UserSchema(many=True)
user_schema = UserSchema()


class UsersResource(Resource):
    def get(self):
        users = User.query.all()
        users = users_schema.dump(users)

        return success_data(users)

    def post(self):
        try:
            user = User.query.filter_by(
                email=request.json.get('email')).first()

            if user:
                return user_already_exists()

            if (not request.json.get('email')):
                return no_email_provided()

            if (not request.json.get('name')):
                return no_name_provided()

            if (not request.json.get('birthdate') or len(
                    request.json.get('birthdate')) != 10):
                return invalid_date_format()

            if (not request.json.get('gender')):
                return no_gender_provided()

            birthdate = datetime.datetime.strptime(
                request.json.get('birthdate'), '%Y-%m-%d').date()
            present = datetime.date.today()

            if ((present - birthdate).days < 0):
                return date_cannot_be_greater_than_today()

            validate_email(request.json.get('email'))

            if (request.json.get('gender') not in ['M', 'F', 'N'] or len(
                    request.json.get('gender')) != 1):
                return invalid_gender()

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

            return created_data(result)

        except ValidationError as err:
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
