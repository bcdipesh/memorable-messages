"""
handlers.py

This file contains error handlers for handling HTTP errors within the Memorable Messages Web Application.

These error handlers are registered with the Blueprint (`bp`) defined in the `errors` module.
They provide a centralized way to handle specific HTTP error codes, ensuring consistent error
responses across the application.
"""

from app import db
from app.api.errors import error_response as api_error_response
from app.errors import bp


@bp.app_errorhandler(404)
def not_found_error(e):
    """
    Error handler for 404 Not Found errors.

    Parameters:
    - e: The exception object.

    Returns:
    A JSON-formatted error response for the 404 error.
    """

    return api_error_response(404)


@bp.app_errorhandler(500)
def internal_error(e):
    """
    Error handler for 500 Internal Server Error.

    Parameters:
    - e: The exception object.

    Returns:
    A JSON-formatted error response for the 500 error after rolling back the database session.
    """

    db.session.rollback()
    return api_error_response(500)
