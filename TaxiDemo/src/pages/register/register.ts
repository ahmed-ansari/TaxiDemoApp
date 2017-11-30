import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MobileAuthPage } from '../mobileauth/mobileauth';
import { RegisterService } from '../register/register.service';
import { VehicledetailsPage } from '../vehicledetails/vehicledetails';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private register : FormGroup;

  constructor( private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams,
        private regService: RegisterService) {
    // this.mobileNo = navParams.get("mobile");
  }
  ngOnInit () {
    this.register = this.formBuilder.group({

      driverName: ['', Validators.required],
      driverLicense: ['', Validators.required],
      phone : ['',this.validatorsMobile()],
      address: ['',Validators.required]
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
    console.log(this.register)
    this.navCtrl.push(VehicledetailsPage,{register: this.register.value})
    
    if (!this.register.invalid && this.register.status == "VALID") {
      this.navCtrl.push(VehicledetailsPage,{register: this.register.value})
    }

    // this.navCtrl.push(VehicledetailsPage)
    // this.regService.registerUser(this.register.value);
    // this.navCtrl.push(MobileAuthPage, {mobile: this.register.value.mobile, user: this.register.value})
  }



}
