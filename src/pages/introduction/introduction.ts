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
  userName = this.localeService.localise('userName');
  confInfoMessage1 = this.localeService.localise('confInfoMessage1');
  confInfoMessage2 = this.localeService.localise('confInfoMessage2');
  userProfileForm: FormGroup;
  unregisterBackButtonAction: any;

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
        this.userService.updateUserName(
          this.userProfileForm.value.userName)
            .then(() => {
              this.slides.lockSwipes(false);
              this.slides.slideNext();
              this.slides.lockSwipes(true);
            })
            .catch((error) => { console.log(error); });
        break;
      }
      case 3: {
        console.log('case 3');
        break;
      }
      default:;
    }
  }

  goToSlide3() {
    this.slides.slideNext();
  }

  finish() {
    this.navCrtl.setRoot(HomePage);
  }
}
