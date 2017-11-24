import { HttpClient, HttpUrlEncodingCodec  } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@NgModule({

})
export class StaticMapAPI {

    constructor(public http: HttpClient) { }

    getMapSnap(sLat, sLng, dLat, dLng) {
        let url: string = "https://maps.googleapis.com/maps/api/staticmap?markers=color:green|label:S|" + 
        sLat + "," + sLng + "&markers=color:red|label:D|" + dLat + "," + dLng + "&path=color:0x00000080|" +
          sLat + "," + sLng + "|" + dLat + "," + dLng + "&zoom=13&size=400x400&key=AIzaSyCQHYSFVpwuo2aMuOOaW8yBQ7vpdfH8oGA";
        console.log(url);
        return url;
        //   return this.http.get(url).map(response => {
        //     console.log("Image Response:::",response);
        //     response
        // }).catch(error => error);
    }
}