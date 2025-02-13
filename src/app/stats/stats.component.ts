import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/Statistiques/stats.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stats',
  imports: [CommonModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  stats: any = {
    totalCustomers: 0,
    activeSubscriptions: 0,
    inactiveSubscriptions: 0,
    totalSubscriptions: 0,
    subscriptionsByPack: [],
    customersByRegistrationDate: [],
    activeSubscriptionPercentage: 0
  };

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.statsService.getStats().subscribe(data => {
      const customers = data.customers;
      const subscriptions = data.subscriptions;

      this.stats.totalCustomers = customers.length;
      this.stats.totalSubscriptions = subscriptions.length;
      this.stats.activeSubscriptions = subscriptions.filter((sub: { activeSubscription: any; }) => sub.activeSubscription).length;
      this.stats.inactiveSubscriptions = this.stats.totalSubscriptions - this.stats.activeSubscriptions;
      this.stats.activeSubscriptionPercentage = (this.stats.activeSubscriptions / this.stats.totalCustomers) * 100;

      const subscriptionsByPack = subscriptions.reduce((acc: {[key: string]: number}, sub: { pack: { name: string | number; }; }) => {
        if (!acc[sub.pack.name]) {
          acc[sub.pack.name] = 0;
        }
        acc[sub.pack.name]++;
        return acc;
      }, {});

      this.stats.subscriptionsByPack = Object.keys(subscriptionsByPack).map(key => ({
        name: key,
        count: subscriptionsByPack[key]
      }));

      const customersByDate = customers.reduce((acc: {[key: string]: number}, customer: { registrationDate: string | number | Date; }) => {
        const date = new Date(customer.registrationDate).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      this.stats.customersByRegistrationDate = Object.keys(customersByDate).map(key => ({
        date: key,
        count: customersByDate[key]
      }));
    });
  }
}
