import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, MenuController, AlertController } from 'ionic-angular';
import firebase from 'firebase';


import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { VehicledetailsPage } from '../vehicledetails/vehicledetails';
import { MobileAuthPage } from '../mobileauth/mobileauth';
import { WelcomeService } from './welcome.service';
import { DashboardPage } from '../dashboard/dashboard';
import { PasswordPage } from '../password/password';
import { UserModel } from './user.model';
import { RideService } from '../../providers/RideService';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  private login : FormGroup;

  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams, private service: WelcomeService,
    public loadingCtrl: LoadingController, private menu: MenuController, private rideService: RideService,
    private alertCtrl: AlertController) {

      this.menu.swipeEnable(false)
      this.rideService.subscribeForRideRequests();
  }

  ngOnInit () {
    this.login = this.formBuilder.group({

      email : ['',this.validatorsEmail()]
    });
  }

  private validatorsEmail() {
    return Validators.compose([ Validators.required,Validators.email])
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    console.log(this.login)
  }

  validateUser() {
    //this.navCtrl.setRoot(HomePage);
    var navController = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let encodedEmail = this.service.encodeEmail(this.login.value.email)
    let promise = this.service.validateUser(encodedEmail)

    promise.then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        loading.dismiss();
        this.navCtrl.push(PasswordPage, { email: this.login.value.email , object: snapshot.val()})
      } else {
        console.log("No User found");
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Login',
          subTitle: 'Please contact admin for your account access.',
          buttons: ['Ok']
        });
        alert.present();
        //this.navCtrl.push(VehicledetailsPage, { email: this.login.value.email })
      }
    }).catch((er) => {
      loading.dismiss();
      console.log(er);
    });
  }

  logForm(){
    console.log(this.login.value)
    this.login.controls['email'].markAsTouched()
    if (!this.login.invalid && this.login.status == "VALID") {
      this.validateUser();
      //this.navCtrl.push(RegisterPage)
    }
  }

  goToAuthPage() {
    //this.navCtrl.push(DashboardPage);
    var navController = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
  }



}
