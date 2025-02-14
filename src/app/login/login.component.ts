import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule // Ajout de MatSnackBarModule
  ]
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage: string | null = null;  // Propriété pour stocker le message d'erreur

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  login() {
    if (!this.credentials.username || !this.credentials.password) {
      this.showError('Nom d\'utilisateur et mot de passe sont requis.');
      return;
    }

    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('user_role', response.role.replace('ROLE_', '').toLowerCase());  // Stocke le rôle de l'utilisateur
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login failed', error);
        this.showError('La connexion a échoué. Veuillez vérifier vos informations d\'identification.');
      }
    );
  }

  showError(message: string) {
    this.errorMessage = message;
    this.snackBar.open(message, 'Fermer', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
