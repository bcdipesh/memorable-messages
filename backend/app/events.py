"""Utility functions to respond to certain events emitted by flask-apscheduler."""

import logging

from app import db, scheduler
from app.models import DeliveryHistory
from apscheduler.events import EVENT_JOB_ADDED, EVENT_JOB_EXECUTED, EVENT_JOB_MISSED

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


def job_missed_log(event):
    with scheduler.app.app_context():
        print("Job missed should retry itself", event, event.job_id)


def resume_on_add(event):
    with scheduler.app.app_context():
        print("Resuming job on EVENT_JOB_ADDED", event)
        print("Scheduler state", scheduler.state)
        scheduler.resume()
        print("Scheduler state", scheduler.state)


scheduler.add_listener(update_status, EVENT_JOB_EXECUTED)
scheduler.add_listener(job_missed_log, EVENT_JOB_MISSED)
scheduler.add_listener(resume_on_add, EVENT_JOB_ADDED)
