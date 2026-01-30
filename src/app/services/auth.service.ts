import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;
    private apiUrl = 'http://localhost:3000/users';

    // Fallback users for offline mode
    private fallbackUsers: User[] = [
        {
            id: '0',
            email: 'admin@medico.com',
            password: 'admin123',
            role: 'admin',
            name: 'Admin User'
        },
        {
            id: '1',
            email: 'john@example.com',
            password: 'patient123',
            role: 'patient',
            name: 'John Doe'
        },
        {
            id: '2',
            email: 'sarah@example.com',
            password: 'doctor123',
            role: 'doctor',
            name: 'Dr. Sarah Smith'
        },
        {
            id: '3',
            email: 'robert@example.com',
            password: 'doctor123',
            role: 'doctor',
            name: 'Dr. Robert Johnson'
        },
        {
            id: '4',
            email: 'jane@example.com',
            password: 'patient123',
            role: 'patient',
            name: 'Jane Smith'
        },
        {
            id: '5',
            email: 'emily@example.com',
            password: 'doctor123',
            role: 'doctor',
            name: 'Dr. Emily Davis'
        }
    ];

    private users: User[] = [];

    constructor(private router: Router, private http: HttpClient) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();
        this.loadUsers();
    }

    private loadUsers(): void {
        this.http.get<User[]>(this.apiUrl).subscribe(
            (data) => {
                this.users = data;
            },
            (error) => {
                console.warn('Could not connect to JSON-Server, using fallback data', error);
                this.users = this.fallbackUsers;
            }
        );
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string, role: 'doctor' | 'patient' | 'admin'): boolean {
        const user = this.users.find(
            u => u.email === email && u.password === password && u.role === role
        );

        if (user) {
            const userToStore = { ...user };
            delete (userToStore as any).password;
            localStorage.setItem('currentUser', JSON.stringify(userToStore));
            this.currentUserSubject.next(userToStore);
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        return this.currentUserValue !== null;
    }

    isDoctor(): boolean {
        return this.currentUserValue?.role === 'doctor';
    }

    isPatient(): boolean {
        return this.currentUserValue?.role === 'patient';
    }

    isAdmin(): boolean {
        return this.currentUserValue?.role === 'admin';
    }

    getAllDoctors(): User[] {
        return this.users.filter(u => u.role === 'doctor');
    }

    getAllPatients(): User[] {
        return this.users.filter(u => u.role === 'patient');
    }

    getAllUsers(): User[] {
        return this.users.filter(u => u.role !== 'admin');
    }

    addUser(newUser: Omit<User, 'id'>): boolean {
        // Check if email already exists
        if (this.users.some(u => u.email === newUser.email)) {
            console.error('User with this email already exists');
            return false;
        }

        // Generate new ID (simple increment based on max ID)
        const maxId = Math.max(0, ...this.users.map(u => parseInt(u.id) || 0));
        const user: User = {
            ...newUser,
            id: String(maxId + 1)
        };

        // Add to users array
        this.users.push(user);

        // Try to save to backend
        this.http.post(this.apiUrl, user).subscribe({
            error: (err) => console.error('Failed to add user to server:', err)
        });

        return true;
    }

    deleteUser(userId: string): boolean {
        if (userId === '0') {
            console.error('Cannot delete admin user');
            return false;
        }

        const index = this.users.findIndex(u => u.id === userId);
        if (index !== -1) {
            this.users.splice(index, 1);
            
            // Try to delete from backend
            this.http.delete(`${this.apiUrl}/${userId}`).subscribe({
                error: (err) => console.error('Failed to delete user from server:', err)
            });
            return true;
        }
        return false;
    }

    updateUser(updatedUser: User): void {
        if (this.currentUserValue) {
            // Get the original user to preserve the password
            const originalUser = this.users.find(u => u.id === updatedUser.id);
            
            // Ensure password is preserved from the original user
            if (originalUser && originalUser.password) {
                updatedUser.password = originalUser.password;
            }
            
            // Update in the users array
            const index = this.users.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) {
                this.users[index] = updatedUser;
            }

            // Store current user in localStorage without password for security
            const userToStore = { ...updatedUser };
            delete (userToStore as any).password;
            localStorage.setItem('currentUser', JSON.stringify(userToStore));
            
            // Update current user subject (without password)
            this.currentUserSubject.next(userToStore);

            // Try to update in the backend (send with password)
            this.http.put(`${this.apiUrl}/${updatedUser.id}`, updatedUser)
                .subscribe({
                    error: (err) => console.error('Failed to update user on server:', err)
                });
        }
    }
}
