"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkWindows = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  ue_1 = require("ue"),
  Json_1 = require("../../../Core/Common/Json"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  KuroSdkData_1 = require("../KuroSdkData"),
  PlatformSdkBase_1 = require("./PlatformSdkBase"),
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
class WindowsPaymentSt extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.data = ""), (this.error = 0), (this.type = "");
  }
}
class PlatformSdkWindows extends PlatformSdkBase_1.PlatformSdkBase {
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
      (this.CustomerServiceResultCallBack = (e) => {
        var o = Json_1.Json.Parse(e),
          r = Json_1.Json.Parse(o.data);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", ["result", e]),
          o &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", [
                "num",
                r.isreddot,
              ]),
            (this.CurrentCustomerShowState = 0 < r.isreddot)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
          );
      }),
      (this.OnLoginCallBack = (e) => {});
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
  OpenWebView(e, o, r, t, n) {
    var _ = new KuroSdkData_1.OpenWebViewParamWindows(),
      _ =
        ((_.title = e),
        (_.url = o),
        (_.transparent = t),
        (_.webAccelerated = n),
        (_.innerbrowser = !0),
        Json_1.Json.Stringify(_));
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "OpenWebView", ["sdkJson", _ ?? ""]),
      ue_1.KuroSDKManager.OpenWebView(e, o, r, t, n, _);
  }
  GetSdkOpenUrlWndInfo(e, o) {
    var r = new KuroSdkData_1.OpenSdkUrlWndParamWindows(),
      e = ((r.title = e), (r.url = o), Json_1.Json.Stringify(r));
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 28, "SdkJson", ["sdkJson", e ?? ""]),
      e
    );
  }
  SdkOpenUrlWnd(e, o, r, t, n = !0) {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (0 !== this.LastOpenTime)
        if (Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD)
          return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "InDisplayCd",
          );
      (this.LastOpenTime = Time_1.Time.Now), this.OpenWebView(e, o, r, t, n);
    }
  }
  OpenFeedback() {
    var e,
      o,
      r,
      t,
      n,
      _,
      a = BaseConfigController_1.BaseConfigController.GetFeedBackUrl();
    a
      ? ((_ = a.url),
        (e = ModelManager_1.ModelManager.LoginModel),
        (o = ModelManager_1.ModelManager.FunctionModel),
        (r = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
          ? e.GetSdkLoginConfig()?.Token ?? "0"
          : "0"),
        (t = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
          ? e.GetSdkLoginConfig()?.Uid ?? "0"
          : "0"),
        (n = e.GetSdkLoginConfig()?.UserName
          ? e.GetSdkLoginConfig()?.UserName ?? ""
          : ""),
        (_ = StringUtils_1.StringUtils.Format(
          this.FeedBackSt,
          _,
          r,
          e.GetServerId().toString(),
          t,
          n,
          o.GetPlayerName().toString(),
          ModelManager_1.ModelManager.FunctionModel.PlayerId.toString(),
          LanguageSystem_1.LanguageSystem.PackageLanguage,
        )),
        ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
          ? ControllerHolder_1.ControllerHolder.KuroSdkController.OpenWebView(
              a.title,
              _,
              !0,
              !0,
            )
          : UE.KismetSystemLibrary.LaunchURL(_))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "CDN没有反馈配置");
  }
  SdkExit() {
    ue_1.KuroSDKManager.ShowExitGameDialog();
  }
  InitializePostWebView() {
    var e,
      o = BaseConfigController_1.BaseConfigController.GetLoginServers();
    o
      ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "serverId"),
        Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, o[0].id),
        ((e = new KuroSdkData_1.InitializePostWebViewParam()).language =
          LanguageSystem_1.LanguageSystem.PackageLanguage),
        (e.cdn = [
          `${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/`,
        ]),
        (e.serverId = void 0 === o[0].id ? "1013" : o[0].id),
        (o = Json_1.Json.Stringify(e)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 28, "初始化公告", ["json", o]),
        ue_1.KuroSDKManager.KuroSDKEvent(10, o))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 28, "没有登录服务器信息");
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
  GetAgreement() {
    let e = new Array();
    var o,
      r = ue_1.KuroSDKManager.GetSdkParams("game_init_agreement");
    return (
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ||
        ((o = Json_1.Json.Parse(r)), (e = o)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "AgreementData", ["AgreementData", r]),
      e
    );
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
    var r = new KuroSdkData_1.PayInfoWindows();
    (r.roleId = o.roleId.toString()),
      (r.roleName = o.roleName.toString()),
      (r.serverId = o.serverId.toString()),
      (r.serverName = o.serverName.toString()),
      (r.cpOrderId = e.cpOrderId.toString()),
      (r.callbackUrl = e.callbackUrl.toString()),
      (r.product_id = e.product_id.toString()),
      (r.goodsName = e.goodsName.toString()),
      (r.goodsDesc = e.goodsDesc.toString()),
      (r.currency = ""),
      (r.extraParams = "");
    let t = Json_1.Json.Stringify(r);
    return (t =
      (t = t.replace("}", ",")) +
      StringUtils_1.StringUtils.Format('"price":{0}', e.price.toString()) +
      "}");
  }
  OpenCustomerService(e) {
    var o = ModelManager_1.ModelManager.LoginModel,
      r = new KuroSdkData_1.OpenCustomerServiceParamWindows(),
      o =
        ((r.islogin = o.IsSdkLoggedIn()),
        (r.from = e),
        Json_1.Json.Stringify(r));
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
      r = new KuroSdkData_1.RoleInfoWindows(),
      o =
        ((r.roleId = this.ISe()),
        (r.roleName = e.GetPlayerName() ? e.GetPlayerName() : ""),
        (r.serverId = o.GetServerId() ? o.GetServerId() : ""),
        (r.serverName = o.GetServerName() ? o.GetServerName() : ""),
        (r.roleLevel = e.GetPlayerLevel()
          ? e.GetPlayerLevel().toString()
          : "1"),
        (r.vipLevel = "0"),
        (r.partyName = " "),
        (r.roleCreateTime = ""),
        (r.setBalanceLevelOne = e.GetPlayerCashCoin()),
        (r.setBalanceLevelTwo = "0"),
        (r.setSumPay = "0"),
        Json_1.Json.Stringify(r) ?? "");
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "SdkGetRoleInfo", ["data", o]),
      o
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
          "Client/Binaries/Win64/ThirdParty/KrPcSdk_Mainland/" +
          o),
        Json_1.Json.Stringify(e) ?? "");
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "SetFont", ["data", o]),
      ue_1.KuroSDKManager.SetFont(o);
  }
  OnPaymentCallBack(e, o, r) {
    let t = !1;
    0 === Json_1.Json.Parse(o)?.error &&
      ((t = !0), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("KuroSdk", 28, "OnPaymentCallBack Windows Success"),
      r(t, o);
  }
}
exports.PlatformSdkWindows = PlatformSdkWindows;
//# sourceMappingURL=PlatformSdkWindows.js.map
