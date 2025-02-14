import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  activePage: string = '';
  username: string | null = '';  // Propriété pour stocker le nom d'utilisateur
  userRole: string | null = '';  // Propriété pour stocker le rôle de l'utilisateur

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePage = event.urlAfterRedirects;
      }
    });

    // Récupérez le nom d'utilisateur et le rôle après l'authentification
    this.username = this.authService.getUsername();
    this.userRole = localStorage.getItem('user_role');  // Récupère le rôle de l'utilisateur à partir du stockage local
    console.log(`User Role: ${this.userRole}`);  // Ajoutez ce log pour vérifier le rôle de l'utilisateur
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActivePage(page: string) {
    this.activePage = page;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige l'utilisateur vers la page de login après la déconnexion
  }

  // Vérifie si l'utilisateur a le rôle spécifié
  hasRole(role: string): boolean {
    return this.userRole === role;
  }
}
