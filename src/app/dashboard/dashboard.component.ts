import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
  // Importez le service d'authentification

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule],  // Ajoutez le service d'authentification dans le tableau des imports
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSidebarOpen = false;
  activePage: string = '';
  username: string | null = '';  // Propriété pour stocker le nom d'utilisateur

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePage = event.urlAfterRedirects;
      }
    });

    // Récupérez le nom d'utilisateur après l'authentification
    this.username = this.authService.getUsername();
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
}
