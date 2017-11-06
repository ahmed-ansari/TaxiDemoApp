import firebase from 'firebase';
import { NavController } from 'ionic-angular';

export class RegisterService {

    constructor(public navCtrl: NavController) {
    }

    registerUser(user): any {
        var userObj = {};
        const personRef: firebase.database.Reference = firebase.database().ref(`/Users/`);// + user.mobile);
        var keyValueRef = personRef.push();
        keyValueRef.set({
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email,
            "password": user.password
        });
    }
}