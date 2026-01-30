import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/models';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-view-user-dialog',
    templateUrl: './view-user-dialog.component.html',
    styleUrls: ['./view-user-dialog.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule
    ]
})
export class ViewUserDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ViewUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public user: User
    ) {}

    getRoleIcon(role: string): string {
        if (role === 'doctor') {
            return 'medical_services';
        } else if (role === 'patient') {
            return 'person';
        }
        return 'account_circle';
    }

    getRoleColor(role: string): string {
        if (role === 'doctor') {
            return 'doctor-badge';
        } else if (role === 'patient') {
            return 'patient-badge';
        }
        return 'admin-badge';
    }

    getRoleLabel(role: string): string {
        if (role === 'doctor') {
            return 'Doctor';
        } else if (role === 'patient') {
            return 'Patient';
        }
        return 'Admin';
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
