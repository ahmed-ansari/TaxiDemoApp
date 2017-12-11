import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage'

import { StaticMapAPI } from './static.map';
import { HistoryService } from './history.service';
import { UserModel } from '../welcome/user.model';
import { RideModel } from '../payment/ride.model';
import { RidedetailPage } from '../ridedetail/ridedetail';

import { Broadcaster } from '../../providers/Broadcast';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  arrData = []
  Trips: string
  staticMap: string;
  public user: UserModel;
  userId: any;
  public ride: RideModel;
  public rides: RideModel[] = [];
  staticMapArray: string[] = [];

  constructor(public navCtrl: NavController, private map: StaticMapAPI, private service: HistoryService,
    private nativeStorage: NativeStorage, private broadcaster: Broadcaster, private alertCtrl: AlertController) {
    this.Trips = "Upcoming";
    this.user = new UserModel()
    this.nativeStorage.getItem('userData')
      .then(response => {
        let jsonObj = response;
        // this.user.userId = jsonObj.userId;
        this.user.email = jsonObj.email;
        // this.user.givenName = jsonObj.name;
        // this.user.displayName = jsonObj.displayName;
        // this.user.photoUrl = jsonObj.photoUrl;
        //this.locations =
        this.broadcaster.broadcast('user', {"user": jsonObj});
        this.getRideHistory();
      },
      error => console.error(error)
      );
    this.registerStringBroadcast();
  }

  getRideHistory() {
    let promise = this.service.getConfirmedRideRequests();
    promise.then((snapshot) => {
      let ridesData = snapshot.val();
      var keys = Object.keys(ridesData);
      console.log("User Rides" + JSON.stringify(snapshot.val()));
      console.log(keys);
      for (var key in keys) {
        console.log("Value:::", ridesData[keys[key]]);
        this.ride = ridesData[keys[key]].model;
        this.rides.push(this.ride)
        //this.staticMap = ridesData[keys[key]].staticMap;
        //this.staticMapArray.push(this.staticMap);
        //BIND
        //this.locations.push(location);
      }
      console.log("Rides:::", this.rides);
    }).catch((er) => {
      console.log(er);
    });
  }

  goToRideDetail(index) {
    console.log("going..", index)
    this.ride = this.rides[index]

    console.log("ride", this.ride)
    //let map = this
    this.navCtrl.push(RidedetailPage, { params: this.ride, map: this.staticMap })
  }

  registerStringBroadcast() {
    this.broadcaster.on<any>('RideRequests')
      .subscribe(rideRequest => {
        console.log("Received Request:::", rideRequest);
        this.rideConfirm(rideRequest);
      });
  }

  rideConfirm(rideRequest) {
    let scope = this;
    let alert = this.alertCtrl.create({
      title: 'Ride Request',
      message: 'Do you want to accept this ride?',
      buttons: [
        {
          text: 'Deny',
          role: 'cancel',
          handler: () => {
            console.log('Denied');
            scope.service.updateRideStatus(false, rideRequest);
          }
        },
        {
          text: 'Accept',
          handler: () => {
            console.log('Accepted');
            scope.service.updateRideStatus(true, rideRequest);
          }
        }
      ]
    });
    alert.present();
  }

}
