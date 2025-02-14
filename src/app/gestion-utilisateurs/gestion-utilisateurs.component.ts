import { Component, OnInit } from '@angular/core';

import { User } from '../models/user.model';
import { UserService } from '../services/User/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-utilisateurs.component.html',
  styleUrls: ['./gestion-utilisateurs.component.css']
})
export class GestionUtilisateursComponent implements OnInit {
  users: User[] = [];
  newUser: User = { username: '', password: '', role: 'viewer' };
  isModalOpen = false;
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  openModal(user?: User) {
    if (user) {
      this.newUser = { ...user };
    } else {
      this.newUser = { username: '', password: '', role: 'viewer' };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    if (this.newUser.id) {
      this.userService.updateUser(this.newUser.id, this.newUser).subscribe(
        updatedUser => {
          const index = this.users.findIndex(u => u.id === this.newUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.closeModal();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
      );
    } else {
      this.userService.addUser(this.newUser).subscribe(
        user => {
          this.users.push(user);
          this.closeModal();
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        }
      );
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}
