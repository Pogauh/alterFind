export interface Annonce {
  id: number;
  description: string;
  titre: string;
  localisation: string;
  salaire: string;
  entreprise?: {
    nom_entreprise: string;
  };
  company_id:number;

}
