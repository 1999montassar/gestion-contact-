import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // pour *ngIf et *ngFor
import { MessageService } from '../services/message.service'; // assure-toi du bon chemin

@Component({
  selector: 'app-notifications',
  standalone: true, // important
  imports: [CommonModule], // pour directives *ngIf, *ngFor
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.messageService.getNotifications().subscribe({
      next: (res: any) => {
        this.notifications = res.data;
      },
      error: () => alert("Erreur lors du chargement des notifications.")
    });
  }

  markAsRead(id: string): void {
    this.messageService.markAsRead(id).subscribe(() => {
      const notif = this.notifications.find(n => n._id === id);
      if (notif) notif.read = true;
    });
  }

  // 🔄 Nouveau : déplacer la notification dans la corbeille
  moveToTrash(id: string): void {
    this.messageService.moveNotificationToTrash(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter(n => n._id !== id);
        alert("Notification déplacée dans la corbeille.");
      },
      error: () => alert("Erreur lors du déplacement de la notification dans la corbeille.")
    });
  }
}