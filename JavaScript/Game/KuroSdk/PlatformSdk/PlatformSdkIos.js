"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkIos = void 0);
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
  PlatformSdkBase_1 = require("./PlatformSdkBase"),
  MAXREVIEWTIME = 3;
class ISdkCustomerService extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.cuid = ""), (this.isredot = 0);
  }
}
class PlatformSdkIos extends PlatformSdkBase_1.PlatformSdkBase {
  constructor() {
    super(...arguments),
      (this.wSe = new Map()),
      (this.CustomerServiceResultCallBack = (e) => {
        var r = Json_1.Json.Parse(e);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", ["num", e]),
          r &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", [
                "num",
                r.isredot,
              ]),
            (this.CurrentCustomerShowState = 0 < r.isredot)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
          );
      }),
      (this.AnnounceRedPointCallBack = (e) => {
        e.includes("showRed") && (e.includes("1") || e.includes("YES"))
          ? ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
              !0,
            )
          : ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
              !1,
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
          );
      });
  }
  OnInit() {
    (this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        UE.KuroLauncherLibrary.IsFirstIntoLauncher() &&
        ue_1.KuroSDKManager.PostSplashScreenEndSuccess(),
      cpp_1.FCrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid),
      cpp_1.FCrashSightProxy.SetCustomData("Sdkidfv", this.YSe()),
      cpp_1.FCrashSightProxy.SetCustomData("SdkJyId", this.GetJyDid()),
      cpp_1.FCrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
  }
  BindSpecialEvent() {
    ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Clear(),
      ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Add(
        this.AnnounceRedPointCallBack,
      ),
      ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Clear(),
      ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Add(
        this.CustomerServiceResultCallBack,
      );
  }
  OpenCustomerService(e) {
    var r = ModelManager_1.ModelManager.LoginModel,
      t = ModelManager_1.ModelManager.PlayerInfoModel,
      o = new KuroSdkData_1.OpenCustomerServiceParamIos(),
      e =
        ((o.islogin = r.IsSdkLoggedIn() ? 1 : 0),
        (o.from = e),
        (o.RoleId = t.GetId()),
        (o.RoleName = t.GetAccountName()),
        (o.ServerId = r.GetServerId()),
        (o.ServerName = r.GetServerName()),
        (o.RoleLevel = t.GetPlayerLevel()),
        Json_1.Json.Stringify(o));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "IosCustomerService", ["json", e]),
      ue_1.KuroSDKManager.OpenCustomerService(e);
  }
  GetChannelId() {
    return this.BSe("channelId");
  }
  Share(e, r) {
    e = Json_1.Json.Stringify(e);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "Share", ["json", e], ["imagePath", r]),
      UE.KuroSDKStaticLibrary.Share(r, e);
  }
  ShareTexture(e, r) {
    e = Json_1.Json.Stringify(e);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "Share", ["json", e], ["imagePath", r]),
      UE.KuroSDKStaticLibrary.Share(r, e);
  }
  OnGetSharePlatform(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "OnGetSharePlatform", [
        "OnGetSharePlatform",
        e,
      ]);
    var r = Json_1.Json.Parse(e);
    if (0 === r.KRMAINLAND_SDK_EVENT_KEY_RESULT) {
      r = Json_1.Json.Parse(r.KRMAINLAND_SDK_EVENT_KEY_DATA);
      const t = new Array();
      r?.forEach((e) => {
        var r = new PlatformSdkBase_1.SharePlatformSt();
        (r.IconUrl = e.iconUrl),
          (r.PlatformId = e.platform.toString()),
          t.push(r);
      }),
        this.GetSharePlatformCallBackList.forEach((e) => {
          e(t);
        }),
        (this.GetSharePlatformCallBackList = []);
    }
    super.OnGetSharePlatform(e);
  }
  SetFont() {
    var e = ModelManager_1.ModelManager.KuroSdkModel.GetDeviceFontAsset();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "SetFont", ["fontPath", e]),
      ue_1.KuroSDKManager.SetFont(e);
  }
  OnShareResult(e, r, t) {
    var o = r.replace(/[\n\s]/g, ""),
      n = Json_1.Json.Parse(o);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "KuroSdk",
        28,
        "OnShareResult",
        ["code", e],
        ["platform", r],
        ["finalMsg", o],
        ["shareResult", n],
      ),
      n?.KRMAINLAND_SDK_EVENT_KEY_RESULT
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnShareResult,
            !0,
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnShareResult,
            !1,
          );
  }
  YSe() {
    return this.BSe("idfv");
  }
  GetJyDid() {
    return this.BSe("jyDeviceId");
  }
  BSe(e) {
    if (0 === this.wSe.size) {
      var r = ue_1.KuroSDKManager.GetSdkParams("").split(","),
        t = r.length;
      for (let e = 0; e < t; e++) {
        var o = r[e].split("=");
        2 === o.length && this.wSe.set(o[0], o[1]);
      }
    }
    e = this.wSe.get(e);
    return e && !StringUtils_1.StringUtils.IsEmpty(e) ? e : "";
  }
  SdkLogout() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "游戏注销"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ue_1.KuroSDKManager.KuroSDKEvent(5, "");
  }
  CurrentPlatformYearReviewTime() {
    return MAXREVIEWTIME;
  }
}
exports.PlatformSdkIos = PlatformSdkIos;
//# sourceMappingURL=PlatformSdkIos.js.map
