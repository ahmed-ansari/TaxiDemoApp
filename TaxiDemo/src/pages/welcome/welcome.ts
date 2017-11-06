import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { MobileAuthPage } from '../mobileauth/mobileauth';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  mobile: any = "";
  
  hideMobile:Boolean = false;
  isHidden:Boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  validateMobile(value){
     if (this.mobile.length == 10) {
       this.isHidden = false;
     } else {
       this.isHidden = true;
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.hideMobile = false;
  }

  validateUser() {
    this.navCtrl.setRoot(HomePage);
  }

  goToRegisterPage() {
    console.log("going register");
    this.navCtrl.push(RegisterPage)
  }

  goToAuthPage() {
    this.navCtrl.push(MobileAuthPage,{mobile: this.mobile});
  }

}
