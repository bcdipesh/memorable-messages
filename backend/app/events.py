"""
events.py

This file contains event-related functionality for the Memorable Messages Web Application.
In particular, it includes an event listener for the APScheduler, which updates the delivery
status of occasions after they have been executed.
"""

from app import db, scheduler
from app.models import DeliveryHistory
from apscheduler.events import EVENT_JOB_EXECUTED


def update_status(event):
    """Event listener function triggered when a scheduled job is executed.
    It updates the delivery status of the associated occasion to "DELIVERED" in the database.
    """

    with scheduler.app.app_context():
        occasion_id = int(event.job_id)
        delivery_history = DeliveryHistory()
        delivery_history.occasion_id = occasion_id
        delivery_history.status = "DELIVERED"

        db.session.add(delivery_history)
        db.session.commit()


scheduler.add_listener(update_status, EVENT_JOB_EXECUTED)
