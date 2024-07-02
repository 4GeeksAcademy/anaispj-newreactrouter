"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts, Planets


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Logica de validacion
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if user:
        access_token = create_access_token(identity={'user_id': user.id, 'user_is_admin': user.is_admin})
        response_body['message'] = 'User logged'
        response_body['access_token'] = access_token
        return response_body, 200
    response_body['message'] = 'Bad email or password'
    return response_body, 401

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body['message'] = f'User logeado: {current_user}'
    return response_body, 200

@api.route('/users', methods=['GET', 'POST'])  #El POST de users lo haremos en el /signup
def handle_users():
    response_body = {}
    if request.method == 'GET':
        # Aquí tengo que hacer la logica para mostrar los usuarios que tengo en mi DB.
        users = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in users]   # List compehension 
        response_body['results'] = results
        response_body['message'] = "Listado de Usuarios"
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = "Este endpoint no es valido. Debe hacer un /signup"
        return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'Usuario encontrado'
            return response_body, 200
        response_body['message'] = 'Usuario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # Rutina de validacion de datos recibidos TODO
        print(data)
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.last_name = data['last_name']
            user.first_name = data['first_name']
            db.session.commit()  # Esto hace commit de los datos y los actualiza en la lista, para que se grabe en la base
            response_body['message'] = 'User updated'
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'Usuario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            # db.session.delete(user)
            user.is_active = False
            db.session.commit()
            response_body['message'] = 'Usuario eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Usuario inexistente'
        response_body['results'] = {}
        return response_body, 200

    # if request.method == 'POST':
    #     data = request.json
    #     # TODO validacion de datos recibidos
    #     row = Posts()
    #     row.title = data['title']
    #     row.description = data['description']
    #     row.body = data['body']
    #     row.image = data['image_url']
    #     row.date_publication = datetime.today()
    #     row.user_id = current_user['user_id']
    #     db.session.add(row)
    #     db.session.commit()
    #     response_body['message'] = "Este endpoint no es valido. Debe hacer un /signup"
    #     return response_body, 200