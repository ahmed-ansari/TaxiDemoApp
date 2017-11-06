import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

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
  //database: database.Database;

  hideMobile: Boolean = false;
  isHidden: Boolean = true;

  public myPerson = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: AngularFireDatabase) {
    //this.database = app.database();    
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
    //this.navCtrl.push(MobileAuthPage, { mobile: this.mobile });
    const personRef: firebase.database.Reference = firebase.database().ref(`/Users/`+this.mobile);
    personRef.on('value', personSnapshot => {
      this.myPerson = personSnapshot.val();
      //console.log(this.myPerson);
      if(!this.myPerson){
        this.navCtrl.push(RegisterPage, { mobile: this.mobile });
      }else{
        this.navCtrl.push(MobileAuthPage, { mobile: this.mobile });
      }
    });
  }

}
