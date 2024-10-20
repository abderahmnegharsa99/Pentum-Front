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
  role: string; // Matches `role` (of type `ROLE`) from Spring Boot entity

  // Additional properties for authentication (optional)
  token?: string; // JWT token for session management
}
