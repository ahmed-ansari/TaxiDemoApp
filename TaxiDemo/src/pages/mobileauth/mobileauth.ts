import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import  firebase from 'firebase';

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
    //this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  validateCode() {
    // this.navCtrl.push(HomePage)
    //this.navCtrl.setRoot(HomePage)
    // const appVerifier = this.recaptchaVerifier;
    // const phoneNumberString = "+" + "9966990732";
    // firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
    //   .then( confirmationResult => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     let prompt = this.alertCtrl.create({
    //     title: 'Enter the Confirmation code',
    //     inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
    //     buttons: [
    //       { text: 'Cancel',
    //         handler: data => { console.log('Cancel clicked'); }
    //       },
    //       { text: 'Send',
    //         handler: data => {
    //           confirmationResult.confirm(data.confirmationCode)
    //           .then(function (result) {
    //             // User signed in successfully.
    //             console.log(result.user);
    //             // ...
    //           }).catch(function (error) {
    //             // User couldn't sign in (bad verification code?)
    //             // ...
    //           });
    //         }
    //       }
    //     ]
    //   });
    //   prompt.present();
    // })
    // .catch(function (error) {
    //   console.error("SMS not sent", error);
    // });
  }
  
  validateOTP(value) {
    if(this.authcode.length == 4) {
      
      // this.navCtrl.setRoot(HomePage);
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
