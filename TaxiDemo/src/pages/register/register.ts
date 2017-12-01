import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, MenuController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MobileAuthPage } from '../mobileauth/mobileauth';
import { RegisterService } from '../register/register.service';
import { VehicledetailsPage } from '../vehicledetails/vehicledetails';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private register: FormGroup;
  emailId: string;
  imageSrc: string = "assets/imgs/profile_photo.png";
  filename: string = '';

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams,
    private regService: RegisterService, private camera: Camera, public actionSheetCtrl: ActionSheetController,
    private menu: MenuController, public loadingCtrl: LoadingController) {

    this.emailId = navParams.get("email");
    this.menu.swipeEnable(false)
  }
  ngOnInit() {
    this.register = this.formBuilder.group({
      driverName: ['', Validators.required],
      driverLicense: ['', Validators.required],
      phone: ['', this.validatorsMobile()],
      password : ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  private validatorsMobile() {
    return Validators.compose([Validators.required, Validators.maxLength(10)]);
  }

  private validatorsEmail() {
    return Validators.compose([Validators.required, Validators.email])
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    console.log(this.register)
  }

  logForm() {
    if (!this.formValid(this.register)) {
      return;
    }

    console.log('######: ', this.register.value)

    if (!this.register.invalid && this.register.status == "VALID") {
      this.navCtrl.push(VehicledetailsPage, { register: this.register.value, email: this.emailId, profile: this.filename })
    }

    // this.navCtrl.push(VehicledetailsPage)
    // this.regService.registerUser(this.register.value);
    // this.navCtrl.push(MobileAuthPage, {mobile: this.register.value.mobile, user: this.register.value})
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
      let base64Image = imageData;
      this.imageSrc = 'data:image/jpeg;base64,' + base64Image
      this.filename = Math.floor(Date.now() / 1000)+'.jpg';
      var profilePromise = this.regService.uploadProfileImage(this.imageSrc, this.filename);
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
      console.log(imageData)
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageSrc = base64Image
      this.filename = Math.floor(Date.now() / 1000) + '.jpg';
      var profilePromise = this.regService.uploadProfileImage(base64Image, this.filename);
      profilePromise.then((datasnap) => {
        console.log("Profile Updated" + JSON.stringify(datasnap.val()));
      }).catch((er) => {
        console.log("Profile Update Error", er);
      });
    }, (err) => {
      console.log('Error captuing photo: ', err)
    });
  }
}


