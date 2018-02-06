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
  signinForm: FormGroup;
  locale = this.localeService.getLocale();
  appName = this.localeService.localise('appName');

  languages = [{
      selected: true,
      label: 'English',
      locale: 'en-GB',
    }, {
      selected: false,
      label: 'Polski',
      locale: 'pl-PL',
    }];

  constructor(private localeService: LocalisationService,
              private globalization: Globalization,
              private popoverCtrl: PopoverController) {}

  ngOnInit() {
    this.initializeForm();

    this.globalization.getPreferredLanguage()
      .then(res => {
        let locale = res.value;

        if (locale !== 'en-GB') {
          this.localeService.setLocale(locale);
        } else {
          this.localeService.setLocale('pl-PL');
        }

      })
      .catch(e => console.log(e));
  }

  private initializeForm() {
    let email = null;
    let password = null;

    console.log('current locale', this.localeService.localise('appName'));

    this.signinForm = new FormGroup({
      'email': new FormControl(email),
      'password': new FormControl(password)
    });
  }

  onLanguageChange (event: MouseEvent) {
    const popover = this.popoverCtrl.create(LanguagesPage);

    popover.present({ev: event});
    console.log(event);
  }
}