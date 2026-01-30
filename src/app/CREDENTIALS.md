# 🔑 Login Credentials Reference

## Quick Access Credentials for Demo

---

### 👨‍⚕️ Doctor Accounts

#### Primary Doctor
```
Email:    doctor@test.com
Password: doctor123
Name:     Dr. Sarah Johnson
```

#### Secondary Doctor
```
Email:    doctor2@test.com
Password: doctor123
Name:     Dr. Michael Chen
```

---

### 👤 Patient Accounts

#### Primary Patient
```
Email:    patient@test.com
Password: patient123
Name:     John Smith
```

#### Secondary Patient
```
Email:    patient2@test.com
Password: patient123
Name:     Emily Davis
```

---

## 🎯 Demo Scenarios

### Scenario 1: Complete Appointment Flow
1. **Login as Patient** (patient@test.com)
2. Book appointment with Dr. Sarah Johnson
3. **Logout and Login as Doctor** (doctor@test.com)
4. Approve the appointment
5. **Logout and Login as Patient** again
6. Join the video consultation

### Scenario 2: Multiple Appointments
1. **Login as Patient 1** (patient@test.com)
2. Book appointment with Dr. Sarah Johnson
3. **Logout and Login as Patient 2** (patient2@test.com)
4. Book appointment with Dr. Michael Chen
5. **Login as Doctor 1** (doctor@test.com)
6. View and manage appointments
7. Check patient list

### Scenario 3: Appointment Cancellation
1. **Login as Patient** (patient@test.com)
2. Book an appointment
3. Cancel the appointment before approval
4. **Login as Doctor** (doctor@test.com)
5. Verify the cancelled status

---

## 💡 Tips for Demo

- **Use Multiple Browser Windows**: Open one for patient and one for doctor to show real-time updates
- **Use Incognito Mode**: Test with different users simultaneously
- **Clear Local Storage**: Reset data between demos with `localStorage.clear()` in console
- **Show Both Roles**: Demonstrate the different interfaces for doctors and patients

---

## 🌐 Application URL

```
http://localhost:4200
```

---

## 📋 Feature Checklist for Demo

- [ ] Login with both roles
- [ ] Book appointment as patient
- [ ] Approve appointment as doctor
- [ ] View patient list
- [ ] Join video consultation
- [ ] Show responsive design (resize browser)
- [ ] Demonstrate status changes
- [ ] Show data persistence (refresh page)

---

**Print this page for easy reference during your demo! 📄**
