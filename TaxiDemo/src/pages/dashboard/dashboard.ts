import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';
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
import {Geolocation} from '@ionic-native/geolocation';
import {AutocompletePage} from '../autocomplete/autocomplete';

declare var google : any;
@IonicPage()
@Component({selector: 'page-dashboard', templateUrl: 'dashboard.html'})
export class DashboardPage {

  @ViewChild('map')mapElement : ElementRef;
  map : GoogleMap;
  currentAddress;
  address;
  source : LatLng;
  destination : LatLng;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl : NavController, public navParams : NavParams, private _googleMaps : GoogleMaps,
    private _geoLoc : Geolocation, private geocoder : Geocoder,
    private nativeStorage : NativeStorage, private modalCtrl : ModalController) {
    this.address = {
      place: ''
    };
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.initMap();
    }, 500);
    this
      .nativeStorage
      .getItem('userData')
      .then(data => console.log(data), error => console.error(error));
  }

  initMap() {
    let loc : LatLng;
    let element = this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element, {styles: []});

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
        this._geoLoc.getCurrentPosition().then(res => {
            loc = new LatLng(res.coords.latitude, res.coords.longitude);
            this.moveCamera(loc);
            this.getLocationName(loc, res.coords.latitude, res.coords.longitude);
          })
          .catch(err => {
            alert('Failed to get current position: ' + err);
          });
      });
      //this.directionsDisplay.setMap(this.map);
      //this.calculateAndDisplayRoute();
  }

  moveCamera(loc : LatLng) {
    let options : CameraPosition < any > = {
      target: loc,
      zoom: 15,
      tilt: 10
    }
    this
      .map
      .moveCamera(options);
  }

  createMarker(source : LatLng, title : string, destination : LatLng) {
    var pos : LatLng;
    if (destination != null) {
      pos = destination;
      this.destination = destination;
      this.calculateAndDisplayRoute();
    } else {
      pos = source;
      this.source = source;
    }

    let markerOptions : MarkerOptions = {
      position: pos,
      title: title,
      animation: 'DROP'
    }
    return this.map.addMarker(markerOptions);
  }

  getLocationName(loc, latitude, longitude) {
    var latlng = {
      lat: latitude,
      lng: longitude
    };

    let req : GeocoderRequest = {
      position: latlng
    };

    this.geocoder.geocode(req).then((res) => {
        console.log(res);
        this.createMarker(loc, res[0].extra.featureName, null).then((marker) => {
        this.currentAddress = res[0].extra.featureName;
          marker.showInfoWindow();
        }).catch((err) => {
          alert("Failed to add marker: " + err);
        });
      }).catch((err) => {
        alert('Failed to get location: ' + err);
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

  geoCode(address : any) {
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
      let loc : LatLng = new LatLng(latitude, longitude);
      this.createMarker(null, address, loc);
    });
  }

calculateAndDisplayRoute(){
  this.directionsService.route({
      origin: this.source,
      destination : this.destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
       // alert(response);
        //this.directionsDisplay.setDirections(response);
        var polyline = new google.maps.Polyline({
          path: [],
          strokeColor: '#0000FF',
          strokeWeight: 3
        });
        var bounds = new google.maps.LatLngBounds();  
  
        var legs = response.routes[0].legs;
        for (var i = 0; i < legs.length; i++) {
          var steps = legs[i].steps;
          for (var j = 0; j < steps.length; j++) {
            var nextSegment = steps[j].path;
            for (var k = 0; k < nextSegment.length; k++) {
              polyline.getPath().push(nextSegment[k]);
              bounds.extend(nextSegment[k]);
            }
          }
        }
  
        polyline.setMap(this.map);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
