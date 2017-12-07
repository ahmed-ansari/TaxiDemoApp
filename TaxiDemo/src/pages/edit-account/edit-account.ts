import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage'
import { UserModel } from '../welcome/user.model'
import { WelcomeService } from '../welcome/welcome.service';
import { RegisterService } from '../register/register.service';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {
  private vehicle: FormGroup;
  private userModel: UserModel;
  public mobile: Number | String;
  imageSrc: string = "assets/imgs/profile_photo.png";
  vehicleSrc: string = "";
  profileFilename: string = '';
  vehicleFilename: string = '';
  name: string;
  email: string;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    public actionSheetCtrl: ActionSheetController, private welcomeService: WelcomeService, private regService: RegisterService,
    private nativeStorage: NativeStorage) {

    // this.nativeStorage.getItem('email')
    //   .then(response => {
    //     let jsonObj = JSON.parse(response);
    //     this.getDriverDetails(jsonObj.email)
    //   },
    //   error => console.error(error)
    //   );

    // this.name = this.userModel.driverName
     this.email = this.userModel.email
     console.log('In edit: ', this.email)
    // this.mobile = this.userModel.phone
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
  }

  ngOnInit() {
    this.vehicle = this.formBuilder.group({

      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      regno: ['', Validators.required],
      uinnumber: ['', Validators.required]
    });
  }

  getDriverDetails() {

    let encodedEmail = this.welcomeService.encodeEmail(this.email)
    let promise = this.welcomeService.getUserObject(encodedEmail)
    promise.then((datasnap) => {
      console.log("Driver Details: " + JSON.stringify(datasnap.val()));
    }).catch((er) => {
      console.log(er);
    });
  }

  logForm() {
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

      if (this.vehicleFilename != "") {
        this.userModel.vehiclePhoto = this.vehicleFilename
      }

      if (this.userModel.profilePhoto != "") {
        this.userModel.profilePhoto = this.profileFilename
      }

      let encodedEmail = this.welcomeService.encodeEmail(this.userModel.email)
      this.regService.registerUser(encodedEmail, this.userModel)
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

  launchPicOptions(imageType) {
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
            this.takePicture(cameraOptions, imageType)
          }
        },
        {
          text: 'Pick from Gallery',
          handler: () => {
            this.getImageFromGallery(imageType)
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

  takePicture(cameraOptions, imageType) {
    this.camera.getPicture(cameraOptions).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      var profilePromise = null;
      if (imageType === 0) {
        this.imageSrc = base64Image
        this.profileFilename = Math.floor(Date.now() / 1000) + '.jpg';
        profilePromise = this.regService.uploadProfileImage(this.imageSrc, this.profileFilename);
      } else {
        this.vehicleSrc = base64Image
        this.vehicleFilename = Math.floor(Date.now() / 1000) + '.jpg';
        profilePromise = this.regService.uploadProfileImage(this.vehicleSrc, this.vehicleFilename);
      }
      profilePromise.then((datasnap) => {
        console.log("Profile Updated" + JSON.stringify(datasnap.val()));
      }).catch((er) => {
        console.log(er);
      });
    }, (err) => {
      console.log('Error captuing photo: ', err)
    });
  }

  getImageFromGallery(imageType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      var profilePromise = null;
      if (imageType === 0) {
        this.imageSrc = base64Image
        this.profileFilename = Math.floor(Date.now() / 1000) + '.jpg';
        profilePromise = this.regService.uploadProfileImage(this.imageSrc, this.profileFilename);
      } else {
        this.vehicleSrc = base64Image
        this.vehicleFilename = Math.floor(Date.now() / 1000) + '.jpg';
        profilePromise = this.regService.uploadProfileImage(this.vehicleSrc, this.vehicleFilename);
      }
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
