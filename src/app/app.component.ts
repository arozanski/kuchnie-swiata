import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { SigninPage } from '../pages/signin/signin';
import { LocalisationService } from '../services/localisation';
import { HomePage } from '../pages/home/home';
import { UserProfilePage } from '../pages/user-profile/user-profile';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  homePage = HomePage;
  userProfilePage = UserProfilePage;
  @ViewChild('nav') nav : NavController;
  recipies = this.localeService.localise('recipies');
  logout = this.localeService.localise('logout');
  settings = this.localeService.localise('settings');

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private localeService: LocalisationService) {
    firebase.initializeApp({
      apiKey: "AIzaSyBJbAuQlURymOMCqXr_ShtnzYrl8AdlBZA",
      authDomain: "kuchnie-swiata.firebaseapp.com",
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngAfterViewInit() {
    this.nav.push(SigninPage);
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    let self = this;

    firebase.auth().signOut().then(function() {
      self.onLoad(SigninPage);
    }).catch(function(error) {
      console.log(error)
    });
  }
}

