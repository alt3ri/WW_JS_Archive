"use strict";
var ELoginStatus, ELoginSex, ECleanFailCountWay, ESdkLoginCode;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginQueueConfig =
    exports.DEFAULTPORT =
    exports.ESdkLoginCode =
    exports.ECleanFailCountWay =
    exports.ELoginSex =
    exports.ELoginStatus =
      void 0),
  (function (e) {
    (e[(e.Init = 0)] = "Init"),
      (e[(e.LoginViewOpen = 1)] = "LoginViewOpen"),
      (e[(e.SdkViewOpen = 2)] = "SdkViewOpen"),
      (e[(e.SdkLoginSuccecc = 3)] = "SdkLoginSuccecc"),
      (e[(e.SdkLoginFail = 4)] = "SdkLoginFail"),
      (e[(e.LoginHttp = 5)] = "LoginHttp"),
      (e[(e.LoginHttpRet = 6)] = "LoginHttpRet"),
      (e[(e.ConvGate = 7)] = "ConvGate"),
      (e[(e.ConvRet = 8)] = "ConvRet"),
      (e[(e.ProtoKeyReq = 9)] = "ProtoKeyReq"),
      (e[(e.ProtoKeyRet = 10)] = "ProtoKeyRet"),
      (e[(e.LoginReq = 11)] = "LoginReq"),
      (e[(e.LoginRet = 12)] = "LoginRet"),
      (e[(e.CreateReq = 13)] = "CreateReq"),
      (e[(e.CreateRet = 14)] = "CreateRet"),
      (e[(e.EnterGameReq = 15)] = "EnterGameReq"),
      (e[(e.EnterGameRet = 16)] = "EnterGameRet"),
      (e[(e.PatchVerifyFail = 17)] = "PatchVerifyFail");
  })((ELoginStatus = exports.ELoginStatus || (exports.ELoginStatus = {}))),
  (function (e) {
    (e[(e.Girl = 0)] = "Girl"), (e[(e.Boy = 1)] = "Boy");
  })((ELoginSex = exports.ELoginSex || (exports.ELoginSex = {}))),
  (function (e) {
    (e[(e.LoginSuccess = 0)] = "LoginSuccess"),
      (e[(e.RefreshTime = 1)] = "RefreshTime"),
      (e[(e.TestLogin = 2)] = "TestLogin");
  })(
    (ECleanFailCountWay =
      exports.ECleanFailCountWay || (exports.ECleanFailCountWay = {})),
  ),
  (function (e) {
    (e[(e.LoginFailed = 0)] = "LoginFailed"),
      (e[(e.LoginSuccess = 1)] = "LoginSuccess");
  })((ESdkLoginCode = exports.ESdkLoginCode || (exports.ESdkLoginCode = {}))),
  (exports.DEFAULTPORT = "5500");
class LoginQueueConfig {
  constructor() {
    (this.K9n = 0), (this.Q9n = 0);
  }
}
exports.LoginQueueConfig = LoginQueueConfig;
//# sourceMappingURL=LoginDefine.js.map
