import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import firebase from 'firebase';
import { Broadcaster } from './Broadcaster';

@Injectable()
export class RideService {

    constructor(private boradcaster: Broadcaster) {

    }

    subscribeForRideRequests(userId) {
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/CancelledRideRequests/'+userId);
        const rideConfirmReqRef: firebase.database.Reference = firebase.database().ref('/ConfirmRideRequests/'+userId);
        rideReqRef.on('value', (data) => {
            this.boradcaster.broadcast("cancel", data);
        });

        rideConfirmReqRef.on('value', (data) => {
            this.boradcaster.broadcast("confirm", data);
        });
    }

    unSubscribeForRideRequests(userId) {
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/CancelledRideRequests/'+userId);
        rideReqRef.off('value');
    }

}