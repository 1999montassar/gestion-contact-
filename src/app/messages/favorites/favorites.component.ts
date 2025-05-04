import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class FavoritesComponent implements OnInit {
  favoriteMessages: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.messageService.getFavoriteMessages().subscribe({
      next: (res) => this.favoriteMessages = res.data || res,
      error: () => alert("Erreur lors du chargement des messages favoris.")
    });
  }

  removeFromFavorites(id: string): void {
    this.messageService.toggleFavorite(id).subscribe({
      next: () => {
        this.favoriteMessages = this.favoriteMessages.filter(m => m._id !== id);
      },
      error: () => alert("Erreur lors de la suppression du favori.")
    });
  }
}
