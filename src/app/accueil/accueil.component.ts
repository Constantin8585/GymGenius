import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatsService } from '../services/Statistiques/stats.service';
import { AuthService } from '../services/auth.service';  // Importer le service d'authentification
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  stats: any = {};
  userRole: string | null = '';  // Propriété pour stocker le rôle de l'utilisateur

  constructor(private statsService: StatsService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loadStats();
    this.userRole = this.authService.getUserRole();  // Récupérer le rôle de l'utilisateur
  }

  loadStats() {
    this.statsService.getStats().subscribe(data => {
      this.stats = data;
    });
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
