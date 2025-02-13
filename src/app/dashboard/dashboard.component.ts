import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ClientComponent } from '../client/client.component';
import { OffreComponent } from '../offre/offre.component';
import { AccueilComponent } from '../accueil/accueil.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [ RouterModule, CommonModule]

})
export class DashboardComponent {
  isSidebarOpen = false;
  activePage: string = ''; // Page active par défaut
  
  constructor(private router:Router){}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePage = event.urlAfterRedirects;
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActivePage(page: string) {
    this.activePage = page;
  }
}
