import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage'

import { StaticMapAPI } from './static.map';
import { HistoryService } from './history.service';
import {UserModel} from '../welcome/user.model';
import {RideModel} from '../payment/ride.model';

@Component({
    selector: 'page-history',
    templateUrl: 'history.html'
})
export class HistoryPage {
    arrData = []
    Trips: string
    staticMap: any;
    public user: UserModel;
    userId: any;
    public ride: RideModel;
    public rides: RideModel[] = [];
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
              console.log("Value:::" + ridesData[keys[key]]);
              let model = ridesData[keys[key]].rideModel;
              let staticMap = ridesData[keys[key]].staticMap;
              //BIND
              //this.locations.push(location);
            }
          }).catch((er) => {
            console.log(er);
          });
    }


}