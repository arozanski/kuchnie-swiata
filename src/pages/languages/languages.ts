import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular'

import { LocalisationService } from '../../services/localisation';

@Component({
  selector: 'page-languages',
  templateUrl: 'languages.html',
})
export class LanguagesPage {

  constructor(private localisationService: LocalisationService,
              public viewCtrl: ViewController) {}

  onLanguageChange(locale: string) {
    this.localisationService.setLocale(locale);

    setTimeout(() => {
      this.viewCtrl.dismiss(locale);
    }, 400);
  }

  isChecked(locale: string) {
    return this.localisationService.getLocale() === locale;
  }

}
