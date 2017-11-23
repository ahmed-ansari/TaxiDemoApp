import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  pages: Array<{ title: string, component: any }>;

  userName: string;
  profileUrl: string;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private nativeStorage: NativeStorage, events: Events) {
    this.initializeApp();
    this.userName = "User";
    this.nativeStorage.getItem("isLoggedIn").then((response => {
      console.log(response);
      if (response) {
        this.rootPage = DashboardPage;
      } else {
        this.rootPage = WelcomePage;
      }

      events.subscribe('user:logged', user => {
        console.log(user);
        if (user !== undefined && user !== "") {
          this.userName = user;
        }
      })
      events.subscribe('user:logged:url', photoUrl => {
        console.log(photoUrl);
        this.profileUrl = photoUrl;
      })
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nativeStorage.setItem("isLoggedIn", false).then(() => {},
    error => {});
    this.nav.setRoot(WelcomePage);
  }
}
