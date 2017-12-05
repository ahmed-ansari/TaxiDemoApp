import { Injectable } from '@angular/core';
import firebase from 'firebase';

import {RideModel} from '../payment/ride.model';

@Injectable()

export class HistoryService{
    constructor(){

    }

    getUserHistory(userId){
        const rideHistory: firebase.database.Reference = firebase.database().ref(`/RideHistory/`+ userId);
        return rideHistory.once('value');
    }

    getUpcomingRides(userId){
        const upcomingRide: firebase.database.Reference = firebase.database().ref(`/RideRequests/`+userId);
        return upcomingRide.once('value');
    }
}