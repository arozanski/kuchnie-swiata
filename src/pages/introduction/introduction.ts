import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera, CameraOptions } from '@ionic-native/camera';

import { HomePage } from '../home/home';
import { storage } from 'firebase';

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
  confInfoMessage5 = this.localeService.localise('confInfoMessage5');
  next = this.localeService.localise('next');
  congratulations = this.localeService.localise('congratulations');
  finish = this.localeService.localise('finish');
  close = this.localeService.localise('close');
  userProfileForm: FormGroup;
  unregisterBackButtonAction: any;
  userName = '';
  avatarURL = this.setAvatarUrl('avatars/7.png');
  avatars = this.setAvatars();

  constructor(private navCrtl: NavController,
              private localeService: LocalisationService,
              private userService: UserService,
              private camera: Camera,
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
      case 1: {
        this.userName = this.userProfileForm.value.userName;
        this.goToNextSlide();
        break;
      }
      case 2: {
        this.userService.updateUserName({
          displayName: this.userName,
          photoURL: this.avatarURL
        }).then(() => {
            this.goToNextSlide();
          })
          .catch((error) => { console.log(error); });
        break;
      }
      case 3: {
        this.navCrtl.setRoot(HomePage);
        break
      }
      default:;
    }
  }

  takePhoto() {
    let uid = this.userService.getUID();
    let imageRef = `pictures/user_avatar_${uid}.jpeg`;

    try {
      const options: CameraOptions = {
        quality: 75,
        targetHeight: 200,
        targetWidth: 200,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        cameraDirection: 1
      };

      this.camera.getPicture(options)
        .then((result) => {
          const image = `data:image/jpeg;base64,${result}`;
          const pictures = storage().ref(imageRef);
          pictures.putString(image, 'data_url');
          this.setAvatarUrl(imageRef);
        });
    }
    catch (error) {
      console.log(error);
    }
  }

  setAvatarUrl(imageRef: string) {
    storage().ref(imageRef).getDownloadURL()
      .then((url) => {
        this.avatarURL = url;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setAvatars() {
    let array = [];

    for (let i = 6; i > 0; i--) {
      let ref = `avatars/${i}.png`;

      storage().ref(ref).getDownloadURL()
        .then((url) => {
          array.push({
            src: url,
            ref: ref });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return array;
  }

  goToNextSlide() {
    let slides = this.slides;

    slides.lockSwipes(false);
    slides.slideNext();
    slides.lockSwipes(true);
  }
}
