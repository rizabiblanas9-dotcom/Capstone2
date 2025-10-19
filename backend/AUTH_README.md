# Authentication System Documentation

## Overview
This authentication system provides secure user registration, login, and profile management for the Sun Valley Mega Health Center application.

## Features
- User registration and login
- Admin login
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Profile management
- Password change functionality

## API Endpoints

### Public Routes (No Authentication Required)

#### 1. User Registration
```
POST /api/auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "birthdate": "1990-01-01",
  "age": 34,
  "contact": "1234567890",
  "address": "123 Main St, City",
  "medicalHistory": "No known allergies",
  "role": "patient"
}
```

#### 2. User Login
```
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3. Admin Login
```
POST /api/auth/admin/login
```
**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Protected Routes (Authentication Required)

#### 4. Get User Profile
```
GET /api/auth/profile
```
**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### 5. Update User Profile
```
PUT /api/auth/profile
```
**Headers:**
```
Authorization: Bearer <jwt_token>
```
**Request Body:**
```json
{
  "name": "John Smith",
  "contact": "0987654321",
  "address": "456 Oak Ave, City"
}
```

#### 6. Change Password
```
PUT /api/auth/change-password
```
**Headers:**
```
Authorization: Bearer <jwt_token>
```
**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "patient"
    },
    "token": "jwt_token_here"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## User Roles
- **patient**: Regular patients
- **doctor**: Medical doctors
- **admin**: System administrators

## Security Features
- Passwords are hashed using bcrypt with 12 salt rounds
- JWT tokens expire after 7 days (configurable)
- Email validation
- Password strength requirements (minimum 6 characters)
- Role-based access control
- Input validation and sanitization

## Environment Variables
Create a `.env` file in the backend directory with:
```
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

## Usage Examples

### Frontend Integration
```javascript
// Login
const loginUser = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// Get profile (with authentication)
const getProfile = async (token) => {
  const response = await fetch('/api/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
```

### Testing with Postman/Thunder Client
1. Register a new user using POST `/api/auth/register`
2. Login using POST `/api/auth/login`
3. Copy the token from the response
4. Use the token in Authorization header for protected routes

## Error Handling
The system provides comprehensive error handling for:
- Invalid credentials
- Duplicate email addresses
- Missing required fields
- Invalid email format
- Weak passwords
- Expired tokens
- Unauthorized access

## Database Models

### User Model
- name, email, password (required)
- birthdate, age, contact, address (required)
- medicalHistory (optional)
- role (patient/doctor/admin)
- isActive, lastLogin, timestamps

### Admin Model
- id, name, email, password (required)
- role (admin)
- isActive, lastLogin, timestamps
