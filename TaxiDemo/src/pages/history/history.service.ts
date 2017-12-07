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
        if(status){            
            rideReqRef.update({
                "rideStatus": status
              });
        }else{           
            rideReqRef.remove();
        }
        
        const rideReqCancelRef: firebase.database.Reference = firebase.database().ref('/CancelledRideRequests/'+rideRequest.parent);
        rideReqCancelRef.set({
            "ride": "cancel"
        });
    }
}