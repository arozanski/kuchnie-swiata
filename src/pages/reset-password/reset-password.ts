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
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage implements OnInit {
  resetPwdTitle = this.localeService.localise('resetPwdTitle');
  resetPwdLbl = this.localeService.localise('resetPwdLbl');
  emailLbl = this.localeService.localise('email');
  resetPwdForm : FormGroup;

  constructor(private localeService: LocalisationService,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCrtl: AlertController,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  onReset(form: NgForm) {
    let loader = this.loadingCtrl.create({
      content : this.localeService.localise('resetProgress')
    });
    loader.present();

    this.authService.resetPassword(form.value.email)
      .then(() => {
        loader.dismiss();
        this.navCtrl.pop();
        form.resetForm();

        let toast = this.toastCtrl.create({
          message: this.localeService.localise('resetConfirmation'),
          duration: 3000,
          position: 'top'
        });

        toast.present();
      })
      .catch((error) => {
        loader.dismiss();
        const alert = this.alertCrtl.create({
          title: this.localeService.localise('resetError'),
          message : error.message,
          buttons : ['Ok']
        });
        alert.present();
      });
  }

  private initializeForm() {
    let email = null;

    this.resetPwdForm = new FormGroup({
      'email': new FormControl(email, Validators.required)
    });
  }
}
