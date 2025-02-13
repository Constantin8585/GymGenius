import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatsService } from '../services/Statistiques/stats.service';


@Component({
  selector: 'app-home',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  stats: any = {};

  constructor(private statsService: StatsService, private router: Router) {}

  ngOnInit() {
    this.loadStats();
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
