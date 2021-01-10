import pytest

from application import create_app
from models import db

@pytest.fixture
def test_app():
    app = create_app(testing=True)
    db.init_app(app)

    with app.app_context():
        yield app

@pytest.fixture
def test_client(test_app):
    with test_app.test_client() as client:
        db.drop_all()
        db.create_all()
        yield client
        db.session.remove()
        db.drop_all()

@pytest.fixture
def test_db(test_app):
    db.drop_all()
    db.create_all()
    yield test_db
    db.session.remove()
    db.drop_all()

