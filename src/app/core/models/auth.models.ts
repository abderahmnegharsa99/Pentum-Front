export class User {
  idU: number; // Matches `idU` from Spring Boot entity
  nom: string; // Matches `nom` from Spring Boot entity
  prenom: string; // Matches `prenom` from Spring Boot entity
  numCin: number; // Matches `numCin` from Spring Boot entity
  dateDeNaissance: Date; // Matches `dateDeNaissance` from Spring Boot entity
  paysDeNaissance: string; // Matches `paysDeNaissance` from Spring Boot entity
  nationalite: string; // Matches `nationalite` from Spring Boot entity
  adress: string; // Matches `adress` from Spring Boot entity
  codePostal: number; // Matches `codePostal` from Spring Boot entity
  contact: number; // Matches `contact` from Spring Boot entity
  photo: string; // Matches `photo` from Spring Boot entity
  mail: string; // Matches `mail` from Spring Boot entity (used as username for login)
  motDePasse: string; // Matches `motDePasse` from Spring Boot entity
  phone: string; // Matches `phone` from Spring Boot entity
  location: string; // Matches `location` from Spring Boot entity
  description: string; // Matches `description` from Spring Boot entity
  age: string; // Matches `age` from Spring Boot entity
  profession: string; // Matches `profession` from Spring Boot entity
  role: string; // Matches `role` (Enum ROLE) from Spring Boot entity
  token?: string; // JWT token for session management, not in the backend model
  username: string;
  portefeuille?: any; // Portefeuille entity, if needed in Angular
  compteBancaire?: CompteBancaire; // Update to include CompteBancaire
}

export interface CompteBancaire {
  idCmpt: number; // Unique identifier for the bank account
  numCompte: number; // Account number
  nomBanque: string; // Name of the bank
  dateOuverture: Date; // Date when the account was opened
  soldeCompte: number; // Current balance of the account
  portefeuilles: any[];
}
export interface PortefeuilleDTO {
  cashDispo: number;
  valTotPortefeuille: number;
  rendementTotal: number;
  riskProfile: number;
  devisesSupportees: DEVISE;
  compteBancaireId: number;
}
// src/app/models/devise.enum.ts

export enum DEVISE {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  // Add other supported currencies
}

export interface Portefeuille {
  idP: number;
  cashDispo: number;
  valTotPortefeuille: number;
  rendementTotal: number;
  riskProfile: number;
  devisesSupportees: DEVISE; // or string
  compteBancaire: CompteBancaire;
}
