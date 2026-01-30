import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    selectedRole: 'doctor' | 'patient' | 'admin' = 'patient';
    errorMessage: string = '';
    showPassword: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        // Redirect if already logged in
        if (this.authService.isLoggedIn()) {
            this.redirectToDashboard();
        }
    }

    onSubmit(): void {
        this.errorMessage = '';

        if (!this.email || !this.password) {
            this.errorMessage = 'Please enter both email and password';
            return;
        }

        const success = this.authService.login(this.email, this.password, this.selectedRole);

        if (success) {
            this.redirectToDashboard();
        } else {
            this.errorMessage = 'Invalid credentials. Please try again.';
        }
    }

    private redirectToDashboard(): void {
        if (this.authService.isAdmin()) {
            this.router.navigate(['/admin-dashboard']);
        } else if (this.authService.isDoctor()) {
            this.router.navigate(['/doctor-dashboard']);
        } else {
            this.router.navigate(['/patient-dashboard']);
        }
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    // Sample credentials info
    getSampleCredentials(): string {
        if (this.selectedRole === 'admin') {
            return 'admin@medico.com / admin123';
        } else if (this.selectedRole === 'doctor') {
            return 'sarah@example.com / doctor123';
        } else {
            return 'john@example.com / patient123';
        }
    }
}
