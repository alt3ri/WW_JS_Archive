"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotPatchPushSdk = void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib");
class HotPatchPushSdk {
  static IfCanUsePush() {
    return !!UE.KuroStaticLibrary.IsModuleLoaded("KuroPushSdk");
  }
  static StartPush() {
    var e, r, t;
    this.IfCanUsePush()
      ? ((e =
          BaseConfigController_1.BaseConfigController.GetPublicValue(
            "PushAppId",
          )),
        (r =
          BaseConfigController_1.BaseConfigController.GetPublicValue(
            "PushAppKey",
          )),
        (t =
          BaseConfigController_1.BaseConfigController.GetPublicValue(
            "PushAppSecret",
          )),
        LauncherLog_1.LauncherLog.Info("push appId" + e),
        LauncherLog_1.LauncherLog.Info("push appKey" + r),
        LauncherLog_1.LauncherLog.Info("push appSecret" + t),
        UE.KuroPushSdkStaticLibrary.Init(),
        UE.KuroPushSdkStaticLibrary.RegistRemoteNotification(),
        UE.KuroPushSdkStaticLibrary.StartPushSdk(e, r, t),
        UE.KuroPushSdkStaticLibrary.ResetBudge(),
        LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
          LauncherStorageLib_1.ELauncherStorageGlobalKey.NotFirstTimeOpenPush,
          !1,
        )
          ? LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
              LauncherStorageLib_1.ELauncherStorageGlobalKey.CachePushOpenState,
              !1,
            )
            ? this.TurnOnPush()
            : this.TurnOffPush()
          : (this.TurnOnPush(),
            LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
              LauncherStorageLib_1.ELauncherStorageGlobalKey
                .NotFirstTimeOpenPush,
              !0,
            )))
      : LauncherLog_1.LauncherLog.Info("不可使用push push 初始化失败");
  }
  static SendLocalPush(e, r, t) {
    this.IfCanUsePush() || LauncherLog_1.LauncherLog.Info("SendLocalPush"),
      UE.KuroPushSdkStaticLibrary.PushLocalNotification(e, r, t);
  }
  static TurnOnPush() {
    this.IfCanUsePush() &&
      (UE.KuroPushSdkStaticLibrary.TurnOnPush(),
      LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.CachePushOpenState,
        !0,
      ));
  }
  static TurnOffPush() {
    this.IfCanUsePush() &&
      (UE.KuroPushSdkStaticLibrary.TurnOffPush(),
      LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.CachePushOpenState,
        !1,
      ));
  }
  static GetPushState() {
    return !!this.IfCanUsePush() && UE.KuroPushSdkStaticLibrary.IsPushTurnOn();
  }
}
exports.HotPatchPushSdk = HotPatchPushSdk;
//# sourceMappingURL=HotPatchPushSdk.js.map
