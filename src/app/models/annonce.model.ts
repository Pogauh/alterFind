export interface Annonce {
  id: number;
  titre: string;
  localisation: string;
  salaire: string;
  entreprise?: {
    nom_entreprise: string;
  };
}
