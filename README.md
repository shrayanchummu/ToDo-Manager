# To-Do Manager Backend

Welcome to the To-Do Manager Backend repository! 

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
    - [Tasks](#tasks)
    - [Subtasks](#subtasks)
- [Development Process](#development-process)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [RESTful API Design](#restful-api-design)
  - [Authentication Flow](#authentication-flow)
  - [Database Schema](#database-schema)
- [Acknowledgments](#acknowledgments)

## Features

- **Task Management**: Create, update, and delete tasks with due dates, descriptions, priorities, and status.
- **Subtask Management**: Manage subtasks associated with each task.
- **Twilio Integration**: Receive automated calls as reminders when a task's due date has passed.

## Getting Started

### Prerequisites

Ensure you have the following prerequisites before getting started:

- Node.js and npm installed
- MongoDB database instance

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/shrayanchummu/ToDo-Manager.git
    ```

2. **Change into the project directory:**

    ```bash
    cd your-repo
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    PORT=5050
    CONNECTION_STRING=your_mongodb_uri
    ACCESS_TOKEN_SECRET=your_secret_password
    ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    ```

## Usage

Run the application:

```bash
node index.js
```

Visit [http://localhost:5050](http://localhost:5050) in your browser.

### API Documentation

#### Authentication

- **Register User:**
  - `POST /api/user/register`
  - Request Body: `{ "phone_number": "your_ph_number", "password": "your_password" }`

- **Login User:**
  - `POST /api/user/login`
  - Request Body: `{ "phone_number": "your_ph_number", "password": "your_password" }`
  - Response: `{ "accessToken": "your_access_token" }`

- **Get Current User:**
  - `GET /api/user/current`
  - Authorization: Bearer Token

#### Tasks

- **Get All Tasks:**
  - `GET /api/tasks`
  - Authorization: Bearer Token
  - Response: Array of tasks

- **Create Task:**
  - `POST /api/tasks`
  - Authorization: Bearer Token
  - Request Body: `{ "title": "task_title", "description": "task_description", "due_date": "task_due_date", "status": "task_status" }`
  - Response: Created task details

- **Update Task by ID:**
  - `PUT /api/tasks/:id`
  - Authorization: Bearer Token
  - Request Body: `{ "title": "new_task_title", "description": "new_task_description", "due_date": "new_task_due_date", "status": "new_task_status" }`
  - Response: Updated task details

- **Delete Task by ID:**
  - `DELETE /api/tasks/:id`
  - Authorization: Bearer Token
  - Response: Deleted task details

#### Subtasks

- **Get Subtasks by Task ID:**
  - `GET /api/subtasks/:taskId`
  - Authorization: Bearer Token
  - Response: Array of subtasks for the specified task ID

- **Create Subtask:**
  - `POST /api/subtasks`
  - Authorization: Bearer Token
  - Request Body: `{ "task_id": "task_id", "name": "subtask_name", "status": "subtask_status" }`
  - Response: Created subtask details

- **Update Subtask by ID:**
  - `PUT /api/subtasks/:id`
  - Authorization: Bearer Token
  - Request Body: `{ "name": "new_subtask_name", "status": "new_subtask_status" }`
  - Response: Updated subtask details

- **Delete Subtask by ID:**
  - `DELETE /api/subtasks/:id`
  - Authorization: Bearer Token
  - Response: Deleted subtask details
 
## Development Process

### Technologies Used

- **Node.js and Express.js:** Leveraged for building a scalable and efficient backend server.
- **MongoDB:** Utilized as the database for storing tasks, subtasks, and user information.
- **JWT (JSON Web Token):** Implemented for secure user authentication.
- **bcrypt:** Employed for hashing passwords to enhance security.

### Project Structure

The project is organized into several key folders to maintain a clean and modular codebase:

- `middleware`: Contains middleware functions, including error handling and authentication checks.
- `config`: Holds configuration files, such as database connection settings.
- `routes`: Defines API routes for managing users, tasks, and subtasks.
- `controllers`: Implements business logic for handling various operations.

### RESTful API Design

The API follows RESTful principles with a clear design for handling tasks, subtasks, and user-related operations.

### Authentication Flow

1. **User Registration:** Users can register by providing a unique username, email, and password.
2. **User Login:** Registered users can log in, and upon successful authentication, receive a JWT token.
3. **JWT Authorization:** The JWT token is used for authorization when accessing protected routes.

### Database Schema

- **User Model:**
  - `{ "_id": ObjectId, "username": String, "email": String, "password": String }`

- **Task Model:**
  - `{ "_id": ObjectId, "user_id": ObjectId, "title": String, "description": String, "due_date": Date, "status": String, "priority": String, "timestamps": Date }`

- **Subtask Model:**
  - `{ "_id": ObjectId, "task_id": ObjectId, "name": String, "status": Number, "created_at": Date, "updated_at": Date, "deleted_at": Date }`

## Acknowledgments

Special thanks to the open-source community and contributors for their invaluable contributions. Your efforts make projects like these possible.

Happy coding!
