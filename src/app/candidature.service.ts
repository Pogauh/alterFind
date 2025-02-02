import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidature } from './models/candidature';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8081/api';
  private userApiUrl = 'http://localhost:8081/api/users'; // Endpoint pour récupérer le candidatId

  constructor(private http: HttpClient) {}

  // 1️⃣ Récupérer le candidatId à partir du userId
  getCandidatId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.userApiUrl}/${userId}/candidatId`);
  }

  // 2️⃣ Récupérer toutes les candidatures d'un candidat
  getCandidaturesByCandidatId(candidatId: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/candidat/${candidatId}`);
  }
}
