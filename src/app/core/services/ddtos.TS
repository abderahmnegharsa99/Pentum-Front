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
