import sqlalchemy as sa
from app import db
from app.api import bp
from app.api.errors import bad_request, error_response
from app.models import DeliveryHistory, Occasion
from flask import request
from flask_jwt_extended import current_user, jwt_required


@bp.route("/delivery-histories", methods=["GET"])
@jwt_required()
def delivery_histories():
    """
    Get all delivery histories.

    This endpoint returns a list of all the delivery histories.

    ---
    tags:
      - Delivery Histories
    responses:
      200:
        description: A successful response with the list of delivery histories.
        content:
          application/json:
            schema:
              type: object
              properties:
                delivery_histories:
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
        delivery_histories = db.session.scalars(sa.select(DeliveryHistory)).all()

        return {
            "delivery_histories": [
                delivery_history.to_dict() for delivery_history in delivery_histories
            ]
        }

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )
