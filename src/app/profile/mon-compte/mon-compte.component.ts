import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mon-compte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {
  compteForm: FormGroup;
  selectedImage: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.compteForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      avatar: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.http.get('http://localhost:5000/api/profil/me').subscribe({
      next: (user: any) => {
        this.compteForm.patchValue({
          nom: user.nom,
          email: user.email,
          telephone: user.telephone
        });
        this.selectedImage = user.avatar;
      },
      error: (err) => {
        console.error('Erreur de chargement du profil', err);
        this.errorMessage = 'Impossible de charger le profil';
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.compteForm.patchValue({ avatar: file });
      };
      reader.readAsDataURL(file);
    }
  }

  sauvegarderModifications(): void {
    if (this.compteForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('nom', this.compteForm.value.nom);
    formData.append('email', this.compteForm.value.email);
    formData.append('telephone', this.compteForm.value.telephone);

    if (this.compteForm.value.avatar) {
      formData.append('avatar', this.compteForm.value.avatar);
    }

    this.http.put('http://localhost:5000/api/profil/update', formData).subscribe({
      next: (response: any) => {
        alert('Profil mis à jour avec succès !');
        this.isLoading = false;
        this.loadUserProfile(); // Recharger les données fraîches
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Erreur de mise à jour', err);
        
        if (err.status === 400) {
          this.errorMessage = err.error?.message || 'Données invalides';
        } else {
          this.errorMessage = 'Erreur serveur, veuillez réessayer';
        }
      }
    });
  }
}