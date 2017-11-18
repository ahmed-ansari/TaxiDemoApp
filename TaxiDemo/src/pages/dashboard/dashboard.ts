import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
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

declare var google: any;
@IonicPage()
@Component({ selector: 'page-dashboard', templateUrl: 'dashboard.html' })
export class DashboardPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentAddress;
  address;
  source: LatLng;
  destination: LatLng;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  sourceMarker: any;
  destMarker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _googleMaps: GoogleMaps,
    private _geoLoc: Geolocation, private geocoder: Geocoder,
    private nativeStorage: NativeStorage, private modalCtrl: ModalController) {
    this.address = {
      place: ''
    };
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  initMap() {
    let loc: LatLng;
    let element = this.mapElement.nativeElement;
    let scope = this;
    //this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    //this.directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
    this._geoLoc.getCurrentPosition().then((res) => {
      loc = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
      let mapOptions = {
        center: loc,//new google.maps.LatLng(21.7679, 78.8718),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(element, mapOptions);//{styles: []}
      //this.map = this._googleMaps.create(element, {styles: []});
      this.directionsDisplay.setMap(this.map);
      //alert(loc);
      //scope.moveCamera(loc);
      //this.getLocationName(loc, res.coords.latitude, res.coords.longitude);
      this.source = loc;
      this.addMarker(loc, null);
      //this.createMarker(loc, "Address", null);
    })
      .catch(err => {
        alert('Failed to get current position: ' + err);
      });
    //});
    //this.directionsDisplay.setMap(this.map);
    //this.calculateAndDisplayRoute();
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
    } else {
      pos = source;
      this.source = source;
    }

    let markerOptions: MarkerOptions = {
      position: pos,
      title: title,
      animation: 'DROP'
    }
   // this.moveCamera(source);
    return this.map.addMarker(markerOptions);
  }

  addMarker(source: LatLng, dest: LatLng ) {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: source
    });

    let content = "<h4>Information!</h4>";

    if(source != null){
      this.addInfoWindow(marker, null);
    }else{
      this.addInfoWindow(null, marker);
    }
  }

  addInfoWindow(sourceMarker, destMarker) {

    let infoWindow = new google.maps.InfoWindow({
      content: "Welcome"
    });
    var marker: any;
    if(sourceMarker != null){
      this.sourceMarker = sourceMarker;
      marker = sourceMarker;
    }else{
      this.destMarker = destMarker;
      marker = destMarker;
    }

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  getLocationName(loc, latitude, longitude) {
    var latlng = {
      lat: latitude,
      lng: longitude
    };

    let req: GeocoderRequest = {
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
      this.addMarker(null, loc);
      this.calculateAndDisplayRoute();
    });
  }

  calculateAndDisplayRoute() {
    var _request = {
      origin: this.source,
      destination: this.destination,
      travelMode: 'DRIVING'
    };

    var directionsDisplay = this.directionsDisplay;

    this.sourceMarker.setMap(null);
    this.destMarker.setMap(null);

    this.directionsService.route(_request, function (_response, _status) {
      if (_status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(_response);
      }
      // });

      // this.directionsService.route({
      //     origin: this.source,
      //     destination : this.destination,
      //     travelMode: 'DRIVING'
      //   }, (response, status) => {
      //     if (status === 'OK') {
      //      // alert(response);
      //       //this.directionsDisplay.setDirections(response);
      //       var polyline = new google.maps.Polyline({
      //         path: [],
      //         strokeColor: '#0000FF',
      //         strokeWeight: 3
      //       });
      //       var bounds = new google.maps.LatLngBounds();


      //       var legs = response.routes[0].legs;
      //       for (var i = 0; i < legs.length; i++) {
      //         var steps = legs[i].steps;
      //         for (var j = 0; j < steps.length; j++) {
      //           var nextSegment = steps[j].path;
      //           for (var k = 0; k < nextSegment.length; k++) {
      //             polyline.getPath().push(nextSegment[k]);
      //             bounds.extend(nextSegment[k]);
      //           }
      //         }
      //       }

      //       polyline.setMap(this.map);
      //     } else {
      //       window.alert('Directions request failed due to ' + status);
      //     }
      //   });
    });
  }

}
