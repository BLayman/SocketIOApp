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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
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
    function PostService() {
        this.url = 'http://localhost:8080';
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__();
    }
    // listen for response rooms events
    PostService.prototype.listenForPosts = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(this.socket, 'response posts');
        return listener;
    };
    PostService.prototype.addPost = function (post) {
        this.socket.emit('new post', post);
    };
    PostService.prototype.requestPosts = function (room) {
        this.socket.emit('join room', room); // join requested room
    };
    PostService.prototype.deletePosts = function () {
        this.socket.emit('delete posts');
    };
    PostService.prototype.listenForDeleted = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(this.socket, 'posts deleted');
        return listener;
    };
    return PostService;
}());
PostService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], PostService);

//# sourceMappingURL=PostsService.service.js.map

/***/ }),

/***/ "../../../../../src/app/ProbsService/ProbsService.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
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
    function ProbService() {
        this.url = 'http://localhost:8080';
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__();
    }
    /* problem addition */
    ProbService.prototype.listenForProbs = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(this.socket, 'response rooms');
        return listener;
    };
    ProbService.prototype.addNewProb = function (prob) {
        this.socket.emit("new room", prob);
    };
    /* problem deletion */
    ProbService.prototype.listenForDeleted = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromEvent(this.socket, 'room deleted');
        return listener;
    };
    ProbService.prototype.deleteProb = function (prob) {
        this.socket.emit("delete room", prob);
    };
    return ProbService;
}());
ProbService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ProbService);

//# sourceMappingURL=ProbsService.service.js.map

/***/ }),

/***/ "../../../../../src/app/UserService/UserService.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
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
    function UserService() {
        this.url = 'http://localhost:8080';
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__();
    }
    UserService.prototype.addUser = function (user) {
        this.socket.emit("add user", user);
    };
    UserService.prototype.listenForAdmin = function () {
        var listener = __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromEvent(this.socket, "admin");
        return listener;
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], UserService);

//# sourceMappingURL=UserService.service.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "h1{\r\n  text-align: center;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The whole content below can be removed with the new code.-->\r\n<h1 id=\"mainTitle\">{{title}}</h1>\r\n<prob-select [postsDisplay]=\"PD\" [admin]=\"admin\"></prob-select>\r\n<submit-post [admin]=\"admin\"></submit-post>\r\n<posts-display [admin]=\"admin\" #PD></posts-display>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UserService_UserService_service__ = __webpack_require__("../../../../../src/app/UserService/UserService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup_popup_component__ = __webpack_require__("../../../../../src/app/popup/popup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("../../../material/@angular/material.es5.js");
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
        this.validationError = false;
        this.listenForAdmin();
        this.openDialog();
    }
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
            }
            _this.userID = result.stID;
            // send their user ID to the server to add it to the database
            _this.userService.addUser(result.stID);
        });
    };
    AppComponent.prototype.listenForAdmin = function () {
        var _this = this;
        this.userService.listenForAdmin()
            .subscribe(function () {
            console.log("administrator");
            _this.admin = true;
        }, function (error) { console.log(error); }, function () { console.log("done"); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__UserService_UserService_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__UserService_UserService_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["d" /* MdDialog */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
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
        providers: [__WEBPACK_IMPORTED_MODULE_11__PostsService_PostsService_service__["a" /* PostService */], __WEBPACK_IMPORTED_MODULE_12__ProbsService_ProbsService_service__["a" /* ProbService */], __WEBPACK_IMPORTED_MODULE_13__UserService_UserService_service__["a" /* UserService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

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

module.exports = "<h3>Please Enter Info: </h3>\r\n<div>\r\n  <label>Nickname</label>\r\n  <br>\r\n  <md-input-container>\r\n  <input mdInput type=\"text\" #ncknm >\r\n</md-input-container>\r\n  <br>\r\n\r\n  <label>Student Id</label>\r\n  <br>\r\n  <md-input-container>\r\n  <input mdInput type=\"text\" #stID >\r\n</md-input-container>\r\n</div>\r\n<div md-dialog-actions>\r\n  <button md-button class=\"popup-btn\" (click)=\"dialogRef.close({ncknm: ncknm.value, stID: stID.value})\">Submit</button>\r\n</div>\r\n<p id=\"err\">{{errorMsg}}</p>\r\n"

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
exports.push([module.i, ".codeBox{\r\n  background-color: black;\r\n  color: white;\r\n  width: 65%%;\r\n  margin-left: 30%;\r\n  margin-right: 5%;\r\n  font-size: 1.4vw;\r\n  padding: 1%;\r\n  white-space: pre-wrap;\r\n}\r\n.post{\r\n  background-color:rgb(50,50,50);\r\n  border-style:groove;\r\n  color:white;\r\n  font-size: .9vw;\r\n  white-space: pre-wrap;\r\n}\r\n.post:hover{\r\n  background-color:darkBlue;\r\n}\r\n.post:active{\r\n  background-color:blue;\r\n}\r\n\r\n#posts{\r\n  width:25%;\r\n  float:left;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/postsDisplay/postsDisplay.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n  <button *ngIf=\"admin == true\" id=\"clearPosts\" (click)=\"clearSubmissions()\">Clear Submissions</button>\r\n</div>\r\n<br>\r\n<br>\r\n<!-- posts list div -->\r\n<h3>{{currRoom}}</h3>\r\n<div id=\"posts\">\r\n  <pre class = \"post\" *ngFor= \"let post of posts\" (click)=\"viewPost(post)\">{{post.body}}</pre>\r\n</div>\r\n\r\n<!-- code main display -->\r\n<pre class=\"codeBox\">\r\n  <code id=\"displayCode\">\r\n    {{selectedPost.body}}\r\n  </code>\r\n</pre>\r\n"

/***/ }),

/***/ "../../../../../src/app/postsDisplay/postsDisplay.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__ = __webpack_require__("../../../../../src/app/PostsService/PostsService.service.ts");
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
        this.selectedPost = { "body": "Code displayed here." }; // default display
        this.currRoom = "";
        this.listenForPosts(); // start listening for incomming posts
        this.listenForDeleted();
    }
    postsDisplayComponent.prototype.changeRoom = function (room) {
        this.currRoom = room;
        console.log("room changed to: " + room);
        this.posts = [];
        this.postService.requestPosts(room);
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
    postsDisplayComponent.prototype.listenForDeleted = function () {
        var _this = this;
        var deletedObserver = this.postService.listenForDeleted();
        // subscribe to observable that listens for posts
        deletedObserver.subscribe(
        // when posts are retrieved, add the to posts property
        function () {
            console.log("deleted posts");
            _this.posts = [];
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
            _this.posts.push({
                'body': post
            });
        });
    };
    postsDisplayComponent.prototype.clearSubmissions = function () {
        this.postService.deletePosts();
    };
    // display post in large text area
    postsDisplayComponent.prototype.viewPost = function (post) {
        this.selectedPost = post;
    };
    return postsDisplayComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Boolean)
], postsDisplayComponent.prototype, "admin", void 0);
postsDisplayComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Component */])({
        selector: 'posts-display',
        template: __webpack_require__("../../../../../src/app/postsDisplay/postsDisplay.component.html"),
        styles: [__webpack_require__("../../../../../src/app/postsDisplay/postsDisplay.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__["a" /* PostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__["a" /* PostService */]) === "function" && _a || Object])
], postsDisplayComponent);

var _a;
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

module.exports = "<!--The whole content below can be removed with the new code.-->\r\n<h2>Select Problem: </h2>\r\n\r\n  <!-- drop down menu -->\r\n  <select name=\"Problems\" id=\"probs\" [(ngModel)]=\"currProb\" (change)=\"selectProblem()\">\r\n    <option *ngFor= \"let prob of probs\" [value]=\"prob\"> {{prob}} </option>\r\n  </select>\r\n\r\n  <!-- drop down buttons -->\r\n  <button id=\"deleteProblem\" *ngIf=\"admin == true\" (click)=\"deleteProblem()\">Delete</button>\r\n  <button id=\"createProblem\" *ngIf=\"admin == true\" (click)=\"createProblem()\">Create New Category</button>\r\n  <br>\r\n"

/***/ }),

/***/ "../../../../../src/app/probSelect/probSelect.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProbsService_ProbsService_service__ = __webpack_require__("../../../../../src/app/ProbsService/ProbsService.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__postsDisplay_postsDisplay_component__ = __webpack_require__("../../../../../src/app/postsDisplay/postsDisplay.component.ts");
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
    function ProbSelectComponent(probService) {
        this.probService = probService;
        this.default = " -- select an option -- ";
        this.probs = [this.default];
        this.justCreated = false;
    }
    ProbSelectComponent.prototype.ngOnInit = function () {
        this.currProb = this.probs[0];
        this.listenForProbs();
        this.listenForDeleted();
    };
    ProbSelectComponent.prototype.selectProblem = function () {
        console.log(this.currProb + " selected");
        this.postsDisplay.changeRoom(this.currProb);
    };
    ProbSelectComponent.prototype.createProblem = function (prob) {
        console.log("create new problem");
        var name = prompt("Enter name for new room:");
        this.probService.addNewProb(name);
        this.justCreated = true;
    };
    ProbSelectComponent.prototype.listenForProbs = function () {
        var _this = this;
        var probObserver = this.probService.listenForProbs();
        probObserver.subscribe(function (retrievedProbs) {
            retrievedProbs.forEach(function (prob) {
                _this.probs.push(prob);
            });
            if (_this.justCreated) {
                _this.currProb = _this.probs[_this.probs.length - 1];
                _this.postsDisplay.changeRoom(_this.currProb);
                _this.justCreated = false;
            }
        }, function (error) {
            console.error(error);
        }, function () {
            console.log("done");
        });
    };
    ProbSelectComponent.prototype.deleteProblem = function () {
        if (this.currProb != this.default) {
            console.log(this.currProb + " deleted");
            this.probService.deleteProb(this.currProb);
        }
    };
    ProbSelectComponent.prototype.listenForDeleted = function () {
        var _this = this;
        var deletedObserver = this.probService.listenForDeleted();
        deletedObserver.subscribe(function (deleted) {
            var index = _this.probs.indexOf(deleted);
            if (index == _this.probs.indexOf(_this.currProb)) {
                _this.currProb = _this.probs[0];
                _this.postsDisplay.changeRoom(_this.currProb);
            }
            _this.probs.splice(index, 1);
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
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__postsDisplay_postsDisplay_component__["a" /* postsDisplayComponent */]) === "function" && _a || Object)
], ProbSelectComponent.prototype, "postsDisplay", void 0);
ProbSelectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Component */])({
        selector: 'prob-select',
        template: __webpack_require__("../../../../../src/app/probSelect/probSelect.component.html"),
        styles: [__webpack_require__("../../../../../src/app/probSelect/probSelect.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ProbsService_ProbsService_service__["a" /* ProbService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ProbsService_ProbsService_service__["a" /* ProbService */]) === "function" && _b || Object])
], ProbSelectComponent);

var _a, _b;
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

module.exports = "<!-- text box -->\r\n<h2>Paste Code here:</h2>\r\n<textarea name=\"code\" rows=\"8\" cols=\"80\" id=\"txtArea\" [(ngModel)] = textBody></textarea>\r\n<br>\r\n<br>\r\n\r\n<!-- post buttons -->\r\n<button id=\"submitCode\" (click)=\"submitCode()\">Submit code</button>\r\n"

/***/ }),

/***/ "../../../../../src/app/submitPost/submitPost.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__ = __webpack_require__("../../../../../src/app/PostsService/PostsService.service.ts");
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
    SubmitPostComponent.prototype.submitCode = function () {
        console.log("submitting: " + this.textBody);
        this.postService.addPost(this.textBody);
    };
    return SubmitPostComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Input */])(),
    __metadata("design:type", Boolean)
], SubmitPostComponent.prototype, "admin", void 0);
SubmitPostComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* Component */])({
        selector: 'submit-post',
        template: __webpack_require__("../../../../../src/app/submitPost/submitPost.component.html"),
        styles: [__webpack_require__("../../../../../src/app/submitPost/submitPost.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__["a" /* PostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__PostsService_PostsService_service__["a" /* PostService */]) === "function" && _a || Object])
], SubmitPostComponent);

var _a;
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