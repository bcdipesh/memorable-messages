import sqlalchemy as sa
from flask import request
from app import db
from app.models import User
from app.api import bp
from app.api.errors import bad_request


@bp.route("/users", methods=["POST"])
def create_user():
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

    return user.to_dict(include_email=True), 201


@bp.route("/users", methods=["GET"])
def get_users():
    users = db.session.scalars(sa.select(User)).all()
    return [user.to_dict() for user in users]


@bp.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    return db.get_or_404(User, id).to_dict()


@bp.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    user = db.get_or_404(User, id)
    data = request.get_json()

    if (
        "username" in data
        and data["username"] != user.username
        and db.session.scalar(sa.select(User).where(User.username == data["username"]))
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


@bp.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = db.get_or_404(User, id)

    db.session.delete(user)
    db.session.commit()

    return "", 204
