import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MobileAuthPage } from '../mobileauth/mobileauth';
import { DashboardPage } from '../dashboard/dashboard';
import firebase from 'firebase';

@IonicPage()
@Component({ selector: 'page-password', templateUrl: 'password.html' })
export class PasswordPage {
  password: any;
  userObject: any;
  mobile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.userObject = navParams.get("user");
    this.mobile = navParams.get("mobile");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  goToDashboard() {
    if (this.password === this.userObject.password) {
      this.navCtrl.push(DashboardPage, {user: this.userObject});
    } else {
      let alert = this.alertCtrl.create({
        title: 'Password',
        subTitle: 'Invalid password',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  goToMobileAuth() {
    this.navCtrl.push(MobileAuthPage, {mobile: this.mobile});
  }
}
