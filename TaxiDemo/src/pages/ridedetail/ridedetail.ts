import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {RideModel} from '../payment/ride.model';

@IonicPage()
@Component({
  selector: 'page-ridedetail',
  templateUrl: 'ridedetail.html',
})
export class RidedetailPage {
public ride : RideModel;
public staticMap: string;
public isUpcoming: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('params',this.navParams)
    this.staticMap = this.navParams.get("map");
    this.ride = this.navParams.get("params");
    this.isUpcoming = this.navParams.get("isUpcoming");
  }

  ionViewDidLoad() {
    console.log("ride", this.ride);
    console.log('ionViewDidLoad RidedetailPage');
  }

  callDriver(phoneNumber) {
    window.location.href = "tel://" + phoneNumber;
  }

}
