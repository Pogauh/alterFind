export class User {

  nom:string;
  prenom:string;
  password:string;
  email:string;

  constructor(nom: string, prenom: string, password:string,email:string) {
    this.nom = nom;
    this.prenom = prenom;
    this.password = password;
    this.email = email;
  }


}
