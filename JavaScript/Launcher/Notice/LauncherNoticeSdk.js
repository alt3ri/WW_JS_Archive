"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherNoticeSdkBase = exports.LauncherNoticeSdkFactory = void 0);
const ue_1 = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  BaseDefine_1 = require("../BaseConfig/BaseDefine"),
  Platform_1 = require("../Platform/Platform"),
  PlatformSdkConfig_1 = require("../Platform/PlatformSdk/PlatformSdkConfig"),
  PlatformSdkManagerNew_1 = require("../Platform/PlatformSdk/PlatformSdkManagerNew"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  canUseSdk = () =>
    !PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
    ue_1.KuroStaticLibrary.IsModuleLoaded("KuroSDK") &&
    BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") ===
      BaseDefine_1.USESDK;
class LauncherNoticeSdkFactory {
  static Create() {
    return new (
      canUseSdk()
        ? Platform_1.Platform.IsAndroidPlatform()
          ? LauncherNoticeSdkAndroid
          : Platform_1.Platform.IsIOSPlatform()
            ? LauncherNoticeSdkIosGlobal
            : Platform_1.Platform.IsWindowsPlatform()
              ? "Android" === Platform_1.Platform.CloudGamePlatform ||
                "IOS" === Platform_1.Platform.CloudGamePlatform ||
                "Mac" === Platform_1.Platform.CloudGamePlatform ||
                "Windows" === Platform_1.Platform.CloudGamePlatform
                ? LauncherNoticeSdkCloud
                : this.KZs()
                  ? LauncherNoticeSdkWindowsGlobal
                  : LauncherNoticeSdkWindows
              : Platform_1.Platform.IsMacPlatform()
                ? LauncherNoticeSdkMacGlobal
                : LauncherNoticeSdkBase
        : LauncherNoticeSdkBase
    )();
  }
  static KZs() {
    return (
      "CN" !==
        BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea") ||
      (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
        PlatformSdkConfig_1.PlatformSdkConfig.IsGlobal)
    );
  }
}
exports.LauncherNoticeSdkFactory = LauncherNoticeSdkFactory;
class LauncherNoticeSdkBase {
  GetChannelId() {
    return "";
  }
  OpenUrl(e, r, a, t, n) {
    canUseSdk() &&
      ((e = this.GetSdkOpenUrlWndInfo(e, r)),
      ue_1.KuroSDKManager.KuroSDKEvent(9, e ?? ""));
  }
  GetSdkOpenUrlWndInfo(e, r) {
    return JSON.stringify({ title: e, url: r });
  }
  IsValidJsonStr(e) {
    try {
      return JSON.parse(e), !0;
    } catch {
      return (
        LauncherLog_1.LauncherLog.Warn("待解析的字符串不合法", ["", e]), !1
      );
    }
  }
}
class LauncherNoticeSdkCloud extends (exports.LauncherNoticeSdkBase =
  LauncherNoticeSdkBase) {
  OpenUrl(e, r, a, t, n) {
    e = JSON.stringify({
      title: e,
      url: r,
      transparent: t,
      webAccelerated: n,
      isLandscape: a,
    });
    ue_1.KuroCloudGameWrapper.SendDataToPipeBinaryWithKey("OpenWebView", e);
  }
}
class LauncherNoticeSdkAndroid extends LauncherNoticeSdkBase {
  OpenUrl(e, r, a, t, n) {
    ue_1.KuroSDKManager.OpenWebView(e, r, a, t, n, "");
  }
  GetChannelId() {
    for (const r of ue_1.KuroSDKManager.GetSdkParams("").split(",")) {
      var e = r.split("=");
      if (2 === e.length && "channelId" === e[0]) return e[1];
    }
    return "";
  }
}
class LauncherNoticeSdkIosGlobal extends LauncherNoticeSdkBase {
  OpenUrl(e, r, a, t, n) {
    ue_1.KuroSDKManager.OpenWebView(r, e, a, t, n, "");
  }
  GetChannelId() {
    var e = ue_1.KuroSDKManager.GetSdkParams("");
    return this.IsValidJsonStr(e) ? (JSON.parse(e)?.channelId ?? "") : "";
  }
}
class LauncherNoticeSdkMacGlobal extends LauncherNoticeSdkBase {
  OpenUrl(e, r, a, t, n) {
    ue_1.KuroSDKManager.OpenWebView(r, e, a, t, n, "");
  }
  GetChannelId() {
    var e = ue_1.KuroSDKManager.GetSdkParams("");
    return this.IsValidJsonStr(e) ? (JSON.parse(e)?.channelId ?? "") : "";
  }
}
class LauncherNoticeSdkWindows extends LauncherNoticeSdkBase {
  OpenUrl(e, r, a, t, n) {
    var o = JSON.stringify({
      title: e,
      url: r,
      transparent: t,
      webAccelerated: n,
      innerbrowser: !0,
    });
    ue_1.KuroSDKManager.OpenWebView(r, e, a, t, n, o);
  }
  GetChannelId() {
    var e = ue_1.KuroSDKManager.GetSdkParams("");
    return this.IsValidJsonStr(e) ? (JSON.parse(e)?.channelId ?? "") : "";
  }
}
class LauncherNoticeSdkWindowsGlobal extends LauncherNoticeSdkBase {
  OpenUrl(e, r, a, t, n) {
    let o = !1;
    var l = {
        title: e,
        url: r,
        transparent: t,
        titleBar: (o = t ? !0 : o),
        webAccelerated: n,
        innerbrowser: !0,
      },
      l = JSON.stringify(l);
    ue_1.KuroSDKManager.OpenWebView(r, e, a, t, n, l);
  }
  GetChannelId() {
    var e = ue_1.KuroSDKManager.GetSdkParams("");
    return this.IsValidJsonStr(e) ? (JSON.parse(e)?.channelId ?? "") : "";
  }
}
//# sourceMappingURL=LauncherNoticeSdk.js.map
