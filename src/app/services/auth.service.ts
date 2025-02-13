import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiBaseUrl = 'http://localhost:8080/api';  // URL centralisée

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  // Méthode pour s'authentifier
  login(credentials: { username: string; password: string }): Observable<any> {
    const loginUrl = `${this.apiBaseUrl}/authenticate`;  // Construit l'URL à partir de la base
    return this.http.post(loginUrl, credentials);
  }

  // Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // Récupère le nom d'utilisateur à partir du token
  getUsername(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.username || null;  // Assurez-vous que le token contient bien un champ "username"
    }
    return null;
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('access_token');
  }
}
