import pytest

from random import random
from flask import json

def get_random_email():
    return "test" + str(random()) + "@test.com"


@pytest.mark.usefixtures("test_client_with_user")
def test_get_users_list(test_client):
    response = test_client.get('/api/v1/users')
    data = json.loads(response.data)

    assert data['status'] == 'success'
    assert len(data['data']) == 1


@pytest.mark.usefixtures("test_client_with_user")
def test_get_one_user(test_client):
    response = test_client.get('/api/v1/user/1')
    data = json.loads(response.data)

    assert data['status'] == 'success'


@pytest.mark.usefixtures("test_client_with_user")
def test_update_one_user_with_invalid_email(test_client):
    response = test_client.put(
        '/api/v1/user/1',
        data=json.dumps(dict(
            email="asasd",
        )),
        content_type='application/json'
    )

    data = json.loads(response.data)

    assert data['status'] == 'error'
    assert data['invalid_field'] == 'email'


@pytest.mark.usefixtures("test_client_with_user")
def test_update_one_user_with_valid_email(test_client):
    response = test_client.put(
        '/api/v1/user/1',
        data=json.dumps(dict(
            email="jmpierrot@test.com",
        )),
        content_type='application/json'
    )

    data = json.loads(response.data)

    assert data['status'] == 'success'
    assert data['data']['email'] == 'jmpierrot@test.com'


@pytest.mark.usefixtures("test_client_with_user")
def test_update_one_user_with_invalid_birthdate(test_client):
    response = test_client.put(
        '/api/v1/user/1',
        data=json.dumps(dict(
            birthdate="6000-06-26",
        )),
        content_type='application/json'
    )

    data = json.loads(response.data)

    assert data['status'] == 'error'
    assert data['invalid_field'] == 'birthdate'


@pytest.mark.usefixtures("test_client_with_user")
def test_update_one_user_with_valid_birthdate(test_client):
    response = test_client.put(
        '/api/v1/user/1',
        data=json.dumps(dict(
            birthdate="1996-06-26",
        )),
        content_type='application/json'
    )

    data = json.loads(response.data)

    assert data['status'] == 'success'
    assert data['data']['birthdate'] == '1996-06-26'


@pytest.mark.usefixtures("test_client_with_user")
def test_update_one_user_with_invalid_gender(test_client):
    response = test_client.put(
        '/api/v1/user/1',
        data=json.dumps(dict(
            gender="X",
        )),
        content_type='application/json'
    )

    data = json.loads(response.data)

    assert data['status'] == 'error'
    assert data['invalid_field'] == 'gender'


@pytest.mark.usefixtures("test_client_with_user")
def test_update_one_user_with_valid_gender(test_client):
    response = test_client.put(
        '/api/v1/user/1',
        data=json.dumps(dict(
            gender="F",
        )),
        content_type='application/json'
    )

    data = json.loads(response.data)

    assert data['status'] == 'success'
    assert data['data']['gender'] == 'F'


@pytest.mark.usefixtures("test_client_with_user")
def test_delete_one_user(test_client):
    response = test_client.get('/api/v1/users')
    data = json.loads(response.data)

    assert data['status'] == 'success'
    assert len(data['data']) == 1

    response = test_client.get('/api/v1/user/1')
    data = json.loads(response.data)

    assert data['status'] == 'success'

    response = test_client.delete('/api/v1/user/1')
    data = json.loads(response.data)

    assert data['status'] == 'success'

    response = test_client.get('/api/v1/user/1')
    data = json.loads(response.data)

    assert data['status'] == 'error'
