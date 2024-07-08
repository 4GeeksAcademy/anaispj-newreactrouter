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
from api.models import db, Users, Posts, Comments, Likes, Planets, Characters, Films, UserFavoriteCharacters, UserFavoritePlanets
from flask_sqlalchemy import SQLAlchemy


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


@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    first_name = data.get("first_name", None)
    last_name = data.get("last_name", None)
    if not email or not password:
        response_body['message'] = "Se necesita un email y una contraseña"
        return jsonify(response_body), 400
    user = Users(email=email, password=password, first_name=first_name, last_name=last_name, is_active=True)
    db.session.add(user)
    db.session.commit()
    response_body['message'] = "Usuario creado con exito"
    response_body['user'] = user.serialize()
    return jsonify(response_body), 201


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


# GET para todos los personajes
@api.route('/people', methods=['GET'])
def get_people():
    response_body = {}
    characters = Characters.query.all()  
    results = [row.serialize() for row in characters]  
    response_body['results'] = results
    response_body['message'] = "Todos los personajes"
    return response_body, 200


# GET personaje por ID
@api.route('/people/<int:people_id>', methods=['GET'])
def get_person(people_id):
    response_body = {}
    character = Characters.query.get(people_id)
    if character:
        response_body['results'] = character.serialize()
        response_body['message'] = 'Personaje encontrado'
        return response_body, 200
    response_body['message'] = 'Personaje inexistente'
    return response_body, 404


# GET de planetas
@api.route('/planets', methods=['GET'])
def get_planets():
    response_body = {}
    planets = Planets.query.all()
    results = [row.serialize() for row in planets]
    response_body['results'] = results
    response_body['message'] = "Listado de Planetas"
    return response_body, 200


# GET un solo planeta por ID
@api.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    response_body = {}
    planet = Planets.query.get(planet_id)
    if planet:
        response_body['results'] = planet.serialize()
        response_body['message'] = 'Planeta encontrado'
        return response_body, 200
    response_body['message'] = 'Planeta inexistente'
    return response_body, 404


@api.route('/users/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():
    response_body = {}
    current_user_id = get_jwt_identity()['user_id']
    favorite_planets = UserFavoritePlanets.query.filter_by(user_id=current_user_id).all()
    favorite_characters = UserFavoriteCharacters.query.filter_by(user_id=current_user_id).all()
    response_body['favorite_planets'] = [fav.planet.serialize() for fav in favorite_planets]
    response_body['favorite_characters'] = [fav.character.serialize() for fav in favorite_characters]
    response_body['message'] = "Favoritos del usuario"
    return jsonify(response_body), 200


@api.route('/users/favorite/planet/<int:planet_id>', methods=['POST'])
@jwt_required()
def add_favorite_planet(planet_id):
    response_body = {}
    current_user_id = get_jwt_identity()['user_id']
    user_favorite_planet = UserFavoritePlanets(user_id=current_user_id, planet_id=planet_id)
    db.session.add(user_favorite_planet)
    db.session.commit()
    response_body['message'] = f"Planeta {planet_id} añadido a favoritos"
    return jsonify(response_body), 200


@api.route('/users/favorite/people/<int:people_id>', methods=['POST'])
@jwt_required()
def add_favorite_people(people_id):
    response_body = {}
    current_user_id = get_jwt_identity()['user_id']
    user_favorite_character = UserFavoriteCharacters(user_id=current_user_id, character_id=people_id)
    db.session.add(user_favorite_character)
    db.session.commit()
    response_body['message'] = f"Personaje {people_id} añadido a favoritos"
    return jsonify(response_body), 200


@api.route('/users/favorite/planet/<int:planet_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_planet(planet_id):
    response_body = {}
    current_user_id = get_jwt_identity()['user_id']
    user_favorite_planet = UserFavoritePlanets.query.filter_by(user_id=current_user_id, planet_id=planet_id).first()
    if user_favorite_planet:
        db.session.delete(user_favorite_planet)
        db.session.commit()
        response_body['message'] = f"Planeta {planet_id} eliminado de favoritos"
        return jsonify(response_body), 200
    response_body['message'] = "Favorito no encontrado"
    return jsonify(response_body), 404


@api.route('/users/favorite/people/<int:people_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_people(people_id):
    response_body = {}
    current_user_id = get_jwt_identity()['user_id']
    user_favorite_character = UserFavoriteCharacters.query.filter_by(user_id=current_user_id, character_id=people_id).first()
    if user_favorite_character:
        db.session.delete(user_favorite_character)
        db.session.commit()
        response_body['message'] = "Eliminado"