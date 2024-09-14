"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkBase =
    exports.QueryProductSt =
    exports.SharePlatformSt =
      void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  ue_1 = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Json_1 = require("../../../Core/Common/Json"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine"),
  KuroSdkData_1 = require("../KuroSdkData"),
  KuroSdkReport_1 = require("../KuroSdkReport"),
  TIMEGAP = 1e3,
  WEBVIEWCD = 5e3,
  ONEYEARTIME = 31536e3;
class SharePlatformSt {
  constructor() {
    (this.PlatformId = void 0), (this.IconUrl = void 0);
  }
}
exports.SharePlatformSt = SharePlatformSt;
class QueryProductSt {
  constructor() {
    (this.ChannelGoodId = void 0),
      (this.Currency = void 0),
      (this.CurrencyCode = void 0),
      (this.GoodId = void 0),
      (this.Name = void 0),
      (this.Desc = void 0),
      (this.Price = void 0);
  }
}
exports.QueryProductSt = QueryProductSt;
class PlatformSdkBase {
  constructor() {
    (this.GSe = void 0),
      (this.NSe = void 0),
      (this.LastOpenTime = 0),
      (this.OSe = 0),
      (this.FeedBackSt =
        "{0}?token={1}&svr_id={2}&uid={3}&user_name={4}&role_name={5}&role_id={6}&lang={7}"),
      (this.CurrentDid = ""),
      (this.GetSharePlatformCallBackList = new Array()),
      (this.kSe = !1),
      (this.FSe = !1),
      (this.CurrentCustomerShowState = !1),
      (this.VSe = (e) => {
        e = 1 === e;
        ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
          e,
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
          );
      });
  }
  Init() {
    this.HSe(),
      this.BindProtocolListener(),
      this.BindShareResultListener(),
      this.KuroSdkExitBindFunction(),
      this.KuroSdkBindRedPointFunction(this.VSe),
      this.jSe(),
      this.WSe(),
      this.tIa(),
      this.BindSpecialEvent(),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        this.KSe(),
      this.SetGamePadMode(Info_1.Info.IsInGamepad()),
      (this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId);
  }
  KSe() {
    UE.KuroLauncherLibrary.IsFirstIntoLauncher()
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "KuroSdk:StartInitProgress"),
        ue_1.KuroSDKManager.SetIfGlobalSdk(
          ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
        ),
        (this.NSe = TimerSystem_1.TimerSystem.Forever(() => {
          this.QSe();
        }, TIMEGAP)))
      : (ue_1.KuroSDKManager.Get().LogoutDelegate.Clear(),
        ModelManager_1.ModelManager.LoginModel.HasBackToGameData() ||
          this.SdkLogout(),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkInitDone));
  }
  QSe() {
    ue_1.KuroSDKManager.GetSdkInitState() &&
      (ue_1.KuroSDKManager.SetWindowsMode(!1),
      this.XSe(),
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
        16,
      ),
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
        10,
      ),
      Platform_1.Platform.IsWindowsPlatform() &&
        ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() &&
        (this.GSe = TimerSystem_1.TimerSystem.Forever(() => {
          this.$Se();
        }, TIMEGAP)),
      void 0 !== this.NSe &&
        (TimerSystem_1.TimerSystem.Remove(this.NSe), (this.NSe = void 0)),
      this.SetFont(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkInitDone));
  }
  OnInit() {}
  XSe() {
    ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      ue_1.KuroSDKManager.PostSplashScreenEndSuccess();
  }
  SdkDoInit() {
    ue_1.KuroSDKManager.KuroSDKEvent(17, "");
  }
  $Se() {
    ue_1.KuroSDKManager.GetPostWebViewInitState()
      ? void 0 !== this.GSe &&
        (TimerSystem_1.TimerSystem.Remove(this.GSe), (this.GSe = void 0))
      : ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
          10,
        );
  }
  SdkLogout() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "游戏注销"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ue_1.KuroSDKManager.KuroSDKEvent(6, "");
  }
  SdkLogin() {
    this.GetProtocolState()
      ? ue_1.KuroSDKManager.GetSdkInitState()
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("KuroSdk", 28, "开始进行Sdk登录!!!"),
          ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
            (!Platform_1.Platform.IsWindowsPlatform() ||
            UE.KuroLauncherLibrary.IsFirstIntoLauncher()
              ? ue_1.KuroSDKManager.KuroSDKEvent(0, "")
              : ue_1.KuroSDKManager.KuroSDKEvent(7, "")))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, "SDK初始化未结束")
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "协议尚未初始化");
  }
  SdkKick() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "响应Sdk踢人完成!!!，返回sdk"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        (ue_1.KuroSDKManager.KuroSDKEvent(1, ""),
        (ControllerHolder_1.ControllerHolder.KuroSdkController.IsKick = !0),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkKick));
  }
  SdkSelectRole() {
    var e;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报选择角色"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo()),
        ue_1.KuroSDKManager.KuroSDKEvent(2, e));
  }
  SdkCreateRole() {
    var e;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报创建新角色"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((e = KuroSdkData_1.KuroSdkControllerTool.GetCreateRoleInfo()),
        ue_1.KuroSDKManager.KuroSDKEvent(3, e));
  }
  SdkLevelUpRole() {
    var e;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报角色升级"),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo()),
        ue_1.KuroSDKManager.KuroSDKEvent(4, e));
  }
  SdkExit() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "游戏退出"),
      GlobalData_1.GlobalData.IsPlayInEditor
        ? UE.KismetSystemLibrary.QuitGame(
            GlobalData_1.GlobalData.World,
            void 0,
            0,
            !1,
          )
        : !ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() ||
            (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ExitGamePush,
            ),
            Info_1.Info.IsPcOrGamepadPlatform())
          ? cpp_1.KuroApplication.ExitWithReason(!1, "SDK")
          : 1 === Info_1.Info.PlatformType ||
              (2 === Info_1.Info.PlatformType &&
                ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk())
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("KuroSdk", 28, "直接退出"),
              cpp_1.KuroApplication.ExitWithReason(!1, "SDK"))
            : ue_1.KuroSDKManager.KuroSDKEvent(5, "");
  }
  SdkOpenLoginWnd() {
    this.GetProtocolState()
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 28, "主动打开sdk登录界面"),
        ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
          (1 === Info_1.Info.PlatformType &&
          ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
            ? ue_1.KuroSDKManager.KuroSDKEvent(0, "")
            : ue_1.KuroSDKManager.KuroSDKEvent(7, "")))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "协议尚未初始化");
  }
  GetAgreement() {
    let _ = new Array();
    var e,
      o = ue_1.KuroSDKManager.GetAgreementUrl();
    return (
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ||
        (Platform_1.Platform.IsAndroidPlatform()
          ? Json_1.Json.Parse(o).gameInit?.forEach((e) => {
              _.push(e);
            })
          : Platform_1.Platform.IsWindowsPlatform()
            ? ((e = Json_1.Json.Parse(o)), (_ = e))
            : Platform_1.Platform.IsIOSPlatform() &&
              o.split(",").forEach((e) => {
                let o = e;
                var r,
                  t,
                  e = (o = (o = o.replace("{", "")).replace("}", "")).split(
                    ";",
                  );
                2 <= e.length &&
                  ((t = e[0].split("=")),
                  ((r = new KuroSdkData_1.SdkAgreementLinkData()).link = t[1]),
                  (r.link = r.link.trimStart()),
                  (r.link = r.link.trimEnd()),
                  (r.link = r.link.replace(/"/g, "")),
                  (t = e[1].split("=")),
                  (r.title = t[1]),
                  (r.title = r.title.trimStart()),
                  (r.title = r.title.trimEnd()),
                  (r.title = r.title.replace(/"/g, "")),
                  (r.title = r.title.toLowerCase()),
                  (r.title = unescape(r.title)),
                  _.push(r));
              })),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "AgreementData", ["AgreementData", o]),
      _
    );
  }
  QueryProduct(e, o) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "需要模块内重写QueryProduct");
  }
  ShareByteData(e, o) {
    e = Json_1.Json.Stringify(e);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "Share", ["json", e]),
      ue_1.KuroSDKManager.Share(o, e);
  }
  Share(e, o) {}
  ShareTexture(e, o) {}
  SdkPay(e) {
    var o;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "SdkPay", ["SdkPay", e]),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ((o = KuroSdkData_1.KuroSdkControllerTool.GetSdkPayRoleInfo()),
        (e = KuroSdkData_1.KuroSdkControllerTool.GetPaymentInfo(e, o)),
        ue_1.KuroSDKManager.KuroSDKEvent(8, e));
  }
  GetCurrentSelectServerId() {
    var e;
    return BaseConfigController_1.BaseConfigController.GetLoginServers()
      ? ("0" ===
          (e =
            ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId()) &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("KuroSdk", 28, "海外选服没有服务器"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 28, "当前服务器Id", ["serverId", e]),
        e)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 28, "没有登录服务器信息"),
        "0");
  }
  InitializePostWebView() {
    var e = this.GetCurrentSelectServerId(),
      o =
        (Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "serverId"),
        new KuroSdkData_1.InitializePostWebViewParam()),
      e =
        ((o.language = LanguageSystem_1.LanguageSystem.PackageLanguage),
        (o.serverId = e),
        Platform_1.Platform.IsWindowsPlatform ||
        Platform_1.Platform.IsAndroidPlatform()
          ? (o.cdn = [
              PublicUtil_1.PublicUtil.GetNoticeBaseUrl() +
                "/gamenotice/" +
                PublicUtil_1.PublicUtil.GetGameId(),
            ])
          : (o.cdn = [
              `${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/`,
            ]),
        Json_1.Json.Stringify(o));
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "初始化公告", ["json", e]),
      ue_1.KuroSDKManager.KuroSDKEvent(10, e);
  }
  GetSdkOpenUrlWndInfo(e, o) {
    var r = new KuroSdkData_1.OpenSdkUrlWndParam(),
      e = ((r.title = e), (r.wndUrl = o), Json_1.Json.Stringify(r));
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 28, "SdkJson", ["sdkJson", e ?? ""]),
      e
    );
  }
  OpenUserCenter() {
    ue_1.KuroSDKManager.KuroSDKEvent(13, "");
  }
  ShowAgreement() {
    ue_1.KuroSDKManager.KuroSDKEvent(15, ""),
      KuroSdkReport_1.KuroSdkReport.Report(
        new KuroSdkReport_1.SdkReportOpenPrivacy(void 0),
      );
  }
  KuroOpenPrivacyClauseWnd() {
    ue_1.KuroSDKManager.KuroSDKEvent(12, ""),
      KuroSdkReport_1.KuroSdkReport.Report(
        new KuroSdkReport_1.SdkReportOpenPrivacy(void 0),
      );
  }
  ReadProductInfo() {
    ue_1.KuroSDKManager.KuroSDKEvent(14, "");
  }
  NotifyLanguage() {
    var e = LanguageSystem_1.LanguageSystem.PackageLanguage;
    ue_1.KuroSDKManager.KuroSDKEvent(16, e), this.SetFont();
  }
  OpenPostWebView() {
    if (0 !== this.OSe && Time_1.Time.Now - this.OSe <= WEBVIEWCD)
      return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "InDisplayCd",
      );
    (this.OSe = Time_1.Time.Now),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "打开公告");
    var e = ModelManager_1.ModelManager.FunctionModel,
      o = ModelManager_1.ModelManager.PlayerInfoModel,
      r = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
        ? "global"
        : "cn",
      t = new KuroSdkData_1.OpenPostWebViewParam(),
      o =
        ((t.playerId = void 0 === o.GetId() ? "0" : o.GetId().toString()),
        (t.playerLevel = e.GetPlayerLevel()
          ? e.GetPlayerLevel().toString()
          : "1"),
        (t.language = LanguageSystem_1.LanguageSystem.PackageLanguage),
        (t.extend = "extend"),
        (t.gameOrientation = "2"),
        (t.type = r),
        Json_1.Json.Stringify(t));
    ue_1.KuroSDKManager.KuroSDKEvent(11, o);
  }
  GetChannelId() {
    return "";
  }
  GetGameId() {
    return "";
  }
  GetChannelName() {
    return "";
  }
  GetAppChannelId() {
    return "";
  }
  GetDid() {
    return "";
  }
  GetOaid() {
    return "";
  }
  GetJyDid() {
    return "";
  }
  GetAccessToken() {
    return "";
  }
  GetPackageId() {
    return UE.KuroSDKManager.GetPackageId();
  }
  GetIsQRCodeLogin() {
    return ue_1.KuroSDKManager.GetSdkIsQRScan();
  }
  QRCodeLogin() {
    ue_1.KuroSDKManager.OpenSdkQRScan();
  }
  GetIsUserCenterEnable() {
    return !0;
  }
  SetFont() {}
  IsCustomerServiceEnable() {
    return !0;
  }
  OpenCustomerService(e) {}
  OpenFeedback() {
    var e,
      o = BaseConfigController_1.BaseConfigController.GetFeedBackUrl();
    o
      ? ((e = this.GetFeedBackOpenUrl()),
        ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
          ? ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
              o.title,
              e,
            )
          : UE.KismetSystemLibrary.LaunchURL(e))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "CDN没有反馈配置");
  }
  GetFeedBackOpenUrl() {
    var e = BaseConfigController_1.BaseConfigController.GetFeedBackUrl().url,
      o = ModelManager_1.ModelManager.LoginModel,
      r = ModelManager_1.ModelManager.FunctionModel,
      t = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
        ? (o.GetSdkLoginConfig()?.Token ?? "0")
        : "0",
      _ = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
        ? (o.GetSdkLoginConfig()?.Uid ?? "0")
        : "0",
      n = o.GetSdkLoginConfig()?.UserName
        ? (o.GetSdkLoginConfig()?.UserName ?? "")
        : "";
    return StringUtils_1.StringUtils.Format(
      this.FeedBackSt,
      e,
      t,
      o.GetServerId()?.toString() ?? "",
      _,
      n,
      r.GetPlayerName()?.toString() ?? "",
      ModelManager_1.ModelManager.FunctionModel.PlayerId.toString(),
      LanguageSystem_1.LanguageSystem.PackageAudio,
    );
  }
  SdkOpenUrlWnd(e, o, r, t, _ = 0) {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (0 !== this.LastOpenTime)
        if (Time_1.Time.Now - this.LastOpenTime <= WEBVIEWCD)
          return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "InDisplayCd",
          );
      this.LastOpenTime = Time_1.Time.Now;
      e = this.GetSdkOpenUrlWndInfo(e, o);
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "OpenUrl", ["info", e]),
        ue_1.KuroSDKManager.KuroSDKEvent(9, e ?? "");
    }
  }
  OpenWebView(e, o, r, t, _) {
    1 === Info_1.Info.PlatformType
      ? ue_1.KuroSDKManager.OpenWebView(o, e, r, t, _, "")
      : 2 === Info_1.Info.PlatformType &&
          ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
        ? ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
            e,
            o,
          )
        : ue_1.KuroSDKManager.OpenWebView(e, o, r, t, _, "");
  }
  KuroSdkLoginBindFunction(o) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "绑定登录回调"),
      ue_1.KuroSDKManager.Get().LoginDelegate.Clear(),
      ue_1.KuroSDKManager.Get().LoginDelegate.Add((e) => {
        Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "登录成功"),
          e && o(e);
      });
  }
  KuroSdkKickBindFunction() {
    ue_1.KuroSDKManager.Get().KickDelegate.Clear(),
      ue_1.KuroSDKManager.Get().KickDelegate.Add(() => {
        this.SdkLogout();
      });
  }
  KuroSdkLogoutBindFunction(e) {
    ue_1.KuroSDKManager.Get().LogoutDelegate.Clear(),
      ue_1.KuroSDKManager.Get().LogoutDelegate.Add(() => {
        e();
      });
  }
  BindSpecialEvent() {}
  WSe() {
    ue_1.KuroSDKManager.Get().DeepLinkDelegate.Clear(),
      ue_1.KuroSDKManager.Get().DeepLinkDelegate.Add((e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "KuroSdk",
            28,
            " KuroSDKManager.Get()!.DeepLinkDelegate",
            ["deepLink", e],
          );
      });
  }
  tIa() {
    ue_1.KuroSDKManager.Get().GameStateChangeCallBack.Clear(),
      ue_1.KuroSDKManager.Get().GameStateChangeCallBack.Add((e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 28, " KuroGameWinStateBindFunction", [
            "data",
            e,
          ]);
        e = Json_1.Json.Parse(e);
        let o = !1;
        e && "0" === e.status && (o = !0),
          ModelManager_1.ModelManager.KuroSdkModel.OnSdkFocusChange(o);
      });
  }
  HSe() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("KuroSdk", 28, "BindLogListener"),
      ue_1.KuroSDKManager.Get().LogDelegate.Clear(),
      ue_1.KuroSDKManager.Get().LogDelegate.Add((o) => {
        var r = o.split(","),
          t = r.length;
        if (0 < t)
          for (let e = 0; e < t; e++) {
            var _ = r[e].split("=");
            2 === _.length &&
              "level" === _[0] &&
              (0 === (_ = Number(_[1]))
                ? Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("KuroSdk", 28, "sdklog", ["Debug", o])
                : 1 === _
                  ? Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("KuroSdk", 28, "sdklog", ["Info", o])
                  : 2 === _
                    ? Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn("KuroSdk", 28, "sdklog", ["Warn", o])
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error("KuroSdk", 28, "sdklog", ["Error", o]));
          }
      });
  }
  KuroSdkExitBindFunction() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "KuroSdkExitBindFunction"),
      ue_1.KuroSDKManager.Get().ExitDelegate.Clear(),
      ue_1.KuroSDKManager.Get().ExitDelegate.Add(() => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("KuroSdk", 28, " KuroSDKManager.Get()!.ExitDelegate"),
          GlobalData_1.GlobalData.World &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "KuroSdk",
                28,
                "GlobalData.World KuroSDKManager.Get()!.ExitDelegate",
              ),
            cpp_1.KuroApplication.ExitWithReason(
              !1,
              "KuroSdkExitBindFunction",
            ));
      });
  }
  BindProtocolListener() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "BindProtocolListener"),
      ue_1.KuroSDKManager.Get().ProtocolCallBack.Clear(),
      ue_1.KuroSDKManager.Get().ProtocolCallBack.Add(() => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "KuroSdk",
            28,
            " BindProtocolListener.Get()!.ProtocolCallBack",
          ),
          (this.FSe = !0);
      });
  }
  BindShareResultListener() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "BindShareResultListener"),
      ue_1.KuroSDKManager.Get().ShareResultDelegate.Clear(),
      ue_1.KuroSDKManager.Get().ShareResultDelegate.Add((e, o, r) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "KuroSdk",
            28,
            " BindProtocolListener.Get()!.ShareResultDelegate",
          ),
          this.OnShareResult(e, o, r);
      });
  }
  OnShareResult(e, o, r) {}
  jSe() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "KuroSdkQueryProductBindFunction"),
      ue_1.KuroSDKManager.Get().PostProductDelegate.Clear(),
      ue_1.KuroSDKManager.Get().PostProductDelegate.Add((e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 28, "sdk:查询商品 queryProduct", [
            "result",
            e,
          ]);
        e = this.OnQueryProduct(e);
        ModelManager_1.ModelManager.KuroSdkModel?.OnQueryProductInfo(e);
      });
  }
  OnQueryProduct(e) {}
  GetSharePlatform(e) {
    this.GetSharePlatformCallBackList.push(e),
      this.kSe || ((this.kSe = !0), ue_1.KuroSDKManager.GetSharePlatform());
  }
  OnGetSharePlatform(e) {
    this.kSe = !1;
  }
  KuroSdkPaymentBindFunction(r) {
    ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      (ue_1.KuroSDKManager.Get().PaymentDelegate.Clear(),
      ue_1.KuroSDKManager.Get().PaymentDelegate.Add((e, o) => {
        this.OnPaymentCallBack(e, o, r),
          1 === e.PaymentType
            ? (((o =
                new LogReportDefine_1.SuccessSdkPayEvent()).s_sdk_pay_order =
                ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId),
              ControllerHolder_1.ControllerHolder.LogReportController.LogReport(
                o,
              ))
            : (((o = new LogReportDefine_1.FailSdkPayEvent()).s_sdk_pay_order =
                ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId),
              (o.s_reason = 3 === e.PaymentType ? "cancel" : "fail"),
              ControllerHolder_1.ControllerHolder.LogReportController.LogReport(
                o,
              )),
          KuroSdkReport_1.KuroSdkReport.OnSdkPay();
      }));
  }
  OnPaymentCallBack(e, o, r) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "OnPaymentCallBack", ["payment", e]),
      r(1 === e.PaymentType, o);
  }
  KuroSdkBindRedPointFunction(o) {
    ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      (ue_1.KuroSDKManager.Get().PostRedPointDelegate.Clear(),
      ue_1.KuroSDKManager.Get().PostRedPointDelegate.Add((e) => {
        o(e);
      }));
  }
  GetDeviceDid() {
    return this.CurrentDid;
  }
  ResetCustomServerRedDot() {
    (this.CurrentCustomerShowState = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
      );
  }
  GetProtocolState() {
    return !!this.FSe || !!UE.KuroSDKManager.GetIsAgreeProtocol();
  }
  GetCustomerServiceShowState() {
    return this.CurrentCustomerShowState;
  }
  CheckPhotoPermission() {
    return ue_1.KuroSDKManager.CheckPhotoPermission();
  }
  RequestPhotoPermission(e) {
    ue_1.KuroSDKManager.Get().RequestPhotoPermissionDelegate.Clear(),
      ue_1.KuroSDKManager.Get().RequestPhotoPermissionDelegate.Add(e),
      ue_1.KuroSDKManager.RequestPhotoPermission();
  }
  OpenReview() {
    var e,
      o = this.CheckIfCanReview();
    o
      ? (ue_1.KuroSDKManager.RequestReviewApp(""), this.SaveCurrentReviewTime())
      : ((e =
          LocalStorage_1.LocalStorage.GetGlobal(
            LocalStorageDefine_1.ELocalStorageGlobalKey.OpenReviewTimeList,
          ) ?? []),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "KuroSdk",
            28,
            "OpenReview Fail",
            ["state", o],
            ["reviewTimeList", e],
          ));
  }
  CurrentPlatformYearReviewTime() {
    return 0;
  }
  SaveCurrentReviewTime() {
    var e =
        LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.OpenReviewTimeList,
        ) ?? [],
      o = TimeUtil_1.TimeUtil.GetServerTime(),
      r = this.CurrentPlatformYearReviewTime();
    e.length < r || e.shift(),
      e.push(o),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.OpenReviewTimeList,
        e,
      );
  }
  CheckIfCanReview() {
    var e =
        LocalStorage_1.LocalStorage.GetGlobal(
          LocalStorageDefine_1.ELocalStorageGlobalKey.OpenReviewTimeList,
        ) ?? [],
      o = TimeUtil_1.TimeUtil.GetServerTime(),
      r = this.CurrentPlatformYearReviewTime();
    let t = !1;
    return (t = e.length < r || o - e[0] >= ONEYEARTIME ? !0 : t);
  }
  SetCursor(e) {
    ue_1.KuroSDKManager.SetCursor(e);
  }
  SetGamePadMode(e) {
    ue_1.KuroSDKManager.SetGamePadMode(e);
  }
  OnClear() {}
}
exports.PlatformSdkBase = PlatformSdkBase;
//# sourceMappingURL=PlatformSdkBase.js.map
