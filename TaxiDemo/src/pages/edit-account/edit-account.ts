import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../welcome/user.model'

/**
 * Generated class for the EditAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {
  private editAccount : FormGroup;
  public user: UserModel;
  public mobile: Number | String;

  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.user =  navParams.get("user");
    //this.user.createDummyUser()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
  }

  ngOnInit () {
    this.editAccount = this.formBuilder.group({

      firstName: [this.user.displayName, Validators.required],
      LastName: [this.user.displayName, Validators.required],
      email : [this.user.email,this.validatorsEmail()],
     // password: ['',Validators.required],
      mobile: [this.user.mobile,this.validatorsMobile()],
      photoUrl: [this.user.photoUrl]
    });
  }

  private validatorsMobile() {
    return Validators.compose([Validators.required, Validators.maxLength(10)] );
}

private validatorsEmail() {
  return Validators.compose([ Validators.required,Validators.email])
}

logForm(){
  console.log(this.editAccount.value)

  this.navCtrl.pop()
  }

}
