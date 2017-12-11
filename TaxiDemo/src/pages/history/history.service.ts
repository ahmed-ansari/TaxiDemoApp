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

    updateRideStatus(status, rideRequest){
        const rideReqRef: firebase.database.Reference = firebase.database().ref('/RideRequests/'+rideRequest.parent+"/"+rideRequest.child);
        console.log("RideRef::", rideReqRef);

        let response = rideReqRef.once('value');
        response.then((snapshot) => {
            let snap = snapshot.val();
            let rideModel = snap.rideModel;

            if(status){
                  const rideReqCancelRef: firebase.database.Reference = firebase.database().ref('/ConfirmRideRequests/');
                  rideReqCancelRef.push({
                      "ride": "confirm",
                      "model": rideModel
                  });
                  rideReqRef.remove();
            }else{
                const rideReqCancelRef: firebase.database.Reference = firebase.database().ref('/CancelledRideRequests/');
                rideReqCancelRef.push({
                    "ride": "cancel",
                    "model": rideModel
                });
                rideReqRef.remove();
            }
        });
    }

    getConfirmedRideRequests(){
        const rideHistory: firebase.database.Reference = firebase.database().ref(`/ConfirmRideRequests/`);
        return rideHistory.once('value');
    }
}
