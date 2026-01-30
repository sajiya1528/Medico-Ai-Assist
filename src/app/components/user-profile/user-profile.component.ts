import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatTooltipModule
    ]
})
export class UserProfileComponent implements OnInit {
    currentUser: User | null = null;
    isEditing: boolean = false;
    editForm: {
        name: string;
        email: string;
    } = {
        name: '',
        email: ''
    };
    saveSuccess: boolean = false;
    saveError: string = '';

    constructor(
        private authService: AuthService,
        public dialogRef: MatDialogRef<UserProfileComponent>
    ) {}

    ngOnInit(): void {
        this.currentUser = this.authService.currentUserValue;
        if (!this.currentUser) {
            this.dialogRef.close();
            return;
        }
        this.initializeForm();
    }

    initializeForm(): void {
        if (this.currentUser) {
            this.editForm = {
                name: this.currentUser.name,
                email: this.currentUser.email
            };
        }
    }

    toggleEditMode(): void {
        this.isEditing = !this.isEditing;
        if (!this.isEditing) {
            this.initializeForm();
            this.saveSuccess = false;
            this.saveError = '';
        }
    }

    saveProfile(): void {
        this.saveSuccess = false;
        this.saveError = '';

        // Validation
        if (!this.editForm.name.trim()) {
            this.saveError = 'Name cannot be empty';
            return;
        }

        if (!this.editForm.email.trim()) {
            this.saveError = 'Email cannot be empty';
            return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.editForm.email)) {
            this.saveError = 'Please enter a valid email address';
            return;
        }

        // Update user in service
        if (this.currentUser) {
            const updatedUser: User = {
                ...this.currentUser,
                name: this.editForm.name.trim(),
                email: this.editForm.email.trim(),
                password: this.currentUser.password || '' // Preserve password
            };

            // Update the user in the auth service
            this.authService.updateUser(updatedUser);
            this.currentUser = updatedUser;
            this.saveSuccess = true;
            this.isEditing = false;

            // Auto hide success message after 3 seconds
            setTimeout(() => {
                this.saveSuccess = false;
            }, 3000);
        }
    }

    getRoleDisplayName(): string {
        return this.currentUser?.role === 'doctor' ? 'Doctor' : 'Patient';
    }

    getRoleIcon(): string {
        return this.currentUser?.role === 'doctor' ? 'medical_services' : 'person';
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    logout(): void {
        this.authService.logout();
        this.dialogRef.close();
    }
}
