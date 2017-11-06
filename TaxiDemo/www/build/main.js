webpackJsonp([6],{

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(249);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, fdb) {
        this.navCtrl = navCtrl;
        this.fdb = fdb;
        this.arrData = [];
        // this.navCtrl.setRoot(HomePage)
        this.Trips = "Past";
        // this.fdb.list("/Users/").push("list1");
    }
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar hideBackButton>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3 ion-button clear align-center>Book your Ride</h3>\n  <div padding>\n      <ion-segment [(ngModel)]="Trips">\n        <ion-segment-button value="Past">\n            Past\n        </ion-segment-button>\n        <ion-segment-button value="Upcommings">\n            Upcommings\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n    \n    <div [ngSwitch]="Trips">\n      <ion-list *ngSwitchCase="\'Past\'">\n        <ion-item>\n          <!-- <ion-thumbnail item-start>\n             <img src="img/thumbnail-puppy-1.jpg">\n          </ion-thumbnail> -->\n          <p>8/24/17 at 04.19</p>\n        </ion-item>\n      </ion-list>\n    \n      <ion-list *ngSwitchCase="\'Upcommings\'">\n        <ion-item>\n          <!-- <ion-thumbnail item-start>\n            <img src="img/thumbnail-kitten-1.jpg"> \n          </ion-thumbnail> -->\n          <p>9/12/17 at 01.40</p>\n        </ion-item>\n        \n      </ion-list>\n    </div>\n\n  <!-- <button ion-button secondary menuToggle>Toggle Menu</button> -->\n</ion-content>\n'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

<<<<<<< HEAD
=======
/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardPage = (function () {
    function DashboardPage(navCtrl, navParams, _googleMaps, _geoLoc, geocoder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._googleMaps = _googleMaps;
        this._geoLoc = _geoLoc;
        this.geocoder = geocoder;
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.initMap();
        }, 500);
    };
    DashboardPage.prototype.initMap = function () {
        var _this = this;
        var loc;
        var element = this.mapElement.nativeElement;
        this.map = this._googleMaps.create(element, { styles: [] });
        this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* GoogleMapsEvent */].MAP_READY).then(function () {
            _this._geoLoc.getCurrentPosition().then(function (res) {
                loc = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["d" /* LatLng */](res.coords.latitude, res.coords.longitude);
                _this.moveCamera(loc);
                _this.getLocationName(loc, res.coords.latitude, res.coords.longitude);
            }).catch(function (err) {
                alert('Failed to get current position: ' + err);
            });
        });
    };
    DashboardPage.prototype.moveCamera = function (loc) {
        var options = {
            target: loc,
            zoom: 15,
            tilt: 10
        };
        this.map.moveCamera(options);
    };
    DashboardPage.prototype.createMarker = function (loc, title) {
        var markerOptions = {
            position: loc,
            title: title,
            animation: 'DROP'
        };
        return this
            .map
            .addMarker(markerOptions);
    };
    DashboardPage.prototype.getLocationName = function (loc, latitude, longitude) {
        var _this = this;
        var latlng = {
            lat: latitude,
            lng: longitude
        };
        var req = {
            position: latlng
        };
        this.geocoder.geocode(req).then(function (res) {
            _this.createMarker(loc, res[1].extra.lines[0].split(","[0])).then(function (marker) {
                marker.showInfoWindow();
            }).catch(function (err) {
                alert("Failed to add marker: " + err);
            });
        }).catch(function (err) {
            alert('Failed to get location: ' + err);
        });
    };
    ;
    return DashboardPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], DashboardPage.prototype, "mapElement", void 0);
DashboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-dashboard',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/dashboard/dashboard.html"*/'<ion-header>\n    <ion-navbar hideBackButton>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div #map id="map" class="maparea">\n        <ion-card>\n            <ion-item>\n                <ion-input type="text" placeholder="Enter Source"></ion-input>\n            </ion-item>\n        </ion-card>\n        <ion-card>\n            <ion-item>\n                <ion-input type="text" placeholder="Enter Destination"></ion-input>\n            </ion-item>\n        </ion-card>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/dashboard/dashboard.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMaps */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* Geocoder */]])
], DashboardPage);

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobileAuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(112);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MobileauthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MobileAuthPage = (function () {
    function MobileAuthPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mobileNo = "";
        this.authcode = "";
        this.mobileNo = navParams.get("mobile");
    }
    MobileAuthPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MobileauthPage');
        //this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    };
    MobileAuthPage.prototype.validateCode = function () {
        // this.navCtrl.push(HomePage)
        //this.navCtrl.setRoot(HomePage)
        // const appVerifier = this.recaptchaVerifier;
        // const phoneNumberString = "+" + "9966990732";
        // firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
        //   .then( confirmationResult => {
        //     // SMS sent. Prompt user to type the code from the message, then sign the
        //     // user in with confirmationResult.confirm(code).
        //     let prompt = this.alertCtrl.create({
        //     title: 'Enter the Confirmation code',
        //     inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        //     buttons: [
        //       { text: 'Cancel',
        //         handler: data => { console.log('Cancel clicked'); }
        //       },
        //       { text: 'Send',
        //         handler: data => {
        //           confirmationResult.confirm(data.confirmationCode)
        //           .then(function (result) {
        //             // User signed in successfully.
        //             console.log(result.user);
        //             // ...
        //           }).catch(function (error) {
        //             // User couldn't sign in (bad verification code?)
        //             // ...
        //           });
        //         }
        //       }
        //     ]
        //   });
        //   prompt.present();
        // })
        // .catch(function (error) {
        //   console.error("SMS not sent", error);
        // });
    };
    MobileAuthPage.prototype.validateOTP = function (value) {
        if (this.authcode.length == 4) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        }
    };
    return MobileAuthPage;
}());
MobileAuthPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mobileauth',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/mobileauth/mobileauth.html"*/'<!--\n  Generated template for the MobileauthPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <!-- <ion-title>mobileauth</ion-title> -->\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<h1 padding>Enter the 4 digit code sent to +91 <label [innerHTML]="mobileNo"></label></h1>\n\n<ion-item padding  text-center>\n    <ion-label floating>code</ion-label>\n    <div id="recaptcha-container"></div>\n    <ion-input  type="tel" text-center maxlength="4" [(ngModel)]="authcode" value="" class="black-border" (ngModelChange)="validateOTP($event)"></ion-input>\n</ion-item>\n<!-- \n<ion-grid>\n    <ion-row>\n      <ion-col col-6>\n        \n              <input (keypress)="change($event)"  style="padding-left: 12px;" type="tel" value="" maxlength="1" placeholder="0">\n              <input (keypress)="change($event)"  style="padding-left: 12px;" type="tel" value="" maxlength="1" placeholder="0">\n          \n      </ion-col>\n      <ion-col col-2>\n          <ion-item>\n              <ion-input style="padding-left: 12px;" type="tel" value="" maxlength="1" placeholder="0"></ion-input>\n            </ion-item>\n          \n      </ion-col>\n      <ion-col col-2>\n          <ion-item>\n              <ion-input style="padding-left: 12px;" type="tel" value="" maxlength="1" placeholder="0"></ion-input>\n            </ion-item>\n          \n      </ion-col>\n      <ion-col col-2>\n          <ion-item>\n              <ion-input style="padding-left: 12px;" type="tel" value="" maxlength="1" placeholder="0"></ion-input>\n            </ion-item>\n          \n      </ion-col>\n            </ion-row>\n\n</ion-grid> -->\n\n\n  <ion-footer>  \n <!--       <ion-fab right bottom margin-right>\n        <button ion-fab color="dark" [hidden]="isHidden" (click)="goToAuthPage()"><ion-icon name="arrow-forward"></ion-icon></button>\n      </ion-fab> -->\n     \n  </ion-footer>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/mobileauth/mobileauth.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], MobileAuthPage);

//# sourceMappingURL=mobileauth.js.map

/***/ }),

>>>>>>> 52bbcb341c20d606304583e83e56cf52b841673e
/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobileauth_mobileauth__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isHidden = true;
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.validateEmail = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__mobileauth_mobileauth__["a" /* MobileAuthPage */]);
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
<<<<<<< HEAD
        selector: 'page-register',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <!-- <ion-title>register</ion-title> -->\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n<h1 padding>\n  Enter your registered email address\n</h1>\n\n<ion-item padding>\n    <ion-label floating>something@example.com</ion-label>\n<ion-input type="email" [(ngModel)]="email" value="" class="black-border" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" required email></ion-input>\n</ion-item>\n<div class="errorMsg" [hidden]="isHidden">Email is invalid, please enter a valid email address</div>\n  <ion-footer>\n    <ion-fab right bottom margin-right>\n        <button ion-fab color="dark" (click)="validateEmail()"><ion-icon name="arrow-forward"></ion-icon></button>\n      </ion-fab>   \n  </ion-footer>\n</ion-content>\n'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/register/register.html"*/,
=======
        selector: 'page-register',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/register/register.html"*/'<ion-header>\n    <ion-navbar>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <form [formGroup]="register" (ngSubmit)="logForm()">\n        <ion-grid>\n            <ion-row>\n                <ion-col col-6>\n                    <ion-item>\n                        <ion-label floating>First Name</ion-label>\n                        <ion-input type="text" formControlName="firstName"></ion-input>\n                    </ion-item>\n                    <div *ngIf="register?.controls[\'firstName\']?.errors?.required && register?.controls[\'firstName\'].touched">\n                        <p float-right class="error">* This Field is required</p>\n                    </div>\n                </ion-col>\n\n                <ion-col col-6>\n                    <ion-item>\n                        <ion-label floating>Last Name</ion-label>\n                        <ion-input type="text" formControlName="LastName"></ion-input>\n                    </ion-item>\n                    <div *ngIf="register?.controls[\'LastName\']?.errors?.required && register?.controls[\'LastName\'].touched">\n                        <p class="error" float-right>* This Field is required</p>\n                    </div>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Mobile</ion-label>\n                    <ion-input type="tel" formControlName="mobile" disabled=true style="color:black;"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'mobile\']?.errors?.required && register?.controls[\'mobile\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n\n                <ion-item>\n                    <ion-label floating>Email</ion-label>\n                    <ion-input type="text" formControlName="email"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'email\']?.errors?.required && register?.controls[\'email\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Password</ion-label>\n                    <ion-input type="password" formControlName="password"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'password\']?.errors?.required && register?.controls[\'password\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n\n        </ion-grid>\n\n        <ion-footer>\n            <!-- [disabled]="!register.valid" -->\n\n            <ion-fab right bottom margin-right>\n                <button ion-fab color="dark" type="submit"><ion-icon name="arrow-forward"></ion-icon></button>\n            </ion-fab>\n        </ion-footer>\n\n        <!--  -->\n    </form>\n\n\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/register/register.html"*/,
>>>>>>> 52bbcb341c20d606304583e83e56cf52b841673e
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingPage = (function () {
    function SettingPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingPage');
    };
    return SettingPage;
}());
SettingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-setting',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/setting/setting.html"*/'<!--\n  Generated template for the SettingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Settings</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n\n<ion-content padding>\n<ion-list>\n  <ion-item>Account Setting</ion-item>\n  <ion-item>Privacy Setting</ion-item>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/setting/setting.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], SettingPage);

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mobileauth_mobileauth__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__welcome_service__ = __webpack_require__(263);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = (function () {
    function WelcomePage(navCtrl, navParams, service, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.mobile = "";
        this.hideMobile = false;
        this.isHidden = true;
    }
    WelcomePage.prototype.validateMobile = function (value) {
        if (this.mobile.length == 10) {
            this.isHidden = false;
        }
        else {
            this.isHidden = true;
        }
    };
    WelcomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WelcomePage');
        this.hideMobile = false;
    };
    WelcomePage.prototype.validateUser = function () {
        //this.navCtrl.setRoot(HomePage);
    };
    WelcomePage.prototype.goToRegisterPage = function () {
        console.log("going register");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
    };
    WelcomePage.prototype.goToAuthPage = function () {
        var _this = this;
        //this.navCtrl.push(DashboardPage);
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var promise = this.service.validateUser(this.mobile);
        promise.then(function (snapshot) {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                var userPromise = _this.service.getUserObject(snapshot.val());
                userPromise.then(function (datasnap) {
                    console.log("User found" + JSON.stringify(datasnap.val()));
                    loading.dismiss();
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__mobileauth_mobileauth__["a" /* MobileAuthPage */], { mobile: _this.mobile, user: datasnap });
                }).catch(function (er) {
                    console.log(er);
                });
            }
            else {
                console.log("No User found");
                loading.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */], { mobile: _this.mobile });
            }
        }).catch(function (er) {
            loading.dismiss();
            console.log(er);
        });
    };
    return WelcomePage;
}());
WelcomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-welcome',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/welcome/welcome.html"*/'<ion-content>\n    <div>\n        <img src="assets/imgs/bg.jpg" alt="bg" class="full-img">\n    </div>\n    <h1 text-left padding>Get Moving with Taxi</h1>\n\n    <ion-grid>\n        <ion-row>\n            <ion-col col-2>\n                <ion-label id="code91" padding-left>+91</ion-label>\n            </ion-col>\n            <ion-col col-10>\n                <ion-item>\n                    <ion-label floating>Enter your mobile number</ion-label>\n                    <ion-input [(ngModel)]=" mobile" name="mobile" type="tel" maxlength="10" (ngModelChange)="validateMobile($event)"></ion-input>\n                </ion-item>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-footer>\n        <!-- <div float-start>\n        <button  (click)="goToRegisterPage()" ion-button clear block class="btn-text-left" no-margin>I forgot my Password</button>\n       \n        <button (click)="goToAuthPage()" ion-button clear block no-margin [hidden]="isHidden"> I don\'t have an account</button>\n      </div> -->\n\n        <ion-fab right bottom margin-right>\n            <button ion-fab color="dark" [hidden]="isHidden" (click)="goToAuthPage()"><ion-icon name="arrow-forward"></ion-icon></button>\n        </ion-fab>\n    </ion-footer>\n\n\n</ion-content>'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/welcome/welcome.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__welcome_service__["a" /* WelcomeService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], WelcomePage);

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/dashboard/dashboard.module": [
		482,
		5
	],
	"../pages/login/login.module": [
		483,
		4
	],
	"../pages/mobileauth/mobileauth.module": [
		484,
		3
	],
	"../pages/register/register.module": [
		485,
		2
	],
	"../pages/setting/setting.module": [
		486,
		1
	],
	"../pages/welcome/welcome.module": [
		487,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 204;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WelcomeService = (function () {
    function WelcomeService() {
    }
    WelcomeService.prototype.validateUser = function (mobile) {
        var personKeyRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/UserRef/" + mobile);
        return personKeyRef.once('value');
    };
    WelcomeService.prototype.getUserObject = function (uniqueKey) {
        var personObjectRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/Users/" + uniqueKey);
        return personObjectRef.once('value');
    };
    return WelcomeService;
}());
WelcomeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({}),
    __metadata("design:paramtypes", [])
], WelcomeService);

//# sourceMappingURL=welcome.service.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardPage = (function () {
    function DashboardPage(navCtrl, navParams, _googleMaps, _geoLoc, geocoder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._googleMaps = _googleMaps;
        this._geoLoc = _geoLoc;
        this.geocoder = geocoder;
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.initMap();
        }, 500);
    };
    DashboardPage.prototype.initMap = function () {
        var _this = this;
        var loc;
        var element = this.mapElement.nativeElement;
        this.map = this._googleMaps.create(element, { styles: [] });
        this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* GoogleMapsEvent */].MAP_READY).then(function () {
            _this._geoLoc.getCurrentPosition().then(function (res) {
                loc = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["d" /* LatLng */](res.coords.latitude, res.coords.longitude);
                _this.moveCamera(loc);
                _this.getLocationName(loc, res.coords.latitude, res.coords.longitude);
            }).catch(function (err) {
                alert('Failed to get current position: ' + err);
            });
        });
    };
    DashboardPage.prototype.moveCamera = function (loc) {
        var options = {
            target: loc,
            zoom: 15,
            tilt: 10
        };
        this.map.moveCamera(options);
    };
    DashboardPage.prototype.createMarker = function (loc, title) {
        var markerOptions = {
            position: loc,
            title: title,
            animation: 'DROP'
        };
        return this
            .map
            .addMarker(markerOptions);
    };
    DashboardPage.prototype.getLocationName = function (loc, latitude, longitude) {
        var _this = this;
        var latlng = {
            lat: latitude,
            lng: longitude
        };
        var req = {
            position: latlng
        };
        this.geocoder.geocode(req).then(function (res) {
            _this.createMarker(loc, res[1].extra.lines[0].split(","[0])).then(function (marker) {
                marker.showInfoWindow();
            }).catch(function (err) {
                alert("Failed to add marker: " + err);
            });
        }).catch(function (err) {
            alert('Failed to get location: ' + err);
        });
    };
    ;
    return DashboardPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], DashboardPage.prototype, "mapElement", void 0);
DashboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-dashboard',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/dashboard/dashboard.html"*/'<ion-content>\n    <div #map id="map" class="maparea">\n        <ion-card>\n            <ion-item>\n                <ion-input type="text" placeholder="Enter Source"></ion-input>\n            </ion-item>\n        </ion-card>\n        <ion-card>\n            <ion-item>\n                <ion-input type="text" placeholder="Enter Destination"></ion-input>\n            </ion-item>\n        </ion-card>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/dashboard/dashboard.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMaps */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* Geocoder */]])
], DashboardPage);

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(323);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_list_list__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_welcome_welcome__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_register_register__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_mobileauth_mobileauth__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_setting_setting__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_dashboard_dashboard__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_welcome_welcome_service__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var firebaseAuth = {
    apiKey: "AIzaSyCO42BxmWnDpkATYBkYqpWDEzr8OkHRBmo",
    authDomain: "taxiapp-8e144.firebaseapp.com",
    databaseURL: "https://taxiapp-8e144.firebaseio.com",
    projectId: "taxiapp-8e144",
    storageBucket: "taxiapp-8e144.appspot.com",
    messagingSenderId: "108631532738"
};
__WEBPACK_IMPORTED_MODULE_5_firebase___default.a.initializeApp(firebaseAuth);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_mobileauth_mobileauth__["a" /* MobileAuthPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_dashboard_dashboard__["a" /* DashboardPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobileauth/mobileauth.module#MobileauthPageModule', name: 'MobileAuthPage', segment: 'mobileauth', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/setting/setting.module#SettingPageModule', name: 'SettingPage', segment: 'setting', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAuth),
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["b" /* AngularFireDatabaseModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_mobileauth_mobileauth__["a" /* MobileAuthPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_dashboard_dashboard__["a" /* DashboardPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["b" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["a" /* Geocoder */],
            __WEBPACK_IMPORTED_MODULE_17__pages_welcome_welcome_service__["a" /* WelcomeService */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_setting_setting__ = __webpack_require__(151);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_6__pages_setting_setting__["a" /* SettingPage */] }
            // { title: 'Lists', component: ListPage}
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.logout = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_welcome_welcome__["a" /* WelcomePage */]);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="app-page">\n      <!-- <ion-card> -->\n          \n            <ion-item style="background:gray;\n            color: white;" padding>\n              <ion-avatar item-start>\n                <img src="assets/imgs/user-img.png">\n              </ion-avatar>\n              <h2>Marty McFly</h2>\n            </ion-item>\n            <!-- </ion-card> -->\n\n   \n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n    <ion-footer>\n        \n         <div class="btn-text-left" >\n            <button  menuToggle ion-button clear block no-margin (click)="logout()">Logout</button>\n            \n            <button  ion-button clear block no-margin>Legal</button>\n            \n                 <button   ion-button clear block no-margin> Drive with Taxi</button>\n       \n         </div>\n        \n          \n           \n         \n      </ion-footer>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = ListPage_1 = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    return ListPage;
}());
ListPage = ListPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/list/list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobileAuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(126);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MobileauthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MobileAuthPage = (function () {
    function MobileAuthPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.mobileNo = "";
        this.authcode = "";
        this.mobileNo = navParams.get("mobile");
    }
    MobileAuthPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MobileauthPage');
        this.recaptchaVerifier = new __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth.RecaptchaVerifier('recaptcha-container');
        this.sendVerificationCode();
    };
    MobileAuthPage.prototype.sendVerificationCode = function () {
        var _this = this;
        // this.navCtrl.push(HomePage)
        //this.navCtrl.setRoot(HomePage)
        //var navController = this.navCtrl;
        var appVerifier = this.recaptchaVerifier;
        var phoneNumberString = "+91" + this.mobileNo;
        console.log("Phone:" + phoneNumberString + "appVerifier:" + appVerifier);
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
            .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            _this.confirmResult = confirmationResult;
            // let prompt = this.alertCtrl.create({
            //   title: 'Enter the Confirmation code',
            //   inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
            //   buttons: [
            //     {
            //       text: 'Cancel',
            //       handler: data => { console.log('Cancel clicked'); }
            //     },
            //     {
            //       text: 'Send',
            //       handler: data => {
            //         confirmationResult.confirm(data.confirmationCode)
            //           .then(function (result) {
            //             // User signed in successfully.
            //             console.log(result.user);
            //             navController.setRoot(HomePage);
            //             // ...
            //           }).catch(function (error) {
            //             // User couldn't sign in (bad verification code?)
            //             // ...
            //             console.log(error);
            //           });
            //       }
            //     }
            //   ]
            // });
            // prompt.present();
        })
            .catch(function (error) {
            console.error("SMS not sent", error);
        });
    };
    MobileAuthPage.prototype.validateOTP = function (value) {
        var navController = this.navCtrl;
        var alertController = this.alertCtrl;
        if (this.authcode.length === 6) {
            this.confirmResult.confirm(this.authcode)
                .then(function (result) {
                // User signed in successfully.
                console.log(result.user);
                navController.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                // ...
            }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
                console.log(error);
                var alert = alertController.create({
                    title: 'OTP Authentication',
                    subTitle: 'Invalid code',
                    buttons: ['Dismiss']
                });
                alert.present();
            });
            //this.navCtrl.setRoot(HomePage);
        }
    };
    return MobileAuthPage;
}());
MobileAuthPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mobileauth',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/mobileauth/mobileauth.html"*/'<!--\n  Generated template for the MobileauthPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <!-- <ion-title>mobileauth</ion-title> -->\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div id="recaptcha-container"></div>\n    <h1 padding>Enter the 4 digit code sent to +91 <label [innerHTML]="mobileNo"></label></h1>\n\n    <ion-item padding text-center>\n        <ion-label floating>code</ion-label>\n        <ion-input type="tel" text-center maxlength="6" [(ngModel)]="authcode" value="" class="black-border" (ngModelChange)="validateOTP($event)"></ion-input>\n    </ion-item>\n\n    <ion-footer>\n        <ion-fab right bottom margin-right>\n            <button ion-fab color="dark" [hidden]="isHidden" (click)="goToAuthPage()"><ion-icon name="arrow-forward"></ion-icon></button>\n        </ion-fab>\n\n    </ion-footer>\n\n</ion-content>'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/mobileauth/mobileauth.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], MobileAuthPage);

//# sourceMappingURL=mobileauth.js.map

/***/ })

},[307]);
//# sourceMappingURL=main.js.map