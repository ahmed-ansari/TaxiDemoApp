import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { angularLoad } from 'angular-load';
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
import { AutocompletePage } from '../autocomplete/autocomplete';
import { Environment } from '../payment/environment';
import { UserModel } from '../welcome/user.model';
import { PaymentPage } from '../payment/payment';
import { RideModel } from '../payment/ride.model';

declare var google: any;
@IonicPage()
@Component({ selector: 'page-dashboard', templateUrl: 'dashboard.html' })
export class DashboardPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentAddress;
  //destinationAddress;
  address;
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private _googleMaps: GoogleMaps,
    private _geoLoc: Geolocation, private geocoder: Geocoder,
    private nativeStorage: NativeStorage, private modalCtrl: ModalController,
    private loadingCtrl: LoadingController, private events: Events) {
    this.address = {
      place: ''
    };
    this.distance = 0;
    this.fareValue = 0;
    this.user = new UserModel()
    let context = this;
    this.nativeStorage.getItem('userData')
      .then(response => {
        let jsonObj = JSON.parse(response);
        context.user.userId = jsonObj.userId;
        context.user.email = jsonObj.email;
        context.user.givenName = jsonObj.name;
        context.user.displayName = jsonObj.displayName;
        context.user.photoUrl = jsonObj.photoUrl;
        context.events.publish('user:logged', context.user.displayName);
        context.events.publish('user:logged:url', context.user.photoUrl);
      },
      error => console.error(error)
      );
  }

  ngOnInit() {
    //setTimeout(() => {
    this.initMap();
    //}, 500);
    this.addMapEventListeners();

    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
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
      this.address.place = data;
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
    let rideModel = new RideModel(this.currentAddress, this.address.place, this.fareValue, this.distance,
      this.timeTillArrival, "Amand Sharma", "MX 1284 Lincoln", this.user.userId);
    this.navCtrl.push(PaymentPage, { model: rideModel });
  }

  cancelRide(){
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
}
