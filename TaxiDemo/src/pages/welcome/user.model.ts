import { NgModule } from '@angular/core';
import { LatLng } from '@ionic-native/google-maps';

@NgModule({

})

export class UserModel {
    email: string;
    driverName: string;
    license: string;
    phone: string;
    address: string;
    profilePhoto: string;
    make: string;
    model: string;
    year: string;
    regnum: string;
    uin: string;
    vehiclePhoto: string;
    timeStampe: any;

    constructor(email, driverName, license, phone, address, profilePhoto, make, model, year, 
        regnum, uin, vehiclePhoto, timeStampe) {
        this.email = email;
        this.driverName = driverName;
        this.license = license;
        this.phone = phone;
        this.address = address;
        this.profilePhoto = profilePhoto;
        this.make = make;
        this.model = model;
        this.year = year;
        this.regnum = regnum;
        this.uin = uin;
        this.vehiclePhoto = vehiclePhoto;
        this.timeStampe = timeStampe;
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
        let address1: LocationModel = new LocationModel({ name: "CTS", address: "Gachibowli" });
        let address2: LocationModel = new LocationModel({ name: "Home", address: "Gachibowli" });
        return [address1, address2]

    }
}