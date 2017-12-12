import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RideModel } from '../payment/ride.model';
import { StaticMapAPI } from '../history/static.map';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import {WelcomeService} from '../welcome/welcome.service';
import {AppUser} from '../welcome/user.model';
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
  public ride: RideModel;
  public staticMap: string;
  user: AppUser = new AppUser();

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator,
      private welcome: WelcomeService) {
    console.log('params', this.navParams)

    this.ride = this.navParams.get("params");
    console.log("ride", this.ride);
    this.staticMap = this.navParams.get("map");
    console.log('ionViewDidLoad RidedetailPage');

    this.getUserDetails(this.ride.userId);

  }

  ionViewDidLoad() {

  }

  navigateToMaps() {

    let options: LaunchNavigatorOptions = {
      start: this.ride.pickupAddress
    };

    this.launchNavigator.navigate(this.ride.dropoffAddress, options).then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  getUserDetails(userId){

    let promise = this.welcome.validateUserWithuserId(userId);

    promise.then((snapShot) =>{
      console.log("Key Ref:::", snapShot.val());
      let userPomise = this.welcome.getAppUserDetails(snapShot.val());
      promise.then((data) =>{
        this.user = data.val();
        console.log("Ride Details User",data.val());
      }).catch((er) => {
        console.log(er);
      });

    }).catch((er) => {
      console.log(er);
    });

  }
}
