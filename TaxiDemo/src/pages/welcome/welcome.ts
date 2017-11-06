import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { MobileAuthPage } from '../mobileauth/mobileauth';
import { WelcomeService } from './welcome.service';
import { DashboardPage } from '../dashboard/dashboard';

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
  hideMobile: Boolean = false;
  isHidden: Boolean = true;

  public userObj: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: WelcomeService,
        public loadingCtrl: LoadingController) {
  }

  validateMobile(value) {
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
    //this.navCtrl.setRoot(HomePage);
  }

  goToRegisterPage() {
    console.log("going register");
    this.navCtrl.push(RegisterPage)
  }

  goToAuthPage() {
    //this.navCtrl.push(DashboardPage);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var promise = this.service.validateUser(this.mobile);
    promise.then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        var userPromise = this.service.getUserObject(snapshot.val());
        userPromise.then((datasnap) => {
          console.log("User found" + JSON.stringify(datasnap.val()));
          loading.dismiss();
          this.navCtrl.push(MobileAuthPage, { mobile: this.mobile, user: datasnap });
        }).catch((er) => { 
           console.log(er);
        });
      } else {
        console.log("No User found");
        loading.dismiss();
        this.navCtrl.push(RegisterPage, { mobile: this.mobile });
      }
    }).catch((er) => {
      loading.dismiss();
      console.log(er);
    });
  }

}
