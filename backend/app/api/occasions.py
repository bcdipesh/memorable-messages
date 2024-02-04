import sqlalchemy as sa
from app import db
from app.api import bp
from app.api.errors import bad_request, error_response
from app.models import Occasion
from flask import request
from flask_jwt_extended import current_user, jwt_required


@bp.route("/occasions", methods=["GET"])
@jwt_required()
def get_occasions():
    """
    Get all occasions.

    This endpoint returns a list of all the user created occasions.

    ---
    tags:
      - Occasions
    responses:
      200:
        description: A successful response with a list of occasions.
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
    security:
      - JWT: []
    """

    if current_user.is_admin:
        occasions = db.session.scalars(sa.select(Occasion)).all()

        return {
            "occasions": [
                occasion.to_dict(include_message_content=True) for occasion in occasions
            ]
        }

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )


@bp.route("/occasions/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_occasion(id):
    """
    Delete a occasion.

    This endpoint deletes a occasion with the provided id.

    ---
    tags:
      - Occasions
    parameters:
      - name: id
        in: path
        type: string
        required: true
        description: The id of the occasion.
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

    occasion = db.get_or_404(Occasion, id)

    if occasion.user_id == current_user.id or current_user.is_admin:
        db.session.delete(occasion)
        db.session.commit()

        return {}, 204

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )
