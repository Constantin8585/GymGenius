import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/Customer/customer.service';
import { Customer } from '../models/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-clients.component.html',
  styleUrls: ['./gestion-clients.component.css']
})
export class GestionClientsComponent implements OnInit {
  searchTerm: string = '';
  filteredClients: Customer[] = [];
  clients: Customer[] = [];
  isModalOpen = false;
  newCustomer: Customer = { lastName: '', firstName: '', phoneNumber: '', registrationDate: '' };

  constructor(private customerService: CustomerService) {}

  

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe((customers) => {
      this.clients = customers;
      this.filteredClients = [...this.clients]; 
    });
  }

  openModal(customer?: Customer) {
    if (customer) {
      this.newCustomer = { ...customer };
    } else {
      this.newCustomer = { lastName: '', firstName: '', phoneNumber: '', registrationDate: '' };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  applyFilter() {
    this.filteredClients = this.clients.filter(client =>
      (client.lastName + client.firstName + client.phoneNumber)
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }
  

  onSubmit() {
    if (this.newCustomer.id) {
      this.customerService.updateCustomer(this.newCustomer.id, this.newCustomer).subscribe(
        updatedCustomer => {
          const index = this.clients.findIndex(c => c.id === this.newCustomer.id);
          if (index !== -1) {
            this.clients[index] = updatedCustomer;
          }
          this.closeModal();
        },
        error => {
          console.error('Erreur lors de la mise à jour du client', error);
        }
      );
    } else {
      this.customerService.addCustomer(this.newCustomer).subscribe(
        customer => {
          this.clients.push(customer);
          this.closeModal();
        },
        error => {
          console.error('Erreur lors de l\'ajout du client', error);
        }
      );
    }
  }

  editClient(client: Customer) {
    this.openModal(client);
  }

  deleteClient(id: number) {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.clients = this.clients.filter(client => client.id !== id);
    });
  }
}
