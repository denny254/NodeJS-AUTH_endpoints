NodeJS Authentication API
This is a Node.js API for managing user authentication, including registration, login, logout, password reset, and token verification. The API uses JSON Web Tokens (JWT) for secure authentication.

Getting Started
To run this project, you need to have Node.js and npm installed on your machine.

Installation
Clone the repository:

git clone https://github.com/denny254/NodeJS-AUTH_endpoints.git
cd NodeJS-AUTH_endpoints
Install dependencies:

npm install
Set up environment variables (see below for required variables).

Start the server:


npm start
Environment Variables
Create a .env file in the root directory and configure the following variables:

env

PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
RESET_PASSWORD_TOKEN_EXPIRES=1h
Endpoints
Register
URL: /api/auth/register
Method: POST
Body:
json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
Description: Registers a new user and returns a JWT token.
Login
URL: /api/auth/login
Method: POST
Body:
json

{
  "email": "string",
  "password": "string"
}
Description: Logs in an existing user and returns a JWT token.
Logout
URL: /api/auth/logout
Method: POST
Description: Logs out the current user by invalidating the token.
Password Reset
Request Password Reset

URL: /api/auth/request-reset
Method: POST
Body:
json

{
  "email": "string"
}
Description: Sends a reset token to the user's email.
Reset Password

URL: /api/auth/reset-password
Method: POST
Body:
json

{
  "token": "string",
  "newPassword": "string"
}
Description: Resets the user's password using the provided token.
Token Verification
URL: /api/auth/verify-token
Method: GET
Headers:
json

{
  "Authorization": "Bearer <token>"
}
Description: Verifies the JWT token for authenticated routes.
Technologies
Node.js - JavaScript runtime
Express - Web framework
MongoDB - Database
JWT - JSON Web Token for secure authentication
bcrypt - Password hashing
Contributing
Feel free to open issues or submit pull requests if you'd like to contribute.

License
This project is licensed under the MIT License.
