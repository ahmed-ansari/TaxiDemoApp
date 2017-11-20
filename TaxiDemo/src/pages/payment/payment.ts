import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html',
})

export class PaymentPage {

    constructor(public navCtrl: NavController, public navParams: NavParams){

    }

    ionViewDidLoad() {
        var str = Stripe('pk_test_EqWpqEvmBm7YRhyNzEuHLqfE');
        var paymentRequest = str.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: 'Demo total',
                amount: 1000,
            },
        });
    }

}



