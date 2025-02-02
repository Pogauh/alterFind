import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Annonce} from "./models/annonce.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private apiUrl = 'http://localhost:8081/api/users'; // L'URL de ton API

  constructor(private http: HttpClient) {}

  postAnnonce(request: Annonce):Observable<Annonce> {
    return this.http.post<Annonce>('http://localhost:8081/api/annonces',request,{headers: { 'Content-Type': 'application/json' }});
  }
}
