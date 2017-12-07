import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import firebase from 'firebase';
import { Broadcaster } from './Broadcaster';

@Injectable()
export class RideService {

    constructor(private boradcaster: Broadcaster) {

    }

    subscribeForRideRequests() {
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/CancelledRequests/');
        rideReqRef.on('value', (data) => {
            this.boradcaster.broadcast("cancel", data);
        });
    }

    unSubscribeForRideRequests() {
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/CancelledRequests/');
        rideReqRef.off('value');
    }

}