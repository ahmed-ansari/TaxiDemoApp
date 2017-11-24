import { Injectable } from '@angular/core';
import firebase from 'firebase';

import {RideModel} from './ride.model';

@Injectable()

export class PaymentService{

    constructor() {
    }

    processPayment(token: any, amount, userId, rideModel: RideModel, paymentStatus: boolean){
        const payment = {token, amount, paymentStatus, rideModel};
        const paymentRef: firebase.database.Reference = firebase.database().ref(`/Payments/`);
        return paymentRef.child(userId).push(payment);
    }

}