"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroSdkController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Application_1 = require("../../Core/Application/Application"),
  CustomPromise_1 = require("../../Core/Common/CustomPromise"),
  Info_1 = require("../../Core/Common/Info"),
  Json_1 = require("../../Core/Common/Json"),
  LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
  Log_1 = require("../../Core/Common/Log"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  Http_1 = require("../../Core/Http/Http"),
  Net_1 = require("../../Core/Net/Net"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  PlatformSdkConfig_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkConfig"),
  PlatformSdkManagerNew_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  PlatformSdkNew_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkNew"),
  PlatformSdkReportData_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkReportData"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  PublicUtil_1 = require("../Common/PublicUtil"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  GlobalData_1 = require("../GlobalData"),
  CloudGameManager_1 = require("../Manager/CloudGameManager"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
  LogReportDefine_1 = require("../Module/LogReport/LogReportDefine"),
  UiLayer_1 = require("../Ui/UiLayer"),
  KuroSdkData_1 = require("./KuroSdkData"),
  KuroSdkDefine_1 = require("./KuroSdkDefine"),
  PlatformCloudSdkAndroid_1 = require("./PlatformSdk/PlatformCloudSdkAndroid"),
  PlatformCloudSdkIos_1 = require("./PlatformSdk/PlatformCloudSdkIos"),
  PlatformCloudSdkWeb_1 = require("./PlatformSdk/PlatformCloudSdkWeb"),
  PlatformSdkAndroid_1 = require("./PlatformSdk/PlatformSdkAndroid"),
  PlatformSdkAndroidGlobal_1 = require("./PlatformSdk/PlatformSdkAndroidGlobal"),
  PlatformSdkIos_1 = require("./PlatformSdk/PlatformSdkIos"),
  PlatformSdkIosGlobal_1 = require("./PlatformSdk/PlatformSdkIosGlobal"),
  PlatformSdkMac_1 = require("./PlatformSdk/PlatformSdkMac"),
  PlatformSdkMacGlobal_1 = require("./PlatformSdk/PlatformSdkMacGlobal"),
  PlatformSdkWindows_1 = require("./PlatformSdk/PlatformSdkWindows"),
  PlatformSdkWindowsGlobal_1 = require("./PlatformSdk/PlatformSdkWindowsGlobal"),
  GACHATYPE = 1,
  PAYDELAY = 1e4,
  TIMERDELAY = 1e3,
  CHECKNOTCEREDDOTGAP = 12e4;
class KuroSdkController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      KuroSdkController.CanUseSdk() &&
        (KuroSdkController._Se(),
        KuroSdkController.uSe(),
        KuroSdkController.cSe?.Init(),
        ControllerHolder_1.ControllerHolder.KuroSdkController.KuroSdkKickBindFunction(),
        ControllerHolder_1.ControllerHolder.KuroSdkController.KuroSdkLogoutBindFunction(
          ControllerHolder_1.ControllerHolder.LoginController.OnLogoutAccount,
        ),
        ControllerHolder_1.ControllerHolder.KuroSdkController.KuroSdkLoginBindFunction(
          ControllerHolder_1.ControllerHolder.LoginController.OnSdkLogin,
        )),
      this.mSe(),
      this.oSe(),
      this.Gpi(),
      this.Sul(),
      this.zZh(),
      (KuroSdkController.CXn = (0, puerts_1.toManualReleaseDelegate)(
        KuroSdkController.gXn,
      )),
      UE.KuroStaticAndroidLibrary.AddAndroidScreenChangeDelegate(
        KuroSdkController.CXn,
      ),
      this.JZh(),
      !0
    );
  }
  static Sul() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      ((this.sKe = TimerSystem_1.TimerSystem.Forever(this.b3a, TIMERDELAY)),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SetTickInnerState(
        !1,
      ));
  }
  static yul() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SetTickInnerState(
        !0,
      ),
      this.sKe && TimerSystem_1.TimerSystem.Remove(this.sKe);
  }
  static q7e(e) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().Tick(e);
  }
  static oSe() {
    this.sSe || Application_1.Application.AddApplicationHandler(1, this.A0l),
      (this.sSe = !0);
  }
  static OnClear() {
    return (
      this.dSe(),
      this.gAa(),
      this.Npi(),
      this.CancelCurrentWaitPayItemTimer(),
      KuroSdkController.CXn &&
        ((0, puerts_1.releaseManualReleaseDelegate)(KuroSdkController.gXn),
        (KuroSdkController.CXn = void 0)),
      this.yul(),
      this.ZZh(),
      UE.KuroStaticAndroidLibrary.ClearAndroidScreenChangeDelegate(),
      !0
    );
  }
  static gAa() {
    this.sSe && Application_1.Application.RemoveApplicationHandler(1, this.A0l),
      (this.sSe = !1);
  }
  static mSe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSetLoginServerId,
      this.CSe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LoginSuccess,
        this.gSe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.xkt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.FWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkRefreshNoticeRedDot,
        this.b3l,
      ),
      Platform_1.Platform.IsPs5Platform() &&
        (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnQuestStateChange,
          this.DSe,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnQuestFinishListNotify,
          this.Gro,
        ));
  }
  static dSe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSetLoginServerId,
      this.CSe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LoginSuccess,
        this.gSe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.xkt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.FWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkRefreshNoticeRedDot,
        this.b3l,
      ),
      Platform_1.Platform.IsPs5Platform() &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnQuestStateChange,
          this.DSe,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnQuestFinishListNotify,
          this.Gro,
        ));
  }
  static Gpi() {
    Net_1.Net.Register(26800, KuroSdkController._ja);
  }
  static Npi() {
    Net_1.Net.UnRegister(26800);
  }
  static w3l() {
    var e = this.D3l();
    !this.B3l &&
      e &&
      ((this.B3l = TimerSystem_1.TimerSystem.Forever(
        this.q3l,
        CHECKNOTCEREDDOTGAP,
      )),
      this.q3l(0));
  }
  static ZZh() {
    this.B3l &&
      (TimerSystem_1.TimerSystem.Remove(this.B3l), (this.B3l = void 0));
  }
  static uSe() {
    void 0 === KuroSdkController.cSe &&
      (Platform_1.Platform.IsAndroidPlatform() && !this.GetIfGlobalSdk()
        ? (KuroSdkController.cSe =
            new PlatformSdkAndroid_1.PlatformSdkAndroid())
        : Platform_1.Platform.IsAndroidPlatform() && this.GetIfGlobalSdk()
          ? (KuroSdkController.cSe =
              new PlatformSdkAndroidGlobal_1.PlatformSdkAndroidGlobal())
          : Platform_1.Platform.IsIOSPlatform() && this.GetIfGlobalSdk()
            ? (KuroSdkController.cSe =
                new PlatformSdkIosGlobal_1.PlatformSdkIosGlobal())
            : Platform_1.Platform.IsIOSPlatform() && !this.GetIfGlobalSdk()
              ? (KuroSdkController.cSe = new PlatformSdkIos_1.PlatformSdkIos())
              : Platform_1.Platform.IsWindowsPlatform() &&
                  !this.GetIfGlobalSdk()
                ? Platform_1.Platform.IsCloudGame()
                  ? CloudGameManager_1.CloudGameManager.IsWebPlatform
                    ? (Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info("CloudGame", 58, "云游戏Web SDK初始化"),
                      (KuroSdkController.cSe =
                        new PlatformCloudSdkWeb_1.PlatformCloudSdkWeb()))
                    : "Android" === Platform_1.Platform.CloudGamePlatform
                      ? (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "CloudGame",
                            58,
                            "云游戏Android SDK初始化",
                          ),
                        (KuroSdkController.cSe =
                          new PlatformCloudSdkAndroid_1.PlatformCloudSdkAndroid()))
                      : "IOS" === Platform_1.Platform.CloudGamePlatform ||
                          "Mac" === Platform_1.Platform.CloudGamePlatform
                        ? (Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "CloudGame",
                              58,
                              "云游戏Ios SDK初始化",
                            ),
                          (KuroSdkController.cSe =
                            new PlatformCloudSdkIos_1.PlatformCloudSdkIos()))
                        : (KuroSdkController.cSe =
                            new PlatformSdkWindows_1.PlatformSdkWindows())
                  : (KuroSdkController.cSe =
                      new PlatformSdkWindows_1.PlatformSdkWindows())
                : Platform_1.Platform.IsWindowsPlatform() &&
                    this.GetIfGlobalSdk()
                  ? (KuroSdkController.cSe =
                      new PlatformSdkWindowsGlobal_1.PlatformSdkWindowsGlobal())
                  : Platform_1.Platform.IsMacPlatform() &&
                      !this.GetIfGlobalSdk()
                    ? (KuroSdkController.cSe =
                        new PlatformSdkMac_1.PlatformSdkMac())
                    : Platform_1.Platform.IsMacPlatform() &&
                      this.GetIfGlobalSdk() &&
                      (KuroSdkController.cSe =
                        new PlatformSdkMacGlobal_1.PlatformSdkMacGlobal()));
  }
  static GetIfGlobalSdk() {
    return (
      KuroSdkController.fSe ||
      (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
        PlatformSdkConfig_1.PlatformSdkConfig.IsGlobal)
    );
  }
  static GetChannelId() {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetChannelId()
      : (KuroSdkController.cSe?.GetChannelId() ?? "");
  }
  static GetDeviceDid() {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetDeviceId()
      : (KuroSdkController.cSe?.GetDeviceDid() ?? "");
  }
  static GetPackageId() {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetPackageId()
      : KuroSdkController.cSe?.GetPackageId();
  }
  static CheckIfSdkLogin() {
    return !!KuroSdkController.CanUseSdk() && "0" !== this.pSe().Uid;
  }
  static pSe() {
    return UE.KuroSDKManager.GetCurrentLoginInfo();
  }
  static _Se() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "KuroSdk",
        27,
        "当前sdkarea!!!" +
          BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea"),
      ),
      (KuroSdkController.fSe = PublicUtil_1.PublicUtil.GetIfGlobalSdk());
  }
  static GetAgreement() {
    return KuroSdkController.cSe?.GetAgreement();
  }
  static TestOpenWnd() {
    KuroSdkController.SdkOpenUrlWnd(
      "用户协议",
      "https://wutheringwaves.kurogame.com/p/agreement_public.html",
    );
  }
  static CanUseSdk() {
    return (
      !PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") &&
      BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") ===
        KuroSdkDefine_1.USESDK
    );
  }
  static PostKuroSdkEvent(e) {
    if (
      KuroSdkController.cSe ||
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
    )
      switch (e) {
        case 0:
          KuroSdkController.cSe?.SdkLogin();
          break;
        case 1:
          KuroSdkController.cSe?.SdkKick();
          break;
        case 2:
          this.Lnl();
          break;
        case 3:
          this.Unl();
          break;
        case 4:
          this.Dnl();
          break;
        case 5:
          KuroSdkController.cSe?.SdkExit();
          break;
        case 6:
          KuroSdkController.cSe?.SdkLogout();
          break;
        case 7:
          this.Eul();
          break;
        case 8:
        case 9:
          break;
        case 10:
          this.k3l();
          break;
        case 11:
          this.G3l();
          break;
        case 13:
          this.OpenUserCenter();
          break;
        case 14:
          KuroSdkController.cSe?.ReadProductInfo();
          break;
        case 16:
          this.Iul();
          break;
        case 12:
          KuroSdkController.cSe?.KuroOpenPrivacyClauseWnd();
          break;
        case 15:
          KuroSdkController.cSe?.ShowAgreement();
      }
    else 5 === e && this.vSe();
  }
  static Iul() {
    var e;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? ((e = LanguageSystem_1.LanguageSystem.PackageLanguage),
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().NotifyCurrentLanguage(
          e,
        ))
      : KuroSdkController.cSe?.NotifyLanguage();
  }
  static Eul() {
    KuroSdkController.cSe?.SdkOpenLoginWnd();
  }
  static OpenUserCenter() {
    var e;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 27, "OpenUserCenter"),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
        ? (e = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid)
          ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenUserCenter(
              e,
              () => {
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SdkRefreshAccessToken,
                );
              },
            )
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("KuroSdk", 27, "OpenUserCenter", ["userId", e]),
            PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenUserCenter(
              "test",
              () => {
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.SdkRefreshAccessToken,
                );
              },
            ))
        : KuroSdkController.cSe?.OpenUserCenter();
  }
  static vSe() {
    GlobalData_1.GlobalData.IsPlayInEditor
      ? UE.KismetSystemLibrary.QuitGame(
          GlobalData_1.GlobalData.World,
          void 0,
          0,
          !1,
        )
      : KuroSdkController.CanUseSdk() ||
        cpp_1.KuroApplication.ExitWithReason(!1, "SDK");
  }
  static SdkPay(...r) {
    if (KuroSdkController.CanUseSdk()) {
      let e = void 0;
      (e =
        1 < r.length
          ? ((n = r[0]),
            (t = r[1]),
            (o = r[2]),
            (a = r[3]),
            (l = r[4]),
            KuroSdkData_1.KuroSdkControllerTool.GetSdkPayProduct(n, t, o, a, l))
          : r[0]),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 27, "SdkPay", ["SdkPay", e]);
      var t,
        o,
        a,
        l,
        n = new LogReportDefine_1.StartSdkPayEvent();
      (n.s_sdk_pay_order = e.cpOrderId),
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(n),
        (ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId =
          e.cpOrderId),
        this.cSe?.SdkPay(e),
        (ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName =
          e.goodsName),
        this.KuroSdkPaymentBindFunction(this.OnSdkPayEnd);
    }
  }
  static OpenNotice() {
    this.D3l() ? this.O3l() : KuroSdkController.cSe?.OpenPostWebView();
  }
  static OpenFeedback() {
    KuroSdkController.cSe?.OpenFeedback();
  }
  static SdkOpenUrlWnd(e, r, t = !0, o = !0, a = !0) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenWebView(
          r,
        )
      : KuroSdkController.cSe?.SdkOpenUrlWnd(e, r, t, o, a);
  }
  static OpenExternalUrl(e) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenExternalUrl(
      e,
    );
  }
  static async QueryProductByProductId(e) {
    return (
      !!KuroSdkController.cSe &&
      (ModelManager_1.ModelManager.KuroSdkModel.QueryPromise &&
        (await ModelManager_1.ModelManager.KuroSdkModel.QueryPromise.Promise),
      this.vhh(),
      (ModelManager_1.ModelManager.KuroSdkModel.QueryPromise =
        new CustomPromise_1.CustomPromise()),
      KuroSdkController.cSe.QueryProduct(e, this.ESe()),
      ModelManager_1.ModelManager.KuroSdkModel.QueryPromise.Promise)
    );
  }
  static ShareByteData(e, r) {
    KuroSdkController.cSe?.ShareByteData(e, r);
  }
  static Share(e, r) {
    KuroSdkController.cSe?.Share(e, r);
  }
  static ShareTexture(e, r) {
    KuroSdkController.cSe?.ShareTexture(e, r);
  }
  static ESe() {
    return "";
  }
  static OpenWebView(e, r, t, o, a = !0) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenWebView(
          r,
        )
      : KuroSdkController.cSe?.OpenWebView(e, r, t, o, a);
  }
  static KuroSdkLoginBindFunction(e) {
    KuroSdkController.cSe?.KuroSdkLoginBindFunction(e);
  }
  static KuroSdkKickBindFunction() {
    KuroSdkController.cSe?.KuroSdkKickBindFunction();
  }
  static KuroSdkLogoutBindFunction(e) {
    KuroSdkController.cSe?.KuroSdkLogoutBindFunction(e);
  }
  static KuroSdkPaymentBindFunction(e) {
    KuroSdkController.cSe?.KuroSdkPaymentBindFunction(e);
  }
  static SetPostWebViewRedPointState(e) {
    this.SSe = e;
  }
  static GetPostWebViewRedPointState() {
    return this.D3l()
      ? ModelManager_1.ModelManager.KuroSdkModel.NoticeRedDotState
      : KuroSdkController.SSe;
  }
  static NeedShowCustomerService() {
    return ControllerHolder_1.ControllerHolder.ChannelController.CheckCustomerServiceOpen();
  }
  static GetCustomerServiceRedPointState() {
    return !!this.cSe && this.cSe.GetCustomerServiceShowState();
  }
  static OpenCustomerService(e) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenCustomerService()
      : (this.cSe?.ResetCustomServerRedDot(), this.cSe?.OpenCustomerService(e));
  }
  static CheckPhotoPermission() {
    return (
      !KuroSdkController.CanUseSdk() ||
      !KuroSdkController.cSe ||
      KuroSdkController.cSe?.CheckPhotoPermission()
    );
  }
  static RequestPhotoPermission(e) {
    KuroSdkController.CanUseSdk() &&
      KuroSdkController.cSe?.RequestPhotoPermission(e);
  }
  static CancelCurrentWaitPayItemTimer(e = !0) {
    e &&
      ((ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName = ""),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "KuroSdk",
        27,
        "CancelCurrentWaitPayItemTimer clearPayItem",
      ),
      void 0 !== this.ySe &&
        (TimerSystem_1.TimerSystem.Remove(this.ySe), (this.ySe = void 0));
  }
  static CancelQueryProductTimer() {
    void 0 !== this.Mhh &&
      (TimerSystem_1.TimerSystem.Remove(this.Mhh), (this.Mhh = void 0));
  }
  static vhh() {
    this.CancelQueryProductTimer(),
      (this.Mhh = TimerSystem_1.TimerSystem.Delay(() => {
        ModelManager_1.ModelManager.KuroSdkModel.QueryPromise?.IsPending() &&
          ModelManager_1.ModelManager.KuroSdkModel.QueryPromise.SetResult(!1),
          (this.Mhh = void 0);
      }, PAYDELAY));
  }
  static StartWaitPayItemTimer() {
    this.CancelCurrentWaitPayItemTimer(!1),
      (this.ySe = TimerSystem_1.TimerSystem.Delay(() => {
        var e,
          r = ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName;
        StringUtils_1.StringUtils.IsBlank(r) ||
          ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(73)).SetTextArgs(r),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          )),
          (this.ySe = void 0);
      }, ConfigManager_1.ConfigManager.PayItemConfig.GetWaitPaySuccessTime()));
  }
  static RequestServerPlayStationPlayOnlyState() {
    var e = new Protocol_1.Aki.Protocol.Um_();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 27, "RequestServerPlayStationPlayOnlyState"),
      Net_1.Net.Call(23883, e, (e) => {
        ModelManager_1.ModelManager.KuroSdkModel.SetPlayStationPlayOnlyState(
          e.Oxa,
        );
      });
  }
  static RequestWebSign() {
    var e = new Protocol_1.Aki.Protocol.yv_();
    Net_1.Net.Call(17167, e, (e) => {
      (ModelManager_1.ModelManager.KuroSdkModel.NoticeSign = e?.VE_ ?? ""),
        this.q3l(0);
    });
  }
  static async RequestUpdatePlayStationBlockAccount() {
    var e =
      await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkBlockingUser();
    const t = new Array();
    e &&
      e.forEach((e, r) => {
        t.push(r);
      }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 27, "上报屏蔽列表", ["length", t.length]);
    e = new Protocol_1.Aki.Protocol.mC_();
    (e.Srh = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 27, "RequestServerPlayStationPlayOnlyState"),
      Net_1.Net.Call(16799, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "KuroSdk",
            27,
            "RequestUpdatePlayStationBlockAccount",
          );
      });
  }
  static RequestChangeServerPlayStationPlayOnlyState(r) {
    var e = new Protocol_1.Aki.Protocol.Pm_();
    (e.Oxa = r),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "KuroSdk",
          27,
          "RequestChangeServerPlayStationPlayOnlyState",
          ["state", r],
        ),
      Net_1.Net.Call(18575, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              21919,
            )
          : ModelManager_1.ModelManager.KuroSdkModel.SetPlayStationPlayOnlyState(
              r,
            );
      });
  }
  static uja() {
    return !!ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState;
  }
  static TryOpenReview() {
    this.uja() &&
      TimerSystem_1.TimerSystem.Delay(() => {
        var e =
            LocalStorage_1.LocalStorage.GetGlobal(
              LocalStorageDefine_1.ELocalStorageGlobalKey.LastReviewTime,
            ) ?? 0,
          r = ConfigManager_1.ConfigManager.CommonConfig.GetReviewCd() ?? 0,
          t = TimeUtil_1.TimeUtil.GetServerTime();
        r < t - e
          ? (LocalStorage_1.LocalStorage.SetGlobal(
              LocalStorageDefine_1.ELocalStorageGlobalKey.LastReviewTime,
              t,
            ),
            this.cja())
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "KuroSdk",
                27,
                "TryOpenReview",
                ["currentTime", t],
                ["lastReviewTime", e],
                ["cd", r],
              ),
            (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState =
              !1));
      }, ModelManager_1.ModelManager.KuroSdkModel.ReviewDelay);
  }
  static cja() {
    var e;
    ModelManager_1.ModelManager.KuroSdkModel.NeedReviewConfirmBox
      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(222)).SetCloseFunction(
          () => {
            this.cSe &&
              (this.cSe.OpenReview(
                ModelManager_1.ModelManager.KuroSdkModel.CurrentReviewId,
              ),
              (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState =
                !1));
          },
        ),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
          e,
        ))
      : this.cSe &&
        (this.cSe.OpenReview(
          ModelManager_1.ModelManager.KuroSdkModel.CurrentReviewId,
        ),
        (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = !1));
  }
  static ClientOpenReview() {
    (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = !0),
      (ModelManager_1.ModelManager.KuroSdkModel.ReviewDelay = 1e3),
      this.TryOpenReview();
  }
  static SetCursor(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 27, "SetCursor", ["path", e]),
      this.cSe && this.cSe.SetCursor(e);
  }
  static Lnl() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToServer(
          1,
          this.Rnl(KuroSdkData_1.KuroSdkControllerTool.GetRoleInfoData()),
        )
      : KuroSdkController.cSe?.SdkSelectRole();
  }
  static Unl() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToServer(
          0,
          this.Rnl(KuroSdkData_1.KuroSdkControllerTool.GetCreateRoleInfoData()),
        )
      : KuroSdkController.cSe?.SdkCreateRole();
  }
  static Dnl() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToServer(
          2,
          this.Rnl(KuroSdkData_1.KuroSdkControllerTool.GetRoleInfoData()),
        )
      : KuroSdkController.cSe?.SdkLevelUpRole();
  }
  static Rnl(e) {
    var r = new PlatformSdkNew_1.ReportRoleData();
    return (
      (r.roleId = e.RoleId),
      (r.roleLevel = e.RoleLevel),
      (r.roleName = e.RoleName),
      (r.serverId = e.ServerId),
      (r.serverName = e.ServerName),
      r
    );
  }
  static zZh() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().BindOnWebViewCloseCallBack(
          () => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.SdkRefreshNoticeRedDot,
            );
          },
        )
      : KuroSdkController.cSe?.BindWebViewCloseDelegate(() => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkRefreshNoticeRedDot,
          );
        });
  }
  static D3l() {
    let e = !1;
    var r = Info_1.Info.IsPs5Platform() || Info_1.Info.IsMacPlatform();
    return (e = r ? !0 : e);
  }
  static k3l() {
    this.D3l() ? this.JZh() : KuroSdkController.cSe?.InitializePostWebView();
  }
  static G3l() {
    this.D3l() ? this.O3l() : KuroSdkController.cSe?.OpenPostWebView();
  }
  static O3l() {
    this.F3l((e, r) => {
      var t;
      e
        ? ((t = ModelManager_1.ModelManager.KuroSdkModel.GetNoticeUrl(r)),
          this.OpenWebView("", t, !0, !0, !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("KuroSdk", 27, "OpenPostWebViewOnClient", [
              "urlIndex",
              r,
            ]))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "KuroSdk",
            27,
            "OpenPostWebViewOnClientFail",
            ["state", e],
            ["urlIndex", r],
          );
    }, 0);
  }
  static F3l(o, a = 0) {
    var e;
    !ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData() ||
    a >=
      ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData().h5AppUrl
        .length
      ? o(!1, a)
      : ((e = ModelManager_1.ModelManager.KuroSdkModel.GetNoticeUrl(a)),
        Http_1.Http.Get(e, void 0, (e, r, t) => {
          e && 200 === r ? o(!0, a) : this.F3l(o, a + 1);
        }));
  }
  static N3l(a, l = 0) {
    var e = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointUrl();
    Http_1.Http.Get(e, void 0, (e, r, t) => {
      let o = !1;
      (o = e && 200 === r ? o : !0)
        ? (e = l + 1) < 3
          ? this.N3l(a, e)
          : a(!1, r, t)
        : a(!0, r, t);
    });
  }
  static JZh() {
    var e;
    !this.D3l() ||
      "" ===
        (e =
          ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId()) ||
      "0" === e ||
      this.V3l ||
      ((this.V3l = !0),
      (e = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointUrl()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("KuroSdk", 27, "TryInitPostWebView", ["url", e]),
      this.N3l((e, r, t) => {
        e
          ? ((t = Json_1.Json.Parse(t)),
            ModelManager_1.ModelManager.KuroSdkModel.SetEntryPointData(t))
          : ((t = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointUrl()),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "KuroSdk",
                27,
                "TryInitPostWebView fail",
                ["state", e],
                ["code", r],
                ["url", t],
              )),
          (this.V3l = !1);
      }));
  }
  static j3l(o) {
    var e =
      ModelManager_1.ModelManager.KuroSdkModel.GetQueryNoticeReadStateUrl();
    Http_1.Http.Get(e, void 0, (e, r, t) => {
      e ? ((e = Json_1.Json.Parse(t)), o(e.data)) : o([]);
    });
  }
  static H3l(o, a = 0) {
    var e;
    !ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData() ||
    a >=
      ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData().contentUrl
        .length
      ? o(!1, 0, "")
      : ((e = ModelManager_1.ModelManager.KuroSdkModel.GetNoticeContentUrl(a)),
        Http_1.Http.Get(e, void 0, (e, r, t) => {
          e && 200 === r ? o(e, r, t) : this.H3l(o, a + 1);
        }));
  }
  static RecoverSdkData() {
    KuroSdkController.cSe?.RecoverSdkData();
  }
}
(exports.KuroSdkController = KuroSdkController),
  ((_a = KuroSdkController).cSe = void 0),
  (KuroSdkController.fSe = !1),
  (KuroSdkController.SSe = !1),
  (KuroSdkController.IsKick = !1),
  (KuroSdkController.CXn = void 0),
  (KuroSdkController.ySe = void 0),
  (KuroSdkController.Mhh = void 0),
  (KuroSdkController.sSe = !1),
  (KuroSdkController.sKe = void 0),
  (KuroSdkController.B3l = void 0),
  (KuroSdkController.b3a = (e) => {
    _a.q7e(e * TimeUtil_1.TimeUtil.Millisecond);
  }),
  (KuroSdkController.A0l = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 27, "ApplicationHasReactivatedDelegate"),
      ControllerHolder_1.ControllerHolder.PayItemController.RequestSdkCheckout(
        2,
      );
    var e = new PlatformSdkReportData_1.PlatformReportTerminateGame();
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
      e,
    );
  }),
  (KuroSdkController.gXn = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 27, "AndroidScreenChangeCallBack"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAndroidConfigurationChange,
      );
    var e = UiLayer_1.UiLayer.UiRootItem?.GetRenderCanvas();
    e &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "KuroSdk",
        27,
        "旋转后LguiCanvasViewPort",
        ["viewPortX", e.GetViewportSize().X],
        ["viewPortY", e.GetViewportSize().Y],
      );
  }),
  (KuroSdkController.Gro = () => {
    ModelManager_1.ModelManager.KuroSdkModel?.UpdateActivityProgress();
  }),
  (KuroSdkController.DSe = (e, r, t) => {
    var o;
    !Platform_1.Platform.IsPs5Platform() ||
      (o =
        ModelManager_1.ModelManager.KuroSdkModel?.GetNextProgressActivityQuestId() ??
        0) <= 0 ||
      e !== o ||
      ModelManager_1.ModelManager.KuroSdkModel?.UpdateActivityProgress();
  }),
  (KuroSdkController.FWe = () => {
    _a.q3l(0);
  }),
  (KuroSdkController.xkt = () => {
    _a.RequestServerPlayStationPlayOnlyState(),
      _a.RequestUpdatePlayStationBlockAccount(),
      _a.RequestWebSign();
  }),
  (KuroSdkController.lqt = () => {
    _a.cSe && _a.cSe.SetGamePadMode(Info_1.Info.IsInGamepad());
  }),
  (KuroSdkController.b3l = () => {
    _a.q3l(0);
  }),
  (KuroSdkController.gSe = (e) => {
    var r =
      ConfigManager_1.ConfigManager.PayItemConfig.GetCurrentRegionPayConfigList();
    const t = new Array();
    r?.forEach((e) => {
      t.push(e.ProductId);
    }),
      ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(
        t,
      ),
      _a.w3l();
  }),
  (KuroSdkController.CSe = () => {
    (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn ||
      (_a.CanUseSdk() && _a.fSe)) &&
      _a.PostKuroSdkEvent(10);
  }),
  (KuroSdkController.OnSdkPayEnd = (e, r) => {
    e &&
      "" !== ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName &&
      _a.StartWaitPayItemTimer();
  }),
  (KuroSdkController._ja = (e) => {
    (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = !0),
      (ModelManager_1.ModelManager.KuroSdkModel.ReviewDelay = e.qKn),
      (ModelManager_1.ModelManager.KuroSdkModel.CurrentReviewId = e.s5n),
      e.h5n !== GACHATYPE && _a.TryOpenReview();
  }),
  (KuroSdkController.V3l = !1),
  (KuroSdkController.q3l = (e) => {
    if (
      1 === ModelManager_1.ModelManager.GameModeModel?.LoadingPhase &&
      "" !== ModelManager_1.ModelManager.KuroSdkModel.NoticeSign
    ) {
      var r = ModelManager_1.ModelManager.PlayerInfoModel;
      const a = void 0 === r.GetId() ? "0" : r.GetId().toString();
      _a.H3l((e, r, t) => {
        if (e) {
          e = Json_1.Json.Parse(t);
          const o =
            ModelManager_1.ModelManager.KuroSdkModel.FilterCurrentNeedShowNoticeContent(
              e,
              a,
            );
          0 < o.length
            ? _a.j3l((e) => {
                let r = !1;
                for (const t of o)
                  if (1 === t.red && !e.includes(t.id)) {
                    r = !0;
                    break;
                  }
                (ModelManager_1.ModelManager.KuroSdkModel.NoticeRedDotState =
                  r),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
                  );
              })
            : ((ModelManager_1.ModelManager.KuroSdkModel.NoticeRedDotState =
                !1),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
              ));
        }
      }, 0);
    }
  });
//# sourceMappingURL=KuroSdkController.js.map
