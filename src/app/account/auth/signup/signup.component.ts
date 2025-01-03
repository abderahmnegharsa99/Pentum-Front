import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: UntypedFormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  year: number = new Date().getFullYear();
  
  // Assuming userData is passed to the component as input or can be fetched
  userData = {
    nom: '',
    prenom: '',
    numCin: '',
    dateDeNaissance: '',
    paysDeNaissance: '',
    nationalite: '',
    adress: '',
    codePostal: '',
    contact: '',
    mail: '',
    motDePasse: '',
    numCompte: '',
    nomBanque: ''
  };

  constructor(
    private formBuilder: UntypedFormBuilder,
    private registrationService: RegistrationService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      nom: [this.userData.nom, Validators.required],
      prenom: [this.userData.prenom, Validators.required],
      numCin: [this.userData.numCin, Validators.required],
      dateDeNaissance: [this.userData.dateDeNaissance, Validators.required],
      paysDeNaissance: [this.userData.paysDeNaissance, Validators.required],
      nationalite: [this.userData.nationalite, Validators.required],
      adress: [this.userData.adress, Validators.required],
      codePostal: [this.userData.codePostal, Validators.required],
      contact: [this.userData.contact, Validators.required],
      mail: [this.userData.mail, [Validators.required, Validators.email]],
      motDePasse: [this.userData.motDePasse, Validators.required],
      numCompte: [this.userData.numCompte, Validators.required],
      nomBanque: [this.userData.nomBanque, Validators.required]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }

    const formValues = this.signupForm.value;

    this.registrationService.register(formValues).pipe(first()).subscribe(
      data => {
        this.successmsg = true;
        this.error = '';
        this.router.navigate(['account/login']);
        // Optionally navigate to another page on success
      },
      error => {
        this.successmsg = false;
        this.error = error;
      }
    );
  }
}
