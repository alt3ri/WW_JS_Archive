"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkConfig = void 0);
const puerts_1 = require("puerts"),
  ue_1 = require("ue"),
  BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  LauncherLanguageLib_1 = require("../../Util/LauncherLanguageLib"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  PLATFORM_SDK_CONFIG_PATH =
    ue_1.BlueprintPathsLibrary.ProjectConfigDir() +
    "Kuro/KuroPlatformSdkConfig.json";
class PlatformSdkConfig {
  static Initialize() {
    var e = (0, puerts_1.$ref)(void 0);
    ue_1.KuroStaticLibrary.LoadFileToString(e, PLATFORM_SDK_CONFIG_PATH)
      ? ((this.Json = JSON.parse((0, puerts_1.$unref)(e))),
        (this.IsGlobal =
          "CN" !==
          BaseConfigController_1.BaseConfigController.GetPublicValue(
            "SdkArea",
          )),
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew]PlatformSdkConfig.Initialized",
          ["Json", this.Json],
        ))
      : LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew]PlatformSdkConfig.Initialize failed",
          ["path", PLATFORM_SDK_CONFIG_PATH],
        );
  }
  static GetMainlandOrGlobalConfig() {
    return this.IsGlobal ? this.Json.Global : this.Json.Mainland;
  }
  static zya(e) {
    var t = LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage();
    return e.replace("language_{0}", "language_" + t);
  }
  static GetPrivacyPolicy() {
    return this.IsGlobal
      ? this.zya(this.Json.Global.PrivacyPolicy)
      : this.Json.Mainland.PrivacyPolicy;
  }
  static GetTermsOfService() {
    return this.IsGlobal
      ? this.zya(this.Json.Global.TermsOfService)
      : this.Json.Mainland.TermsOfService;
  }
  static GetServerUrl(e = !1) {
    e = e ? this.Json.SdkServerUrl2 : this.Json.SdkServerUrl;
    return ue_1.KuroStaticLibrary.IsBuildShipping()
      ? this.Json.IsPre
        ? e.Pre
        : e.Shipping
      : e.Test;
  }
}
((exports.PlatformSdkConfig = PlatformSdkConfig).Json = void 0),
  (PlatformSdkConfig.IsGlobal = !1);
//# sourceMappingURL=PlatformSdkConfig.js.map
