// User Model
export interface User {
    id: string;
    email: string;
    password: string;
    role: 'doctor' | 'patient';
    name: string;
}

// Appointment Model
export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    timeSlot: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    createdAt: string;
}

// Time Slot
export interface TimeSlot {
    value: string;
    label: string;
    available: boolean;
}
