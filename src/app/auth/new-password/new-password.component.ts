import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  templateUrl: './new-password.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./new-password.component.css']
})


export class NewPasswordComponent {
  newPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.newPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });

    // Validation des mots de passe
    this.newPasswordForm.valueChanges.subscribe(() => {
      const newPassword = this.newPasswordForm.get('newPassword')?.value;
      const confirmPassword = this.newPasswordForm.get('confirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        this.newPasswordForm.get('confirmPassword')?.setErrors({ mismatch: true });
      } else {
        this.newPasswordForm.get('confirmPassword')?.setErrors(null);
      }
    });
  }

  resetPassword() {
    if (this.newPasswordForm.valid) {
      const data = {
        email: this.newPasswordForm.get('email')?.value,
        newPassword: this.newPasswordForm.get('newPassword')?.value
      };

      console.log('Données envoyées:', data);  // Ajoutez ce log pour vérifier les données

      this.authService.resetPassword(data).subscribe(
        res => {
          console.log('Mot de passe réinitialisé avec succès');
          this.router.navigate(['/home']);
        },
        err => {
          console.error('Erreur lors de la réinitialisation du mot de passe', err);
        }
      );
    } else {
      console.warn('Formulaire invalide');
    }
  }
}

  