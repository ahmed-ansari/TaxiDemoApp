import {Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import {
//   GoogleMaps,
//   GoogleMap,
//   LatLng,
//   CameraPosition,
//   GoogleMapsEvent,
//   Marker,
//   MarkerOptions,
//   Geocoder,
//   GeocoderRequest
// } from '@ionic-native/google-maps';
// import {Geolocation} from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

// @ViewChild('map')mapElement : ElementRef;
// map : GoogleMap;
// , private _googleMaps : GoogleMaps,
  // private _geoLoc : Geolocation, private geocoder : Geocoder in constructor
constructor(public navCtrl : NavController, public navParams : NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      // this.initMap();
    }, 500);
  }

// initMap() {
//   let loc : LatLng;

//   let element = this.mapElement.nativeElement;
//   this.map = this._googleMaps.create(element, {styles: []});

//   this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
//       this._geoLoc.getCurrentPosition().then(res => {
//           loc = new LatLng(res.coords.latitude, res.coords.longitude);
//           this.moveCamera(loc);
//           this.getLocationName(loc, res.coords.latitude, res.coords.longitude);
//         }).catch(err => {
//           alert('Failed to get current position: ' + err);
//       });
//   });
// }

// moveCamera(loc : LatLng) {
//   let options : CameraPosition < any > = {
//     target: loc,
//     zoom: 15,
//     tilt: 10
//   }
//   this.map.moveCamera(options);
// }

// createMarker(loc : LatLng, title : string) {
//   let markerOptions : MarkerOptions = {
//     position: loc,
//     title: title,
//     animation: 'DROP'
//   }
//   return this
//     .map
//     .addMarker(markerOptions);
// }

// getLocationName(loc, latitude, longitude) {
//   var latlng = {
//     lat: latitude,
//     lng: longitude
//   };

//   let req : GeocoderRequest = {
//     position: latlng
//   };

//   this.geocoder.geocode(req).then((res) => {
//       this.createMarker(loc, res[1].extra.lines[0].split("," [0])).then((marker) => {
//         marker.showInfoWindow();
//       }).catch((err) => {
//         alert("Failed to add marker: " + err);
//       });
//   }).catch((err) => {
//       alert('Failed to get location: ' + err);
//     });
// };
}

