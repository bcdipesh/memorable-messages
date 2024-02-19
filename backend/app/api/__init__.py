"""
__init__.py

This file initializes the API Blueprint and defines routes for health checks.
It also imports and registers other API-related modules such as authentication,
delivery_histories, errors, occasions, and users.
"""

from flask import Blueprint

# Initialize the API Blueprint
bp = Blueprint("api", __name__)


@bp.route("/health")
def health_check():
    """
    Health Check Route

    Returns:
    - A JSON response with a "status" key indicating the health status ("ok").
    """

    return {"status": "ok"}


# Import and register other API modules
from app.api import auth, delivery_histories, errors, occasions, users
