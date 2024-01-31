from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    from app.errors import bp as errors_bp
    from app.api import bp as api_bp

    app.register_blueprint(errors_bp)
    app.register_blueprint(api_bp, url_prefix="/api/v1")

    return app


from app import models
