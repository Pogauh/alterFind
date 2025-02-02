import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../candidature.service';
import { Candidature } from "../models/candidature";

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
})
export class ApplicationsComponent implements OnInit {

  candidatures: Candidature[] = [];
  errorMessage: string | null = null;

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Récupération de l'ID utilisateur
    console.log("luser id : ",userId);

    if (userId) {
      // 1 D'abord, obtenir l'ID du candidat à partir du userId
      console.log("luser id 2: ",userId);
      this.candidatureService.getCandidatId(Number(userId)).subscribe(
        (candidatId) => {
          //  Ensuite, récupérer les candidatures de ce candidat
          console.log("luser id : ",candidatId);

          this.candidatureService.getCandidaturesByCandidatId(candidatId).subscribe(
            (data) => {
              this.candidatures = data;
              console.log('Candidatures récupérées :', data);
            },
            (error) => {
              this.errorMessage = "Erreur lors de la récupération des candidatures.";
              console.error(error);
            }
          );
        },
        (error) => {
          this.errorMessage = "Erreur lors de la récupération de l'ID du candidat.";
          console.error(error);
        }
      );
    } else {
      this.errorMessage = "Utilisateur non connecté.";
    }
  }
}
