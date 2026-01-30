import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment, User } from '../../models/models';
import { AiChatbotComponent } from '../ai-chatbot/ai-chatbot.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
    selector: 'app-patient-dashboard',
    templateUrl: './patient-dashboard.component.html',
    styleUrls: ['./patient-dashboard.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatTableModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FilterPipe
    ]
})
export class PatientDashboardComponent implements OnInit {
    currentUser: User | null = null;
    appointments: Appointment[] = [];
    doctors: User[] = [];

    // Booking form
    selectedDoctorId: string = '';
    selectedDate: string = '';
    selectedTimeSlot: string = '';
    availableTimeSlots: string[] = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];

    showBookingForm: boolean = false;
    bookingSuccess: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private appointmentService: AppointmentService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.currentUserValue;
        this.doctors = this.authService.getAllDoctors();
        this.loadAppointments();
        this.setMinDate();
    }

    loadAppointments(): void {
        if (this.currentUser) {
            this.appointments = this.appointmentService
                .getAppointmentsByPatient(this.currentUser.id)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
    }

    minDate: string = '';
    setMinDate(): void {
        const today = new Date();
        this.minDate = today.toISOString().split('T')[0];
    }

    bookAppointment(): void {
        if (!this.selectedDoctorId || !this.selectedDate || !this.selectedTimeSlot || !this.currentUser) {
            return;
        }

        const doctor = this.doctors.find(d => d.id === this.selectedDoctorId);
        if (!doctor) return;

        const appointment = this.appointmentService.createAppointment({
            patientId: this.currentUser.id,
            patientName: this.currentUser.name,
            doctorId: doctor.id,
            doctorName: doctor.name,
            date: this.selectedDate,
            timeSlot: this.selectedTimeSlot,
            status: 'pending'
        });

        this.bookingSuccess = true;
        setTimeout(() => {
            this.bookingSuccess = false;
            this.showBookingForm = false;
            this.resetForm();
            this.loadAppointments();
        }, 2000);
    }

    resetForm(): void {
        this.selectedDoctorId = '';
        this.selectedDate = '';
        this.selectedTimeSlot = '';
    }

    cancelAppointment(appointmentId: string): void {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            this.appointmentService.updateAppointmentStatus(appointmentId, 'cancelled');
            this.loadAppointments();
        }
    }

    canJoinCall(appointment: Appointment): boolean {
        return appointment.status === 'confirmed';
    }

    joinCall(appointment: Appointment): void {
        this.router.navigate(['/consultation', appointment.id]);
    }

    getStatusClass(status: string): string {
        return `status-${status}`;
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

    openAIChatbot(): void {
        this.dialog.open(AiChatbotComponent, {
            width: '450px',
            height: '600px',
            position: { right: '20px', bottom: '20px' },
            panelClass: 'chatbot-dialog',
            disableClose: false,
            autoFocus: false
        });
    }

    toggleBookingForm(): void {
        this.showBookingForm = !this.showBookingForm;
        if (!this.showBookingForm) {
            this.resetForm();
            this.bookingSuccess = false;
        }
    }
}
