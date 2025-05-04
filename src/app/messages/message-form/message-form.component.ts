import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message-form',
  standalone: true,
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class MessageFormComponent implements OnInit {
  messageForm!: FormGroup;
  selectedMode = 'email';
  messages: any[] = [];
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  phonePattern = /^\+?[0-9]{10,15}$/;

  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      modeEnvoi: [this.selectedMode, Validators.required],
      destinataire: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(3)]]
    }, { validators: this.validateDestinataire.bind(this) });
  }

  envoyerMessage(): void {
    if (this.messageForm.valid) {
      const data = {
        sender: 'Moi',
        recipient: this.messageForm.value.destinataire,
        content: this.messageForm.value.message,
        mode: this.messageForm.value.modeEnvoi
      };

      this.messageService.sendMessage(data.sender, data.recipient, data.content, data.mode).subscribe({
        next: (res) => {
          this.messages.push({
            id: res.data?._id || Date.now(),
            sender: 'Moi',
            content: `Envoyé par ${data.mode}: ${data.content}`,
            isFavorite: false
          });
          this.messageForm.reset({ modeEnvoi: this.selectedMode });
        },
        error: () => alert("Erreur lors de l'envoi.")
      });
    }
  }

  annulerMessage(): void {
    this.messageForm.reset({ modeEnvoi: this.selectedMode });
  }

  addToFavorites(id: string): void {
    this.messageService.toggleFavorite(id).subscribe({
      next: () => {
        const msg = this.messages.find(m => m.id === id);
        if (msg) msg.isFavorite = !msg.isFavorite;
      },
      error: () => alert("Erreur lors de l'ajout aux favoris.")
    });
  }

  deleteMessage(id: string): void {
    this.messageService.moveToTrash(id).subscribe({
      next: () => this.messages = this.messages.filter(m => m.id !== id),
      error: () => alert("Erreur lors du déplacement à la corbeille.")
    });
  }

  onModeChange(mode: string): void {
    this.selectedMode = mode;
    this.messageForm.get('modeEnvoi')?.setValue(mode);
    this.messageForm.get('destinataire')?.reset();
  }

  validateDestinataire(group: FormGroup): null {
    const mode = group.get('modeEnvoi')?.value;
    const destinataire = group.get('destinataire')?.value;
    const isValid = (mode === 'email' && this.emailPattern.test(destinataire)) ||
                    (mode === 'telephone' && this.phonePattern.test(destinataire));

    group.get('destinataire')?.setErrors(isValid ? null : { invalid: true });
    return null;
  }
}
