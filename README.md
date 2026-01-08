# Medico - AI Assist

A complete Angular-based Doctor Appointment and Consultation system built for university project demonstration. This application uses Local Storage to persist data without requiring a backend setup.

## Features

### 🔐 Dual Login System
- Single login page with role toggle (Doctor/Patient)
- Hardcoded sample credentials for easy demo
- Role-based authentication and route protection

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

### 📹 Video Consultation
- Mock video call interface with camera preview
- Call controls (Mute, Video On/Off, End Call)
- Call duration timer
- Professional consultation UI

## Sample Credentials

### Doctor Login
- Email: `doctor@test.com`
- Password: `doctor123`

Alternative:
- Email: `doctor2@test.com`
- Password: `doctor123`

### Patient Login
- Email: `patient@test.com`
- Password: `patient123`

Alternative:
- Email: `patient2@test.com`
- Password: `patient123`

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

## Project Structure

```
medico-bot/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── patient-dashboard/
│   │   │   ├── doctor-dashboard/
│   │   │   └── consultation/
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

### As a Doctor

1. **Login**: Select "Doctor" role and use doctor credentials
2. **Manage Appointments**:
   - View all incoming appointment requests
   - Approve pending appointments
   - Cancel appointments if necessary
   - Mark appointments as completed
3. **View Patients**: Switch to "Patient List" tab to see all patients
4. **Statistics**: Monitor appointment stats on the dashboard

## Features Highlights

### Local Storage Implementation
- All data persists in browser's Local Storage
- No backend required for demo
- Data survives page refreshes
- Easy to reset by clearing browser storage

### Authentication & Security
- Role-based access control
- Route guards prevent unauthorized access
- Automatic redirection based on user role
- Session management with logout functionality

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
