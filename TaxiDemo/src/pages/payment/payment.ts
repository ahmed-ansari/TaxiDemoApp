import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Environment } from './environment';
import { PaymentService } from './payment.service';
import { RideModel } from './ride.model';

declare var StripeCheckout: any;
//@IonicPage()
@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html',
})

export class PaymentPage {

    rideModel: RideModel;
    dropoffAddress: string;
    pickupAddress: string;
    fareValue: any;
    distance: any;
    travelTime: any;
    driverName: string;
    taxiNumber: string;
    userId: any;
    handler: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private pService: PaymentService,
        public alertCtrl: AlertController) {
        this.rideModel = navParams.get("model");
        this.dropoffAddress = this.rideModel.dropoffAddress;
        this.pickupAddress = this.rideModel.pickupAddress;
        this.fareValue = this.rideModel.fareValue;
        this.distance = this.rideModel.distance;
        this.travelTime = this.rideModel.travelTime;
        this.driverName = this.rideModel.driverName;
        this.taxiNumber = this.rideModel.taxiName;
        this.userId = this.rideModel.userId;
    }

    ionViewDidLoad() {
        var context = this;
        this.handler = StripeCheckout.configure({
            key: Environment.stripeKey,
            image: "https://stripe.com/img/documentation/checkout/marketplace.png",
            locale: 'auto',
            token: token => {
                this.pService.processPayment(token, context.fareValue, context.userId);
                context.navCtrl.popToRoot();
            }
        });
    }

    confirmRide() {
        var context = this;
        let alert = this.alertCtrl.create({
            title: 'Confirm Ride',
            message: 'Do you want to pay for the ride?',
            buttons: [
                {
                    text: 'Pay Now',
                    handler: () => {
                        // console.log('Cancel clicked');
                        context.makePayment();
                    }
                },
                {
                    text: 'Pay Later',
                    role: 'cancel',
                    handler: () => {
                        //console.log('Buy clicked');
                        context.navCtrl.popToRoot();
                    }
                }
            ]
        });
        alert.present();
    }

    makePayment() {
        let scope = this;
        this.handler.open({
          name: 'Stripe.com',
          description: '2 widgets',
          zipCode: true,
          amount: (scope.fareValue * 100)
        });
      }
    
      @HostListener('window:popstate')
      onpopstate() {
        this.handler.close();
      }
}



