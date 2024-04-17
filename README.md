# Memorable Messages

## Project Overview

**Memorable Messages** is a user-friendly web application enabling individuals to craft, save, and exchange personalized messages effortlessly. Utilizing a robust REST API powered by Flask on the backend and a sleek React frontend developed with Vite, it provides a seamless platform for users to create and share meaningful messages with ease.

You can access the live site through this [link](https://memorable-messages.netlify.app/)

To learn more about the API that powers this application. Please visit this [link](https://memorable-messages-api.onrender.com/api-docs)

## Motivation

**Memorable Messages** is a heartfelt solution born out of a personal need to cherish and celebrate special moments with loved ones. Designed to ensure you never miss an opportunity to send warm wishes on those important occasions, this web application seamlessly integrates with Gmail, allowing you to effortlessly share personalized messages with the click of a button. Built with React for a user-friendly frontend and Python/Flask for a robust backend API, **Memorable Messages** not only simplifies the process of remembering and sending heartfelt messages but also elevates the quality of your interactions by infusing them with sincerity and thoughtfulness. Whether it's a birthday, anniversary, or just a simple note to brighten someone's day, this app empowers you to strengthen your connections and make every moment memorable.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Tech Stack and Prerequisites](#tech-stack-and-prerequisites)
   - [Installation](#installation)
2. [Project Structure](#project-structure)

3. [Setting Up Environment Variables](#setting-up-environment-variables)

4. [Running the Application](#running-the-application)

5. [Running tests](#running-tests)

6. [Usage](#usage)

7. [Features and Explanation](#features-and-explanation)

8. [License](#license)

## Getting Started

### Tech Stack and Prerequisites

The following tech stack was used to build this project:

#### **Frontend**

- **JavaScript (ES6+):** Used for client-side scripting, enhancing the interactivity and dynamic features of the application.
- **React.js:** Chosen as the frontend library to build a modular and efficient user interface.
- **Tailwindcss:** A utility-first CSS framework used for styling, providing a highly customizable and responsive design approach.

#### **Backend**

- **Python (3.6):** Used as the backend programming language for its versatility and readability.
- **Flask:** A lightweight and flexible web framework for building APIs and web applications.
- **PostgreSQL:** Chosen as the relational database for its robustness and support for complex queries.

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

## Running tests

Tests for the backend API are included inside the `memorabe-messages/backend/tests.py` file. To run the tests execute the following command in your terminal:

```bash
cd memorable-messages/backend
python tests.py
# On Windows you may have to replace "/" with "\"
```

Tests for the frontend are colocated with their respective components iniside the `memorable-messages/src/pages` directory. To run the tests execute the following command in your terminal:

```bash
cd memorable-messages/frontend
npm run test
# On Windows you may have to replace "/" with "\"
```

The application will start and be accessible at `http://localhost:5173/` in your web browser.

API docs are available at `http://localhost:5000/api-docs` in your web browser.

## Usage

- Access the homepage and choose whether to log in or register an account.
- Once logged in, you can create new occasions by specifying the content and customization options.
- Created occasions can be modified, deleted, or viewed on the occasions page.
- Additionally, you can change your profile details and update your password.

## Features and Explanation

1. **User Registration and Login Functionality:**

   - Allows users to register accounts and log in securely.
   - Enhances user experience by providing personalized access.

2. **Custom Occasions:**

   - Enables users to create and customize occasions based on their preferences.
   - Adds a personalized touch to the application, making it more versatile.

3. **Secure Storage of User Passwords and Data:**

   - Implements robust security measures to ensure the safe storage of user passwords and sensitive data.
   - Prioritizes user privacy and data protection.

4. **User-Friendly Interface:**

   - Designs an intuitive and user-friendly interface for a seamless user experience.
   - Enhances accessibility and overall satisfaction for users interacting with the application.

### Additional Features (Stretch Goals)

1. **Repeated Occasions:**
   - Includes the ability to set and manage repeated occasions for users who have recurring events.
   - Enhances the application's functionality by addressing a broader range of user needs.

### Explanation

The implemented features were chosen to address fundamental aspects of user interaction and security while using the application. Here's a brief explanation of why each feature was included:

- **User Registration and Login Functionality:**

  - This is essential for providing personalized services to users and ensuring a secure environment for their data.

- **Custom Occasions:**

  - Adding the ability to create custom occasions enhances the application's flexibility, allowing users to tailor their experience according to their specific needs.

- **Secure Storage of User Passwords and Data:**

  - Security is a top priority to protect user information, instilling trust and confidence in the application.

- **User-Friendly Interface:**

  - A user-friendly interface is crucial for a positive user experience, reducing the learning curve and making the application accessible to a wider audience.

- **Repeated Occasions (Stretch Goal):**
  - Including the option for repeated occasions adds an extra layer of convenience for users with recurring events, enhancing the application's overall utility.

These features collectively contribute to a well-rounded and user-centric application, meeting both essential and potential user requirements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
