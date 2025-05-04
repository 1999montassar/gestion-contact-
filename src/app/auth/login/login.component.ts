import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';  // Vérifie le chemin
import { HttpClientModule } from '@angular/common/http'; // ✅ Ajoute ceci

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.email && this.password) {
      const loginData = {
        email: this.email,
        password: this.password
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Connexion réussie', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erreur de connexion', err);
          if (err.status === 401) {
            alert('Email ou mot de passe incorrect.');
          } else {
            alert(err.error?.message || 'Une erreur est survenue.');
          }
        }
      });
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}
