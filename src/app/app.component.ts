import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { SigninPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home';
import { UserProfilePage } from '../pages/user-profile/user-profile';

import { LocalisationService } from '../services/localisation';
import { AuthService } from '../services/auth';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  homePage = HomePage;
  userProfilePage = UserProfilePage;
  @ViewChild('nav') nav : NavController;
  recipies = '';
  logout = '';
  settings = '';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public events: Events,
              private menuCtrl: MenuController,
              private localeService: LocalisationService,
              private authService: AuthService) {
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

    events.subscribe('locales:update', () => { this.refreshLocales() });
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

    this.authService.logout(() => {
      self.onLoad(SigninPage);
    });
  }

  refreshLocales() {
    this.recipies = this.localeService.localise('recipies');
    this.logout = this.localeService.localise('logout');
    this.settings = this.localeService.localise('settings');
  }
}

