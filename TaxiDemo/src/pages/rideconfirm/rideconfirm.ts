import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import {DashboardPage} from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-rideconfirm',
  templateUrl: 'rideconfirm.html',
})
export class RideconfirmPage {

  destination:string;
  travelDate:string;
  fareValue:string;
  distance: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.destination = this.navParams.get("destination")
    this.fareValue = this.navParams.get("fare")
    this.travelDate = this.navParams.get("date")
    this.distance = this.navParams.get("distance");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RideconfirmPage');
  }

  dismissModal() {
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(DashboardPage);
  }

  gotoHome(){

  }

}
