"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginController = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  Json_1 = require("../../../Core/Common/Json"),
  LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer"),
  Stats_1 = require("../../../Core/Common/Stats"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Http_1 = require("../../../Core/Http/Http"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate"),
  HotPatchKuroSdk_1 = require("../../../Launcher/HotPatchKuroSdk/HotPatchKuroSdk"),
  HotPatchLogReport_1 = require("../../../Launcher/HotPatchLogReport"),
  CloudGameManagerLauncher_1 = require("../../../Launcher/Platform/CloudGameManagerLauncher"),
  Platform_1 = require("../../../Launcher/Platform/Platform"),
  PlatformSdkConfig_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkConfig"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  PlatformSdkReportData_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkReportData"),
  PlatformSdkServer_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkServer"),
  PreDownloadManager_1 = require("../../../Launcher/PreDownload/PreDownloadManager"),
  HotFixSceneManager_1 = require("../../../Launcher/Ui/HotFix/HotFixSceneManager"),
  LanguageUpdateManager_1 = require("../../../Launcher/Update/LanguageUpdateManager"),
  LauncherStorageLib_1 = require("../../../Launcher/Util/LauncherStorageLib"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  CrashCollectionController_1 = require("../../CrashCollection/CrashCollectionController"),
  GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager"),
  GlobalData_1 = require("../../GlobalData"),
  KuroPushController_1 = require("../../KuroPushSdk/KuroPushController"),
  KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager"),
  RenderUtil_1 = require("../../Render/Utils/RenderUtil"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
  UiBlueprintFunctionLibrary_1 = require("../BpBridge/UiBlueprintFunctionLibrary"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  CursorController_1 = require("../Cursor/CursorController"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  MarqueeController_1 = require("../Marquee/MarqueeController"),
  MarqueeModel_1 = require("../Marquee/MarqueeModel"),
  PlatformController_1 = require("../Platform/PlatformController"),
  ReconnectDefine_1 = require("../ReConnect/ReconnectDefine"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  SdkViewData_1 = require("../SdkUI/SdkViewData"),
  UiLoginSceneManager_1 = require("../UiComponent/UiLoginSceneManager"),
  LoginDefine_1 = require("./Data/LoginDefine"),
  Heartbeat_1 = require("./Heartbeat"),
  HeartbeatDefine_1 = require("./HeartbeatDefine"),
  LoginModel_1 = require("./LoginModel"),
  VERIFY_CONFIG_VERSION_INTERVAL = 9e4,
  TRY_BACK_TO_GAME_INTERVAL = 3e3,
  RENWE_ACCESS_TOKEN_INTERVAL = 6e5,
  RPT_INTERVAL = 6e5,
  RENWE_ACCESS_TOKEN_CD = 6e4,
  FOREVERTIME = 86313600,
  HTTP_PREFIX_STRING = "http://";
class HttpResult extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.code = 0),
      (this.token = ""),
      (this.host = ""),
      (this.hosts = void 0),
      (this.port = 0),
      (this.userData = 0),
      (this.errMessage = ""),
      (this.sex = 0),
      (this.banTimeStamp = 0),
      (this.banReason = 0),
      (this.clientWaitingMode = 0),
      (this.clientWaitingTime = 0),
      (this.clientAutoInInterval = 0);
  }
}
class RptInfo extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.Pid = ""),
      (this.Bid = ""),
      (this.Uid = ""),
      (this.PlayerId = ""),
      (this.Mac = ""),
      (this.IpLocal = ""),
      (this.IpServer = ""),
      (this.Cpu = ""),
      (this.Motherboard = ""),
      (this.Gpu = ""),
      (this.DeviceId = ""),
      (this.DiskNo = ""),
      (this.SysUUID = "");
  }
}
class ResultData {
  constructor() {
    this.ImageUrl = "";
  }
}
class Result extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), (this.Data = void 0);
  }
}
class HttpConnectResultData {
  constructor() {
    (this.Success = !1), (this.HttpResult = void 0);
  }
}
const PSN_TICK_INTERVAL = 1e3,
  HEALTH_TIP_INTERVAL = 1e3;
class LoginController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    var e = new Array();
    return (
      e.push(111),
      e.push(103),
      e.push(1650),
      e.push(101),
      e.push(105),
      e.push(107),
      Net_1.Net.InitCanTimerOutMessage(e),
      AudioSystem_1.AudioSystem.SetState(
        "platform",
        cpp_1.KuroApplication.IniPlatformName(),
      ),
      AudioSystem_1.AudioSystem.SetRtpcValue(
        "time_local",
        TimeUtil_1.TimeUtil.GetHoursFloat(),
      ),
      this.vMi(),
      LogAnalyzer_1.LogAnalyzer.SetP4Version(
        LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
          LauncherStorageLib_1.ELauncherStorageDeviceKey.PatchP4Version,
        ),
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          3,
          "ConfigVersion",
          [
            "PublicJsonVersion",
            ModelManager_1.ModelManager.LoginModel.PublicJsonVersion,
          ],
          [
            "PublicMiscVersion",
            ModelManager_1.ModelManager.LoginModel.PublicMiscVersion,
          ],
          [
            "PublicUniverseEditorVersion",
            ModelManager_1.ModelManager.LoginModel.PublicUniverseEditorVersion,
          ],
        ),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UiManagerInit,
      LoginController.MMi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ExitGamePush,
        LoginController.EMi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        LoginController.Wvi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        LoginController.JDe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkLoginResult,
        LoginController.k5a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SdkRefreshAccessToken,
        LoginController.bnl,
      ),
      Platform_1.Platform.IsPs5Platform() &&
        (this.Vza = TimerSystem_1.TimerSystem.Forever(
          LoginController.Hza,
          PSN_TICK_INTERVAL,
        )),
      (this.rhh = TimerSystem_1.TimerSystem.Forever(
        LoginController.ohh,
        HEALTH_TIP_INTERVAL,
      )),
      (this.LLc = TimerSystem_1.TimerSystem.Forever(
        LoginController.wLc,
        RPT_INTERVAL,
      ));
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UiManagerInit,
      LoginController.MMi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ExitGamePush,
        LoginController.EMi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        LoginController.Wvi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        LoginController.JDe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkLoginResult,
        LoginController.k5a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SdkRefreshAccessToken,
        LoginController.bnl,
      ),
      this.coa(),
      Platform_1.Platform.IsPs5Platform() &&
        this.Vza &&
        (TimerSystem_1.TimerSystem.Remove(this.Vza), (this.Vza = void 0)),
      this.rhh &&
        (TimerSystem_1.TimerSystem.Remove(this.rhh), (this.rhh = void 0)),
      this.LLc &&
        (TimerSystem_1.TimerSystem.Remove(this.LLc), (this.LLc = void 0));
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(110, LoginController.SMi),
      Net_1.Net.Register(115, LoginController.pla),
      Net_1.Net.Register(18012, LoginController.Y3a),
      Net_1.Net.Register(26321, LoginController.Is1);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(110),
      Net_1.Net.UnRegister(115),
      Net_1.Net.UnRegister(18012),
      Net_1.Net.UnRegister(26321);
  }
  static yMi(o) {
    if (
      (Heartbeat_1.Heartbeat.StopHeartBeat(
        HeartbeatDefine_1.EStopHeartbeat.LogoutNotify,
      ),
      Net_1.Net.Disconnect(0),
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.Init,
      ),
      o.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSexChangeLogout)
    )
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
        ReconnectDefine_1.ELogoutReason.LogoutNotify,
      );
    else if (
      o.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_HadBan ||
      o.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginDeviceBan ||
      o.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan
    ) {
      var r = o.Cvs,
        n = o.$xs.x9n,
        t = o.$xs.xSs,
        t =
          MathUtils_1.MathUtils.LongToNumber(t) -
          TimeUtil_1.TimeUtil.GetServerTime(),
        i = t >= FOREVERTIME;
      let e = 161;
      r === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginDeviceBan
        ? (e = 193)
        : r === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan && (e = 192),
        i && (e = 194);
      (i =
        ConfigManager_1.ConfigManager.ReportConfig?.GetBanInfoByTypeAndReason(
          2,
          n,
        )),
        (n = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t)),
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e));
      r === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan
        ? t.SetTextArgs(n.CountDownText ?? "")
        : ((r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            i.BanDescribe,
          )),
          t.SetTextArgs(r, n.CountDownText ?? "")),
        t.FunctionMap.set(1, () => {
          ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
            ReconnectDefine_1.ELogoutReason.LogoutNotify,
          );
        }),
        t.FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
            0,
          );
        }),
        CloudGameManager_1.CloudGameManager.IsCloudGame
          ? CloudGameManager_1.CloudGameManager.ExitGame(t.GetContentText())
          : ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              t,
            );
    } else {
      i = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(o.Cvs);
      let e = 10;
      o.Cvs ===
        Protocol_1.Aki.Protocol.Q4n.Proto_ErrCheckClientVersionNeedUpdate &&
        (e = 185);
      r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
      r.SetTextArgs(i);
      r.FunctionMap.set(1, () => {
        ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
          ReconnectDefine_1.ELogoutReason.LogoutNotify,
        );
      }),
        CloudGameManager_1.CloudGameManager.IsCloudGame
          ? CloudGameManager_1.CloudGameManager.ExitGame(r.GetContentText())
          : ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
              r,
            );
    }
    ModelManager_1.ModelManager.LoginModel.LogoutNotify = void 0;
  }
  static qO_() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Login",
        16,
        "LoginProcedure-OpenLoginView-加载进入登录的镜头",
      ),
      UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
        "LevelSequence_Back",
        () => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              16,
              "LoginProcedure-OpenLoginView-播放镜头结束，显示登录UI",
            ),
            Stats_1.Stat.CreateInstantStat(
              "LoginProcedure_LoginView_CameraAnim_Zoom_Out:End",
            ),
            LoginController.IMi(),
            RenderUtil_1.RenderUtil.EndPSOSyncMode();
        },
        !1,
        () => {
          CameraController_1.CameraController.EnterCameraMode(2, 0.1),
            RenderUtil_1.RenderUtil.BeginPSOSyncMode(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Login",
                16,
                "LoginProcedure-OpenLoginView-播放进入登录的镜头(拉远)",
              ),
            Stats_1.Stat.CreateInstantStat(
              "LoginProcedure_LoginView_CameraAnim_Zoom_Out:Start",
            ),
            LoginController.OpenSdkLoginView();
        },
      );
  }
  static OpenLoginView() {
    ModelManager_1.ModelManager.KuroSdkModel.ReportedInitState ||
      (KuroSdkReport_1.KuroSdkReport.Report(
        new KuroSdkReport_1.SdkReportGameInitFinish(void 0),
      ),
      (ModelManager_1.ModelManager.KuroSdkModel.ReportedInitState = !0)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          16,
          "LoginProcedure-OpenLoginView-更换PlayerController，初始化登录场景",
        ),
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.Init,
      );
    var e = UE.GameplayStatics.GetPlayerController(
        GlobalData_1.GlobalData.World,
        0,
      ).GetViewTarget(),
      o = e.D_K2_GetActorLocation(),
      r = e.K2_GetActorRotation(),
      n = e.CameraComponent.FieldOfView;
    void 0 !== e &&
      void 0 !== n &&
      void 0 !==
        (e =
          CameraController_1.CameraController.WidgetCamera.DisplayComponent
            .CineCamera) &&
      (e.CameraComponent.SetFieldOfView(n),
      e.D_K2_SetActorLocationAndRotation(o, r, !1, void 0, !0),
      e.GetCineCameraComponent().SetFilmbackPresetByName("16:9 DSLR")),
      UE.GameplayStatics.GetGameMode(
        GlobalData_1.GlobalData.World,
      ).ChangePlayerController(UE.BP_StartupPlayerController_C.StaticClass()),
      CursorController_1.CursorController.InitMouseByMousePos(),
      HotFixSceneManager_1.HotFixSceneManager.SetViewTarget(
        GlobalData_1.GlobalData.World,
      ),
      UiLoginSceneManager_1.UiLoginSceneManager.InitCinematicTick(),
      UiLoginSceneManager_1.UiLoginSceneManager.InitRoleObservers(() => {
        LoginController.qO_();
      });
  }
  static CreateCharacterViewToLoginView() {
    UiManager_1.UiManager.IsViewOpen("CreateCharacterView") &&
      UiManager_1.UiManager.CloseView("CreateCharacterView"),
      BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
        "Start",
        "CreateCharacterViewToLoginView",
      ).then(() => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Login",
            16,
            "CreateCharacterViewToLoginView - 播放镜头结束，显示登录UI",
          ),
          LoginController.IMi(),
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
            "Close",
            "CreateCharacterViewToLoginView",
          );
      });
  }
  static TMi() {
    var o = ModelManager_1.ModelManager.LoginModel.TryGetRealServerPort(),
      r = ModelManager_1.ModelManager.LoginModel.SetRpcHttp(
        LoginController.LMi,
        13e3,
      );
    if (this.IsSdkLoginMode()) {
      var n =
        ModelManager_1.ModelManager.LoginServerModel.GetLoginServersByClientRegion();
      if (!n || 0 === n.length)
        return (
          (n =
            BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
              LoginModel_1.STREAM,
            )),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Login",
              10,
              "LoginServers获取失败, 检查CDN是否正常",
              ["stream", n],
            ),
          ""
        );
      n =
        ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerIp();
      if (StringUtils_1.StringUtils.IsEmpty(n))
        return (
          (t =
            BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
              LoginModel_1.STREAM,
            )),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Login", 10, "sdkIp获取失败, 检查CDN是否正常", [
              "stream",
              t,
            ]),
          ""
        );
      ModelManager_1.ModelManager.LoginModel.SetServerName(
        ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerName(),
      ),
        ModelManager_1.ModelManager.LoginModel.SetServerId(
          ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId() ??
            "0",
        );
      var t = ModelManager_1.ModelManager.LoginModel.GetLoginUid(),
        i =
          ModelManager_1.ModelManager.LoginModel.GetLoginUserNameWithUriEncode(),
        a = ModelManager_1.ModelManager.LoginModel.GetLoginToken();
      let e = "0";
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        (e = UE.KuroSDKManager.GetBasicInfo()?.DeviceId);
      const _ = n.startsWith("http") ? n : `http://${n}:` + o;
      n = UE.KuroStaticLibrary.HashStringWithSHA1(a);
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Login",
            16,
            "LoginProcedure-Http-SDK环境",
            ["uId", t],
            ["userName", i],
            ["token", n],
            ["userData", r],
            ["deviceId", e],
          ),
        `${_}/api/login?loginType=1&userId=${t}&userName=${i}&token=${a}&userData=${r}&deviceId=${e}&loginTraceId=` +
          ModelManager_1.ModelManager.LoginModel.LoginTraceId
      );
    }
    (n = ModelManager_1.ModelManager.LoginModel.GetAccount()),
      (t = ModelManager_1.ModelManager.LoginModel.GetServerIp()),
      (i = encodeURIComponent(n));
    if (!this.IsSdkLoginMode()) {
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Login", 16, "LoginProcedure-Http-非SDK环境"),
        ModelManager_1.ModelManager.LoginModel.IsCopyAccount)
      ) {
        a =
          ModelManager_1.ModelManager.LoginModel.GetSourcePlayerAccount() ?? "";
        const _ = t.startsWith("http") ? t : `http://${t}:` + o;
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              16,
              "LoginProcedure-Http-非SDK环境-IsCopyAccount",
            ),
          `${_}/api/CopyUserLogin?loginType=0&userId=${i}&userName=${i}&token=1&userData=${r}&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}&sourceAccount=` +
            a
        );
      }
      const _ = t.startsWith("http") ? t : `http://${t}:` + o;
      return (
        _ +
        `/api/login?loginType=0&userId=${i}&userName=${i}&token=1&userData=${r}&loginTraceId=` +
        ModelManager_1.ModelManager.LoginModel.LoginTraceId
      );
    }
    const _ = t.startsWith("http") ? t : `http://${t}:` + o;
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          16,
          "LoginProcedure-Http-非SDK环境-非正式环境",
          ["serverIp", t],
          ["serverPort", o],
          ["userData", r],
        ),
      _ +
        `/api/login?loginType=0&userId=${i}&userName=${i}&token=1&userData=${r}&loginTraceId=` +
        ModelManager_1.ModelManager.LoginModel.LoginTraceId
    );
  }
  static DMi() {
    var e =
        ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerIp(),
      o = ModelManager_1.ModelManager.LoginModel.SetRpcHttp(
        LoginController.LMi,
        13e3,
      ),
      r = ModelManager_1.ModelManager.LoginModel.GetLoginUid(),
      n =
        ModelManager_1.ModelManager.LoginModel.GetLoginUserNameWithUriEncode(),
      t = ModelManager_1.ModelManager.LoginModel.GetLoginToken(),
      i = UE.KuroStaticLibrary.HashStringWithSHA1(t);
    let a = "0";
    a = PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetDeviceId()
      : (UE.KuroSDKManager.GetBasicInfo()?.DeviceId ?? "0");
    e = e.startsWith("http") ? e : `http://${e}:5500`;
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          16,
          "LoginProcedure-Http-GlobalSDK环境",
          ["uId", r],
          ["userName", n],
          ["token", i],
          ["userData", o],
          ["deviceId", a],
        ),
      `${e}/api/login?loginType=1&userId=${r}&userName=${n}&token=${t}&userData=${o}&deviceId=${a}&loginTraceId=` +
        ModelManager_1.ModelManager.LoginModel.LoginTraceId
    );
  }
  static IsSdkLoginMode() {
    return (
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() ||
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
    );
  }
  static IsGlobalSdkLoginMode() {
    return (
      (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) ||
      (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
        PlatformSdkConfig_1.PlatformSdkConfig.IsGlobal)
    );
  }
  static vla(e) {
    var o, r;
    ModelManager_1.ModelManager.LoginModel.HasBackToGameData() &&
      ((o = ModelManager_1.ModelManager.LoginModel.CheckBackToGameFailCount()),
      (r = ModelManager_1.ModelManager.LoginModel.BackToGameFailCount()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          3,
          "[BackToGame] 重进游戏信息",
          ["Result", e],
          ["allowBackToGame", o],
          ["backToGameFailCount", r],
        ),
      e ||
        (ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        ),
        o
          ? TimerSystem_1.TimerSystem.Delay(() => {
              this.IMi();
            }, TRY_BACK_TO_GAME_INTERVAL)
          : (ModelManager_1.ModelManager.LoginModel.GetBackToGameData().LoadingWidget.RemoveFromParent(),
            ModelManager_1.ModelManager.LoginModel.RemoveBackToGameData(),
            this.IMi())));
  }
  static async ConnectServer(e, o, r) {
    var n = new HttpConnectResultData(),
      t = Json_1.Json.Parse(o);
    if (void 0 === (n.HttpResult = t))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Login",
          8,
          "LoginProcedure-Http-服务器返回http结果反序列化失败!",
          ["result", o],
          ["httpCode", e],
        ),
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.LoginHttpRet,
          Protocol_1.Aki.Protocol.Q4n.Proto_HttpResultUndefine,
        ),
        this.vla(!1),
        (n.Success = !1);
    else {
      var o = ModelManager_1.ModelManager.LoginModel.CleanRpcHttp(t.userData),
        i = UE.KuroStaticLibrary.HashStringWithSHA1(t.token),
        a = new Array();
      if (t.hosts) for (const _ of t.hosts) a.push(_);
      else a.push(t.host);
      o
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              16,
              "LoginProcedure-Http-登录http请求返回",
              ["Token", i],
              ["Hosts", a.join()],
              ["Port", t.port],
              ["Code", t.code],
              ["rpcId", t.userData],
              ["errMessage", t.errMessage],
              ["hasRpc", o],
              ["httpCode", e],
            ),
          LoginController.RMi(t)
            ? ((n.Success = !0),
              UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView") &&
                (await UiManager_1.UiManager.CloseViewAsync(
                  "LoginQueueTipsView",
                )),
              void 0 !== t.sex &&
                ModelManager_1.ModelManager.LoginModel.SetPlayerSex(t.sex),
              ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                LoginDefine_1.ELoginStatus.LoginHttpRet,
              ),
              LoginController.LogLoginProcessLink(
                LoginDefine_1.ELoginStatus.LoginHttpRet,
              ),
              LoginController.UMi(t.token, a, t.port, r).then((e) => {
                LoginController.DisConnect(e),
                  this.vla(e),
                  e && LoginController.moa();
              }, LoginController.AMi))
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Login",
                  16,
                  "http请求返回状态错误",
                  ["Token", i],
                  ["Hosts", a.join()],
                  ["Port", t.port],
                  ["Code", t.code],
                  ["rpcId", t.userData],
                  ["errMessage", t.errMessage],
                  ["hasRpc", o],
                  ["httpCode", e],
                ),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Login",
                  16,
                  "http请求返回状态错误",
                  ["Token", i],
                  ["Hosts", a.join()],
                  ["Port", t.port],
                  ["Code", t.code],
                  ["rpcId", t.userData],
                  ["errMessage", t.errMessage],
                  ["hasRpc", o],
                  ["httpCode", e],
                ),
              ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                LoginDefine_1.ELoginStatus.Init,
              ),
              LoginController.LogLoginProcessLink(
                LoginDefine_1.ELoginStatus.LoginHttpRet,
                t.code,
              ),
              this.vla(!1),
              (n.Success = !1)))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Login",
              8,
              "LoginProcedure-Http-http请求返回超时",
              ["Token", i],
              ["Hosts", a.join()],
              ["Port", t.port],
              ["Code", t.code],
              ["rpcId", t.userData],
              ["errMessage", t.errMessage],
              ["httpCode", e],
            ),
          LoginController.LogLoginProcessLink(
            LoginDefine_1.ELoginStatus.LoginHttpRet,
            Protocol_1.Aki.Protocol.Q4n.Proto_HttpTimeout,
          ),
          this.vla(!1),
          (n.Success = !1));
    }
    return n;
  }
  static RMi(e) {
    var o = e.code;
    return (
      o === Protocol_1.Aki.Protocol.Q4n.KRs ||
      (o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginDeviceBan ||
      o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan ||
      o === Protocol_1.Aki.Protocol.Q4n.Proto_HadBan
        ? this.Dta(e.code, e.banTimeStamp, e.banReason)
        : o !== Protocol_1.Aki.Protocol.Q4n.Proto_NoHealthyGateway &&
          (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
          o === Protocol_1.Aki.Protocol.Q4n.Proto_ServerMaintenance ||
          o === Protocol_1.Aki.Protocol.Q4n.Proto_ServerNotOpen ||
          o === Protocol_1.Aki.Protocol.Q4n.Proto_NotInUserIdWhiteList
            ? this.GetAndShowStopServerNotice()
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenLoginStatusCodeTipView(
                o,
              )),
      !1)
    );
  }
  static Dta(e, o, r) {
    (o =
      MathUtils_1.MathUtils.LongToNumber(o) -
      TimeUtil_1.TimeUtil.GetServerTime()),
      (r =
        ConfigManager_1.ConfigManager.ReportConfig?.GetBanInfoByTypeAndReason(
          2,
          r,
        ));
    let n = 161;
    e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginDeviceBan
      ? (n = 193)
      : e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan && (n = 192);
    o >= FOREVERTIME && (n = 194);
    var o = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(o),
      t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(n);
    e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan
      ? t.SetTextArgs(o.CountDownText ?? "")
      : ((e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          r.BanDescribe,
        )),
        t.SetTextArgs(e, o.CountDownText ?? "")),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      );
  }
  static async UMi(n, t, i, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Login",
        16,
        "LoginProcedure-连接网关",
        ["token", n],
        ["host", t.join()],
        ["port", i],
        ["isSmokeTest", e],
      );
    let a = !1,
      _ = void 0;
    e: for (let r = 0; r < 3; ++r)
      for (let o = 0; o < t.length; ++o) {
        let e = !1;
        (_ = t[o]).startsWith(HTTP_PREFIX_STRING) &&
          ((e = !0), (_ = _.substring(HTTP_PREFIX_STRING.length))),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              16,
              "LoginProcedure-连接网关",
              ["index", o],
              ["host", _],
              ["hasHttp", e],
            );
        var g = 2 === r && o === t.length - 1;
        if ((a = await LoginController.PMi(n, _, i, g))) break e;
      }
    if (!a) return a;
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 16, "LoginProcedure-请求密钥"),
      !(a = await LoginController.xMi()))
    )
      return a;
    if (
      (ModelManager_1.ModelManager.QuestResourceModel.IsSeparateVideo &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("QuestResource", 38, "清理任务数据"),
        ModelManager_1.ModelManager.QuestResourceModel.ClearCheckQuests()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 16, "LoginProcedure-LoginRequest"),
      !(a = await LoginController.wMi(n)))
    )
      return a;
    if (ModelManager_1.ModelManager.LoginModel.GetHasCharacter()) {
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Login", 16, "LoginProcedure-已有角色, 跳过创角"),
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.EnterGameReq,
        ),
        !(a = await LoginController.HandleLoginGame(e, !0)))
      )
        return a;
    } else if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 16, "LoginProcedure-请求创角"),
      e)
    ) {
      var o = await LoginController.CreateCharacterRequest();
      if (
        !(a = await LoginController.HandleLoginGame(
          e,
          o === Protocol_1.Aki.Protocol.Q4n.KRs,
        ))
      )
        return a;
    } else
      LoginController.IsLoginViewOpen() && LoginController.ExitLoginView(),
        UiManager_1.UiManager.OpenView("CreateCharacterView"),
        CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameMode", 16, "CloudGame 请求创角"),
          GameSettingsManager_1.GameSettingsManager.ApplyCloudGameResolution(),
          UE.KuroCloudGameWrapper.SendDataToPipeBinary("HotPatchEnterGame"));
    return !0;
  }
  static DisConnect(e) {
    e
      ? HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
          HotPatchLogReport_1.LoginLogEventDefine.EnterGame,
          "enter_game_success",
        )
      : (Net_1.Net.Disconnect(2),
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        ),
        HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
          HotPatchLogReport_1.LoginLogEventDefine.EnterGame,
          "enter_game_failed",
        ));
  }
  static async HandleLoginGame(r, n) {
    return new Promise((o) => {
      LoginController.EnterGame((e) => {
        r
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Login",
                10,
                "冒烟测试登录流程",
                ["登录结果", n],
                ["EnterGame结果", e],
              ),
            e || LoginController.IsLoginViewOpen() || LoginController.IMi())
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Login",
                10,
                "正常登录流程",
                ["登录结果", n],
                ["EnterGame结果", e],
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.LoginRequestResult,
              e,
            )),
          o(e);
      });
    });
  }
  static async PMi(e, o, r, n) {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
      LoginDefine_1.ELoginStatus.ConvGate,
    ),
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ConvGate),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          8,
          "LoginProcedure-登录网关",
          ["host", o],
          ["port", r],
        );
    var t = await Net_1.Net.ConnectAsync(o, r, 3e3, 1);
    return 0 !== t
      ? (n &&
          (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByTextId(
            "ConnectGateWayFail",
          )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Login",
            30,
            "LoginProcedure-登录网关失败！",
            ["result", t],
            ["token", e],
            ["host", o],
            ["port", r],
          ),
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.ConvRet,
          Protocol_1.Aki.Protocol.Q4n.Proto_ConvGateTimeout,
        ),
        !1)
      : (ModelManager_1.ModelManager.LoginModel.SetReconnectInfo(e, o, r),
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.ConvRet,
        ),
        LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ConvRet),
        !0);
  }
  static BMi() {
    var e;
    return UE.KuroStaticLibrary.IsModuleLoaded("KuroTDM")
      ? "CN" !==
        BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 27, "海外sdk不使用tdm"),
          "")
        : (e = UE.TDMStaticLibrary.GetDeviceInfo()).includes("Error")
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 27, "TDMStaticLibrary获取设备信息失败", [
                "tdm",
                e,
              ]),
            "")
          : e
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Login", 27, "TDMStaticLibrary模块未加载"),
        "");
  }
  static async wMi(e) {
    Stats_1.Stat.CreateInstantStat("LoginProcedure.LoginRequest:Start"),
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.LoginReq,
      );
    var o = new Protocol_1.Aki.Protocol.fss(),
      r =
        ((o.X9n = ModelManager_1.ModelManager.LoginModel.GetLoginUid()),
        (o.$9n = e),
        this.vMi(),
        (o.Y9n = UE.KuroLauncherLibrary.GetAppVersion()),
        (o.J9n = ModelManager_1.ModelManager.LoginModel.LauncherVersion),
        (o.z9n = ModelManager_1.ModelManager.LoginModel.ResourceVersion),
        (o.Z9n =
          PlatformController_1.PlatformController.PackageClientBasicInfo()),
        (o.e7n = new Protocol_1.Aki.Protocol.e7n()),
        (o.e7n.t7n = NetDefine_1.CONFIG_MD5_VALUE),
        (o.e7n.i7n = NetDefine_1.CONFIG_VERSION),
        (o.e7n.r7n = NetDefine_1.PROTO_MD5_VALUE),
        (o.e7n.o7n = NetDefine_1.PROTO_SEED_MD5_VALUE),
        (o.e7n.n7n = NetDefine_1.PROTO_VERSION),
        BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
          "Stream",
        ));
    (o.e7n.s7n = r),
      (o.n$s =
        await KuroPushController_1.KuroPushController.GetPushNotiPermissionEnableState()),
      (o.lea = KuroPushController_1.KuroPushController.GetClientId()),
      (o.a7n = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? ""),
      (o.h7n = new Protocol_1.Aki.Protocol.h7n()),
      (o.pQ_ = Number(
        BaseConfigController_1.BaseConfigController.GetConfigVersion(
          "FsmVersion",
        ),
      )),
      (o.QR1 = 1),
      VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo() &&
        0 <
          (r = LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(
            LauncherStorageLib_1.ELauncherStorageDeviceKey
              .UserSelectedVideoUpdate,
            0,
          )) &&
        (o.QR1 = r);
    let n = !1,
      t = !1;
    2 === Info_1.Info.PlatformType
      ? ((n = UE.KuroStaticAndroidLibrary.GetDeviceIsRooted()),
        (t = UE.KuroStaticAndroidLibrary.GetDeviceIsEmulator()))
      : 1 === Info_1.Info.PlatformType &&
        (n = UE.KuroStaticiOSLibrary.GetDeviceJailbroken()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          27,
          "获取ACE信息",
          ["ifRoot", n],
          ["ifSimulator", t],
        ),
      (o.h7n.l7n = n),
      (o.h7n._7n = t);
    var r = this.BMi();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Login", 27, "设备信息", ["tdm", r]),
      (o.h7n.u7n = r),
      LoginController.bMi() &&
        (this.vMi(),
        (o.c7n = Protocol_1.Aki.Protocol.c7n.create()),
        (o.c7n.m7n = ModelManager_1.ModelManager.LoginModel.PublicJsonVersion),
        (o.c7n.d7n = ModelManager_1.ModelManager.LoginModel.PublicMiscVersion),
        (o.c7n.C7n =
          ModelManager_1.ModelManager.LoginModel.PublicUniverseEditorVersion));
    let i = "",
      a = "",
      _ = "",
      g = 0;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      ((i =
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetUserId()),
      (r =
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkOnlineId(
          [i],
        )) && (a = r.get(i) ?? ""),
      (r =
        await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkAccountId(
          [i],
        )),
      "" !== (_ = r ? (r.get(i) ?? "") : _) &&
        ((r =
          await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(
            _,
          )),
        (g = 1 === r ? 1 : 0)),
      ModelManager_1.ModelManager.PlayerInfoModel.InitThirdPartyId(i, a, _),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "Login",
        27,
        "登录PSN信息",
        ["psnUserId", i],
        ["psnOnlineId", a],
        ["psnAccountId", _],
      ),
      (o.Jxa = i),
      (o.Qxa = a),
      (o.ywa = _),
      (o.$4l = g),
      (o.z3a =
        BaseConfigController_1.BaseConfigController.GetPackageClientFightConfig()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          16,
          "LoginProcedure-LoginRequest-请求登录",
          ["account", o.X9n],
          ["token", o.$9n],
          ["AppVersion", o.Y9n],
          ["LauncherVersion", o.J9n],
          ["ResourceVersion", o.z9n],
          ["ClientBasicInfo", o.Z9n],
          ["ConfigMd5", NetDefine_1.CONFIG_MD5_VALUE],
          ["ConfigVersion", NetDefine_1.CONFIG_VERSION],
          ["ProtoMd5", NetDefine_1.PROTO_MD5_VALUE],
          ["ProtoSeedMd5", NetDefine_1.PROTO_SEED_MD5_VALUE],
          ["ProtoVersion", NetDefine_1.PROTO_VERSION],
          ["pQ_", o.pQ_],
        );
    r = await LoginController.qMi(o);
    return r?.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ServerFullLoadGate
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Login",
            16,
            "LoginProcedure-LoginRequest-ServerFullLoadGate",
          ),
        (await LoginController.GMi(r.K9n, r.Q9n, r.Oxs))
          ? LoginController.wMi(e)
          : (ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
              LoginDefine_1.ELoginStatus.Init,
            ),
            !1))
      : ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
            LoginDefine_1.ELoginStatus.LoginRet,
          )
        ? (UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView") &&
            (await UiManager_1.UiManager.CloseViewAsync("LoginQueueTipsView")),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.LoginSuccess,
            o.X9n,
          ),
          Heartbeat_1.Heartbeat.BeginHeartBeat(
            HeartbeatDefine_1.EBeginHeartbeat.GetLoginResponse,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 16, "LoginProcedure-LoginRequest-登录成功"),
          Stats_1.Stat.CreateInstantStat("LoginProcedure.LoginRequest:End"),
          !0)
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Login",
              8,
              "请求登录失败",
              ["account", o.X9n],
              ["token", o.$9n],
            ),
          !1);
  }
  static async xMi() {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
      LoginDefine_1.ELoginStatus.ProtoKeyReq,
    ),
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.ProtoKeyReq,
      );
    var e = new Protocol_1.Aki.Protocol.Tss(),
      e =
        ((e.wVn = !0),
        (e.g7n = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? ""),
        Net_1.Net.ChangeState1(),
        await Net_1.Net.CallAsync(111, e, 3e3));
    return e
      ? (Net_1.Net.SetDynamicProtoKey(e.h5n, e.Z4n),
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.ProtoKeyRet,
        ),
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.ProtoKeyRet,
        ),
        !0)
      : (LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.ProtoKeyRet,
          Protocol_1.Aki.Protocol.Q4n.Proto_ProtoKeyTimeout,
        ),
        !1);
  }
  static async qMi(e, o = 0) {
    var r = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
    if (
      r !== LoginDefine_1.ELoginStatus.Init &&
      r !== LoginDefine_1.ELoginStatus.LoginRet
    ) {
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginReq);
      r = await Net_1.Net.CallAsync(103, e, 13e3);
      if (r)
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              16,
              "LoginProcedure-LoginRequest-Response",
              ["Code", r.Cvs],
            ),
          (ModelManager_1.ModelManager.LoginModel.Platform = r.f7n),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Login", 9, "当前登录的游戏服务器节点：", [
              "response.Platform",
              r.f7n,
            ]),
          r.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_LoginRetry
            ? (LoginController.LogLoginProcessLink(
                LoginDefine_1.ELoginStatus.LoginRet,
                r.Cvs,
              ),
              5 <= o ? r : await LoginController.qMi(e, o + 1))
            : (r.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_AppVersionNotMatch ||
              r.Cvs ===
                Protocol_1.Aki.Protocol.Q4n.Proto_LauncherVersionIsTooLow ||
              r.Cvs ===
                Protocol_1.Aki.Protocol.Q4n.Proto_ResourceVersionIsTooLow
                ? (ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                    LoginDefine_1.ELoginStatus.Init,
                  ),
                  (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                    54,
                  )).FunctionMap.set(1, LoginController.NMi),
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    e,
                  ),
                  LoginController.LogLoginProcessLink(
                    LoginDefine_1.ELoginStatus.LoginRet,
                    r.Cvs,
                  ))
                : ((o =
                    r.Cvs ===
                    Protocol_1.Aki.Protocol.Q4n.Proto_HaveNoCharacter),
                  ModelManager_1.ModelManager.LoginModel.SetHasCharacter(!o),
                  ModelManager_1.ModelManager.LoginModel.SetIsNewAccount(o),
                  o || r.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
                    ? (TimeUtil_1.TimeUtil.SetServerTimeStamp(r.Rws),
                      (e = Number(MathUtils_1.MathUtils.LongToBigInt(r.Rws))),
                      cpp_1.FuncOpenLibrary.SetFirstTimestamp(e / 1e3),
                      (ModelManager_1.ModelManager.LoginModel.LoginTimeStamp =
                        e / 1e3),
                      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                        LoginDefine_1.ELoginStatus.LoginRet,
                      ),
                      LoginController.LogLoginProcessLink(
                        LoginDefine_1.ELoginStatus.LoginRet,
                      ),
                      ModelManager_1.ModelManager.LoginModel.SetReconnectToken(
                        r.p7n,
                      ))
                    : (LoginController.LogLoginProcessLink(
                        LoginDefine_1.ELoginStatus.LoginRet,
                        r.Cvs,
                      ),
                      r.Cvs !==
                        Protocol_1.Aki.Protocol.Q4n.Proto_ServerFullLoadGate &&
                        (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
                        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                          LoginDefine_1.ELoginStatus.Init,
                        ),
                        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                          r.Cvs,
                          104,
                        )))),
              r)
        );
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.LoginRet,
        Protocol_1.Aki.Protocol.Q4n.Proto_LoginReqTimeout,
      );
    }
  }
  static async CreateCharacterRequest() {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
      LoginDefine_1.ELoginStatus.CreateReq,
    );
    var e = ModelManager_1.ModelManager.LoginModel.GetPlayerSex(),
      o = ModelManager_1.ModelManager.LoginModel.GetPlayerName(),
      r = new Protocol_1.Aki.Protocol.Css(),
      e =
        ((r.v7n = e),
        (r.H8n = o),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Login",
            8,
            "请求创角",
            ["Sex", r.v7n],
            ["Name", r.H8n],
          ),
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.CreateReq,
        ),
        await Net_1.Net.CallAsync(101, r, 13e3));
    return e
      ? ((o = e?.Cvs) === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord ||
        o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength
          ? LoginController.LogLoginProcessLink(
              LoginDefine_1.ELoginStatus.CreateRet,
              o,
            )
          : o !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Cvs,
                102,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Login",
                  8,
                  "请求创角失败",
                  ["Sex", r.v7n],
                  ["Name", r.H8n],
                ),
              LoginController.LogLoginProcessLink(
                LoginDefine_1.ELoginStatus.CreateRet,
                o,
              ))
            : (ModelManager_1.ModelManager.LoginModel.SetCreatePlayerTime(
                e.aws,
              ),
              ModelManager_1.ModelManager.LoginModel.SetCreatePlayerId(e.W5n),
              this.wLc(),
              ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
                3,
              ),
              (r = new Map()).set("101104", ""),
              KuroSdkReport_1.KuroSdkReport.Report(
                new KuroSdkReport_1.SdkReportCreateRole(r),
              ),
              ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                LoginDefine_1.ELoginStatus.CreateRet,
              ),
              LoginController.LogLoginProcessLink(
                LoginDefine_1.ELoginStatus.CreateRet,
              ),
              ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                LoginDefine_1.ELoginStatus.EnterGameReq,
              )),
        o)
      : ((e = Protocol_1.Aki.Protocol.Q4n.Proto_CreateCharacterReqTimeout),
        ModelManager_1.ModelManager.LoginModel?.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        ) ||
          (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "CreateCharacterTimeoutTip",
          ),
          LoginController.LogLoginProcessLink(
            LoginDefine_1.ELoginStatus.CreateRet,
            e,
          ),
          LoginController.DisConnect(!1),
          LoginController.OMi()),
        e);
  }
  static SetIfFirstTimeLogin() {
    ModelManager_1.ModelManager.LoginModel.SetTodayFirstTimeLogin(
      LoginController.kMi(),
    ),
      ModelManager_1.ModelManager.LoginModel.SetLastLoginTime(
        TimeUtil_1.TimeUtil.GetServerTime(),
      );
  }
  static kMi() {
    var e,
      o,
      r = ModelManager_1.ModelManager.LoginModel.GetLastLoginTime();
    return (
      TimeUtil_1.TimeUtil.GetServerTime() - r >=
        TimeUtil_1.TimeUtil.OneDaySeconds ||
      !r ||
      ((e = TimeUtil_1.TimeUtil.GetServerTime()),
      (o = new Date().setHours(4, 0, 0, 0) / 1e3),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 27, "当前时间", ["time", e]),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 27, "之前时间", ["time", r]),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 27, "当天4点时间戳", ["time", o]),
      o <= e && r < o)
    );
  }
  static FMi(n) {
    this.IsSdkLoginMode() &&
      ((e =
        ConfigManager_1.ConfigManager.LoginConfig.GetDefaultSingleMapId()) &&
        ModelManager_1.ModelManager.LoginModel.SetSingleMapId(e),
      3 !== Info_1.Info.PlatformType &&
        BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() &&
        ModelManager_1.ModelManager.LoginModel.SetSingleMapId(891),
      (e = ConfigManager_1.ConfigManager.LoginConfig.GetDefaultMultiMapId())) &&
      ModelManager_1.ModelManager.LoginModel.SetMultiMapId(e);
    var e = new Protocol_1.Aki.Protocol.pss();
    (e.M7n = ModelManager_1.ModelManager.LoginModel.GetSingleMapId()),
      (e.S7n = ModelManager_1.ModelManager.LoginModel.GetMultiMapId()),
      (e.E7n = ModelManager_1.ModelManager.LoginModel.BornMode),
      (e.l8n = ModelManager_1.ModelManager.LoginModel.BornLocation),
      ModelManager_1.ModelManager.LoadingModel.SetIsLoginToWorld(!0),
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.EnterGameReq,
      ),
      Net_1.Net.ChangeStateEnterGame(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 16, "LoginProcedure-EnterGame-Call", [
          "enterGameRequest",
          e,
        ]),
      Net_1.Net.Call(
        105,
        e,
        (e, o) => {
          var r;
          e
            ? e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
              ? n(!0)
              : (LoginController.LogLoginProcessLink(
                  LoginDefine_1.ELoginStatus.EnterGameRet,
                  e.Cvs,
                ),
                e.Cvs !== Protocol_1.Aki.Protocol.Q4n.Proto_ServerFullLoadGame
                  ? (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
                    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                      e.Cvs,
                      106,
                    ),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info("Login", 8, "请求进入游戏失败"),
                    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                      LoginDefine_1.ELoginStatus.Init,
                    ),
                    n(!1))
                  : LoginController.GMi(e.K9n, e.Q9n, e.Oxs).then((e) => {
                      e
                        ? LoginController.FMi(n)
                        : (ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                            LoginDefine_1.ELoginStatus.Init,
                          ),
                          n(!1));
                    }))
            : (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Login", 8, "请求进入游戏失败, 超时"),
              LoginController.LogLoginProcessLink(
                LoginDefine_1.ELoginStatus.EnterGameRet,
                Protocol_1.Aki.Protocol.Q4n.Proto_EnterGameTimeout,
              ),
              ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                LoginDefine_1.ELoginStatus.Init,
              ),
              (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33)),
              (r =
                ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
                  Protocol_1.Aki.Protocol.Q4n.Proto_LoginTimeout,
                )),
              e.SetTextArgs(r),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ),
              UiManager_1.UiManager.CloseView("NetWorkMaskView"),
              n(!1));
        },
        13e3,
      );
  }
  static async GMi(e, o, r) {
    UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView") ||
      (((n = new LoginDefine_1.LoginQueueConfig()).K9n = e),
      (n.Q9n = o),
      await UiManager_1.UiManager.OpenViewAsync("LoginQueueTipsView", n)),
      ModelManager_1.ModelManager.LoginModel.CreateAutoLoginPromise(),
      (ModelManager_1.ModelManager.LoginModel.AutoLoginTimerId =
        TimerSystem_1.TimerSystem.Delay(
          () => {
            ModelManager_1.ModelManager.LoginModel.FinishAutoLoginPromise(!0),
              (ModelManager_1.ModelManager.LoginModel.AutoLoginTimerId =
                void 0);
          },
          Math.max(r, TimeUtil_1.TimeUtil.InverseMillisecond),
        ));
    var n,
      e = await ModelManager_1.ModelManager.LoginModel.WaitAutoLoginPromise();
    return (
      e ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Login", 8, "玩家取消了登录排队, 不再排队")),
      ModelManager_1.ModelManager.LoginModel.ClearAutoLoginTimerId(),
      ModelManager_1.ModelManager.LoginModel.ClearAutoLoginPromise(),
      e
    );
  }
  static EnterGame(o) {
    Stats_1.Stat.CreateInstantStat("LoginProcedure.RequestEnterGame:Start"),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 16, "LoginProcedure-EnterGame-进入游戏"),
      ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
        LoginDefine_1.ELoginStatus.EnterGameReq,
      )
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              16,
              "LoginProcedure-EnterGame-请求进入游戏",
            ),
          this.FMi((e) => {
            e
              ? (UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView")
                  ? UiManager_1.UiManager.CloseViewAsync(
                      "LoginQueueTipsView",
                    ).then(() => {
                      ModelManager_1.ModelManager.LoginModel.CleanLoginFailCount(
                        LoginDefine_1.ECleanFailCountWay.LoginSuccess,
                      ),
                        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                          LoginDefine_1.ELoginStatus.EnterGameRet,
                        ),
                        LoginController.LogLoginProcessLink(
                          LoginDefine_1.ELoginStatus.EnterGameRet,
                        ),
                        (ModelManager_1.ModelManager.LoginModel.LoginTraceId =
                          void 0),
                        EventSystem_1.EventSystem.Emit(
                          EventDefine_1.EEventName.EnterGameSuccess,
                        ),
                        Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "Login",
                            16,
                            "LoginProcedure-EnterGame-进入游戏成功",
                          ),
                        ModelManager_1.ModelManager.CreatureModel.SetGameplayTagHash(
                          UE.GASBPLibrary.GetNetworkGameplayTagNodeIndexHash(),
                        ),
                        Stats_1.Stat.CreateInstantStat(
                          "LoginProcedure.EnterGame:End",
                        ),
                        o(!0);
                    })
                  : (ModelManager_1.ModelManager.LoginModel.CleanLoginFailCount(
                      LoginDefine_1.ECleanFailCountWay.LoginSuccess,
                    ),
                    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                      LoginDefine_1.ELoginStatus.EnterGameRet,
                    ),
                    LoginController.LogLoginProcessLink(
                      LoginDefine_1.ELoginStatus.EnterGameRet,
                    ),
                    (ModelManager_1.ModelManager.LoginModel.LoginTraceId =
                      void 0),
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.EnterGameSuccess,
                    ),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Login",
                        16,
                        "LoginProcedure-EnterGame-进入游戏成功",
                      ),
                    ModelManager_1.ModelManager.CreatureModel.SetGameplayTagHash(
                      UE.GASBPLibrary.GetNetworkGameplayTagNodeIndexHash(),
                    ),
                    Stats_1.Stat.CreateInstantStat(
                      "LoginProcedure.RequestEnterGame:End",
                    ),
                    o(!0)),
                this.wLc())
              : (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Login",
                    16,
                    "LoginProcedure-EnterGame-进入游戏失败",
                  ),
                o(!1));
          }))
        : o(!1);
  }
  static CheckCanReConnect() {
    return LoginController.IsLoginViewOpen()
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 30, "不能重连 LoginViewOpen"),
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        ),
        !1)
      : !LoginController.OMi() ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Login", 30, "不能重连 CreateCharacterViewOpen"),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "ConnectGateWayFail",
          ),
          ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
            LoginDefine_1.ELoginStatus.Init,
          ),
          !1);
  }
  static OMi() {
    return (
      !!UiManager_1.UiManager.IsViewShow("CreateCharacterView") &&
      (UiManager_1.UiManager.CloseView("NetWorkMaskView"),
      LoginController.CreateCharacterViewToLoginView(),
      !0)
    );
  }
  static cPa(e, o = !1, r) {
    if ("PsnAuthFail" === e) {
      const n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(209);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
        n,
      ),
        void (
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Login",
            16,
            "[PlatformSdkNew] OnSdkServerFail PsnAuthFail",
            ["msg", e],
          )
        );
    } else if ("HttpFail" === e) {
      const n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(214);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
        n,
      ),
        r && n.SetCloseFunction(r),
        void (
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Login",
            16,
            "[PlatformSdkNew] OnSdkServerFail BadHttp",
            ["msg", e],
          )
        );
    } else if (o) {
      const n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42);
      n.SetTextArgs(e),
        n.SetCloseFunction(() => {
          ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
            ReconnectDefine_1.ELogoutReason.SdkRenewAccessTokenFailed,
          );
          var e = new PlatformSdkReportData_1.PlatformReportSdkOfflineSucc();
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(
            e,
          );
        }),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
          n,
        ),
        void (
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Login",
            16,
            "[PlatformSdkNew] OnSdkServerFail needReLogin",
            ["msg", e],
          )
        );
    } else {
      const n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42);
      n.SetTextArgs(e),
        r && n.SetCloseFunction(r),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Login",
            16,
            "[PlatformSdkNew] OnSdkServerFail MsgTip",
            ["msg", e],
          ),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
          n,
        );
    }
  }
  static async SdkLoginNew() {
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(2);
    var e = new CustomPromise_1.CustomPromise(),
      e = (this.xml(1, e), await e.Promise);
    return e &&
      ((e = new CustomPromise_1.CustomPromise()), this.Pml(e), await e.Promise)
      ? 0
      : -1;
  }
  static Pml(t) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().Login(
      (e, o, r, n) => {
        r
          ? (UiManager_1.UiManager.OpenView("SdkLoginView"), t.SetResult(!1))
          : n
            ? (this.OnSdkLoginResult(n.code, n.cuid, n.username),
              t.SetResult(!0))
            : (ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0),
              this.cPa(e, o),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Login",
                  16,
                  "LoginProcedure-SdkLoginNew-SDK登录失败",
                  ["msg", e],
                ),
              t.SetResult(!1));
      },
    );
  }
  static xml(n, t) {
    var e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk();
    PlatformSdkServer_1.PlatformSdkServer.IsConnected
      ? t.SetResult(!0)
      : e.ConnectToServer((e, o, r) => {
          r
            ? t.SetResult(!0)
            : 1 === n
              ? (PlatformSdkServer_1.PlatformSdkServer.SwitchUrl(),
                this.xml(n + 1, t))
              : (ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0),
                this.cPa(e, o, () => {
                  this.SdkLoginNew();
                }),
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Login",
                    16,
                    "LoginProcedure-ConnectToSdkServer-SDK服务器初始化失败",
                  ),
                t.SetResult(!1));
        });
  }
  static OnSdkLoginResult(e, o, r) {
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginInfo(e, o, r),
      this.Mll(),
      this.mPa();
  }
  static async Mll() {
    var e, o;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      ((e = new SdkViewData_1.SdkEnterTipsViewData()),
      (o =
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetUserId()),
      (o =
        (
          await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkOnlineId(
            [o],
          )
        ).get(o) ?? ""),
      (e.Text = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("SdkLoginSuccess"),
        o,
      )),
      UiManager_1.UiManager.OpenView("SdkEnterTipsView", e));
  }
  static mPa() {
    const n = ModelManager_1.ModelManager.LoginModel.GetSdkLoginInfo();
    n
      ? PlatformSdkServer_1.PlatformSdkServer.GetAccessToken(
          n.LoginCode,
          (e, o, r) => {
            !r || o
              ? (ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0),
                this.cPa(e, o, () => {
                  this.SdkLoginNew();
                }))
              : ((e = {
                  LoginCode: LoginDefine_1.ESdkLoginCode.LoginSuccess,
                  Uid: n.Uid,
                  UserName: n.UserName,
                  Token: r.access_token,
                }),
                (ModelManager_1.ModelManager.LoginModel.SdkAccessToken =
                  r.access_token),
                PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().RefreshAccessToken(
                  r.access_token,
                ),
                this.OnSdkLogin(e),
                this.JAa());
          },
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Login",
          16,
          "LoginProcedure-GetAccessToken-SDK获取Token失败, sdkLoginInfo为空",
        );
  }
  static JAa() {
    ModelManager_1.ModelManager.LoginModel.SdkAccessTokenCountingState ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 43, "开始续签定时器"),
      (ModelManager_1.ModelManager.LoginModel.SdkAccessTokenRunTime = 0),
      (ModelManager_1.ModelManager.LoginModel.SdkAccessTokenCountingState =
        !0));
  }
  static OpenSdkLoginView() {
    ModelManager_1.ModelManager.LoginModel.HasBackToGameData() ||
      (ControllerHolder_1.ControllerHolder.KuroSdkController.CheckIfSdkLogin() &&
        ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
          6,
        ),
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
        (UE.KuroLauncherLibrary.IsFirstIntoLauncher()
          ? (Stats_1.Stat.CreateInstantStat("LoginProcedure.SdkLogin:Start"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLogin-首次登录"),
            LoginController.LogLoginProcessLink(
              LoginDefine_1.ELoginStatus.SdkViewOpen,
            ),
            ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
              0,
            ))
          : (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLogin-非首次登录"),
            ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
              7,
            ))));
  }
  static GetAndShowStopServerNotice() {
    var e =
        ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId(),
      e =
        PublicUtil_1.PublicUtil.GetLoginNoticeUrl2(
          PublicUtil_1.PublicUtil.GetGameId(),
          LanguageSystem_1.LanguageSystem.PackageLanguage,
          e,
        ) ?? "";
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Login", 27, "获取登录公告", ["http", e]),
      Http_1.Http.Get(e, void 0, this.HMi);
  }
  static jMi() {
    var e = new LoginModel_1.LoginNotice();
    (e.Title =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "DefaultLoginTitle",
      ) ?? ""),
      (e.content =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "DefaultLoginNotice",
        ) ?? ""),
      this.WMi(e);
  }
  static WMi(e) {
    e &&
      ((ModelManager_1.ModelManager.LoginModel.LoginNotice = e),
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42)).SetTitle(
        ModelManager_1.ModelManager.LoginModel.LoginNotice.Title,
      ),
      e.SetTextArgs(ModelManager_1.ModelManager.LoginModel.LoginNotice.content),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      ));
  }
  static IMi() {
    Stats_1.Stat.CreateInstantStat("LoginProcedure.EnterLoginView"),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Login", 27, "进入登录界面"),
      ModelManager_1.ModelManager.LoginModel.HasBackToGameData()
        ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
          ? this.SdkLoginNew()
          : (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
              this.N5a(),
            this.F5a())
        : this.IsLoginViewOpen() ||
          (this.IsSdkLoginMode()
            ? UiManager_1.UiManager.OpenView("LoginView")
            : this.KMi() || UiManager_1.UiManager.OpenView("LoginDebugView"));
  }
  static F5a() {
    var e = this.IsSdkLoginMode(),
      o = ModelManager_1.ModelManager.LoginModel.GetBackToGameData();
    void 0 === o || void 0 === o.BackToGameLoginData
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Login", 27, "LoginToCacheServer", ["cacheSaveData", o])
      : (ModelManager_1.ModelManager.LoginServerModel.SelectCurrentSelectServerByServerId(
          o.BackToGameLoginData.SelectServerIp,
          o.BackToGameLoginData.SelectServerId,
        ),
        LoginController.GetHttp(!e));
  }
  static N5a() {
    var e = ModelManager_1.ModelManager.LoginModel.GetBackToGameData(),
      o = e?.BackToGameLoginData;
    void 0 === e || void 0 === o
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Login", 27, "RecoverSdkLoginData", [
          "cacheSaveData",
          e,
        ])
      : (ModelManager_1.ModelManager.LoginModel.SetSdkLoginConfig(
          o.Uid,
          o.UserName,
          o.Token,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Login", 27, "RecoverSdkLoginData", ["loginData", o]),
        ControllerHolder_1.ControllerHolder.KuroSdkController.RecoverSdkData());
  }
  static KMi() {
    var e, o, r;
    return (
      !!GlobalData_1.GlobalData.IsPlayInEditor &&
      !!(e = PublicUtil_1.PublicUtil.TestLoadEditorConfigData())
        ?.EditorStartConfig?.IsReLoadArchive &&
      ((o = e.EditorStartConfig.ArchiveAccount),
      (r = e.EditorStartConfig.DungeonId),
      (e.EditorStartConfig.IsReLoadArchive = !1),
      PublicUtil_1.PublicUtil.TestSaveEditorConfigData(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Login",
          42,
          "GM读取存档快速登录",
          ["账号:", o],
          ["副本ID:", r],
        ),
      ModelManager_1.ModelManager.LoginModel.SetSingleMapId(r),
      ModelManager_1.ModelManager.LoginModel.SetAccount(o),
      LoginController.GetHttp(!0),
      !0)
    );
  }
  static IsLoginViewOpen() {
    return (
      UiManager_1.UiManager.IsViewShow("LoginView") ||
      UiManager_1.UiManager.IsViewShow("LoginDebugView")
    );
  }
  static ExitLoginView() {
    UiManager_1.UiManager.IsViewShow("LoginDebugView") &&
      UiManager_1.UiManager.CloseView("LoginDebugView"),
      UiManager_1.UiManager.IsViewShow("LoginView") &&
        UiManager_1.UiManager.CloseView("LoginView");
  }
  static LogLoginProcessLink(e, o = Protocol_1.Aki.Protocol.Q4n.KRs) {
    var r = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig(),
      n = new LogReportDefine_1.LoginProcessLink();
    (n.s_trace_id = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? ""),
      (n.s_user_id = r?.Uid ?? ""),
      (n.s_user_name =
        r?.UserName ?? ModelManager_1.ModelManager.LoginModel.GetAccount()),
      (n.s_login_step = LoginDefine_1.ELoginStatus[e]),
      (n.s_app_version = UE.KuroLauncherLibrary.GetAppVersion()),
      (n.s_launcher_version = LocalStorage_1.LocalStorage.GetDeviceSaved(
        LocalStorageDefine_1.ELocalStorageDeviceKey.LauncherPatchVersion,
        n.s_app_version,
      )),
      (n.s_resource_version = LocalStorage_1.LocalStorage.GetDeviceSaved(
        LocalStorageDefine_1.ELocalStorageDeviceKey.PatchVersion,
        n.s_app_version,
      )),
      (n.s_client_version =
        BaseConfigController_1.BaseConfigController.GetVersionString()),
      (n.i_error_code = o),
      (n.s_cpu_info = ModelManager_1.ModelManager.LoginModel.CpuInfo()),
      (n.s_device_info = ModelManager_1.ModelManager.LoginModel.DeviceInfo()),
      (n.s_driver_date = ModelManager_1.ModelManager.LoginModel.DriverDate()),
      HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk() &&
        (n.s_device_id = UE.KuroSDKManager.GetBasicInfo().DeviceId),
      (n.s_command_line = cpp_1.KuroApplication.GetCommandLine()),
      LogReportController_1.LogReportController.LogReport(n),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Login",
          8,
          "上报登录埋点",
          ["loginStep", LoginDefine_1.ELoginStatus[e]],
          ["code", o],
        );
  }
  static DevLoginWithEditorConfig() {
    PublicUtil_1.PublicUtil.SetIsSilentLogin(!0),
      UiBlueprintFunctionLibrary_1.default.SetTempLocation(
        UiBlueprintFunctionLibrary_1.default.TestSceneLoadBornLocation(),
      ),
      UiBlueprintFunctionLibrary_1.default.TestSceneLogin("AkiWorld_WP");
  }
  static DoPreLogin() {
    this.ACc();
    var e = UE.KuroLauncherLibrary.GameSavedDir() + "Logs/Tmp",
      o = UE.KuroStaticLibrary.FindFilesSorted(e, "*"),
      r = o.Num();
    for (let e = 0; e < r; e++) {
      var n = o.Get(e);
      this.RLc.push(n);
    }
    0 < this.RLc.length && this.ALc(), this.wLc();
  }
  static PLc(_, g, l) {
    const L = (e, o, r, n, t) => {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Game",
          30,
          "Aliyun",
          ["result", e],
          ["localErrorCode", o],
          ["remoteErrorCode", r],
          ["httpResponseCode", n],
          ["connectedSuccess", t],
        );
      var i = UE.KuroLauncherLibrary.GameSavedDir() + "Logs/Tmp";
      let a = ModelManager_1.ModelManager.LoginModel.CurrentIdStr;
      0 === o
        ? ((a = e),
          (ModelManager_1.ModelManager.LoginModel.CurrentIdStr = e),
          l && this.B01(i + "/" + g))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Game",
              30,
              "RptFailed",
              ["localErrorCode", o],
              ["remoteErrorCode", r],
              ["httpResponseCode", n],
              ["connectedSuccess", t],
              ["data", _],
              ["result", e],
            ),
          !l &&
            this.DLc + this.RLc.length < 100 &&
            (UE.BlueprintPathsLibrary.DirectoryExists(i) ||
              UE.KuroLauncherLibrary.MakeDirectory(i),
            (o = i + "/" + g),
            (r = UE.KuroStaticLibrary.Base64Encode(_)),
            UE.KuroStaticLibrary.WriteStringToFile(r, o, !0, !1),
            this.DLc++)),
        this.IO_(a),
        (0, puerts_1.releaseManualReleaseDelegate)(L);
    };
    UE.KuroHttp.PostRpt(
      _,
      PublicUtil_1.PublicUtil.GetIfGlobalSdk(),
      (0, puerts_1.toManualReleaseDelegate)(L),
      10,
    );
  }
  static ALc() {
    var e,
      o,
      r,
      n = this.RLc.shift();
    n &&
      ((e = UE.KuroLauncherLibrary.GameSavedDir() + "Logs/Tmp"),
      (o = (0, puerts_1.$ref)("")),
      (e = e + "/" + n),
      UE.KuroStaticLibrary.LoadFileToString(o, e),
      (o = (0, puerts_1.$unref)(o)),
      "" === (r = UE.KuroStaticLibrary.Base64Decode(o))
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Game",
              30,
              "Aliyun",
              ["path", n],
              ["rawData", o],
              ["base64Data", r],
            ),
          this.B01(e))
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Game",
              30,
              "Aliyun",
              ["path", n],
              ["rawData", o],
              ["base64Data", r],
            ),
          this.PLc(r, n, !0)));
  }
  static B01(e) {
    UE.KuroStaticLibrary.DeleteFile(e) && this.DLc--, this.ALc();
  }
  static Au1(e, o, r) {
    if (e < r && o < r) return [e, o];
    var n = Math.max(e, o);
    let t = 2;
    for (; n / t >= r; ) t *= 2;
    return [Math.floor(e / t), Math.floor(o / t)];
  }
  static IO_(n) {
    if (this.ULc !== n) {
      const t = (e, o, r) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Game",
            30,
            "Aliyun",
            ["success", e],
            ["code", o],
            ["result", r],
          ),
          this.lJl(r, n),
          (0, puerts_1.releaseManualReleaseDelegate)(t);
      };
      var e = UE.NewMap(UE.BuiltinString, UE.BuiltinString),
        o =
          (e.Add("Action", "CreateWmBaseImage"),
          e.Add("WmType", "PureAppInvisible"),
          e.Add("WmInfoSize", "32"),
          e.Add("Scale", "2"),
          UiLayer_1.UiLayer.UiRootItem
            ? Math.floor(UiLayer_1.UiLayer.UiRootItem.GetWidth())
            : 1024),
        r = UiLayer_1.UiLayer.UiRootItem
          ? Math.floor(UiLayer_1.UiLayer.UiRootItem.GetHeight())
          : 1024,
        [o, r] = this.Au1(o, r, 1e4);
      e.Add("Width", o.toString()),
        e.Add("Height", r.toString()),
        e.Add("Opacity", "7"),
        e.Add("WmInfoUint", n),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Game",
            30,
            "SetPlayerId",
            ["width", o],
            ["height", r],
            ["idString", n],
          ),
        UE.KuroHttp.PostAli(e, (0, puerts_1.toManualReleaseDelegate)(t), 10);
    }
  }
  static lJl(e, n) {
    e = Json_1.Json.Parse(e);
    if (e && e.Data) {
      e = e.Data.ImageUrl;
      if (e) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 30, "Aliyun", ["imageUrl", e]),
          this.Aa1 && (this.Aa1.Cancel(), (this.Aa1 = void 0));
        var o = ModelManager_1.ModelManager.LoginModel.GetWaterMarkPath();
        UE.BlueprintPathsLibrary.FileExists(o) &&
          UE.KuroLauncherLibrary.DeleteFile(o);
        let r = new UE.DownloaderProxy();
        const i = (e, o) => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Game",
              30,
              "Aliyun",
              ["state", e],
              ["httpState", o],
              ["savedSize", r?.GetSavedSize()],
            ),
            (0, puerts_1.releaseManualReleaseDelegate)(i),
            (r = void 0),
            (this.Aa1 = void 0),
            (this.ULc = n),
            UiManager_1.UiManager.IsViewOpen("MView")
              ? EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MReady)
              : UiManager_1.UiManager.OpenView("MView"),
            !UiManager_1.UiManager.IsViewOpen("BcView") &&
              BaseConfigController_1.BaseConfigController.GetRptIsOpen() &&
              UiManager_1.UiManager.OpenView("BcView");
        };
        r.SetCompleteCallback((0, puerts_1.toManualReleaseDelegate)(i));
        var t = ".tmp" + this.Pa1;
        r.Start(e, o, t, BigInt(0), -1, !0, !1, "", 100, !0),
          (this.Aa1 = r),
          this.Pa1++;
      }
    }
  }
  static BLc() {
    if (Info_1.Info.IsAndroidPlatform()) {
      var e = UE.KuroStaticAndroidLibrary.GetCustomChannel(),
        e =
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Game", 30, "GetId", ["info", e]),
          e.split("|"));
      if (1 < e.length) return e[1];
    }
    return Info_1.Info.IsWindowsPlatform() &&
      !cpp_1.KuroApplication.IsWithEditor()
      ? this.kLc()
      : cpp_1.KuroApplication.IsWithEditor()
        ? cpp_1.KuroApplication.GetSessionCachedUserName()
        : cpp_1.KuroApplication.IniPlatformNameIncludeEditor();
  }
  static kLc() {
    let e = "Default";
    var o,
      r,
      n =
        UE.KismetSystemLibrary.GetProjectContentDirectory() +
        "Aki/Cursor/CursorData";
    return UE.BlueprintPathsLibrary.FileExists(n)
      ? ((o = (0, puerts_1.$ref)(void 0)),
        UE.KuroStaticLibrary.LoadFileToArray(n, o)
          ? ((n = UE.KuroStaticLibrary.ArrayToBuffer(o)),
            (o = new Uint8Array(n)),
            (o = (n = new DataView(o.buffer)).getUint32(0, !0)),
            (r = n.getBigUint64(4, !0)),
            (n = n.getUint32(12, !0)),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Game",
                30,
                "Aliyun",
                ["readValue0", o],
                ["readValue1", r],
                ["readValue2", n],
              ),
            (e = 3 !== n ? n.toString() : e))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Game", 30, "GetId LoadFileToArray failed"),
            "Load Failed"))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 30, "GetId file not exist"),
        "Not Exist");
  }
  static vMi() {
    var e = ModelManager_1.ModelManager.LoginModel,
      o =
        ((e.PublicJsonVersion = Number(
          BaseConfigController_1.BaseConfigController.GetConfigVersion(
            "PublicJsonVersion",
          ),
        )),
        (e.PublicMiscVersion = Number(
          BaseConfigController_1.BaseConfigController.GetConfigVersion(
            "MiscVersion",
          ),
        )),
        (e.PublicUniverseEditorVersion = Number(
          BaseConfigController_1.BaseConfigController.GetConfigVersion(
            "UniverseEditorVersion",
          ),
        )),
        UE.KuroLauncherLibrary.GetAppVersion());
    (e.LauncherVersion = LocalStorage_1.LocalStorage.GetDeviceSaved(
      LocalStorageDefine_1.ELocalStorageDeviceKey.LauncherPatchVersion,
      o,
    )),
      (e.LauncherVersion = e.LauncherVersion?.length ? e.LauncherVersion : o),
      (e.ResourceVersion = LocalStorage_1.LocalStorage.GetDeviceSaved(
        LocalStorageDefine_1.ELocalStorageDeviceKey.PatchVersion,
        o,
      )),
      (e.ResourceVersion = e.ResourceVersion?.length ? e.ResourceVersion : o);
  }
  static bMi() {
    return !GlobalData_1.GlobalData.IsPlayInEditor;
  }
  static moa() {
    var e;
    this.bMi() &&
      ((e = ModelManager_1.ModelManager.LoginModel).VerifyConfigVersionHandle &&
        (TimerSystem_1.TimerSystem.Remove(e.VerifyConfigVersionHandle),
        (e.VerifyConfigVersionHandle = void 0)),
      (e.VerifyConfigVersionHandle = TimerSystem_1.TimerSystem.Forever(
        LoginController.doa,
        VERIFY_CONFIG_VERSION_INTERVAL,
      )));
  }
  static coa() {
    var e;
    this.bMi() &&
      (e = ModelManager_1.ModelManager.LoginModel).VerifyConfigVersionHandle &&
      (TimerSystem_1.TimerSystem.Remove(e.VerifyConfigVersionHandle),
      (e.VerifyConfigVersionHandle = void 0));
  }
  static wfa() {
    var e;
    ModelManager_1.ModelManager.LoginModel.SdkAccountChangeNeedExitFlag &&
      ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed &&
      ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(38)).SetCloseFunction(
        () => {
          ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
            ReconnectDefine_1.ELogoutReason.SdkLogoutAccount,
          );
        },
      ),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
        e,
      ));
  }
  static ACc() {
    PreDownloadManager_1.PreDownloadManager.Get().CheckEnabledWithTick();
  }
}
(exports.LoginController = LoginController),
  ((_a = LoginController).Vza = void 0),
  (LoginController.rhh = void 0),
  (LoginController.SMi = (e) => {
    cpp_1.FuncOpenLibrary.SetFirstTimestamp(0),
      (ModelManager_1.ModelManager.LoginModel.LoginTimeStamp = 0),
      e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 8, "收到登出通知, 但没有登出原因!")
        : UiManager_1.UiManager.IsInited
          ? LoginController.yMi(e)
          : (ModelManager_1.ModelManager.LoginModel.LogoutNotify = e);
  }),
  (LoginController.pla = (e) => {
    ControllerHolder_1.ControllerHolder.ReConnectController.CreateBackToGameData(
      2,
    ),
      ControllerHolder_1.ControllerHolder.ReConnectController.TryBackToGame();
  }),
  (LoginController.Y3a = (e) => {
    CombatLog_1.CombatLog.Error(
      "Buff",
      0,
      "客户端和服务端战斗配置不一致，请更到对应服务器ChangeList",
      ["ChangeList", e.AUs],
    );
  }),
  (LoginController.Is1 = (e) => {
    ModelManager_1.ModelManager.QuestResourceModel.IsSeparateVideo &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("QuestResource", 38, "添加资源检查"),
      ModelManager_1.ModelManager.QuestResourceModel.FillCheckQuests(e.a2s));
  }),
  (LoginController.Wvi = () => {
    ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(2);
  }),
  (LoginController.Hza = () => {
    Platform_1.Platform.IsPs5Platform() &&
      !PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().IsPlatformNetworkReachable() &&
      (TimerSystem_1.TimerSystem.Remove(_a.Vza),
      (_a.Vza = void 0),
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
        ReconnectDefine_1.ELogoutReason.PsnUnAvailable,
      )),
      ModelManager_1.ModelManager.LoginModel.SdkAccessTokenCountingState &&
        ((ModelManager_1.ModelManager.LoginModel.SdkAccessTokenRunTime +=
          PSN_TICK_INTERVAL),
        ModelManager_1.ModelManager.LoginModel.SdkAccessTokenRunTime >=
          RENWE_ACCESS_TOKEN_INTERVAL) &&
        ((ModelManager_1.ModelManager.LoginModel.SdkAccessTokenRunTime = 0),
        _a.WQ_());
  }),
  (LoginController.ohh = () => {
    var e = ModelManager_1.ModelManager.LoginModel,
      o = e.LoginTimeStamp;
    o <= 0 ||
      (e = e.HealthTipTime) <= 0 ||
      (e <= (e = TimeUtil_1.TimeUtil.GetServerTime()) - o &&
        (ModelManager_1.ModelManager.MarqueeModel.PeekMarqueeData()
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Marquee", 43, "跑马灯被占用，健康提示跑马灯被延后")
          : (TimerSystem_1.TimerSystem.Remove(_a.rhh),
            (_a.rhh = void 0),
            ((o = new MarqueeModel_1.MarqueeData()).Id = "HealthTip"),
            (o.BeginTime = e),
            (o.EndTime = e + 60),
            (o.ScrollInterval = 20),
            (o.ScrollTimes = 2),
            (o.LocalTextKey = "HealthyTips_text"),
            (o.UseLocalTextKey = !0),
            (o.IsClientMarquee = !0),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Marquee", 43, "添加健康提示跑马灯"),
            MarqueeController_1.MarqueeController.AddClientMarqueeData(o))));
  }),
  (LoginController.MMi = () => {
    ModelManager_1.ModelManager.LoginModel.GetAutoOpenLoginView() &&
      (ModelManager_1.ModelManager.LoginModel.SetAutoOpenLoginView(!1),
      LoginController.OpenLoginView()),
      ModelManager_1.ModelManager.LoginModel.LogoutNotify &&
        LoginController.yMi(
          ModelManager_1.ModelManager.LoginModel.LogoutNotify,
        ),
      ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction &&
        (ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction(),
        (ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction =
          void 0));
  }),
  (LoginController.EMi = () => {
    Net_1.Net.Send(114, Protocol_1.Aki.Protocol.Dss.create()),
      LanguageUpdateManager_1.LanguageUpdateManager.StopAllDownload();
  }),
  (LoginController.GetHttp = (e = !1, o = !0) => {
    LoginController.GetHttpAsync(e, o);
  }),
  (LoginController.GetHttpAsync = async (e = !1, o = !0) => {
    if (
      (ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo(),
      !ModelManager_1.ModelManager.LoginModel.IsThisTimeCanLogin())
    )
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "LoginFailTooManyTimes",
        ),
        !1
      );
    if (
      !ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
        LoginDefine_1.ELoginStatus.Init,
      )
    )
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Login", 8, "正在登录中, 请勿重复操作！"),
        !1
      );
    Heartbeat_1.Heartbeat.StopHeartBeat(
      HeartbeatDefine_1.EStopHeartbeat.BeforeGetToken,
    ),
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.LoginHttp,
      ),
      o &&
        (CloudGameManager_1.CloudGameManager.IsCloudGame
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("CloudGame", 58, "云游戏设置LoginTraceId", [
                "trace",
                CloudGameManager_1.CloudGameManager.CloudGameTraceId,
              ]),
            (ModelManager_1.ModelManager.LoginModel.LoginTraceId =
              CloudGameManager_1.CloudGameManager.CloudGameTraceId))
          : (ModelManager_1.ModelManager.LoginModel.LoginTraceId =
              UE.KismetGuidLibrary.NewGuid().ToString()));
    let r = "";
    try {
      r = _a.IsGlobalSdkLoginMode()
        ? LoginController.DMi()
        : LoginController.TMi();
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "Login",
            16,
            "LoginProcedure-Http-登录Http请求 异常。",
            e,
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Login",
            16,
            "LoginProcedure-Http-登录Http请求 异常。",
            ["error", e],
          );
    }
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Login", 16, "LoginProcedure-Http-登录Http请求 Debug", [
        "http",
        r,
      ]),
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginHttp),
      CrashCollectionController_1.CrashCollectionController.RecordHttpInfo(r),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 16, "LoginProcedure-Http-登录Http请求");
    var n = await Http_1.Http.GetAsync(r, void 0),
      n = await LoginController.ConnectServer(n.Code, n.Data, e),
      t = n.Success,
      n = n.HttpResult;
    if (
      !t &&
      n &&
      n.code === Protocol_1.Aki.Protocol.Q4n.Proto_NoHealthyGateway &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          43,
          "LoginProcedure-Http-重连Http请求",
          ["http", r],
          ["clientWaitingMode", n.clientWaitingMode],
          ["clientWaitingTime", n.clientWaitingTime],
          ["clientAutoInInterval", n.clientAutoInInterval],
        ),
      await LoginController.GMi(
        n.clientWaitingMode,
        n.clientWaitingTime,
        n.clientAutoInInterval,
      ))
    )
      return LoginController.GetHttpAsync(e, o);
    return !0;
  }),
  (LoginController.LMi = () => {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByTextId(
      "HttpTimeout",
    ),
      ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.Init,
      ),
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.LoginHttpRet,
        Protocol_1.Aki.Protocol.Q4n.Proto_HttpTimeout,
      );
  }),
  (LoginController.AMi = (e) => {
    e instanceof Error
      ? Log_1.Log.CheckError() &&
        Log_1.Log.ErrorWithStack("Login", 8, "登录异常发生异常", e, [
          "error",
          e.message,
        ])
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Login", 8, "登录异常发生异常", ["error", e ?? void 0]);
  }),
  (LoginController.OnSdkLogin = (e) => {
    ControllerHolder_1.ControllerHolder.LoginController.LogLoginProcessLink(
      LoginDefine_1.ELoginStatus.SDKLoginAfter,
    ),
      e.LoginCode >= LoginDefine_1.ESdkLoginCode.LoginSuccess
        ? (ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(1),
          HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
            HotPatchLogReport_1.LoginLogEventDefine.SdkLogin,
            "sdk_login_success",
          ),
          ModelManager_1.ModelManager.LoginModel.SetSdkLoginConfig(
            e.Uid,
            e.UserName,
            e.Token,
          ),
          ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfo(e.Uid),
          LoginController.LogLoginProcessLink(
            LoginDefine_1.ELoginStatus.SdkLoginSuccecc,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              16,
              "LoginProcedure-OnSdkLogin-SDK登录成功",
            ),
          ModelManager_1.ModelManager.LoginModel.SdkAccountChangeNeedExitFlag &&
            LoginController.wfa())
        : (ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0),
          HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
            HotPatchLogReport_1.LoginLogEventDefine.SdkLogin,
            "sdk_login_failed",
          ),
          LoginController.LogLoginProcessLink(
            LoginDefine_1.ELoginStatus.SdkLoginFail,
          ),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Login",
              16,
              "LoginProcedure-OnSdkLogin-SDK登录失败",
            )),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkLoginResult);
  }),
  (LoginController.QQ_ = 0),
  (LoginController.WQ_ = () => {
    var e = new Date().getTime() * TimeUtil_1.TimeUtil.Millisecond;
    0 !== _a.QQ_ && e - _a.QQ_ < RENWE_ACCESS_TOKEN_CD
      ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("KuroSdk", 43, "续签过于频繁")
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "KuroSdk",
            43,
            "触发续签定时器",
            ["Last", _a.QQ_],
            ["now", e],
          ),
        (_a.QQ_ = e),
        _a.zAa());
  }),
  (LoginController.zAa = () => {
    var e = ModelManager_1.ModelManager.LoginModel.SdkAccessToken;
    "" === e
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("KuroSdk", 43, "续签失败，token为空")
      : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("KuroSdk", 43, "发起续签"),
        PlatformSdkServer_1.PlatformSdkServer.RenewAccessToken(e, (e, o, r) => {
          r ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Login",
                16,
                "PlatformSdkServer.RenewAccessToken fail",
                ["msg", e],
                ["needReLogin", o],
              ),
            o &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("KuroSdk", 43, "移除续签定时器"),
              (ModelManager_1.ModelManager.LoginModel.SdkAccessTokenCountingState =
                !1),
              (ModelManager_1.ModelManager.LoginModel.SdkAccessToken = ""),
              _a.cPa(e, o)));
        }));
  }),
  (LoginController.OnLogoutAccount = () => {
    var e = ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn();
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0),
      ModelManager_1.ModelManager.LoginModel.GetLoginStatus() >=
        LoginDefine_1.ELoginStatus.EnterGameRet && e
        ? ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
            ReconnectDefine_1.ELogoutReason.SdkLogoutAccount,
          )
        : (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SdkLoginResult,
          ),
          HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
            HotPatchLogReport_1.LoginLogEventDefine.SdkLogin,
            "sdk_login_logout",
          ));
  }),
  (LoginController.NMi = () => {
    ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(5);
  }),
  (LoginController.HMi = (e, o, r) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Login", 8, "获取登录公告返回", ["data", r]),
      200 === o && (o = Json_1.Json.Parse(r))
        ? ((r = new LoginModel_1.LoginNotice()).Phrase(o),
          !PublicUtil_1.PublicUtil.IsInIpWhiteList(r.WhiteLists) ||
            (o = new Date().getTime() * TimeUtil_1.TimeUtil.Millisecond) <
              r.BeginTime ||
            o > r.EndTime ||
            LoginController.WMi(r))
        : _a.jMi();
  }),
  (LoginController.ULc = ""),
  (LoginController.RLc = []),
  (LoginController.DLc = 0),
  (LoginController.Pa1 = 0),
  (LoginController.Aa1 = void 0),
  (LoginController.LLc = void 0),
  (LoginController.wLc = () => {
    if (BaseConfigController_1.BaseConfigController.GetRptIsOpen()) {
      let e = ModelManager_1.ModelManager.LoginModel.CurrentIdStr;
      "" === (e = "" === e ? _a.BLc() : e) &&
        (e =
          BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
            "BuildId",
            "",
          )),
        (ModelManager_1.ModelManager.LoginModel.CurrentIdStr = e);
      var o = new RptInfo(),
        r =
          ((o.Pid = _a.BLc()),
          (o.Bid =
            BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
              "BuildId",
              "",
            )),
          ModelManager_1.ModelManager.LoginModel),
        r =
          ((o.Uid = r.GetLoginUid()),
          (o.PlayerId =
            ModelManager_1.ModelManager.PlayerInfoModel?.GetId()?.toString() ??
            ""),
          (o.Mac = UE.KuroStaticLibrary.GetMacAddress()),
          (o.IpLocal = PublicUtil_1.PublicUtil.GetLocalHost()),
          (o.IpServer =
            ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerIp() ??
            "NoIpServer"),
          (o.Cpu = UE.KuroStaticLibrary.GetDeviceCPU()),
          UE.KuroStaticLibrary.GetProcessorId()),
        r =
          ("" !== r && (o.Cpu += `-${r})`),
          (o.Motherboard = Info_1.Info.IsWindowsPlatform()
            ? UE.KuroStaticLibrary.GetBaseBoardInfo()
            : cpp_1.FCrashSightProxy.GetSdkDeviceId()),
          (o.Gpu = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName()),
          ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
            ? (o.DeviceId = UE.KuroSDKManager.GetBasicInfo()?.DeviceId ?? "")
            : (o.DeviceId = UE.KuroStaticLibrary.GetVendorInfo()),
          Info_1.Info.IsWindowsPlatform() &&
            ((o.DiskNo = UE.KuroStaticLibrary.GetDiskSerialNo()),
            (o.SysUUID = UE.KuroStaticLibrary.GetSysUUID())),
          Json_1.Json.Stringify(o)),
        o = Math.floor(TimeUtil_1.TimeUtil.GetServerTimeStamp());
      _a.PLc(r, o + ".txt", !1);
    }
  }),
  (LoginController.doa = () => {
    var e = ModelManager_1.ModelManager.LoginModel,
      o = Protocol_1.Aki.Protocol.Roa.create();
    (o.Y9n = UE.KuroLauncherLibrary.GetAppVersion()),
      (o.J9n = e.LauncherVersion),
      (o.z9n = e.ResourceVersion),
      Net_1.Net.Send(116, o);
  }),
  (LoginController.JDe = () => {
    LoginController.wfa();
  }),
  (LoginController.k5a = () => {
    ModelManager_1.ModelManager.LoginModel.HasBackToGameData() &&
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Login",
          8,
          "新sdk登录成功，并且有返回登录界面信息，直接进入游戏",
        ),
      _a.F5a(),
      _a.wLc());
  }),
  (LoginController.bnl = () => {
    _a.zAa();
  });
//# sourceMappingURL=LoginController.js.map
