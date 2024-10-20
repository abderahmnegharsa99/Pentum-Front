import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { first, Observable, tap } from "rxjs";

import { User } from "../models/auth.models";
import { getFirebaseBackend } from "../../authUtils";

export interface RegisterRequest {
  nom: string;
  prenom: string;
  mail: string;
  motDePasse: string;
  // Include other fields as required by the RegistreRequest in Spring Boot
}

export interface LoginRequest {
  mail: string;
  motDePasse: string;
}

export interface AuthenticationResponse {
  message: string;
  access_token: string;
  // Include any other response fields sent by your backend, e.g., user details, roles, etc.
}

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private apiUrl = "http://localhost:3050/auth";
  user: User;
  constructor(private http: HttpClient) {}

  /**
   * Returns the current user
   */
  public currentUser(): User {
    return getFirebaseBackend().getAuthenticatedUser();
  }

  /**
   * Registers a new user.
   * @param registerRequest - Object containing registration details
   * @returns Observable of AuthenticationResponse
   */
  register(
    registerRequest: RegisterRequest
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${this.apiUrl}/register`,
      registerRequest
    );
  }

  /**
   * Logs in an existing user.
   * @param loginRequest - Object containing login details
   * @returns Observable of AuthenticationResponse
   */
  login(loginRequest: LoginRequest): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        first(),
        // Store user data in the desired format after successful login
        tap((response: AuthenticationResponse) => {
          const currentUser = {
            email: loginRequest.mail,
            username: "admin", // Replace this with the actual username if available from the response
            token: response.access_token,
          };
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        })
      );
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
    return getFirebaseBackend()
      .forgetPassword(email)
      .then((response: any) => {
        const message = response.data;
        return message;
      });
  }

  /**
   * Logout the user
   */
  logout() {
    // logout the user
    getFirebaseBackend().logout();
  }
}
