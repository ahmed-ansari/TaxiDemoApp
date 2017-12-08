import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage'
import { UserModel } from '../welcome/user.model'
import { WelcomeService } from '../welcome/welcome.service';
import { RegisterService } from '../register/register.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Constants } from '../../app/app.constants';

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
  vehicleSrc: string = "assets/imgs/vehicle_photo.png";
  profileFilename: string = '';
  vehicleFilename: string = '';
  name: string;
  email: string;
  storageData: any;

  constructor(private formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    public actionSheetCtrl: ActionSheetController, private welcomeService: WelcomeService, private regService: RegisterService,
    private nativeStorage: NativeStorage, public toastCtrl: ToastController, private launchNavigator: LaunchNavigator,
    private constants: Constants) {

    this.vehicle = this.formBuilder.group({

      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      regno: ['', Validators.required],
      uinnumber: ['', Validators.required]
    });

    this.nativeStorage.getItem('userData').then(response => {
      console.log("Native Storage User", response);
      this.name = response.driverName
      this.email = response.email
      this.mobile = response.mobile
      this.storageData = response
      this.vehicleFilename = response.vehiclePhoto;
      this.profileFilename = response.profilePhoto;
      this.imageSrc = (response.profilePhoto != null && response.profilePhoto != "") ? constants.getFirebaseImageUrl(response.profilePhoto) : "assets/imgs/profile_photo.png";
      this.vehicle.value.make = this.storageData.make
      this.vehicle.value.model = this.storageData.mdel
      this.vehicle.value.year = this.storageData.year
      this.vehicle.value.regno = this.storageData.regnum
      this.vehicle.value.uinnumber = this.storageData.uin
      this.vehicleSrc = (this.storageData.vehiclePhoto != null && response.profilePhoto != "") ? constants.getFirebaseVehicleImageUrl(this.storageData.vehiclePhoto) : "assets/imgs/vehicle_photo.png"
    

      this.vehicle.setValue({
        make: this.storageData.make,
        model: this.storageData.model,
        year: this.storageData.year,
        regno: this.storageData.regnum,
        uinnumber: this.storageData.uin
      });
    }, error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
  }

  ngOnInit() {
  }

  logForm() {
    console.log(this.vehicle.value)
    if (!this.formValid(this.vehicle)) {
      return;
    }

    if (!this.vehicle.invalid && this.vehicle.status == "VALID") {
      this.userModel = new UserModel()
      this.userModel.driverName = this.storageData.driverName;
      this.userModel.license = this.storageData.driverLicense
      this.userModel.phone = this.storageData.phone
      this.userModel.address = this.storageData.address
      this.userModel.email = this.storageData.email
      //this.userModel.profilePhoto = (this.storageData.profilePhoto != null)?this.storageData.profilePhoto:"";
      this.userModel.make = this.vehicle.value.make
      this.userModel.model = this.vehicle.value.model
      this.userModel.year = this.vehicle.value.year
      this.userModel.regnum = this.vehicle.value.regno
      this.userModel.uin = this.vehicle.value.uinnumber

      if (this.vehicleFilename != null && this.vehicleFilename != "") {
        this.userModel.vehiclePhoto = this.vehicleFilename
      }

      if (this.profileFilename != null && this.profileFilename != "") {
        this.userModel.profilePhoto = this.profileFilename
      }
      console.log("Profile", this.profileFilename);

      this.nativeStorage.setItem("userData", this.userModel).then(() => { }, error => { });

      let encodedEmail = this.welcomeService.encodeEmail(this.email)
      this.regService.registerUser(encodedEmail, this.userModel).then(() => {
        this.toastCtrl.create({
          message: 'Profile updated successfully',
          duration: 3000,
          position: 'bottom'
        }).present();
      }, error => { });
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

  navigateToMaps() {

    let options: LaunchNavigatorOptions = {
      start: 'DLF Gachibowli Hyderabad Telangana India'
    };

    this.launchNavigator.navigate('Lingampally Hyderabad Telangana India', options).then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

}
