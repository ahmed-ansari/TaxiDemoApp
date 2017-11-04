import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
Trips:string
  constructor(public navCtrl: NavController) {
    // this.navCtrl.setRoot(HomePage)
    this.Trips =  "Past"
  }


   
}
