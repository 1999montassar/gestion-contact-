import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Détecter l'environnement et ajuster l'URL de l'API
    const hostname = window.location.hostname;

    // Si l'application est en développement sur localhost
    if (hostname === 'localhost') {
      this.apiUrl = 'http://localhost:5000/api/auth'; // Utilisation de localhost en développement
    }
    // Si l'application est accessible via l'IP locale
    else {
      this.apiUrl = `http://${hostname}:5000/api/auth`; // Utilisation de l'IP locale
    }
  }

  // ✅ Inscription
  register(userData: {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // ✅ Connexion
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // ✅ Mot de passe oublié (email ou téléphone)
  forgotPassword(data: { email?: string; phoneNumber?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }

  // ✅ Vérification code
  verifyCode(data: { email: string; verificationCode: string }): Observable<any> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/verify-code`, data);
  }

  // ✅ Réinitialisation mot de passe
  resetPassword(data: { email: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
}
