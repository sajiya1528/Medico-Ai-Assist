import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment, User } from '../../models/models';

@Component({
    selector: 'app-doctor-dashboard',
    templateUrl: './doctor-dashboard.component.html',
    styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
    currentUser: User | null = null;
    appointments: Appointment[] = [];
    patients: { id: string; name: string; appointmentCount: number }[] = [];

    selectedTab: 'appointments' | 'patients' = 'appointments';

    constructor(
        private authService: AuthService,
        private appointmentService: AppointmentService
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.currentUserValue;
        this.loadData();
    }

    loadData(): void {
        if (this.currentUser) {
            this.loadAppointments();
            this.loadPatients();
        }
    }

    loadAppointments(): void {
        if (this.currentUser) {
            this.appointments = this.appointmentService
                .getAppointmentsByDoctor(this.currentUser.id)
                .sort((a, b) => {
                    // Sort by date, then by time
                    const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
                    if (dateCompare !== 0) return dateCompare;
                    return a.timeSlot.localeCompare(b.timeSlot);
                });
        }
    }

    loadPatients(): void {
        if (this.currentUser) {
            this.patients = this.appointmentService.getPatientsByDoctor(this.currentUser.id);
        }
    }

    approveAppointment(appointmentId: string): void {
        this.appointmentService.updateAppointmentStatus(appointmentId, 'confirmed');
        this.loadData();
    }

    cancelAppointment(appointmentId: string): void {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            this.appointmentService.updateAppointmentStatus(appointmentId, 'cancelled');
            this.loadData();
        }
    }

    completeAppointment(appointmentId: string): void {
        this.appointmentService.updateAppointmentStatus(appointmentId, 'completed');
        this.loadData();
    }

    getStatusClass(status: string): string {
        return `status-${status}`;
    }

    getPendingCount(): number {
        return this.appointments.filter(a => a.status === 'pending').length;
    }

    getConfirmedCount(): number {
        return this.appointments.filter(a => a.status === 'confirmed').length;
    }

    getCompletedCount(): number {
        return this.appointments.filter(a => a.status === 'completed').length;
    }

    getTotalPatients(): number {
        return this.patients.length;
    }

    logout(): void {
        this.authService.logout();
    }

    switchTab(tab: 'appointments' | 'patients'): void {
        this.selectedTab = tab;
    }
}
