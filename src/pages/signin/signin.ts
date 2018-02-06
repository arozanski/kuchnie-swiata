import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

import { LocalisationService } from '../../services/localisation';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;

  languages = [{
      selected: true,
      label: 'English',
      locale: 'en',
      flagSrc: '../../../assets/imgs/gb.svg'
    }, {
      selected: false,
      label: 'Polski',
      locale: 'pl',
      flagSrc: '../../../assets/imgs/pl.svg'
    }];

  constructor(private localeService: LocalisationService) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    let email = null;
    let password = null;
    let languages = [];

    console.log('current locale', this.localeService.localise('appName'));

    this.signinForm = new FormGroup({
      'email': new FormControl(email),
      'password': new FormControl(password),
      'languages': new FormControl(languages)
    });
  }

  onLanguageChange (event: event) {
    console.log(event);
  }
}