"""Setting up, importing and initializing other modules."""

from config import Config
from flasgger import Swagger
from flask import Flask
from flask_apscheduler import APScheduler
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
swagger = Swagger()
mail = Mail()
cors = CORS()
scheduler = APScheduler()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    swagger.init_app(app)
    mail.init_app(app)
    cors.init_app(app)

    from app.api import bp as api_bp
    from app.errors import bp as errors_bp

    app.register_blueprint(errors_bp)
    app.register_blueprint(api_bp, url_prefix="/api/v1")

    scheduler.init_app(app)
    scheduler.start()
    print("Scheduler started and running", scheduler.running)

    return app


from app import events, models
