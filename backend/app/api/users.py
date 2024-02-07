"""users routes."""

import sqlalchemy as sa
from app import db
from app.api import bp
from app.api.errors import bad_request, error_response
from app.email import schedule_email
from app.models import Occasion, User
from flask import request
from flask_jwt_extended import current_user, jwt_required


@bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    """
    Get all users.

    This endpoint returns a list of all the users from the database.

    ---
    tags:
      - Users
    responses:
      200:
        description: A successful response with a list of users.
        content:
          application/json:
            schema:
              type: object
              properties:
                users:
                  type: array
                  items:
                    type: object
                access_token:
                  type: string
      401:
        description: Unauthorized.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
    security:
      - JWT: []
    """

    if current_user.is_admin:
        users = db.session.scalars(sa.select(User)).all()

        return {"users": [user.to_dict(include_email=True) for user in users]}

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )


@bp.route("/users/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
    """
    Delete a user by id.

    This endpoint deletes a user with the provided id.

    ---
    tags:
      - Users
    parameters:
      - name: id
        in: path
        type: string
        required: true
        description: The id of the user.
    responses:
      204:
        description: Successfully deleted.
      401:
        description: Unauthorized.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
      404:
        description: Not found.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
    security:
      - JWT: []
    """

    if id == current_user.id or current_user.is_admin:
        user = db.get_or_404(User, id)
        db.session.delete(user)
        db.session.commit()

        return {}, 204

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )


@bp.route("/users/<int:id>", methods=["GET"])
@jwt_required()
def get_user(id):
    """
    Get a user by id.

    This endpoint returns the details of the user with the provided id.

    ---
    tags:
      - Users
    parameters:
      - name: id
        in: path
        type: string
        required: true
        description: The id of the user.
    responses:
      200:
        description: A successful response with the user details.
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  type: object
      401:
        description: Unauthorized.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
      404:
        description: Not found.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
    security:
      - JWT: []
    """

    if current_user.id == id or current_user.is_admin:
        return db.get_or_404(User, id).to_dict(include_email=True)

    return db.get_or_404(User, id).to_dict()


@bp.route("/users/<int:id>", methods=["PUT"])
@jwt_required()
def update_user(id):
    """
    Update a user by id.

    This endpoint updates the user and returns the updated user details.

    ---
    tags:
      - Users
    parameters:
      - name: id
        in: path
        type: string
        required: true
        description: The id of the user.
      - name: user_details
        in: body
        description: The new details for the user.
        schema:
          type: object
          properties:
            username:
              type: string
              description: The new username of the user.
            email:
              type: string
              description: The new email of the user.
    responses:
      200:
        description: A successful response with the updated user details.
        content:
          application/json:
            schema:
              type: object
              properties:
                user:
                  type: object
      401:
        description: Unauthorized.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
      404:
        description: Not found.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
    security:
      - JWT: []
    """

    user = db.get_or_404(User, id)
    data = request.get_json()

    if id == current_user.id or current_user.is_admin:
        if (
            "username" in data
            and data["username"] != user.username
            and db.session.scalar(
                sa.select(User).where(User.username == data["username"])
            )
        ):
            return bad_request("please use a different username")
        if (
            "email" in data
            and data["email"] != user.email
            and db.session.scalar(sa.select(User).where(User.email == data["email"]))
        ):
            return bad_request("please use a different email address")

        user.from_dict(data, new_user=False)
        db.session.commit()

        return user.to_dict(include_email=True)

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )


@bp.route("/users/<int:id>/occasions", methods=["GET"])
@jwt_required()
def user_occasions(id):
    """
    Get user occasions.

    This endpoint returns a list of all the user created occasions.

    ---
    tags:
      - Users
    parameters:
     - name: id
       in: path
       type: string
       required: true
       description: The id of the user.
    responses:
      200:
        description: A successful response with the list of occasions.
        content:
          application/json:
            schema:
              type: object
              properties:
                occasions:
                  type: array
                  items:
                    type: object
      401:
        description: Unauthorized.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
      404:
        description: Not found.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
    security:
      - JWT: []
    """

    if id == current_user.id or current_user.is_admin:
        user = db.get_or_404(User, id)
        occasions = db.session.scalars(user.occasions.select())

        return {"occasions": [occasion.to_dict() for occasion in occasions]}

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )


@bp.route("/users/<int:id>/occasions", methods=["POST"])
@jwt_required()
def create_user_occasion(id):
    """
    Create user occasion.

    This endpoint creates an occasion for the user with the provided id and returns the created occasion.

    ---
    tags:
      - Users
    parameters:
      - name: id
        in: path
        type: string
        required: true
        description: The id of the user.
      - name: occasion
        in: body
        required: true
        description: Occasion details.
        schema:
          type: object
          properties:
            delivery_method:
              type: string
              description: The delivery method of the occasion message.
            occasion_type:
              type: string
              description: The type of the occasion.
            message_content:
              type: string
              description: The message content that will be sent at the occasion date and time.
            is_repeated:
              type: boolean
              description: Boolean flag to make this occasion repeated.
            date_time:
              type: string
              format: date-time
              description: The date and time of the occasion.
    responses:
      201:
        description: A successful response with the newly created occasion.
        content:
          application/json:
            schema:
              type: object
              properties:
                occasion:
                  type: object
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
      401:
        description: Unauthorized.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
      404:
        description: Not found.
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                message:
                  type: string
    security:
      - JWT: []
    """

    if id == current_user.id or current_user.is_admin:
        db.get_or_404(User, id)
        data = request.get_json()

        if (
            "delivery_method" not in data
            or "occasion_type" not in data
            or "message_content" not in data
            or "date_time" not in data
        ):
            return bad_request(
                "must include delivery_method, occasion_type, message_content and date_time fields"
            )

        data["user_id"] = id
        occasion = Occasion()
        occasion.from_dict(data)
        db.session.add(occasion)
        db.session.commit()

        schedule_email(occasion=occasion)

        return {"occasion": occasion.to_dict(include_message_content=True)}, 201
