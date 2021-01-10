import pytest

from helpers.user_responses import (
    generic_success,
    success_delete_data,
    success_data,
    created_data,
    user_does_not_exists,
    user_already_exists,
    no_name_provided,
    invalid_date_format,
    invalid_date,
    date_cannot_be_greater_than_today,
    no_email_provided,
    invalid_email,
    no_gender_provided,
    invalid_gender,
    generic_error,
    error_with_info,
)

def test_generic_success():
    response, status = generic_success(dict(), 200)

    assert status == 200
    assert response['status'] == 'success'

def test_success_delete_data():
    response, status = success_delete_data()

    assert status == 200
    assert response['status'] == 'success'

def test_success_data():
    response, status = success_data(dict())

    assert status == 200
    assert response['status'] == 'success'

def test_created_data():
    response, status = created_data(dict())

    assert status == 201
    assert response['status'] == 'success'

def test_user_does_not_exists():
    response, status = user_does_not_exists()

    assert status == 404
    assert response['status'] == 'error'

def test_user_already_exists():
    response, status = user_already_exists()

    assert status == 400
    assert response['status'] == 'error'

def test_no_name_provided():
    response, status = no_name_provided()

    assert status == 400
    assert response['status'] == 'error'
    assert response['invalid_field'] == 'name'

def test_invalid_date_format():
    response, status = invalid_date_format()

    assert status == 400
    assert response['status'] == 'error'
    assert response['invalid_field'] == 'birthdate'

def test_invalid_date():
    response, status = invalid_date()

    assert status == 400
    assert response['status'] == 'error'
    assert response['invalid_field'] == 'birthdate'

def test_date_cannot_be_greater_than_today():
    response, status = date_cannot_be_greater_than_today()

    assert status == 400
    assert response['status'] == 'error'
    assert response['invalid_field'] == 'birthdate'

def test_no_email_provided():
    response, status = no_email_provided()

    assert status == 400
    assert response['status'] == 'error'
    assert response['invalid_field'] == 'email'

def test_invalid_email():
    response, status = invalid_email()

    assert status == 400
    assert response['status'] == 'error'
    assert response['invalid_field'] == 'email'

def test_no_gender_provided():
    response, status = no_gender_provided()

    assert status == 400
    assert response['status'] == 'error'
    assert response['invalid_field'] == 'gender'

def test_invalid_gender():
    response, status = invalid_gender()

    assert status == 400
    assert response['status'] == 'error'
    assert response['invalid_field'] == 'gender'

def test_generic_error():
    response, status = generic_error(dict())

    assert status == 400
    assert response['status'] == 'error'

def test_error_with_info():
    response, status = error_with_info('Test message', 'test_field')

    assert status == 400
    assert response['status'] == 'error'
    assert response['message'] == 'Test message'
    assert response['invalid_field'] == 'test_field'

