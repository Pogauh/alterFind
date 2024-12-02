import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les candidatures
  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Ajouter une nouvelle candidature
  addApplication(application: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, application);
  }

  // Mettre à jour une candidature
  updateApplication(id: number, application: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, application);
  }

  // Supprimer une candidature
  deleteApplication(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
