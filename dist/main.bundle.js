webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/PostsService/PostsService.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PostService = (function () {
    function PostService(appService) {
        this.appService = appService;
        this.url = 'http://localhost:8080';
        this.socket = appService.socket;
    }
    // listen for response rooms events
    PostService.prototype.listenForPosts = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(this.socket, 'response posts');
        return listener;
    };
    PostService.prototype.listenForPublished = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(this.socket, "response published");
        return listener;
    };
    PostService.prototype.publishPosts = function (posts) {
        console.log(posts);
        this.socket.emit('publish posts', posts);
    };
    PostService.prototype.addPost = function (post) {
        this.socket.emit('new post', post);
    };
    PostService.prototype.requestPosts = function (room) {
        this.socket.emit('join room', room); // join requested room
    };
    PostService.prototype.deletePosts = function (roomPK) {
        this.socket.emit('delete posts', roomPK);
    };
    PostService.prototype.clearPublished = function (currRoom) {
        this.socket.emit('clear published', currRoom);
    };
    PostService.prototype.listenForDeletedPosts = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(this.socket, 'posts deleted');
        return listener;
    };
    PostService.prototype.listenForDeletedPublished = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(this.socket, 'published deleted');
        return listener;
    };
    return PostService;
}());
PostService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === "function" && _a || Object])
], PostService);

var _a;
//# sourceMappingURL=PostsService.service.js.map

/***/ }),

/***/ "../../../../../src/app/ProbsService/ProbsService.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProbService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProbService = (function () {
    function ProbService(appService) {
        this.appService = appService;
        this.socket = appService.socket;
        ;
    }
    /* problem addition */
    ProbService.prototype.listenForProbs = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(this.socket, 'response rooms');
        return listener;
    };
    ProbService.prototype.addNewProb = function (prob) {
        this.socket.emit("new room", prob);
    };
    /* problem deletion */
    ProbService.prototype.listenForDeleted = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromEvent(this.socket, 'room deleted');
        return listener;
    };
    ProbService.prototype.deleteProb = function (probObj) {
        this.socket.emit("delete room", probObj);
    };
    return ProbService;
}());
ProbService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === "function" && _a || Object])
], ProbService);

var _a;
//# sourceMappingURL=ProbsService.service.js.map

/***/ }),

/***/ "../../../../../src/app/UserService/UserService.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = (function () {
    function UserService(appService) {
        this.appService = appService;
        this.socket = appService.socket;
    }
    UserService.prototype.addUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.socket.emit("add user", user);
            var eventListener = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(_this.socket, "validation");
            eventListener.subscribe(function (resObj) {
                resolve(resObj);
            }, function (error) {
                console.log(error);
                reject(error);
            }, function () {
                console.log("done");
            });
        });
    };
    UserService.prototype.listenForAdmin = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(this.socket, "admin");
        return listener;
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=UserService.service.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h1{\r\n  text-align: center;\r\n  font-family: Courier, monospace;\r\n  border-radius: 10%;\r\n  font-size: 38px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The whole content below can be removed with the new code.-->\r\n<h1 id=\"mainTitle\">{{title}}</h1>\r\n<prob-select [postsDisplay]=\"PD\" [admin]=\"admin\" #PS></prob-select>\r\n<submit-post [admin]=\"admin\" [postsDisplay] = \"PD\" [nickname]=\"nickname\" [probSelect]=\"PS\" [userPK]=\"userPK\"></submit-post>\r\n<posts-display [admin]=\"admin\" #PD [probSelect] = \"PS\"></posts-display>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UserService_UserService_service__ = __webpack_require__("../../../../../src/app/UserService/UserService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup_popup_component__ = __webpack_require__("../../../../../src/app/popup/popup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__postsDisplay_postsDisplay_component__ = __webpack_require__("../../../../../src/app/postsDisplay/postsDisplay.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(userService, dialog) {
        this.userService = userService;
        this.dialog = dialog;
        this.title = 'Share Code';
        this.admin = false;
        this.userID = "";
        this.nickname = "";
        this.validationError = false;
        this.openDialog();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.listenForAdmin();
    };
    AppComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__popup_popup_component__["a" /* Dialog */], { disableClose: true, });
        if (this.validationError) {
            this.dialogRef.componentInstance.errorMsg = "Invalid Nickname or Student ID";
        }
        this.dialogRef.afterClosed().subscribe(function (result) {
            _this.dialogRef = null;
            console.log(result);
            if (result.stID == "" || result.ncknm == "") {
                _this.validationError = true;
                _this.openDialog();
                return;
            }
            _this.userService.addUser(result.stID)
                .then(function (resObj) {
                if (resObj.valid) {
                    console.log("passed verification");
                    _this.userPK = resObj.pk;
                    _this.userID = result.stID;
                    _this.nickname = result.ncknm;
                }
                else {
                    console.log("failed verification");
                    _this.validationError = true;
                    _this.openDialog();
                    return;
                }
            })
                .catch(function (error) { console.log(error); });
        });
    };
    AppComponent.prototype.listenForAdmin = function () {
        var _this = this;
        this.userService.listenForAdmin()
            .subscribe(function (isAdmin) {
            if (isAdmin) {
                console.log("administrator");
                _this.admin = true;
                _this.postsDisp.listenForPosts();
            }
            else {
                console.log("listening for published");
                _this.admin = false;
                _this.postsDisp.listenForPublished();
            }
        }, function (error) { console.log(error); }, function () { console.log("done"); });
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */]) === "function" && _a || Object)
], AppComponent.prototype, "postsDisp", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__UserService_UserService_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__UserService_UserService_service__["a" /* UserService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MdDialog */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__probSelect_probSelect_component__ = __webpack_require__("../../../../../src/app/probSelect/probSelect.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__submitPost_submitPost_component__ = __webpack_require__("../../../../../src/app/submitPost/submitPost.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__postsDisplay_postsDisplay_component__ = __webpack_require__("../../../../../src/app/postsDisplay/postsDisplay.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__popup_popup_component__ = __webpack_require__("../../../../../src/app/popup/popup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__PostsService_PostsService_service__ = __webpack_require__("../../../../../src/app/PostsService/PostsService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ProbsService_ProbsService_service__ = __webpack_require__("../../../../../src/app/ProbsService/ProbsService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__UserService_UserService_service__ = __webpack_require__("../../../../../src/app/UserService/UserService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_service__ = __webpack_require__("../../../../../src/app/app.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__probSelect_probSelect_component__["a" /* ProbSelectComponent */],
            __WEBPACK_IMPORTED_MODULE_8__submitPost_submitPost_component__["a" /* SubmitPostComponent */],
            __WEBPACK_IMPORTED_MODULE_9__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */],
            __WEBPACK_IMPORTED_MODULE_10__popup_popup_component__["a" /* Dialog */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_material__["b" /* MdDialogModule */],
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_10__popup_popup_component__["a" /* Dialog */]],
        providers: [__WEBPACK_IMPORTED_MODULE_14__app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_11__PostsService_PostsService_service__["a" /* PostService */], __WEBPACK_IMPORTED_MODULE_12__ProbsService_ProbsService_service__["a" /* ProbService */], __WEBPACK_IMPORTED_MODULE_13__UserService_UserService_service__["a" /* UserService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppService = (function () {
    function AppService() {
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__();
    }
    return AppService;
}());
AppService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], AppService);

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ "../../../../../src/app/popup/popup.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input{\r\n  font-size: 16px;\r\n}\r\n\r\n#err{\r\n  color:red;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/popup/popup.component.html":
/***/ (function(module, exports) {

module.exports = "<h3>Please Enter Info: </h3>\r\n<div>\r\n  <label>Nickname</label>\r\n  <br>\r\n  <md-input-container>\r\n  <input mdInput type=\"text\" #ncknm >\r\n</md-input-container>\r\n  <br>\r\n\r\n  <label>Student Id</label>\r\n  <br>\r\n  <md-input-container>\r\n  <input mdInput type=\"password\" #stID >\r\n</md-input-container>\r\n</div>\r\n<div md-dialog-actions>\r\n  <button md-button class=\"popup-btn\" (click)=\"dialogRef.close({ncknm: ncknm.value, stID: stID.value})\">Submit</button>\r\n</div>\r\n<p id=\"err\">{{errorMsg}}</p>\r\n"

/***/ }),

/***/ "../../../../../src/app/popup/popup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dialog; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Dialog = (function () {
    function Dialog(dialogRef) {
        this.dialogRef = dialogRef;
        this.errorMsg = "";
    }
    return Dialog;
}());
Dialog = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Component */])({
        selector: 'my-dialog',
        template: __webpack_require__("../../../../../src/app/popup/popup.component.html"),
        styles: [__webpack_require__("../../../../../src/app/popup/popup.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialogRef */]) === "function" && _a || Object])
], Dialog);

var _a;
//# sourceMappingURL=popup.component.js.map

/***/ }),

/***/ "../../../../../src/app/postsDisplay/postsDisplay.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".selectedPost{\r\n  border-width: 3px;\r\n  border-color: red;\r\n}\r\n\r\n.highlight{\r\n  background-color: blue !important;\r\n}\r\n\r\n.codeBox{\r\n  background-color: rgb(50,50,50);\r\n  color: rgb(230,230,230);\r\n  width: 68%%;\r\n  margin-left: 30%;\r\n  margin-right: 3%;\r\n  font-size: 1.2vw;\r\n  padding: 1%;\r\n  white-space: pre-wrap;\r\n}\r\n.post{\r\n  background-color:rgb(50,50,50);\r\n  color:rgb(230,230,230);\r\n  font-size: .9vw;\r\n  white-space: pre-wrap;\r\n  margin: 0px;\r\n}\r\n#post:hover .post{\r\n  background-color:darkBlue;\r\n}\r\n#post:active .post{\r\n  background-color:blue;\r\n}\r\n\r\n#post:hover{\r\n  background-color:gray;\r\n}\r\n#post:active{\r\n  background-color:lightgray;\r\n  color:black;\r\n}\r\n\r\n#posts{\r\n  width:25%;\r\n  float:left;\r\n  overflow: auto;\r\n  padding-right: 1%;\r\n  padding-left: .5%;\r\n  height:600px;\r\n}\r\n\r\n#post{\r\n  background-color: rgb(90, 90, 90);\r\n  color:white;\r\n  margin-top:5%;\r\n  border-style:groove;\r\n}\r\np{\r\n  margin:0px;\r\n  font-size: 16px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/postsDisplay/postsDisplay.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <button *ngIf=\"admin == true\" class=\"delete\" (click)=\"clearSubmissions()\">Clear Submissions</button>\r\n  <button *ngIf=\"admin == true\" class=\"create\" (click)=\"publishSelection()\">Publish Selected</button>\r\n  <button *ngIf=\"admin == true\" class=\"delete\" (click)=\"clearPublished()\">Clear Published</button>\r\n</div>\r\n<br>\r\n<br>\r\n<!-- posts list div -->\r\n<h3>{{currRoom}}</h3>\r\n<div id=\"posts\">\r\n  <div *ngFor= \"let post of posts\" id=\"post\" [class.selectedPost]=\"post.selected\" [class.highlight]= \"post.viewing\" (click)=\"viewPost(post)\">\r\n    <p>{{post.nickname}}</p>\r\n    <pre class = \"post\" >{{post.body}}</pre>\r\n  </div>\r\n</div>\r\n\r\n<!-- code main display -->\r\n<pre class=\"codeBox\" id=\"displayCode\">{{selectedPost.body}}</pre>\r\n"

/***/ }),

/***/ "../../../../../src/app/postsDisplay/postsDisplay.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__ = __webpack_require__("../../../../../src/app/PostsService/PostsService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__probSelect_probSelect_component__ = __webpack_require__("../../../../../src/app/probSelect/probSelect.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return postsDisplayComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var postsDisplayComponent = (function () {
    function postsDisplayComponent(postService) {
        this.postService = postService;
        this.posts = []; // array of posts bound to our html by structural directive
        this.selectedPost = {
            body: "Code displayed here.",
            selected: true,
            nickname: "",
            viewing: true,
            roomPK: -1,
            userPK: -1,
            id: -1
        };
        this.adminSelected = [];
        this.currRoom = "";
        this.storedByRoom = {}; // client storage of users own posts
        this.listenForDeletedPosts();
        this.listenForDeletedPublished();
    }
    postsDisplayComponent.prototype.postToSelf = function (post) {
        // if the room exists in our object
        if (this.storedByRoom[this.currRoom]) {
            // push new post content
            this.storedByRoom[this.currRoom].push(post);
        }
        else {
            // create an array at that room key, and push post content
            this.storedByRoom[this.currRoom] = [];
            this.storedByRoom[this.currRoom].push(post);
        }
        // display new post on screen
        this.addPosts([post]);
        console.log(this.storedByRoom);
    };
    // called by probSelect when room is changed
    postsDisplayComponent.prototype.changeRoom = function (room) {
        // clear out old posts from display
        this.posts = [];
        // clear out old selection
        this.adminSelected = [];
        // change current room to new room name
        this.currRoom = room;
        console.log("room changed to: " + room);
        // add posts from storedByRoom if there are any
        if (this.storedByRoom[room]) {
            console.log(this.storedByRoom[room]);
            this.addPosts(this.storedByRoom[room]);
        }
        else {
            console.log("no posts yet");
        }
    };
    postsDisplayComponent.prototype.listenForPosts = function () {
        var _this = this;
        var postObserver = this.postService.listenForPosts();
        // subscribe to observable that listens for posts
        postObserver.subscribe(
        // when posts are retrieved, add the to posts property
        function (retrievedPosts) {
            _this.addPosts(retrievedPosts);
        }, function (error) {
            console.error(error);
        }, function () {
            console.log("done");
        });
    };
    postsDisplayComponent.prototype.listenForPublished = function () {
        var _this = this;
        var observer = this.postService.listenForPublished();
        observer.subscribe(function (retrievedPublished) {
            console.log("received: ");
            console.log(retrievedPublished);
            _this.addPosts(retrievedPublished);
        }, function (error) {
            console.error(error);
        }, function () {
            console.log("done");
        });
    };
    postsDisplayComponent.prototype.listenForDeletedPublished = function () {
        var _this = this;
        var observer = this.postService.listenForDeletedPublished();
        // subscribe to observable that listens for posts
        observer.subscribe(
        // when posts are retrieved, add the to posts property
        function () {
            console.log("deleted published");
            if (!_this.admin) {
                _this.posts = [];
                // retain post that were submitted by this user
                if (_this.storedByRoom[_this.currRoom]) {
                    _this.addPosts(_this.storedByRoom[_this.currRoom]);
                }
            }
        }, function (error) {
            console.log("error");
            console.error(error);
        }, function () {
            console.log("done");
        });
    };
    postsDisplayComponent.prototype.listenForDeletedPosts = function () {
        var _this = this;
        var deletedObserver = this.postService.listenForDeletedPosts();
        // subscribe to observable that listens for posts
        deletedObserver.subscribe(
        // when posts are retrieved, add the to posts property
        function () {
            if (_this.admin) {
                console.log("deleted posts");
                _this.posts = [];
            }
        }, function (error) {
            console.log("error");
            console.error(error);
        }, function () {
            console.log("done");
        });
    };
    // for converting array of strings to posts
    postsDisplayComponent.prototype.addPosts = function (newPosts) {
        var _this = this;
        newPosts.forEach(function (post) {
            post.viewing = false;
            post.selected = false;
            _this.posts.push(post);
        });
    };
    postsDisplayComponent.prototype.publishSelection = function () {
        this.postService.publishPosts(this.adminSelected);
    };
    postsDisplayComponent.prototype.clearSubmissions = function () {
        if (this.currRoom != "") {
            this.adminSelected = []; // empty adminSelected array so that deleted posts are not published
            this.postService.deletePosts(this.probSelect.getCurrKey());
        }
    };
    postsDisplayComponent.prototype.clearPublished = function () {
        this.postService.clearPublished(this.probSelect.getCurrKey());
    };
    // display post in large text area
    postsDisplayComponent.prototype.viewPost = function (post) {
        this.selectedPost.viewing = false;
        this.selectedPost = post;
        this.selectedPost.viewing = true;
        // if administrator clicks on a post, select or deselect
        if (this.admin) {
            // if selected, deselect and remove from adminSelected
            if (post.selected) {
                post.selected = false;
                var index = this.adminSelected.indexOf(post);
                this.adminSelected.splice(index, 1);
            }
            else {
                this.adminSelected.push(post);
                post.selected = true;
            }
            console.log(this.selectedPost);
        }
    };
    return postsDisplayComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Boolean)
], postsDisplayComponent.prototype, "admin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__probSelect_probSelect_component__["a" /* ProbSelectComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__probSelect_probSelect_component__["a" /* ProbSelectComponent */]) === "function" && _a || Object)
], postsDisplayComponent.prototype, "probSelect", void 0);
postsDisplayComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Component */])({
        selector: 'posts-display',
        template: __webpack_require__("../../../../../src/app/postsDisplay/postsDisplay.component.html"),
        styles: [__webpack_require__("../../../../../src/app/postsDisplay/postsDisplay.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__["a" /* PostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__["a" /* PostService */]) === "function" && _b || Object])
], postsDisplayComponent);

var _a, _b;
//# sourceMappingURL=postsDisplay.component.js.map

/***/ }),

/***/ "../../../../../src/app/probSelect/probSelect.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#selectProblem, #probs, #createProblem{\r\n  float: left;\r\n  margin-right: 1%;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/probSelect/probSelect.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The whole content below can be removed with the new code.-->\r\n<h2>Select Problem: </h2>\r\n\r\n  <!-- drop down menu -->\r\n  <select name=\"Problems\" id=\"probs\" [(ngModel)]=\"currProb\" (change)=\"selectProblem()\">\r\n    <option *ngFor= \"let prob of probs\" [value]=\"prob\"> {{prob}} </option>\r\n  </select>\r\n\r\n  <!-- drop down buttons -->\r\n  <button id=\"deleteProblem\" class=\"delete\" *ngIf=\"admin == true\" (click)=\"deleteProblem()\">Delete</button>\r\n  <button id=\"createProblem\" class=\"create\" *ngIf=\"admin == true\" (click)=\"createProblem()\">Create New Category</button>\r\n  <br>\r\n"

/***/ }),

/***/ "../../../../../src/app/probSelect/probSelect.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProbsService_ProbsService_service__ = __webpack_require__("../../../../../src/app/ProbsService/ProbsService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PostsService_PostsService_service__ = __webpack_require__("../../../../../src/app/PostsService/PostsService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__postsDisplay_postsDisplay_component__ = __webpack_require__("../../../../../src/app/postsDisplay/postsDisplay.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProbSelectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProbSelectComponent = (function () {
    function ProbSelectComponent(probService, postService) {
        this.probService = probService;
        this.postService = postService;
        this.default = " -- select an option -- ";
        this.keyVal = {};
        this.probs = [this.default];
        this.justCreated = false;
    }
    ProbSelectComponent.prototype.ngOnInit = function () {
        this.currProb = this.default;
        this.keyVal[this.currProb] = -1;
        console.log("default current problem: " + this.currProb);
        this.listenForProbs();
        this.listenForDeleted();
    };
    ProbSelectComponent.prototype.selectProblem = function () {
        // get key associated with problem name
        this.currKey = this.keyVal[this.currProb];
        console.log("problem: " + this.currProb + " id: " + this.currKey + " selected");
        console.log(this.keyVal);
        // change posts displayed to posts in this room
        this.postsDisplay.changeRoom(this.currProb);
        // request the posts for this room
        this.postService.requestPosts(this.currKey);
    };
    ProbSelectComponent.prototype.getCurrKey = function () {
        this.currKey = this.keyVal[this.currProb];
        return this.currKey;
    };
    ProbSelectComponent.prototype.createProblem = function (prob) {
        console.log("create new problem");
        var name = prompt("Enter name for new room:");
        if (name) {
            this.probService.addNewProb(name);
            this.justCreated = true;
        }
    };
    ProbSelectComponent.prototype.listenForProbs = function () {
        var _this = this;
        var probObserver = this.probService.listenForProbs();
        probObserver.subscribe(function (retrievedProbs) {
            retrievedProbs.forEach(function (prob) {
                // when a new problem has been created, associate problem name with primary key
                _this.keyVal[prob.name] = prob.pk;
                // add new problem to dropdown
                _this.probs.push(prob.name);
                console.log(_this.probs);
            });
            if (_this.justCreated) {
                retrievedProbs.forEach(function (prob) {
                    _this.currProb = prob.name;
                    _this.selectProblem();
                    _this.justCreated = false;
                });
            }
        }, function (error) {
            console.error(error);
        }, function () {
            console.log("done");
        });
    };
    ProbSelectComponent.prototype.deleteProblem = function () {
        if (this.currProb != this.default) {
            this.currKey = this.keyVal[this.currProb];
            console.log("problem " + this.currProb + " with key: " + this.currKey + " deleted");
            this.probService.deleteProb({ name: this.currProb, pk: this.currKey });
        }
    };
    ProbSelectComponent.prototype.listenForDeleted = function () {
        var _this = this;
        var deletedObserver = this.probService.listenForDeleted();
        deletedObserver.subscribe(function (deleted) {
            console.log("deleted problem " + deleted.name + " with pk " + deleted.pk);
            // delete property of keyVal object corresponding to that pk
            delete _this.keyVal[deleted.name];
            // remove problem from dropdown
            var index = _this.probs.indexOf(deleted.name);
            _this.probs.splice(index, 1);
            // if the user is on that problem, move them back to the default selection
            if (_this.currProb == deleted.name) {
                _this.currProb = _this.default;
                _this.selectProblem();
            }
        }, function (error) {
            console.error(error);
        }, function () {
            console.log("done");
        });
    };
    return ProbSelectComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Boolean)
], ProbSelectComponent.prototype, "admin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */]) === "function" && _a || Object)
], ProbSelectComponent.prototype, "postsDisplay", void 0);
ProbSelectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Component */])({
        selector: 'prob-select',
        template: __webpack_require__("../../../../../src/app/probSelect/probSelect.component.html"),
        styles: [__webpack_require__("../../../../../src/app/probSelect/probSelect.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ProbsService_ProbsService_service__["a" /* ProbService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ProbsService_ProbsService_service__["a" /* ProbService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__PostsService_PostsService_service__["a" /* PostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__PostsService_PostsService_service__["a" /* PostService */]) === "function" && _c || Object])
], ProbSelectComponent);

var _a, _b, _c;
//# sourceMappingURL=probSelect.component.js.map

/***/ }),

/***/ "../../../../../src/app/submitPost/submitPost.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#submitCode{\r\n  float: left;\r\n  margin-right: 1%;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/submitPost/submitPost.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- text box -->\r\n<h2>Paste Code here:</h2>\r\n<textarea name=\"code\" rows=\"10\" cols=\"90\" id=\"txtArea\" [(ngModel)] = textBody></textarea>\r\n<br>\r\n<br>\r\n\r\n<!-- post buttons -->\r\n<button id=\"submitCode\" class=\"create\" (click)=\"submitCode()\">Submit code</button>\r\n"

/***/ }),

/***/ "../../../../../src/app/submitPost/submitPost.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__ = __webpack_require__("../../../../../src/app/PostsService/PostsService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__postsDisplay_postsDisplay_component__ = __webpack_require__("../../../../../src/app/postsDisplay/postsDisplay.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__probSelect_probSelect_component__ = __webpack_require__("../../../../../src/app/probSelect/probSelect.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubmitPostComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SubmitPostComponent = (function () {
    function SubmitPostComponent(postService) {
        this.postService = postService;
        this.textBody = "";
    }
    // when user clicks "Sumbit code"
    SubmitPostComponent.prototype.submitCode = function () {
        // if the user is in a valid room
        if (this.probSelect.currProb != this.probSelect.default) {
            console.log("submitting: " + this.textBody);
            // create new post with text area content and user's nickname
            this.newPost = {
                selected: false,
                viewing: false,
                body: this.textBody,
                nickname: this.nickname,
                userPK: this.userPK,
                roomPK: this.probSelect.currKey,
                id: -1
            };
            // send new post to the server
            this.postService.addPost(this.newPost);
            // if user is not an admin, also post the content to their client stored posts object
            if (!this.admin) {
                this.postsDisplay.postToSelf(this.newPost);
            }
        }
        else {
            alert("Please select a problem from the dropdown menu.");
        }
    };
    return SubmitPostComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Boolean)
], SubmitPostComponent.prototype, "admin", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", String)
], SubmitPostComponent.prototype, "nickname", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */]) === "function" && _a || Object)
], SubmitPostComponent.prototype, "postsDisplay", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__probSelect_probSelect_component__["a" /* ProbSelectComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__probSelect_probSelect_component__["a" /* ProbSelectComponent */]) === "function" && _b || Object)
], SubmitPostComponent.prototype, "probSelect", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Number)
], SubmitPostComponent.prototype, "userPK", void 0);
SubmitPostComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Component */])({
        selector: 'submit-post',
        template: __webpack_require__("../../../../../src/app/submitPost/submitPost.component.html"),
        styles: [__webpack_require__("../../../../../src/app/submitPost/submitPost.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__["a" /* PostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__["a" /* PostService */]) === "function" && _c || Object])
], SubmitPostComponent);

var _a, _b, _c;
//# sourceMappingURL=submitPost.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map