import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Globalization } from '@ionic-native/globalization';
import { Camera } from '@ionic-native/camera';

import { LocalisationService } from '../services/localisation';
import { AuthService } from '../services/auth';
import { CategoryService } from '../services/category';
import { UserService } from '../services/user';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { LanguagesPage } from '../pages/languages/languages';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { IntroductionPage } from '../pages/introduction/introduction';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetPasswordPage,
    LanguagesPage,
    UserProfilePage,
    IntroductionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ResetPasswordPage,
    LanguagesPage,
    UserProfilePage,
    IntroductionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalisationService,
    Globalization,
    Camera,
    AuthService,
    CategoryService,
    UserService
  ]
})
export class AppModule {}
