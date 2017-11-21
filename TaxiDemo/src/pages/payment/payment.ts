import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Environment } from './environment';
import { PaymentService } from './payment.service';

//@IonicPage()
@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html',
})

export class PaymentPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private pService: PaymentService){

    }

    ionViewDidLoad() {  
    }

    payment(){
    }
}



