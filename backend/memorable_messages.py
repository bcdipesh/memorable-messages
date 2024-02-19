"""
memorable_messages.py

This file serves as the entry point to initialize the Flask application 'app' using the create_app function.
It creates an instance of the Flask app, which is the main component of the memorable messages application.

The app instance can be used to run the Flask development server or to be deployed in a production environment.
"""

from app import create_app

app = create_app()
