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

  validateUserWithuserId(userId): any {
    const personKeyRef: firebase.database.Reference = firebase.database().ref(`/UserRef/` + userId);
    return personKeyRef.once('value');
  }

  registerUser(user): any {
    const personObj: firebase.database.Reference = firebase.database().ref(`/Users/`);
    var keyValueRef = personObj.push();
    //console.log(keyValueRef.key);
    keyValueRef.set({
      'firstname': user.givenName,
      'lastname': (user.familyName !== undefined) ? user.familyName : "",
      'email': user.email,
      'photoUrl': (user.photoUrl !== undefined) ? user.photoUrl : "",
      'userId': user.userId,
      'displayName': user.displayName
    });
    const userRef: firebase.database.Reference = firebase.database().ref(`/UserRef`);
    userRef.child(user.userId).set(keyValueRef.key);
  }

  updateMobileNumber(userId, number) {
    const personKeyRef: firebase.database.Reference = firebase.database().ref(`/UserRef/` + userId);
    let promise = personKeyRef.once('value');
    promise.then((snapshot) => {
      let key = snapshot.val();
      const personObjectRef: firebase.database.Reference = firebase.database().ref(`/Users/` + key);
      personObjectRef.update({
        'mobile': number
      });
    });
  }

  updateRideRequest(userId, rideModel): any {
    let rideStatus : boolean = false;
    const data = {rideModel, rideStatus};
    const rideObj: firebase.database.Reference = firebase.database().ref(`/RideRequests/`);
    rideObj.child(userId).push(data);
  }
}
