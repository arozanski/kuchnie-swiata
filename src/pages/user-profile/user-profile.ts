import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { storage } from 'firebase';

import { LocalisationService } from '../../services/localisation';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage implements OnInit {
  @ViewChild('userNameInput') myInput;
  userProfileForm : FormGroup;
  settings = this.localeService.localise('settings');
  save = this.localeService.localise('save');
  userNameLabel = this.localeService.localise('userName');
  userNameInvalid = this.localeService.localise('userNameInvalid');
  avatarChange = this.localeService.localise('avatarChange');
  saveSucess = this.localeService.localise('saveSucess');
  avatarUrl = 'avatars/7.png';
  avatars = this.setAvatars();
  user = null;
  userName = '';
  disabled = true;

  constructor(private localeService: LocalisationService,
              private authService: AuthService,
              private userService: UserService,
              private camera: Camera,
              public toastCtrl: ToastController) {

    this.userProfileForm = new FormGroup({
      userName: new FormControl({
          value : '',
          disabled : true
        }, Validators.compose([Validators.minLength(4), Validators.required]))
    });
  }

  ngOnInit() {
    this.user = this.authService.getActiveUser();
    this.userProfileForm.controls['userName'].setValue(this.user.displayName);
    this.avatarUrl = this.user.photoURL;
  }

  enable() {
    this.userProfileForm.controls.userName.enable();
    // this is hack as there is no proper solution available to focus on input
    const input:any = document.querySelector('input[formcontrolname=userName]');
    input.disabled = false;
    input.focus();
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

  setAvatarUrl(imageRef: string) {
    storage().ref(imageRef).getDownloadURL()
      .then((url) => {
        this.avatarUrl = url;
        this.saveChanges('');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveChanges(name: string) {
    this.userService.updateUserName({
        displayName: this.userProfileForm.value.userName,
        photoURL: this.avatarUrl
      })
      .then(() => {
        let message = name === 'name' ? this.saveSucess : this.avatarChange;
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      })
      .catch((error) => { console.log(error); });
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
}
