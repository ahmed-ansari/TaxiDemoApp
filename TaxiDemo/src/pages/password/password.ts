import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MobileAuthPage} from '../mobileauth/mobileauth';
import {HomePage} from '../home/home';

@IonicPage()
@Component({selector: 'page-password', templateUrl: 'password.html'})
export class PasswordPage {

  constructor(public navCtrl : NavController, public navParams : NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

goToDashboard() {

}

goToMobileAuth() {
  this.navCtrl.push(MobileAuthPage);
}
}
