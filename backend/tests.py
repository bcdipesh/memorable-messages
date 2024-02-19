"""
test_app.py

This file contains unit tests for the Flask application 'app' using the unittest framework.
It covers various aspects of the application, including models, authentication routes,
user-related routes, occasion-related routes, and delivery history-related routes.

Each test case class focuses on specific functionalities within the application.
"""

import unittest
from datetime import datetime, timezone

import sqlalchemy as sa
from app import create_app, db
from app.models import DeliveryHistory, Occasion, User
from config import Config


# Test configuration with a separate database for testing
class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = (
        "postgresql://postgres:pgAdmin@localhost/memorable_messages_test"
    )


# Test case for models
class ModelsTestCase(unittest.TestCase):
    def setUp(self):
        # Set up the Flask app for testing
        self.app = create_app(TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        # Create the database tables
        db.create_all()

    def tearDown(self):
        # Remove the app context and drop the database tables
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    # Test user password hashing and checking
    def test_user_password_hash(self):
        u = User(username="test", email="test@gmail.com")
        u.set_password("test")
        self.assertFalse(u.check_password("Test"))
        self.assertTrue(u.check_password("test"))

    # Test the to_dict method of the User model
    def test_user_to_dict(self):
        u = User(username="test", email="test@gmail.com")
        u.set_password("test")
        user_dict = u.to_dict(include_email=True)
        self.assertEqual(user_dict["username"], "test")
        self.assertEqual(user_dict["email"], "test@gmail.com")
        self.assertTrue("password_hash" not in user_dict)

    # Test the to_dict method of the Occasion model
    def test_occasion_to_dict(self):
        user = User(username="test", email="test@gmail.com")
        occasion = Occasion(
            user=user,
            delivery_method="email",
            occasion_type="birthday",
            is_repeated=False,
            date_time=datetime.now(timezone.utc),
            receiver_email="recipient@example.com",
        )
        occasion_dict = occasion.to_dict(include_message_content=True)
        self.assertEqual(occasion_dict["delivery_method"], "email")
        self.assertEqual(occasion_dict["occasion_type"], "birthday")
        self.assertTrue("message_content" in occasion_dict)

    # Test the to_dict method of the DeliveryHistory model
    def test_delivery_history_to_dict(self):
        user = User(username="test", email="test@gmail.com")
        occasion = Occasion(
            user=user,
            delivery_method="email",
            occasion_type="birthday",
            is_repeated=False,
            date_time=datetime.now(timezone.utc),
            receiver_email="recipient@example.com",
        )
        delivery_history = DeliveryHistory(occasion=occasion, status="delivered")
        history_dict = delivery_history.to_dict()
        self.assertEqual(history_dict["status"], "delivered")
        self.assertTrue("timestamp" in history_dict)


# Test case for authentication routes
class AuthRoutesTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    # Test user registration
    def test_register_user(self):
        data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword",
        }
        response = self.app.test_client().post("/api/v1/auth/register", json=data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue("user" in response.json)
        self.assertTrue("access_token" in response.json)

    # Test registration with an existing username
    def test_register_existing_user(self):
        user = User(username="existinguser", email="existinguser@example.com")
        user.set_password("existingpassword")
        db.session.add(user)
        db.session.commit()

        data = {
            "username": "existinguser",
            "email": "newuser@example.com",
            "password": "newpassword",
        }
        response = self.app.test_client().post("/api/v1/auth/register", json=data)
        self.assertEqual(response.status_code, 400)
        self.assertTrue("error" in response.json)
        self.assertTrue("please use a different username" in response.json["message"])

    # Test user login
    def test_login(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue("access_token" in response.json)

    # Test login with invalid credentials
    def test_login_invalid_credentials(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "wrongpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        self.assertEqual(response.status_code, 401)
        self.assertTrue("error" in response.json)
        self.assertTrue("invalid credentials" in response.json["message"])


# Test case for user-related routes
class UsersRoutesTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    # Test get all users
    def test_get_users(self):
        admin_user = User(username="admin", email="admin@example.com", is_admin=True)
        admin_user.set_password("testpassword")
        user1 = User(username="user1", email="user1@example.com")
        user2 = User(username="user2", email="user2@example.com")
        db.session.add_all([admin_user, user1, user2])
        db.session.commit()

        data = {"username": "admin", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        response = self.app.test_client().get(
            "/api/v1/users", headers={"Authorization": f"Bearer {access_token}"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue("users" in response.json)

    # Test delete user
    def test_delete_user(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        response = self.app.test_client().delete(
            f"/api/v1/users/{user.id}",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        self.assertEqual(response.status_code, 204)
        self.assertIsNone(db.session.scalar(sa.select(User).where(User.id == user.id)))

    # Test get user by ID
    def test_get_user(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        response = self.app.test_client().get(
            f"/api/v1/users/{user.id}",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue("testuser" in response.json["username"])
        self.assertTrue("testuser@example.com" in response.json["email"])

    # Test update user by ID
    def test_update_user(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        updated_data = {
            "username": "updateduser",
            "email": "updateduser@example.com",
        }
        response = self.app.test_client().put(
            f"/api/v1/users/{user.id}",
            json=updated_data,
            headers={"Authorization": f"Bearer {access_token}"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["username"], updated_data["username"])
        self.assertEqual(response.json["email"], updated_data["email"])

    # Test get user occasions
    def test_user_occasions(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        occasion = Occasion(
            user=user,
            delivery_method="email",
            occasion_type="birthday",
            message_content="Happy Birthday!",
            is_repeated=False,
            date_time=datetime.now(timezone.utc),
            receiver_email="recipient@example.com",
        )
        db.session.add(occasion)
        db.session.commit()

        response = self.app.test_client().get(
            f"/api/v1/users/{user.id}/occasions",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue("occasions" in response.json)
        self.assertEqual(len(response.json["occasions"]), 1)

    # Test create user occasion
    def test_create_user_occasion(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        occasion_data = {
            "delivery_method": "email",
            "occasion_type": "birthday",
            "message_content": "Happy Birthday!",
            "is_repeated": False,
            "date_time": datetime.now(timezone.utc).isoformat(),
            "receiver_email": "recipient@example.com",
        }
        response = self.app.test_client().post(
            f"/api/v1/users/{user.id}/occasions",
            json=occasion_data,
            headers={"Authorization": f"Bearer {access_token}"},
        )

        self.assertEqual(response.status_code, 201)
        self.assertTrue("occasion" in response.json)
        self.assertEqual(
            response.json["occasion"]["occasion_type"], occasion_data["occasion_type"]
        )


# Test case for occasion-related routes
class OccasionsRoutesTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    # Test get all occasions
    def test_get_occasions(self):
        user = User(username="testuser", email="testuser@example.com", is_admin=True)
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        occasion = Occasion(
            user=user,
            delivery_method="email",
            occasion_type="birthday",
            message_content="Happy Birthday!",
            is_repeated=False,
            date_time=datetime.now(timezone.utc),
            receiver_email="recipient@example.com",
        )
        db.session.add(occasion)
        db.session.commit()

        response = self.app.test_client().get(
            "/api/v1/occasions", headers={"Authorization": f"Bearer {access_token}"}
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue("occasions" in response.json)
        self.assertEqual(len(response.json["occasions"]), 1)

    # Test delete occasion by ID
    def test_delete_occasion(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        occasion = Occasion(
            user=user,
            delivery_method="email",
            occasion_type="birthday",
            message_content="Happy Birthday!",
            is_repeated=False,
            date_time=datetime.now(timezone.utc),
            receiver_email="recipient@example.com",
        )
        db.session.add(occasion)
        db.session.commit()

        response = self.app.test_client().delete(
            f"/api/v1/occasions/{occasion.id}",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        self.assertEqual(response.status_code, 204)
        self.assertIsNone(
            db.session.scalar(sa.select(Occasion).where(Occasion.id == occasion.id))
        )

    # Test get occasion by ID
    def test_get_occasion(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        occasion = Occasion(
            user=user,
            delivery_method="email",
            occasion_type="birthday",
            message_content="Happy Birthday!",
            is_repeated=False,
            date_time=datetime.now(timezone.utc),
            receiver_email="recipient@example.com",
        )
        db.session.add(occasion)
        db.session.commit()

        response = self.app.test_client().get(
            f"/api/v1/occasions/{occasion.id}",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue("occasion" in response.json)
        self.assertEqual(
            response.json["occasion"]["occasion_type"], occasion.occasion_type
        )

    # Test update occasion by ID
    def test_update_occasion(self):
        user = User(username="testuser", email="testuser@example.com")
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        occasion = Occasion(
            user=user,
            delivery_method="email",
            occasion_type="birthday",
            message_content="Happy Birthday!",
            is_repeated=False,
            date_time=datetime.now(timezone.utc),
            receiver_email="recipient@example.com",
        )
        db.session.add(occasion)
        db.session.commit()

        updated_data = {
            "delivery_method": "sms",
            "occasion_type": "anniversary",
            "message_content": "Happy Anniversary!",
            "is_repeated": True,
            "date_time": datetime.now(timezone.utc).isoformat(),
            "receiver_email": "anniversary@example.com",
            "receiver_phone": "+123456789",
        }

        response = self.app.test_client().put(
            f"/api/v1/occasions/{occasion.id}",
            json=updated_data,
            headers={"Authorization": f"Bearer {access_token}"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue("occasion" in response.json)
        self.assertEqual(
            response.json["occasion"]["delivery_method"],
            updated_data["delivery_method"],
        )

    # Test get occasion delivery histories
    def test_occasion_delivery_histories(self):
        user = User(username="testuser", email="testuser@example.com", is_admin=True)
        user.set_password("testpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "testuser", "password": "testpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        access_token = response.json["access_token"]
        occasion = Occasion(
            user=user,
            delivery_method="email",
            occasion_type="birthday",
            message_content="Happy Birthday!",
            is_repeated=False,
            date_time=datetime.now(timezone.utc),
            receiver_email="recipient@example.com",
        )
        db.session.add(occasion)
        db.session.commit()

        delivery_history = DeliveryHistory(occasion=occasion, status="DELIVERED")
        db.session.add(delivery_history)
        db.session.commit()

        response = self.app.test_client().get(
            f"/api/v1/occasions/{occasion.id}/delivery-histories",
            headers={"Authorization": f"Bearer {access_token}"},
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue("delivery_histories" in response.json)
        self.assertEqual(len(response.json["delivery_histories"]), 1)


# Test case for delivery history-related routes
class DeliveryHistoriesRoutesTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    # Test get all delivery histories
    def test_delivery_histories(self):
        admin_user = User(
            username="adminuser", email="adminuser@example.com", is_admin=True
        )
        admin_user.set_password("adminpassword")
        db.session.add(admin_user)

        user = User(username="testuser", email="testuser@example.com")
        user.set_password("userpassword")
        db.session.add(user)
        db.session.commit()

        data = {"username": "adminuser", "password": "adminpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        admin_access_token = response.json["access_token"]

        data = {"username": "testuser", "password": "userpassword"}
        response = self.app.test_client().post("/api/v1/auth/login", json=data)
        user_access_token = response.json["access_token"]

        occasion = Occasion(
            user=user,
            delivery_method="email",
            occasion_type="birthday",
            message_content="Happy Birthday!",
            is_repeated=False,
            date_time=datetime.now(timezone.utc),
            receiver_email="recipient@example.com",
        )
        db.session.add(occasion)
        db.session.commit()

        delivery_history = DeliveryHistory(occasion=occasion, status="DELIVERED")
        db.session.add(delivery_history)
        db.session.commit()

        # Admin user should be able to get all delivery histories
        admin_response = self.app.test_client().get(
            "/api/v1/delivery-histories",
            headers={"Authorization": f"Bearer {admin_access_token}"},
        )

        self.assertEqual(admin_response.status_code, 200)
        self.assertTrue("delivery_histories" in admin_response.json)
        self.assertEqual(len(admin_response.json["delivery_histories"]), 1)

        # Regular user should not be able to get all delivery histories
        user_response = self.app.test_client().get(
            "/api/v1/delivery-histories",
            headers={"Authorization": f"Bearer {user_access_token}"},
        )

        self.assertEqual(user_response.status_code, 401)
        self.assertTrue("error" in user_response.json)
        self.assertEqual(user_response.json["error"], "Unauthorized")


if __name__ == "__main__":
    unittest.main(verbosity=2)
