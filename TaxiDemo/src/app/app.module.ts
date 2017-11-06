import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import firebase from 'firebase';
import {GoogleMaps, Geocoder} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {WelcomePage} from '../pages/welcome/welcome';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {MobileAuthPage} from '../pages/mobileauth/mobileauth';
import {SettingPage} from '../pages/setting/setting';
import {DashboardPage} from '../pages/dashboard/dashboard';
import {PasswordPage} from '../pages/password/password';

import {WelcomeService} from '../pages/welcome/welcome.service';
import {RegisterService} from '../pages/register/register.service';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

const firebaseAuth = {
  apiKey: "AIzaSyCO42BxmWnDpkATYBkYqpWDEzr8OkHRBmo",
  authDomain: "taxiapp-8e144.firebaseapp.com",
  databaseURL: "https://taxiapp-8e144.firebaseio.com",
  projectId: "taxiapp-8e144",
  storageBucket: "taxiapp-8e144.appspot.com",
  messagingSenderId: "108631532738"
};

firebase.initializeApp(firebaseAuth);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,

    WelcomePage,
    LoginPage,
    RegisterPage,
    MobileAuthPage,
    SettingPage,
    DashboardPage,
    PasswordPage
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,

    WelcomePage,
    LoginPage,
    RegisterPage,
    MobileAuthPage,
    SettingPage,
    DashboardPage,
    PasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    Geocoder,
    WelcomeService, 
    RegisterService,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
  ]
})
export class AppModule {}
