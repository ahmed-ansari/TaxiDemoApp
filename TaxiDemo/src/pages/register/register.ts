import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MobileAuthPage } from '../mobileauth/mobileauth'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private register : FormGroup;
  mobileNo: any = "";
  constructor( private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.mobileNo = navParams.get("mobile");
  }
  ngOnInit () {
    this.register = this.formBuilder.group({

      firstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email : ['',this.validatorsEmail()],
      password: ['',Validators.required],
      mobile: [this.mobileNo]
    });
  }

    private validatorsMobile() {
        return Validators.compose([Validators.required, Validators.maxLength(10)] );
    }

    private validatorsEmail() {
      return Validators.compose([ Validators.required,Validators.email])
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    console.log(this.register)
  }

  logForm(){
    console.log(this.register.value)
    this.navCtrl.push(MobileAuthPage)
  }



}
