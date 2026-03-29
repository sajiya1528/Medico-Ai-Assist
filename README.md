# 🏥✨ Medico - AI Assist 🤖💙  

## 🌟 Project Overview  

Medico - AI Assist is a smart healthcare management web application developed using Angular 17 for university project demonstration. 🚀  

The system simulates a real-world Doctor Appointment & Consultation Platform with secure role-based access for 👨‍⚕️ Doctor, 👤 Patient, and 🛡️ Admin.  

It provides:  

📅 Appointment Booking  
📹 Video Consultation (Mock UI)  
👥 User Management  
🤖 AI-Powered Medical Chatbot  

All data is securely stored using 💾 Browser Local Storage, meaning no backend setup is required — making it perfect for academic demonstrations and project presentations. 🎓  


A complete Angular-based Doctor Appointment and Consultation system built for university project demonstration. This application uses Local Storage to persist data without requiring a backend setup.

## Features

### 🔐 Triple Login System (Doctor/Patient/Admin)
- Single login page with role toggle (Doctor/Patient/Admin)
- Hardcoded sample credentials for easy demo
- Role-based authentication and route protection
- Secure session management with logout

### 👨‍⚕️ Doctor Dashboard
- **Appointment Manager**: View and manage all incoming appointment requests
- **Approve/Cancel**: Quick actions to approve or cancel appointments
- **Patient List**: View all patients who have booked appointments
- **Statistics**: Real-time stats for pending, confirmed, and completed appointments

### 👤 Patient Dashboard
- **Book Appointment**: Simple form to select doctor, date, and time slot
- **My Appointments**: View all booked appointments with status
- **Join Call**: Access video consultation for confirmed appointments
- **Cancel Appointments**: Cancel pending appointments
- **User Profile**: View and manage personal profile information

### 🛡️ Admin Dashboard
- **User Management**: View, add, and manage all system users
- **User Dialog**: Add new users with role assignment
- **View User Details**: Inspect detailed user information
- **System Overview**: Monitor system-wide statistics and activities

### 📹 Video Consultation
- Mock video call interface with camera preview
- Call controls (Mute, Video On/Off, End Call)
- Call duration timer
- Professional consultation UI

### 🤖 AI Chatbot
- Integrated AI assistant for medical guidance
- Context-aware responses
- Available across patient dashboards
- Real-time conversation interface

## Sample Credentials

### Admin Login
- Email: `admin@medico.com`
- Password: `admin123`

### Doctor Accounts

#### Primary Doctor
- Email: `sarah@example.com`
- Password: `doctor123`
- Name: Dr. Sarah Smith

#### Secondary Doctor
- Email: `robert@example.com`
- Password: `doctor123`
- Name: Dr. Robert Johnson

#### Tertiary Doctor
- Email: `emily@example.com`
- Password: `doctor123`
- Name: Dr. Emily Davis

### Patient Accounts

#### Primary Patient
- Email: `john@example.com`
- Password: `patient123`
- Name: John Doe

#### Secondary Patient
- Email: `jane@example.com`
- Password: `patient123`
- Name: Jane Smith

## Technology Stack

- **Framework**: Angular 17
- **UI Library**: Angular Material
- **Styling**: CSS with custom healthcare theme
- **Storage**: Browser Local Storage
- **Routing**: Angular Router with AuthGuard
- **State Management**: RxJS

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Steps

1. **Navigate to project directory**
   ```bash
   cd medico-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

### OpenAI Integration Setup (Optional)

To enable real AI responses in the chatbot:

1. **Get OpenAI API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key

2. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Add your API key: `OPENAI_API_KEY=your_actual_api_key_here`

3. **Update Environment Files**
   - Edit `src/environments/environment.ts` and `src/environments/environment.prod.ts`
   - Replace `your_openai_api_key_here` with your actual API key

**⚠️ Security Note**: API keys should never be committed to version control. In production, use environment variables or a backend proxy for API calls.

## Project Structure

```
medico-bot/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── patient-dashboard/
│   │   │   ├── doctor-dashboard/
│   │   │   ├── admin-dashboard/
│   │   │   ├── consultation/
│   │   │   ├── ai-chatbot/
│   │   │   ├── user-profile/
│   │   │   ├── add-user-dialog/
│   │   │   └── view-user-dialog/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── appointment.service.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── models/
│   │   │   └── models.ts
│   │   ├── pipes/
│   │   │   └── filter.pipe.ts
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── styles.css
│   └── index.html
├── angular.json
├── package.json
└── README.md
```

## How to Use

### As a Patient

1. **Login**: Select "Patient" role and use patient credentials
2. **Book Appointment**:
   - Click "New Appointment"
   - Select a doctor from the dropdown
   - Choose a date and time slot
   - Submit the form
3. **View Appointments**: See all your appointments with their status
4. **Join Consultation**: Click "Join Call" for confirmed appointments
5. **Cancel**: Cancel pending appointments if needed
6. **Chat with AI**: Use the AI Chatbot for medical guidance

### As a Doctor

1. **Login**: Select "Doctor" role and use doctor credentials
2. **Manage Appointments**:
   - View all incoming appointment requests
   - Approve pending appointments
   - Cancel appointments if necessary
   - Mark appointments as completed
3. **View Patients**: Switch to "Patient List" tab to see all patients
4. **Statistics**: Monitor appointment stats on the dashboard
5. **Consultation**: Join video calls with patients

### As an Admin

1. **Login**: Select "Admin" role and use admin credentials
2. **User Management**:
   - View all system users (patients, doctors)
   - Add new users with specific roles
   - View detailed user information
   - Manage user roles and permissions
3. **System Overview**: Monitor overall system statistics and activities
4. **User Administration**: Use dialog boxes to add and manage users efficiently

## Features Highlights

### Local Storage Implementation
- All data persists in browser's Local Storage
- No backend required for demo
- Data survives page refreshes
- Easy to reset by clearing browser storage

### Triple-Role Architecture
- Admin role for system management
- Doctor role for consultation management
- Patient role for appointment booking
- Each role has dedicated dashboard and features

### AI Integration
- AI Chatbot for patient medical queries
- Context-aware responses
- Real-time conversation capability
- Seamlessly integrated into patient interface

### Authentication & Security
- Triple-level role-based access control
- Route guards prevent unauthorized access
- Automatic redirection based on user role
- Session management with logout functionality

### User & Dialog Management
- Comprehensive user management system
- Add new users through admin interface
- View detailed user profiles
- Modal dialogs for user operations
- Efficient user administration interface

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts for all screen sizes
- Touch-friendly controls
- Professional healthcare theme

### User Experience
- Smooth animations and transitions
- Real-time status updates
- Intuitive navigation
- Clear visual feedback

## Color Scheme

The application uses a professional healthcare color palette:
- **Primary Blue**: #2196F3 (Trust, professionalism)
- **Accent Cyan**: #00BCD4 (Medical, clean)
- **Success Green**: #4CAF50 (Confirmed, positive)
- **Warning Orange**: #FF9800 (Pending, attention)
- **Danger Red**: #F44336 (Cancelled, critical)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Edge
- Safari

## Notes for Demo

- Data is stored in browser's Local Storage
- Clear browser storage to reset all data
- Use different browser profiles to test multiple users simultaneously
- Video consultation is a mockup UI (no actual video streaming)

### Demo Scenarios

#### Scenario 1: Complete Appointment Flow
1. **Login as Patient** (john@example.com)
2. Book appointment with Dr. Sarah Smith
3. **Logout and Login as Doctor** (sarah@example.com)
4. Approve the appointment
5. **Logout and Login as Patient** again
6. Join the video consultation

#### Scenario 2: Multiple Appointments
1. **Login as Patient 1** (john@example.com)
2. Book appointment with Dr. Sarah Smith
3. **Logout and Login as Patient 2** (jane@example.com)
4. Book appointment with Dr. Robert Johnson
5. **Login as Doctor 1** (sarah@example.com)
6. View and manage appointments
7. Check patient list

#### Scenario 3: Admin User Management
1. **Login as Admin** (admin@medico.com)
2. View all system users
3. Add new users with specific roles
4. Manage user roles and permissions
5. Monitor system statistics

### Tips for Demo

- **Use Multiple Browser Windows**: Open one for patient and one for doctor to show real-time updates
- **Use Incognito Mode**: Test with different users simultaneously
- **Clear Local Storage**: Reset data between demos with `localStorage.clear()` in console
- **Show Both Roles**: Demonstrate the different interfaces for doctors, patients, and admins

## Future Enhancements

- Real video calling integration (WebRTC)
- Email notifications
- Prescription management
- Medical records storage
- Payment integration
- Multi-language support

## License

This is a university project for educational purposes.

## Support

For any issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ using Angular and Angular Material**

## 👩‍💻 Author  

**Sajiya Nazir**  

 👤 github : sajiya1528 (https://github.com/sajiya1528/Medico-Ai-Assist.git)

🎓 B.Tech / Computer Science Student  

💻 Frontend Developer | Angular Enthusiast  

🚀 Passionate about building smart healthcare & AI-based web applications  
