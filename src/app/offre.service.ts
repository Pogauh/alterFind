import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "./models/login-request";
import {Observable} from "rxjs";
import {LoginResponse} from "./models/login-response";
import {Annonce} from "./models/annonce.model";

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private apiUrl = 'http://localhost:8081/api/users'; // L'URL de ton API

  constructor(private http: HttpClient) {}

  postulerOffre(candidature: any): Observable<any> {
    console.log("La candidature : ",candidature);
    return this.http.post('http://localhost:8081/api/postuler', candidature, {headers: { 'Content-Type': 'application/json' }});
  }


}
