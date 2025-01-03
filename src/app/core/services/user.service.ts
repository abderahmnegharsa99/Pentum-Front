import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { CompteBancaire, User } from "../models/auth.models";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserProfileService {
  private apiUrl = "http://localhost:8080/user";
  user: User;
  constructor(private http: HttpClient) {}

  updateUserByEmail(email: string, userData: any): Observable<any> {
    const url = `${this.apiUrl}/update-by-email`; // Modify your backend endpoint if necessary
    const params = new HttpParams().set("email", email);

    return this.http.put(url, userData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      params: params,
    });
  }
  getAll() {
    return this.http.get<User[]>(`/api/login`);
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  // Method to get the user by email
  getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}/by-email`;

    // Set query parameters for the email
    const params = new HttpParams().set("email", email);

    // Make the GET request to fetch the user by email
    return this.http.get<User>(url, { params });
  }

  getAccBancaier(email: string): Observable<any> {
    // Endpoint URL to get CompteBancaire by user's email (adjust as needed)
    const url = `http://localhost:8080/user/get-compte-bancaire`; // Your backend endpoint
    const params = new HttpParams().set("email", email);

    // Make the GET request to fetch the associated CompteBancaire
    return this.http.get<any>(url, { params });
  }

  createPortefeuille(portefeuilleDTO: any): Observable<any> {
    // Endpoint URL to create a new Portefeuille (adjust as needed)
    const url = `http://localhost:8080/user/{idU}/portefeuille`; // Your backend endpoint

    // Make the POST request to create a new Portefeuille
    return this.http.post<any>(url, portefeuilleDTO);
  }
}
