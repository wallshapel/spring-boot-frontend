import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Contact } from '../model/contact.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);

  index(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:8000/api/v1/contacts');
  }

  show(id: number): Observable<Contact> {
    return this.http.get<Contact>(`http://localhost:8000/api/v1/contact/${id}`);
  }

  store(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>('http://localhost:8000/api/v1/contact', contact);
  }

  update(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`http://localhost:8000/api/v1/contact/${id}`, contact);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8000/api/v1/contact/${id}`);
  }
}
