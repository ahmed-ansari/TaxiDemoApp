import { Component, ViewChild, ElementRef, HostListener, OnInit } from '@angular/core';
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
import { PaymentService } from '../payment/payment.service';
import { Environment } from '../payment/environment';
import { UserModel } from '../welcome/user.model';
import { PaymentPage } from '../payment/payment';

declare var google: any;
declare var StripeCheckout: any;
@IonicPage()
@Component({ selector: 'page-dashboard', templateUrl: 'dashboard.html' })
export class DashboardPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentAddress;
  address;
  source: LatLng;
  destination: LatLng;
  bottomSheet = false;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  sourceMarker: any;
  destMarker: any;
  timeTillArrival = 0;
  fareValue: any;
  fareValueWithoutSymbol: any;
  handler: any;
  public user: UserModel;
  public isMapIdle: boolean;
  distance: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _googleMaps: GoogleMaps,
    private _geoLoc: Geolocation, private geocoder: Geocoder,
    private nativeStorage: NativeStorage, private modalCtrl: ModalController,
    private loadingCtrl: LoadingController, private pService: PaymentService, private events: Events) {
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
    var context = this;
    this.handler = StripeCheckout.configure({
      key: Environment.stripeKey,
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      locale: 'auto',
      token: token => {
        this.pService.processPayment(token, context.fareValueWithoutSymbol, context.user.userId);
        context.navCtrl.setRoot(PaymentPage);
      }
    });

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
    this.directionsDisplay.setMap(this.map);
    return this.map;

    // this._geoLoc.getCurrentPosition().then((res) => {
    //   loc = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
    //   let mapOptions = {
    //     center: loc,
    //     zoom: 14,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }
    //   this.map = new google.maps.Map(element, mapOptions);
    //   this.directionsDisplay.setMap(this.map);
    //   this.source = loc;
    //   this.addMarker(loc, null);
    // })
    //   .catch(err => {
    //     alert('Failed to get current position: ' + err);
    //   });
  }

  moveCamera(loc: LatLng) {
    let options: CameraPosition<any> = {
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this
      .map
      .moveCamera(options);
  }

  createMarker(source: LatLng, title: string, destination: LatLng) {
    var pos: LatLng;
    if (destination != null) {
      pos = destination;
      this.destination = destination;
      this.calculateAndDisplayRoute();
      this.bottomSheet = true;
    } else {
      pos = source;
      this.source = source;
    }

    let markerOptions: MarkerOptions = {
      position: pos,
      title: title,
      draggable: true,
      animation: 'DROP'
    }
    // this.moveCamera(source);
    return this.map.addMarker(markerOptions);
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

    new google.maps.Geocoder().geocode({'location': latlng}, (res, status) =>{
      console.log("Result::::"+res);
      this.addMarker(loc, null, res[0].formatted_address)
       this.currentAddress = res[0].formatted_address;
       //marker.showInfoWindow();
     });
     //.catch((err) => {
    //   alert('Failed to get location: ' + err);
    // });

    // this.geocoder.geocode(req).then((res) => {
    //   console.log(res);
    //   this.createMarker(loc, res[0].extra.featureName, null).then((marker) => {
    //     this.currentAddress = res[0].extra.featureName;
    //     marker.showInfoWindow();
    //   }).catch((err) => {
    //     alert("Failed to add marker: " + err);
    //   });
    // }).catch((err) => {
    //   alert('Failed to get location: ' + err);
    // });
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
      //this.createMarker(null, address, loc);
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

    //var dist = this.getDistanceBetweenPoints(this.source, this.destination, 'miles').toFixed(2);

    // alert(dist);
    let loading = this.loadingCtrl.create({
      content: 'Updating route and fare...'
    });
    loading.present();
    this.directionsService.route(_request, function (_response, _status) {
      if (_status == google.maps.DirectionsStatus.OK) {
        scope.directionsDisplay.setDirections(_response);
        var point = _response.routes[0].legs[0];

        //alert(point.duration + "----" + point.distance.text);
        let miles = point.distance.value * 0.000621371;
        scope.distance = miles.toFixed(2);
        setTimeout(() => {    //<<<---    using ()=> syntax
          scope.timeTillArrival = scope.getTimeInMins(point.duration.value);
          scope.calculateFareValue(miles);
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

  makePayment() {
    let scope = this;
    this.handler.open({
      name: 'Stripe.com',
      description: '2 widgets',
      zipCode: true,
      amount: (scope.fareValueWithoutSymbol * 100)
    });
  }

  @HostListener('window:popstate')
  onpopstate() {
    this.handler.close();
  }

  resetUserScreen() {

  }

}
