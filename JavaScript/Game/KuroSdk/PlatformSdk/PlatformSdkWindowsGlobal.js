"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkWindowsGlobal = void 0);
const UE = require("ue"),
  ue_1 = require("ue"),
  Json_1 = require("../../../Core/Common/Json"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  KuroSdkData_1 = require("../KuroSdkData"),
  PlatformSdkBase_1 = require("./PlatformSdkBase"),
  cpp_1 = require("cpp"),
  WEBVIEWCD = 5e3;
class WindowsSdkRedPointSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.data = ""), (this.error = 0), (this.type = "");
  }
}
class WindowsSdkRedPointContentSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.showRed = !1);
  }
}
class WindowsSdkCustomerServiceSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.data = ""), (this.error = 0), (this.type = "");
  }
}
class WindowsSdkCustomerServiceContentSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.cuid = 0), (this.isreddot = 0);
  }
}
class WindowsSdkQueryProductSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.data = void 0),
      (this.error = 0),
      (this.type = "");
  }
}
class WindowsSdkProductContentSt {
  constructor() {
    (this.channelGoodsId = ""),
      (this.currency = ""),
      (this.currencyCode = ""),
      (this.goodsId = ""),
      (this.name = ""),
      (this.price = 0);
  }
}
class WindowsPaymentSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.data = ""), (this.error = 0), (this.type = "");
  }
}
class PlatformSdkWindowsGlobal extends PlatformSdkBase_1.PlatformSdkBase {
  constructor() {
    super(...arguments),
      (this.OnAnnounceInitCallBack = (e) => {}),
      (this.AnnounceRedPointCallBack = (e) => {
        (e = Json_1.Json.Parse(e)), (e = Json_1.Json.Parse(e.data));
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "公告红点", ["data", e]),
          ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
            e.showRed,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
          );
      }),
      (this.OnLoginCallBack = (e) => {}),
      (this.CustomerServiceResultCallBack = (e) => {
        var o = Json_1.Json.Parse(e),
          t = Json_1.Json.Parse(o.data);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", ["result", e]),
          o &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", [
                "num",
                t.isreddot,
              ]),
            (this.CurrentCustomerShowState = 0 < t.isreddot)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
          );
      });
  }
  OnInit() {
    (this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId),
      cpp_1.FCrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid),
      cpp_1.FCrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
  }
  BindSpecialEvent() {
    ue_1.KuroSDKManager.Get().AnnounceInitDelegate.Clear(),
      ue_1.KuroSDKManager.Get().AnnounceInitDelegate.Add(
        this.OnAnnounceInitCallBack,
      ),
      ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Clear(),
      ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Add(
        this.AnnounceRedPointCallBack,
      ),
      ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Clear(),
      ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Add(
        this.CustomerServiceResultCallBack,
      ),
      ue_1.KuroSDKManager.Get().OnLoginDelegate.Clear(),
      ue_1.KuroSDKManager.Get().OnLoginDelegate.Add(this.OnLoginCallBack);
  }
  OpenWebView(e, o, t, r, n) {
    let s = !1;
    r && (s = !0);
    var _ = new KuroSdkData_1.OpenWebViewParamWindows(),
      _ =
        ((_.title = e),
        (_.url = o),
        (_.transparent = r),
        (_.titlebar = s),
        (_.innerbrowser = !0),
        (_.webAccelerated = n),
        Json_1.Json.Stringify(_));
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "OpenWebView", ["sdkJson", _ ?? ""]),
      ue_1.KuroSDKManager.OpenWebView(e, o, t, r, n, _);
  }
  GetSdkOpenUrlWndInfo(e, o) {
    var t = new KuroSdkData_1.OpenSdkUrlWndParamWindows(),
      e = ((t.title = e), (t.url = o), Json_1.Json.Stringify(t));
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 28, "SdkJson", ["sdkJson", e ?? ""]),
      e
    );
  }
  SdkExit() {
    UE.KuroStaticLibrary.ExitGame(!1);
  }
  InitializePostWebView() {
    var e = this.GetCurrentSelectServerId(),
      o = new KuroSdkData_1.InitializePostWebViewParam(),
      e =
        ((o.language = LanguageSystem_1.LanguageSystem.PackageLanguage),
        (o.cdn = [
          `${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/`,
        ]),
        (o.serverId = e),
        Json_1.Json.Stringify(o));
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "初始化公告", ["json", e]),
      ue_1.KuroSDKManager.KuroSDKEvent(10, e);
  }
  SdkPay(e) {
    var o;
    ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      ((o = KuroSdkData_1.KuroSdkControllerTool.GetSdkPayRoleInfo()),
      (o = this.qSe(e, o)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "KuroSdk",
          28,
          "WindowsPayment",
          ["json", o],
          ["paymentInfo", e],
        ),
      ue_1.KuroSDKManager.KuroSDKEvent(8, o));
  }
  qSe(e, o) {
    var t = new KuroSdkData_1.PayInfoWindowsGlobal(),
      o =
        ((t.roleId = o.roleId.toString()),
        (t.roleName = o.roleName.toString()),
        (t.serverId = o.serverId.toString()),
        (t.serverName = o.serverName.toString()),
        (t.cpOrder = e.cpOrderId.toString()),
        (t.callbackUrl = e.callbackUrl.toString()),
        (t.goodsId = e.product_id.toString()),
        (t.productName = e.goodsName.toString()),
        (t.goodsDesc = e.goodsDesc.toString()),
        (t.currencyType = "USD"),
        (t.customMsg = o.roleId.toString()),
        (t.price = e.price.toString()),
        Json_1.Json.Stringify(t));
    return o;
  }
  OpenCustomerService(e) {
    var o = ModelManager_1.ModelManager.LoginModel,
      t = new KuroSdkData_1.OpenCustomerServiceParamWindows(),
      o =
        ((t.islogin = o.IsSdkLoggedIn()),
        (t.from = e),
        Json_1.Json.Stringify(t));
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "WindowsCustomerService", ["json", o]),
      ue_1.KuroSDKManager.OpenCustomerService(o);
  }
  SdkSelectRole() {
    var e;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报选择角色"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((e = this.ZSe()), ue_1.KuroSDKManager.KuroSDKEvent(2, e));
  }
  SdkCreateRole() {
    var e;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报创建新角色"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((e = this.tye()), ue_1.KuroSDKManager.KuroSDKEvent(3, e));
  }
  SdkLevelUpRole() {
    var e;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报角色升级"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((e = this.ZSe()), ue_1.KuroSDKManager.KuroSDKEvent(4, e));
  }
  ISe() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId()
      ? ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()
      : ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()
        ? ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString()
        : "";
  }
  tye() {
    var e = ModelManager_1.ModelManager.LoginModel,
      o = new KuroSdkData_1.RoleInfoWindows(),
      e =
        ((o.roleId = this.ISe()),
        (o.roleName = e.GetPlayerName() ? e.GetPlayerName() : ""),
        (o.serverId = e.GetServerId() ? e.GetServerId() : ""),
        (o.serverName = e.GetServerName() ? e.GetServerName() : ""),
        (o.roleLevel = "1"),
        (o.vipLevel = "0"),
        (o.partyName = " "),
        (o.roleCreateTime = e.GetCreatePlayerTime()
          ? e.GetCreatePlayerTime()
          : ""),
        (o.setBalanceLevelOne = "0"),
        (o.setBalanceLevelTwo = "0"),
        (o.setSumPay = "0"),
        Json_1.Json.Stringify(o) ?? "");
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "SdkGetRoleInfo", ["data", e]),
      e
    );
  }
  ZSe() {
    var e = ModelManager_1.ModelManager.FunctionModel,
      o = ModelManager_1.ModelManager.LoginModel,
      t = new KuroSdkData_1.RoleInfoWindows(),
      o =
        ((t.roleId = this.ISe()),
        (t.roleName = e.GetPlayerName() ? e.GetPlayerName() : ""),
        (t.serverId = o.GetServerId() ? o.GetServerId() : ""),
        (t.serverName = o.GetServerName() ? o.GetServerName() : ""),
        (t.roleLevel = e.GetPlayerLevel()
          ? e.GetPlayerLevel().toString()
          : "1"),
        (t.vipLevel = "0"),
        (t.partyName = " "),
        (t.roleCreateTime = ""),
        (t.setBalanceLevelOne = e.GetPlayerCashCoin()),
        (t.setBalanceLevelTwo = "0"),
        (t.setSumPay = "0"),
        Json_1.Json.Stringify(t) ?? "");
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "SdkGetRoleInfo", ["data", o]),
      o
    );
  }
  OpenUserCenter() {
    ue_1.KuroSDKManager.BindAccount();
  }
  QueryProduct(o, e) {
    let t = "";
    var r = o.length;
    for (let e = 0; e < r; e++) (t += o[e]), e !== r - 1 && (t += ",");
    var n = new KuroSdkData_1.QueryProductInfoParamWindows(),
      e =
        ((n.goodsIds = t), (n.payChannel = e), Json_1.Json.Stringify(n) ?? "");
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "QueryProduct", ["data", e]),
      ue_1.KuroSDKManager.QueryProductInfo(e);
  }
  OnQueryProduct(e) {
    e = Json_1.Json.Parse(e);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "windowsQueryProduct!.data", [
        "data",
        e.data,
      ]);
    const t = new Array();
    return (
      e?.data?.forEach((e) => {
        var o = new PlatformSdkBase_1.QueryProductSt();
        (o.ChannelGoodId = e.channelGoodsId),
          (o.Currency = e.currency),
          (o.CurrencyCode = e.currencyCode),
          (o.GoodId = e.goodsId),
          (o.Name = e.name),
          (o.Price = e.price),
          t.push(o);
      }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "OnQueryProduct", ["data", e]),
      t
    );
  }
  SetFont() {
    var e = new KuroSdkData_1.SetFontParamWindows(),
      o = ModelManager_1.ModelManager.KuroSdkModel.GetCurrentFontName(),
      o =
        ((e.name = o),
        ModelManager_1.ModelManager.KuroSdkModel.GetDeviceFontAsset()),
      o =
        ((e.path =
          UE.BlueprintPathsLibrary.RootDir() +
          "Client/Binaries/Win64/ThirdParty/KrPcSdk_Global/" +
          o),
        Json_1.Json.Stringify(e) ?? "");
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "SetFont", ["data", o]),
      ue_1.KuroSDKManager.SetFont(o);
  }
  GetChannelId() {
    return ue_1.KuroSDKManager.GetSdkParams("channel_id");
  }
  GetChannelName() {
    return ue_1.KuroSDKManager.GetSdkParams("channel_name");
  }
  GetGameId() {
    return ue_1.KuroSDKManager.GetSdkParams("project_id");
  }
  GetDid() {
    return ue_1.KuroSDKManager.GetSdkParams("did");
  }
  GetAccessToken() {
    return ue_1.KuroSDKManager.GetSdkParams("token");
  }
  SdkOpenUrlWnd(e, o, t, r, n = !0) {
    if (
      0 !== this.LastOpenTime &&
      Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD
    )
      return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "InDisplayCd",
      );
    (this.LastOpenTime = Time_1.Time.Now), this.OpenWebView(e, o, t, r, n);
  }
  GetProtocolState() {
    return !0;
  }
  OnPaymentCallBack(e, o, t) {
    let r = !1;
    0 === Json_1.Json.Parse(o)?.error &&
      ((r = !0), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("KuroSdk", 28, "OnPaymentCallBack Windows Success"),
      t(r, o);
  }
}
exports.PlatformSdkWindowsGlobal = PlatformSdkWindowsGlobal;
//# sourceMappingURL=PlatformSdkWindowsGlobal.js.map
