import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { AuthenticationService } from "../services/auth.service";
import { AuthfakeauthenticationService } from "../services/authfake.service";

import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Get the currentUser data from localStorage
    const currentUser = localStorage.getItem("currentUser");

    // Check if the currentUser data exists
    if (currentUser) {
      // User is logged in, allow route activation
      return true;
    }

    // User is not logged in, redirect to login page with the returnUrl
    this.router.navigate(["/account/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
