import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {HistoryPage} from '../history/history';
import {RegisterService} from '../register/register.service';
import { UserModel } from '../welcome/user.model';
import { WelcomeService } from '../welcome/welcome.service';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-vehicledetails',
  templateUrl: 'vehicledetails.html',
})
export class VehicledetailsPage {
  private vehicle : FormGroup;
  private userModel: UserModel;
  vehicleSrc: any;
  filename: string = '';

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController,
    public navParams: NavParams, private camera: Camera, public actionSheetCtrl: ActionSheetController,
    private regService: RegisterService, private menu: MenuController, private welcomeService: WelcomeService,
    private nativeStorage: NativeStorage) {

    this.menu.swipeEnable(false)
    this.userModel = new UserModel()
    let driverInfo = this.navParams.get("register")

    this.userModel.driverName = driverInfo.driverName;
    this.userModel.license =driverInfo.driverLicense
    this.userModel.phone = driverInfo.phone
    this.userModel.password = driverInfo.password
    this.userModel.address = driverInfo.address
    this.userModel.email = this.navParams.get("email")
    this.userModel.profilePhoto = this.navParams.get("profile")

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

    if (!this.vehicle.invalid && this.vehicle.status == "VALID") {
      this.userModel.make = this.vehicle.value.make
      this.userModel.model = this.vehicle.value.model
      this.userModel.year = this.vehicle.value.year
      this.userModel.regnum = this.vehicle.value.regno
      this.userModel.uin = this.vehicle.value.uinnumber
      this.userModel.vehiclePhoto = this.filename

      let encodedEmail = this.welcomeService.encodeEmail(this.userModel.email)
      this.regService.registerUser(encodedEmail,this.userModel)

      this.nativeStorage.setItem("isLoggedIn", true).then(() => {},
      error => {});
      this.navCtrl.setRoot(HistoryPage);
    }
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
      this.filename = Math.floor(Date.now() / 1000) + '.jpg';
      var profilePromise = this.regService.uploadVehicleImage(this.vehicleSrc, this.filename);
      profilePromise.then((datasnap) => {
        console.log("Profile Updated" + JSON.stringify(datasnap.val()));
      }).catch((er) => {
        console.log(er);
      });
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
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.vehicleSrc = base64Image
      this.filename = Math.floor(Date.now() / 1000) + '.jpg';
      var profilePromise = this.regService.uploadVehicleImage(this.vehicleSrc, this.filename);
      profilePromise.then((datasnap) => {
        console.log("Profile Updated" + JSON.stringify(datasnap.val()));
      }).catch((er) => {
        console.log(er);
      });
      console.log('base 64 image: ', base64Image)
    }, (err) => {
      console.log('Error captuing photo: ', err)
    });
  }

}
