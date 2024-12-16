import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; // L'URL de ton API

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/register', user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Vérifie si le token est présent
  }

  logout(): void {
    localStorage.removeItem('token'); // Supprime le token
  }
}
