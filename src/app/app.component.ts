import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { SigninPage } from '../pages/signin/signin';
import { LogoutPage } from '../pages/logout/logout';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = HomePage;
  logoutPage = LogoutPage;
  @ViewChild('nav') nav : NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
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

  }
}

