import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';

import { DashboardPage } from '../dashboard/dashboard';
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
  windowRef: any;
  mobileNo: any = "";
  authcode: any = "";
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmResult: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.mobileNo = navParams.get("mobile");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobileauthPage');
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.sendVerificationCode();
  }

  sendVerificationCode() {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+91" + this.mobileNo;

    console.log("Phone:" + phoneNumberString + "appVerifier:" + appVerifier);

    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.confirmResult = confirmationResult;
      })
      .catch(function (error) {
        console.error("SMS not sent", error);
      });
  }

  validateOTP(value) {
    var navController = this.navCtrl;
    var alertController = this.alertCtrl;
    if (this.authcode.length === 6) {
      this.confirmResult.confirm(this.authcode)
        .then(function (result) {
          // User signed in successfully.
          console.log(result.user);
navController.setRoot(DashboardPage);
          // ...
        }).catch(function (error) {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error);
          let alert = alertController.create({
            title: 'OTP Authentication',
            subTitle: 'Invalid code',
            buttons: ['Dismiss']
          });
          alert.present();
        });
      //this.navCtrl.setRoot(HomePage);
    }


  }

  change(e:any)
  {
    console.log(e)

    // e.preventDefault();
    let control:any;
    control = e.srcElement.nextElementSibling;
    if (e.srcElement.nextElementSibling) {
      e.srcElement.nextElementSibling.focus();
  }
  else{
      console.log('close keyboard');
  }
  return;

  }
}
