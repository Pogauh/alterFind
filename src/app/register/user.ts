export class User {

  nom:string;
  prenom:string;
  username:string;
  password:string;
  email:string;

  constructor(nom: string, prenom: string,username: string,email:string,password:string) {
    this.nom = nom;
    this.prenom = prenom;
    this.username = username;
    this.password = password;
    this.email = email;
  }


}
