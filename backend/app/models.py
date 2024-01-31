from flask_bcrypt import Bcrypt
from datetime import datetime, timezone
from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db

bcrypt = Bcrypt()


class User(db.Model):
    __tablename__ = "users"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), unique=True)
    email: so.Mapped[str] = so.mapped_column(sa.String(120), unique=True)
    password_hash: so.Mapped[Optional[str]] = so.mapped_column(sa.String(256))
    created_at: so.Mapped[datetime] = so.mapped_column(
        default=lambda: datetime.now(timezone.utc)
    )

    occasions: so.WriteOnlyMapped["Occasion"] = so.relationship(
        back_populates="user", passive_deletes=True, cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<User {self.username}>"

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("UTF-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self, include_email=False):
        data = {"id": self.id, "username": self.username, "created_at": self.created_at}

        if include_email:
            data["email"] = self.email

        return data

    def from_dict(self, data, new_user=False):
        for field in ["username", "email"]:
            if field in data:
                setattr(self, field, data[field])
            if new_user and "password" in data:
                self.set_password(data["password"])


class Occasion(db.Model):
    __tablename__ = "occasions"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id))
    delivery_method: so.Mapped[str] = so.mapped_column(sa.String(64))
    occasion_type: so.Mapped[str] = so.mapped_column(sa.String(256))
    message_content: so.Mapped[str] = so.mapped_column(sa.Text())
    date_time: so.Mapped[datetime] = so.mapped_column(sa.DateTime())
    created_at: so.Mapped[datetime] = so.mapped_column(
        default=lambda: datetime.now(timezone.utc)
    )

    user: so.Mapped[User] = so.relationship(back_populates="occasions")
    delivery_histories: so.WriteOnlyMapped["DeliveryHistory"] = so.relationship(
        back_populates="occasion", passive_deletes=True, cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Occasion {self.occasion_type}>"


class DeliveryHistory(db.Model):
    __tablename__ = "delivery_histories"

    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    occasion_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(Occasion.id))
    status: so.Mapped[str] = so.mapped_column(sa.String(64))
    timestamp: so.Mapped[datetime] = so.mapped_column(
        default=lambda: datetime.now(timezone.utc)
    )

    occasion: so.Mapped[Occasion] = so.relationship(back_populates="delivery_histories")

    def __repr__(self):
        return f"<DeliveryHistory {self.status}>"
