"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AppLinks = void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("./BaseConfig/BaseConfigController"),
  HotPatchKuroSdk_1 = require("./HotPatchKuroSdk/HotPatchKuroSdk"),
  HotPatchLogReport_1 = require("./HotPatchLogReport"),
  LauncherLog_1 = require("./Util/LauncherLog"),
  APP_LINKS_HOST = "mc.kurogame.com",
  APP_LINKS_HOST_GLOBAL = "wutheringwaves.kurogame.com";
class AppLinks {
  static Init() {
    var e, t;
    AppLinks.E_e ||
      ("Android" !== (e = UE.GameplayStatics.GetPlatformName()) &&
        "IOS" !== e) ||
      ((t =
        "CN" !==
        BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")),
      "IOS" === e && t
        ? UE.KuroLauncherLibrary.IsFirstIntoLauncher() &&
          (LauncherLog_1.LauncherLog.Info("派发IOS缓存的事件"),
          UE.KuroiOSDelegateStaticLibrary.DispatchCacheMessage())
        : HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk() &&
          (UE.KuroSDKManager.Get().OnActivatedByApplinksDelegate.Clear(),
          UE.KuroSDKManager.Get().OnActivatedByApplinksDelegate.Add(
            (e, t, o) => {
              AppLinks.ReportApplinksActivation(e, t, o);
            },
          ),
          "Android" === e
            ? UE.KuroSDKManager.CheckApplinksActivation()
            : "IOS" === e &&
              UE.KuroLauncherLibrary.IsFirstIntoLauncher() &&
              (LauncherLog_1.LauncherLog.Info("派发IOS缓存的事件"),
              UE.KuroiOSDelegateStaticLibrary.DispatchCacheMessage()),
          (AppLinks.E_e = !0)));
  }
  static Destroy() {
    AppLinks.E_e &&
      (UE.KuroSDKManager.Get().OnActivatedByApplinksDelegate.Clear(),
      this.Jbn.clear(),
      (AppLinks.E_e = !1));
  }
  static ReportApplinksActivation(e, t, o) {
    (e !== APP_LINKS_HOST && e !== APP_LINKS_HOST_GLOBAL) ||
      (HotPatchLogReport_1.HotPatchLogReport.ReportAppLinksEvent(t, o),
      "" !== t && this.Jbn.has(t) && this.Jbn.get(t)(t, o)),
      LauncherLog_1.LauncherLog.Info(
        `Application Activated By AppLinks: ${e}, ${t}, ` + o,
      );
  }
  static SetDeepValueHandle(e, t) {
    this.Jbn.has(e)
      ? LauncherLog_1.LauncherLog.Error(
          "Try to set duplicated handle for deepvalue: " + e,
        )
      : this.Jbn.set(e, t);
  }
  static RemoveDeepValueHandle(e) {
    this.Jbn.has(e)
      ? this.Jbn.delete(e)
      : LauncherLog_1.LauncherLog.Error(
          "Can't find handle for deepvalue: " + e,
        );
  }
}
((exports.AppLinks = AppLinks).E_e = !1), (AppLinks.Jbn = new Map());
//# sourceMappingURL=AppLinks.js.map
