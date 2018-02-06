import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { PopoverController, NavController } from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';

import { LanguagesPage } from '../languages/languages';
import { SignupPage } from '../signup/signup'

import { LocalisationService } from '../../services/localisation';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  signinForm : FormGroup;
  signupPage = SignupPage;
  locale = '';
  appName = '';
  emailLbl = '';
  passwordLbl = '';
  submitLbl = '';
  signupLine1 = '';
  signupLine2 = '';
  here = '';

  constructor(private localeService: LocalisationService,
              private globalization: Globalization,
              private popoverCtrl: PopoverController,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.initializeForm();
    this.refreshLocales();

    this.globalization.getPreferredLanguage()
      .then(response => {
        let locale = response.value;

        if (locale === 'en-GB') {
          this.localeService.setLocale(locale);
          this.locale = locale;
          this.refreshLocales();
        } else {
          this.localeService.setLocale('pl-PL');
        }

      })
      .catch(e => console.log(e));
  }

  onLanguageChange(event: MouseEvent) {
    const popover = this.popoverCtrl.create(LanguagesPage);

    popover.present({ev: event});
    popover.onDidDismiss(() => {
      this.refreshLocales();
    });
  }

  onSignupClick() {
    this.navCtrl.push(SignupPage);
  }

  private initializeForm() {
    let email = null;
    let password = null;

    this.signinForm = new FormGroup({
      'email': new FormControl(email, Validators.required),
      'password': new FormControl(password, Validators.required)
    });
  }

  private refreshLocales() {
    this.locale = this.localeService.getLocale();
    this.appName = this.localeService.localise('appName');
    this.passwordLbl = this.localeService.localise('password');
    this.emailLbl = this.localeService.localise('email');
    this.submitLbl = this.localeService.localise('submit');
    this.signupLine1 = this.localeService.localise('signupLine1');
    this.signupLine2 = this.localeService.localise('signupLine2');
    this.here = this.localeService.localise('here');
  }
}