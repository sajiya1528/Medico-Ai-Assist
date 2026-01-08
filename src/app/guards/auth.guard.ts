import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authService.currentUserValue;

        if (currentUser) {
            // Check if route requires specific role
            const requiredRole = route.data['role'];
            if (requiredRole && currentUser.role !== requiredRole) {
                // Role not authorized, redirect to appropriate dashboard
                if (currentUser.role === 'doctor') {
                    this.router.navigate(['/doctor-dashboard']);
                } else {
                    this.router.navigate(['/patient-dashboard']);
                }
                return false;
            }
            return true;
        }

        // Not logged in, redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
