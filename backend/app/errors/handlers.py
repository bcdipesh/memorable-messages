from app import db
from app.api.errors import error_response as api_error_response
from app.errors import bp


@bp.app_errorhandler(404)
def not_found_error(e):
    return api_error_response(404)


@bp.app_errorhandler(500)
def internal_error(e):
    db.session.rollback()
    return api_error_response(500)
