import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-add-user-dialog',
    templateUrl: './add-user-dialog.component.html',
    styleUrls: ['./add-user-dialog.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule
    ]
})
export class AddUserDialogComponent {
    name: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    role: 'doctor' | 'patient' = 'patient';
    errorMessage: string = '';
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;

    constructor(
        private authService: AuthService,
        public dialogRef: MatDialogRef<AddUserDialogComponent>
    ) {}

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onSubmit(): void {
        this.errorMessage = '';

        // Validation
        if (!this.name.trim()) {
            this.errorMessage = 'Name is required';
            return;
        }

        if (!this.email.trim()) {
            this.errorMessage = 'Email is required';
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            this.errorMessage = 'Please enter a valid email address';
            return;
        }

        if (!this.password.trim()) {
            this.errorMessage = 'Password is required';
            return;
        }

        if (this.password.length < 6) {
            this.errorMessage = 'Password must be at least 6 characters';
            return;
        }

        if (this.password !== this.confirmPassword) {
            this.errorMessage = 'Passwords do not match';
            return;
        }

        // Try to add user
        const success = this.authService.addUser({
            name: this.name.trim(),
            email: this.email.trim(),
            password: this.password,
            role: this.role
        });

        if (success) {
            this.dialogRef.close(true);
        } else {
            this.errorMessage = 'User with this email already exists';
        }
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPasswordVisibility(): void {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    isFormValid(): boolean {
        return !!(
            this.name.trim() &&
            this.email.trim() &&
            this.password &&
            this.confirmPassword &&
            this.password === this.confirmPassword &&
            this.password.length >= 6
        );
    }
}
