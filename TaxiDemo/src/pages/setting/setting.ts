import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditAccountPage } from '../edit-account/edit-account';
import { UserModel } from '../welcome/user.model'
import { LocationModel } from '../welcome/user.model'
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
  public locations:LocationModel[]  = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user =  new UserModel()
    this.user.createDummyUser()

    this.location = new LocationModel({})
    this.locations =  this.location.createDummyLocations()

    // console.log(this.locations)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  goToEdit() {
    this.navCtrl.push(EditAccountPage)
  }

}
