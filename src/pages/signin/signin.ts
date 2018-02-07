import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";

import {
  PopoverController,
  NavController,
  LoadingController,
  AlertController,
} from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';

import { LanguagesPage } from '../languages/languages';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

import { LocalisationService } from '../../services/localisation';
import { AuthService } from '../../services/auth';

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
  signinTitle = '';

  constructor(private localeService: LocalisationService,
              private globalization: Globalization,
              private popoverCtrl: PopoverController,
              private navCtrl: NavController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}

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

  onSignin(form: NgForm) {
    let value = form.value;
    const loading = this.loadingCtrl.create({
      content : this.localeService.localise('signinProgress')
    });

    loading.present();
    this.authService.signin(value.email, value.password)
      .then(() => {
        loading.dismiss();
        this.navCtrl.push(HomePage);
      })
      .catch((error) => {
        const alert = this.alertCtrl.create({
          title: this.localeService.localise('signupError'),
          message : error.message,
          buttons : ['Ok']
        });
        alert.present();
        loading.dismiss();
      });
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
    this.signinTitle = this.localeService.localise('signinTitle');
  }
}