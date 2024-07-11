"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkNew = void 0);
const LauncherLog_1 = require("../../Util/LauncherLog");
class PlatformSdkNew {
  constructor() {
    this.kPt = !1;
  }
  IsOn() {
    return !1;
  }
  Initialize() {
    return this.kPt
      ? (LauncherLog_1.LauncherLog.Error("[PlatformSdkNew]平台SDK重复初始化"),
        !1)
      : this.OnInit()
        ? (this.SetServerCommonParam(), (this.kPt = !0))
        : (LauncherLog_1.LauncherLog.Error("[PlatformSdkNew]平台SDK初始化失败"),
          !1);
  }
  UnInitialize() {
    return this.kPt
      ? this.OnUnInit()
        ? !(this.kPt = !1)
        : (LauncherLog_1.LauncherLog.Error("[PlatformSdkNew]平台SDK注销失败"),
          !1)
      : (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew]平台SDK注销失败, 未初始化",
        ),
        !1);
  }
  OnInit() {
    return !0;
  }
  OnUnInit() {
    return !0;
  }
  NeedPrivacyProtocol() {
    return !1;
  }
  GetDeviceId() {
    return "NotImplement";
  }
  SetServerCommonParam() {}
  Login(e) {}
}
exports.PlatformSdkNew = PlatformSdkNew;
//# sourceMappingURL=PlatformSdkNew.js.map
