import firebase from 'firebase';
import {NgModule} from '@angular/core';

@NgModule({

})

export class WelcomeService {

    constructor() {
    }

    validateUser(mobile) : any {
        var userObj = {};
        const personRef: firebase.database.Reference = firebase.database().ref(`/Users/` + mobile);
        personRef.on('value', personSnapshot => {
            userObj = personSnapshot.val();
            //console.log(this.myPerson);
            return userObj;
        });
    }
}
