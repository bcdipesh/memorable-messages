from app import db, scheduler
from app.models import DeliveryHistory
from apscheduler.events import EVENT_JOB_EXECUTED


def update_status(event):
    with scheduler.app.app_context():
        occasion_id = int(event.job_id)
        delivery_history = DeliveryHistory()
        delivery_history.occasion_id = occasion_id
        delivery_history.status = "DELIVERED"

        db.session.add(delivery_history)
        db.session.commit()


scheduler.add_listener(update_status, EVENT_JOB_EXECUTED)
