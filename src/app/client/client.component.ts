import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/Customer/customer.service';
import { Customer } from '../models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Customer[] = [];
  isModalOpen = false;
  newCustomer: Customer = { lastName: '', firstName: '', phoneNumber: '', registrationDate: '' };

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.clients = customers;
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    this.customerService.addCustomer(this.newCustomer).subscribe(customer => {
      this.clients.push(customer);
      this.closeModal();
    });
  }

  editClient(client: Customer) {
    const editedClient = { ...client, lastName: client.lastName + ' (modifié)' };
    this.customerService.updateCustomer(client.id!, editedClient).subscribe(updatedClient => {
      const index = this.clients.findIndex(c => c.id === client.id);
      if (index !== -1) {
        this.clients[index] = updatedClient;
      }
    });
  }

  deleteClient(id: number) {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.clients = this.clients.filter(client => client.id !== id);
    });
  }
}
