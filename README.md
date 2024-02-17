# Memorable Messages

## Project Overview

Memorable Messages is a web application that allows users to create, store, and share personalized messages. It utilizes a REST API built with Flask (backend) and a React application (frontend) built with Vite.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
2. [Project Structure](#project-structure)

3. [Setting Up Environment Variables](#setting-up-environment-variables)

4. [Running the Application](#running-the-application)

5. [Usage](#usage)

6. [Features](#features)

7. [License](#license)

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Python (version 3.6 or higher)
- pip (Python package manager)
- Virtual environment (recommended)
- Node (version 20.10.0 or higher)
- NPM (version 10.2.3 or higher)
- PostgreSQL (version 16 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd memorable-messages
   ```

2. Create a virtual environment (optional but recommended):

   ```bash
   cd memorable-messages/backend
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the project dependencies:

   ```bash
   cd memorable-messages/backend
   pip install -r requirements.txt
   cd ../frontend
   npm install
   ```

## Project Structure

The project is organized as follows:

```plaintext
memorable-messages/
├───backend
│   ├───app
│   │   ├───api
│   │   ├───errors
│   │   └───templates
│   │       └───email
│   └───migrations
│       └───versions
└───frontend
    ├───public
    └───src
        ├───apis
        │   └───memorableMessages
        ├───assets
        ├───authProvider
        ├───components
        │   ├───routing
        │   └───ui
        ├───contexts
        │   └───authContext
        ├───lib
        ├───pages
        │   └───__snapshots__
        ├───schemas
        └───__snapshots__
```

- `backend/`: Root folder for the Python Flask backend application.

  - `app/`: Main application folder.
    - `api/`: Contains modules related to handling API routes and logic.
    - `errors/`: Includes modules for handling errors and exceptions.
    - `templates/`: Holds templates for various components.
      - `email/`: Templates related to email content.
  - `migrations/`: Folder for database migration scripts.
    - `versions/`: Contains versions of database migration scripts.

- `frontend/`: Root folder for the React frontend application.
  - `public/`: Holds static assets that will be served as-is (e.g., images, icons).
  - `src/`: Main source code folder.
    - `apis/`: Handles API-related logic and communication with the backend.
      - `memorableMessages/`: Specific API-related files for handling memorable messages.
    - `assets/`: Contains static assets used within the React components.
    - `authProvider/`: Logic related to authentication providers.
    - `components/`: Reusable React components.
      - `routing/`: Components related to routing/navigation.
      - `ui/`: Generic UI components.
    - `contexts/`: React context providers.
      - `authContext/`: Context related to authentication.
    - `lib/`: General-purpose utility functions or libraries.
    - `pages/`: React components representing different pages of the application.
      - `__snapshots__/`: Auto-generated snapshots of React components for testing purposes.
    - `schemas/`: JSON schemas or data validation logic.
    - `__snapshots__/`: Auto-generated snapshots of the entire application for testing purposes.

## Setting Up Environment Variables

Before running the application, you need to set up your environment variables.

- Create a `.env` file inside the backend directory and define the following variables:

  ```plaintext
  SECRET_KEY=your_secret_key
  DATABASE_URI=your_database_uri
  MAIL_SERVER=your_mail_server
  MAIL_PORT=your_mail_port
  MAIL_USE_TLS=your_mail_use_tls
  MAIL_USERNAME=your_mail_username
  MAIL_PASSWORD=your_mail_password
  ```

- Create a `.flaskenv` file inside the backend directory and define the following variables:

  ```plaintext
  FLASK_DEBUG=1
  FLAKS_APP="memorable-messages.py"
  ```

## Running the Application

To run the application, execute the following command in your terminal:

_Note: You have to open two terminals to run the application (one for running the backend and one for running the frontend)._

```bash
cd memorable-messages/backend
flask run
# On Windows you may have to replace "/" with "\"
```

```bash
cd memorable-messages/frontend
npm run dev
# On Windows you may have to replace "/" with "\"
```

The application will start and be accessible at `http://localhost:5173/` in your web browser.

API docs are available at `http://localhost:5000/api-docs` in your web browser.

## Usage

1. Access the homepage and choose whether to log in or register an account.
2. Once logged in, you can create new occasions by specifying the content and customization options.
3. Created occasions can be modified, deleted, or viewed on the occasions page.
4. Additionally, you can change your profile details and update your password.

## Features

- User registration and login functionality.
- Custom occasions.
- Secure storage of user passwords and data.
- User-friendly interface.
- Additional features (stretch goals) may include repeated occasions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
