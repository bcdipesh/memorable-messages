"""
email.py

This file contains utility functions related to sending emails and scheduling email jobs
using Flask-Mail and APScheduler. It also includes a function for sending a password reset
email.
"""

from app import mail, scheduler
from flask import current_app, render_template
from flask_mail import Message


def send_email(app, subject, sender, recipients, text_body, html_body):
    """
    Send an email with both text and HTML bodies.

    Args:
    - app: The Flask application instance.
    - subject: The subject of the email.
    - sender: The sender's email address.
    - recipients: List of recipient email addresses.
    - text_body: The plain text body of the email.
    - html_body: The HTML body of the email.
    """

    with app.app_context():
        msg = Message(subject=subject, sender=sender, recipients=recipients)
        msg.body = text_body
        msg.html = html_body
        mail.send(msg)


def send_password_reset_email(token, user):
    """
    Send a password reset email to a user.

    Args:
    - token: The password reset token.
    - user: The user to whom the email is sent.
    """

    token = token
    send_email(
        app=current_app,
        subject="Memorable Messages Reset Your Password",
        sender=current_app.config["ADMINS"][0],
        recipients=[user.email],
        text_body=render_template("email/reset_password.txt", user=user, token=token),
        html_body=render_template("email/reset_password.html", user=user, token=token),
    )


def schedule_email(occasion, action="CREATE"):
    """
    Schedule or update an email job based on the occasion's details and action.

    Args:
    - occasion: The Occasion model instance representing the scheduled email.
    - action: The action to perform (CREATE, UPDATE, DELETE).
    """

    job_id = str(occasion.id)

    if action == "UPDATE" and scheduler.get_job(job_id) is not None:
        scheduler.modify_job(
            func=send_email,
            trigger="date",
            run_date=occasion.date_time,
            args=[
                current_app._get_current_object(),
                occasion.occasion_type,
                occasion.user.email,
                [occasion.receiver_email],
                occasion.message_content,
                occasion.message_content,
            ],
            id=job_id,
            misfire_grace_time=86400,
        )
    elif action == "DELETE" and scheduler.get_job(job_id) is not None:
        scheduler.remove_job(id=job_id)
    else:
        scheduler.add_job(
            func=send_email,
            trigger="date",
            run_date=occasion.date_time,
            args=[
                current_app._get_current_object(),
                occasion.occasion_type,
                occasion.user.email,
                [occasion.receiver_email],
                occasion.message_content,
                occasion.message_content,
            ],
            id=job_id,
            misfire_grace_time=86400,
        )
