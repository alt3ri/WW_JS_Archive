"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayStation5Sdk = exports.AuthCodeData = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  PlatformSdkConfig_1 = require("./PlatformSdkConfig"),
  PlatformSdkNew_1 = require("./PlatformSdkNew"),
  PlatformSdkServer_1 = require("./PlatformSdkServer");
class AuthCodeData {
  constructor(e, t) {
    (this.AuthCode = e), (this.IssuerId = t);
  }
}
exports.AuthCodeData = AuthCodeData;
class PlayStation5Sdk extends PlatformSdkNew_1.PlatformSdkNew {
  IsOn() {
    return !0;
  }
  OnInit() {
    return (
      PlatformSdkServer_1.PlatformSdkServer.Connect(
        "&pkg=" + PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5.pkg,
      ),
      !0
    );
  }
  OnUnInit() {
    return !0;
  }
  Jya() {
    var e = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5,
      e = (0, puerts_1.$ref)(e.client_id),
      t = (0, puerts_1.$ref)("psn:s2s openid id_token:psn.basic_claims"),
      r = (0, puerts_1.$ref)(""),
      o = (0, puerts_1.$ref)(0),
      e = ue_1.KuroStaticPS5Library.GetAuthCode(e, t, r, o);
    if (0 === e)
      return (
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew][PlayStation5Sdk] GetAuthCode",
          ["result", e],
          ["authCode", r],
          ["issuerId", o],
        ),
        new AuthCodeData((0, puerts_1.$unref)(r), (0, puerts_1.$unref)(o))
      );
    LauncherLog_1.LauncherLog.Error(
      "[PlatformSdkNew][PlayStation5Sdk] GetAuthCode failed",
      ["result", e],
    );
  }
  GetIdToken() {
    var e = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5,
      t = (0, puerts_1.$ref)(e.client_id),
      e = (0, puerts_1.$ref)(e.client_secret),
      r = (0, puerts_1.$ref)(
        "psn:s2s openid id_token:psn.basic_claims id_token:duid",
      ),
      o = (0, puerts_1.$ref)(""),
      t = ue_1.KuroStaticPS5Library.GetIdToken(t, e, r, o);
    if (0 === t)
      return (
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew][PlayStation5Sdk] GetIdToken",
          ["result", t],
          ["idToken", o],
        ),
        (0, puerts_1.$unref)(o)
      );
    LauncherLog_1.LauncherLog.Error(
      "[PlatformSdkNew][PlayStation5Sdk] GetIdToken failed",
      ["result", t],
    );
  }
  NeedPrivacyProtocol() {
    return !0;
  }
  GetDeviceId() {
    var e = this.GetIdToken();
    return (
      LauncherLog_1.LauncherLog.Info(
        "[PlatformSdkNew][PlayStation5Sdk] GetIdToken",
        ["idToken", e],
      ),
      "knight fix me"
    );
  }
  Login(e) {
    var t,
      r,
      o = this.Jya();
    o
      ? ((t = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5),
        (r = PlatformSdkConfig_1.PlatformSdkConfig.GetMainlandOrGlobalConfig()),
        (o = `&psnCode=${o?.AuthCode}&psnCode=${o?.IssuerId}&pkg=${t.pkg}&client_id=${r.client_id}&redirect_uri=1&response_type=code`),
        PlatformSdkServer_1.PlatformSdkServer.Login(o, e))
      : (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew][PlayStation5Sdk] Login failed, empty authCode",
        ),
        e(void 0));
  }
  SetServerCommonParam() {
    var e = PlatformSdkConfig_1.PlatformSdkConfig.Json.PS5,
      t = PlatformSdkConfig_1.PlatformSdkConfig.GetMainlandOrGlobalConfig();
    PlatformSdkServer_1.PlatformSdkServer.SetCommonParam(
      `productId=${e.productId}&projectId=${t.projectId}&deviceNum=${this.GetDeviceId()}&platform=${e.platform}&sdkVersion=${e.sdkVersion}&channelId=` +
        e.channelId,
    );
  }
}
exports.PlayStation5Sdk = PlayStation5Sdk;
//# sourceMappingURL=PlayStation5Sdk.js.map
