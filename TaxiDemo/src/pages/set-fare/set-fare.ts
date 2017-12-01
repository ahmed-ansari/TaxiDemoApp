import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-set-fare',
  templateUrl: 'set-fare.html',
})
export class SetFarePage {
  private setFare: FormGroup;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.setFare = this.formBuilder.group({

      vehicleType: ['', Validators.required]

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetFarePage');
  }

}
