"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherNoticeUtils = void 0);
const ue_1 = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  BaseDefine_1 = require("../BaseConfig/BaseDefine"),
  Platform_1 = require("../Platform/Platform"),
  PlatformSdkManagerNew_1 = require("../Platform/PlatformSdk/PlatformSdkManagerNew"),
  LauncherLanguageLib_1 = require("../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherNoticeDefine_1 = require("./LauncherNoticeDefine"),
  LauncherNoticeSdk_1 = require("./LauncherNoticeSdk");
class LauncherNoticeUtils {
  static OpenNotice() {
    this.HasNoticeAutoOpened || (this.nM1(), (this.HasNoticeAutoOpened = !0));
  }
  static OpenNoticeByUser() {
    this.nM1();
  }
  static nM1() {
    var e = this.GetNoticeUrl();
    this.u_1()
      ? (LauncherLog_1.LauncherLog.Info("热更阶段打开公告 - sdk旧", ["Url", e]),
        this.d_1(e))
      : PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
        ? (LauncherLog_1.LauncherLog.Info("热更阶段打开公告 - sdk新", [
            "Url",
            e,
          ]),
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenWebView(
            e,
          ))
        : (LauncherLog_1.LauncherLog.Info("热更阶段打开公告 - 无sdk", [
            "Url",
            e,
          ]),
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenExternalUrl(
            e,
          ));
  }
  static d_1(e) {
    LauncherNoticeSdk_1.LauncherNoticeSdkFactory.Create().OpenUrl(
      "",
      e,
      !0,
      !0,
      !0,
    );
  }
  static GetNoticeUrl() {
    var e = this.Y3l(),
      r = this.m_1(),
      t = LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage() ?? "",
      a = this.f_1(),
      i = LauncherNoticeDefine_1.PRE_LOGIN_ROLE_ID,
      n = this.KZs() ? "global" : "cn",
      o = this.g_1(),
      _ = this.C_1(),
      c = this.z3l();
    return (
      e +
      `?server_id=${r}&role_id=${i}&user_id=${LauncherNoticeDefine_1.PRE_LOGIN_USER_ID}&game_id=${o}&svr_area=${n}&did=${a}&channel=${_}&platform=${c}&lang=` +
      t
    );
  }
  static u_1() {
    return (
      !PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      ue_1.KuroStaticLibrary.IsModuleLoaded("KuroSDK") &&
      BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") ===
        BaseDefine_1.USESDK
    );
  }
  static KZs() {
    return (
      "CN" !==
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
    );
  }
  static p_1() {
    return this.KZs()
      ? LauncherNoticeDefine_1.SERVER_ID_GLOBAL
      : LauncherNoticeDefine_1.SERVER_ID_CN;
  }
  static m_1() {
    var e =
      BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
        ?.LoginServers;
    return e && 0 !== e.length ? (e[0].id ?? this.p_1()) : this.p_1();
  }
  static g_1() {
    return this.KZs() ? "G153" : "G152";
  }
  static Y3l() {
    return this.KZs()
      ? LauncherNoticeDefine_1.NOTICE_PRE_URL_GLOBAL
      : LauncherNoticeDefine_1.NOTICE_PRE_URL_CN;
  }
  static f_1() {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetDeviceId()
      : this.u_1()
        ? (ue_1.KuroSDKManager.GetBasicInfo().DeviceId ?? "")
        : "";
  }
  static C_1() {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetChannelId()
      : this.u_1()
        ? LauncherNoticeSdk_1.LauncherNoticeSdkFactory.Create().GetChannelId()
        : "";
  }
  static z3l() {
    return Platform_1.Platform.IsAndroidPlatform()
      ? "Android"
      : Platform_1.Platform.IsIOSPlatform()
        ? "iOS"
        : Platform_1.Platform.IsMacPlatform()
          ? "Mac"
          : Platform_1.Platform.IsPs5Platform()
            ? "PS5"
            : "PC";
  }
}
((exports.LauncherNoticeUtils = LauncherNoticeUtils).HasNoticeAutoOpened = !1),
  (LauncherNoticeUtils.NoticeOpenDownloadSizeThreshold =
    LauncherNoticeDefine_1.NOTICE_AUTO_OPEN_DOWNLOAD_SIZE_THRESHOLD);
//# sourceMappingURL=LauncherNoticeUtils.js.map
