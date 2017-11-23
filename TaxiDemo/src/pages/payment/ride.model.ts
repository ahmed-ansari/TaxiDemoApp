//import { NgModule } from '@angular/core';

// @NgModule({

// })

export class RideModel {

    dropoffAddress: string;
    pickupAddress: string;
    fareValue: any;
    distance: any;
    travelTime: any;
    driverName: string;
    taxiName: string;
    userId: any;

    constructor(pick, drop, fare, dist, time, driver, number, userId) { 
        this.pickupAddress = pick;
        this.dropoffAddress = drop;
        this.fareValue = fare;
        this.distance = dist;
        this.travelTime = time;
        this.driverName = driver;
        this.taxiName = number;
        this.userId = userId;
    }


}