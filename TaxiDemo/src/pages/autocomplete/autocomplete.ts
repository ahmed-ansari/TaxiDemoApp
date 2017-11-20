import {Component, NgZone} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {GoogleMaps, GoogleMap, LatLng,} from '@ionic-native/google-maps';
import {DashboardPage} from '../dashboard/dashboard';

declare var google : any;
@IonicPage()
@Component({selector: 'page-autocomplete', templateUrl: 'autocomplete.html'})

export class AutocompletePage {
  autocompleteItems;
  autocomplete;

  latitude : number = 0;
  longitude : number = 0;
  geo : any

  service = new google
    .maps
    .places
    .AutocompleteService();

  constructor(public viewCtrl : ViewController, private zone : NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this
      .viewCtrl
      .dismiss();
  }

  chooseItem(item : any) {
    this
      .viewCtrl
      .dismiss(item);
    this.geo = item;
    //this.geoCode(this.geo); //convert Address to lat and long
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this
      .service
      .getPlacePredictions({
        input: this.autocomplete.query,
        componentRestrictions: {
          country: 'IN'
        }
      }, function (predictions, status) {
        me.autocompleteItems = [];
        me
          .zone
          .run(function () {
            predictions
              .forEach(function (prediction) {
                me
                  .autocompleteItems
                  .push(prediction.description);
              });
          });
      });
  }
}
