import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Environment } from './environment';
import { PaymentService } from './payment.service';
import { RideModel } from './ride.model';
import { StaticMapAPI } from '../history/static.map';
import { WelcomeService } from '../welcome/welcome.service';
import { Broadcaster } from '../../providers/Broadcaster';
import { RideconfirmPage } from '../rideconfirm/rideconfirm';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
    staticMapUrl: string;
    loading: any;
    from: string;
    selectedDate: any;
    responseGot: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private pService: PaymentService,
        public alertCtrl: AlertController, private staticMap: StaticMapAPI, private welcomeService: WelcomeService, private loadingCtrl: LoadingController,
        private broadcaster: Broadcaster, private modalCtrl: ModalController, private localNotifications: LocalNotifications) {
        this.rideModel = navParams.get("model");
        this.dropoffAddress = this.rideModel.dropoffAddress;
        this.pickupAddress = this.rideModel.pickupAddress;
        this.fareValue = this.rideModel.fareValue;
        this.distance = this.rideModel.distance;
        this.travelTime = this.rideModel.travelTime;
        this.driverName = this.rideModel.driverName;
        this.taxiNumber = this.rideModel.taxiName;
        this.userId = this.rideModel.userId;
        this.staticMapUrl = this.staticMap.getStaticMapSnapFromAddress(this.pickupAddress, this.dropoffAddress);
        this.from = navParams.get("from");
        this.selectedDate = navParams.get("selectedDate");
        this.rideModel.travelDate = new Date(this.selectedDate).getTime();
        console.log("TravelDate::::", this.rideModel.travelDate);

        if (this.from === "RideNow")this.registerRideConfirmBroadcast();
    }

    ionViewDidLoad() {
        var context = this;
        this.handler = StripeCheckout.configure({
            key: Environment.stripeKey,
            image: "https://stripe.com/img/documentation/checkout/marketplace.png",
            locale: 'auto',
            token: token => {
                this.pService.processPayment(token, context.fareValue, context.userId, context.rideModel, true, this.staticMapUrl);
                //this.pService.updateUserRides(context.fareValue, context.userId, context.rideModel, this.staticMapUrl, true);
                //this.welcomeService.updateRideRequest(context.userId, context.rideModel);
                // context.navCtrl.popToRoot();
                context.showRideConfirmation(context.selectedDate);
                if (context.from === 'RideLater') {
                    this.showRideRequestedNotification();
                }
            }
        });
    }

    confirmRide() {
        let context = this;
        this.responseGot = false;
        if (this.from === "RideNow") {
            var navController = this.navCtrl;
            this.loading = this.loadingCtrl.create({
                content: 'Waiting for driver confirmation...'
            });
            this.loading.present();
            setTimeout(() => {
                if(!this.responseGot){
                    this.loading.dismiss();
                    let alert = this.alertCtrl.create({
                        title: 'Ride Request',
                        subTitle: 'Driver is not responding or busy attending another ride, Please try again after some time..',
                        buttons: [{
                            text: 'Ok',
                            role: 'cancel',
                            handler: () => {
                                context.loading.dismiss();
                            }
                        }]
                    });
                    alert.present();
                }
                
              }, 30000);
            this.welcomeService.updateRideRequest(this.userId, this.rideModel);
        } else if (this.from === "RideLater") {
            this.makeConfirmedRidePayment();
        }

    }

    makeConfirmedRidePayment() {
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
                        this.pService.processPayment(null, context.fareValue, context.userId, context.rideModel, false, this.staticMapUrl);
                        //this.pService.updateUserRides(context.fareValue, context.userId, context.rideModel, this.staticMapUrl, false);

                        //context.navCtrl.popToRoot();
                        context.showRideConfirmation(context.selectedDate);
                        if (context.from === 'RideLater') {
                            context.showRideRequestedNotification();
                            context.pService.updateRideStatus(context.userId, context.rideModel);
                        }
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

    registerRideConfirmBroadcast() {
        const context = this;
        this.broadcaster.on<any>('cancel')
            .subscribe(user => {
                this.responseGot = true;
                let alert = this.alertCtrl.create({
                    title: 'Ride Request',
                    subTitle: 'SORRY WE ARE UNABLE TO ACCEPT YOUR RIDE at THIS TIME We sincerely regret the inconvenience caused.',
                    buttons: [{
                        text: 'Ok',
                        role: 'cancel',
                        handler: () => {
                            context.loading.dismiss();
                            context.navCtrl.popToRoot();
                        }
                    }]
                });
                alert.present();
            });

        this.broadcaster.on<any>('confirm')
            .subscribe(user => {
                this.responseGot = true;
                context.loading.dismiss();
                context.makeConfirmedRidePayment();
            });
    }

    showRideConfirmation(date) {
        this.navCtrl.pop();
        this.modalCtrl.create(RideconfirmPage, {
            "destination": this.dropoffAddress,
            "fare": this.fareValue,
            "distance": this.distance,
            "date": date
        }, {
                showBackdrop: false,
                enableBackdropDismiss: false
            }).present();
    }

    showRideRequestedNotification() {
        this.localNotifications.schedule({
            id: 1,
            title: 'Taxi App',
            text: 'Your ride is scheduled now!',
            //sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
            data: {
                "source": this.pickupAddress,
                "destination": this.dropoffAddress
            },
            at: this.selectedDate
        });
    }
}



