import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'patient/:id', loadComponent: () => import('./patient/patient.component').then(m => m.PatientComponent) },
    { path: 'add-user', loadComponent: () => import('./add-user/add-user.component').then(m => m.AddUserComponent) },
    { path: 'dashboard/:id', loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
    { path: 'profile/:id', loadComponent: () => import('./admin-profil/admin-profil.component').then(m => m.AdminProfilComponent) },
    { path: 'dpi-list', loadComponent: () => import('./dpi-list/dpi-list.component').then(m => m.DpiListComponent) },
    { path: 'create-dpi', loadComponent: () => import('./create-dpi/create-dpi.component').then(m => m.CreateDpiComponent) },
    { path: 'trend-graph', loadComponent: () => import('./trend-graph/trend-graph.component').then(m => m.TrendGraphComponent) },
    { path: 'dpi-detail/:id', loadComponent:()=> import('./dpi-detail/dpi-detail.component').then(m => m.DpiDetailComponent) },
    { path: 'diagnostics', loadComponent:()=> import('./diagnostic-view/diagnostic-view.component').then(m => m.DiagnosticViewComponent) },
    { path: 'nouvelle-consultation', loadComponent:()=> import('./nouvelle-consultation/nouvelle-consultation.component').then(m => m.NouvelleConsultationComponent) },
    { path: 'new-consultation', loadComponent:()=> import('./Consultaiton-view/consultation-view.component').then(m => m.ConsultationViewComponent) },
    // {path: 'laborantin/:id', loadComponent: () => import('./laborantin/laborantin.component').then(m => m.LaborantinComponent) },
    // {path: 'radiologue/:id', loadComponent: () => import('./radiologue/radiologue.component').then(m => m.RadiologueComponent) },
    { path: 'dpi-detail/:id/diagnostic-list', loadComponent: () => import('./diagnostic-list/diagnostic-list.component').then(m => m.DiagnosticListComponent) },
    {path: 'laborantin', loadComponent: () => import('./laborantin-profile/laborantin-profile.component').then(m => m.LaborantinProfileComponent) },
    {path: 'radiologue', loadComponent: () => import('./radiologue-profile/radiologue-profile.component').then(m => m.RadiologueProfileComponent) },
    {path: 'doctor', loadComponent: () => import('./doctor-profile/doctor-profile.component').then(m => m.DoctorProfileComponent) },
    { path: 'dpi-detail/:id/diagnostic-list/:idDiag', loadComponent: () => import('./diagnostic-view/diagnostic-view.component').then(m => m.DiagnosticViewComponent) },
    { path: 'dpi-detail/:id/diagnostic-list/:idDiag/nouvelleconsultation', loadComponent: () => import('./nouvelle-consultation/nouvelle-consultation.component').then(m => m.NouvelleConsultationComponent) },
    { path: 'dpi-detail/:id/diagnostic-list/:idDiag/consultationview/:consultid', loadComponent: () => import('./Consultaiton-view/consultation-view.component').then(m => m.ConsultationViewComponent) },

    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }

