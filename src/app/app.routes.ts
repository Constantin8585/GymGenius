import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ClientComponent } from './client/client.component';
import { OffreComponent } from './offre/offre.component';


export const routes: Routes = [
    // Route pour la connexion
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  
    // Redirection par défaut
    { path: '', redirectTo: '/login', pathMatch: 'full' },
  
    // Route du dashboard
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard], // Protéger cette route avec un AuthGuard
      children: [
        { path: '', redirectTo: 'accueil', pathMatch: 'full' },
        { path: 'accueil', component: AccueilComponent },
        { path: 'client', component: ClientComponent },
        { path: 'offre', component: OffreComponent }
      ]
    }
  ];
  