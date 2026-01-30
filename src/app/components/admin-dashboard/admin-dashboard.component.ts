import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { ViewUserDialogComponent } from '../view-user-dialog/view-user-dialog.component';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule,
        MatTooltipModule,
        MatCardModule
    ]
})
export class AdminDashboardComponent implements OnInit {
    users: User[] = [];
    displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
    filterRole: 'all' | 'doctor' | 'patient' = 'all';
    filteredUsers: User[] = [];
    doctorCount: number = 0;
    patientCount: number = 0;
    currentUser: User | null = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog
    ) {
        // Redirect if not admin
        if (!this.authService.isAdmin()) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit(): void {
        this.currentUser = this.authService.currentUserValue;
        this.loadUsers();
    }

    loadUsers(): void {
        this.users = this.authService.getAllUsers();
        this.doctorCount = this.users.filter(u => u.role === 'doctor').length;
        this.patientCount = this.users.filter(u => u.role === 'patient').length;
        this.applyFilter();
    }

    applyFilter(): void {
        if (this.filterRole === 'all') {
            this.filteredUsers = this.users;
        } else {
            this.filteredUsers = this.users.filter(u => u.role === this.filterRole);
        }
    }

    openAddUserDialog(): void {
        const dialogRef = this.dialog.open(AddUserDialogComponent, {
            width: '500px',
            disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadUsers();
            }
        });
    }

    deleteUser(userId: string): void {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            if (this.authService.deleteUser(userId)) {
                this.loadUsers();
            } else {
                alert('Failed to delete user');
            }
        }
    }

    viewUser(user: User): void {
        this.dialog.open(ViewUserDialogComponent, {
            width: '480px',
            maxWidth: '95vw',
            maxHeight: '90vh',
            autoFocus: false,
            data: user,
            disableClose: false
        });
    }

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
        return '';
    }
    
    logout(): void {
        this.authService.logout();
    }
}
