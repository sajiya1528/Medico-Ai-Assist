import { Injectable } from '@angular/core';
import { Appointment, TimeSlot } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private storageKey = 'appointments';

    private timeSlots: TimeSlot[] = [
        { value: '09:00', label: '09:00 AM', available: true },
        { value: '10:00', label: '10:00 AM', available: true },
        { value: '11:00', label: '11:00 AM', available: true },
        { value: '12:00', label: '12:00 PM', available: true },
        { value: '14:00', label: '02:00 PM', available: true },
        { value: '15:00', label: '03:00 PM', available: true },
        { value: '16:00', label: '04:00 PM', available: true },
        { value: '17:00', label: '05:00 PM', available: true }
    ];

    constructor() {
        this.initializeStorage();
    }

    private initializeStorage(): void {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    private getAppointments(): Appointment[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    private saveAppointments(appointments: Appointment[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(appointments));
    }

    getTimeSlots(): TimeSlot[] {
        return [...this.timeSlots];
    }

    createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
        const appointments = this.getAppointments();
        const newAppointment: Appointment = {
            ...appointment,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        };
        appointments.push(newAppointment);
        this.saveAppointments(appointments);
        return newAppointment;
    }

    getAppointmentsByPatient(patientId: string): Appointment[] {
        return this.getAppointments().filter(apt => apt.patientId === patientId);
    }

    getAppointmentsByDoctor(doctorId: string): Appointment[] {
        return this.getAppointments().filter(apt => apt.doctorId === doctorId);
    }

    getAllAppointments(): Appointment[] {
        return this.getAppointments();
    }

    updateAppointmentStatus(appointmentId: string, status: Appointment['status']): void {
        const appointments = this.getAppointments();
        const index = appointments.findIndex(apt => apt.id === appointmentId);
        if (index !== -1) {
            appointments[index].status = status;
            this.saveAppointments(appointments);
        }
    }

    getAppointmentById(id: string): Appointment | undefined {
        return this.getAppointments().find(apt => apt.id === id);
    }

    deleteAppointment(appointmentId: string): void {
        const appointments = this.getAppointments().filter(apt => apt.id !== appointmentId);
        this.saveAppointments(appointments);
    }

    private generateId(): string {
        return 'apt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get unique patients who have booked appointments with a specific doctor
    getPatientsByDoctor(doctorId: string): { id: string; name: string; appointmentCount: number }[] {
        const appointments = this.getAppointmentsByDoctor(doctorId);
        const patientMap = new Map<string, { name: string; count: number }>();

        appointments.forEach(apt => {
            if (patientMap.has(apt.patientId)) {
                patientMap.get(apt.patientId)!.count++;
            } else {
                patientMap.set(apt.patientId, { name: apt.patientName, count: 1 });
            }
        });

        return Array.from(patientMap.entries()).map(([id, data]) => ({
            id,
            name: data.name,
            appointmentCount: data.count
        }));
    }
}
