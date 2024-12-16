import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // URL du backend

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir la liste des utilisateurs
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Méthode pour créer un utilisateur
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
