"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkIos = void 0);
const UE = require("ue");
const ue_1 = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KuroSdkData_1 = require("../KuroSdkData");
const PlatformSdkBase_1 = require("./PlatformSdkBase");
class ISdkCustomerService extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.cuid = ""), (this.isredot = 0);
  }
}
class PlatformSdkIos extends PlatformSdkBase_1.PlatformSdkBase {
  constructor() {
    super(...arguments),
      (this.wEe = new Map()),
      (this.CustomerServiceResultCallBack = (e) => {
        const r = Json_1.Json.Parse(e);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", ["num", e]),
          r &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", [
                "num",
                r.isredot,
              ]),
            (this.CurrentCustomerShowState = r.isredot > 0)),
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
      UE.CrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid),
      UE.CrashSightProxy.SetCustomData("Sdkidfv", this.YEe()),
      UE.CrashSightProxy.SetCustomData("SdkJyId", this.GetJyDid()),
      UE.CrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
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
    const r = ModelManager_1.ModelManager.LoginModel;
    const t = ModelManager_1.ModelManager.PlayerInfoModel;
    const o = new KuroSdkData_1.OpenCustomerServiceParamIos();
    var e =
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
    return this.BEe("channelId");
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
    let r = Json_1.Json.Parse(e);
    if (r.KRMAINLAND_SDK_EVENT_KEY_RESULT === 0) {
      r = Json_1.Json.Parse(r.KRMAINLAND_SDK_EVENT_KEY_DATA);
      const t = new Array();
      r?.forEach((e) => {
        const r = new PlatformSdkBase_1.SharePlatformSt();
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
    ue_1.KuroSDKManager.SetFont("ARFangXinShuH7GBK-HV.ttf");
  }
  OnShareResult(e, r, t) {
    const o = r.replace(/[\n\s]/g, "");
    const n = Json_1.Json.Parse(o);
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
  YEe() {
    return this.BEe("idfv");
  }
  GetJyDid() {
    return this.BEe("jyDeviceId");
  }
  BEe(e) {
    if (this.wEe.size === 0) {
      const r = ue_1.KuroSDKManager.GetSdkParams("").split(",");
      const t = r.length;
      for (let e = 0; e < t; e++) {
        const o = r[e].split("=");
        o.length === 2 && this.wEe.set(o[0], o[1]);
      }
    }
    e = this.wEe.get(e);
    return e && !StringUtils_1.StringUtils.IsEmpty(e) ? e : "";
  }
  SdkLogout() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "游戏注销"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ue_1.KuroSDKManager.KuroSDKEvent(5, "");
  }
}
exports.PlatformSdkIos = PlatformSdkIos;
// # sourceMappingURL=PlatformSdkIos.js.map
