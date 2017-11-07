import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
  userObj: any;
  public verification_code = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.mobileNo = navParams.get("mobile");
    this.userObj = navParams.get("user");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobileauthPage');
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.sendVerificationCode();
  }

  sendVerificationCode() {
    // this.navCtrl.push(HomePage)
    //this.navCtrl.setRoot(HomePage)
    //var navController = this.navCtrl;
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+91" + this.mobileNo;

    console.log("Phone:" + phoneNumberString + "appVerifier:" + appVerifier);

    //firebase.auth().p
    // (<any>window).FirebasePlugin.verifyPhoneNumber(phoneNumberString, 60, cred => {
    //   var credentials = firebase.auth.PhoneAuthProvider.credential(this.verification_code, this.authcode);
    //   firebase.auth().signInWithCredential(credentials).then((snap) => {
    //     console.log(snap);
    //   }, error => {
    //     console.error("SMS not sent", error);
    //   });
    // });

    // (<any>window).FirebasePlugin.getVerificationID(phoneNumberString, id => {
    //   this.verification_code = id;
    //   console.log("Verification;" + id);
    // }, error => {
    //   console.error("SMS not sent", error);
    // });

    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then(confirmationResult => {
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
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.confirmResult.confirm(this.authcode)
        .then(function (result) {
          // User signed in successfully.
          console.log(result.user);
          navController.setRoot(DashboardPage);
          loading.dismiss();

        }).catch(function (error) {
          // User couldn't sign in (bad verification code?)
          // ...
          loading.dismiss();
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

  change(e: any) {
    console.log(e)

    // e.preventDefault();
    let control: any;
    control = e.srcElement.nextElementSibling;
    if (e.srcElement.nextElementSibling) {
      e.srcElement.nextElementSibling.focus();
    }
    else {
      console.log('close keyboard');
    }
    return;

  }
}
