import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {Annonce} from "../models/annonce.model";

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})

export class AnnoncesComponent implements OnInit {
  annonces: Annonce[] = [];
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}



  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getAnnonces(userId).subscribe(
        (data) => {
          this.annonces = data;
          console.log(data);
        },
        (error) => {
          this.errorMessage = "Erreur lors de la récupération des données utilisateur.";
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }
  deleteAnnonce(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
      this.userService.deleteAnnonce(id).subscribe(() => {
        this.annonces = this.annonces.filter(annonce => annonce.id !== id);
        console.log('Annonce supprimée');
      });
    }
  }

}
