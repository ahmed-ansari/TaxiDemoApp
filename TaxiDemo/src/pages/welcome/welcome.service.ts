import firebase from 'firebase';
import { NgModule } from '@angular/core';

@NgModule({

})

export class WelcomeService {

    constructor() {
    }

    validateUser(mobile): any {
        const personKeyRef: firebase.database.Reference = firebase.database().ref(`/UserRef/` + mobile);
        return personKeyRef.once('value');
    }

    getUserObject(uniqueKey): any {
        const personObjectRef: firebase.database.Reference = firebase.database().ref(`/Users/` + uniqueKey);
        return personObjectRef.once('value');
    }
}
