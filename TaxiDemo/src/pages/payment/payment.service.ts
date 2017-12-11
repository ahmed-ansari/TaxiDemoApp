import { Injectable } from '@angular/core';
import firebase from 'firebase';

import {RideModel} from './ride.model';

@Injectable()

export class PaymentService{

    constructor() {
    }

    processPayment(token: any, amount, userId, rideModel: RideModel, paymentStatus: boolean, staticMap: string){
        const payment = {token, paymentStatus, rideModel};
        const paymentRef: firebase.database.Reference = firebase.database().ref(`/Payments/`);
        let keyValueRef = paymentRef.child(userId).push(payment);
        console.log(keyValueRef.key);
        this.updateUserRides(amount, userId, rideModel, staticMap, paymentStatus, keyValueRef.key);
    }

    updateUserRides(amount, userId, rideModel: RideModel, staticMap: string, paymentStatus: boolean, paymentKey){
        const history = {paymentStatus, rideModel, staticMap, paymentKey};
        const historyRef: firebase.database.Reference = firebase.database().ref(`/RideHistory/`);
        return historyRef.child(userId).push(history);
    }

    updateConfirmRides(status, rideModel){

    }
}