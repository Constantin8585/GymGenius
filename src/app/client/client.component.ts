import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/Customer/customer.service';
import { Customer } from '../models/customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [CommonModule],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.clients = customers;
    });
  }

  addClient() {
    const newClient: Customer = { lastName: 'Nouveau', firstName: 'Client', phoneNumber: '0000000000' };
    this.customerService.addCustomer(newClient).subscribe(customer => {
      this.clients.push(customer);
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
