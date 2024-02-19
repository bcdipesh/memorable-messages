"""
__init__.py

This file initializes the Flask application and configures various extensions and blueprints.
"""

from config import Config
from flasgger import Swagger
from flask import Flask
from flask_apscheduler import APScheduler
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
swagger = Swagger()
mail = Mail()
cors = CORS()
scheduler = APScheduler()


def create_app(config_class=Config):
    """
    Factory function to create and configure the Flask application.

    Args:
    - config_class: Configuration class for the application.

    Returns:
    - app: Configured Flask application instance.
    """

    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize and configure Flask extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    swagger.init_app(app)
    mail.init_app(app)
    cors.init_app(app)

    # Import blueprints and register them with the app
    from app.api import bp as api_bp
    from app.errors import bp as errors_bp

    app.register_blueprint(errors_bp)
    app.register_blueprint(api_bp, url_prefix="/api/v1")

    # Initialize and start the scheduler for background tasks
    scheduler.init_app(app)
    scheduler.start()

    return app


# Import events and models to ensure they are registered with the application
from app import events, models
