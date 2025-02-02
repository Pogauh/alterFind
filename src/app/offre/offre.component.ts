import { Component, OnInit } from '@angular/core';
import { Annonce } from "../models/annonce.model";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { OffreService } from "../offre.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Candidature } from "../models/candidature";

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {

  annonces: Annonce[] = [];
  errorMessage: string | null = null;

  // Formulaire de candidature
  candidatureForm: FormGroup = new FormGroup({
    lettreMotivation: new FormControl(''),
  });

  // Variable pour gérer l'affichage du formulaire
  formVisible: boolean = false;
  selectedAnnonceId: number | null = null;

  request: Candidature = {
    lettreMotivation: '',
    annonce_id: 0,
    candidate_id: 0,
  };

  constructor(
    private userService: UserService,
    private offreService: OffreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getAllAnnonces().subscribe(
      (data) => {
        this.annonces = data;
        console.log(data);
      },
      (error) => {
        this.errorMessage = "Erreur lors de la récupération des offres.";
      }
    );
  }

  // Méthode pour afficher le formulaire de candidature
  PostulerAnnonce(id: number): void {
    this.selectedAnnonceId = id;
    console.log(this.selectedAnnonceId);// Conserver l'ID de l'annonce sélectionnée
    this.formVisible = true;  // Afficher le formulaire
  }

  // Méthode pour soumettre la candidature
  soumettreCandidature(): void {
    const formValue = this.candidatureForm.value;

    this.request.lettreMotivation = formValue.lettreMotivation;

    const candidatId = localStorage.getItem('userId');
    if (candidatId) {
      this.request.candidate_id = Number(candidatId);

      console.log(candidatId);
    }
    console.log(this.request);



      // Vérifier si `selectedAnnonceId` est un nombre valide
      if (this.selectedAnnonceId !== null) {
        this.request.annonce_id = this.selectedAnnonceId;
      } else {
        console.error('Annonce non sélectionnée');
        return; // Ne pas soumettre si l'ID de l'annonce est invalide
      }

      // Envoi de la candidature
      this.offreService.postulerOffre(this.request).subscribe(
        (response) => {
          console.log('Candidature envoyée avec succès', response);
          this.formVisible = false;  // Masquer le formulaire après soumission
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de la candidature', this.request);
        }
      );
    }

}
