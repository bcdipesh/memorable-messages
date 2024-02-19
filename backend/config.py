"""
config.py

This file defines the configuration settings for the Flask application.
It includes settings such as database URI, mail server details, API documentation settings, etc.
"""

import os

from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, ".env"))


class Config:
    """
    Configuration settings for the Flask application.

    Key Configurations:
    - SQLALCHEMY_TRACK_MODIFICATIONS: Disable modification tracking for SQLAlchemy to improve performance.
    - SCHEDULER_API_ENABLED: Enable the scheduler API.
    - SECRET_KEY: Secret key for session management and CSRF protection.
    - SQLALCHEMY_DATABASE_URI: Database URI for SQLAlchemy.
    - MAIL_SERVER: Mail server for sending email notifications.
    - MAIL_PORT: Port number for the mail server.
    - MAIL_USE_TLS: Enable TLS for email communication.
    - MAIL_USERNAME: Username for the mail server.
    - MAIL_PASSWORD: Password for the mail server.
    - ADMINS: List of administrators' email addresses.
    - SWAGGER: Configuration for Swagger API documentation.

    Please set the required environment variables in the .env file for certain configurations.
    """

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SCHEDULER_API_ENABLED = True
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI")
    MAIL_SERVER = os.environ.get("MAIL_SERVER")
    MAIL_PORT = os.environ.get("MAIL_PORT")
    MAIL_USE_TLS = os.environ.get("MAIL_USE_TLS")
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
    ADMINS = ["bcdipeshwork@gmail.com"]
    SWAGGER = {
        "title": "Memorable Messages REST API",
        "description": "Welcome to the Memorable Messages Web Application API documentation. This application empowers users to create heartfelt messages for their loved ones, friends, and family on special occasions. Users can sign up, log in, and craft personalized messages based on occasions, setting delivery dates and times. Additionally, users can choose to have their messages sent every year on the same date and time, creating a lasting tradition.\n\nKey Features:\n- User Authentication: Securely sign up and log in to access personalized message creation.\n- Occasion-Based Messages: Craft messages tailored to specific occasions such as birthdays, anniversaries, and more.\n- Scheduled Delivery: Set delivery dates and times for messages, with an option to repeat yearly.\n- Multi-Channel Delivery: Choose between SMS and email as the preferred method of message delivery.\n- External API Integration: Utilize Twilio for SMS delivery and Google API for email delivery.\n\nExplore the API and discover how the Memorable Messages Web Application can enhance your user's ability to create and share meaningful messages.",
        "version": "1.0.0",
        "uiversion": 3,
        "securityDefinitions": {
            "JWT": {"type": "apiKey", "name": "Authorization", "in": "header"}
        },
        "headers": [],
        "specs_route": "/api-docs",
    }
