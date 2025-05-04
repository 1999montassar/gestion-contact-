import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sent-messages',
  templateUrl: './sent-messages.component.html',
  styleUrls: ['./sent-messages.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SentMessagesComponent implements OnInit {
  sentMessages: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getSentMessages('Moi').subscribe({
      next: (res) => this.sentMessages = res,
      error: () => alert("Erreur de chargement des messages.")
    });
  }

  deleteMessage(id: string): void {
    this.messageService.moveToTrash(id).subscribe({
      next: () => {
        this.sentMessages = this.sentMessages.filter(msg => msg._id !== id);
        alert('Message déplacé dans la corbeille.');
      },
      error: () => alert("Erreur lors de la suppression du message.")
    });
  }
}
