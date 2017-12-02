import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-set-fare',
  templateUrl: 'set-fare.html',
})
export class SetFarePage {
  private setFare: FormGroup;
  public hourlyRatesArray: [string] = ["Per Hour", "Min Hour", "Tips"]
  public selected: string

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.setFare = this.formBuilder.group({

      vehicleType: ['', Validators.required],
      flagDrop: ['', Validators.required,Validators.pattern["/^[0-9]*$/"]],
      eachAdditionalMile: ['', Validators.required],
      airportToll: ['', Validators.required ],
      fuelSurcharge: ['', Validators.required],
      timeFare: ['', Validators.required],


      hourlyRates: this.formBuilder.array([])

    });
  }

  onChange(c) {

    if (c == "sedan" || c == "suv" || c == "van") {

      this.selected = c;
      for (var i = 0; i <= this.hourlyRatesArray.length; i++) {
        // console.log(this.hourlyRatesA[i])
        if (this.hourlyRatesArray[i] !== undefined) {
          // console.log(this.hourlyRatesArray[i])
          //this.setFare.get("hourlyRates").push(new FormControl('', Validators.required))
        }
      }

      // this.hourlyRatesArray.forEach( item => {
      //    FormControl()
      //     let newGroup  = this.formBuilder.group({
      //         item : ['',Validators.required]
      //     })
      // })




      // this.setFare.controls["hourlyRates"] = this.formBuilder.array([this.formBuilder.group({
      //   vehicleType: ['a', Validators.required],
      //   flagDrop : ['b',Validators.required],
      // })])

      // this.setFare.get("hourlyRates").push(this.formBuilder.group({
      //   vehicleType: ['a', Validators.required],
      //   flagDrop : ['b',Validators.required],
      // }))



    } else {
      this.setFare.controls["hourlyRates"] = this.formBuilder.array([])
      this.selected = '';
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetFarePage');
  }



  logForm() {
    // console.log("submitted")
    console.log(this.setFare)
    // console.log(this.setFare.controls) 
    // this.login.controls['password'].markAsTouched()
    if (this.selected == "sedan" || this.selected == "suv" || this.selected == "van") {
      for (var i = 0; i <= this.hourlyRatesArray.length; i++) {
        if (this.hourlyRatesArray[i] !== undefined) {
          //this.setFare.controls['hourlyRates'].controls[i].markAsTouched()
        }


      }

    }
    if (!this.formValid(this.setFare)) {
      return;
    }


  }

  formValid(formGroup: FormGroup): boolean {

    return !Object.keys(formGroup.controls)
      .map(controlName => formGroup.controls[controlName])
      .filter(control => {
        // console.log("comiong",control)
        control.markAsTouched();
        control.updateValueAndValidity();
        return !control.valid;
      }).length;
  }

}
