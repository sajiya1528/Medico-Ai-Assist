import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    // Hardcoded sample credentials
    private users: User[] = [
        {
            id: 'doc1',
            email: 'doctor@test.com',
            password: 'doctor123',
            role: 'doctor',
            name: 'Dr. Sarah Johnson'
        },
        {
            id: 'doc2',
            email: 'doctor2@test.com',
            password: 'doctor123',
            role: 'doctor',
            name: 'Dr. Michael Chen'
        },
        {
            id: 'pat1',
            email: 'patient@test.com',
            password: 'patient123',
            role: 'patient',
            name: 'John Smith'
        },
        {
            id: 'pat2',
            email: 'patient2@test.com',
            password: 'patient123',
            role: 'patient',
            name: 'Emily Davis'
        }
    ];

    constructor(private router: Router) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string, role: 'doctor' | 'patient'): boolean {
        const user = this.users.find(
            u => u.email === email && u.password === password && u.role === role
        );

        if (user) {
            // Store user without password
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

    getAllDoctors(): User[] {
        return this.users.filter(u => u.role === 'doctor');
    }
}
