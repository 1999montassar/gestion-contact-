import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserSettingsService, UserSettings } from '../../services/user-settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
   
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  userId = '6650a3e12cfbc69b1c12d3e9'; // À remplacer dynamiquement par ID utilisateur connecté

  constructor(
    private fb: FormBuilder,
    private settingsService: UserSettingsService
  ) {
    this.settingsForm = this.fb.group({
      language: ['fr', Validators.required],
      emailNotifications: [false],
      shareData: [false],
      twoFactorAuth: [false],
      notifications: [true]
    });
  }

  ngOnInit(): void {
    this.settingsService.getSettings(this.userId).subscribe({
      next: (data) => this.settingsForm.patchValue(data),
      error: () => console.warn('Aucun paramètre trouvé')
    });
  }

  saveSettings(): void {
    if (this.settingsForm.valid) {
      const settings: UserSettings = {
        userId: this.userId,
        ...this.settingsForm.value
      };

      this.settingsService.saveSettings(settings).subscribe({
        next: () => alert('✅ Paramètres enregistrés avec succès !'),
        error: () => alert('❌ Erreur lors de la sauvegarde')
      });
    } else {
      alert('❌ Formulaire invalide');
    }
  }
}
