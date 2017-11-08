webpackJsonp([7],{

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobileauth_mobileauth__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PasswordPage = (function () {
    function PasswordPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.userObject = navParams.get("user");
        this.mobile = navParams.get("mobile");
    }
    PasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PasswordPage');
    };
    PasswordPage.prototype.goToDashboard = function () {
        //console.log(this.password+" === "+this.userObject.password);
        if (this.password === this.userObject.password) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__["a" /* DashboardPage */], { user: this.userObject });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Password',
                subTitle: 'Invalid password',
                buttons: ['Dismiss']
            });
            alert_1.present();
        }
    };
    PasswordPage.prototype.goToMobileAuth = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__mobileauth_mobileauth__["a" /* MobileAuthPage */], { mobile: this.mobile });
    };
    return PasswordPage;
}());
PasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({ selector: 'page-password',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/password/password.html"*/'<ion-header>\n    <ion-navbar>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <label>Enter your password</label>\n    <ion-item>\n        <ion-input type="password" [(ngModel)]="password" required></ion-input>\n    </ion-item>\n</ion-content>\n<ion-footer>\n    <div float-start>\n        <button (click)="goToMobileAuth()" ion-button clear block class="btn-text-left" no-margin>I forgot my Password</button>\n    </div>\n    <ion-fab right bottom margin-right>\n        <button ion-fab color="dark" (click)="goToDashboard()"><ion-icon name="arrow-forward"></ion-icon></button>\n    </ion-fab>\n\n</ion-footer>'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/password/password.html"*/ }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], PasswordPage);

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mobileauth_mobileauth__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register_service__ = __webpack_require__(251);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterPage = (function () {
    function RegisterPage(formBuilder, navCtrl, navParams, regService) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.regService = regService;
        this.mobileNo = "";
        this.mobileNo = navParams.get("mobile");
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.register = this.formBuilder.group({
            firstName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            LastName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', this.validatorsEmail()],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            mobile: [this.mobileNo]
        });
    };
    RegisterPage.prototype.validatorsMobile = function () {
        return __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(10)]);
    };
    RegisterPage.prototype.validatorsEmail = function () {
        return __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].email]);
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
        console.log(this.register);
    };
    RegisterPage.prototype.logForm = function () {
        console.log(this.register.value);
        this.regService.registerUser(this.register.value);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__mobileauth_mobileauth__["a" /* MobileAuthPage */], { mobile: this.register.value.mobile, user: this.register.value });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/register/register.html"*/'<ion-header>\n    <ion-navbar>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <form [formGroup]="register" (ngSubmit)="logForm()">\n        <ion-grid>\n            <ion-row>\n                <ion-col col-6>\n                    <ion-item>\n                        <ion-label floating>First Name</ion-label>\n                        <ion-input type="text" formControlName="firstName"></ion-input>\n                    </ion-item>\n                    <div *ngIf="register?.controls[\'firstName\']?.errors?.required && register?.controls[\'firstName\'].touched">\n                        <p float-right class="error">* This Field is required</p>\n                    </div>\n                </ion-col>\n\n                <ion-col col-6>\n                    <ion-item>\n                        <ion-label floating>Last Name</ion-label>\n                        <ion-input type="text" formControlName="LastName"></ion-input>\n                    </ion-item>\n                    <div *ngIf="register?.controls[\'LastName\']?.errors?.required && register?.controls[\'LastName\'].touched">\n                        <p class="error" float-right>* This Field is required</p>\n                    </div>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Mobile</ion-label>\n                    <ion-input type="tel" formControlName="mobile" disabled=true style="color:black;"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'mobile\']?.errors?.required && register?.controls[\'mobile\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n\n                <ion-item>\n                    <ion-label floating>Email</ion-label>\n                    <ion-input type="text" formControlName="email"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'email\']?.errors?.required && register?.controls[\'email\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Password</ion-label>\n                    <ion-input type="password" formControlName="password"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'password\']?.errors?.required && register?.controls[\'password\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n\n        </ion-grid>\n\n        <ion-footer>\n            <!-- [disabled]="!register.valid" -->\n\n            <ion-fab right bottom margin-right>\n                <button ion-fab color="dark" type="submit"><ion-icon name="arrow-forward"></ion-icon></button>\n            </ion-fab>\n        </ion-footer>\n\n        <!--  -->\n    </form>\n\n\n</ion-content>'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/register/register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__register_register_service__["a" /* RegisterService */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
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

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register_register__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__welcome_service__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dashboard_dashboard__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__password_password__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user_model__ = __webpack_require__(255);
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
    function WelcomePage(navCtrl, navParams, service, loadingCtrl, fb, googlePlus, model, nativeStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.fb = fb;
        this.googlePlus = googlePlus;
        this.model = model;
        this.nativeStorage = nativeStorage;
        this.mobile = "";
        this.hideMobile = false;
        this.isHidden = true;
        this.provider = new __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth.FacebookAuthProvider();
        this.model = new __WEBPACK_IMPORTED_MODULE_10__user_model__["a" /* UserModel */]();
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
        this.provider.addScope('public_profile');
        this.provider.addScope('user_friends');
        this.provider.addScope('email');
        this.provider.setCustomParameters({
            'display': 'popup'
        });
    };
    WelcomePage.prototype.validateUser = function () {
        //this.navCtrl.setRoot(HomePage);
    };
    WelcomePage.prototype.goToRegisterPage = function () {
        console.log("going register");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__register_register__["a" /* RegisterPage */]);
    };
    WelcomePage.prototype.goToAuthPage = function () {
        var _this = this;
        //this.navCtrl.push(DashboardPage);
        var navController = this.navCtrl;
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
                    navController.push(__WEBPACK_IMPORTED_MODULE_9__password_password__["a" /* PasswordPage */], { mobile: _this.mobile, user: datasnap.val() });
                }).catch(function (er) {
                    console.log(er);
                });
            }
            else {
                console.log("No User found");
                loading.dismiss();
                navController.push(__WEBPACK_IMPORTED_MODULE_6__register_register__["a" /* RegisterPage */], { mobile: _this.mobile });
            }
        }).catch(function (er) {
            loading.dismiss();
            console.log(er);
        });
    };
    WelcomePage.prototype.facebookSignIn = function () {
        var _this = this;
        console.log("Facebook SingIn");
        this.fb.login(['public_profile', 'email'])
            .then(function (res) {
            console.log('Logged into Facebook!', res);
            _this.fb.api('/me?fields=email,name&access_token=' + res.authResponse.accessToken, null).then(function (response) {
                console.log(response);
                _this.model.userId = res.authResponse.userID;
                _this.model.email = response.email;
                _this.model.givenName = response.name;
                // this.model.userId = response.id;
                _this.model.photoUrl = "http://graph.facebook.com/" + res.authResponse.userID + "/picture?type=large";
                _this.model.givenName = response.name;
                _this.validateUserExistance(_this.model);
            }).catch(function (error) { return console.log(error); });
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    WelcomePage.prototype.googleSignIn = function () {
        var _this = this;
        this.googlePlus.login({})
            .then(function (res) {
            console.log(res);
            _this.model.email = res.email;
            _this.model.displayName = res.displayName;
            _this.model.familyName = res.familyName;
            _this.model.userId = res.userId;
            _this.model.givenName = res.givenName;
            _this.model.photoUrl = res.photoUrl;
            _this.validateUserExistance(_this.model);
        })
            .catch(function (err) { return console.error(err); });
    };
    WelcomePage.prototype.validateUserExistance = function (userModel) {
        var _this = this;
        var navController = this.navCtrl;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var promise = this.service.validateUserWithuserId(userModel.userId);
        promise.then(function (snapshot) {
            if (!snapshot.exists()) {
                console.log('No User found');
                _this.service.registerUser(userModel);
            }
            var userData = JSON.stringify(userModel);
            _this.nativeStorage.setItem('userData', userData)
                .then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error storing item', error); });
            _this.nativeStorage.setItem('isLoggedIn', true).then(function () { }, function (error) { });
            loading.dismiss();
            navController.setRoot(__WEBPACK_IMPORTED_MODULE_8__dashboard_dashboard__["a" /* DashboardPage */]);
        }).catch(function (er) {
            console.log("Error" + er);
            loading.dismiss();
        });
    };
    return WelcomePage;
}());
WelcomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-welcome',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/welcome/welcome.html"*/'<ion-content>\n    <div>\n        <img src="assets/imgs/bg.jpg" alt="bg" class="full-img">\n    </div>\n    <h1 text-left padding>Get Moving with Taxi</h1>\n\n    <ion-grid>\n        <ion-row>\n            <!-- <ion-col col-2>\n                <ion-label id="code91" padding-left>+91</ion-label>\n            </ion-col> -->\n            <ion-col col-10>\n                <!-- <ion-item>\n                    <ion-label floating>Enter your mobile number</ion-label>\n                    <ion-input [(ngModel)]=" mobile" name="mobile" type="tel" maxlength="10" (ngModelChange)="validateMobile($event)"></ion-input>\n                </ion-item> -->\n                <a class="facebook-sign-in" ion-button clear block no-margin (click)="facebookSignIn()">\n                    Log in with Facebook\n                </a>\n            </ion-col>\n            <ion-col col-10>\n                <a class="google-sign-in" ion-button clear block no-margin (click)="googleSignIn()">\n                    <span class="btn-copy">Sign in with Google</span>\n                </a>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-footer>\n        <!-- <div float-start>\n        <button  (click)="goToRegisterPage()" ion-button clear block class="btn-text-left" no-margin>I forgot my Password</button>\n       \n        <button (click)="goToAuthPage()" ion-button clear block no-margin [hidden]="isHidden"> I don\'t have an account</button>\n      </div> -->\n\n        <ion-fab right bottom margin-right>\n            <button ion-fab color="dark" [hidden]="isHidden" (click)="goToAuthPage()"><ion-icon name="arrow-forward"></ion-icon></button>\n        </ion-fab>\n    </ion-footer>\n\n\n</ion-content>'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/welcome/welcome.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__welcome_service__["a" /* WelcomeService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_10__user_model__["a" /* UserModel */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_storage__["a" /* NativeStorage */]])
], WelcomePage);

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 164:
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
webpackEmptyAsyncContext.id = 164;

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/dashboard/dashboard.module": [
		488,
		6
	],
	"../pages/login/login.module": [
		489,
		5
	],
	"../pages/mobileauth/mobileauth.module": [
		490,
		4
	],
	"../pages/password/password.module": [
		491,
		3
	],
	"../pages/register/register.module": [
		492,
		2
	],
	"../pages/setting/setting.module": [
		493,
		1
	],
	"../pages/welcome/welcome.module": [
		494,
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
webpackAsyncContext.id = 206;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(59);
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


var RegisterService = (function () {
    function RegisterService() {
    }
    RegisterService.prototype.registerUser = function (user) {
        var personObj = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/Users/");
        var keyValueRef = personObj.push();
        //console.log(keyValueRef.key);
        keyValueRef.set({
            'firstname': user.firstname,
            'lastname': user.LastName,
            'email': user.email,
            'password': user.password
        });
        var userRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/UserRef");
        userRef.child(user.mobile).set(keyValueRef.key);
    };
    return RegisterService;
}());
RegisterService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({}),
    __metadata("design:paramtypes", [])
], RegisterService);

//# sourceMappingURL=register.service.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(59);
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
    WelcomeService.prototype.validateUserWithuserId = function (userId) {
        var personKeyRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/UserRef/" + userId);
        return personKeyRef.once('value');
    };
    WelcomeService.prototype.registerUser = function (user) {
        var personObj = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/Users/");
        var keyValueRef = personObj.push();
        //console.log(keyValueRef.key);
        keyValueRef.set({
            'firstname': user.givenName,
            'lastname': user.familyName,
            'email': user.email,
            //'photoUrl': user.photoUrl,
            'userId': user.userId,
            'displayName': user.displayName
        });
        var userRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/UserRef");
        userRef.child(user.userId).set(keyValueRef.key);
    };
    return WelcomeService;
}());
WelcomeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({}),
    __metadata("design:paramtypes", [])
], WelcomeService);

//# sourceMappingURL=welcome.service.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());
UserModel = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({})
], UserModel);

//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
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
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.arrData = [];
        // this.navCtrl.setRoot(HomePage)
        this.Trips = "Past";
        // this.fdb.list("/Users/").push("list1");
    }
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar hideBackButton>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>My Trips</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3 ion-button clear align-center>Book your Ride</h3>\n  <div padding>\n      <ion-segment [(ngModel)]="Trips">\n        <ion-segment-button value="Past">\n            Past\n        </ion-segment-button>\n        <ion-segment-button value="Upcommings">\n            Upcommings\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n    \n    <div [ngSwitch]="Trips">\n      <ion-list *ngSwitchCase="\'Past\'">\n        <ion-item>\n          <!-- <ion-thumbnail item-start>\n             <img src="img/thumbnail-puppy-1.jpg">\n          </ion-thumbnail> -->\n          <p>8/24/17 at 04.19</p>\n        </ion-item>\n      </ion-list>\n    \n      <ion-list *ngSwitchCase="\'Upcommings\'">\n        <ion-item>\n          <!-- <ion-thumbnail item-start>\n            <img src="img/thumbnail-kitten-1.jpg"> \n          </ion-thumbnail> -->\n          <p>9/12/17 at 01.40</p>\n        </ion-item>\n        \n      </ion-list>\n    </div>\n\n  <!-- <button ion-button secondary menuToggle>Toggle Menu</button> -->\n</ion-content>\n'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
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

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(328);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_storage__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_list_list__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_welcome_welcome__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_login_login__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_register_register__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_mobileauth_mobileauth__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_setting_setting__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_dashboard_dashboard__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_password_password__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_welcome_welcome_service__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_register_register_service__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_welcome_user_model__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__ = __webpack_require__(309);
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
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_mobileauth_mobileauth__["a" /* MobileAuthPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_dashboard_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_password_password__["a" /* PasswordPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobileauth/mobileauth.module#MobileauthPageModule', name: 'MobileAuthPage', segment: 'mobileauth', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/password/password.module#PasswordPageModule', name: 'PasswordPage', segment: 'password', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/setting/setting.module#SettingPageModule', name: 'SettingPage', segment: 'setting', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAuth),
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabaseModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_mobileauth_mobileauth__["a" /* MobileAuthPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_dashboard_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_password_password__["a" /* PasswordPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["b" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["a" /* Geocoder */],
            __WEBPACK_IMPORTED_MODULE_21__pages_welcome_welcome_service__["a" /* WelcomeService */],
            __WEBPACK_IMPORTED_MODULE_22__pages_register_register_service__["a" /* RegisterService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */],
                useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */]
            },
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_23__pages_welcome_user_model__["a" /* UserModel */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_storage__["a" /* NativeStorage */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_maps__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(210);
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
    function DashboardPage(navCtrl, navParams, _googleMaps, _geoLoc, geocoder, nativeStorage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._googleMaps = _googleMaps;
        this._geoLoc = _geoLoc;
        this.geocoder = geocoder;
        this.nativeStorage = nativeStorage;
    }
    DashboardPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.initMap();
        }, 500);
        this.nativeStorage.getItem('userData')
            .then(function (data) { return console.log(data); }, function (error) { return console.error(error); });
    };
    DashboardPage.prototype.initMap = function () {
        var _this = this;
        var loc;
        var element = this.mapElement.nativeElement;
        this.map = this._googleMaps.create(element, { styles: [] });
        this.map.one(__WEBPACK_IMPORTED_MODULE_3__ionic_native_google_maps__["c" /* GoogleMapsEvent */].MAP_READY).then(function () {
            _this._geoLoc.getCurrentPosition().then(function (res) {
                loc = new __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_maps__["d" /* LatLng */](res.coords.latitude, res.coords.longitude);
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
        selector: 'page-dashboard',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/dashboard/dashboard.html"*/'<ion-header no-border transparent>\n    <ion-navbar transparent>\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div #map id="map" class="maparea">\n        <ion-card>\n            <!-- <ion-item>\n                <ion-input type="text" placeholder="Enter Source"></ion-input>\n            </ion-item> -->\n        </ion-card>\n        <ion-card>\n            <ion-item>\n                <ion-input type="text" placeholder="Where to Drop?"></ion-input>\n            </ion-item>\n        </ion-card>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/dashboard/dashboard.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_maps__["b" /* GoogleMaps */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_google_maps__["a" /* Geocoder */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */]])
], DashboardPage);

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_setting_setting__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__ = __webpack_require__(48);
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
    function MyApp(platform, statusBar, splashScreen, nativeStorage) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.nativeStorage = nativeStorage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__["a" /* DashboardPage */];
        this.initializeApp();
        var isLoggedIn = this.nativeStorage.getItem("isLoggedIn").then(function () {
            if (isLoggedIn) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__["a" /* DashboardPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */];
            }
        }, function (error) { });
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Ride', component: __WEBPACK_IMPORTED_MODULE_8__pages_dashboard_dashboard__["a" /* DashboardPage */] },
            { title: 'My Trips', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
            { title: 'Settings', component: __WEBPACK_IMPORTED_MODULE_7__pages_setting_setting__["a" /* SettingPage */] }
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
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */]);
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
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
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

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobileAuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__ = __webpack_require__(48);
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
    function MobileAuthPage(navCtrl, navParams, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.mobileNo = "";
        this.authcode = "";
        this.verification_code = "";
        this.mobileNo = navParams.get("mobile");
        this.userObj = navParams.get("user");
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
        //firebase.auth().p
        // (<any>window).FirebasePlugin.verifyPhoneNumber(phoneNumberString, 60, cred => {
        //   var credentials = firebase.auth.PhoneAuthProvider.credential(this.verification_code, this.authcode);
        //   firebase.auth().signInWithCredential(credentials).then((snap) => {
        //     console.log(snap);
        //   }, error => {
        //     console.error("SMS not sent", error);
        //   });
        // });
        // (<any>window).FirebasePlugin.getVerificationID(phoneNumberString, id => {
        //   this.verification_code = id;
        //   console.log("Verification;" + id);
        // }, error => {
        //   console.error("SMS not sent", error);
        // });
        __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
            .then(function (confirmationResult) {
            _this.confirmResult = confirmationResult;
        })
            .catch(function (error) {
            console.error("SMS not sent", error);
        });
    };
    MobileAuthPage.prototype.validateOTP = function (value) {
        var navController = this.navCtrl;
        var alertController = this.alertCtrl;
        if (this.authcode.length === 6) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            this.confirmResult.confirm(this.authcode)
                .then(function (result) {
                // User signed in successfully.
                console.log(result.user);
                navController.setRoot(__WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__["a" /* DashboardPage */]);
                loading_1.dismiss();
            }).catch(function (error) {
                // User couldn't sign in (bad verification code?)
                // ...
                loading_1.dismiss();
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
    MobileAuthPage.prototype.change = function (e) {
        console.log(e);
        // e.preventDefault();
        var control;
        control = e.srcElement.nextElementSibling;
        if (e.srcElement.nextElementSibling) {
            e.srcElement.nextElementSibling.focus();
        }
        else {
            console.log('close keyboard');
        }
        return;
    };
    return MobileAuthPage;
}());
MobileAuthPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-mobileauth',template:/*ion-inline-start:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/mobileauth/mobileauth.html"*/'<!--\n  Generated template for the MobileauthPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <!-- <ion-title>mobileauth</ion-title> -->\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div id="recaptcha-container"></div>\n    <h1 padding>Enter the 6 digit code sent to +91 <label [innerHTML]="mobileNo"></label></h1>\n\n    <ion-item padding text-center>\n        <ion-label floating>code</ion-label>\n        <ion-input type="tel" text-center maxlength="6" [(ngModel)]="authcode" value="" class="black-border" (ngModelChange)="validateOTP($event)"></ion-input>\n    </ion-item>\n\n    <ion-footer>\n        <ion-fab right bottom margin-right>\n            <button ion-fab color="dark" [hidden]="isHidden" (click)="goToAuthPage()"><ion-icon name="arrow-forward"></ion-icon></button>\n        </ion-fab>\n\n    </ion-footer>\n\n</ion-content>'/*ion-inline-end:"/Users/NagarajuBhusani/Desktop/Nagaraju/Ionic/TaxiDemoApp/TaxiDemo/src/pages/mobileauth/mobileauth.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], MobileAuthPage);

//# sourceMappingURL=mobileauth.js.map

/***/ })

},[312]);
//# sourceMappingURL=main.js.map