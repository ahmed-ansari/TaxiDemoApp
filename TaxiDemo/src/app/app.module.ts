import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MobileauthPage } from '../pages/mobileauth/mobileauth';
import { SettingPage } from '../pages/setting/setting';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const firebaseAuth = {
  apiKey: "AIzaSyCO42BxmWnDpkATYBkYqpWDEzr8OkHRBmo",
  authDomain: "taxiapp-8e144.firebaseapp.com",
  databaseURL: "https://taxiapp-8e144.firebaseio.com",
  projectId: "taxiapp-8e144",
  storageBucket: "taxiapp-8e144.appspot.com",
  messagingSenderId: "108631532738"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,

    WelcomePage,
    LoginPage,
    RegisterPage,
    MobileauthPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    MobileauthPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
