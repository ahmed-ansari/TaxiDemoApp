import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
/**
 * Generated class for the MobileauthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mobileauth',
  templateUrl: 'mobileauth.html',
})

export class MobileAuthPage {

  mobileNo:any ="";
  authcode:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mobileNo = navParams.get("mobile");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobileauthPage');
  }

  validateOTP(value) {
    if(this.authcode.length == 4) {
      
      this.navCtrl.setRoot(HomePage);
    }
  }

}
