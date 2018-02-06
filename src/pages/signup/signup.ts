import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { LocalisationService } from '../../services/localisation';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  signupForm : FormGroup;
  emailLbl = this.localeService.localise('email');
  passwordLbl = this.localeService.localise('password');
  signupLbl = this.localeService.localise('signup');
  signupTitle = this.localeService.localise('signupTitle');

  constructor(private localeService: LocalisationService) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    let email = null;
    let password = null;

    this.signupForm = new FormGroup({
      'email': new FormControl(email, Validators.required),
      'password': new FormControl(password, Validators.required)
    });
  }
}
