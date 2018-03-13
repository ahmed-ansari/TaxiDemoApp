webpackJsonp([12],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
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
    RegisterService.prototype.validateUser = function (driver) {
        var personKeyRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/Drivers/" + driver);
        return personKeyRef.once('value');
    };
    RegisterService.prototype.registerUser = function (driverRef, user) {
        var personObj = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/Drivers/");
        // var keyValueRef = personObj.push();
        var data = {
            // 'driverName': user.driverName,
            // 'license': user.license,
            // 'email': user.email,
            // 'phone': user.phone,
            'profilePhoto': (typeof user.profilePhoto != "undefined") ? user.profilePhoto : "",
            // 'address': user.address,
            'make': user.make,
            'model': user.model,
            'year': user.year,
            'regnum': user.regnum,
            'uin': user.uin,
            'vehiclePhoto': (typeof user.vehiclePhoto != "undefined") ? user.vehiclePhoto : "",
        };
        personObj.child(driverRef).update(data);
        // const userRef: firebase.database.Reference = firebase.database().ref(`/UserRef`);
        // userRef.child(user.mobile).set(keyValueRef.key);
    };
    RegisterService.prototype.uploadProfileImage = function (imageString, timeStamp) {
        var image = timeStamp, storageRef, parseUpload;
        return new Promise(function (resolve, reject) {
            storageRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.storage().ref('profile/' + image);
            console.log("Storage Ref::", storageRef);
            parseUpload = storageRef.putString(imageString, 'data_url', { contentType: 'image/jpg' });
            parseUpload.on('state_changed', function (_snapshot) {
                // We could log the progress here IF necessary
                console.log('snapshot progess ' + _snapshot);
            }, function (_err) {
                reject(_err);
            }, function (success) {
                resolve(parseUpload.snapshot);
            });
        });
    };
    RegisterService.prototype.uploadVehicleImage = function (imageString, timeStamp) {
        var image = timeStamp, storageRef, parseUpload;
        return new Promise(function (resolve, reject) {
            storageRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.storage().ref('vehicle/' + image);
            parseUpload = storageRef.putString(imageString, 'data_url', { contentType: 'image/jpg' });
            parseUpload.on('state_changed', function (_snapshot) {
                // We could log the progress here IF necessary
                console.log('snapshot progess ' + _snapshot);
            }, function (_err) {
                reject(_err);
            }, function (success) {
                resolve(parseUpload.snapshot);
            });
        });
    };
    return RegisterService;
}());
RegisterService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({}),
    __metadata("design:paramtypes", [])
], RegisterService);

//# sourceMappingURL=register.service.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__static_map__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__history_service__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__welcome_user_model__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ridedetail_ridedetail__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_Broadcast__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HistoryPage = (function () {
    function HistoryPage(navCtrl, map, service, nativeStorage, broadcaster, alertCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.map = map;
        this.service = service;
        this.nativeStorage = nativeStorage;
        this.broadcaster = broadcaster;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.arrData = [];
        this.rides = [];
        this.staticMapArray = [];
        this.today = new Date();
        this.Trips = "Upcoming";
        this.user = new __WEBPACK_IMPORTED_MODULE_5__welcome_user_model__["c" /* UserModel */]();
        this.nativeStorage.getItem('userData')
            .then(function (response) {
            var jsonObj = response;
            // this.user.userId = jsonObj.userId;
            _this.user.email = jsonObj.email;
            // this.user.givenName = jsonObj.name;
            // this.user.displayName = jsonObj.displayName;
            // this.user.photoUrl = jsonObj.photoUrl;
            //this.locations =
            _this.broadcaster.broadcast('user', { "user": jsonObj });
            _this.getRideHistory();
        }, function (error) { return console.error(error); });
        this.registerStringBroadcast();
    }
    HistoryPage.prototype.getRideHistory = function () {
        var _this = this;
        this.rides = [];
        var loading = this.loadingCtrl.create({
            content: 'Please wait while loading rides...'
        });
        loading.present();
        var promise = this.service.getConfirmedRideRequests();
        promise.then(function (snapshot) {
            var ridesData = snapshot.val();
            var keys = Object.keys(ridesData);
            console.log("User Rides" + JSON.stringify(snapshot.val()));
            console.log(keys);
            for (var key in keys) {
                console.log("Value:::", ridesData[keys[key]]);
                var childKeys = Object.keys(ridesData[keys[key]]);
                var childsData = ridesData[keys[key]];
                console.log("childKeys:::", childKeys);
                for (var child in childKeys) {
                    console.log("child:::", child);
                    _this.ride = childsData[childKeys[child]].model;
                    _this.rides.push(_this.ride);
                    console.log("Rides:::", _this.ride);
                }
            }
            loading.dismiss();
        }).catch(function (er) {
            loading.dismiss();
            console.log(er);
        });
    };
    HistoryPage.prototype.goToRideDetail = function (index) {
        console.log("going..", index);
        this.ride = this.rides[index];
        console.log("ride", this.ride);
        var mapImage = this.map.getStaticMapSnapFromAddress(this.ride.pickupAddress, this.ride.dropoffAddress);
        console.log("Static Map", mapImage);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__ridedetail_ridedetail__["a" /* RidedetailPage */], { params: this.ride, map: mapImage });
    };
    HistoryPage.prototype.registerStringBroadcast = function () {
        var _this = this;
        this.broadcaster.on('RideRequests')
            .subscribe(function (rideRequest) {
            console.log("Received Request:::", rideRequest);
            _this.rideConfirm(rideRequest);
        });
    };
    HistoryPage.prototype.rideConfirm = function (rideRequest) {
        var scope = this;
        var alert = this.alertCtrl.create({
            title: 'Ride Request',
            message: 'Do you want to accept this ride?',
            buttons: [
                {
                    text: 'Deny',
                    role: 'cancel',
                    handler: function () {
                        console.log('Denied');
                        scope.service.updateRideStatus(false, rideRequest);
                    }
                },
                {
                    text: 'Accept',
                    handler: function () {
                        console.log('Accepted');
                        scope.service.updateRideStatus(true, rideRequest);
                    }
                }
            ]
        });
        alert.present();
    };
    return HistoryPage;
}());
HistoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-history',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/history/history.html"*/'<ion-header>\n    <ion-navbar class="black-bg">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>My Rides</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <div>\n        <ion-segment [(ngModel)]="Trips">\n            <!-- <ion-segment-button value="Today">\n                Today\n            </ion-segment-button> -->\n\n            <ion-segment-button value="Upcoming" (ionSelect)="getRideHistory()">\n                Upcoming\n            </ion-segment-button>\n            <ion-segment-button value="Past">\n                Past\n            </ion-segment-button>\n        </ion-segment>\n    </div>\n\n    <div [ngSwitch]="Trips">\n        <ion-list *ngSwitchCase="\'Upcoming\'">\n            <div no-lines *ngFor="let ride of rides; let i = index" [attr.data-index]="i" (click)="goToRideDetail(i)">\n                <ion-card *ngIf="ride.travelDate >= today">\n\n                    <ion-card-content>\n                        <ion-card-title>\n                            <label class="date "> {{ride.dropoffAddress}}</label>\n                        </ion-card-title>\n                        <ion-row>\n                            <ion-col col-9>\n                                <label class="date ">{{ride.travelDate | date: \'MM/dd/yyyy\'}}</label>\n                                <label class="at ">at</label>\n                                <label class="time ">{{ride.travelDate | date: \'HH:mm\'}}</label>\n                            </ion-col>\n                            <ion-col col-3>\n                                <label class="rs ">$ {{ride.fareValue}}</label>\n                            </ion-col>\n                        </ion-row>\n                    </ion-card-content>\n                </ion-card>\n            </div>\n        </ion-list>\n\n        <ion-list *ngSwitchCase=" \'Past\' ">\n            <div no-lines *ngFor="let ride of rides; let i = index" [attr.data-index]="i" (click)="goToRideDetail(i)">\n                <ion-card *ngIf="today > ride.travelDate">\n\n                    <ion-card-content>\n                        <ion-card-title>\n                            <label class="date "> {{ride.dropoffAddress}}</label>\n                        </ion-card-title>\n                        <ion-row>\n                            <ion-col col-9>\n                                <label class="date ">{{ride.travelDate | date: \'MM/dd/yyyy\'}}</label>\n                                <label class="at ">at</label>\n                                <label class="time ">{{ride.travelDate | date: \'HH:mm\'}}</label>\n                            </ion-col>\n                            <ion-col col-3>\n                                <label class="rs ">$ {{ride.fareValue}}</label>\n                            </ion-col>\n                        </ion-row>\n                    </ion-card-content>\n                </ion-card>\n            </div>\n        </ion-list>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/history/history.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__static_map__["a" /* StaticMapAPI */], __WEBPACK_IMPORTED_MODULE_4__history_service__["a" /* HistoryService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_7__providers_Broadcast__["a" /* Broadcaster */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], HistoryPage);

//# sourceMappingURL=history.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Broadcaster; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);



var Broadcaster = (function () {
    function Broadcaster() {
        this._eventBus = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
    }
    Broadcaster.prototype.broadcast = function (key, dataSnap) {
        this._eventBus.next({ key: key, dataSnap: dataSnap });
    };
    Broadcaster.prototype.on = function (key) {
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.dataSnap; });
    };
    return Broadcaster;
}());

//# sourceMappingURL=Broadcast.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_maps__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_date_picker__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_local_notifications__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__autocomplete_autocomplete__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__welcome_user_model__ = __webpack_require__(48);
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
    function DashboardPage(navCtrl, navParams, _googleMaps, _geoLoc, geocoder, nativeStorage, modalCtrl, loadingCtrl, events, datePicker, localNotifications) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._googleMaps = _googleMaps;
        this._geoLoc = _geoLoc;
        this.geocoder = geocoder;
        this.nativeStorage = nativeStorage;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.datePicker = datePicker;
        this.localNotifications = localNotifications;
        this.bottomSheet = false;
        this.directionsService = new google.maps.DirectionsService;
        this.timeTillArrival = 0;
        this.cancel = false;
        this.distance = 0;
        this.fareValue = 0;
        this.user = new __WEBPACK_IMPORTED_MODULE_9__welcome_user_model__["c" /* UserModel */]();
        var context = this;
        this.nativeStorage.getItem('userData')
            .then(function (response) {
            var jsonObj = JSON.parse(response);
            // context.user.userId = jsonObj.userId;
            context.user.email = jsonObj.email;
            // context.user.givenName = jsonObj.name;
            // context.user.displayName = jsonObj.displayName;
            // context.user.photoUrl = jsonObj.photoUrl;
            // context.events.publish('user:logged', context.user.displayName);
            // context.events.publish('user:logged:url', context.user.photoUrl);
        }, function (error) { return console.error(error); });
    }
    DashboardPage.prototype.ngOnInit = function () {
        var _this = this;
        this.initMap();
        this.addMapEventListeners();
        this.getCurrentLocation().subscribe(function (location) {
            _this.centerLocation(location);
        });
        this.localNotifications.on('click', function (notificationData) {
            var rideData = JSON.parse(notificationData.data);
            console.log('Notification clicked...', rideData);
            this.currentAddress = rideData.source;
            this.destinationAddress = rideData.destination;
        });
    };
    DashboardPage.prototype.addMapEventListeners = function () {
        var _this = this;
        google.maps.event.addListener(this.map, 'dragstart', function () {
            _this.isMapIdle = false;
        });
        google.maps.event.addListener(this.map, 'idle', function () {
            _this.isMapIdle = true;
        });
    };
    DashboardPage.prototype.getCurrentLocation = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Locating...'
        });
        loading.present(loading);
        var options = { timeout: 10000, enableHighAccuracy: true };
        var locationObs = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observable) {
            _this._geoLoc.getCurrentPosition(options)
                .then(function (resp) {
                var lat = resp.coords.latitude;
                var lng = resp.coords.longitude;
                var location = new google.maps.LatLng(lat, lng);
                console.log('Geolocation: ' + location);
                observable.next(location);
                loading.dismiss();
            }, function (err) {
                console.log('Geolocation err: ' + err);
                loading.dismiss();
            });
        });
        return locationObs;
    };
    DashboardPage.prototype.centerLocation = function (location) {
        var _this = this;
        if (location) {
            this.map.panTo(location);
            this.source = location;
            //this.addMarker(location, null);
            this.getLocationName(location);
        }
        else {
            this.getCurrentLocation().subscribe(function (currentLocation) {
                _this.map.panTo(currentLocation);
                _this.source = currentLocation;
                //this.addMarker(currentLocation, null);
                _this.getLocationName(currentLocation);
            });
        }
    };
    DashboardPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad");
    };
    DashboardPage.prototype.ionViewDidEnter = function () {
        console.log("ionViewDidEnter");
        this.resetUserScreen();
        //this.address.place = "";
    };
    DashboardPage.prototype.initMap = function () {
        var loc;
        var element = this.mapElement.nativeElement;
        var scope = this;
        var mapOptions = {
            center: loc,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(element, mapOptions);
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(this.map);
        return this.map;
    };
    DashboardPage.prototype.addMarker = function (source, dest, address) {
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: source
        });
        var content = "<h4>Information!</h4>";
        if (source != null) {
            this.addInfoWindow(marker, null, address);
        }
        else {
            this.addInfoWindow(null, marker, address);
        }
    };
    DashboardPage.prototype.addInfoWindow = function (sourceMarker, destMarker, address) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: address
        });
        var marker;
        if (sourceMarker != null) {
            this.sourceMarker = sourceMarker;
            marker = sourceMarker;
        }
        else {
            this.destMarker = destMarker;
            marker = destMarker;
        }
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    DashboardPage.prototype.getLocationName = function (loc) {
        var _this = this;
        var latlng = {
            lat: loc.lat(),
            lng: loc.lng()
        };
        var req = {
            position: latlng
        };
        new google.maps.Geocoder().geocode({ 'location': latlng }, function (res, status) {
            console.log("Result::::" + res);
            _this.addMarker(loc, null, res[0].formatted_address);
            _this.currentAddress = res[0].formatted_address;
        });
    };
    ;
    DashboardPage.prototype.showAddressModal = function () {
        var _this = this;
        var modal = this
            .modalCtrl
            .create(__WEBPACK_IMPORTED_MODULE_8__autocomplete_autocomplete__["a" /* AutocompletePage */]);
        var me = this;
        modal.onDidDismiss(function (data) {
            _this.destinationAddress = data;
            _this.geoCode(data);
        });
        modal.present();
    };
    DashboardPage.prototype.geoCode = function (address) {
        var _this = this;
        var geocoder = new google
            .maps
            .Geocoder();
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            var latitude = results[0]
                .geometry
                .location
                .lat();
            var longitude = results[0]
                .geometry
                .location
                .lng();
            var loc = new google.maps.LatLng(latitude, longitude);
            _this.destination = loc;
            _this.addMarker(null, loc, "Destination");
            _this.calculateAndDisplayRoute();
        });
    };
    DashboardPage.prototype.calculateAndDisplayRoute = function () {
        var _request = {
            origin: this.source,
            destination: this.destination,
            travelMode: 'DRIVING'
        };
        var scope = this;
        this.sourceMarker.setMap(null);
        this.destMarker.setMap(null);
        this.destMarker = null;
        var loading = this.loadingCtrl.create({
            content: 'Updating route and fare...'
        });
        loading.present();
        this.directionsService.route(_request, function (_response, _status) {
            if (_status == google.maps.DirectionsStatus.OK) {
                scope.directionsDisplay.setDirections(_response);
                var point = _response.routes[0].legs[0];
                var miles_1 = point.distance.value * 0.000621371;
                scope.distance = miles_1.toFixed(2);
                setTimeout(function () {
                    scope.timeTillArrival = scope.getTimeInMins(point.duration.value);
                    scope.calculateFareValue(miles_1);
                    scope.bottomSheet = true;
                    loading.dismiss();
                }, 2000);
            }
        });
    };
    DashboardPage.prototype.getDistanceBetweenPoints = function (start, end, units) {
        var earthRadius = {
            miles: 3958.8,
            km: 6371
        };
        var R = earthRadius[units || 'miles'];
        var lat1 = start.lat();
        var lon1 = start.lng();
        var lat2 = end.lat();
        var lon2 = end.lng();
        var dLat = this.toRad((lat2 - lat1));
        var dLon = this.toRad((lon2 - lon1));
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    DashboardPage.prototype.toRad = function (x) {
        return x * Math.PI / 180;
    };
    DashboardPage.prototype.calculateFareValue = function (distance) {
        var baseFare = 3;
        var add_mile = 1.95;
        this.fareValueWithoutSymbol = (((distance * add_mile) + baseFare).toFixed(2));
        this.fareValue = this.fareValueWithoutSymbol;
        return this.fareValue;
    };
    DashboardPage.prototype.getTimeInMins = function (seconds) {
        var minutes = Math.floor(seconds / 60);
        return minutes;
    };
    DashboardPage.prototype.resetUserScreen = function () {
        //this.destMarker = null;
        // if (this.directionsDisplay != null) {
        //   this.directionsDisplay.setMap(null);
        //   this.directionsDisplay = null;
        //   this.initMap();
        // }
        this.bottomSheet = false;
        //this.directionsDisplay.setMap(this.map);
    };
    DashboardPage.prototype.rideNow = function () {
        // let rideModel = new RideModel(this.currentAddress, this.destinationAddress, this.fareValue, this.distance,
        // this.timeTillArrival, "Amand Sharma", "MX 1284 Lincoln", this.user.userId, Date.now());
        // this.navCtrl.push(PaymentPage, { model: rideModel });
    };
    DashboardPage.prototype.rideLater = function () {
        var _this = this;
        this.datePicker.show({ date: new Date(), mode: 'datetime', androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK })
            .then(function (date) {
            console.log('Got date: ', date);
            _this.localNotifications.schedule({
                id: 1,
                title: 'Taxi App',
                text: 'Your ride is scheduled now!',
                //sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
                data: {
                    "source": _this.currentAddress,
                    "destination": _this.destinationAddress
                },
                at: date
            });
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    DashboardPage.prototype.cancelRide = function () {
        var _this = this;
        if (this.directionsDisplay != null) {
            this.directionsDisplay.setMap(null);
            this.directionsDisplay = null;
            this.initMap();
        }
        this.cancel = false;
        this.getCurrentLocation().subscribe(function (location) {
            _this.centerLocation(location);
        });
    };
    return DashboardPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('map'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], DashboardPage.prototype, "mapElement", void 0);
DashboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({ selector: 'page-dashboard',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/dashboard/dashboard.html"*/'<ion-header>\n    <ion-navbar class="black-bg">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Taxi</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-item>\n        <ion-input (click)="showAddressModal()" [(ngModel)]="currentAddress" type="text" placeholder="Pickup" disabled></ion-input>\n    </ion-item>\n    <ion-item>\n        <ion-input (click)="showAddressModal()" [(ngModel)]="destinationAddress" type="text" placeholder="Where to Drop?" disabled></ion-input>\n    </ion-item>\n    <div #map id="map" class="maparea">\n\n    </div>\n\n    <div class="bottom request-controls" *ngIf="bottomSheet">\n        <ion-row align-items-center>\n            <ion-col width-50 class="fare-col">\n                <!-- <button block ion-button (click)="makePayment()">\n                    <ion-icon name="card"></ion-icon>\n                    Visa **34 {{fareValue}}\n                </button> -->\n                <ion-label class="fare-label">Fare</ion-label>\n                <ion-item no-lines>\n                    <ion-label class="fare-value-label">$ {{fareValue}}</ion-label>\n                </ion-item>\n            </ion-col>\n            <ion-col width-50>\n                <!-- <button block ion-button>\n                    <ion-icon name="cash"></ion-icon>\n                    Cash {{fareValue}}\n                </button> -->\n                <ion-label class="fare-label">Distance</ion-label>\n                <ion-item no-lines>\n\n                    <ion-label class="map-label">{{distance}} Miles</ion-label>\n                </ion-item>\n                <ion-label class="fare-label">Approx. time</ion-label>\n                <ion-item no-lines>\n                    <ion-label class="map-label">{{timeTillArrival}} Mins</ion-label>\n                </ion-item>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col width-50>\n                <button ion-button block primary class="map-button-text" (click)="rideNow()">Ride Now</button>\n            </ion-col>\n            <ion-col width-50>\n                <button ion-button block secondary (click)="rideLater()">Ride Later</button>\n            </ion-col>\n        </ion-row>\n        <!-- <ion-row *ngIf="cancel">\n            <ion-col width-100>\n                <button ion-button (click)="cancelRide()">Cancel Ride</button>\n            </ion-col>\n        </ion-row> -->\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/dashboard/dashboard.html"*/ }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_maps__["b" /* GoogleMaps */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_maps__["a" /* Geocoder */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_date_picker__["a" /* DatePicker */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_local_notifications__["a" /* LocalNotifications */]])
], DashboardPage);

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__welcome_user_model__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__welcome_welcome_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register_register_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_app_constants__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EditAccountPage = (function () {
    function EditAccountPage(formBuilder, navCtrl, navParams, camera, actionSheetCtrl, welcomeService, regService, nativeStorage, toastCtrl, launchNavigator, constants) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.welcomeService = welcomeService;
        this.regService = regService;
        this.nativeStorage = nativeStorage;
        this.toastCtrl = toastCtrl;
        this.launchNavigator = launchNavigator;
        this.constants = constants;
        this.imageSrc = "assets/imgs/profile_photo.png";
        this.vehicleSrc = "assets/imgs/vehicle_photo.png";
        this.profileFilename = '';
        this.vehicleFilename = '';
        this.vehicle = this.formBuilder.group({
            make: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            model: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            year: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            regno: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            uinnumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
        this.nativeStorage.getItem('userData').then(function (response) {
            console.log("Native Storage User", response);
            _this.name = response.driverName;
            _this.email = response.email;
            _this.mobile = response.mobile;
            _this.storageData = response;
            _this.vehicleFilename = response.vehiclePhoto;
            _this.profileFilename = response.profilePhoto;
            _this.imageSrc = (response.profilePhoto != null && response.profilePhoto != "") ? constants.getFirebaseImageUrl(response.profilePhoto) : "assets/imgs/profile_photo.png";
            _this.vehicle.value.make = _this.storageData.make;
            _this.vehicle.value.model = _this.storageData.mdel;
            _this.vehicle.value.year = _this.storageData.year;
            _this.vehicle.value.regno = _this.storageData.regnum;
            _this.vehicle.value.uinnumber = _this.storageData.uin;
            _this.vehicleSrc = (_this.storageData.vehiclePhoto != null && response.profilePhoto != "") ? constants.getFirebaseVehicleImageUrl(_this.storageData.vehiclePhoto) : "assets/imgs/vehicle_photo.png";
            _this.vehicle.setValue({
                make: _this.storageData.make,
                model: _this.storageData.model,
                year: _this.storageData.year,
                regno: _this.storageData.regnum,
                uinnumber: _this.storageData.uin
            });
        }, function (error) { return console.error(error); });
    }
    EditAccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditAccountPage');
    };
    EditAccountPage.prototype.ngOnInit = function () {
    };
    EditAccountPage.prototype.logForm = function () {
        var _this = this;
        console.log(this.vehicle.value);
        if (!this.formValid(this.vehicle)) {
            return;
        }
        if (!this.vehicle.invalid && this.vehicle.status == "VALID") {
            this.userModel = new __WEBPACK_IMPORTED_MODULE_4__welcome_user_model__["c" /* UserModel */]();
            this.userModel.driverName = this.storageData.driverName;
            this.userModel.license = this.storageData.driverLicense;
            this.userModel.phone = this.storageData.phone;
            this.userModel.address = this.storageData.address;
            this.userModel.email = this.storageData.email;
            //this.userModel.profilePhoto = (this.storageData.profilePhoto != null)?this.storageData.profilePhoto:"";
            this.userModel.make = this.vehicle.value.make;
            this.userModel.model = this.vehicle.value.model;
            this.userModel.year = this.vehicle.value.year;
            this.userModel.regnum = this.vehicle.value.regno;
            this.userModel.uin = this.vehicle.value.uinnumber;
            if (this.vehicleFilename != null && this.vehicleFilename != "") {
                this.userModel.vehiclePhoto = this.vehicleFilename;
            }
            if (this.profileFilename != null && this.profileFilename != "") {
                this.userModel.profilePhoto = this.profileFilename;
            }
            console.log("Profile", this.profileFilename);
            this.nativeStorage.setItem("userData", this.userModel).then(function () { }, function (error) { });
            var encodedEmail = this.welcomeService.encodeEmail(this.email);
            this.regService.registerUser(encodedEmail, this.userModel).then(function () {
                _this.toastCtrl.create({
                    message: 'Profile updated successfully',
                    duration: 3000,
                    position: 'bottom'
                }).present();
            }, function (error) { });
        }
    };
    EditAccountPage.prototype.formValid = function (formGroup) {
        return !Object.keys(formGroup.controls)
            .map(function (controlName) { return formGroup.controls[controlName]; })
            .filter(function (control) {
            control.markAsTouched();
            control.updateValueAndValidity();
            return !control.valid;
        }).length;
    };
    EditAccountPage.prototype.launchPicOptions = function (imageType) {
        var _this = this;
        console.log('launch it');
        var cameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.PictureSourceType.CAMERA
        };
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.takePicture(cameraOptions, imageType);
                    }
                },
                {
                    text: 'Pick from Gallery',
                    handler: function () {
                        _this.getImageFromGallery(imageType);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    EditAccountPage.prototype.takePicture = function (cameraOptions, imageType) {
        var _this = this;
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var profilePromise = null;
            if (imageType === 0) {
                _this.imageSrc = base64Image;
                _this.profileFilename = Math.floor(Date.now() / 1000) + '.jpg';
                profilePromise = _this.regService.uploadProfileImage(_this.imageSrc, _this.profileFilename);
            }
            else {
                _this.vehicleSrc = base64Image;
                _this.vehicleFilename = Math.floor(Date.now() / 1000) + '.jpg';
                profilePromise = _this.regService.uploadProfileImage(_this.vehicleSrc, _this.vehicleFilename);
            }
            profilePromise.then(function (datasnap) {
                console.log("Profile Updated" + JSON.stringify(datasnap.val()));
            }).catch(function (er) {
                console.log(er);
            });
        }, function (err) {
            console.log('Error captuing photo: ', err);
        });
    };
    EditAccountPage.prototype.getImageFromGallery = function (imageType) {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var profilePromise = null;
            if (imageType === 0) {
                _this.imageSrc = base64Image;
                _this.profileFilename = Math.floor(Date.now() / 1000) + '.jpg';
                profilePromise = _this.regService.uploadProfileImage(_this.imageSrc, _this.profileFilename);
            }
            else {
                _this.vehicleSrc = base64Image;
                _this.vehicleFilename = Math.floor(Date.now() / 1000) + '.jpg';
                profilePromise = _this.regService.uploadProfileImage(_this.vehicleSrc, _this.vehicleFilename);
            }
            profilePromise.then(function (datasnap) {
                console.log("Profile Updated" + JSON.stringify(datasnap.val()));
            }).catch(function (er) {
                console.log(er);
            });
            console.log('base 64 image: ', base64Image);
        }, function (err) {
            console.log('Error captuing photo: ', err);
        });
    };
    EditAccountPage.prototype.navigateToMaps = function () {
        var options = {
            start: 'DLF Gachibowli Hyderabad Telangana India'
        };
        this.launchNavigator.navigate('Lingampally Hyderabad Telangana India', options).then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    return EditAccountPage;
}());
EditAccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-account',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/edit-account/edit-account.html"*/'<ion-header>\n    <ion-navbar class="black-bg">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Edit Account</ion-title>\n        <!-- <ion-buttons end>\n            <button ion-button clear (click)="navigateToMaps()">Done</button>\n        </ion-buttons> -->\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-grid>\n        <ion-row>\n            <ion-col col-4>\n                <ion-avatar>\n                    <img src="{{this.imageSrc}}" class="round-img" (click)="launchPicOptions(0)">\n                </ion-avatar>\n            </ion-col>\n            <ion-col col-8>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <form [formGroup]="vehicle" (ngSubmit)="logForm()">\n        <ion-grid>\n            <ion-row>\n                <ion-item>\n                    <ion-label stacked>Name</ion-label>\n                    <ion-label>{{this.name}}</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label stacked>Mobile</ion-label>\n                    <ion-label>{{this.mobile}}</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label stacked>Email</ion-label>\n                    <ion-label>{{this.email}}</ion-label>\n                </ion-item>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label stacked>Make</ion-label>\n                    <ion-input type="text" formControlName="make"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'make\']?.errors?.required && vehicle?.controls[\'make\'].touched">\n                    <p float-right class="error">* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label stacked>Model</ion-label>\n                    <ion-input type="text" formControlName="model"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'model\']?.errors?.required && vehicle?.controls[\'model\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label stacked>Year</ion-label>\n                    <ion-input type="text" formControlName="year" style="color:black;"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'year\']?.errors?.required && vehicle?.controls[\'year\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label stacked>Reg No</ion-label>\n                    <ion-input type="text" formControlName="regno" style="color:black;"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'regno\']?.errors?.required && vehicle?.controls[\'regno\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label stacked>VIN Number</ion-label>\n                    <ion-input type="text" formControlName="uinnumber" style="color:black;"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'uinnumber\']?.errors?.required && vehicle?.controls[\'uinnumber\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-col width-50>\n                    <ion-label>Vehicle Image</ion-label>\n                </ion-col>\n                <ion-col width-50>\n                    <img class="vehicle-img" src="{{this.vehicleSrc}}" (click)="launchPicOptions(1)" />\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <button ion-button block type="submit">Done</button>\n            </ion-row>\n        </ion-grid>\n    </form>\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/edit-account/edit-account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_5__welcome_welcome_service__["a" /* WelcomeService */], __WEBPACK_IMPORTED_MODULE_6__register_register_service__["a" /* RegisterService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
        __WEBPACK_IMPORTED_MODULE_9__app_app_constants__["a" /* Constants */]])
], EditAccountPage);

//# sourceMappingURL=edit-account.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VehicledetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__history_history__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__welcome_user_model__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__welcome_welcome_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_storage__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var VehicledetailsPage = (function () {
    function VehicledetailsPage(formBuilder, navCtrl, navParams, camera, actionSheetCtrl, regService, menu, welcomeService, nativeStorage) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.regService = regService;
        this.menu = menu;
        this.welcomeService = welcomeService;
        this.nativeStorage = nativeStorage;
        this.filename = '';
        this.menu.swipeEnable(false);
        this.userModel = new __WEBPACK_IMPORTED_MODULE_6__welcome_user_model__["c" /* UserModel */]();
        var driverInfo = this.navParams.get("driver");
        this.userModel.driverName = driverInfo.driverName;
        this.userModel.license = driverInfo.driverLicense;
        this.userModel.phone = driverInfo.phone;
        this.userModel.password = driverInfo.password;
        this.userModel.address = driverInfo.address;
        this.userModel.email = driverInfo.email;
        this.userModel.profilePhoto = (driverInfo.photoUrl != null) ? driverInfo.photoUrl : "";
    }
    VehicledetailsPage.prototype.ngOnInit = function () {
        this.vehicle = this.formBuilder.group({
            make: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            model: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            year: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            regno: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            uinnumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    };
    VehicledetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VehicledetailsPage');
    };
    VehicledetailsPage.prototype.logForm = function () {
        console.log(this.vehicle.value);
        if (!this.formValid(this.vehicle)) {
            return;
        }
        if (!this.vehicle.invalid && this.vehicle.status == "VALID") {
            this.userModel.make = this.vehicle.value.make;
            this.userModel.model = this.vehicle.value.model;
            this.userModel.year = this.vehicle.value.year;
            this.userModel.regnum = this.vehicle.value.regno;
            this.userModel.uin = this.vehicle.value.uinnumber;
            this.userModel.vehiclePhoto = this.filename;
            var encodedEmail = this.welcomeService.encodeEmail(this.userModel.email);
            this.regService.registerUser(encodedEmail, this.userModel);
            this.nativeStorage.setItem("userData", this.userModel).then(function () { }, function (error) { });
            this.welcomeService.updateDriverLoginStatus(this.welcomeService.encodeEmail(this.userModel.email), true);
            this.nativeStorage.setItem("isLoggedIn", true).then(function () { }, function (error) { });
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__history_history__["a" /* HistoryPage */]);
        }
    };
    VehicledetailsPage.prototype.formValid = function (formGroup) {
        return !Object.keys(formGroup.controls)
            .map(function (controlName) { return formGroup.controls[controlName]; })
            .filter(function (control) {
            control.markAsTouched();
            control.updateValueAndValidity();
            return !control.valid;
        }).length;
    };
    VehicledetailsPage.prototype.launchPicOptions = function () {
        var _this = this;
        console.log('launch it');
        var cameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.PictureSourceType.CAMERA
        };
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.takePicture(cameraOptions);
                    }
                },
                {
                    text: 'Pick from Gallery',
                    handler: function () {
                        _this.getImageFromGallery();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    VehicledetailsPage.prototype.takePicture = function (cameraOptions) {
        var _this = this;
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.vehicleSrc = base64Image;
            _this.filename = Math.floor(Date.now() / 1000) + '.jpg';
            var profilePromise = _this.regService.uploadVehicleImage(_this.vehicleSrc, _this.filename);
            profilePromise.then(function (datasnap) {
                console.log("Profile Updated" + JSON.stringify(datasnap.val()));
            }).catch(function (er) {
                console.log(er);
            });
        }, function (err) {
            console.log('Error captuing photo: ', err);
        });
    };
    VehicledetailsPage.prototype.getImageFromGallery = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.vehicleSrc = base64Image;
            _this.filename = Math.floor(Date.now() / 1000) + '.jpg';
            var profilePromise = _this.regService.uploadVehicleImage(_this.vehicleSrc, _this.filename);
            profilePromise.then(function (datasnap) {
                console.log("Profile Updated" + JSON.stringify(datasnap.val()));
            }).catch(function (er) {
                console.log(er);
            });
            console.log('base 64 image: ', base64Image);
        }, function (err) {
            console.log('Error captuing photo: ', err);
        });
    };
    return VehicledetailsPage;
}());
VehicledetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-vehicledetails',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/vehicledetails/vehicledetails.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Vehicle detail</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <form [formGroup]="vehicle" (ngSubmit)="logForm()">\n        <ion-grid>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Make</ion-label>\n                    <ion-input type="text" formControlName="make"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'make\']?.errors?.required && vehicle?.controls[\'make\'].touched">\n                    <p float-right class="error">* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Model</ion-label>\n                    <ion-input type="text" formControlName="model"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'model\']?.errors?.required && vehicle?.controls[\'model\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Year</ion-label>\n                    <ion-input type="text" formControlName="year" style="color:black;"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'year\']?.errors?.required && vehicle?.controls[\'year\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Reg No</ion-label>\n                    <ion-input type="text" formControlName="regno" style="color:black;"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'regno\']?.errors?.required && vehicle?.controls[\'regno\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>VIN Number</ion-label>\n                    <ion-input type="text" formControlName="uinnumber" style="color:black;"></ion-input>\n                </ion-item>\n                <div *ngIf="vehicle?.controls[\'uinnumber\']?.errors?.required && vehicle?.controls[\'uinnumber\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <img class="round-img" src="{{this.vehicleSrc}}" />\n                <button ion-button (click)="launchPicOptions()" type="button">Upload Vehicle Image</button>\n            </ion-row>\n        </ion-grid>\n        <ion-footer>\n            <ion-fab right bottom margin-right>\n                <button ion-fab color="dark" type="submit"><ion-icon name="arrow-forward"></ion-icon></button>\n            </ion-fab>\n        </ion-footer>\n    </form>\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/vehicledetails/vehicledetails.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_5__register_register_service__["a" /* RegisterService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_7__welcome_welcome_service__["a" /* WelcomeService */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_storage__["a" /* NativeStorage */]])
], VehicledetailsPage);

//# sourceMappingURL=vehicledetails.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Constants = (function () {
    function Constants() {
    }
    Constants.prototype.getFirebaseImageUrl = function (imageName) {
        return "https://firebasestorage.googleapis.com/v0/b/taxiapp-8e144.appspot.com/o/profile%2F" + imageName + "?alt=media";
    };
    Constants.prototype.getFirebaseVehicleImageUrl = function (imageName) {
        return "https://firebasestorage.googleapis.com/v0/b/taxiapp-8e144.appspot.com/o/vehicle%2F" + imageName + "?alt=media";
    };
    return Constants;
}());
Constants = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], Constants);

//# sourceMappingURL=app.constants.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaticMapAPI; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StaticMapAPI = (function () {
    function StaticMapAPI(http) {
        this.http = http;
    }
    StaticMapAPI.prototype.getMapSnap = function (sLat, sLng, dLat, dLng) {
        var url = "https://maps.googleapis.com/maps/api/staticmap?markers=color:green|label:S|" +
            sLat + "," + sLng + "&markers=color:red|label:D|" + dLat + "," + dLng + "&path=color:0x00000080|" +
            sLat + "," + sLng + "|" + dLat + "," + dLng + "&zoom=10&size=600x320&key=AIzaSyCQHYSFVpwuo2aMuOOaW8yBQ7vpdfH8oGA";
        console.log(url);
        return url;
    };
    StaticMapAPI.prototype.getStaticMapSnapFromAddress = function (sAddress, dAddress) {
        var url = "https://maps.googleapis.com/maps/api/staticmap?markers=color:green|label:S|" +
            sAddress + "&markers=color:red|label:D|" + dAddress + "&path=color:0x00000080|" +
            sAddress + "|" + dAddress + "&zoom=10&size=600x320&key=AIzaSyCQHYSFVpwuo2aMuOOaW8yBQ7vpdfH8oGA";
        //console.log(url);
        return url;
    };
    return StaticMapAPI;
}());
StaticMapAPI = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({}),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
], StaticMapAPI);

//# sourceMappingURL=static.map.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutocompletePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AutocompletePage = (function () {
    function AutocompletePage(viewCtrl, zone) {
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        this.latitude = 0;
        this.longitude = 0;
        this.service = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }
    AutocompletePage.prototype.dismiss = function () {
        this
            .viewCtrl
            .dismiss();
    };
    AutocompletePage.prototype.chooseItem = function (item) {
        this
            .viewCtrl
            .dismiss(item);
        this.geo = item;
        //this.geoCode(this.geo); //convert Address to lat and long
    };
    AutocompletePage.prototype.updateSearch = function () {
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        var me = this;
        this
            .service
            .getPlacePredictions({
            input: this.autocomplete.query,
            componentRestrictions: {
                country: 'IN'
            }
        }, function (predictions, status) {
            me.autocompleteItems = [];
            me
                .zone
                .run(function () {
                predictions
                    .forEach(function (prediction) {
                    me
                        .autocompleteItems
                        .push(prediction.description);
                });
            });
        });
    };
    return AutocompletePage;
}());
AutocompletePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({ selector: 'page-autocomplete',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/autocomplete/autocomplete.html"*/'<ion-header>\n    <ion-toolbar>\n        <!-- <ion-searchbar placeholder="Enter Source" [(ngModel)]="autocomplete.query" [showCancelButton]="true" (ionInput)="updateSearch()" (ionCancel)="dismiss()"></ion-searchbar> -->\n        <ion-searchbar placeholder="Enter Destination" [(ngModel)]="autocomplete.query" [showCancelButton]="true" (ionInput)="updateSearch()" (ionCancel)="dismiss()"></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-item *ngFor="let item of autocompleteItems" tappable (click)="chooseItem(item)">\n            {{ item }}\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/autocomplete/autocomplete.html"*/ }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */]])
], AutocompletePage);

//# sourceMappingURL=autocomplete.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobileAuthPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__ = __webpack_require__(119);
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
        selector: 'page-mobileauth',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/mobileauth/mobileauth.html"*/'<!--\n  Generated template for the MobileauthPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <!-- <ion-title>mobileauth</ion-title> -->\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div id="recaptcha-container"></div>\n    <h1 padding>Enter the 6 digit code sent to +91 <label [innerHTML]="mobileNo"></label></h1>\n\n    <ion-item padding text-center>\n        <ion-label floating>code</ion-label>\n        <ion-input type="tel" text-center maxlength="6" [(ngModel)]="authcode" value="" class="black-border" (ngModelChange)="validateOTP($event)"></ion-input>\n    </ion-item>\n\n    <ion-footer>\n        <ion-fab right bottom margin-right>\n            <button ion-fab color="dark" [hidden]="isHidden" (click)="goToAuthPage()"><ion-icon name="arrow-forward"></ion-icon></button>\n        </ion-fab>\n\n    </ion-footer>\n\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/mobileauth/mobileauth.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], MobileAuthPage);

//# sourceMappingURL=mobileauth.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobileauth_mobileauth__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__history_history__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__welcome_welcome_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__vehicledetails_vehicledetails__ = __webpack_require__(121);
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
    function PasswordPage(formBuilder, navCtrl, navParams, alertCtrl, nativeStorage, welcomeService) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.nativeStorage = nativeStorage;
        this.welcomeService = welcomeService;
        this.email = navParams.get("email");
        // this.mobile = navParams.get("mobile");
        //console.log(navParams.get("email"))
        this.object = navParams.get("object");
    }
    PasswordPage.prototype.ngOnInit = function () {
        this.login = this.formBuilder.group({
            email: [this.email, this.validatorsEmail()],
            password: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required]
        });
        // this.login.value.email = "as"
    };
    PasswordPage.prototype.validatorsEmail = function () {
        return __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].email]);
    };
    PasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PasswordPage');
    };
    PasswordPage.prototype.logForm = function () {
        var context = this;
        this.login.controls['email'].markAsTouched();
        this.login.controls['password'].markAsTouched();
        if (!this.login.invalid && this.login.status == "VALID") {
            if (this.login.value.password === this.object.password) {
                if (!this.object.loggedIn && this.object.active) {
                    this.nativeStorage.setItem("isLoggedIn", true).then(function () { }, function (error) { });
                    this.nativeStorage.setItem("userData", context.object).then(function () { }, function (error) { });
                    if (this.object.model != null) {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__history_history__["a" /* HistoryPage */]);
                        this.welcomeService.updateDriverLoginStatus(this.welcomeService.encodeEmail(context.email), true);
                    }
                    else {
                        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__vehicledetails_vehicledetails__["a" /* VehicledetailsPage */], { driver: this.object });
                    }
                }
                else {
                    var alert_1 = this.alertCtrl.create({
                        title: 'Login',
                        subTitle: 'This account is already using in another device, please contact admin.',
                        buttons: ['Ok']
                    });
                    alert_1.present();
                }
            }
            else {
                this.presentAlert();
            }
        }
    };
    PasswordPage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Login',
            subTitle: 'Please enter valid credentials',
            buttons: ['Ok']
        });
        alert.present();
    };
    PasswordPage.prototype.goToDashboard = function () {
        //console.log(this.password+" === "+this.userObject.password);
        if (this.password === this.userObject.password) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__dashboard_dashboard__["a" /* DashboardPage */], { user: this.userObject });
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Password',
                subTitle: 'Invalid password',
                buttons: ['Dismiss']
            });
            alert_2.present();
        }
    };
    PasswordPage.prototype.goToMobileAuth = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__mobileauth_mobileauth__["a" /* MobileAuthPage */], { mobile: this.mobile });
    };
    PasswordPage.prototype.forgotPassword = function () {
        var alert = this.alertCtrl.create({
            title: 'Login',
            subTitle: 'Please contact admin for reset password.',
            buttons: ['Ok']
        });
        alert.present();
    };
    return PasswordPage;
}());
PasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({ selector: 'page-password',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/password/password.html"*/'<ion-header>\n    <ion-navbar>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n    <form [formGroup]="login" (ngSubmit)="logForm()">\n        <ion-grid>\n            <br>\n            <br>\n            <ion-row>\n\n                <ion-item>\n                    <ion-label floating>Email</ion-label>\n                    <ion-input type="text" formControlName="email"></ion-input>\n                </ion-item>\n                <div *ngIf="login?.controls[\'email\']?.errors?.required && login?.controls[\'email\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n\n            <ion-row>\n\n                <ion-item>\n                    <ion-label floating>Password</ion-label>\n                    <ion-input type="password" formControlName="password"></ion-input>\n                </ion-item>\n                <div *ngIf="login?.controls[\'password\']?.errors?.required && login?.controls[\'password\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n\n\n\n        </ion-grid>\n\n        <ion-footer>\n            <!-- [disabled]="!register.valid" -->\n            <div float-start>\n                <button (click)="forgotPassword()" ion-button clear block class="btn-text-left" no-margin type="button">I forgot my Password</button>\n            </div>\n\n            <ion-fab right bottom margin-right>\n                <button ion-fab color="dark" type="submit">\n                    <ion-icon name="arrow-forward"></ion-icon>\n                </button>\n            </ion-fab>\n        </ion-footer>\n\n    </form>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/password/password.html"*/ }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_7__welcome_welcome_service__["a" /* WelcomeService */]])
], PasswordPage);

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RidedetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_launch_navigator__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__welcome_welcome_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__welcome_user_model__ = __webpack_require__(48);
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
 * Generated class for the RidedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RidedetailPage = (function () {
    function RidedetailPage(navCtrl, navParams, launchNavigator, welcome) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.launchNavigator = launchNavigator;
        this.welcome = welcome;
        this.user = new __WEBPACK_IMPORTED_MODULE_4__welcome_user_model__["a" /* AppUser */]();
        console.log('params', this.navParams);
        this.ride = this.navParams.get("params");
        console.log("ride", this.ride);
        this.staticMap = this.navParams.get("map");
        console.log('ionViewDidLoad RidedetailPage');
        this.getUserDetails(this.ride.userId);
    }
    RidedetailPage.prototype.ionViewDidLoad = function () {
    };
    RidedetailPage.prototype.navigateToMaps = function () {
        var options = {
            start: this.ride.pickupAddress
        };
        this.launchNavigator.navigate(this.ride.dropoffAddress, options).then(function (success) { return console.log('Launched navigator'); }, function (error) { return console.log('Error launching navigator', error); });
    };
    RidedetailPage.prototype.getUserDetails = function (userId) {
        var _this = this;
        var promise = this.welcome.validateUserWithuserId(userId);
        promise.then(function (snapShot) {
            console.log("Key Ref:::", snapShot.val());
            var userPomise = _this.welcome.getAppUserDetails(snapShot.val());
            userPomise.then(function (data) {
                _this.user = data.val();
                console.log("Ride Details User", JSON.stringify(data.val()));
                console.log("Ride Details User", data);
            }).catch(function (er) {
                console.log(er);
            });
        }).catch(function (er) {
            console.log(er);
        });
    };
    RidedetailPage.prototype.callUser = function () {
        window.location.href = "tel://" + this.user.mobile;
    };
    return RidedetailPage;
}());
RidedetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-ridedetail',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/ridedetail/ridedetail.html"*/'<ion-header>\n\n    <ion-navbar class="black-bg">\n        <ion-title>\n            <label class="white">Trip Details</label>\n        </ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-item>\n        <ion-row>\n            <div class=" mapImage ">\n                <img src="{{this.staticMap}}" (click)="navigateToMaps()" />\n            </div>\n        </ion-row>\n        <ion-row text-wrap>\n            <ion-col col-1>\n                <ion-icon name="square"></ion-icon>\n            </ion-col>\n            <ion-col col-9>\n                <label class="address " text-wrap>\n                    {{ride.pickupAddress}}</label>\n            </ion-col>\n        </ion-row>\n        <ion-row text-wrap>\n            <ion-col col-1>\n                <ion-icon name="square"></ion-icon>\n            </ion-col>\n            <ion-col col-9>\n                <label class="address " text-wrap>\n                    {{ride.dropoffAddress}}</label>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col col-9>\n                <label class="date ">{{ride.travelDate | date: \'MM/dd/yyyy\'}}</label>\n                <label class="at ">at</label>\n                <label class="time ">{{ride.travelDate | date: \'HH:mm\'}}</label>\n            </ion-col>\n            <ion-col col-3>\n                <label class="rs ">$ {{ride.fareValue}}</label>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col col-4>\n                <ion-avatar>\n                    <img src="{{user.photoUrl}}" class="round-img">\n                </ion-avatar>\n            </ion-col>\n            <ion-col col-8>\n                <label class="car ">{{user.displayName}}</label>\n            </ion-col>\n\n        </ion-row>\n        <ion-row>\n            <ion-col col-8>\n                <button ion-button icon-left ion-ios7-telephone (click)="callUser()">Call {{user.mobile}}</button>\n            </ion-col>\n        </ion-row>\n    </ion-item>\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/ridedetail/ridedetail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
        __WEBPACK_IMPORTED_MODULE_3__welcome_welcome_service__["a" /* WelcomeService */]])
], RidedetailPage);

//# sourceMappingURL=ridedetail.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetFarePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SetFarePage = (function () {
    function SetFarePage(formBuilder, navCtrl, navParams) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.hourlyRatesArray = ["Per Hour", "Min Hour", "Tips"];
    }
    SetFarePage.prototype.ngOnInit = function () {
        this.setFare = this.formBuilder.group({
            vehicleType: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            flagDrop: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern["/^[0-9]*$/"]],
            eachAdditionalMile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            airportToll: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            fuelSurcharge: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            timeFare: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            hourlyRates: this.formBuilder.array([])
        });
    };
    SetFarePage.prototype.onChange = function (c) {
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
        }
        else {
            this.setFare.controls["hourlyRates"] = this.formBuilder.array([]);
            this.selected = '';
        }
    };
    SetFarePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SetFarePage');
    };
    SetFarePage.prototype.logForm = function () {
        // console.log("submitted")
        console.log(this.setFare);
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
    };
    SetFarePage.prototype.formValid = function (formGroup) {
        return !Object.keys(formGroup.controls)
            .map(function (controlName) { return formGroup.controls[controlName]; })
            .filter(function (control) {
            // console.log("comiong",control)
            control.markAsTouched();
            control.updateValueAndValidity();
            return !control.valid;
        }).length;
    };
    return SetFarePage;
}());
SetFarePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-set-fare',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/set-fare/set-fare.html"*/'<ion-header>\n    <ion-navbar class="black-bg">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Set Fare</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <form [formGroup]="setFare" (ngSubmit)="logForm()">\n        <ion-grid>\n            <br>\n            <br>\n            <ion-row>\n\n                <ion-item>\n                    <ion-label class="label-color-black">Vehicle Type</ion-label>\n                    <ion-select #v (ionChange)="onChange(v.value)" formControlName="vehicleType">\n                        <ion-option value="taxi">TAXI</ion-option>\n                        <ion-option value="sedan">SEDAN</ion-option>\n                        <ion-option value="suv">SUV</ion-option>\n                        <ion-option value="van">PASSENGER VAN</ion-option>\n                        <ion-option value="limo">STRETCH LIMO</ion-option>\n                    </ion-select>\n                </ion-item>\n                <div *ngIf="setFare?.controls[\'vehicleType\']?.errors?.required && setFare?.controls[\'vehicleType\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n\n                <ion-item>\n                    <ion-label floating>Flag Drop</ion-label>\n                    <ion-input type="number" formControlName="flagDrop" style="color:black;"></ion-input>\n\n\n                </ion-item>\n                <div *ngIf="setFare?.controls[\'flagDrop\']?.errors?.required && setFare?.controls[\'flagDrop\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n                <div *ngIf="setFare?.controls[\'flagDrop\']?.errors?.pattern && setFare?.controls[\'flagDrop\'].touched">\n                        <p class="error" float-right>* Invalid Number</p>\n                    </div>\n\n\n\n                <ion-item>\n                    <ion-label floating>Each Additional Mile</ion-label>\n                    <ion-input type="number" formControlName="eachAdditionalMile" style="color:black;"></ion-input>\n\n\n                </ion-item>\n                <div *ngIf="setFare?.controls[\'eachAdditionalMile\']?.errors?.required && setFare?.controls[\'eachAdditionalMile\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n\n                <ion-item>\n                    <ion-label floating>Airport Toll</ion-label>\n                    <ion-input type="number" formControlName="airportToll" style="color:black;"></ion-input>\n\n\n                </ion-item>\n                <div *ngIf="setFare?.controls[\'airportToll\']?.errors?.required && setFare?.controls[\'airportToll\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n\n\n\n\n                <ion-item>\n                    <ion-label floating>Fuel Surcharge</ion-label>\n                    <ion-input type="number" formControlName="fuelSurcharge" style="color:black;"></ion-input>\n\n\n                </ion-item>\n                <div *ngIf="setFare?.controls[\'fuelSurcharge\']?.errors?.required && setFare?.controls[\'fuelSurcharge\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n                <ion-item>\n                    <ion-label floating>Time Fare</ion-label>\n                    <ion-input type="number" formControlName="timeFare" style="color:black;"></ion-input>\n\n\n                </ion-item>\n                <div *ngIf="setFare?.controls[\'timeFare\']?.errors?.required && setFare?.controls[\'timeFare\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n\n\n\n            <ion-row>\n                <div formArrayName="hourlyRates" style="width: 100%">\n                    <div *ngFor="let prop of setFare.get(\'hourlyRates\').controls; let i =  index">\n                        <ion-item>\n                            <ion-label floating> {{hourlyRatesArray[i]}}</ion-label>\n                            <ion-input type="number" [formControlName]="i" style="color:black;"></ion-input>\n\n                        </ion-item>\n                        <div *ngIf="setFare?.controls[\'hourlyRates\'].controls[i]?.errors?.required && setFare?.controls[\'hourlyRates\'].controls[i]?.touched">\n                            <p class="error">* This Field is required</p>\n                        </div>\n                    </div>\n                </div>\n            </ion-row>\n            <!-- <input type="text" class="form-control" [formControlName]="i"> -->\n\n\n\n        </ion-grid>\n        <ion-footer>\n            <ion-fab right bottom margin-right>\n                <button ion-fab color="dark" type="submit">\n                    <ion-icon name="arrow-forward"></ion-icon>\n                </button>\n\n            </ion-fab>\n        </ion-footer>\n    </form>\n\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/set-fare/set-fare.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], SetFarePage);

//# sourceMappingURL=set-fare.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__welcome_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__password_password__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_RideService__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WelcomePage = (function () {
    function WelcomePage(formBuilder, navCtrl, navParams, service, loadingCtrl, menu, rideService, alertCtrl) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.menu = menu;
        this.rideService = rideService;
        this.alertCtrl = alertCtrl;
        this.menu.swipeEnable(false);
        this.rideService.subscribeForRideRequests();
    }
    WelcomePage.prototype.ngOnInit = function () {
        this.login = this.formBuilder.group({
            email: ['', this.validatorsEmail()]
        });
    };
    WelcomePage.prototype.validatorsEmail = function () {
        return __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].email]);
    };
    WelcomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WelcomePage');
        console.log(this.login);
    };
    WelcomePage.prototype.validateUser = function () {
        var _this = this;
        //this.navCtrl.setRoot(HomePage);
        var navController = this.navCtrl;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var encodedEmail = this.service.encodeEmail(this.login.value.email);
        var promise = this.service.validateUser(encodedEmail);
        promise.then(function (snapshot) {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                loading.dismiss();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__password_password__["a" /* PasswordPage */], { email: _this.login.value.email, object: snapshot.val() });
            }
            else {
                console.log("No User found");
                loading.dismiss();
                var alert_1 = _this.alertCtrl.create({
                    title: 'Login',
                    subTitle: 'Please contact admin for your account access.',
                    buttons: ['Ok']
                });
                alert_1.present();
                //this.navCtrl.push(VehicledetailsPage, { email: this.login.value.email })
            }
        }).catch(function (er) {
            loading.dismiss();
            console.log(er);
        });
    };
    WelcomePage.prototype.logForm = function () {
        console.log(this.login.value);
        this.login.controls['email'].markAsTouched();
        if (!this.login.invalid && this.login.status == "VALID") {
            this.validateUser();
            //this.navCtrl.push(RegisterPage)
        }
    };
    WelcomePage.prototype.goToAuthPage = function () {
        //this.navCtrl.push(DashboardPage);
        var navController = this.navCtrl;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
    };
    return WelcomePage;
}());
WelcomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-welcome',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/welcome/welcome.html"*/'<ion-content>\n    <div>\n        <img src="assets/imgs/logo.png" alt="bg" class="full-img">\n    </div>\n    <form [formGroup]="login" (ngSubmit)="logForm()">\n        <ion-grid>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Email</ion-label>\n                    <ion-input type="text" formControlName="email"></ion-input>\n                </ion-item>\n                <div float-right *ngIf="login?.controls[\'email\']?.errors?.required && login?.controls[\'email\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n                <div float-right *ngIf="login?.controls[\'email\']?.errors?.email && login?.controls[\'email\'].dirty">\n                    <p class="error" float-right>* Invalid Email</p>\n                </div>\n            </ion-row>\n        </ion-grid>\n        <ion-row>\n            <ion-fab right bottom margin-right>\n                <button ion-fab color="dark" type="submit"><ion-icon name="arrow-forward"></ion-icon></button>\n            </ion-fab>\n        </ion-row>\n        <!-- <ion-footer>\n            <ion-fab right bottom margin-right>\n                <button ion-fab color="dark" type="submit"><ion-icon name="arrow-forward"></ion-icon></button>\n            </ion-fab>\n        </ion-footer> -->\n    </form>\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/welcome/welcome.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__welcome_service__["a" /* WelcomeService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_4__providers_RideService__["a" /* RideService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
], WelcomePage);

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 213:
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
webpackEmptyAsyncContext.id = 213;

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/autocomplete/autocomplete.module": [
		781,
		11
	],
	"../pages/dashboard/dashboard.module": [
		782,
		10
	],
	"../pages/edit-account/edit-account.module": [
		783,
		9
	],
	"../pages/login/login.module": [
		784,
		8
	],
	"../pages/mobileauth/mobileauth.module": [
		785,
		7
	],
	"../pages/password/password.module": [
		786,
		6
	],
	"../pages/register/register.module": [
		787,
		5
	],
	"../pages/ridedetail/ridedetail.module": [
		788,
		4
	],
	"../pages/set-fare/set-fare.module": [
		789,
		3
	],
	"../pages/setting/setting.module": [
		790,
		2
	],
	"../pages/vehicledetails/vehicledetails.module": [
		791,
		1
	],
	"../pages/welcome/welcome.module": [
		792,
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
webpackAsyncContext.id = 256;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HistoryService = (function () {
    function HistoryService() {
    }
    HistoryService.prototype.getUserHistory = function (userId) {
        var rideHistory = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref("/RideHistory/" + userId);
        return rideHistory.once('value');
    };
    HistoryService.prototype.updateRideStatus = function (status, rideRequest) {
        var rideReqRef = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/RideRequests/' + rideRequest.parent + "/" + rideRequest.child);
        console.log("RideRef::", rideReqRef);
        var response = rideReqRef.once('value');
        response.then(function (snapshot) {
            var snap = snapshot.val();
            var rideModel = snap.rideModel;
            if (status) {
                var rideReqCancelRef = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/ConfirmRideRequests/' + rideRequest.parent);
                rideReqCancelRef.push({
                    "ride": "confirm",
                    "model": rideModel
                });
                rideReqRef.remove();
            }
            else {
                var rideReqCancelRef = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref('/CancelledRideRequests/' + rideRequest.parent);
                rideReqCancelRef.push({
                    "ride": "cancel",
                    "model": rideModel
                });
                rideReqRef.remove();
            }
        });
    };
    HistoryService.prototype.getConfirmedRideRequests = function () {
        var rideHistory = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref("/ConfirmRideRequests/");
        return rideHistory.once('value');
    };
    return HistoryService;
}());
HistoryService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], HistoryService);

//# sourceMappingURL=history.service.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingService = (function () {
    function SettingService() {
    }
    SettingService.prototype.getUserSavedPlaces = function (userId) {
        var personKeyRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/UserFav/" + userId);
        return personKeyRef.once('value');
    };
    return SettingService;
}());
SettingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({}),
    __metadata("design:paramtypes", [])
], SettingService);

//# sourceMappingURL=setting.service.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RideService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Broadcast__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RideService = (function () {
    function RideService(broadcaster) {
        this.broadcaster = broadcaster;
    }
    RideService.prototype.subscribeForRideRequests = function () {
        var _this = this;
        var rideReqRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/RideRequests/');
        rideReqRef.on('child_added', function (dataSnap) {
            console.log("child_added", dataSnap, "Child Key", dataSnap.key);
            rideReqRef.child(dataSnap.key).once('value').then(function (snap) {
                var ridesData = snap.val();
                var keys = Object.keys(ridesData);
                for (var key in keys) {
                    _this.broadcaster.broadcast('RideRequests', { "parent": dataSnap.key, "child": keys[key] });
                }
            });
        });
        __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].fromEvent(rideReqRef, 'child_removed').subscribe(function (dataSnap) {
            console.log("child_removed", dataSnap);
        });
    };
    RideService.prototype.unSubscribeForRideRequests = function () {
        var rideReqRef = __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.database().ref('/RideRequests/');
        rideReqRef.off('child_added');
        rideReqRef.off('child_removed');
    };
    return RideService;
}());
RideService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__Broadcast__["a" /* Broadcaster */]])
], RideService);

//# sourceMappingURL=RideService.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PaymentService = (function () {
    function PaymentService() {
    }
    PaymentService.prototype.processPayment = function (token, amount, userId, rideModel, paymentStatus, staticMap) {
        var payment = { token: token, paymentStatus: paymentStatus, rideModel: rideModel };
        var paymentRef = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref("/Payments/");
        var keyValueRef = paymentRef.child(userId).push(payment);
        console.log(keyValueRef.key);
        this.updateUserRides(amount, userId, rideModel, staticMap, paymentStatus, keyValueRef.key);
    };
    PaymentService.prototype.updateUserRides = function (amount, userId, rideModel, staticMap, paymentStatus, paymentKey) {
        var history = { paymentStatus: paymentStatus, rideModel: rideModel, staticMap: staticMap, paymentKey: paymentKey };
        var historyRef = __WEBPACK_IMPORTED_MODULE_1_firebase___default.a.database().ref("/RideHistory/");
        return historyRef.child(userId).push(history);
    };
    return PaymentService;
}());
PaymentService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], PaymentService);

//# sourceMappingURL=payment.service.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
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
        selector: 'page-login',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vehicledetails_vehicledetails__ = __webpack_require__(121);
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
    function RegisterPage(formBuilder, navCtrl, navParams, regService, camera, actionSheetCtrl, menu, loadingCtrl) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.regService = regService;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.menu = menu;
        this.loadingCtrl = loadingCtrl;
        this.imageSrc = "assets/imgs/profile_photo.png";
        this.filename = '';
        this.emailId = navParams.get("email");
        this.menu.swipeEnable(false);
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.register = this.formBuilder.group({
            driverName: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            driverLicense: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            phone: ['', this.validatorsMobile()],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            address: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
    };
    RegisterPage.prototype.validatorsMobile = function () {
        return __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(10)]);
    };
    RegisterPage.prototype.validatorsEmail = function () {
        return __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].email]);
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
        console.log(this.register);
    };
    RegisterPage.prototype.logForm = function () {
        if (!this.formValid(this.register)) {
            return;
        }
        console.log('######: ', this.register.value);
        if (!this.register.invalid && this.register.status == "VALID") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__vehicledetails_vehicledetails__["a" /* VehicledetailsPage */], { register: this.register.value, email: this.emailId, profile: this.filename });
        }
        // this.navCtrl.push(VehicledetailsPage)
        // this.regService.registerUser(this.register.value);
        // this.navCtrl.push(MobileAuthPage, {mobile: this.register.value.mobile, user: this.register.value})
    };
    RegisterPage.prototype.formValid = function (formGroup) {
        return !Object.keys(formGroup.controls)
            .map(function (controlName) { return formGroup.controls[controlName]; })
            .filter(function (control) {
            control.markAsTouched();
            control.updateValueAndValidity();
            return !control.valid;
        }).length;
    };
    RegisterPage.prototype.launchPicOptions = function () {
        var _this = this;
        console.log('launch it');
        var cameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.PictureSourceType.CAMERA
        };
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.takePicture(cameraOptions);
                    }
                },
                {
                    text: 'Pick from Gallery',
                    handler: function () {
                        _this.getImageFromGallery();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    RegisterPage.prototype.takePicture = function (cameraOptions) {
        var _this = this;
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            var base64Image = imageData;
            _this.imageSrc = 'data:image/jpeg;base64,' + base64Image;
            _this.filename = Math.floor(Date.now() / 1000) + '.jpg';
            var profilePromise = _this.regService.uploadProfileImage(_this.imageSrc, _this.filename);
            profilePromise.then(function (datasnap) {
                console.log("Profile Updated" + JSON.stringify(datasnap.val()));
            }).catch(function (er) {
                console.log(er);
            });
        }, function (err) {
            console.log('Error captuing photo: ', err);
        });
    };
    RegisterPage.prototype.getImageFromGallery = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
        };
        this.camera.getPicture(options).then(function (imageData) {
            console.log(imageData);
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.imageSrc = base64Image;
            _this.filename = Math.floor(Date.now() / 1000) + '.jpg';
            var profilePromise = _this.regService.uploadProfileImage(base64Image, _this.filename);
            profilePromise.then(function (datasnap) {
                console.log("Profile Updated" + JSON.stringify(datasnap.val()));
            }).catch(function (er) {
                console.log("Profile Update Error", er);
            });
        }, function (err) {
            console.log('Error captuing photo: ', err);
        });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/register/register.html"*/'<ion-header>\n    <ion-navbar>\n        <h1>Register</h1>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <form [formGroup]="register" (ngSubmit)="logForm()">\n        <ion-grid>\n            <ion-row>\n                <img class="round-img" (click)="launchPicOptions()" src="{{this.imageSrc}}" alt="bg" />\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Driver Name</ion-label>\n                    <ion-input type="text" formControlName="driverName"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'driverName\']?.errors?.required && register?.controls[\'driverName\'].touched">\n                    <p float-right class="error">* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Driver License</ion-label>\n                    <ion-input type="text" formControlName="driverLicense"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'driverLicense\']?.errors?.required && register?.controls[\'driverLicense\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label floating>Phone Number</ion-label>\n                    <ion-input type="tel" formControlName="phone" style="color:black;"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'phone\']?.errors?.required && register?.controls[\'phone\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label>Password</ion-label>\n                    <ion-input formControlName="password" type="password"></ion-input>\n                </ion-item>\n                <div *ngIf="register?.controls[\'password\']?.errors?.required && register?.controls[\'password\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n            <ion-row>\n                <ion-item>\n                    <ion-label>Address</ion-label>\n                    <ion-textarea formControlName="address"></ion-textarea>\n                </ion-item>\n                <div *ngIf="register?.controls[\'address\']?.errors?.required && register?.controls[\'address\'].touched">\n                    <p class="error" float-right>* This Field is required</p>\n                </div>\n            </ion-row>\n        </ion-grid>\n        <ion-footer>\n            <ion-fab right bottom margin-right>\n                <button ion-fab color="dark" type="submit"><ion-icon name="arrow-forward"></ion-icon></button>\n            </ion-fab>\n        </ion-footer>\n    </form>\n\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/register/register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__register_register_service__["a" /* RegisterService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit_account_edit_account__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__welcome_user_model__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__setting_service__ = __webpack_require__(308);
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
    function SettingPage(navCtrl, navParams, nativeStorage, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeStorage = nativeStorage;
        this.service = service;
        this.locations = [];
        //this.user.createDummyUser()
        this.user = new __WEBPACK_IMPORTED_MODULE_3__welcome_user_model__["c" /* UserModel */]();
        this.nativeStorage.getItem('userData')
            .then(function (response) {
            var jsonObj = JSON.parse(response);
            // this.user.userId = jsonObj.userId;
            _this.user.email = jsonObj.email;
            // this.user.givenName = jsonObj.name;
            // this.user.displayName = jsonObj.displayName;
            // this.user.photoUrl = jsonObj.photoUrl;
            _this.locations = _this.getSavedPlaces(jsonObj.userId);
        }, function (error) { return console.error(error); });
        // this.location = new LocationModel({})
        // this.locations = this.location.createDummyLocations()
        // console.log(this.locations)
    }
    SettingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingPage');
    };
    SettingPage.prototype.goToEdit = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__edit_account_edit_account__["a" /* EditAccountPage */], { user: this.user });
    };
    SettingPage.prototype.getSavedPlaces = function (userId) {
        var _this = this;
        var promise = this.service.getUserSavedPlaces(userId);
        promise.then(function (snapshot) {
            var savedPlaces = snapshot.val();
            var keys = Object.keys(savedPlaces);
            console.log("User Favorites" + JSON.stringify(snapshot.val()));
            console.log(keys);
            for (var key in keys) {
                console.log("Value:::" + savedPlaces[keys[key]]);
                var location = new __WEBPACK_IMPORTED_MODULE_3__welcome_user_model__["b" /* LocationModel */](savedPlaces[keys[key]], keys[key]);
                _this.locations.push(location);
            }
        }).catch(function (er) {
            console.log(er);
        });
        return this.locations;
    };
    return SettingPage;
}());
SettingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-setting',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/setting/setting.html"*/'<!--\n  Generated template for the SettingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar class="black-bg">\n        <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n        <ion-title>Account Settings</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content no-bounce>\n    <ion-grid class="bottom-shadow">\n        <ion-row>\n            <ion-col col-4>\n                <img class="round-img" src="{{this.user.photoUrl}}">\n            </ion-col>\n            <ion-col col-8 (click)="goToEdit()">\n                <h3>{{this.user.displayName}}</h3>\n                <p>{{this.mobile}}</p>\n                <p>{{this.user.email}}</p>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <p class="gray-extra-font" padding-left> Favorites</p>\n\n\n\n    <ion-list no-lines>\n\n        <ion-item *ngFor="let location of locations">\n            <ion-thumbnail item-start padding-vertical class="no-margin">\n                <ion-icon name="home" isActive="false"></ion-icon>\n            </ion-thumbnail>\n            <p class="black">{{location.name}}</p>\n            <p>{{location.address}}</p>\n            <button ion-button clear item-end color="dark">Delete</button>\n        </ion-item>\n\n\n\n    </ion-list>\n\n    <div margin>\n        <button ion-button clear>More Saved Places</button>\n    </div>\n\n\n    <ion-footer>\n        <ion-list no-lines>\n\n            <ion-item class="border-top">Privacy Settings</ion-item>\n            <ion-item class="border-top"> Sign Out</ion-item>\n\n        </ion-list>\n    </ion-footer>\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/setting/setting.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_5__setting_service__["a" /* SettingService */]])
], SettingPage);

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(391);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__ = __webpack_require__(774);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_date_picker__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_local_notifications__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_common_http__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_launch_navigator__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_component__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_history_history__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_list_list__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_welcome_welcome__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_login_login__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_register_register__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_mobileauth_mobileauth__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_setting_setting__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_dashboard_dashboard__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_password_password__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_autocomplete_autocomplete__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_edit_account_edit_account__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_payment_payment__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_welcome_welcome_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_register_register_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_welcome_user_model__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_setting_setting_service__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_payment_payment_service__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_history_static_map__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_history_history_service__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_ridedetail_ridedetail__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_vehicledetails_vehicledetails__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_home_home__ = __webpack_require__(780);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_set_fare_set_fare__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__providers_RideService__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__providers_Broadcast__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__app_app_constants__ = __webpack_require__(163);
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
            __WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_19__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_mobileauth_mobileauth__["a" /* MobileAuthPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_dashboard_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_password_password__["a" /* PasswordPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_autocomplete_autocomplete__["a" /* AutocompletePage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_edit_account_edit_account__["a" /* EditAccountPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_payment_payment__["a" /* PaymentPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_ridedetail_ridedetail__["a" /* RidedetailPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_vehicledetails_vehicledetails__["a" /* VehicledetailsPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_set_fare_set_fare__["a" /* SetFarePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/autocomplete/autocomplete.module#AutocompletePageModule', name: 'AutocompletePage', segment: 'autocomplete', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/edit-account/edit-account.module#EditAccountPageModule', name: 'EditAccountPage', segment: 'edit-account', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/mobileauth/mobileauth.module#MobileauthPageModule', name: 'MobileAuthPage', segment: 'mobileauth', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/password/password.module#PasswordPageModule', name: 'PasswordPage', segment: 'password', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/ridedetail/ridedetail.module#RidedetailPageModule', name: 'RidedetailPage', segment: 'ridedetail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/set-fare/set-fare.module#SetFarePageModule', name: 'SetFarePage', segment: 'set-fare', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/setting/setting.module#SettingPageModule', name: 'SettingPage', segment: 'setting', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/vehicledetails/vehicledetails.module#VehicledetailsPageModule', name: 'VehicledetailsPage', segment: 'vehicledetails', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAuth),
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_15__angular_common_http__["b" /* HttpClientModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_19__pages_history_history__["a" /* HistoryPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_welcome_welcome__["a" /* WelcomePage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_mobileauth_mobileauth__["a" /* MobileAuthPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_setting_setting__["a" /* SettingPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_dashboard_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_password_password__["a" /* PasswordPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_autocomplete_autocomplete__["a" /* AutocompletePage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_edit_account_edit_account__["a" /* EditAccountPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_payment_payment__["a" /* PaymentPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_ridedetail_ridedetail__["a" /* RidedetailPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_vehicledetails_vehicledetails__["a" /* VehicledetailsPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_set_fare_set_fare__["a" /* SetFarePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["b" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["a" /* Geocoder */],
            __WEBPACK_IMPORTED_MODULE_31__pages_welcome_welcome_service__["a" /* WelcomeService */],
            __WEBPACK_IMPORTED_MODULE_32__pages_register_register_service__["a" /* RegisterService */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */],
                useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */]
            },
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_33__pages_welcome_user_model__["c" /* UserModel */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_setting_setting_service__["a" /* SettingService */],
            __WEBPACK_IMPORTED_MODULE_35__pages_payment_payment_service__["a" /* PaymentService */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_date_picker__["a" /* DatePicker */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_36__pages_history_static_map__["a" /* StaticMapAPI */],
            __WEBPACK_IMPORTED_MODULE_37__pages_history_history_service__["a" /* HistoryService */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_42__providers_RideService__["a" /* RideService */],
            __WEBPACK_IMPORTED_MODULE_43__providers_Broadcast__["a" /* Broadcaster */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_launch_navigator__["a" /* LaunchNavigator */],
            __WEBPACK_IMPORTED_MODULE_44__app_app_constants__["a" /* Constants */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UserModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LocationModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_google_maps__ = __webpack_require__(148);
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

var AppUser = (function () {
    function AppUser() {
    }
    return AppUser;
}());

var LocationModel = (function () {
    function LocationModel(locationInfo, savedName) {
        if (locationInfo !== "") {
            this.name = savedName;
            this.address = locationInfo.name;
            this.location = new __WEBPACK_IMPORTED_MODULE_1__ionic_native_google_maps__["c" /* LatLng */](locationInfo.lat, locationInfo.lng);
        }
    }
    LocationModel.prototype.createDummyLocations = function () {
        var address1 = new LocationModel({ name: "CTS", address: "Gachibowli" });
        var address2 = new LocationModel({ name: "Home", address: "Gachibowli" });
        return [address1, address2];
    };
    return LocationModel;
}());

//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
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
    WelcomeService.prototype.validateUser = function (email) {
        var personKeyRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/Drivers/" + email);
        return personKeyRef.once('value');
    };
    WelcomeService.prototype.getUserObject = function (email) {
        var personObjectRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/Drivers/" + email);
        return personObjectRef.once('value');
    };
    WelcomeService.prototype.getAppUserDetails = function (userKey) {
        var personObjectRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/Users/" + userKey);
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
            'lastname': (typeof (user.familyName) !== undefined) ? user.familyName : "",
            'email': user.email,
            'photoUrl': (typeof (user.photoUrl) !== undefined) ? user.photoUrl : "",
            'userId': user.userId,
            'displayName': user.displayName
        });
        var userRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/UserRef");
        userRef.child(user.userId).set(keyValueRef.key);
    };
    WelcomeService.prototype.encodeEmail = function (email) {
        var dot = email.split(".").join("_dot_");
        var at = dot.split("@").join("_at_");
        var plus = at.split("+").join("_plus_");
        return plus;
    };
    WelcomeService.prototype.decodeEmail = function (email) {
        var dot = email.split("_dot_").join(".");
        var at = dot.split("_at_").join("@");
        var plus = at.split("_plus_").join("+");
        return plus;
    };
    WelcomeService.prototype.updateDriverLoginStatus = function (email, status) {
        var personObjectRef = __WEBPACK_IMPORTED_MODULE_0_firebase___default.a.database().ref("/Drivers/" + email);
        personObjectRef.update({
            "loggedIn": status
        });
    };
    return WelcomeService;
}());
WelcomeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({}),
    __metadata("design:paramtypes", [])
], WelcomeService);

//# sourceMappingURL=welcome.service.js.map

/***/ }),

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_history_history__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_edit_account_edit_account__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_set_fare_set_fare__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_welcome_welcome_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_Broadcast__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_app_constants__ = __webpack_require__(163);
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
    function MyApp(platform, statusBar, splashScreen, nativeStorage, events, welcomeService, broadcaster, constants) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.nativeStorage = nativeStorage;
        this.welcomeService = welcomeService;
        this.broadcaster = broadcaster;
        this.constants = constants;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */];
        this.initializeApp();
        this.userName = "User";
        this.nativeStorage.getItem("isLoggedIn").then((function (response) {
            console.log(response);
            if (response) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_history_history__["a" /* HistoryPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */];
            }
            _this.broadcaster.on('user')
                .subscribe(function (object) {
                console.log("Received User:::", object);
                var user = object.user;
                _this.userName = user.email;
                _this.profileUrl = (user.profilePhoto != null) ? constants.getFirebaseImageUrl(user.profilePhoto) : "assets/imgs/profile_photo.png";
            });
            // events.subscribe('user:logged', user => {
            //   console.log(user);
            //   if (user !== undefined && user !== "") {
            //     this.userName = user;
            //   }
            // })
            // events.subscribe('user:logged:url', photoUrl => {
            //   console.log(photoUrl);
            //   this.profileUrl = photoUrl;
            // })
        }), function (error) { });
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_7__pages_edit_account_edit_account__["a" /* EditAccountPage */] },
            { title: 'My Rides', component: __WEBPACK_IMPORTED_MODULE_5__pages_history_history__["a" /* HistoryPage */] },
            { title: 'Set Fare', component: __WEBPACK_IMPORTED_MODULE_8__pages_set_fare_set_fare__["a" /* SetFarePage */] }
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
        var _this = this;
        this.nativeStorage.setItem("isLoggedIn", false).then(function () { }, function (error) { });
        this.nativeStorage.getItem("userData").then(function (user) {
            _this.welcomeService.updateDriverLoginStatus(_this.welcomeService.encodeEmail(user.email), false);
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_welcome_welcome__["a" /* WelcomePage */]);
        }, function (error) { });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/app/app.html"*/'<ion-menu [content]="content">\n    <!-- <ion-header>\n        <ion-toolbar>\n            <ion-title>Menu</ion-title>\n        </ion-toolbar>\n    </ion-header> -->\n\n    <ion-content class="app-page">\n        <!-- <ion-card> -->\n\n        <ion-item style="background:gray;\n            color: white;" padding>\n            <ion-avatar item-start>\n                <img src="{{this.profileUrl}}">\n            </ion-avatar>\n            <h2>{{this.userName}}</h2>\n        </ion-item>\n        <!-- </ion-card> -->\n\n\n        <ion-list>\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n        </ion-list>\n        <ion-footer>\n\n            <div class="btn-text-left">\n                <button menuToggle ion-button clear block no-margin (click)="logout()">Logout</button>\n\n                <!-- <button ion-button clear block no-margin>Legal</button>\n\n                <button ion-button clear block no-margin> Drive with Taxi</button> -->\n\n            </div>\n\n\n\n\n        </ion-footer>\n    </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_storage__["a" /* NativeStorage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_9__pages_welcome_welcome_service__["a" /* WelcomeService */], __WEBPACK_IMPORTED_MODULE_10__providers_Broadcast__["a" /* Broadcaster */], __WEBPACK_IMPORTED_MODULE_11__app_app_constants__["a" /* Constants */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 777:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
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
        selector: 'page-list',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/list/list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ListPage);

var ListPage_1;
//# sourceMappingURL=list.js.map

/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environment__ = __webpack_require__(779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__payment_service__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__history_static_map__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//@IonicPage()
var PaymentPage = (function () {
    function PaymentPage(navCtrl, navParams, pService, alertCtrl, staticMap) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pService = pService;
        this.alertCtrl = alertCtrl;
        this.staticMap = staticMap;
        this.rideModel = navParams.get("model");
        this.dropoffAddress = this.rideModel.dropoffAddress;
        this.pickupAddress = this.rideModel.pickupAddress;
        this.fareValue = this.rideModel.fareValue;
        this.distance = this.rideModel.distance;
        this.travelTime = this.rideModel.travelTime;
        this.driverName = this.rideModel.driverName;
        this.taxiNumber = this.rideModel.taxiName;
        this.userId = this.rideModel.userId;
        this.staticMapUrl = this.staticMap.getStaticMapSnapFromAddress(this.pickupAddress, this.dropoffAddress);
    }
    PaymentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var context = this;
        this.handler = StripeCheckout.configure({
            key: __WEBPACK_IMPORTED_MODULE_2__environment__["a" /* Environment */].stripeKey,
            image: "https://stripe.com/img/documentation/checkout/marketplace.png",
            locale: 'auto',
            token: function (token) {
                _this.pService.processPayment(token, context.fareValue, context.userId, context.rideModel, true, _this.staticMapUrl);
                //this.pService.updateUserRides(context.fareValue, context.userId, context.rideModel, this.staticMapUrl, true);
                context.navCtrl.popToRoot();
            }
        });
    };
    PaymentPage.prototype.confirmRide = function () {
        var _this = this;
        var context = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Ride',
            message: 'Do you want to pay for the ride?',
            buttons: [
                {
                    text: 'Pay Now',
                    handler: function () {
                        // console.log('Cancel clicked');
                        context.makePayment();
                    }
                },
                {
                    text: 'Pay Later',
                    role: 'cancel',
                    handler: function () {
                        //console.log('Buy clicked');
                        _this.pService.processPayment(null, context.fareValue, context.userId, context.rideModel, false, _this.staticMapUrl);
                        //this.pService.updateUserRides(context.fareValue, context.userId, context.rideModel, this.staticMapUrl, false);
                        context.navCtrl.popToRoot();
                    }
                }
            ]
        });
        alert.present();
    };
    PaymentPage.prototype.makePayment = function () {
        var scope = this;
        this.handler.open({
            name: 'Stripe.com',
            description: '2 widgets',
            zipCode: true,
            amount: (scope.fareValue * 100)
        });
    };
    PaymentPage.prototype.onpopstate = function () {
        this.handler.close();
    };
    return PaymentPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */])('window:popstate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentPage.prototype, "onpopstate", null);
PaymentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-payment',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/payment/payment.html"*/'<ion-header>\n    <ion-navbar class="black-bg">\n        <ion-title>Trip details</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-item text-wrap>\n        {{pickupAddress}}\n    </ion-item>\n    <ion-item text-wrap>\n        {{dropoffAddress}}\n    </ion-item>\n    <ion-item>\n        <ion-label class="payment-label payment-cost">$ {{fareValue}}</ion-label>\n    </ion-item>\n    <ion-grid>\n        <ion-row align-items-center>\n            <ion-col width-50 class="payment-grid">\n                <ion-label class="payment-label">{{distance}} Miles</ion-label>\n            </ion-col>\n            <ion-col width-50 class="payment-grid">\n                <ion-label class="payment-label">{{travelTime}} Mins</ion-label>\n            </ion-col>\n        </ion-row>\n        <ion-row justify-content-center>\n            <ion-col width-50 class="payment-grid" justify-content-center>\n                <ion-label class="payment-label">{{driverName}}</ion-label>\n            </ion-col>\n            <ion-col width-50 class="payment-grid" justify-content-center>\n                <ion-label class="payment-label">{{taxiNumber}}</ion-label>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <div>\n        <ion-row align-items-center>\n            <button ion-button (click)="confirmRide()">Confirm Ride</button>\n        </ion-row>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/payment/payment.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__payment_service__["a" /* PaymentService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__history_static_map__["a" /* StaticMapAPI */]])
], PaymentPage);

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Environment; });
var Environment = {
    stripeKey: "pk_test_EqWpqEvmBm7YRhyNzEuHLqfE",
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(17);
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
        selector: 'page-home',template:/*ion-inline-start:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar hideBackButton>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>My Trips</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3 ion-button clear align-center>Book your Ride</h3>\n  <div padding>\n      <ion-segment [(ngModel)]="Trips">\n        <ion-segment-button value="Past">\n            Past\n        </ion-segment-button>\n        <ion-segment-button value="Upcommings">\n            Upcommings\n        </ion-segment-button>\n      </ion-segment>\n    </div>\n    \n    <div [ngSwitch]="Trips">\n      <ion-list *ngSwitchCase="\'Past\'">\n        <ion-item>\n          <!-- <ion-thumbnail item-start>\n             <img src="img/thumbnail-puppy-1.jpg">\n          </ion-thumbnail> -->\n          <p>8/24/17 at 04.19</p>\n        </ion-item>\n      </ion-list>\n    \n      <ion-list *ngSwitchCase="\'Upcommings\'">\n        <ion-item>\n          <!-- <ion-thumbnail item-start>\n            <img src="img/thumbnail-kitten-1.jpg"> \n          </ion-thumbnail> -->\n          <p>9/12/17 at 01.40</p>\n        </ion-item>\n        \n      </ion-list>\n    </div>\n\n  <!-- <button ion-button secondary menuToggle>Toggle Menu</button> -->\n</ion-content>\n'/*ion-inline-end:"/Users/Srinivas/Desktop/Aditya/Sample/Angular/TaxiDemoApp/TaxiDemo/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[386]);
//# sourceMappingURL=main.js.map