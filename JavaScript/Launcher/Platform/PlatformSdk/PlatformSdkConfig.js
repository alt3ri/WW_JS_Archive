"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkConfig = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  Platform_1 = require("../Platform");
class PlatformSdkConfig {
  static Initialize() {
    var t = (0, puerts_1.$ref)(void 0),
      e = this.Reh();
    ue_1.KuroStaticLibrary.LoadFileToString(t, e)
      ? ((this.IsGlobal =
          "CN" !==
          BaseConfigController_1.BaseConfigController.GetPublicValue(
            "SdkArea",
          )),
        (this.ssl = JSON.parse((0, puerts_1.$unref)(t))),
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew]PlatformSdkConfig.Initialized",
          ["Json", this.ssl],
        ),
        (this.S_e = !0))
      : LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew]PlatformSdkConfig.Initialize failed",
          ["path", e],
        );
  }
  static bu1() {
    var t,
      e = BaseConfigController_1.BaseConfigController.GetSdkEnvironment();
    return e &&
      ((t = cpp_1.KuroApplication.IniPlatformName()),
      LauncherLog_1.LauncherLog.Debug("GetApplicationReleaseType", [
        "platformName",
        e[t],
      ]),
      void 0 !== e[t]) &&
      "" !== e[t]
      ? e[t]
      : "Product";
  }
  static asl() {
    var t = this.lsl();
    switch (this.bu1()) {
      case "Development":
        return t.Development;
      case "Product":
        return t.Release;
      case "Prerelease":
        return t.PreRelease;
      default:
        return t.Development;
    }
  }
  static lsl() {
    return (
      this.S_e || this.Initialize(),
      7 === Platform_1.Platform.Type && this.ssl ? this.ssl.PS5 : {}
    );
  }
  static Reh() {
    return (
      void 0 === this.Ueh &&
        (this.Ueh =
          ue_1.BlueprintPathsLibrary.ProjectConfigDir() +
          "Kuro/KuroPlatformSdkConfig.json"),
      this.Ueh
    );
  }
  static GetProjectId() {
    return this.lsl().projectId;
  }
  static GetProductId() {
    return this.asl().productId;
  }
  static GetChannelId() {
    return this.lsl().channelId;
  }
  static GetPlatform() {
    return this.lsl().platform;
  }
  static GetVersion() {
    return this.lsl().version;
  }
  static GetSdkVersion() {
    return this.lsl().sdkVersion;
  }
  static GetSdkServerVersion() {
    return this.lsl().sdkServerVersion;
  }
  static eRa(t) {
    var e = LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage();
    return t.replace("language_{0}", "language_" + e);
  }
  static GetPrivacyPolicy() {
    var t;
    return this.hsl
      ? ((t = this.hsl.PrivacyPolicy),
        this.IsGlobal && this.hsl.PrivacyPolicy ? this.eRa(t) : t)
      : "";
  }
  static GetTermsOfService() {
    var t;
    return this.hsl
      ? ((t = this.hsl.TermsOfService),
        this.IsGlobal && this.hsl.TermsOfService ? this.eRa(t) : t)
      : "";
  }
  static GetChildPolicy() {
    var t;
    return this.hsl
      ? ((t = this.hsl.ChildProtocol),
        this.IsGlobal && this.hsl.ChildProtocol ? this.eRa(t) : t)
      : "";
  }
  static GetServerUrl(t = !1) {
    t = t ? 1 : 0;
    if (this.hsl) {
      if (this.hsl.ServerUrl.length > t) return this.hsl.ServerUrl[t];
      if (0 < this.hsl.ServerUrl.length) return this.hsl.ServerUrl[0];
    }
    return LauncherLog_1.LauncherLog.Error("获取服务器地址失败"), "";
  }
  static GetPayUrl(t = !1) {
    t = t ? 1 : 0;
    if (this.hsl) {
      if (this.hsl.PayUrl.length > t) return this.hsl.PayUrl[t];
      if (0 < this.hsl.PayUrl.length) return this.hsl.PayUrl[0];
    }
    return LauncherLog_1.LauncherLog.Error("获取支付地址失败"), "";
  }
  static GetClientId() {
    return this.hsl ? this.hsl.client_id : "";
  }
  static GetClientSecret() {
    return this.hsl ? this.hsl.client_secret : "";
  }
  static GetPlatformPkg() {
    return this.hsl ? this.hsl.platform_pkg : "";
  }
  static GetPlatformClientId() {
    return this.hsl ? this.hsl.platform_client_id : "";
  }
  static GetPlatformClientSecret() {
    return this.hsl ? this.hsl.platform_client_secret : "";
  }
  static GetUserCenterUrl() {
    return this.hsl ? this.hsl.UserCenterUrl : "";
  }
  static GetDataReportUrl() {
    return this.hsl ? this.hsl.DataReportUrl : "";
  }
  static GetDataReportId() {
    return this.hsl ? this.hsl.DataReportId : "";
  }
  static GetCustomServiceUrl() {
    return this.hsl ? this.hsl.CustomServiceUrl : "";
  }
  static GetCustomerServiceUrl(t) {
    let e = this._sl.get(t);
    return (
      LauncherLog_1.LauncherLog.Debug(
        "获取客服链接",
        ["data", this._sl],
        ["language", t],
      ),
      (e = e || this._sl.get("en")),
      LauncherLog_1.LauncherLog.Debug("获取客服链接", [
        "jsonLinkData.link",
        e.link,
      ]),
      e.link
    );
  }
  static TMi(t) {
    return (
      t +
      `/${this.bu1()}/${this.GetProjectId()}/${this.GetChannelId()}/${this.GetProductId()}/config.json`
    );
  }
  static async RequestBaseData(t) {
    var e = this.bu1(),
      e =
        (LauncherLog_1.LauncherLog.Debug("当前版本", ["edition", e]),
        this.asl().CdnUrlPrefix),
      e =
        (this.ShuffleArray(e),
        await BaseConfigController_1.BaseConfigController.DoRequest(
          e,
          (t) => this.TMi(t),
          t,
        ));
    if (!e)
      return LauncherLog_1.LauncherLog.Error("获取CDN数据失败，异常流程"), !1;
    var t = JSON.parse(e.Result),
      r =
        ((this.hsl = t),
        LauncherLog_1.LauncherLog.Info("获取CDN数据成功", ["serverConfig", t]),
        t.cs_links);
    if ((this._sl.clear(), r)) for (const i in r) this._sl.set(i, r[i]);
    return !0;
  }
  static ShuffleArray(e) {
    for (let t = e.length - 1; 0 < t; t--) {
      var r = Math.floor(Math.random() * (t + 1));
      [e[t], e[r]] = [e[r], e[t]];
    }
    return e;
  }
}
((exports.PlatformSdkConfig = PlatformSdkConfig)._sl = new Map()),
  (PlatformSdkConfig.ssl = void 0),
  (PlatformSdkConfig.hsl = void 0),
  (PlatformSdkConfig.IsGlobal = !1),
  (PlatformSdkConfig.Ueh = void 0),
  (PlatformSdkConfig.S_e = !1);
//# sourceMappingURL=PlatformSdkConfig.js.map
