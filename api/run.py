from flask.cli import FlaskGroup

from application import create_app

app = create_app()

from models import db, User

print('FlaskGroup')
cli = FlaskGroup(app)

print('Db.init_App')
db.init_app(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("seed_db")
def seed_db():
    db.session.add(User(
        email="jmarcusfernandes@gmail.com",
        name="João Marcus Fernandes",
        birthdate="1996-06-26",
        gender="M",
        additional_info=""
    ))

    i = 1

    while i != 13:
        gender = ''

        if i / 2 == 0:
            gender = 'F'
        else:
            gender = 'M'

        email = f'user{i}@gmail.com',
        name = f'User {i}',
        birthdate = f'2000-0{i}-{i}',
        additional_info = ""

        db.session.add(User(
            email=email,
            name=name,
            birthdate=birthdate,
            gender=gender,
            additional_info=additional_info,
        ))
        i += 1
    db.session.commit()


if __name__ == "__main__":
    cli()
