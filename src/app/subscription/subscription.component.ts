import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/Subscription/subscription.service';
import { CustomerService } from '../services/Customer/customer.service';
import { PackService } from '../services/Pack/pack.service';
import { Subscription } from '../models/subscription.model';
import { Customer } from '../models/customer.model';
import { Pack } from '../models/pack.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = [];
  customers: Customer[] = [];
  packs: Pack[] = [];
  filteredSubscriptions: Subscription[] = [];
  isModalOpen = false;
  newSubscription: Subscription = { customer: { id: 0, lastName: '', firstName: '', phoneNumber: '', registrationDate: '' }, pack: { id: 0, name: '', description: '', price: 0, durationMonths: 0, monthlyPrice: 0 }, startDate: '', activeSubscription: true };
  searchTerm: string = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private customerService: CustomerService,
    private packService: PackService
  ) {}

  ngOnInit() {
    this.loadSubscriptions();
    this.loadCustomers();
    this.loadPacks();
  }

  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe(subscriptions => {
      this.subscriptions = subscriptions;
      this.filteredSubscriptions = subscriptions; // Initialize filteredSubscriptions with all subscriptions
    });
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  loadPacks() {
    this.packService.getPacks().subscribe(packs => {
      this.packs = packs;
    });
  }

  openModal(subscription?: Subscription) {
    if (subscription) {
      this.newSubscription = { ...subscription };
    } else {
      this.newSubscription = { customer: { id: 0, lastName: '', firstName: '', phoneNumber: '', registrationDate: '' }, pack: { id: 0, name: '', description: '', price: 0, durationMonths: 0, monthlyPrice: 0 }, startDate: '', activeSubscription: true };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    const customer = this.customers.find(c => c.id === this.newSubscription.customer.id);
    const pack = this.packs.find(p => p.id === this.newSubscription.pack.id);
    
    if (customer && pack) {
      this.newSubscription.customer = customer;
      this.newSubscription.pack = pack;

      if (this.newSubscription.id) {
        this.subscriptionService.updateSubscription(this.newSubscription.id, this.newSubscription).subscribe(updatedSubscription => {
          const index = this.subscriptions.findIndex(s => s.id === this.newSubscription.id);
          if (index !== -1) {
            this.subscriptions[index] = updatedSubscription;
            this.filteredSubscriptions[index] = updatedSubscription; // Update filteredSubscriptions as well
          }
          this.closeModal();
        });
      } else {
        this.subscriptionService.addSubscription(this.newSubscription).subscribe(subscription => {
          this.subscriptions.push(subscription);
          this.filteredSubscriptions = [...this.subscriptions]; // Update filteredSubscriptions to match subscriptions
          this.closeModal();
        });
      }
    }
  }

  editSubscription(subscription: Subscription) {
    this.openModal(subscription);
  }

  deleteSubscription(id: number) {
    this.subscriptionService.deleteSubscription(id).subscribe(() => {
      this.subscriptions = this.subscriptions.filter(subscription => subscription.id !== id);
      this.filteredSubscriptions = this.filteredSubscriptions.filter(subscription => subscription.id !== id); // Update filteredSubscriptions as well
    });
  }

  applyFilter() {
    this.filteredSubscriptions = this.subscriptions.filter(subscription =>
      subscription.customer.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      subscription.customer.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      subscription.pack.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
