# JSON-Server Backend Setup

This document describes how to use JSON-Server as the backend for the Medico-AI Assist application.

## Installation

The required dependencies are already installed via npm:
- `json-server`: ^0.17.4
- `concurrently`: ^8.2.2

To install dependencies, run:
```bash
npm install
```

## Running the Application

### Option 1: Run Both Frontend and Backend Together
```bash
npm run start:all
```

This command runs both the Angular dev server and JSON-Server concurrently:
- **Angular App**: http://localhost:4200
- **JSON-Server**: http://localhost:3000

### Option 2: Run Frontend Only (if backend is already running)
```bash
npm start
```

### Option 3: Run JSON-Server Separately
```bash
npm run server
```

## Database File

The database is stored in `db.json` at the root of the project with the following structure:

```json
{
  "users": [...],
  "appointments": [...],
  "chatSessions": [...]
}
```

## Default Test Credentials

### Patient Accounts
- **Email**: john@example.com | **Password**: patient123 | **Role**: patient
- **Email**: jane@example.com | **Password**: patient123 | **Role**: patient

### Doctor Accounts
- **Email**: sarah@example.com | **Password**: doctor123 | **Role**: doctor
- **Email**: robert@example.com | **Password**: doctor123 | **Role**: doctor
- **Email**: emily@example.com | **Password**: doctor123 | **Role**: doctor

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Appointments
- `GET /appointments` - Get all appointments
- `GET /appointments/:id` - Get appointment by ID
- `POST /appointments` - Create new appointment
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Delete appointment

### Chat Sessions
- `GET /chatSessions` - Get all chat sessions
- `GET /chatSessions/:id` - Get chat session by ID
- `POST /chatSessions` - Create new chat session
- `PUT /chatSessions/:id` - Update chat session
- `DELETE /chatSessions/:id` - Delete chat session

## Service Integration

### AuthService
- Fetches user data from `/users` endpoint
- Implements login/logout with JWT-like behavior
- Fallback to hardcoded users if JSON-Server is unavailable

### AppointmentService
- Fetches appointments from `/appointments` endpoint
- Implements CRUD operations for appointments
- Caches data in localStorage with server sync
- Fallback to localStorage if JSON-Server is unavailable

## Offline Support

Both services have built-in offline support:
- If JSON-Server is unavailable, services use localStorage as fallback
- Data syncs to server when connection is restored
- Console warnings indicate offline mode

## Development Notes

- JSON-Server uses port 3000 by default
- Angular dev server uses port 4200 (or next available port)
- CORS is enabled by default in JSON-Server for the Angular frontend
- All API calls include error handling and fallback mechanisms
