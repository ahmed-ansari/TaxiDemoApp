import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StaticMapAPI } from './static.map';

@Component({
    selector: 'page-history',
    templateUrl: 'history.html'
})
export class HistoryPage {
    arrData = []
    Trips: string
    staticMap: any;
    constructor(public navCtrl: NavController, private map: StaticMapAPI) {
        // this.navCtrl.setRoot(HomePage)
        this.Trips = "Past";

        // this.fdb.list("/Users/").push("list1");
        //console.log(map.getMapSnap(17.494626,78.392158,17.447666,78.353900));
        map.getMapSnap(17.494626,78.392158,17.447666,78.353900).subscribe(response => {
            this.staticMap = response;
        });
    }



}