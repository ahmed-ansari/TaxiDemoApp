import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HistoryPage} from '../history/history';

@IonicPage()
@Component({
  selector: 'page-vehicledetails',
  templateUrl: 'vehicledetails.html',
})
export class VehicledetailsPage {
  private vehicle : FormGroup;
  vehicleSrc: any;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController,
    public navParams: NavParams, private camera: Camera, public actionSheetCtrl: ActionSheetController) {
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
    if (!this.formValid(this.vehicle)) {
      return;
    }
    this.navCtrl.setRoot(HistoryPage);

  }

  formValid(formGroup: FormGroup): boolean {
    return !Object.keys(formGroup.controls)
      .map(controlName => formGroup.controls[controlName])
      .filter(control => {
        control.markAsTouched();
        control.updateValueAndValidity();
        return !control.valid;
      }).length;
  }

  launchPicOptions() {
    console.log('launch it')
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.PictureSourceType.CAMERA
    }
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.takePicture(cameraOptions)
          }
        },
        {
          text: 'Pick from Gallery',
          handler: () => {
            this.getImageFromGallery()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  takePicture(cameraOptions) {
    this.camera.getPicture(cameraOptions).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.vehicleSrc = base64Image
    }, (err) => {
      console.log('Error captuing photo: ', err)
    });
  }

  getImageFromGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData)
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.vehicleSrc = base64Image
      console.log('base 64 image: ', base64Image)
    }, (err) => {
      console.log('Error captuing photo: ', err)
    });
  }

}
