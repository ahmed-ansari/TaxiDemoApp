import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditAccountPage } from '../edit-account/edit-account';
import { UserModel } from '../welcome/user.model'
import { LocationModel } from '../welcome/user.model'
import { NativeStorage } from '@ionic-native/native-storage'
import { SettingService } from './setting.service'
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  public user: UserModel;
  public mobile: Number | String;

  public location: LocationModel;
  public locations: LocationModel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,
    private service: SettingService) {
    //this.user.createDummyUser()
    this.user = new UserModel()
    this.nativeStorage.getItem('userData')
      .then(response => {
        let jsonObj = JSON.parse(response);
        this.user.userId = jsonObj.userId;
        this.user.email = jsonObj.email;
        this.user.givenName = jsonObj.name;
        this.user.displayName = jsonObj.displayName;

        this.getSavedPlaces(jsonObj.userId);
      },
      error => console.error(error)
      );

    this.location = new LocationModel({})
    this.locations = this.location.createDummyLocations()

    // console.log(this.locations)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  goToEdit() {
    this.navCtrl.push(EditAccountPage, { user: this.user })
  }

  getSavedPlaces(userId) {
    var promise = this.service.getUserSavedPlaces(userId);
    promise.then((snapshot) => {
      let savedPlaces = snapshot.val();
      var keys = Object.keys(savedPlaces);
      console.log("User Favorites" + JSON.stringify(snapshot.val()));
       console.log(keys);
      for(var key in keys){
         console.log("Key:::"+key);
         console.log("Value:::"+savedPlaces.keys[key].name);
      }
    }).catch((er) => {
      console.log(er);
    });
  }

}
