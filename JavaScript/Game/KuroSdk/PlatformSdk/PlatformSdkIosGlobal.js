"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkIosGlobal = void 0);
const UE = require("ue");
const ue_1 = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KuroSdkData_1 = require("../KuroSdkData");
const PlatformSdkBase_1 = require("./PlatformSdkBase");
const WEBVIEWCD = 5e3;
class IQueryProduct extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.products = void 0),
      (this.code = 0),
      (this.msg = "");
  }
}
class ISdkCustomerService extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.cuid = ""), (this.isredot = 0);
  }
}
class PlatformSdkIosGlobal extends PlatformSdkBase_1.PlatformSdkBase {
  constructor() {
    super(...arguments),
      (this.JEe = void 0),
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
      }),
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
      });
  }
  OnInit() {
    (this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId),
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
    const o = ModelManager_1.ModelManager.PlayerInfoModel;
    const t = new KuroSdkData_1.OpenCustomerServiceParamIos();
    var e =
      ((t.islogin = r.IsSdkLoggedIn() ? 1 : 0),
      (t.from = e),
      (t.RoleId = o.GetId()),
      (t.RoleName = o.GetAccountName()),
      (t.ServerId = r.GetServerId()),
      (t.ServerName = r.GetServerName()),
      (t.RoleLevel = o.GetPlayerLevel()),
      Json_1.Json.Stringify(t));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "IosCustomerService", ["json", e]),
      ue_1.KuroSDKManager.OpenCustomerService(e);
  }
  GetChannelId() {
    const e = this.zEe();
    return e?.channelId
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "channel_id", ["userInfo", e]),
        e?.channelId)
      : "";
  }
  YEe() {
    const e = this.zEe();
    return e?.idfv
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "idfv", ["userInfo", e]),
        e?.idfv)
      : "";
  }
  GetJyDid() {
    const e = this.zEe();
    return e?.jyDeviceId
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "jyDeviceId", ["userInfo", e]),
        e?.jyDeviceId)
      : "";
  }
  zEe() {
    let e;
    return (
      void 0 === this.JEe &&
        ((e = ue_1.KuroSDKManager.GetSdkParams("")),
        (this.JEe = Json_1.Json.Parse(e))),
      this.JEe
    );
  }
  QueryProduct(r, e) {
    let o = "";
    const t = r.length;
    for (let e = 0; e < t; e++) (o += r[e]), e !== t - 1 && (o += ",");
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "QueryProduct", ["data", o]),
      ue_1.KuroSDKManager.QueryProductInfo(o);
  }
  OnQueryProduct(e) {
    var e = e.split("|");
    const o = new Array();
    return (
      e?.length > 0 &&
        ((e = Json_1.Json.Parse(e[1]))?.products?.forEach((e) => {
          const r = new PlatformSdkBase_1.QueryProductSt();
          (r.Currency = e.currency),
            (r.GoodId = e.goodsId),
            (r.Name = e.name),
            (r.Desc = e.desc),
            (r.Price = e.price),
            o.push(r);
        }),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("KuroSdk", 28, "queryProduct", ["queryProduct", e]),
      o
    );
  }
  OnGetSharePlatform(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "OnGetSharePlatform", [
        "OnGetSharePlatform",
        e,
      ]);
    let r = Json_1.Json.Parse(e);
    if (r.KROVERSEA_SDK_KEY_RESULT === 0) {
      r = Json_1.Json.Parse(r.KROVERSEA_SDK_KEY_DATA);
      const o = new Array();
      r?.forEach((e) => {
        const r = new PlatformSdkBase_1.SharePlatformSt();
        (r.IconUrl = e.iconUrl),
          (r.PlatformId = e.platform.toString()),
          o.push(r);
      }),
        this.GetSharePlatformCallBackList.forEach((e) => {
          e(o);
        }),
        (this.GetSharePlatformCallBackList = []);
    }
    super.OnGetSharePlatform(e);
  }
  SdkPay(e) {
    var r = this.bEe();
    var r = this.qEe(e, r);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "KuroSdk",
        28,
        "AndroidPayment",
        ["json", r],
        ["paymentInfo", e],
      ),
      ue_1.KuroSDKManager.KuroSDKEvent(8, r);
  }
  IEe() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId()
      ? ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()
      : ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()
        ? ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString()
        : "";
  }
  bEe() {
    const e = ModelManager_1.ModelManager.FunctionModel;
    const r = ModelManager_1.ModelManager.LoginModel;
    return {
      roleId: this.IEe(),
      roleName: e.GetPlayerName() ? e.GetPlayerName() : "",
      roleLevel: e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1",
      serverId: r.GetServerId() ? r.GetServerId() : "",
      serverName: r.GetServerName() ? r.GetServerName() : "",
      vipLevel: "0",
      partyName: " ",
      setBalanceLevelOne: 0,
      setBalanceLevelTwo: 0,
    };
  }
  qEe(e, r) {
    const o = new KuroSdkData_1.PayInfoIosGlobal();
    return (
      (o.RoleId = r.roleId.toString()),
      (o.RoleName = r.roleName.toString()),
      (o.ServerId = r.serverId.toString()),
      (o.ServerName = r.serverName.toString()),
      (o.CpOrder = e.cpOrderId.toString()),
      (o.CallbackUrl = e.callbackUrl.toString()),
      (o.GamePropID = e.product_id.toString()),
      (o.GoodsName = e.goodsName.toString()),
      (o.GoodsDesc = e.goodsDesc.toString()),
      (o.Price = e.price.toString()),
      (o.GoodsCurrency = "USD"),
      (o.ExtraParams = r.roleId.toString()),
      Json_1.Json.Stringify(o) ?? ""
    );
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
  SetFont() {
    ue_1.KuroSDKManager.SetFont("ARFangXinShuH7GBK-HV.ttf");
  }
  OnShareResult(e, r, o) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "KuroSdk",
        28,
        "OnShareResult",
        ["code", e],
        ["platform", r],
        ["msg", o],
      ),
      e === 1
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnShareResult,
            !0,
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnShareResult,
            !1,
          );
  }
  OpenWebView(e, r, o, t, n) {
    ue_1.KuroSDKManager.OpenWebView(r, e, o, t, n, "");
  }
  SdkOpenUrlWnd(e, r, o, t, n = !0) {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (this.LastOpenTime !== 0)
        if (Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD)
          return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "InDisplayCd",
          );
      (this.LastOpenTime = Time_1.Time.Now), this.OpenWebView(e, r, o, t, n);
    }
  }
}
exports.PlatformSdkIosGlobal = PlatformSdkIosGlobal;
// # sourceMappingURL=PlatformSdkIosGlobal.js.map
