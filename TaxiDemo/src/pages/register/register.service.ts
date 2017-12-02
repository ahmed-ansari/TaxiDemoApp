import firebase from 'firebase';
import { NgModule } from '@angular/core';

@NgModule({

})

export class RegisterService {

    constructor() {
    }

    validateUser(driver): any {
        const personKeyRef: firebase.database.Reference = firebase.database().ref(`/Drivers/` + driver);
        return personKeyRef.once('value');
    }

    registerUser(driverRef, user): any {
        const personObj: firebase.database.Reference = firebase.database().ref(`/Drivers/`);
        // var keyValueRef = personObj.push();
        var data = {
            'driverName': user.driverName,
            'license': user.license,
            'email': user.email,
            'phone': user.phone,
             'profilePhoto': (typeof user.profilePhoto != "undefined") ? user.profilePhoto : "",
            'address': user.address,
            'make': user.make,
            'model': user.model,
            'year': user.year,
            'regnum': user.regnum,
            'uin': user.uin,
            'password': user.password,
            'vehiclePhoto': (typeof user.vehiclePhoto != "undefined") ? user.vehiclePhoto : "",
        };
        personObj.child(driverRef).set(data);
        // const userRef: firebase.database.Reference = firebase.database().ref(`/UserRef`);
        // userRef.child(user.mobile).set(keyValueRef.key);
    }

    uploadProfileImage(imageString, timeStamp): any {
        let image: string = timeStamp,
            storageRef: any,
            parseUpload: any;

        return new Promise((resolve, reject) => {
            storageRef = firebase.storage().ref('profile/' + image);
            console.log("Storage Ref::", storageRef);
            parseUpload = storageRef.putString(imageString, 'data_url',
                {contentType: 'image/jpg'});

            parseUpload.on('state_changed', (_snapshot) => {
                // We could log the progress here IF necessary
                console.log('snapshot progess ' + _snapshot);
            },
                (_err) => {
                    reject(_err);
                },
                (success) => {
                    resolve(parseUpload.snapshot);
                });
        });
    }

    uploadVehicleImage(imageString, timeStamp): Promise<any> {
        let image: string = timeStamp,
            storageRef: any,
            parseUpload: any;

        return new Promise((resolve, reject) => {
            storageRef = firebase.storage().ref('vehicle/' + image);
            parseUpload = storageRef.putString(imageString, 'data_url', {contentType: 'image/jpg'});

            parseUpload.on('state_changed', (_snapshot) => {
                // We could log the progress here IF necessary
                console.log('snapshot progess ' + _snapshot);
            },
                (_err) => {
                    reject(_err);
                },
                (success) => {
                    resolve(parseUpload.snapshot);
                });
        });
    }
}
