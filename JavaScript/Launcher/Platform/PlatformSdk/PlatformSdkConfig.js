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
      i = this.qYa();
    ue_1.KuroStaticLibrary.LoadFileToString(t, i)
      ? (7 === Platform_1.Platform.Type
          ? (this.IsGlobal = !0)
          : (this.IsGlobal =
              "CN" !==
              BaseConfigController_1.BaseConfigController.GetPublicValue(
                "SdkArea",
              )),
        (this.Json = JSON.parse((0, puerts_1.$unref)(t))),
        LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew]PlatformSdkConfig.Initialized",
          ["Json", this.Json],
        ))
      : LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew]PlatformSdkConfig.Initialize failed",
          ["path", i],
        );
  }
  static qYa() {
    return (
      void 0 === this.OYa &&
        (this.OYa =
          ue_1.BlueprintPathsLibrary.ProjectConfigDir() +
          "Kuro/KuroPlatformSdkConfig.json"),
      this.OYa
    );
  }
  static GetMainlandOrGlobalConfig() {
    return this.IsGlobal ? this.Json.Global : this.Json.Mainland;
  }
  static oAa(t) {
    var i = LauncherLanguageLib_1.LauncherLanguageLib.GetPackageLanguage();
    return t.replace("language_{0}", "language_" + i);
  }
  static GetPrivacyPolicy() {
    return this.IsGlobal
      ? this.oAa(this.Json.Global.PrivacyPolicy)
      : this.Json.Mainland.PrivacyPolicy;
  }
  static GetTermsOfService() {
    return this.IsGlobal
      ? this.oAa(this.Json.Global.TermsOfService)
      : this.Json.Mainland.TermsOfService;
  }
  static GetChildPolicy() {
    return this.IsGlobal ? "" : this.Json.Mainland.ChildProtocol;
  }
  static GetServerUrl(t = !1) {
    t = t ? this.Json.SdkServerUrl2 : this.Json.SdkServerUrl;
    return cpp_1.FKuroUtilityForPuerts.IsBuildShipping()
      ? this.Json.IsPre
        ? t.Pre
        : t.Shipping
      : t.Test;
  }
  static GetPayUrl(t = !1) {
    t = t ? this.Json.SdkPayUrl2 : this.Json.SdkPayUrl;
    return cpp_1.FKuroUtilityForPuerts.IsBuildShipping()
      ? this.Json.IsPre
        ? t.Pre
        : t.Shipping
      : t.Test;
  }
}
((exports.PlatformSdkConfig = PlatformSdkConfig).Json = void 0),
  (PlatformSdkConfig.IsGlobal = !1),
  (PlatformSdkConfig.OYa = void 0);
//# sourceMappingURL=PlatformSdkConfig.js.map
