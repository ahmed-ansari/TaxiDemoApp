import { HttpClient, HttpUrlEncodingCodec  } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({

})
export class StaticMapAPI {

    constructor(public http: HttpClient) { }

    getMapSnap(sLat, sLng, dLat, dLng) {
        //https://maps.googleapis.com/maps/api/staticmap?markers=color:green%7Clabel:S%7C17.447666,78.353900&
        //markers=color:red%7Clabel:D%7C17.494626,78.392158&
        //path=color:0x00000080%7C17.447666,78.353900|17.494626,78.392158&zoom=13&
        //size=500x500&key=AIzaSyCQHYSFVpwuo2aMuOOaW8yBQ7vpdfH8oGA
        let url = "https://maps.googleapis.com/maps/api/staticmap?markers=color:green%7Clabel:S|" + sLat + "," + sLng + "&markers=color:red|label:D|" + dLat + "," + dLng + "&path=color:0x00000080|" + sLat + "," + sLng + "|" + dLat + "," + dLng + "&zoom=13&size=400x400&key=AIzaSyCQHYSFVpwuo2aMuOOaW8yBQ7vpdfH8oGA";
        return this.http.get(url).map(response => {
            response
        });
    }
}