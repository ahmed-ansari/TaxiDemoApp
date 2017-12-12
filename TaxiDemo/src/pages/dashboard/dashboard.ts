import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Events, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Observable } from 'rxjs/Observable';
import {
  GoogleMaps,
  GoogleMap,
  LatLng,
  CameraPosition,
  GoogleMapsEvent,
  Marker,
  MarkerOptions,
  Geocoder,
  GeocoderRequest,
  GroundOverlayOptions,
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { DatePicker } from '@ionic-native/date-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { Environment } from '../payment/environment';
import { UserModel } from '../welcome/user.model';
import { PaymentPage } from '../payment/payment';
import { RideModel } from '../payment/ride.model';
import { WelcomeService } from '../welcome/welcome.service';
import { RideconfirmPage } from '../rideconfirm/rideconfirm';
import { Broadcaster } from '../../providers/Broadcaster';
import { RideService } from '../../providers/RideService';

declare var google: any;
@IonicPage()
@Component({ selector: 'page-dashboard', templateUrl: 'dashboard.html' })
export class DashboardPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentAddress;
  destinationAddress;
  source: LatLng;
  destination: LatLng;
  bottomSheet = false;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay: any;
  sourceMarker: any;
  destMarker: any;
  timeTillArrival = 0;
  fareValue: any;
  fareValueWithoutSymbol: any;
  public user: UserModel;
  public isMapIdle: boolean;
  distance: any;
  public rideModel: RideModel;
  public cancel = false;
  public travelTime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _googleMaps: GoogleMaps,
    private _geoLoc: Geolocation, private geocoder: Geocoder,
    private nativeStorage: NativeStorage, private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private events: Events,
    private datePicker: DatePicker,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private welcomeService: WelcomeService, private broadcaster: Broadcaster, private rideService: RideService) {
    this.distance = 0;
    this.fareValue = 0;
    this.user = new UserModel()
    let context = this;
    this.nativeStorage.getItem('userData')
      .then(response => {
        let jsonObj = JSON.parse(response);
        context.user.userId = jsonObj.userId;
        context.user.email = jsonObj.email;
        context.user.mobile = jsonObj.mobile;
        context.user.givenName = jsonObj.name;
        context.user.displayName = jsonObj.displayName;
        context.user.photoUrl = jsonObj.photoUrl;
        context.broadcaster.broadcast('UserData', context.user);
        this.rideService.subscribeForRideRequests( context.user.userId);
      },
      error => console.error(error)
      );
  }

  ngOnInit() {
    this.initMap();
    this.addMapEventListeners();
    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    });

    this.localNotifications.on('click', function (notificationData) {
      let rideData = JSON.parse(notificationData.data);
      console.log('Notification clicked...', rideData);
      this.currentAddress = rideData.source;
      this.destinationAddress = rideData.destination;
    });
  }

  addMapEventListeners() {

    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    })

  }

  getCurrentLocation(): Observable<any> {

    let loading = this.loadingCtrl.create({
      content: 'Locating...'
    });

    loading.present(loading);

    let options = { timeout: 10000, enableHighAccuracy: true };

    let locationObs = Observable.create(observable => {

      this._geoLoc.getCurrentPosition(options)
        .then(resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;

          let location = new google.maps.LatLng(lat, lng);

          console.log('Geolocation: ' + location);

          observable.next(location);

          loading.dismiss();
        },
        (err) => {
          console.log('Geolocation err: ' + err);
          loading.dismiss();
        })

    })

    return locationObs;
  }

  centerLocation(location) {

    if (location) {
      this.map.panTo(location);
      this.source = location;
      //this.addMarker(location, null);
      this.getLocationName(location);
    }
    else {
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
        this.source = currentLocation;
        //this.addMarker(currentLocation, null);
        this.getLocationName(currentLocation);
      });
    }
  }


  ionViewDidLoad() {
    console.log("ionViewDidLoad");
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.resetUserScreen();
    //this.address.place = "";
  }

  initMap() {
    let loc: LatLng;
    let element = this.mapElement.nativeElement;
    let scope = this;
    let mapOptions = {
      center: loc,//new google.maps.LatLng(21.7679, 78.8718),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(element, mapOptions);
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(this.map);
    return this.map;
  }

  addMarker(source: LatLng, dest: LatLng, address: string) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: source
    });

    let content = "<h4>Information!</h4>";

    if (source != null) {
      this.addInfoWindow(marker, null, address);
    } else {
      this.addInfoWindow(null, marker, address);
    }
  }

  addInfoWindow(sourceMarker, destMarker, address: string) {

    let infoWindow = new google.maps.InfoWindow({
      content: address
    });
    var marker: any;
    if (sourceMarker != null) {
      this.sourceMarker = sourceMarker;
      marker = sourceMarker;
    } else {
      this.destMarker = destMarker;
      marker = destMarker;
    }

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  getLocationName(loc) {
    var latlng = {
      lat: loc.lat(),
      lng: loc.lng()
    };

    let req: GeocoderRequest = {
      position: latlng
    };

    new google.maps.Geocoder().geocode({ 'location': latlng }, (res, status) => {
      console.log("Result::::" + res);
      this.addMarker(loc, null, res[0].formatted_address)
      this.currentAddress = res[0].formatted_address;
    });
  };

  showAddressModal() {
    let modal = this
      .modalCtrl
      .create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.destinationAddress = data;
      this.geoCode(data);
    });
    modal.present();
  }

  geoCode(address: any) {
    let geocoder = new google
      .maps
      .Geocoder();
    geocoder.geocode({
      'address': address
    }, (results, status) => {
      let latitude = results[0]
        .geometry
        .location
        .lat();
      let longitude = results[0]
        .geometry
        .location
        .lng();
      let loc: LatLng = new google.maps.LatLng(latitude, longitude);
      this.destination = loc;
      this.addMarker(null, loc, "Destination");
      this.calculateAndDisplayRoute();
    });
  }

  calculateAndDisplayRoute() {
    var _request = {
      origin: this.source,
      destination: this.destination,
      travelMode: 'DRIVING'
    };

    var scope = this;

    this.sourceMarker.setMap(null);
    this.destMarker.setMap(null);
    this.destMarker = null;
    let loading = this.loadingCtrl.create({
      content: 'Updating route and fare...'
    });
    loading.present();
    this.directionsService.route(_request, function (_response, _status) {
      if (_status == google.maps.DirectionsStatus.OK) {
        scope.directionsDisplay.setDirections(_response);
        var point = _response.routes[0].legs[0];
        let miles = point.distance.value * 0.000621371;
        scope.distance = miles.toFixed(2);
        setTimeout(() => {
          scope.timeTillArrival = scope.getTimeInMins(point.duration.value);
          scope.calculateFareValue(miles);
          scope.bottomSheet = true;
          loading.dismiss();
        }, 2000);
      }
    });
  }

  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat();
    let lon1 = start.lng();
    let lat2 = end.lat();
    let lon2 = end.lng();

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }

  calculateFareValue(distance) {
    let baseFare = 3;
    let add_mile = 1.95;
    this.fareValueWithoutSymbol = (((distance * add_mile) + baseFare).toFixed(2));
    this.fareValue = this.fareValueWithoutSymbol;
    return this.fareValue;
  }

  getTimeInMins(seconds) {
    let minutes = Math.floor(seconds / 60);
    return minutes;
  }

  resetUserScreen() {
    //this.destMarker = null;
    // if (this.directionsDisplay != null) {
    //   this.directionsDisplay.setMap(null);
    //   this.directionsDisplay = null;
    //   this.initMap();
    // }
    this.bottomSheet = false;
    //this.directionsDisplay.setMap(this.map);
  }

  rideNow() {
    if (typeof this.user.mobile === "undefined") {
      this.updateMobileNumber()
    } else {
      let currentDate = new Date();
      console.log("Current Date:::",currentDate);
      let rideModel = new RideModel(this.currentAddress, this.destinationAddress, this.fareValue, this.distance,
        this.timeTillArrival, "", "", this.user.userId, currentDate);
      this.navCtrl.push(PaymentPage, { model: rideModel, from:"RideNow", selectedDate: currentDate });
    }
  }

  rideLater() {
    let context = this;
    if (typeof this.user.mobile === "undefined") {
      this.updateMobileNumber()
    } else {
      this.datePicker.show({ date: new Date(), mode: 'datetime', androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK })
        .then(date => {
          console.log('Got date: ', date);
          let rideModel = new RideModel(this.currentAddress, this.destinationAddress, this.fareValue, this.distance,
          this.timeTillArrival, "", "", context.user.userId, date);
          //this.welcomeService.updateRideRequest(context.user.userId, rideModel);
          // this.localNotifications.schedule({
          //   id: 1,
          //   title: 'Taxi App',
          //   text: 'Your ride is scheduled now!',
          //   //sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          //   data: {
          //     "source": this.currentAddress,
          //     "destination": this.destinationAddress
          //   },
          //   at: date
          // });
          //this.showRideConfirmation(date)
          this.navCtrl.push(PaymentPage, { model: rideModel , from:"RideLater", selectedDate: date});
        },
        err => console.log('Error occurred while getting date: ', err));
    }
  }

  cancelRide() {
    if (this.directionsDisplay != null) {
      this.directionsDisplay.setMap(null);
      this.directionsDisplay = null;
      this.initMap();
    }
    this.cancel = false;
    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    });
  }

  updateMobileNumber() {
    let prompt = this.alertCtrl.create({
      title: 'Taxi App',
      message: "Please update mobile number before booking",
      inputs: [
        {
          name: 'mobile',
          placeholder: 'Mobile',
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            console.log('Updated: ', data)
            if (data.mobile.length > 10) {
              this.showAlert("Please enter a valid mobile number")
            } else {
              this.user.mobile = data.mobile
              this.nativeStorage.setItem('userData', JSON.stringify(this.user))
                .then(() => {
                  this.showAlert("Mobile number updated successfully")
                  this.welcomeService.updateMobileNumber(this.user.userId, data.mobile)
                },
                error => this.showAlert("Failed to update mobile number, please try again!"));
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Taxi App',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showRideConfirmation(date){
    this.modalCtrl.create(RideconfirmPage, {
      "destination": this.destinationAddress,
      "fare": this.fareValue,
      "distance": this.distance,
      "date": date
    }, {
      showBackdrop : false,
      enableBackdropDismiss: false
    }).present();
  }
}
