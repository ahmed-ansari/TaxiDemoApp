import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import firebase from 'firebase';

@Injectable()
export class RideService {

    constructor() {

    }

    subscribeForRideRequests() {
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/RideRequests/');
        rideReqRef.on('child_added', (data) => {

        });
    }

    unSubscribeForRideRequests() {
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/RideRequests/');
        rideReqRef.off('child_added');
    }

}