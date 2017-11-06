import firebase from 'firebase';
import { NavController } from 'ionic-angular';

export class WelcomeService {

    constructor(public navCtrl: NavController) {
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