"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatchKuroSdk = void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  HotPatchKuroTdm_1 = require("./HotPatchKuroTdm"),
  SdkReportData_1 = require("./SdkReportData"),
  USESDK = "1";
class HotPatchKuroSdk {
  static CanUseSdk() {
    return !(
      !UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") ||
      BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") !==
        USESDK
    );
  }
  static Init() {
    this.CanUseSdk()
      ? (this.qSr = new Promise((t) => {
          UE.KuroLauncherLibrary.IsFirstIntoLauncher()
            ? (this.GSr(t),
              this.ReportEvent(
                SdkReportData_1.HotPatchReportData.CreateData(0, void 0),
              ))
            : t();
        }))
      : HotPatchKuroTdm_1.HotPatchKuroTdm.Init();
  }
  static GSr(e) {
    if (this.CanUseSdk())
      if ((UE.KuroSDKManager.Start(), UE.KuroSDKManager.GetSdkInitState()))
        LauncherLog_1.LauncherLog.Info("SDK初始化已完成，无需再次初始化"),
          e?.();
      else {
        UE.KuroSDKManager.Initialize();
        const o = (t) => {
          UE.KuroSDKManager.Get().InitDelegate.Remove(o),
            LauncherLog_1.LauncherLog.Debug("SDK初始化完成"),
            HotPatchKuroTdm_1.HotPatchKuroTdm.Init(),
            e?.();
        };
        UE.KuroSDKManager.Get().InitDelegate.Add(o),
          UE.KuroSDKManager.KuroSDKEvent(17, ""),
          UE.KuroSDKManager.Get().ExitDelegate.Clear(),
          UE.KuroSDKManager.Get().ExitDelegate.Add(() => {
            LauncherLog_1.LauncherLog.Debug(
              "HotPatchKuroSdk KuroSDKManager.Get()!.ExitDelegate Call",
            ),
              UE.KuroStaticLibrary.ExitGame(!1);
          });
      }
    else e?.();
  }
  static ReportEvent(t) {
    t && this.CanUseSdk() && this.NSr(t);
  }
  static async NSr(t) {
    "" !== t.GetEventName() &&
      (this.qSr && (await this.qSr),
      UE.KuroSDKManager.LogMarketingEvent(t.GetReportString()));
  }
}
(exports.HotPatchKuroSdk = HotPatchKuroSdk).qSr = void 0;
//# sourceMappingURL=HotPatchKuroSdk.js.map
