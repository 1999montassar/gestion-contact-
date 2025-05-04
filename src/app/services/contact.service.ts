import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5000/api/contacts';

  constructor(private http: HttpClient) {}

  // Fetch contacts with pagination and search term
  getContacts(page: number = 1, limit: number = 10, search: string = ''): Observable<any> {
    const url = `${this.apiUrl}?page=${page}&limit=${limit}&search=${search}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error fetching contacts:', error);
        return throwError(() => new Error('Failed to fetch contacts'));
      })
    );
  }

  // Create a new contact
  createContact(contact: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact).pipe(
      catchError(error => {
        console.error('Error creating contact:', error);
        return throwError(() => new Error('Failed to create contact'));
      })
    );
  }

  // Delete a contact
  deleteContact(contactId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${contactId}`).pipe(
      catchError(error => {
        console.error('Error deleting contact:', error);
        return throwError(() => new Error('Failed to delete contact'));
      })
    );
  }

  // Update a contact
  updateContact(contactId: string, updatedContact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${contactId}`, updatedContact).pipe(
      catchError(error => {
        console.error('Error updating contact:', error);
        return throwError(() => new Error('Failed to update contact'));
      })
    );
  }

  // Toggle the favorite status of a contact
  toggleFavorite(contactId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${contactId}/favorite`, {}).pipe(
      catchError(error => {
        console.error('Error toggling favorite status:', error);
        return throwError(() => new Error('Failed to toggle favorite status'));
      })
    );
  }
}
