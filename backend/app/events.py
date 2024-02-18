"""Utility functions to respond to certain events emitted by flask-apscheduler."""

import logging

from app import db, scheduler
from app.models import DeliveryHistory
from apscheduler.events import EVENT_ALL, EVENT_JOB_ADDED, EVENT_JOB_EXECUTED

logging.basicConfig()
logging.getLogger("apscheduler").setLevel(logging.DEBUG)


def update_status(event):
    with scheduler.app.app_context():
        occasion_id = int(event.job_id)
        delivery_history = DeliveryHistory()
        delivery_history.occasion_id = occasion_id
        delivery_history.status = "DELIVERED"

        db.session.add(delivery_history)
        db.session.commit()

        print(event.job_id)
        print("Job executed")


def job_added(event):
    with scheduler.app.app_context():
        print(event.job_id)
        print(event)


def event_log(event):
    with scheduler.app.app_context():
        print("Event Log", event.job_id)


scheduler.add_listener(update_status, EVENT_JOB_EXECUTED)
scheduler.add_listener(job_added, EVENT_JOB_ADDED)
scheduler.add_listener(event_log, EVENT_ALL)
