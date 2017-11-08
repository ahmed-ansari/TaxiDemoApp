import firebase from 'firebase';
import { NgModule } from '@angular/core';

@NgModule({

})

export class RegisterService {

    constructor() {
    }

    registerUser(user): any {
        const personObj: firebase.database.Reference = firebase.database().ref(`/Users/`);
        var keyValueRef = personObj.push();
        //console.log(keyValueRef.key);
        keyValueRef.set({
            'firstname': user.firstname,
            'lastname': user.LastName,
            'email': user.email,
            'password': user.password
        });
        const userRef: firebase.database.Reference = firebase.database().ref(`/UserRef`);
        userRef.child(user.mobile).set(keyValueRef.key);
    }
}