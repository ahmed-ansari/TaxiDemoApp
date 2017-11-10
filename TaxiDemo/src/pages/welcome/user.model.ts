import { NgModule } from '@angular/core';

@NgModule({

})

export class UserModel{
    email: string;
    userId: string;
    displayName: string;
    familyName: string;
    givenName: string;
    photoUrl: string;

    // constructor(userInfo: any) {
    //     this.email =  userInfo.email
    //     this.userId = userInfo.userId
    //     this.displayName = userInfo.displayName
    //     this.familyName = userInfo.familyName
    //     this.givenName = userInfo.givenName
    //     this.photoUrl = userInfo.photoUrl
    // }

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

    constructor(locationInfo?: any) {
        if (locationInfo !== "") {
            this.name = locationInfo.name
            this.address = locationInfo.address
        }
      
    }

    createDummyLocations() {
        let address1:LocationModel =  new LocationModel({ name: "CTS", address: "Gachibowli" });
        let address2:LocationModel =  new LocationModel({ name: "Home", address: "Gachibowli" });
        return [address1,address2]
        
    }
}