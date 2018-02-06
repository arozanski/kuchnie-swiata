import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

import { PopoverController } from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';

import { LanguagesPage } from '../languages/languages';

import { LocalisationService } from '../../services/localisation';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  signinForm : FormGroup;
  locale = '';
  appName = '';
  emailLbl = '';
  passwordLbl = '';
  submitLbl = '';

  constructor(private localeService: LocalisationService,
              private globalization: Globalization,
              private popoverCtrl: PopoverController) {}

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

  private initializeForm() {
    let email = null;
    let password = null;

    this.signinForm = new FormGroup({
      'email': new FormControl(email),
      'password': new FormControl(password)
    });
  }

  onLanguageChange(event: MouseEvent) {
    const popover = this.popoverCtrl.create(LanguagesPage);

    popover.present({ev: event});
    popover.onDidDismiss(() => {
      this.refreshLocales();
    });
  }

  private refreshLocales() {
    this.locale = this.localeService.getLocale();
    this.appName = this.localeService.localise('appName');
    this.passwordLbl = this.localeService.localise('password');
    this.emailLbl = this.localeService.localise('email');
    this.submitLbl = this.localeService.localise('submit');
  }
}