import sqlalchemy as sa
from app import db
from app.api import bp
from app.api.errors import bad_request, error_response
from app.models import DeliveryHistory, Occasion
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


@bp.route("/occasions/<int:id>", methods=["GET"])
@jwt_required()
def get_occasion(id):
    """
    Get a occasion by id.

    This endpoint returns the details of the occasion with the provided id.

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
      200:
        description: A successful response with the occasion details.
        content:
          application/json:
            schema:
              type: object
              properties:
                occasion:
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

    occasion = db.get_or_404(Occasion, id)

    if occasion.user_id == current_user.id or current_user.is_admin:
        return {"occasion": occasion.to_dict(include_message_content=True)}

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )


@bp.route("/occasions/<int:id>", methods=["PUT"])
@jwt_required()
def update_occasion(id):
    """
    Update a occasion by id.

    This endpoint updates the occasion and returns the updated occasion details.

    ---
    tags:
      - Occasions
    parameters:
      - name: id
        in: path
        type: string
        required: true
        description: The id of the occasion.
      - name: occasion_details
        in: body
        description: The new details for the occasion.
        schema:
          type: object
          properties:
            delivery_method:
              type: string
              description:  new delivery method of the occasion message.
            occasion_type:
              type: string
              description: The new type of the occasion.
            message_content:
              type: string
              description: The new message content that will be sent at the occasion date and time.
            is_repeated:
              type: boolean
              description: The new boolean flag to make this occasion repeated.
            date_time:
              type: string
              format: date-time
              description: The new date and time of the occasion.
    responses:
      200:
        description: A successful response with the updated occasion details.
        content:
          application/json:
            schema:
              type: object
              properties:
                occasion:
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

    occasion = db.get_or_404(Occasion, id)

    if occasion.user_id == current_user.id or current_user.is_admin:
        data = request.get_json()

        occasion.from_dict(data)
        db.session.commit()

        return {"occasion": occasion.to_dict(include_message_content=True)}

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )


@bp.route("/occasions/<int:id>/delivery-histories", methods=["GET"])
@jwt_required()
def occasion_delivery_histories(id):
    """
    Get all delivery histories for an occasion.

    This endpoint returns a list of all the delivery histories for a occasion with the provided id.

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
        delivery_histories = db.session.scalars(
            sa.select(DeliveryHistory).where(DeliveryHistory.occasion_id == id)
        ).all()

        return {
            "delivery_histories": [
                delivery_history.to_dict() for delivery_history in delivery_histories
            ]
        }

    return error_response(
        401, "you do not have the necessary authorization for this action/resource"
    )
