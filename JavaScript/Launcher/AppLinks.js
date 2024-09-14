"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AppLinks = void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("./BaseConfig/BaseConfigController"),
  HotPatchKuroSdk_1 = require("./HotPatchKuroSdk/HotPatchKuroSdk"),
  HotPatchLogReport_1 = require("./HotPatchLogReport"),
  Platform_1 = require("./Platform/Platform"),
  LauncherLog_1 = require("./Util/LauncherLog"),
  APP_LINKS_HOST = "mc.kurogame.com",
  APP_LINKS_HOST_GLOBAL = "wutheringwaves.kurogame.com";
class AppLinks {
  static Init() {
    var e;
    AppLinks.S_e ||
      (Platform_1.Platform.IsMobilePlatform() &&
        ((e =
          "CN" !==
          BaseConfigController_1.BaseConfigController.GetPublicValue(
            "SdkArea",
          )),
        Platform_1.Platform.IsIOSPlatform() && e
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
            Platform_1.Platform.IsAndroidPlatform()
              ? UE.KuroSDKManager.CheckApplinksActivation()
              : Platform_1.Platform.IsIOSPlatform() &&
                UE.KuroLauncherLibrary.IsFirstIntoLauncher() &&
                (LauncherLog_1.LauncherLog.Info("派发IOS缓存的事件"),
                UE.KuroiOSDelegateStaticLibrary.DispatchCacheMessage()),
            (AppLinks.S_e = !0))));
  }
  static Destroy() {
    AppLinks.S_e &&
      (UE.KuroSDKManager.Get().OnActivatedByApplinksDelegate.Clear(),
      this.u2n.clear(),
      (AppLinks.S_e = !1));
  }
  static ReportApplinksActivation(e, t, o) {
    (e !== APP_LINKS_HOST && e !== APP_LINKS_HOST_GLOBAL) ||
      (HotPatchLogReport_1.HotPatchLogReport.ReportAppLinksEvent(t, o),
      "" !== t && this.u2n.has(t) && this.u2n.get(t)(t, o)),
      LauncherLog_1.LauncherLog.Info(
        `Application Activated By AppLinks: ${e}, ${t}, ` + o,
      );
  }
  static SetDeepValueHandle(e, t) {
    this.u2n.has(e)
      ? LauncherLog_1.LauncherLog.Error(
          "Try to set duplicated handle for deepvalue: " + e,
        )
      : this.u2n.set(e, t);
  }
  static RemoveDeepValueHandle(e) {
    this.u2n.has(e)
      ? this.u2n.delete(e)
      : LauncherLog_1.LauncherLog.Error(
          "Can't find handle for deepvalue: " + e,
        );
  }
}
((exports.AppLinks = AppLinks).S_e = !1), (AppLinks.u2n = new Map());
//# sourceMappingURL=AppLinks.js.map
