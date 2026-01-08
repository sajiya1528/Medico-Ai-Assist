import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    selectedRole: 'doctor' | 'patient' = 'patient';
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
        if (this.authService.isDoctor()) {
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
        if (this.selectedRole === 'doctor') {
            return 'doctor@test.com / doctor123';
        } else {
            return 'patient@test.com / patient123';
        }
    }
}
