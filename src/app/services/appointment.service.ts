import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment, TimeSlot } from '../models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = 'http://localhost:3000/appointments';
    private storageKey = 'appointments';
    private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);

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

    constructor(private http: HttpClient) {
        this.initializeStorage();
    }

    private initializeStorage(): void {
        // Load appointments from JSON-Server on init
        this.loadAppointmentsFromServer();
    }

    private loadAppointmentsFromServer(): void {
        this.http.get<Appointment[]>(this.apiUrl).subscribe(
            (data) => {
                this.appointmentsSubject.next(data);
                localStorage.setItem(this.storageKey, JSON.stringify(data));
            },
            (error) => {
                console.warn('Could not load appointments from server, using local storage', error);
                const localData = localStorage.getItem(this.storageKey);
                this.appointmentsSubject.next(localData ? JSON.parse(localData) : []);
            }
        );
    }

    private getAppointments(): Appointment[] {
        return this.appointmentsSubject.value;
    }

    private saveAppointmentsLocally(appointments: Appointment[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(appointments));
        this.appointmentsSubject.next(appointments);
    }

    getTimeSlots(): TimeSlot[] {
        return [...this.timeSlots];
    }

    createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
        const newAppointment: Appointment = {
            ...appointment,
            id: this.generateId(),
            createdAt: new Date().toISOString()
        };

        // Send to JSON-Server
        this.http.post<Appointment>(this.apiUrl, newAppointment).subscribe(
            (data) => {
                const appointments = this.getAppointments();
                appointments.push(data);
                this.saveAppointmentsLocally(appointments);
            },
            (error) => {
                console.warn('Could not save to server, saving locally', error);
                const appointments = this.getAppointments();
                appointments.push(newAppointment);
                this.saveAppointmentsLocally(appointments);
            }
        );

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
            const updatedAppointment = { ...appointments[index], status };
            
            // Update on server
            this.http.put<Appointment>(`${this.apiUrl}/${appointmentId}`, updatedAppointment).subscribe(
                (data) => {
                    appointments[index] = data;
                    this.saveAppointmentsLocally(appointments);
                },
                (error) => {
                    console.warn('Could not update on server, updating locally', error);
                    appointments[index] = updatedAppointment;
                    this.saveAppointmentsLocally(appointments);
                }
            );
        }
    }

    getAppointmentById(id: string): Appointment | undefined {
        return this.getAppointments().find(apt => apt.id === id);
    }

    deleteAppointment(appointmentId: string): void {
        const appointments = this.getAppointments().filter(apt => apt.id !== appointmentId);
        
        // Delete from server
        this.http.delete(`${this.apiUrl}/${appointmentId}`).subscribe(
            () => {
                this.saveAppointmentsLocally(appointments);
            },
            (error) => {
                console.warn('Could not delete from server, deleting locally', error);
                this.saveAppointmentsLocally(appointments);
            }
        );
    }

    private generateId(): string {
        return 'apt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

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
