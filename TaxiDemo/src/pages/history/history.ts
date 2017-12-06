import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage'

import { StaticMapAPI } from './static.map';
import { HistoryService } from './history.service';
import {UserModel} from '../welcome/user.model';
import {RideModel} from '../payment/ride.model';
import {RidedetailPage} from '../ridedetail/ridedetail';


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
    public upcomingRides: RideModel[] = [];
    staticMapArray: string[] = [];

    constructor(public navCtrl: NavController, private map: StaticMapAPI, private service: HistoryService,
        private nativeStorage:NativeStorage) {
        this.Trips = "Past";
        this.user = new UserModel()
        this.nativeStorage.getItem('userData')
          .then(response => {
            let jsonObj = JSON.parse(response);
            this.user.userId = jsonObj.userId;
            this.user.email = jsonObj.email;
            this.user.givenName = jsonObj.name;
            this.user.displayName = jsonObj.displayName;
            this.user.photoUrl = jsonObj.photoUrl;
            //this.locations =
            this.getRideHistory(jsonObj.userId);
            this.getUpcomingRides(jsonObj.userId);
          },
          error => console.error(error)
          );
    }

    getRideHistory(userId){
        let promise = this.service.getUserHistory(userId);
        promise.then((snapshot) => {
            let ridesData = snapshot.val();
            var keys = Object.keys(ridesData);
            console.log("User Rides" + JSON.stringify(snapshot.val()));
            console.log(keys);
            for (var key in keys) {
              console.log("Value:::" , ridesData[keys[key]]);
              this.ride = ridesData[keys[key]].rideModel;
              this.rides.push(this.ride)
              this.staticMap = ridesData[keys[key]].staticMap;
              this.staticMapArray.push(this.staticMap);
              //BIND
              //this.locations.push(location);
            }
          console.log("Rides:::", this.rides);
          }).catch((er) => {
            console.log(er);
          });
    }

    goToRideDetailFromPast(index) {
      console.log("going..",index)
      this.ride = this.rides[index]

      console.log("ride",this.ride)
      this.navCtrl.push(RidedetailPage, {params:this.ride, map:this.staticMap, isUpcoming: false})
    }

  goToRideDetailFromUpcoming(index){
    console.log("going..", index)
    this.ride = this.rides[index]

    console.log("ride", this.ride)
    this.navCtrl.push(RidedetailPage, { params: this.ride, map: this.staticMap, isUpcoming: true })
}
    getUpcomingRides(userId){
      let promise = this.service.getUpcomingRides(userId);
      promise.then((snapshot) => {
          let ridesData = snapshot.val();
          var keys = Object.keys(ridesData);
          console.log("User Upcoming Rides" + JSON.stringify(snapshot.val()));
          console.log(keys);
          for (var key in keys) {
            console.log("Value:::" , ridesData[keys[key]]);
            this.ride = ridesData[keys[key]].rideModel;
            let status = ridesData[keys[key]].rideStatus;
            if(status)this.upcomingRides.push(this.ride);
          }
        console.log("Rides:::", this.rides);
        }).catch((er) => {
          console.log(er);
        });
    }

}

// export class RideModel {
//   date : Date;
//   userId : string;
//   taxiName : string;
//   fareValue : string;

//   constructor(userInfo : any) {
//     this.date = userInfo.date
//     this.userId = userInfo.userId
//     this.taxiName = userInfo.taxiName
//     this.fareValue = userInfo.fareValue
//   }
// }
