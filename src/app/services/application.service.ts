import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }

  // Simuler des candidatures
  getApplications() {
    return [
      { id: 1, company: 'Entreprise A', status: 'En cours' },
      { id: 2, company: 'Entreprise B', status: 'Acceptée' },
      { id: 3, company: 'Entreprise C', status: 'Rejetée' }
    ];
  }
}
