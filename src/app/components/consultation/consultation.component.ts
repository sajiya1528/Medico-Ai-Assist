import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/models';

@Component({
    selector: 'app-consultation',
    templateUrl: './consultation.component.html',
    styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
    appointment: Appointment | null = null;
    isMuted: boolean = false;
    isVideoOff: boolean = false;
    callDuration: number = 0;
    private intervalId: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private appointmentService: AppointmentService
    ) { }

    ngOnInit(): void {
        const appointmentId = this.route.snapshot.paramMap.get('id');
        if (appointmentId) {
            const apt = this.appointmentService.getAppointmentById(appointmentId);
            if (apt && apt.status === 'confirmed') {
                this.appointment = apt;
                this.startCallTimer();
            } else {
                this.router.navigate(['/patient-dashboard']);
            }
        }
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    startCallTimer(): void {
        this.intervalId = setInterval(() => {
            this.callDuration++;
        }, 1000);
    }

    getFormattedDuration(): string {
        const minutes = Math.floor(this.callDuration / 60);
        const seconds = this.callDuration % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    toggleMute(): void {
        this.isMuted = !this.isMuted;
    }

    toggleVideo(): void {
        this.isVideoOff = !this.isVideoOff;
    }

    endCall(): void {
        if (confirm('Are you sure you want to end this call?')) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            // Navigate back based on user role
            if (this.authService.isDoctor()) {
                this.router.navigate(['/doctor-dashboard']);
            } else {
                this.router.navigate(['/patient-dashboard']);
            }
        }
    }
}
