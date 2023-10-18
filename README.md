
# User Login and Registration System - Backend

This is the backend component of the "User Login and Registration System" application. It's built using Node.js, Express.js, Mongoose, and MongoDB. The backend follows an MVC (Model-View-Controller) folder structure and incorporates various features, including user registration, login, authentication using JWT, bcrypt for password hashing, and other modules like delete and getAllUsers. These features are organized into distinct modules and exposed through routes.

## Project Structure

The project follows a modular and organized structure for better maintainability. Here's a brief overview of the key directories and files:

- `controllers/`: Contains the controller modules for different functionalities, including registration, login, user deletion, and fetching all users.
- `models/`: Defines the Mongoose models, where the "User" model is specified.
- `routes/`: Contains route handlers and configurations for different API endpoints.
- `config/`: Houses configurations, including JWT secret and database connection.
- `middlewares/`: Middleware functions such as authentication checks and error handling.
- `server.js`: The main entry point of the application, responsible for setting up the Express server and connecting to the MongoDB database.
- `.env`: Create this file to store environment variables, such as the MongoDB connection URI, JWT secret, and other configurations.

## Getting Started

To get the backend up and running on your local machine, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/1MRaju/user-login-app/tree/master
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the project root and set your environment variables. An example of what this file might contain:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your-secret-key
   ```

4. Start the server:

   ```
   npm start
   ```

5. Your backend server should now be running on `http://localhost:3000`.

## API Endpoints

- **Register User**: POST `/api/users/register`
- **Login User**: POST `/api/users/login`
- **Get All Users (Authenticated)**: GET `/api/users`
- **Delete User (Authenticated)**: DELETE `/api/users/:id`

## Authentication

- JWT (JSON Web Tokens) are used for authentication. Users receive a token upon successful registration or login, which they must include in the `Authorization` header of their requests.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request. Feel free to report any issues or suggest improvements in the issue tracker.
