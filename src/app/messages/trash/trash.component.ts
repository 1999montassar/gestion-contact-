import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  messages: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadTrash();
  }

  loadTrash(): void {
    this.messageService.getDeletedMessages().subscribe({
      next: (res) => this.messages = res,
      error: () => alert("Erreur lors du chargement de la corbeille.")
    });
  }

  restoreMessage(id: string): void {
    this.messageService.restoreMessage(id).subscribe({
      next: () => this.loadTrash(),
      error: () => alert("Erreur lors de la restauration.")
    });
  }

  deletePermanently(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce message définitivement ?')) {
      this.messageService.deletePermanently(id).subscribe({
        next: () => this.loadTrash(),
        error: () => alert("Erreur lors de la suppression définitive.")
      });
    }
  }
}