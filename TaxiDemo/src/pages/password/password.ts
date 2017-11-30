import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MobileAuthPage } from '../mobileauth/mobileauth';
import { DashboardPage } from '../dashboard/dashboard';
import firebase from 'firebase';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({ selector: 'page-password', templateUrl: 'password.html' })
export class PasswordPage {
  private login : FormGroup;
  password: any;
  userObject: any;
  mobile: any;

  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    // this.login.value.email = navParams.get("email");
    // this.mobile = navParams.get("mobile");
    console.log(navParams.get("email"))
  
  }
  ngOnInit () {
    this.login = this.formBuilder.group({
     
      email : [this.navParams.get("email"),this.validatorsEmail()],
      password: ['',Validators.required]
    });
    // this.login.value.email = "as"
  }

  private validatorsEmail() {
    return Validators.compose([ Validators.required,Validators.email])
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  goToDashboard() {
    //console.log(this.password+" === "+this.userObject.password);
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
