import firebase from 'firebase';
import { NgModule } from '@angular/core';

@NgModule({

})

export class SettingService {
    constructor() {
    }

    getUserSavedPlaces(userId): any {
        const personKeyRef: firebase.database.Reference = firebase.database().ref(`/UserFav/` + userId);
        return personKeyRef.once('value');
    }
}