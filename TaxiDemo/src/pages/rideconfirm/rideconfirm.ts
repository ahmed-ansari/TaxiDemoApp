import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-rideconfirm',
  templateUrl: 'rideconfirm.html',
})
export class RideconfirmPage {

  destination:string;
  travelDate:string;
  fareValue:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.destination = this.navParams.get("destination")
    this.fareValue = this.navParams.get("fare")
    this.travelDate = this.navParams.get("date")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RideconfirmPage');
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

}
