import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register'
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
  password: any;
  mobile: any = "";
  
  hideMobile:Boolean = false
  hidePassword:Boolean = true

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.password = ""
    this.hideMobile = false
  }

  validateUser() {
    this.navCtrl.setRoot(HomePage)
    // return
    //  if (this.mobile !== undefined && this.mobile !== "") {

    //   if (this.password !== undefined && this.password !== "") {

    //     this.navCtrl.push(HomePage)
    //   }
     
    // }

    


    // if (this.mobile !== undefined && this.mobile !== "") {

    //   if (this.password !== undefined && this.password !== "") {
    //     this.navCtrl.push(RegisterPage)
    //   }
    //   this.hideMobile = true
    //   this.hidePassword =  !this.hidePassword
    // }

    

    // if (this.mobile !== undefined && this.mobile !== "" && this)
  }

  goToRegisterPage() {
    console.log("going register");
    this.navCtrl.push(RegisterPage)
  }


}
