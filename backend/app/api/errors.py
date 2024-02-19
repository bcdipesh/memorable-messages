"""
errors.py

This file defines error handling functions and handlers for the Memorable Messages Web Application.
It is responsible for handling HTTP exceptions and providing standardized error responses.
"""

from app.api import bp
from werkzeug.exceptions import HTTPException
from werkzeug.http import HTTP_STATUS_CODES


def error_response(status_code, message=None):
    """
    Generate a JSON error response for a given HTTP status code.

    Args:
    - status_code (int): HTTP status code indicating the type of error.
    - message (str, optional): Additional error message to be included in the response.

    Returns:
    dict: A dictionary containing the error response payload.
    """

    payload = {"error": HTTP_STATUS_CODES.get(status_code, "Unknown error")}
    if message:
        payload["message"] = message
    return payload, status_code


def bad_request(message):
    """
    Generate a JSON error response for a 400 Bad Request error.

    Args:
    - message (str): Error message to be included in the response.

    Returns:
    dict: A dictionary containing the 400 Bad Request error response payload.
    """

    return error_response(400, message)


@bp.errorhandler(HTTPException)
def handle_exception(e):
    """
    Handle HTTP exceptions and generate a corresponding JSON error response.

    Args:
    - e (HTTPException): The encountered HTTP exception.

    Returns:
    dict: A dictionary containing the error response payload for the given exception.
    """

    return error_response(e.code)
