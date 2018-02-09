import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import {
  LoadingController,
  AlertController,
  NavController,
  ToastController
} from "ionic-angular";

import { LocalisationService } from '../../services/localisation';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  signupForm : FormGroup;
  emailLbl = this.localeService.localise('email');
  passwordLbl = this.localeService.localise('password');
  signupLbl = this.localeService.localise('signup');
  signupTitle = this.localeService.localise('signupTitle');

  constructor(private localeService: LocalisationService,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCrtl: AlertController,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {}

  ngOnInit() {
    this.initializeForm();
  }

  onSignup(form: NgForm) {
    let value = form.value;
    const loader = this.loadingCtrl.create({
      content : this.localeService.localise('signupProgress')
    });

    loader.present();

    this.authService.signup(value.email, value.password)
      .then(() => {
        loader.dismiss();
        this.navCtrl.pop();

        let toast = this.toastCtrl.create({
          message: this.localeService.localise('signupConfirmation'),
          duration: 3000,
          position: 'top'
        });

        toast.present();
        form.resetForm();
        this.authService.firebase.currentUser.sendEmailVerification();
      })
      .catch(error => {
        loader.dismiss();
        const alert = this.alertCrtl.create({
          title: this.localeService.localise('signupError'),
          message : error.message,
          buttons : ['Ok']
        });
        alert.present();
      });
  }

  private initializeForm() {
    let email = null;
    let password = null;

    this.signupForm = new FormGroup({
      'email': new FormControl(email, Validators.required),
      'password': new FormControl(password, Validators.required)
    });
  }
}
