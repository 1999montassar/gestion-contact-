import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verifey.component.html',
  styleUrls: ['./verifey.component.css'],
})
export class VerificationComponent implements OnInit {
  verifeyForm!: FormGroup;
  email: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.verifeyForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });

    // Récupérer l'email du localStorage
    const savedEmail = localStorage.getItem('emailForVerification');
    if (savedEmail) {
      this.email = savedEmail;
      console.log('Email récupéré du localStorage :', this.email);
    } else {
      console.error('Email non trouvé dans localStorage.');
      this.router.navigate(['/forgot-password']); // Redirection si l'email n'est pas trouvé
    }
  }

  verifierCode(): void {
    this.errorMessage = ''; // Réinitialiser le message d'erreur

    if (this.verifeyForm.valid) {
      const verificationCode = this.verifeyForm.value.verificationCode;
      console.log('Code de vérification:', verificationCode);

      // Appel au service d'authentification pour vérifier le code
      this.authService.verifyCode({ email: this.email, verificationCode }).subscribe({
        next: (res) => {
          console.log('Réponse du serveur:', res); // Ajouter un log pour vérifier la réponse du backend

          if (res.message === 'Code validé') {
            // Si le code est validé, rediriger vers la page new-password
            this.router.navigate(['/new-password']);
          } else {
            // Si le code est invalide
            this.errorMessage = 'Code invalide. Veuillez réessayer.';
          }
        },
        error: (err) => {
          console.error('Erreur lors de la vérification du code:', err);
          // Gérer l'erreur et afficher un message d'erreur
          this.errorMessage = err.error.message || 'Code invalide. Veuillez réessayer.';
        }
      });
    } else {
      // Si le formulaire est invalide
      this.verifeyForm.markAllAsTouched();
      this.errorMessage = 'Veuillez entrer un code valide.';
    }
  }

  goToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
