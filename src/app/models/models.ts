// User Model
export interface User {
    id: string;
    email: string;
    password: string;
    role: 'doctor' | 'patient' | 'admin';
    name: string;
    phone?: string;
    specialization?: string | null;
    createdAt?: string;
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
