import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { MobileAuthPage } from '../mobileauth/mobileauth';
import { WelcomeService } from './welcome.service';
import { DashboardPage } from '../dashboard/dashboard';
import { PasswordPage } from '../password/password';
import { UserModel } from './user.model';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  mobile: any = "";
  hideMobile: Boolean = false;
  isHidden: Boolean = true;

  public userObj: any;

  provider = new firebase.auth.FacebookAuthProvider();

  public userChanged = new EventEmitter();

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: WelcomeService,
    public loadingCtrl: LoadingController, private fb: Facebook, private googlePlus: GooglePlus, private model: UserModel,
    private nativeStorage: NativeStorage, private events: Events) {
    this.model = new UserModel();
  }

  validateMobile(value) {
    if (this.mobile.length == 10) {
      this.isHidden = false;
    } else {
      this.isHidden = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
    this.hideMobile = false;
    this.provider.addScope('public_profile');
    this.provider.addScope('user_friends');
    this.provider.addScope('email');
    this.provider.setCustomParameters({
      'display': 'popup'
    });
  }

  validateUser() {
    //this.navCtrl.setRoot(HomePage);
  }

  goToRegisterPage() {
    console.log("going register");
    this.navCtrl.push(RegisterPage)
  }

  goToAuthPage() {
    //this.navCtrl.push(DashboardPage);
    var navController = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var promise = this.service.validateUser(this.mobile);
    promise.then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        var userPromise = this.service.getUserObject(snapshot.val());
        userPromise.then((datasnap) => {
          console.log("User found" + JSON.stringify(datasnap.val()));
          loading.dismiss();
          navController.push(PasswordPage, { mobile: this.mobile, user: datasnap.val() });
        }).catch((er) => {
          console.log(er);
        });
      } else {
        console.log("No User found");
        loading.dismiss();
        navController.push(RegisterPage, { mobile: this.mobile });
      }
    }).catch((er) => {
      loading.dismiss();
      console.log(er);
    });
  }

  facebookSignIn() {
    console.log("Facebook SingIn");
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.fb.api('/me?fields=email,name&access_token=' + res.authResponse.accessToken, null).then(
          (response) => {
            console.log(response);
            this.model.userId = res.authResponse.userID;
            this.model.email = response.email;
            this.model.displayName = response.name;
            this.model.familyName = response.name;
            this.model.photoUrl = "http://graph.facebook.com/" + res.authResponse.userID + "/picture?type=large"
            this.model.givenName = response.name;
            this.validateUserExistance(this.model);
          }).catch(error => console.log(error));
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  googleSignIn() {
    this.googlePlus.login({}).then(res => {
        console.log(res);
        //http://picasaweb.google.com/data/entry/api/user/103521401204989084478?alt=json        
        this.model.email = res.email;
        this.model.displayName = res.displayName;
        this.model.familyName = res.familyName;
        this.model.userId = res.userId;
        this.model.givenName = res.givenName;
        this.model.photoUrl = res.imageUrl;
        this.validateUserExistance(this.model);
      })
      .catch(err => console.error(err));
  }

  validateUserExistance(userModel) {
    var scope = this;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    var promise = this.service.validateUserWithuserId(userModel.userId);
    promise.then((snapshot) => {
      if (!snapshot.exists()) {
        console.log('No User found');
        this.service.registerUser(userModel);
      }
      //this.userChanged.emit(userModel.givenName);
      //scope.events.publish('user:logged', userModel);
      let userData = JSON.stringify(userModel);
      this.nativeStorage.setItem('userData', userData)
        .then(() => console.log('Stored item!'),
        error => console.error('Error storing item', error));
        this.nativeStorage.setItem('isLoggedIn', true).then(() => {},
        error => {});
        loading.dismiss();
        scope.navCtrl.setRoot(DashboardPage);
    }).catch((er) => {
      console.log("Error" + er);
       loading.dismiss();
    });
  }

}
