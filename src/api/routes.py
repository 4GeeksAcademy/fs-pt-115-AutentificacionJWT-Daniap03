from flask import Blueprint, request, jsonify, current_app
from .models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

api = Blueprint("api", __name__)

@api.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Faltan campos"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "El usuario ya existe"}), 400

    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))
    return jsonify({"msg": "Usuario creado correctamente", "token": token, "user": user.serialize()}), 201


@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"msg": "Login correcto", "token": token, "user": user.serialize()}), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"msg": f"Bienvenido {user.email}, tu sesión es válida"}), 200


@api.route("/validate", methods=["GET"])
@jwt_required()
def validate():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"valid": True, "user": user.serialize()}), 200