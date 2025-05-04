import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  selectedMethod: string = 'email';
  verificationCode: string = '';
  showCodePrompt: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      resetMethod: ['email', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    });
  }

  ngOnInit(): void {
    this.onChoiceChange(this.selectedMethod); // Appliquer les validateurs initiaux
  }

  onChoiceChange(method: string): void {
    this.selectedMethod = method;

    if (method === 'email') {
      this.forgotPasswordForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.forgotPasswordForm.get('phoneNumber')?.clearValidators();
      this.forgotPasswordForm.get('phoneNumber')?.setValue('');
    } else if (method === 'phone') {
      this.forgotPasswordForm.get('phoneNumber')?.setValidators([Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]);
      this.forgotPasswordForm.get('email')?.clearValidators();
      this.forgotPasswordForm.get('email')?.setValue('');
    }

    this.forgotPasswordForm.get('email')?.updateValueAndValidity();
    this.forgotPasswordForm.get('phoneNumber')?.updateValueAndValidity();
  }

  submit(): void {
    if (this.forgotPasswordForm.valid) {
      const formData = this.forgotPasswordForm.value;
      let requestData;
  
      if (this.selectedMethod === 'email') {
        requestData = { email: formData.email };
  
        // 👉 Stocke l'email dans le localStorage pour la suite
        localStorage.setItem('emailForVerification', formData.email);
      } else {
        requestData = { phoneNumber: formData.phoneNumber };
  
        // 👉 Stocke le numéro dans le localStorage pour la suite
        localStorage.setItem('phoneForVerification', formData.phoneNumber);
      }
  
      this.authService.forgotPassword(requestData).subscribe({
        next: (res) => {
          if (res.verificationCode) {
            this.verificationCode = res.verificationCode;
            this.showCodePrompt = true;
          } else {
            this.verificationCode = 'Code non disponible';
          }
        },
        error: (err) => {
          console.error('Erreur lors de la réinitialisation', err);
          alert("Erreur lors de l'envoi du lien de réinitialisation.");
        }
      });
    } else {
      alert('Veuillez remplir correctement tous les champs.');
    }
  }
}  
