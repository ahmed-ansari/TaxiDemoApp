import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { HistoryPage } from '../pages/history/history';
import { ListPage } from '../pages/list/list';

import { WelcomePage } from '../pages/welcome/welcome';
import { SettingPage } from '../pages/setting/setting';
import { RegisterPage } from '../pages/register/register';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { EditAccountPage } from '../pages/edit-account/edit-account';
import { PaymentPage } from '../pages/payment/payment';

import { MobileAuthPage } from '../pages/mobileauth/mobileauth';
import { Broadcaster } from '../providers/Broadcaster';
import { UserModel } from '../pages/welcome/user.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  pages: Array<{ title: string, component: any }>;

  userName: string;
  profileUrl: string;

  constructor(public platform: Platform, public statusBar: StatusBar, private toastCtrl: ToastController
    ,public splashScreen: SplashScreen, private nativeStorage: NativeStorage, events: Events,
    private broadcaster: Broadcaster, private userModel: UserModel, private alertCtrl: AlertController) {
    this.initializeApp();
    this.userName = "User";

    this.registerUserBroadcast();
    this.nativeStorage.getItem("isLoggedIn").then((response => {
      console.log(response);
      if (response) {
        this.rootPage = DashboardPage;
      } else {
        this.rootPage = WelcomePage;
      }
    }),
      error => { });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Ride', component: DashboardPage },
      { title: 'My Trips', component: HistoryPage },
      { title: 'Settings', component: SettingPage }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      var lastTimeBackPress = 0;
      var timePeriodToExit  = 2000;

      this.platform.registerBackButtonAction(() => {
          // get current active page
          let view = this.nav.getActive();
          console.log("View Name::", view.component.name);
          if (view.component.name === "DashboardPage") {
              //Double check to exit app
              if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                  this.platform.exitApp(); //Exit from app
              } else {
                  let toast = this.toastCtrl.create({
                      message:  'Press back again to exit App?',
                      duration: 3000,
                      position: 'bottom'
                  });
                  toast.present();
                  lastTimeBackPress = new Date().getTime();
              }
          } 
          else {
              // go to previous page
              this.nav.popToRoot({});
          }
      });

    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nativeStorage.setItem("isLoggedIn", false).then(() => { },
      error => { });
    this.nav.setRoot(WelcomePage);
  }

  registerUserBroadcast() {
    this.broadcaster.on<UserModel>('UserData')
      .subscribe(user => {
        this.userName = user.displayName;
        this.profileUrl = user.photoUrl;
      });
  }
}
