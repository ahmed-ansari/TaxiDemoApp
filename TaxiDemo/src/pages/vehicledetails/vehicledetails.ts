import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {HistoryPage} from '../history/history';
/**
 * Generated class for the VehicledetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehicledetails',
  templateUrl: 'vehicledetails.html',
})
export class VehicledetailsPage {
  private vehicle : FormGroup;
  constructor(private formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit () {
    this.vehicle = this.formBuilder.group({

      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['',Validators.required],
      regno: ['',Validators.required],
      uinnumber: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicledetailsPage');
  }

  logForm(){
    console.log(this.vehicle.value)
    this.navCtrl.setRoot(HistoryPage);
   
  }

}
