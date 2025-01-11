import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginRequest} from "./models/login-request";
import {LoginResponse} from "./models/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // a voir la fin de l'url
  private apiUrl = 'http://localhost:8081/api/users'; // L'URL de ton API

  constructor(private http: HttpClient) {}

  login(request: LoginRequest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8081/api/users/login',request,{headers: { 'Content-Type': 'application/json' }});
  }

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/users/register', user, {headers: { 'Content-Type': 'application/json' }});
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Vérifie si le token est présent
  }

  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('auth-token');
  }

  getUser(id:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}



/*
                        ###A TESTER###


login(user: any): Observable<any> {
  return this.http.post('http://localhost:8081/api/users/login', user, {
    headers: { 'Content-Type': 'application/json' }
  }).pipe(
    tap((res: any) => {
      localStorage.setItem('auth-token', res.token);
    })
  );
}
*/
