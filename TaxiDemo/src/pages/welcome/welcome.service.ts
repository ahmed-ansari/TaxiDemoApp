import firebase from 'firebase';
import {NgModule} from '@angular/core';

@NgModule({

})

export class WelcomeService {

    constructor() {
    }

    validateUser(mobile) : any {
        var userObj = {};
        const personKeyRef: firebase.database.Reference = firebase.database().ref(`/UserRef/`);
        var keyValue = personKeyRef.child(mobile);
        const personRef: firebase.database.Reference = firebase.database().ref(`/Users/` + keyValue);
        personRef.on('value', personSnapshot => {
            userObj = personSnapshot.val();
            return userObj;
        });
    }
}
