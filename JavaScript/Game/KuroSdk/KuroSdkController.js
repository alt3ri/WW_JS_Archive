"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroSdkController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../Core/Common/CustomPromise"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  Net_1 = require("../../Core/Net/Net"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
  Platform_1 = require("../../Launcher/Platform/Platform"),
  PlatformSdkManagerNew_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  LocalStorage_1 = require("../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
  PublicUtil_1 = require("../Common/PublicUtil"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  GlobalData_1 = require("../GlobalData"),
  ConfigManager_1 = require("../Manager/ConfigManager"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  ChannelController_1 = require("../Module/Channel/ChannelController"),
  ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
  LogReportDefine_1 = require("../Module/LogReport/LogReportDefine"),
  UiLayer_1 = require("../Ui/UiLayer"),
  KuroSdkData_1 = require("./KuroSdkData"),
  KuroSdkDefine_1 = require("./KuroSdkDefine"),
  PlatformSdkAndroid_1 = require("./PlatformSdk/PlatformSdkAndroid"),
  PlatformSdkAndroidGlobal_1 = require("./PlatformSdk/PlatformSdkAndroidGlobal"),
  PlatformSdkIos_1 = require("./PlatformSdk/PlatformSdkIos"),
  PlatformSdkIosGlobal_1 = require("./PlatformSdk/PlatformSdkIosGlobal"),
  PlatformSdkWindows_1 = require("./PlatformSdk/PlatformSdkWindows"),
  PlatformSdkWindowsGlobal_1 = require("./PlatformSdk/PlatformSdkWindowsGlobal"),
  GACHATYPE = 1;
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
      this.Gpi(),
      (KuroSdkController.CXn = (0, puerts_1.toManualReleaseDelegate)(
        KuroSdkController.gXn,
      )),
      UE.KuroStaticAndroidLibrary.AddAndroidScreenChangeDelegate(
        KuroSdkController.CXn,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      this.dSe(),
      this.Npi(),
      this.CancelCurrentWaitPayItemTimer(),
      KuroSdkController.CXn &&
        ((0, puerts_1.releaseManualReleaseDelegate)(KuroSdkController.gXn),
        (KuroSdkController.CXn = void 0)),
      UE.KuroStaticAndroidLibrary.ClearAndroidScreenChangeDelegate(),
      !0
    );
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
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
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
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
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
    Net_1.Net.Register(29716, KuroSdkController._9a);
  }
  static Npi() {
    Net_1.Net.UnRegister(29716);
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
                ? (KuroSdkController.cSe =
                    new PlatformSdkWindows_1.PlatformSdkWindows())
                : Platform_1.Platform.IsWindowsPlatform() &&
                  this.GetIfGlobalSdk() &&
                  (KuroSdkController.cSe =
                    new PlatformSdkWindowsGlobal_1.PlatformSdkWindowsGlobal()));
  }
  static GetIfGlobalSdk() {
    return KuroSdkController.fSe;
  }
  static GetChannelId() {
    return KuroSdkController.cSe.GetChannelId();
  }
  static GetPackageId() {
    return KuroSdkController.cSe?.GetPackageId();
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
        28,
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
    if (KuroSdkController.cSe)
      switch (e) {
        case 0:
          KuroSdkController.cSe?.SdkLogin();
          break;
        case 1:
          KuroSdkController.cSe?.SdkKick();
          break;
        case 2:
          KuroSdkController.cSe?.SdkSelectRole();
          break;
        case 3:
          KuroSdkController.cSe?.SdkCreateRole();
          break;
        case 4:
          KuroSdkController.cSe?.SdkLevelUpRole();
          break;
        case 5:
          KuroSdkController.cSe?.SdkExit();
          break;
        case 6:
          KuroSdkController.cSe?.SdkLogout();
          break;
        case 7:
          KuroSdkController.cSe?.SdkOpenLoginWnd();
          break;
        case 8:
        case 9:
          break;
        case 10:
          KuroSdkController.cSe?.InitializePostWebView();
          break;
        case 11:
          KuroSdkController.cSe?.OpenPostWebView();
          break;
        case 13:
          KuroSdkController.cSe?.OpenUserCenter();
          break;
        case 14:
          KuroSdkController.cSe?.ReadProductInfo();
          break;
        case 16:
          KuroSdkController.cSe?.NotifyLanguage();
          break;
        case 12:
          KuroSdkController.cSe?.KuroOpenPrivacyClauseWnd();
          break;
        case 15:
          KuroSdkController.cSe?.ShowAgreement();
      }
    else 5 === e && this.vSe();
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
          ? ((a = r[0]),
            (o = r[1]),
            (t = r[2]),
            (l = r[3]),
            (n = r[4]),
            KuroSdkData_1.KuroSdkControllerTool.GetSdkPayProduct(a, o, t, l, n))
          : r[0]),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("KuroSdk", 28, "SdkPay", ["SdkPay", e]);
      var o,
        t,
        l,
        n,
        a = new LogReportDefine_1.StartSdkPayEvent();
      (a.s_sdk_pay_order = e.cpOrderId),
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(a),
        (ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId =
          e.cpOrderId),
        this.cSe?.SdkPay(e),
        (ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName =
          e.goodsName),
        this.KuroSdkPaymentBindFunction(this.MSe);
    }
  }
  static OpenNotice() {
    KuroSdkController.cSe?.OpenPostWebView();
  }
  static OpenFeedback() {
    KuroSdkController.cSe?.OpenFeedback();
  }
  static SdkOpenUrlWnd(e, r, o = !0, t = !0, l = !0) {
    KuroSdkController.cSe?.SdkOpenUrlWnd(e, r, o, t, l);
  }
  static async QueryProductByProductId(e) {
    return (
      !!KuroSdkController.cSe &&
      (ModelManager_1.ModelManager.KuroSdkModel.QueryPromise ||
        (ModelManager_1.ModelManager.KuroSdkModel.QueryPromise =
          new CustomPromise_1.CustomPromise()),
      KuroSdkController.cSe?.QueryProduct(e, this.ESe()),
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
  static OpenWebView(e, r, o, t, l = !0) {
    KuroSdkController.cSe?.OpenWebView(e, r, o, t, l);
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
  KuroSdkExitBindFunction() {
    KuroSdkController.cSe?.KuroSdkExitBindFunction();
  }
  static KuroSdkPaymentBindFunction(e) {
    KuroSdkController.cSe?.KuroSdkPaymentBindFunction(e);
  }
  static SetPostWebViewRedPointState(e) {
    this.SSe = e;
  }
  static GetPostWebViewRedPointState() {
    return KuroSdkController.SSe;
  }
  static NeedShowCustomerService() {
    return ChannelController_1.ChannelController.CheckCustomerServiceOpen();
  }
  static GetCustomerServiceRedPointState() {
    return !!this.cSe && this.cSe.GetCustomerServiceShowState();
  }
  static OpenCustomerService(e) {
    this.cSe?.ResetCustomServerRedDot(), this.cSe?.OpenCustomerService(e);
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
        28,
        "CancelCurrentWaitPayItemTimer clearPayItem",
      ),
      void 0 !== this.ySe &&
        (TimerSystem_1.TimerSystem.Remove(this.ySe), (this.ySe = void 0));
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
    var e = new Protocol_1.Aki.Protocol.Reh();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "RequestServerPlayStationPlayOnlyState"),
      Net_1.Net.Call(28365, e, (e) => {
        ModelManager_1.ModelManager.KuroSdkModel.SetPlayStationPlayOnlyState(
          e.Bxa,
        );
      });
  }
  static async RequestUpdatePlayStationBlockAccount() {
    var e =
      await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkBlockingUser();
    const o = new Array();
    e &&
      e.forEach((e, r) => {
        o.push(r);
      }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "上报屏蔽列表", ["length", o.length]);
    e = new Protocol_1.Aki.Protocol.qth();
    (e.Aza = o),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 28, "RequestServerPlayStationPlayOnlyState"),
      Net_1.Net.Call(20281, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "KuroSdk",
            28,
            "RequestUpdatePlayStationBlockAccount",
          );
      });
  }
  static RequestChangeServerPlayStationPlayOnlyState(r) {
    var e = new Protocol_1.Aki.Protocol.Teh();
    (e.Bxa = r),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "KuroSdk",
          28,
          "RequestChangeServerPlayStationPlayOnlyState",
          ["state", r],
        ),
      Net_1.Net.Call(29405, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              17142,
            )
          : ModelManager_1.ModelManager.KuroSdkModel.SetPlayStationPlayOnlyState(
              r,
            );
      });
  }
  static u9a() {
    return !!ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState;
  }
  static TryOpenReview() {
    this.u9a() &&
      TimerSystem_1.TimerSystem.Delay(() => {
        var e =
            LocalStorage_1.LocalStorage.GetGlobal(
              LocalStorageDefine_1.ELocalStorageGlobalKey.LastReviewTime,
            ) ?? 0,
          r = ConfigManager_1.ConfigManager.CommonConfig.GetReviewCd() ?? 0,
          o = TimeUtil_1.TimeUtil.GetServerTime();
        r < o - e
          ? (LocalStorage_1.LocalStorage.SetGlobal(
              LocalStorageDefine_1.ELocalStorageGlobalKey.LastReviewTime,
              o,
            ),
            this.c9a())
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "KuroSdk",
                28,
                "TryOpenReview",
                ["currentTime", o],
                ["lastReviewTime", e],
                ["cd", r],
              ),
            (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState =
              !1));
      }, ModelManager_1.ModelManager.KuroSdkModel.ReviewDelay);
  }
  static c9a() {
    var e;
    ModelManager_1.ModelManager.KuroSdkModel.NeedReviewConfirmBox
      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(222)).SetCloseFunction(
          () => {
            this.cSe &&
              (this.cSe.OpenReview(),
              (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState =
                !1));
          },
        ),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
          e,
        ))
      : this.cSe &&
        (this.cSe.OpenReview(),
        (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = !1));
  }
  static ClientOpenReview() {
    (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = !0),
      (ModelManager_1.ModelManager.KuroSdkModel.ReviewDelay = 1e3),
      this.TryOpenReview();
  }
  static SetCursor(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("KuroSdk", 28, "SetCursor", ["path", e]),
      this.cSe && this.cSe.SetCursor(e);
  }
}
(exports.KuroSdkController = KuroSdkController),
  ((_a = KuroSdkController).cSe = void 0),
  (KuroSdkController.fSe = !1),
  (KuroSdkController.SSe = !1),
  (KuroSdkController.IsKick = !1),
  (KuroSdkController.CXn = void 0),
  (KuroSdkController.ySe = void 0),
  (KuroSdkController.gXn = () => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("KuroSdk", 28, "AndroidScreenChangeCallBack"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAndroidConfigurationChange,
      );
    var e = UiLayer_1.UiLayer.UiRootItem?.GetRenderCanvas();
    e &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "KuroSdk",
        28,
        "旋转后LguiCanvasViewPort",
        ["viewPortX", e.GetViewportSize().X],
        ["viewPortY", e.GetViewportSize().Y],
      );
  }),
  (KuroSdkController.Gro = () => {
    ModelManager_1.ModelManager.KuroSdkModel?.UpdateActivityProgress();
  }),
  (KuroSdkController.DSe = (e, r, o) => {
    var t;
    !Platform_1.Platform.IsPs5Platform() ||
      (t =
        ModelManager_1.ModelManager.KuroSdkModel?.GetNextProgressActivityQuestId() ??
        0) <= 0 ||
      e !== t ||
      ModelManager_1.ModelManager.KuroSdkModel?.UpdateActivityProgress();
  }),
  (KuroSdkController.xkt = () => {
    _a.RequestServerPlayStationPlayOnlyState(),
      _a.RequestUpdatePlayStationBlockAccount();
  }),
  (KuroSdkController.lqt = () => {
    _a.cSe && _a.cSe.SetGamePadMode(Info_1.Info.IsInGamepad());
  }),
  (KuroSdkController.gSe = (e) => {
    var r =
      ConfigManager_1.ConfigManager.PayItemConfig.GetCurrentRegionPayConfigList();
    const o = new Array();
    r?.forEach((e) => {
      o.push(e.ProductId);
    }),
      ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(
        o,
      );
  }),
  (KuroSdkController.CSe = () => {
    _a.CanUseSdk() && _a.fSe && _a.PostKuroSdkEvent(10);
  }),
  (KuroSdkController.MSe = (e, r) => {
    e &&
      "" !== ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName &&
      _a.StartWaitPayItemTimer();
  }),
  (KuroSdkController._9a = (e) => {
    (ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = !0),
      (ModelManager_1.ModelManager.KuroSdkModel.ReviewDelay = e.qKn),
      e.h5n !== GACHATYPE && _a.TryOpenReview();
  });
//# sourceMappingURL=KuroSdkController.js.map
