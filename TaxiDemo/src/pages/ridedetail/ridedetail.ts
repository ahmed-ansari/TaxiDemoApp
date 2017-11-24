import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RideModel} from '../payment/ride.model';
/**
 * Generated class for the RidedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  }

  ionViewDidLoad() {
  this.ride = this.navParams.get("params");
  console.log("ride", this.ride);
  this.staticMap = this.navParams.get("map");
    console.log('ionViewDidLoad RidedetailPage');
  }

}
