import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Annonce } from "../models/annonce.model";
import { AnnonceService } from "../annonce.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})

export class AnnoncesComponent implements OnInit {
  annonces: Annonce[] = [];
  errorMessage: string | null = null;

  // Initialisation du formulaire
  annonceForm: FormGroup = new FormGroup({
    titre: new FormControl(''),
    description: new FormControl(''),
    localisation: new FormControl(''),
    salaire: new FormControl(''),
  });

  // Variable pour afficher/masquer le formulaire
  formVisible: boolean = false;

  // Initialisation d'une instance vide d'Annonce
  request: Annonce = {
    id: 0,
    description:'',
    titre: '',
    localisation: '',
    salaire: '',
    company_id: 0,
    entreprise: {
      nom_entreprise: '',
    },
  };

  constructor(
    private userService: UserService,
    private annonceService: AnnonceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getAnnonces(userId).subscribe(
        (data) => {
          this.annonces = data;
        },
        (error) => {
          this.errorMessage = "Erreur lors de la récupération des données utilisateur.";
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  // Méthode pour basculer l'affichage du formulaire
  toggleForm(): void {
    this.formVisible = !this.formVisible;
  }

  postAnnonce(): void {
    const formValue = this.annonceForm.value;

    this.request.titre = formValue.titre;
    this.request.description = formValue.description;
    this.request.localisation = formValue.localisation;
    this.request.salaire = formValue.salaire;

    const entrepriseId = localStorage.getItem('userId');
    if (entrepriseId) {
      this.request.company_id = Number(entrepriseId);

      console.log(entrepriseId);
    }
    console.log(this.request);

    this.annonceService.postAnnonce(this.request).subscribe(
      () => {
        console.log('Annonce envoyée avec succès');
      },
      (error) => {
        console.error('Erreur lors de l\'envoi de l\'annonce', error);
      }
    );
  }

  deleteAnnonce(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
      this.userService.deleteAnnonce(id).subscribe(() => {
        this.annonces = this.annonces.filter(annonce => annonce.id !== id);
      });
    }
  }


}
