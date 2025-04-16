"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkMac = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  ue_1 = require("ue"),
  Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  KuroSdkData_1 = require("../KuroSdkData"),
  PlatformSdkBase_1 = require("./PlatformSdkBase");
class ISdkCustomerService extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.cuid = ""), (this.isredot = 0);
  }
}
class PlatformSdkMac extends PlatformSdkBase_1.PlatformSdkBase {
  constructor() {
    super(...arguments),
      (this.wSe = new Map()),
      (this.CustomerServiceResultCallBack = (e) => {
        var r = Json_1.Json.Parse(e);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 27, "当前客服红点数量", ["num", e]),
          r &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("KuroSdk", 27, "当前客服红点数量", [
                "num",
                r.isredot,
              ]),
            (this.CurrentCustomerShowState = 0 < r.isredot)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
          );
      });
  }
  OnInit() {
    (this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        UE.KuroLauncherLibrary.IsFirstIntoLauncher() &&
        ue_1.KuroSDKManager.PostSplashScreenEndSuccess(),
      cpp_1.FCrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid),
      cpp_1.FCrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
  }
  BindSpecialEvent() {
    ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Clear(),
      ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Add(
        this.CustomerServiceResultCallBack,
      );
  }
  OpenCustomerService(e) {
    var r = ModelManager_1.ModelManager.LoginModel,
      o = new KuroSdkData_1.OpenCustomerServiceParamMac(),
      r =
        ((o.islogin = r.IsSdkLoggedIn() ? 1 : 0),
        (o.from = e),
        Json_1.Json.Stringify(o));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 27, "MacCustomerService", ["json", r]),
      ue_1.KuroSDKManager.OpenCustomerService(r);
  }
  GetChannelId() {
    return this.BSe("channelId");
  }
  SetFont() {
    var e = ModelManager_1.ModelManager.KuroSdkModel.GetDeviceFontAsset();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 27, "Mac SetFont", ["fontPath", e]),
      ue_1.KuroSDKManager.SetFont(e);
  }
  BSe(e) {
    if (0 === this.wSe.size) {
      var r = ue_1.KuroSDKManager.GetSdkParams("").split(","),
        o = r.length;
      for (let e = 0; e < o; e++) {
        var t = r[e].split("=");
        2 === t.length && this.wSe.set(t[0], t[1]);
      }
    }
    e = this.wSe.get(e);
    return e && !StringUtils_1.StringUtils.IsEmpty(e) ? e : "";
  }
  OpenWebView(e, r, o, t, n) {
    ue_1.KuroSDKManager.OpenWebView(r, e, o, t, n, "");
  }
  SdkExit() {
    ue_1.KuroSDKManager.ShowExitGameDialog();
  }
  SdkLogout() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 27, "游戏注销"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ue_1.KuroSDKManager.KuroSDKEvent(5, "");
  }
}
exports.PlatformSdkMac = PlatformSdkMac;
//# sourceMappingURL=PlatformSdkMac.js.map
