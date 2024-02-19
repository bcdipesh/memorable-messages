"""
models.py

This file contains the SQLAlchemy models for the Memorable Messages Web Application.
The models define the structure of the database tables and relationships between them.
Each class represents a table in the database and includes attributes, relationships,
and methods for interacting with the data.
"""

from datetime import datetime, timezone
from typing import Optional

import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db, jwt
from flask_bcrypt import Bcrypt

# Create a Bcrypt object for password hashing
bcrypt = Bcrypt()


class User(db.Model):
    """
    User model representing a registered user.

    Attributes:
    - id: Unique identifier for the user.
    - username: User's unique username.
    - email: User's email address.
    - password_hash: Hashed password using Bcrypt.
    - is_admin: Flag indicating if the user is an administrator.
    - created_at: Timestamp indicating when the user was created.
    - occasions: Relationship with the Occasion model.
    """

    __tablename__ = "users"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), unique=True)
    email: so.Mapped[str] = so.mapped_column(sa.String(120), unique=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))
    is_admin: so.Mapped[bool] = so.mapped_column(server_default=sa.text("false"))
    created_at: so.Mapped[datetime] = so.mapped_column(
        default=lambda: datetime.now(timezone.utc), type_=sa.DateTime(timezone=True)
    )

    occasions: so.WriteOnlyMapped["Occasion"] = so.relationship(
        back_populates="user", passive_deletes=True, cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.username}>"

    def set_password(self, password):
        """Set the password for the user."""

        self.password_hash = bcrypt.generate_password_hash(password).decode("UTF-8")

    def check_password(self, password):
        """Check if the provided password matches the stored hash."""

        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self, include_email=False):
        """Convert the user object to a dictionary."""

        data = {
            "id": self.id,
            "username": self.username,
            "is_admin": self.is_admin,
            "created_at": self.created_at,
        }

        if include_email:
            data["email"] = self.email

        return data

    def from_dict(self, data, new_user=False):
        """Populate user fields from a dictionary."""

        for field in ["username", "email", "is_admin"]:
            if field in data:
                setattr(self, field, data[field])
            if new_user and "password" in data:
                self.set_password(data["password"])


@jwt.user_identity_loader
def user_identity_lookup(user):
    """Custom user identity loader for JWT."""

    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    """Custom user lookup callback for JWT."""

    identity = jwt_data["sub"]
    return db.session.scalar(sa.select(User).where(User.id == identity))


class Occasion(db.Model):
    """
    Occasion model representing an event for which a user can create a message.

    Attributes:
    - id: Unique identifier for the occasion.
    - user_id: Foreign key referencing the user associated with the occasion.
    - delivery_method: Method of delivering the message (e.g., email, SMS).
    - occasion_type: Type of occasion (e.g., birthday, anniversary).
    - message_content: Content of the message.
    - is_repeated: Flag indicating if the message should be repeated yearly.
    - date_time: Date and time of the occasion.
    - receiver_email: Email address of the message recipient.
    - receiver_phone: Phone number of the message recipient.
    - created_at: Timestamp indicating when the occasion was created.
    - user: Relationship with the User model.
    - delivery_histories: Relationship with the DeliveryHistory model.
    """

    __tablename__ = "occasions"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    user_id: so.Mapped[int] = so.mapped_column(
        sa.ForeignKey(User.id, ondelete="cascade")
    )
    delivery_method: so.Mapped[str] = so.mapped_column(sa.String(64))
    occasion_type: so.Mapped[str] = so.mapped_column(sa.String(256))
    message_content: so.Mapped[str] = so.mapped_column(sa.Text())
    is_repeated: so.Mapped[bool] = so.mapped_column(server_default=sa.text("false"))
    date_time: so.Mapped[datetime] = so.mapped_column(sa.DateTime(timezone=True))
    receiver_email: so.Mapped[Optional[str]] = so.mapped_column(sa.String(120))
    receiver_phone: so.Mapped[Optional[str]] = so.mapped_column(sa.String(15))
    created_at: so.Mapped[datetime] = so.mapped_column(
        default=lambda: datetime.now(timezone.utc), type_=sa.DateTime(timezone=True)
    )

    user: so.Mapped[User] = so.relationship(back_populates="occasions")
    delivery_histories: so.WriteOnlyMapped["DeliveryHistory"] = so.relationship(
        back_populates="occasion", passive_deletes=True, cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Occasion {self.occasion_type}>"

    def to_dict(self, include_message_content=False):
        """Convert the occasion object to a dictionary."""

        data = {
            "id": self.id,
            "user_id": self.user_id,
            "delivery_method": self.delivery_method,
            "occasion_type": self.occasion_type,
            "is_repeated": self.is_repeated,
            "date_time": self.date_time,
            "receiver_email": self.receiver_email,
            "receiver_phone": self.receiver_phone,
            "created_at": self.created_at,
        }

        if include_message_content:
            data["message_content"] = self.message_content

        return data

    def from_dict(self, data):
        """Populate occasion fields from a dictionary."""

        for field in [
            "user_id",
            "delivery_method",
            "occasion_type",
            "is_repeated",
            "message_content",
            "date_time",
            "receiver_email",
            "receiver_phone",
        ]:
            if field in data:
                setattr(self, field, data[field])


class DeliveryHistory(db.Model):
    """
    DeliveryHistory model representing the delivery history of an occasion.

    Attributes:
    - id: Unique identifier for the delivery history.
    - occasion_id: Foreign key referencing the occasion associated with the delivery history.
    - status: Status of the delivery (e.g., delivered, pending).
    - timestamp: Timestamp indicating when the delivery status was recorded.
    - occasion: Relationship with the Occasion model.
    """

    __tablename__ = "delivery_histories"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    occasion_id: so.Mapped[int] = so.mapped_column(
        sa.ForeignKey(Occasion.id, ondelete="cascade")
    )
    status: so.Mapped[str] = so.mapped_column(sa.String(64))
    timestamp: so.Mapped[datetime] = so.mapped_column(
        default=lambda: datetime.now(timezone.utc), type_=sa.DateTime(timezone=True)
    )

    occasion: so.Mapped[Occasion] = so.relationship(back_populates="delivery_histories")

    def __repr__(self):
        return f"<DeliveryHistory {self.status}>"

    def to_dict(self):
        """Convert the delivery history object to a dictionary."""

        data = {
            "id": self.id,
            "occasion_id": self.occasion_id,
            "status": self.status,
            "timestamp": self.timestamp,
        }

        return data

    def from_dict(self, data):
        """Populate delivery history fields from a dictionary."""

        for field in ["occasion_id", "status"]:
            if field in data:
                setattr(self, field, data[field])

        return data
