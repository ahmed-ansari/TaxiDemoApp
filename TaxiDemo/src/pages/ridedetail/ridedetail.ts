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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('params',this.navParams)
    this.staticMap = this.navParams.get("map");
    this.ride = this.navParams.get("params");
  }

  ionViewDidLoad() {
    console.log("ride", this.ride);
    console.log('ionViewDidLoad RidedetailPage');
  }

}
