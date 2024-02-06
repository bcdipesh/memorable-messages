from app import mail, scheduler
from flask import current_app, render_template
from flask_mail import Message


def send_email(app, subject, sender, recipients, text_body, html_body):
    with app.app_context():
        msg = Message(subject=subject, sender=sender, recipients=recipients)
        msg.body = text_body
        msg.html = html_body
        mail.send(msg)


def send_password_reset_email(token, user):
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
                current_app.config["ADMINS"],
                occasion.message_content,
                occasion.message_content,
            ],
            id=job_id,
            misfire_grace_time=86400,
        )
    else:
        scheduler.add_job(
            func=send_email,
            trigger="date",
            run_date=occasion.date_time,
            args=[
                current_app._get_current_object(),
                occasion.occasion_type,
                occasion.user.email,
                current_app.config["ADMINS"],
                occasion.message_content,
                occasion.message_content,
            ],
            id=job_id,
            misfire_grace_time=86400,
        )
