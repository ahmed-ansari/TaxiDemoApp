import { Injectable } from '@angular/core';

@Injectable()
export class Constants{

    constructor(){

    }

    getFirebaseImageUrl(imageName: string){
        return "https://firebasestorage.googleapis.com/v0/b/taxiapp-8e144.appspot.com/o/profile%2F"+imageName+"?alt=media";
    }

    getFirebaseVehicleImageUrl(imageName: string){
        return "https://firebasestorage.googleapis.com/v0/b/taxiapp-8e144.appspot.com/o/vehicle%2F"+imageName+"?alt=media";
    }

}