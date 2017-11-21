import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()

export class PaymentService{

    constructor() {
    }

    processPayment(token: any, amount, userId){
        const payment = {token, amount};
        const paymentRef: firebase.database.Reference = firebase.database().ref(`/Payments/`);
        return paymentRef.child(userId).push(payment);
    }

}