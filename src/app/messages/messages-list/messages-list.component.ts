import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css'],
  imports: [RouterModule] // Ajoutez cette ligne pour que <router-outlet> soit reconnu
})
export class MessagesListComponent { }
