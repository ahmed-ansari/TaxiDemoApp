import { NgModule } from '@angular/core';
import {LatLng} from '@ionic-native/google-maps';

@NgModule({

})

export class UserModel{
    email: string;
    mobile: string;
    userId: string;
    displayName: string;
    familyName: string;
    givenName: string;
    photoUrl: string;

    createDummyUser() {
            this.email =  "nagaraju@gmail.com"
            this.userId = "123456"
            this.displayName = "Nagaraju"
            this.familyName =  "Nagaraju"
            this.givenName =  "Nagaraju"
            this.photoUrl =  "Nagaraju"
        }
}

export class LocationModel {
    name: string;
    address: string;
    location: LatLng;

    constructor(locationInfo?: any, savedName?: string) {
        if (locationInfo !== "") {
            this.name = savedName
            this.address = locationInfo.name
            this.location = new LatLng(locationInfo.lat, locationInfo.lng);
        }

    }

    createDummyLocations() {
        let address1:LocationModel =  new LocationModel({ name: "CTS", address: "Gachibowli" });
        let address2:LocationModel =  new LocationModel({ name: "Home", address: "Gachibowli" });
        return [address1,address2]

    }
}
