import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment, User } from '../../models/models';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-doctor-dashboard',
    templateUrl: './doctor-dashboard.component.html',
    styleUrls: ['./doctor-dashboard.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatTooltipModule
    ]
})
export class DoctorDashboardComponent implements OnInit {
    currentUser: User | null = null;
    appointments: Appointment[] = [];
    patients: { id: string; name: string; appointmentCount: number }[] = [];

    selectedTab: 'appointments' | 'patients' = 'appointments';

    constructor(
        private authService: AuthService,
        private appointmentService: AppointmentService,
        private router: Router,
        private dialog: MatDialog
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

    goToProfile(): void {
        this.dialog.open(UserProfileComponent, {
            width: '500px',
            maxHeight: '90vh',
            disableClose: false
        });
    }

    switchTab(tab: 'appointments' | 'patients'): void {
        this.selectedTab = tab;
    }
}
