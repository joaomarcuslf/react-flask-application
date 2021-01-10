from helpers.http_status import (
    ok,
    created,
    bad_request,
    not_found
)


def generic_success(data, status):
    return {'status': 'success', 'data': data}, status


def success_delete_data():
    return {'status': 'success', 'message': 'Removed user successfully'}, ok


def success_data(data):
    return generic_success(data, ok)


def created_data(data):
    return generic_success(data, created)


def user_does_not_exists():
    return {
        'status': 'error',
        'message': 'User does not exist'
    }, not_found

def user_already_exists():
    return {
        'status': 'error',
        'message': 'User already exists'
    }, bad_request


def no_name_provided():
    return {
        'status': 'error',
        'message': 'No name provided',
        'invalid_field': 'name'
    }, bad_request


def invalid_date_format():
    return {
        'status': 'error',
        'message': 'Invalid date format',
        'invalid_field': 'birthdate'
    }, bad_request


def invalid_date():
    return {
        'status': 'error',
        'message': 'Invalid date',
        'invalid_field': 'birthdate'
    }, bad_request


def date_cannot_be_greater_than_today():
    return {
        'status': 'error',
        'message': 'Date cannot be greater than today',
        'invalid_field': 'birthdate'
    }, bad_request


def no_email_provided():
    return {
        'status': 'error',
        'message': 'No e-mail provided',
        'invalid_field': 'email'
    }, bad_request


def invalid_email():
    return {
        'status': 'error',
        'message': 'Invalid E-mail',
        'invalid_field': 'email'
    }, bad_request


def no_gender_provided():
    return {
        'status': 'error',
        'message': 'No gender provided',
        'invalid_field': 'gender'
    }, bad_request


def invalid_gender():
    return {
        'status': 'error',
        'message': 'Invalid gender provided',
        'invalid_field': 'gender'
    }, bad_request


def generic_error(data):
    return {'status': 'error', 'data': data}, bad_request


def error_with_info(message, invalid_field):
    return {
        'status': 'error',
        'message': message,
        'invalid_field': invalid_field
    }, bad_request
