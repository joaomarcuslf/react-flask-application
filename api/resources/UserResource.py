from flask import request, jsonify
from flask_restful import Resource
from models import db, User, UserSchema

users_schema = UserSchema(many=True)
user_schema = UserSchema()

class UsersResource(Resource):
    def get(self):
        users = User.query.all()
        users = users_schema.dump(users)

        return {'status': 'success', 'data': users}, 200

    def post(self):
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'error', 'message': 'No input data provided'}, 400

        data, errors = user_schema.load(json_data)

        if errors:
            return errors, 422

        user = User.query.filter_by(name=data['email']).first()

        if user:
            return {'status': 'error', 'message': 'User already exists'}, 400

        user = User(
            email=json_data['email'],
            name=json_data['name'],
            birthdate=json_data['birthdate'],
            gender=json_data['gender'],
            additional_info=json_data['additional_info'],
        )

        db.session.add(user)
        db.session.commit()

        result = user_schema.dump(user).data

        return { "status": 'success', 'data': result }, 201



class UserResource(Resource):
    def get(self, userid):
        user = User.query.get(userid)
        user = user.__dict__
        del user['_sa_instance_state']

        if not user:
            return {'status': 'error', 'message': 'User does not exist'}, 404

        print(user)

        return {'status': 'success', 'data': user}, 200

    def put(self, userid):
        json_data = request.get_json(force=True)

        if not json_data:
            return {'status': 'error', 'message': 'No input data provided'}, 400

        data, errors = user_schema.load(json_data)

        if errors:
            return errors, 422

        user = User.query.get(userid)

        if not user:
            return {'status': 'error', 'message': 'User does not exist'}, 400

        user = user
        user = user.__dict__
        del user['_sa_instance_state']

        user.email = data['email'] or user['email'],
        user.name = data['name'] or user['name'],
        user.birthdate = data['birthdate'] or user['birthdate'],
        user.gender = data['gender'] or user['gender'],
        user.additional_info = data['additional_info'] or user['additional_info'],

        db.session.commit()

        result = user_schema.dump(user).data

        return { "status": 'success', 'data': result }, 204

    def delete(self, userid):
        user = User.query.get(id=userid)

        if not user:
            return {'status': 'error', 'message': 'User does not exist'}, 400

        db.session.commit()

        result = user_schema.dump(user).data

        return { "status": 'success', 'data': result}, 204
