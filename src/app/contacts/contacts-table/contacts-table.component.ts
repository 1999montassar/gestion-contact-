import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contacts-table',
  standalone: true,
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class ContactsTableComponent implements OnInit {
  contacts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalContacts: number = 0;
  searchTerm: string = '';
  totalPages: number = 0;
  isLoading: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts(page: number = 1, limit: number = 3, searchTerm: string = '') {
    this.isLoading = true;
    this.contactService.getContacts(page, limit, searchTerm).subscribe(response => {
      this.contacts = response.contacts;
      this.totalContacts = response.totalContacts;
      this.totalPages = Math.ceil(this.totalContacts / this.itemsPerPage);
      this.isLoading = false;
    }, error => {
      console.error('Error fetching contacts:', error);
      this.isLoading = false;
    });
  }

  searchContacts() {
    this.currentPage = 1;
    this.getContacts(this.currentPage, this.itemsPerPage, this.searchTerm);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getContacts(this.currentPage, this.itemsPerPage, this.searchTerm);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getContacts(this.currentPage, this.itemsPerPage, this.searchTerm);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getContacts(this.currentPage, this.itemsPerPage, this.searchTerm);
  }

  ajouterContact() {
    // Afficher un formulaire ou demander à l'utilisateur de saisir les informations
    const newContact = {
      nom: prompt('Entrez le nom du contact:'),
      email: prompt('Entrez l\'email du contact:'),
      telephone: prompt('Entrez le téléphone du contact:')
    };
  
    // Vérifier si tous les champs sont remplis
    if (!newContact.nom || !newContact.email || !newContact.telephone) {
      alert('Tous les champs sont requis pour ajouter un contact.');
      return;
    }
  
    // Envoyer la requête au backend pour créer le contact
    this.contactService.createContact(newContact).subscribe(
      response => {
        alert('Contact ajouté');
        this.getContacts(); // Rafraîchir la liste des contacts
      },
      error => {
        console.error('Erreur ajout:', error);
        alert('Erreur lors de l\'ajout du contact : ' + error.message);
      }
    );
  }
  
  
  

  supprimerContact(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe(response => {
      alert('Contact supprimé');
      this.getContacts(); // Refresh list
    }, error => {
      console.error('Erreur suppression:', error);
    });
  }

  consulterContact(contact: any) {
    alert(`Nom: ${contact.nom}\nEmail: ${contact.email}\nTéléphone: ${contact.telephone}`);
  }

  modifierContact(contact: any) {
    contact.isEditing = true;
  }

  sauvegarderContact(contact: any) {
    contact.isEditing = false;
    this.contactService.updateContact(contact._id, contact).subscribe(response => {
      alert('Modifications enregistrées');
      this.getContacts(); // Refresh list
    }, error => {
      console.error('Erreur modification:', error);
    });
  }

  ajouterFavoris(contact: any) {
    this.contactService.toggleFavorite(contact._id).subscribe(response => {
      contact.isFavorite = response.isFavorite;
    }, error => {
      console.error('Erreur favoris:', error);
    });
  }
}
