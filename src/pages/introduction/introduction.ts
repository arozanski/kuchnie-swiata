import { Component, ViewChild } from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HomePage } from '../home/home';

import { LocalisationService } from '../../services/localisation';
import { UserService } from '../../services/user';

@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})

export class IntroductionPage {
  @ViewChild(Slides) slides: Slides;
  configuration = this.localeService.localise('configuration');
  userName = this.localeService.localise('userName');
  confInfoMessage1 = this.localeService.localise('confInfoMessage1');
  confInfoMessage2 = this.localeService.localise('confInfoMessage2');
  userProfileForm: FormGroup;

  constructor(private navCrtl: NavController,
              private localeService: LocalisationService,
              private userService: UserService,
              public formBuilder: FormBuilder) {

    this.userProfileForm = formBuilder.group({
      userName: ['', Validators.compose([Validators.minLength(4), Validators.required])]
    });
  }

  ionViewDidLoad() {
    this.slides.freeMode = true;
    this.slides.lockSwipes(true);
  }

  goToNextSlide() {
    this.userService.updateUserName(
      this.userProfileForm.value.userName)
        .then(() => { this.slides.slideNext(); })
        .catch((error) => { console.log(error); });
  }

  finish() {
    this.navCrtl.setRoot(HomePage);
  }
}
