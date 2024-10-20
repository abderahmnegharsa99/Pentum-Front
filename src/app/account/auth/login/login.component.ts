import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import {
  AuthenticationResponse,
  AuthenticationService,
  LoginRequest,
} from "src/app/core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted: boolean = false;
  error: string = "";
  returnUrl: string;

  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Handles the login request.
   */
  loginUser() {
    this.submitted = true;

    // Stop here if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Create a login request object
    const loginRequest: LoginRequest = {
      mail: this.f.email.value,
      motDePasse: this.f.password.value,
    };

    // Call the login method from AuthService
    this._auth.login(loginRequest).subscribe({
      next: (response: AuthenticationResponse) => {
        console.log(response.access_token);
        console.log("Login successful. Navigating to dashboard...");
        this.router
          .navigate(["/dashboard"])
          .then(() => {
            console.log("Navigation successful");
          })
          .catch((err) => {
            console.error("Navigation error", err);
          });
      },
      error: (err) => {
        this.error = err ? err.error.message : "Login failed";
      },
    });
  }
}
