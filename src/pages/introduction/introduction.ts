import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, Platform } from 'ionic-angular';
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
  userNameLabel = this.localeService.localise('userName');
  userNameInvalid = this.localeService.localise('userNameInvalid');
  confInfoMessage1 = this.localeService.localise('confInfoMessage1');
  confInfoMessage2 = this.localeService.localise('confInfoMessage2');
  confInfoMessage3 = this.localeService.localise('confInfoMessage3');
  confInfoMessage4 = this.localeService.localise('confInfoMessage4');
  next = this.localeService.localise('next');
  finish = this.localeService.localise('finish');
  close = this.localeService.localise('close');
  userProfileForm: FormGroup;
  unregisterBackButtonAction: any;
  userName = '';

  constructor(private navCrtl: NavController,
              private localeService: LocalisationService,
              private userService: UserService,
              public formBuilder: FormBuilder,
              public platform: Platform) {

    this.userProfileForm = formBuilder.group({
      userName: ['', Validators.compose([Validators.minLength(4), Validators.required])]
    });
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.slides.lockSwipes(true);
  }

  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  public initializeBackButtonCustomHandler() {
    this.unregisterBackButtonAction =
      this.platform.registerBackButtonAction(() => {}, 10);
  }

  isKeyboardVisible() {
    let keyboard = (<any>window).Keyboard;
    return keyboard ? keyboard.isVisible : false;
  }

  onKeydown(event) {
    if (event.keyCode === 13) {
      let activeElement = <HTMLElement>document.activeElement;

      activeElement && activeElement.blur && activeElement.blur();
    }
  }

  goToSlide(slide: number) {
    switch(slide) {
      case 2: {
        this.userName = this.userProfileForm.value.userName;

        this.userService.updateUserName(this.userName)
          .then(() => {
            this.goToNextSlide();
          })
          .catch((error) => { console.log(error); });
        break;
      }
      case 3: {
        this.goToNextSlide();
        break;
      }
      default:;
    }
  }

  goToNextSlide() {
    let slides = this.slides;

    slides.lockSwipes(false);
    slides.slideNext();
    slides.lockSwipes(true);
  }

  finishConfiguration() {
    this.navCrtl.setRoot(HomePage);
  }
}
