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

```
memorable-messages/
|
|-- backend/
|-- frontend/
```

- `static/`: Contains static files (images, scripts, stylesheets).
- `templates/`: Contains HTML templates.
- `.env`: Environment variables file (You need to create this, see [Setting Up Environment Variables](#setting-up-environment-variables)).
- `app.py`: Contains the Flask application code.
- `forms.py`: Defines the forms used in the application.
- `models.py`: Defines the database models.
- `requirements.txt`: Lists the project dependencies.
- `config.py`: Configuration settings for the application.
- `requirements.txt`: Lists the project dependencies.
- `test_*.py`: Script to run unit-test on the Flask application.

## Setting Up Environment Variables

Before running the application, you need to set up your environment variables. Create a `.env` file in the project root directory and define the following variables:

```plaintext
DB_PASSWORD=your_database_password
```

Replace `your_database_password` with the actual password for your database.

## Running the Application

To run the application, execute the following command in your terminal:

```bash
flask run
```

The application will start and be accessible at `http://localhost:5000/` in your web browser.

## Usage

1. Access the homepage and choose whether to log in or register an account.
2. After logging in, you can create new QR codes by specifying the content and customization options.
3. Generated QR codes can be downloaded or saved in your profile.

## Features

- User registration and login functionality.
- Customizable QR code generation.
- Secure storage of user passwords and data.
- User-friendly interface.
- Additional features (stretch goals) may include social media sharing, QR code scan tracking, and QR code design templates.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
