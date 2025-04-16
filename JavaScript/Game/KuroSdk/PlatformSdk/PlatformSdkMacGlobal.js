"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkMacGlobal = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  ue_1 = require("ue"),
  Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  KuroSdkData_1 = require("../KuroSdkData"),
  PlatformSdkBase_1 = require("./PlatformSdkBase"),
  WEBVIEWCD = 5e3;
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
class PlatformSdkMacGlobal extends PlatformSdkBase_1.PlatformSdkBase {
  constructor() {
    super(...arguments),
      (this.JSe = void 0),
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
    var e = this.zSe();
    return e?.channelId
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 27, "channel_id", ["userInfo", e]),
        e?.channelId)
      : "";
  }
  zSe() {
    var e;
    return (
      void 0 === this.JSe &&
        ((e = ue_1.KuroSDKManager.GetSdkParams("")),
        (this.JSe = Json_1.Json.Parse(e))),
      this.JSe
    );
  }
  SetFont() {
    var e = ModelManager_1.ModelManager.KuroSdkModel.GetDeviceFontAsset();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 27, "SetFont", ["fontPath", e]),
      ue_1.KuroSDKManager.SetFont(e);
  }
  QueryProduct(r, e) {
    let o = "";
    var t = r.length;
    for (let e = 0; e < t; e++) (o += r[e]), e !== t - 1 && (o += ",");
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 27, "QueryProduct", ["data", o]),
      ue_1.KuroSDKManager.QueryProductInfo(o);
  }
  OnQueryProduct(e) {
    var e = e.split("|");
    const o = new Array();
    return (
      0 < e?.length &&
        ((e = Json_1.Json.Parse(e[1]))?.products?.forEach((e) => {
          var r = new PlatformSdkBase_1.QueryProductSt();
          (r.Currency = e.currency),
            (r.GoodId = e.goodsId),
            (r.Name = e.name),
            (r.Desc = e.desc),
            (r.Price = e.price),
            o.push(r);
        }),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("KuroSdk", 27, "queryProduct", ["queryProduct", e]),
      o
    );
  }
  SdkPay(e) {
    var r = this.bSe(),
      r = this.qSe(e, r);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "KuroSdk",
        27,
        "AndroidPayment",
        ["json", r],
        ["paymentInfo", e],
      ),
      ue_1.KuroSDKManager.KuroSDKEvent(8, r);
  }
  bSe() {
    var e = ModelManager_1.ModelManager.FunctionModel,
      r = ModelManager_1.ModelManager.LoginModel;
    return {
      roleId: this.GetRoleId(),
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
  qSe(e, r) {
    var o = new KuroSdkData_1.PayInfoMacIosGlobal();
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
  OpenWebView(e, r, o, t, n) {
    ue_1.KuroSDKManager.OpenWebView(r, e, o, t, n, "");
  }
  SdkOpenUrlWnd(e, r, o, t, n = !0) {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (0 !== this.LastOpenTime)
        if (Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD)
          return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "InDisplayCd",
          );
      (this.LastOpenTime = Time_1.Time.Now), this.OpenWebView(e, r, o, t, n);
    }
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
exports.PlatformSdkMacGlobal = PlatformSdkMacGlobal;
//# sourceMappingURL=PlatformSdkMacGlobal.js.map
