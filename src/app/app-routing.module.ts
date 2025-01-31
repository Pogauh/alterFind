import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationsComponent } from './applications/applications.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AnnoncesComponent } from './annonces/annonces.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Page d'accueil
  { path: 'profile', component: ProfileComponent }, // Profil utilisateur
  { path: 'applications', component: ApplicationsComponent }, // Gestion des candidatures
  { path: 'annonces', component: AnnoncesComponent },
  { path: 'login', component: LoginComponent }, // Connexion
  { path: 'register', component: RegisterComponent }, // Inscription
  { path: '**', redirectTo: '' } // Redirection par défaut vers la page d'accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
