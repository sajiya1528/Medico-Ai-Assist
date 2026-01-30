import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ConsultationComponent } from './components/consultation/consultation.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'admin' }
    },
    {
        path: 'patient-dashboard',
        component: PatientDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'patient' }
    },
    {
        path: 'doctor-dashboard',
        component: DoctorDashboardComponent,
        canActivate: [AuthGuard],
        data: { role: 'doctor' }
    },
    {
        path: 'consultation/:id',
        component: ConsultationComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
