# Quick Reference - Admin System

## Login Options

### Admin Login
- **Button**: Click **Admin** on login page
- **Email**: `admin@medico.com`
- **Password**: `admin123`
- **Access**: Admin Dashboard with user management

### Doctor Login
- **Button**: Click **Doctor** on login page
- **Sample Email**: `sarah@example.com`
- **Sample Password**: `doctor123`
- **Access**: Doctor Dashboard

### Patient Login
- **Button**: Click **Patient** on login page
- **Sample Email**: `john@example.com`
- **Sample Password**: `patient123`
- **Access**: Patient Dashboard

## Admin Dashboard Navigation

| Feature | Action | Location |
|---------|--------|----------|
| **View Stats** | Automatic on load | Top of dashboard |
| **Add User** | Click "Add New User" button | Top right |
| **Filter Users** | Click filter buttons | Above user table |
| **Delete User** | Click trash icon | User row |
| **Logout** | Click "Logout" button | Top right |

## Add User Form Fields

```
Full Name:        Required, any text
Email:            Required, must be unique email format
Role:             Required, choose Doctor or Patient
Password:         Required, minimum 6 characters
Confirm Password: Required, must match password
```

## System Components Added

### New Components
1. **AdminDashboardComponent** - Main admin interface
   - Path: `src/app/components/admin-dashboard/`
   - Features: Statistics, user table, filtering

2. **AddUserDialogComponent** - User creation dialog
   - Path: `src/app/components/add-user-dialog/`
   - Features: Form validation, password confirmation

### Updated Components
1. **LoginComponent** - Added admin role option
2. **AuthService** - Added admin methods (isAdmin, getAllUsers, addUser, deleteUser)
3. **User Model** - Added 'admin' role type
4. **AppRoutingModule** - Added admin dashboard route
5. **AuthGuard** - Updated to handle admin redirects

## Default Admin User
```
ID: 0
Email: admin@medico.com
Password: admin123
Role: admin
Name: Admin User
```

## Important Notes
- ✅ Admin user (ID: 0) cannot be deleted
- ✅ Email addresses must be unique
- ✅ Passwords must be at least 6 characters
- ✅ Admin access is restricted - non-admin users redirected
- ✅ All data changes can sync with JSON Server backend
