import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import firebase from 'firebase';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { DatePicker, DatePickerOptions } from '@ionic-native/date-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';


import { MyApp } from './app.component';
import { HistoryPage } from '../pages/history/history';
import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MobileAuthPage } from '../pages/mobileauth/mobileauth';
import { SettingPage } from '../pages/setting/setting';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { PasswordPage } from '../pages/password/password';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { EditAccountPage } from '../pages/edit-account/edit-account';
import { PaymentPage } from '../pages/payment/payment';

import { WelcomeService } from '../pages/welcome/welcome.service';
import { RegisterService } from '../pages/register/register.service';
import { UserModel } from '../pages/welcome/user.model';
import { SettingService } from '../pages/setting/setting.service';
import { PaymentService } from '../pages/payment/payment.service';
import { StaticMapAPI } from '../pages/history/static.map';
import { HistoryService } from '../pages/history/history.service';
import { RidedetailPage } from '../pages/ridedetail/ridedetail';
import { VehicledetailsPage } from '../pages/vehicledetails/vehicledetails';
import { HomePage } from '../pages/home/home';

import {SetFarePage} from '../pages/set-fare/set-fare';
import { RideService } from '../providers/RideService';
import { Broadcaster } from '../providers/Broadcast';
import { Constants } from '../app/app.constants';

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
    HistoryPage,
    ListPage,
    WelcomePage,
    LoginPage,
    RegisterPage,
    MobileAuthPage,
    SettingPage,
    DashboardPage,
    PasswordPage,
    AutocompletePage,
    EditAccountPage,
    PaymentPage,
    RidedetailPage,
    VehicledetailsPage,
    HomePage,
    SetFarePage
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HistoryPage,
    ListPage,
    WelcomePage,
    LoginPage,
    RegisterPage,
    MobileAuthPage,
    SettingPage,
    DashboardPage,
    PasswordPage,
    AutocompletePage,
    EditAccountPage,
    PaymentPage,
    RidedetailPage,
    VehicledetailsPage,
    HomePage,
    SetFarePage
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
    Facebook,
    GooglePlus,
    UserModel,
    NativeStorage,
    SettingService,
    PaymentService,
    DatePicker,
    LocalNotifications,
    StaticMapAPI,
    HistoryService,
    Camera,
    RideService,
    Broadcaster,
    LaunchNavigator,
    Constants
  ]
})
export class AppModule { }
