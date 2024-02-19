"""
__init__.py

This file initializes the 'errors' Blueprint for handling error routes and responses.
The Blueprint is registered in the application factory (create_app) to handle error
responses and redirect users appropriately in case of errors.
"""

from flask import Blueprint

# Create the 'errors' Blueprint
bp = Blueprint("errors", __name__)

# Import error handlers to register them with the Blueprint
from app.errors import handlers
