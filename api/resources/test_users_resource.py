import pytest

from random import random
from flask import json

from application import create_app
from models import db


def get_random_email():
    return "test" + str(random()) + "@test.com"

@pytest.mark.usefixtures("test_client")
def test_get_users_list(test_client):
    rv = test_client.get('/api/v1/users')
    data = json.loads(rv.data)

    assert data['status'] == 'success'

@pytest.mark.usefixtures("test_client")
def test_create_user_with_the_no_name(test_client):
    rv = test_client.post(
        '/api/v1/users',
         data=json.dumps(dict(
            birthdate="1996-06-26",
            additional_info="",
            email=get_random_email(),
            gender="M"
        )),
        content_type='application/json'
    )

    post_data = json.loads(rv.data)

    assert post_data['status'] == 'error'
    assert post_data['invalid_field'] == 'name'

@pytest.mark.usefixtures("test_client")
def test_create_user_with_no_birthdate(test_client):
    rv = test_client.post(
        '/api/v1/users',
         data=json.dumps(dict(
            name="João Marcus Fernandes",
            additional_info="",
            email=get_random_email(),
            gender="M"
        )),
        content_type='application/json'
    )

    post_data = json.loads(rv.data)

    assert post_data['status'] == 'error'
    assert post_data['invalid_field'] == 'birthdate'

@pytest.mark.usefixtures("test_client")
def test_create_user_with_invalid_birthdate(test_client):
    rv = test_client.post(
        '/api/v1/users',
         data=json.dumps(dict(
            name="João Marcus Fernandes",
            birthdate="1996-13-26",
            additional_info="",
            email=get_random_email(),
            gender="M"
        )),
        content_type='application/json'
    )

    post_data = json.loads(rv.data)

    assert post_data['status'] == 'error'
    assert post_data['invalid_field'] == 'birthdate'

@pytest.mark.usefixtures("test_client")
def test_create_user_with_date_bigger_than_today(test_client):
    rv = test_client.post(
        '/api/v1/users',
         data=json.dumps(dict(
            name="João Marcus Fernandes",
            birthdate="6000-12-26",
            additional_info="",
            email=get_random_email(),
            gender="M"
        )),
        content_type='application/json'
    )

    post_data = json.loads(rv.data)

    assert post_data['status'] == 'error'
    assert post_data['invalid_field'] == 'birthdate'

@pytest.mark.usefixtures("test_client")
def test_create_user_with_invalid_email(test_client):
    rv = test_client.post(
        '/api/v1/users',
         data=json.dumps(dict(
            name="João Marcus Fernandes",
            birthdate="1996-06-26",
            additional_info="",
            email='teste',
            gender="M"
        )),
        content_type='application/json'
    )

    post_data = json.loads(rv.data)

    assert post_data['status'] == 'error'
    assert post_data['invalid_field'] == 'email'

@pytest.mark.usefixtures("test_client")
def test_create_user_with_invalid_gender(test_client):
    rv = test_client.post(
        '/api/v1/users',
         data=json.dumps(dict(
            name="João Marcus Fernandes",
            birthdate="1996-06-26",
            additional_info="",
            email=get_random_email(),
            gender="Z"
        )),
        content_type='application/json'
    )

    post_data = json.loads(rv.data)

    assert post_data['status'] == 'error'
    assert post_data['invalid_field'] == 'gender'

@pytest.mark.usefixtures("test_client")
def test_create_user_with_the_right_params(test_client):
    rv = test_client.post(
        '/api/v1/users',
         data=json.dumps(dict(
            name="João Marcus Fernandes",
            birthdate="1996-06-26",
            additional_info="",
            email=get_random_email(),
            gender="M"
        )),
        content_type='application/json'
    )

    post_data = json.loads(rv.data)

    assert post_data['status'] == 'success'
    assert post_data['data']['name'] == 'João Marcus Fernandes'

    rv = test_client.get('/api/v1/users')
    old_data = json.loads(rv.data)

    assert old_data['status'] == 'success'
    assert len(old_data['data']) > 0

