# Admin Login & User Management System

## Overview
The admin login feature has been successfully implemented. Admin users can now log in and manage users (add doctors and patients, view all users, and delete users).

## Admin Features

### 1. **Admin Dashboard**
- **Location**: `/admin-dashboard`
- View statistics about total users, doctors, and patients
- Filter users by role (All, Doctors, Patients)
- View detailed user list with ID, Name, Email, and Role
- Add new users (Doctor or Patient)
- Delete existing users

### 2. **Add User Dialog**
- Create new users with the following information:
  - Full Name
  - Email Address
  - Role (Doctor or Patient)
  - Password
  - Password Confirmation
- Email validation to prevent duplicates
- Password strength requirements (minimum 6 characters)
- Password confirmation validation

### 3. **User Management Features**
- **View All Users**: Display list of all doctors and patients (excludes admin users)
- **Filter Users**: Filter by role for better management
- **Add Users**: Create new users with proper validation
- **Delete Users**: Remove users from the system
- **Statistics**: Quick overview of user counts

## Admin Login Credentials

### Default Admin Account
- **Email**: `admin@medico.com`
- **Password**: `admin123`

### Sample Test Users

#### Doctors
- **Email**: `sarah@example.com` | **Password**: `doctor123`
- **Email**: `robert@example.com` | **Password**: `doctor123`
- **Email**: `emily@example.com` | **Password**: `doctor123`

#### Patients
- **Email**: `john@example.com` | **Password**: `patient123`
- **Email**: `jane@example.com` | **Password**: `patient123`

## How to Use

### Login as Admin
1. Open the login page
2. Click on the **Admin** button in the role selector
3. Enter credentials:
   - Email: `admin@medico.com`
   - Password: `admin123`
4. Click **Login as Admin**

### Add a New User
1. From the Admin Dashboard, click **Add New User** button
2. Fill in the user details:
   - Full Name (required)
   - Email Address (required, must be unique)
   - Role (select Doctor or Patient)
   - Password (minimum 6 characters)
   - Confirm Password (must match)
3. Click **Add User**

### View and Filter Users
1. In the Admin Dashboard, use the filter buttons to view:
   - **All**: Shows all users (doctors and patients)
   - **Doctors**: Shows only doctor users
   - **Patients**: Shows only patient users

### Delete a User
1. Find the user in the table
2. Click the **Delete** icon (trash can) on the right side
3. Confirm the deletion in the popup
4. The user will be removed from the system

## Features Overview

### Access Control
- Only admin users can access the admin dashboard
- Regular users (doctors/patients) are automatically redirected to their respective dashboards
- Attempts to access admin dashboard without proper permissions will redirect to login

### Data Validation
- **Email**: Must be a valid email format and unique in the system
- **Name**: Cannot be empty
- **Password**: Minimum 6 characters, must match confirmation
- **Role**: Required field

### User Statistics
- Total Users count displayed
- Doctors count displayed
- Patients count displayed
- Updates dynamically when users are added or deleted

## Security Notes
1. Passwords are stored securely and only visible to the admin during user creation
2. Passwords are never displayed in the user interface after creation
3. Admin user (ID: 0) cannot be deleted to prevent system lockout
4. Email uniqueness is enforced to prevent duplicate accounts

## API Integration
The system can integrate with a JSON Server backend:
- **Base URL**: `http://localhost:3000/users`
- Operations: GET (retrieve users), POST (add user), PUT (update user), DELETE (delete user)
- Falls back to in-memory data if server is unavailable
