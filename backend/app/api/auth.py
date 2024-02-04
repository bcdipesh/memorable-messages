import sqlalchemy as sa
from app import db
from app.api import bp
from app.api.errors import bad_request, error_response
from app.models import User
from flask import request
from flask_jwt_extended import create_access_token


@bp.route("/auth/register", methods=["POST"])
def register_user():
    """
    User registration.

    This endpoint registers a new user and returns this new user along with a JWT token which can be used to authorize further requests.

    ---
    tags:
      - Auth
    parameters:
      - name: user
        in: body
        required: true
        description: New user details for registration.
        schema:
          type: object
          properties:
            username:
              type: string
              description: The username of the user.
            email:
              type: string
              description: The email of the user.
            password:
              type: string
              description: The password of the user.
    responses:
      201:
        description: A successful response with a token and the newly created user.
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  type: object
                access_token:
                  type: string
      400:
        description: Bad request.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
    """

    data = request.get_json()

    if "username" not in data or "email" not in data or "password" not in data:
        return bad_request("must include username, email and password fields")
    if db.session.scalar(sa.select(User).where(User.username == data["username"])):
        return bad_request("please use a different username")
    if db.session.scalar(sa.select(User).where((User.email == data["email"]))):
        return bad_request("please use a different email address")

    user = User()
    user.from_dict(data, new_user=True)
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user)

    return {"user": user.to_dict(include_email=True), "access_token": access_token}, 201


@bp.route("/auth/token", methods=["POST"])
def get_token():
    """
    User login.

    This endpoint authenticates a user and then returns a JWT token which can be used to authorize further requests.

    ---
    tags:
      - Auth
    parameters:
      - name: credentials
        in: body
        required: true
        description: User credentials for authentication.
        schema:
          type: object
          properties:
            username:
              type: string
              description: The username for authentication.
            password:
              type: string
              description: The password for authentication.
    responses:
      200:
        description: A successful response with a token.
        content:
          application/json:
            schema:
              type: object
              properties:
                access_token:
                  type: string
      401:
        description: Unauthorized access.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
    """

    data = request.get_json()

    if "username" not in data or "password" not in data:
        return bad_request("must include username and password fields")

    user = db.session.scalar(sa.select(User).where(User.username == data["username"]))

    if user is None or not user.check_password(data["password"]):
        return error_response(401, "invalid credentials")

    access_token = create_access_token(identity=user)

    return {"access_token": access_token}, 200
