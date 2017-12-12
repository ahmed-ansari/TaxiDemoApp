import firebase from 'firebase';
import { NgModule } from '@angular/core';

@NgModule({

})

export class WelcomeService {

  constructor() {
  }

  validateUser(email): any {
    const personKeyRef: firebase.database.Reference = firebase.database().ref(`/Drivers/` + email);
    return personKeyRef.once('value');
  }

  getUserObject(email): any {
    const personObjectRef: firebase.database.Reference = firebase.database().ref(`/Drivers/` + email);
    return personObjectRef.once('value');
  }

  getAppUserDetails(userKey): any {
    const personObjectRef: firebase.database.Reference = firebase.database().ref(`/Users/` + userKey);
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
      'lastname': (typeof (user.familyName) !== undefined) ? user.familyName : "",
      'email': user.email,
      'photoUrl': (typeof (user.photoUrl) !== undefined) ? user.photoUrl : "",
      'userId': user.userId,
      'displayName': user.displayName
    });
    const userRef: firebase.database.Reference = firebase.database().ref(`/UserRef`);
    userRef.child(user.userId).set(keyValueRef.key);
  }

  encodeEmail(email) {
    var dot = email.split(".").join("_dot_");
    var at = dot.split("@").join("_at_");
    var plus = at.split("+").join("_plus_");

    return plus;
  }

  decodeEmail(email) {
    var dot = email.split("_dot_").join(".");
    var at = dot.split("_at_").join("@");
    var plus = at.split("_plus_").join("+");

    return plus;
  }

  updateDriverLoginStatus(email, status){
    const personObjectRef: firebase.database.Reference = firebase.database().ref(`/Drivers/` + email);
    personObjectRef.update({
      "loggedIn": status
    });
  }
}
