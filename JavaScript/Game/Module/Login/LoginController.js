"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.LoginController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Json_1 = require("../../../Core/Common/Json");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const NetDefine_1 = require("../../../Core/Define/Net/NetDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Http_1 = require("../../../Core/Http/Http");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const HotPatchLogReport_1 = require("../../../Launcher/HotPatchLogReport");
const HotFixSceneManager_1 = require("../../../Launcher/Ui/HotFix/HotFixSceneManager");
const LanguageUpdateManager_1 = require("../../../Launcher/Update/LanguageUpdateManager");
const LauncherStorageLib_1 = require("../../../Launcher/Util/LauncherStorageLib");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const PackageConfigUtil_1 = require("../../Common/PackageConfigUtil");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const CrashCollectionController_1 = require("../../CrashCollection/CrashCollectionController");
const GameUtils_1 = require("../../GameUtils");
const GlobalData_1 = require("../../GlobalData");
const KuroPushController_1 = require("../../KuroPushSdk/KuroPushController");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const BlackScreenController_1 = require("../BlackScreen/BlackScreenController");
const UiBlueprintFunctionLibrary_1 = require("../BpBridge/UiBlueprintFunctionLibrary");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const CursorController_1 = require("../Cursor/CursorController");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const PlatformController_1 = require("../Platform/PlatformController");
const ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const UiLoginSceneManager_1 = require("../UiComponent/UiLoginSceneManager");
const LoginDefine_1 = require("./Data/LoginDefine");
const Heartbeat_1 = require("./Heartbeat");
const HeartbeatDefine_1 = require("./HeartbeatDefine");
const LoginModel_1 = require("./LoginModel");
const VERIFY_CONFIG_VERSION_INTERVAL = 90000;
class HttpResult extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.token = "";
    this.host = "";
    this.port = 0;
    this.userData = 0;
    this.errMessage = "";
    this.sex = 0;
  }
}
class LoginController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    let e = new Array();
    e.push(111);
    e.push(107);
    e.push(114);
    Net_1.Net.InitReConnectMessage(e);
    (e = new Array()).push(111);
    e.push(103);
    e.push(21988);
    e.push(101);
    e.push(105);
    e.push(107);
    Net_1.Net.InitCanTimerOutMessage(e);
    AudioSystem_1.AudioSystem.SetRtpcValue("time_local", new Date().getHours());
    this.vvi();
    LogAnalyzer_1.LogAnalyzer.SetP4Version(
      LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
        LauncherStorageLib_1.ELauncherStorageGlobalKey.PatchP4Version,
      ),
    );
    if (Log_1.Log.CheckInfo()) {
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
      );
    }
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UiManagerInit,
      LoginController.Mvi,
    );
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ExitGamePush,
      LoginController.Svi,
    );
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      LoginController.Wpi,
    );
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TimeValidError,
      LoginController.i9s,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UiManagerInit,
      LoginController.Mvi,
    );
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ExitGamePush,
      LoginController.Svi,
    );
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      LoginController.Wpi,
    );
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TimeValidError,
      LoginController.i9s,
    );
    this.m9s();
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(110, LoginController.Evi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(110);
  }
  static yvi(o) {
    Heartbeat_1.Heartbeat.StopHeartBeat(
      HeartbeatDefine_1.EStopHeartbeat.LogoutNotify,
    );
    Net_1.Net.Disconnect(0);
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
      LoginDefine_1.ELoginStatus.Init,
    );
    if (o.Kms === Protocol_1.Aki.Protocol.lkn.Proto_AccountIsBlocked) {
      var e;
      if (o.gAs === 1) {
        r =
          ConfigManager_1.ConfigManager.ReportConfig?.GetBanInfoByTypeAndReason(
            2,
            o.fAs.V5n,
          );
        n =
          MathUtils_1.MathUtils.LongToNumber(o.fAs.lfs) -
          TimeUtil_1.TimeUtil.GetServerTime();
        e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(161);
        if ((n = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(n))) {
          r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            r.BanDescribe,
          );
          e.SetTextArgs(r, n.CountDownText ?? "");
        }
        e.FunctionMap.set(1, () => {
          ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
            ReconnectDefine_1.ELogoutReason.LogoutNotify,
          );
        });
        e.FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
            0,
          );
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        );
      }
    } else {
      var r = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
        o.Kms,
      );
      let e = 10;
      if (
        o.Kms ===
        Protocol_1.Aki.Protocol.lkn.Proto_ErrCheckClientVersionNeedUpdate
      ) {
        e = 185;
      }
      var n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
      n.SetTextArgs(r);
      n.FunctionMap.set(1, () => {
        ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
          ReconnectDefine_1.ELogoutReason.LogoutNotify,
        );
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
        n,
      );
    }
    ModelManager_1.ModelManager.LoginModel.LogoutNotify = undefined;
  }
  static OpenLoginView() {
    if (!ModelManager_1.ModelManager.KuroSdkModel.ReportedInitState) {
      KuroSdkReport_1.KuroSdkReport.Report(
        new KuroSdkReport_1.SdkReportGameInitFinish(undefined),
      );
      ModelManager_1.ModelManager.KuroSdkModel.ReportedInitState = true;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info(
        "Login",
        17,
        "LoginProcedure-OpenLoginView-更换PlayerController，初始化登录场景",
      );
    }
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
      LoginDefine_1.ELoginStatus.Init,
    );
    var e = UE.GameplayStatics.GetPlayerController(
      GlobalData_1.GlobalData.World,
      0,
    ).GetViewTarget();
    var o = e.K2_GetActorLocation();
    var r = e.K2_GetActorRotation();
    var n = e.CameraComponent.FieldOfView;
    if (
      e !== undefined &&
      n !== undefined &&
      (e =
        CameraController_1.CameraController.WidgetCamera.DisplayComponent
          .CineCamera) !== undefined
    ) {
      e.CameraComponent.SetFieldOfView(n);
      e.K2_SetActorLocationAndRotation(o, r, false, undefined, true);
      e.GetCineCameraComponent().SetFilmbackPresetByName("16:9 DSLR");
    }
    UE.GameplayStatics.GetGameMode(
      GlobalData_1.GlobalData.World,
    ).ChangePlayerController(UE.BP_StartupPlayerController_C.StaticClass());
    CursorController_1.CursorController.InitMouseByMousePos();
    HotFixSceneManager_1.HotFixSceneManager.SetViewTarget(
      GlobalData_1.GlobalData.World,
    );
    UiLoginSceneManager_1.UiLoginSceneManager.InitCinematicTick();
    UiLoginSceneManager_1.UiLoginSceneManager.InitRoleObservers();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info(
        "Login",
        17,
        "LoginProcedure-OpenLoginView-加载进入登录的镜头",
      );
    }
    UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
      "LevelSequence_Back",
      () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info(
            "Login",
            17,
            "LoginProcedure-OpenLoginView-播放镜头结束，显示登录UI",
          );
        }
        LoginController.Ivi();
        UiLoginSceneManager_1.UiLoginSceneManager.PlayLoginLoopSequence();
      },
      false,
      () => {
        CameraController_1.CameraController.EnterCameraMode(2, 0.1);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info(
            "Login",
            17,
            "LoginProcedure-OpenLoginView-播放进入登录的镜头(拉远)",
          );
        }
      },
    );
  }
  static CreateCharacterViewToLoginView() {
    if (UiManager_1.UiManager.IsViewOpen("CreateCharacterView")) {
      UiManager_1.UiManager.CloseView("CreateCharacterView");
    }
    BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
      "Start",
      "CreateCharacterViewToLoginView",
    ).then(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info(
          "Login",
          17,
          "CreateCharacterViewToLoginView - 播放镜头结束，显示登录UI",
        );
      }
      LoginController.Ivi();
      UiLoginSceneManager_1.UiLoginSceneManager.PlayLoginLoopSequence();
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
        "Close",
        "CreateCharacterViewToLoginView",
      );
    });
  }
  static Tvi() {
    return "http://localhost:3000/api/login";
    var e = ModelManager_1.ModelManager.LoginModel.GetAccount();
    var o = ModelManager_1.ModelManager.LoginModel.GetServerIp();
    var r = ModelManager_1.ModelManager.LoginModel.TryGetRealServerPort();
    var n = ModelManager_1.ModelManager.LoginModel.SetRpcHttp(
      LoginController.Lvi,
      13000,
    );
    var e = encodeURIComponent(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 11, "尝试登陆目标IP", ["IP", o], ["Port", r]);
    }
    if (!ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 17, "LoginProcedure-Http-非SDK环境");
      }
      const _ = o.startsWith("http") ? o : `http://${o}:${r}`;
      return `${_}/api/login?loginType=0&userId=${e}&userName=${e}&token=1&userData=${n}&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}`;
    }
    o = BaseConfigController_1.BaseConfigController.GetLoginServers();
    if (!o || o.length === 0) {
      e = PackageConfigUtil_1.PackageConfigUtil.GetPackageConfigOrDefault(
        LoginModel_1.STREAM,
      );
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 11, "LoginServers获取失败, 检查CDN是否正常", [
          "stream",
          e,
        ]);
      }
      return "";
    }
    if (
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
    ) {
      return this.Dvi();
    }
    e = Number(
      BaseConfigController_1.BaseConfigController.GetPublicValue(
        "DefaultIpIndex",
      ) !== ""
        ? BaseConfigController_1.BaseConfigController.GetPublicValue(
            "DefaultIpIndex",
          )
        : 0,
    );
    let i = 0;
    e = o[(i = o.length > e ? e : i)].ip;
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      t = PackageConfigUtil_1.PackageConfigUtil.GetPackageConfigOrDefault(
        LoginModel_1.STREAM,
      );
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 11, "sdkIp获取失败, 检查CDN是否正常", [
          "stream",
          t,
        ]);
      }
      return "";
    }
    ModelManager_1.ModelManager.LoginModel.SetServerName(o[i].name);
    ModelManager_1.ModelManager.LoginModel.SetServerId(
      o[i].id === undefined ? "0" : o[i].id,
    );
    var t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig();
    var o = t.Uid;
    var a = t.UserName;
    var t = t.Token;
    var g = UE.KuroStaticLibrary.HashStringWithSHA1(t);
    var l = UE.KuroSDKManager.GetBasicInfo()?.DeviceId ?? "0";
    const _ = e.startsWith("http") ? e : `http://${e}:${r}`;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info(
        "Login",
        17,
        "LoginProcedure-Http-SDK环境",
        ["uId", o],
        ["userName", a],
        ["token", g],
        ["userData", n],
        ["deviceId", l],
      );
    }
    return `${_}/api/login?loginType=1&userId=${o}&userName=${a}&token=${t}&userData=${n}&deviceId=${l}&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}`;
  }
  static Dvi() {
    return "http://localhost:3000/api/login";
    var e =
      ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData.ip;
    var o = ModelManager_1.ModelManager.LoginModel.SetRpcHttp(
      LoginController.Lvi,
      13000,
    );
    var r = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig();
    var n = r.Uid;
    var i = r.UserName;
    var r = r.Token;
    var t = UE.KuroStaticLibrary.HashStringWithSHA1(r);
    var a = UE.KuroSDKManager.GetBasicInfo()?.DeviceId ?? "0";
    var e = e.startsWith("http") ? e : `http://${e}:5500`;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info(
        "Login",
        17,
        "LoginProcedure-Http-GlobalSDK环境",
        ["uId", n],
        ["userName", i],
        ["token", t],
        ["userData", o],
        ["deviceId", a],
      );
    }
    return `${e}/api/login?loginType=1&userId=${n}&userName=${i}&token=${r}&userData=${o}&deviceId=${a}`;
  }
  static ConnectServer(e, o, r) {
    var n;
    var i = Json_1.Json.Parse(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error(
          "Login",
          9,
          "服务器返回http结果反序列化失败!",
          ["result", o],
          ["httpCode", e],
        );
      }
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.LoginHttpRet,
        Protocol_1.Aki.Protocol.lkn.Proto_HttpResultUndefine,
      );
    } else {
      GameUtils_1.GameUtils.CreateStat("Login-CleanRpcHttp");
      o = ModelManager_1.ModelManager.LoginModel.CleanRpcHttp(i.userData);
      n = UE.KuroStaticLibrary.HashStringWithSHA1(i.token);
      if (o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info(
            "Login",
            17,
            "LoginProcedure-Http-登录http请求返回",
            ["Token", n],
            ["Host", i.host],
            ["Port", i.port],
            ["Code", i.code],
            ["rpcId", i.userData],
            ["errMessage", i.errMessage],
            ["hasRpc", o],
            ["httpCode", e],
          );
        }
        if (LoginController.Rvi(i.code, i.errMessage)) {
          if (i.sex !== undefined) {
            ModelManager_1.ModelManager.LoginModel.SetPlayerSex(i.sex);
          }
          ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
            LoginDefine_1.ELoginStatus.LoginHttpRet,
          );
          LoginController.LogLoginProcessLink(
            LoginDefine_1.ELoginStatus.LoginHttpRet,
          );
          LoginController.Uvi(i.token, i.host, i.port, r).then((e) => {
            LoginController.DisConnect(e);
            if (e) {
              LoginController.d9s();
            }
          }, LoginController.Avi);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error(
              "Login",
              17,
              "http请求返回状态错误",
              ["Token", n],
              ["Host", i.host],
              ["Port", i.port],
              ["Code", i.code],
              ["rpcId", i.userData],
              ["errMessage", i.errMessage],
              ["hasRpc", o],
              ["httpCode", e],
            );
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error(
              "Login",
              17,
              "http请求返回状态错误",
              ["Token", n],
              ["Host", i.host],
              ["Port", i.port],
              ["Code", i.code],
              ["rpcId", i.userData],
              ["errMessage", i.errMessage],
              ["hasRpc", o],
              ["httpCode", e],
            );
          }
          ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
            LoginDefine_1.ELoginStatus.Init,
          );
          LoginController.LogLoginProcessLink(
            LoginDefine_1.ELoginStatus.LoginHttpRet,
            i.code,
          );
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error(
            "Login",
            9,
            "http请求返回超时",
            ["Token", n],
            ["Host", i.host],
            ["Port", i.port],
            ["Code", i.code],
            ["rpcId", i.userData],
            ["errMessage", i.errMessage],
            ["hasRpc", o],
            ["httpCode", e],
          );
        }
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.LoginHttpRet,
          Protocol_1.Aki.Protocol.lkn.Proto_HttpTimeout,
        );
      }
    }
  }
  static Rvi(e, o) {
    return (
      e === Protocol_1.Aki.Protocol.lkn.Sys ||
      (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
      (e !== Protocol_1.Aki.Protocol.lkn.Proto_ServerMaintenance &&
        !Protocol_1.Aki.Protocol.lkn.Proto_ServerNotOpen) ||
        (e === Protocol_1.Aki.Protocol.lkn.Proto_ServerMaintenance
          ? this.GetAndShowStopServerNotice()
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenLoginStatusCodeTipView(
              e,
            )),
      false)
    );
  }
  static async Uvi(e, o, r, n) {
    GameUtils_1.GameUtils.CreateStat("Login-ConnectGateWay");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info(
        "Login",
        17,
        "LoginProcedure-连接网关",
        ["token", e],
        ["host", o],
        ["port", r],
        ["isSmokeTest", n],
      );
    }
    let i = await LoginController.Pvi(e, o, r);
    if (!i) {
      return i;
    }
    GameUtils_1.GameUtils.CreateStat("Login-AskProtoKey");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 17, "LoginProcedure-请求密钥");
    }
    if (!(i = await LoginController.xvi())) {
      return i;
    }
    GameUtils_1.GameUtils.CreateStat("Login-LoginRequest");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 17, "LoginProcedure-LoginRequest");
    }
    if (!(i = await LoginController.wvi(e))) {
      return i;
    }
    if (ModelManager_1.ModelManager.LoginModel.GetHasCharacter()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 17, "LoginProcedure-已有角色, 跳过创角");
      }
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.EnterGameReq,
      );
      if (!(i = await LoginController.HandleLoginGame(n, true))) {
        return i;
      }
    } else {
      GameUtils_1.GameUtils.CreateStat("Login-CreateCharacterRequest");
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 17, "LoginProcedure-请求创角");
      }
      if (n) {
        o = await LoginController.CreateCharacterRequest();
        if (
          !(i = await LoginController.HandleLoginGame(
            n,
            o === Protocol_1.Aki.Protocol.lkn.Sys,
          ))
        ) {
          return i;
        }
      } else {
        if (LoginController.IsLoginViewOpen()) {
          LoginController.ExitLoginView();
        }
        UiManager_1.UiManager.OpenView("CreateCharacterView");
      }
    }
    return true;
  }
  static DisConnect(e) {
    if (e) {
      HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
        HotPatchLogReport_1.LoginLogEventDefine.EnterGame,
        "enter_game_success",
      );
    } else {
      Net_1.Net.Disconnect(2);
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.Init,
      );
      HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
        HotPatchLogReport_1.LoginLogEventDefine.EnterGame,
        "enter_game_failed",
      );
    }
  }
  static async HandleLoginGame(e, o) {
    var r = await LoginController.EnterGameAsync();
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info(
          "Login",
          11,
          "冒烟测试登录流程",
          ["登录结果", o],
          ["EnterGame结果", r],
        );
      }
      if (!r && !LoginController.IsLoginViewOpen()) {
        LoginController.Ivi();
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info(
          "Login",
          11,
          "正常登录流程",
          ["登录结果", o],
          ["EnterGame结果", r],
        );
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LoginRequestResult,
        r,
      );
    }
    return r;
  }
  static async Pvi(e, o, r) {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
      LoginDefine_1.ELoginStatus.ConvGate,
    );
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ConvGate);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 9, "登录网关", ["host", o], ["port", r]);
    }
    var n = await Net_1.Net.ConnectAsync(o, r, 3000, 3);
    if (n !== 0) {
      ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByTextId(
        "ConnectGateWayFail",
      );
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 31, "登录网关失败！", ["result", n]);
      }
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.ConvRet,
        Protocol_1.Aki.Protocol.lkn.Proto_ConvGateTimeout,
      );
      return false;
    } else {
      ModelManager_1.ModelManager.LoginModel.SetReconnectInfo(e, o, r);
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.ConvRet,
      );
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ConvRet);
      return true;
    }
  }
  static Bvi() {
    var e;
    if (UE.KuroStaticLibrary.IsModuleLoaded("KuroTDM")) {
      if (
        BaseConfigController_1.BaseConfigController.GetPublicValue(
          "SdkArea",
        ) !== "CN"
      ) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 28, "海外sdk不使用tdm");
        }
        return "";
      } else if ((e = UE.TDMStaticLibrary.GetDeviceInfo()).includes("Error")) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 28, "TDMStaticLibrary获取设备信息失败", [
            "tdm",
            e,
          ]);
        }
        return "";
      } else {
        return e;
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 28, "TDMStaticLibrary模块未加载");
      }
      return "";
    }
  }
  static async wvi(e) {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
      LoginDefine_1.ELoginStatus.LoginReq,
    );
    var o = new Protocol_1.Aki.Protocol.mis();
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      o.s6n = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid;
    } else {
      o.s6n = ModelManager_1.ModelManager.LoginModel.GetAccount();
    }
    o.a6n = e;
    this.vvi();
    o.h6n = UE.KuroLauncherLibrary.GetAppVersion();
    o.l6n = ModelManager_1.ModelManager.LoginModel.LauncherVersion;
    o._6n = ModelManager_1.ModelManager.LoginModel.ResourceVersion;
    o.u6n = PlatformController_1.PlatformController.PackageClientBasicInfo();
    o.c6n = new Protocol_1.Aki.Protocol.c6n();
    o.c6n.m6n = NetDefine_1.CONFIG_MD5_VALUE;
    o.c6n.d6n = NetDefine_1.CONFIG_VERSION;
    o.c6n.C6n = NetDefine_1.PROTO_MD5_VALUE;
    o.c6n.g6n = NetDefine_1.PROTO_SEED_MD5_VALUE;
    o.c6n.f6n = NetDefine_1.PROTO_VERSION;
    var r =
      BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
        "Stream",
      );
    o.c6n.p6n = r;
    o.J4s =
      await KuroPushController_1.KuroPushController.GetPushNotiPermissionEnableState();
    o.b6s = KuroPushController_1.KuroPushController.GetClientId();
    o.v6n = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? "";
    o.M6n = new Protocol_1.Aki.Protocol.M6n();
    let n = false;
    let i = false;
    if (ModelManager_1.ModelManager.PlatformModel.PlatformType === 2) {
      n = UE.KuroStaticAndroidLibrary.GetDeviceIsRooted();
      i = UE.KuroStaticAndroidLibrary.GetDeviceIsEmulator();
    } else if (ModelManager_1.ModelManager.PlatformModel.PlatformType === 1) {
      n = UE.KuroStaticiOSLibrary.GetDeviceJailbroken();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info(
        "Login",
        28,
        "获取ACE信息",
        ["ifRoot", n],
        ["ifSimulator", i],
      );
    }
    o.M6n.S6n = n;
    o.M6n.E6n = i;
    r = this.Bvi();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 28, "设备信息", ["tdm", r]);
    }
    o.M6n.y6n = r;
    if (LoginController.bvi()) {
      o.I6n = Protocol_1.Aki.Protocol.I6n.create();
      o.I6n.T6n = ModelManager_1.ModelManager.LoginModel.PublicJsonVersion;
      o.I6n.L6n = ModelManager_1.ModelManager.LoginModel.PublicMiscVersion;
      o.I6n.D6n =
        ModelManager_1.ModelManager.LoginModel.PublicUniverseEditorVersion;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info(
        "Login",
        17,
        "LoginProcedure-LoginRequest-请求登录",
        ["account", o.s6n],
        ["token", o.a6n],
        ["AppVersion", o.h6n],
        ["LauncherVersion", o.l6n],
        ["ResourceVersion", o._6n],
        ["ClientBasicInfo", o.u6n],
        ["ConfigMd5", NetDefine_1.CONFIG_MD5_VALUE],
        ["ConfigVersion", NetDefine_1.CONFIG_VERSION],
        ["ProtoMd5", NetDefine_1.PROTO_MD5_VALUE],
        ["ProtoSeedMd5", NetDefine_1.PROTO_SEED_MD5_VALUE],
        ["ProtoVersion", NetDefine_1.PROTO_VERSION],
      );
    }
    r = await LoginController.qvi(o);
    if (r?.Kms === Protocol_1.Aki.Protocol.lkn.Proto_ServerFullLoadGate) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info(
          "Login",
          17,
          "LoginProcedure-LoginRequest-ServerFullLoadGate",
        );
      }
      if (await LoginController.Gvi(r.o6n, r.n6n, r.cAs)) {
        return LoginController.wvi(e);
      } else {
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        );
        return false;
      }
    } else if (
      ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
        LoginDefine_1.ELoginStatus.LoginRet,
      )
    ) {
      if (UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView")) {
        await UiManager_1.UiManager.CloseViewAsync("LoginQueueTipsView");
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LoginSuccess,
        o.s6n,
      );
      Heartbeat_1.Heartbeat.BeginHeartBeat(
        HeartbeatDefine_1.EBeginHeartbeat.GetLoginResponse,
      );
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 17, "LoginProcedure-LoginRequest-登录成功");
      }
      return true;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn(
          "Login",
          9,
          "请求登录失败",
          ["account", o.s6n],
          ["token", o.a6n],
        );
      }
      return false;
    }
  }
  static async xvi() {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
      LoginDefine_1.ELoginStatus.ProtoKeyReq,
    );
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ProtoKeyReq);
    var e = new Protocol_1.Aki.Protocol.Eis();
    e.W4n = true;
    e.A6n = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? "";
    var e = await Net_1.Net.CallAsync(111, e, 3000);
    if (e) {
      Net_1.Net.SetDynamicProtoKey(e.Ikn, e.Ckn);
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.ProtoKeyRet,
      );
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.ProtoKeyRet,
      );
      return true;
    } else {
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.ProtoKeyRet,
        Protocol_1.Aki.Protocol.lkn.Proto_ProtoKeyTimeout,
      );
      return false;
    }
  }
  static async qvi(e, o = 0) {
    var r = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
    if (
      r !== LoginDefine_1.ELoginStatus.Init &&
      r !== LoginDefine_1.ELoginStatus.LoginRet
    ) {
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginReq);
      r = await Net_1.Net.CallAsync(103, e, 13000);
      if (r) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 17, "LoginProcedure-LoginRequest-Response", [
            "Code",
            r.Kms,
          ]);
        }
        ModelManager_1.ModelManager.LoginModel.Platform = r.U6n;
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Login", 10, "当前登录的游戏服务器节点：", [
            "response.Platform",
            r.U6n,
          ]);
        }
        if (r.Kms === Protocol_1.Aki.Protocol.lkn.Proto_LoginRetry) {
          LoginController.LogLoginProcessLink(
            LoginDefine_1.ELoginStatus.LoginRet,
            r.Kms,
          );
          if (o >= 5) {
            return r;
          } else {
            return await LoginController.qvi(e, o + 1);
          }
        } else {
          if (
            r.Kms === Protocol_1.Aki.Protocol.lkn.Proto_AppVersionNotMatch ||
            r.Kms ===
              Protocol_1.Aki.Protocol.lkn.Proto_LauncherVersionIsTooLow ||
            r.Kms === Protocol_1.Aki.Protocol.lkn.Proto_ResourceVersionIsTooLow
          ) {
            ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
              LoginDefine_1.ELoginStatus.Init,
            );
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(54)).FunctionMap.set(
              1,
              LoginController.Nvi,
            );
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            );
            LoginController.LogLoginProcessLink(
              LoginDefine_1.ELoginStatus.LoginRet,
              r.Kms,
            );
          } else {
            o = r.Kms === Protocol_1.Aki.Protocol.lkn.Proto_HaveNoCharacter;
            ModelManager_1.ModelManager.LoginModel.SetHasCharacter(!o);
            if (o || r.Kms === Protocol_1.Aki.Protocol.lkn.Sys) {
              TimeUtil_1.TimeUtil.SetServerTimeStamp(r.tDs);
              e = Number(MathUtils_1.MathUtils.LongToBigInt(r.tDs));
              cpp_1.FuncOpenLibrary.SetFirstTimestamp(e / 1000);
              ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                LoginDefine_1.ELoginStatus.LoginRet,
              );
              LoginController.LogLoginProcessLink(
                LoginDefine_1.ELoginStatus.LoginRet,
              );
              ModelManager_1.ModelManager.LoginModel.SetReconnectToken(r.R6n);
            } else {
              LoginController.LogLoginProcessLink(
                LoginDefine_1.ELoginStatus.LoginRet,
                r.Kms,
              );
              if (
                r.Kms !== Protocol_1.Aki.Protocol.lkn.Proto_ServerFullLoadGate
              ) {
                ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
                ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
                  LoginDefine_1.ELoginStatus.Init,
                );
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  r.Kms,
                  104,
                );
              }
            }
          }
          return r;
        }
      }
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.LoginRet,
        Protocol_1.Aki.Protocol.lkn.Proto_LoginReqTimeout,
      );
    }
  }
  static async CreateCharacterRequest() {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
      LoginDefine_1.ELoginStatus.CreateReq,
    );
    var e = ModelManager_1.ModelManager.LoginModel.GetPlayerSex();
    var o = ModelManager_1.ModelManager.LoginModel.GetPlayerName();
    var r = new Protocol_1.Aki.Protocol.cis();
    r.x6n = e;
    r.e4n = o;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 9, "请求创角", ["Sex", r.x6n], ["Name", r.e4n]);
    }
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.CreateReq);
    var e = await Net_1.Net.CallAsync(101, r, 13000);
    if (e) {
      if (
        (o = e?.Kms) === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord ||
        o === Protocol_1.Aki.Protocol.lkn.Proto_ErrRoleInvalidNameLength
      ) {
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.CreateRet,
          o,
        );
      } else if (o !== Protocol_1.Aki.Protocol.lkn.Sys) {
        ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Kms,
          102,
        );
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info(
            "Login",
            9,
            "请求创角失败",
            ["Sex", r.x6n],
            ["Name", r.e4n],
          );
        }
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.CreateRet,
          o,
        );
      } else {
        ModelManager_1.ModelManager.LoginModel.SetCreatePlayerTime(e.BRs);
        ModelManager_1.ModelManager.LoginModel.SetCreatePlayerId(e.aFn);
        ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
          3,
        );
        (r = new Map()).set("101104", "");
        KuroSdkReport_1.KuroSdkReport.Report(
          new KuroSdkReport_1.SdkReportCreateRole(r),
        );
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.CreateRet,
        );
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.CreateRet,
        );
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.EnterGameReq,
        );
      }
      return o;
    } else {
      e = Protocol_1.Aki.Protocol.lkn.Proto_CreateCharacterReqTimeout;
      if (
        !ModelManager_1.ModelManager.LoginModel?.IsLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        )
      ) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "CreateCharacterTimeoutTip",
        );
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.CreateRet,
          e,
        );
        LoginController.DisConnect(false);
        LoginController.Ovi();
      }
      return e;
    }
  }
  static SetIfFirstTimeLogin() {
    ModelManager_1.ModelManager.LoginModel.SetTodayFirstTimeLogin(
      LoginController.kvi(),
    );
    ModelManager_1.ModelManager.LoginModel.SetLastLoginTime(
      TimeUtil_1.TimeUtil.GetServerTime(),
    );
  }
  static kvi() {
    var e;
    var o;
    var r = ModelManager_1.ModelManager.LoginModel.GetLastLoginTime();
    return (
      TimeUtil_1.TimeUtil.GetServerTime() - r >=
        TimeUtil_1.TimeUtil.OneDaySeconds ||
      !r ||
      ((e = TimeUtil_1.TimeUtil.GetServerTime()),
      (o = new Date().setHours(4, 0, 0, 0) / 1000),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 28, "当前时间", ["time", e]),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 28, "之前时间", ["time", r]),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 28, "当天4点时间戳", ["time", o]),
      o <= e && r < o)
    );
  }
  static async Fvi() {
    if (
      ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      ((o =
        ConfigManager_1.ConfigManager.LoginConfig.GetDefaultSingleMapId()) &&
        ModelManager_1.ModelManager.LoginModel.SetSingleMapId(o),
      (o = ConfigManager_1.ConfigManager.LoginConfig.GetDefaultMultiMapId()))
    ) {
      ModelManager_1.ModelManager.LoginModel.SetMultiMapId(o);
    }
    var e;
    var o = new Protocol_1.Aki.Protocol.gis();
    o.P6n = ModelManager_1.ModelManager.LoginModel.GetSingleMapId();
    o.B6n = ModelManager_1.ModelManager.LoginModel.GetMultiMapId();
    o.w6n = ModelManager_1.ModelManager.LoginModel.BornMode;
    o.M3n = ModelManager_1.ModelManager.LoginModel.BornLocation;
    ModelManager_1.ModelManager.LoadingModel.SetIsLoginToWorld(true);
    LoginController.LogLoginProcessLink(
      LoginDefine_1.ELoginStatus.EnterGameReq,
    );
    Net_1.Net.SetDoingLogin();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 17, "LoginProcedure-EnterGame-Call", [
        "enterGameRequest",
        o,
      ]);
    }
    var o = await Net_1.Net.CallAsync(105, o, 13000);
    if (o) {
      if (o.Kms === Protocol_1.Aki.Protocol.lkn.Sys) {
        Net_1.Net.SetFinishLogin();
        return true;
      } else {
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.EnterGameRet,
          o.Kms,
        );
        if (o.Kms !== Protocol_1.Aki.Protocol.lkn.Proto_ServerFullLoadGame) {
          ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            o.Kms,
            106,
          );
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 9, "请求进入游戏失败");
          }
          ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
            LoginDefine_1.ELoginStatus.Init,
          );
          return false;
        } else if (await LoginController.Gvi(o.o6n, o.n6n, o.cAs)) {
          return LoginController.Fvi();
        } else {
          ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
            LoginDefine_1.ELoginStatus.Init,
          );
          return false;
        }
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Login", 9, "请求进入游戏失败, 超时");
      }
      LoginController.LogLoginProcessLink(
        LoginDefine_1.ELoginStatus.EnterGameRet,
        Protocol_1.Aki.Protocol.lkn.Proto_EnterGameTimeout,
      );
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.Init,
      );
      o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33);
      e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
        Protocol_1.Aki.Protocol.lkn.Proto_LoginTimeout,
      );
      o.SetTextArgs(e);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        o,
      );
      UiManager_1.UiManager.CloseView("NetWorkMaskView");
      return false;
    }
  }
  static async Gvi(e, o, r) {
    if (!UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView")) {
      (n = new LoginDefine_1.LoginQueueConfig()).o6n = e;
      n.n6n = o;
      await UiManager_1.UiManager.OpenViewAsync("LoginQueueTipsView", n);
    }
    ModelManager_1.ModelManager.LoginModel.CreateAutoLoginPromise();
    ModelManager_1.ModelManager.LoginModel.AutoLoginTimerId =
      TimerSystem_1.TimerSystem.Delay(
        () => {
          ModelManager_1.ModelManager.LoginModel.FinishAutoLoginPromise(true);
          ModelManager_1.ModelManager.LoginModel.AutoLoginTimerId = undefined;
        },
        Math.max(r, TimeUtil_1.TimeUtil.InverseMillisecond),
      );
    var n;
    var e = await ModelManager_1.ModelManager.LoginModel.WaitAutoLoginPromise();
    if (!e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 9, "玩家取消了登录排队, 不再排队");
      }
    }
    ModelManager_1.ModelManager.LoginModel.ClearAutoLoginTimerId();
    ModelManager_1.ModelManager.LoginModel.ClearAutoLoginPromise();
    return e;
  }
  static async EnterGameAsync() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 17, "LoginProcedure-EnterGame-进入游戏");
    }
    return (
      !!ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
        LoginDefine_1.ELoginStatus.EnterGameReq,
      ) &&
      (GameUtils_1.GameUtils.CreateStat("Login-EnterGameAsync"),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 17, "LoginProcedure-EnterGame-请求进入游戏"),
      (await this.Fvi())
        ? (UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView") &&
            (await UiManager_1.UiManager.CloseViewAsync("LoginQueueTipsView")),
          ModelManager_1.ModelManager.LoginModel.CleanLoginFailCount(
            LoginDefine_1.ECleanFailCountWay.LoginSuccess,
          ),
          ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
            LoginDefine_1.ELoginStatus.EnterGameRet,
          ),
          LoginController.LogLoginProcessLink(
            LoginDefine_1.ELoginStatus.EnterGameRet,
          ),
          (ModelManager_1.ModelManager.LoginModel.LoginTraceId = undefined),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.EnterGameSuccess,
          ),
          GameUtils_1.GameUtils.CreateStat("Login-EnterGameSuccess"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              17,
              "LoginProcedure-EnterGame-进入游戏成功",
            ),
          ModelManager_1.ModelManager.CreatureModel.SetGameplayTagHash(
            UE.GASBPLibrary.GetNetworkGameplayTagNodeIndexHash(),
          ),
          true)
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Login",
              17,
              "LoginProcedure-EnterGame-进入游戏失败",
            ),
          false))
    );
  }
  static CheckCanReConnect() {
    if (LoginController.IsLoginViewOpen()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 31, "不能重连 LoginViewOpen");
      }
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
        LoginDefine_1.ELoginStatus.Init,
      );
      return false;
    } else {
      return (
        !LoginController.Ovi() ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 31, "不能重连 CreateCharacterViewOpen"),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "ConnectGateWayFail",
        ),
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.Init,
        ),
        false)
      );
    }
  }
  static Ovi() {
    return (
      !!UiManager_1.UiManager.IsViewShow("CreateCharacterView") &&
      (UiManager_1.UiManager.CloseView("NetWorkMaskView"),
      LoginController.CreateCharacterViewToLoginView(),
      true)
    );
  }
  static OpenSdkLoginView() {
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.SdkViewOpen);
    ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(0);
  }
  static ReOpenSdkLoginView() {
    ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(7);
  }
  static Vvi(e) {
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginConfig(
      e.Uid,
      e.UserName,
      e.Token,
    );
    ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfo(e.Uid);
  }
  static GetAndShowStopServerNotice() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 28, "获得公告");
    }
    var o = BaseConfigController_1.BaseConfigController.GetLoginServers();
    if (o && o.length !== 0) {
      let e = o[0].id;
      if (
        ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData
      ) {
        e =
          ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData
            .id;
      }
      o =
        PublicUtil_1.PublicUtil.GetLoginNoticeUrl2(
          PublicUtil_1.PublicUtil.GetGameId(),
          LanguageSystem_1.LanguageSystem.PackageLanguage,
          e,
        ) ?? "";
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Login", 9, "获取登录公告", ["http", o]);
      }
      Http_1.Http.Get(o, undefined, this.Hvi);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 28, "没有登录服务器信息");
    }
  }
  static jvi() {
    var e = new LoginModel_1.LoginNotice();
    e.Title =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "DefaultLoginTitle",
      ) ?? "";
    e.content =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "DefaultLoginNotice",
      ) ?? "";
    this.Wvi(e);
  }
  static Wvi(e) {
    if (e) {
      ModelManager_1.ModelManager.LoginModel.LoginNotice = e;
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42)).SetTitle(
        ModelManager_1.ModelManager.LoginModel.LoginNotice.Title,
      );
      e.SetTextArgs(ModelManager_1.ModelManager.LoginModel.LoginNotice.content);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
    }
  }
  static Ivi() {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      UiManager_1.UiManager.OpenView("LoginView");
    } else if (!this.Kvi()) {
      UiManager_1.UiManager.OpenView("LoginDebugView");
    }
  }
  static Kvi() {
    var e;
    var o;
    var r;
    return (
      !!GlobalData_1.GlobalData.IsPlayInEditor &&
      !!(e = PublicUtil_1.PublicUtil.TestLoadEditorConfigData())
        ?.EditorStartConfig?.IsReLoadArchive &&
      ((o = e.EditorStartConfig.ArchiveAccount),
      (r = e.EditorStartConfig.DungeonId),
      (e.EditorStartConfig.IsReLoadArchive = false),
      PublicUtil_1.PublicUtil.TestSaveEditorConfigData(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Login",
          43,
          "GM读取存档快速登录",
          ["账号:", o],
          ["副本ID:", r],
        ),
      ModelManager_1.ModelManager.LoginModel.SetSingleMapId(r),
      ModelManager_1.ModelManager.LoginModel.SetAccount(o),
      LoginController.GetHttp(true),
      true)
    );
  }
  static IsLoginViewOpen() {
    return (
      UiManager_1.UiManager.IsViewShow("LoginView") ||
      UiManager_1.UiManager.IsViewShow("LoginDebugView")
    );
  }
  static ExitLoginView() {
    if (UiManager_1.UiManager.IsViewShow("LoginDebugView")) {
      UiManager_1.UiManager.CloseView("LoginDebugView");
    }
    if (UiManager_1.UiManager.IsViewShow("LoginView")) {
      UiManager_1.UiManager.CloseView("LoginView");
    }
  }
  static LogLoginProcessLink(e, o = Protocol_1.Aki.Protocol.lkn.Sys) {
    var r = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig();
    var n = new LogReportDefine_1.LoginProcessLink();
    n.s_trace_id = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? "";
    n.s_user_id = r?.Uid ?? "";
    n.s_user_name =
      r?.UserName ?? ModelManager_1.ModelManager.LoginModel.GetAccount();
    n.s_login_step = LoginDefine_1.ELoginStatus[e];
    n.s_app_version = UE.KuroLauncherLibrary.GetAppVersion();
    n.s_launcher_version = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.LauncherPatchVersion,
      n.s_app_version,
    );
    n.s_resource_version = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
      n.s_app_version,
    );
    n.s_client_version =
      BaseConfigController_1.BaseConfigController.GetVersionString();
    n.i_error_code = o;
    LogReportController_1.LogReportController.LogReport(n);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug(
        "Login",
        9,
        "上报登录埋点",
        ["loginStep", LoginDefine_1.ELoginStatus[e]],
        ["code", o],
      );
    }
  }
  static DevLoginWithEditorConfig() {
    PublicUtil_1.PublicUtil.SetIsSilentLogin(true);
    UiBlueprintFunctionLibrary_1.default.SetTempLocation(
      UiBlueprintFunctionLibrary_1.default.TestSceneLoadBornLocation(),
    );
    UiBlueprintFunctionLibrary_1.default.TestSceneLogin("AkiWorld_WP");
  }
  static vvi() {
    var e = ModelManager_1.ModelManager.LoginModel;
    e.PublicJsonVersion = Number(
      BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
        "ChangelistConfigServerDataPublicjson",
        "0",
      ),
    );
    e.PublicMiscVersion = Number(
      BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
        "ChangelistConfigServerMisc",
        "0",
      ),
    );
    e.PublicUniverseEditorVersion = Number(
      BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
        "ChangelistConfigServerUniverseEditorConfig",
        "0",
      ),
    );
    var o = UE.KuroLauncherLibrary.GetAppVersion();
    e.LauncherVersion = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.LauncherPatchVersion,
      o,
    );
    e.LauncherVersion = e.LauncherVersion?.length ? e.LauncherVersion : o;
    e.ResourceVersion = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
      o,
    );
    e.ResourceVersion = e.ResourceVersion?.length ? e.ResourceVersion : o;
  }
  static bvi() {
    return !GlobalData_1.GlobalData.IsPlayInEditor;
  }
  static d9s() {
    var e;
    if (this.bvi()) {
      if (
        (e = ModelManager_1.ModelManager.LoginModel).VerifyConfigVersionHandle
      ) {
        TimerSystem_1.TimerSystem.Remove(e.VerifyConfigVersionHandle);
        e.VerifyConfigVersionHandle = undefined;
      }
      e.VerifyConfigVersionHandle = TimerSystem_1.TimerSystem.Forever(
        LoginController.C9s,
        VERIFY_CONFIG_VERSION_INTERVAL,
      );
    }
  }
  static m9s() {
    var e;
    if (
      this.bvi() &&
      (e = ModelManager_1.ModelManager.LoginModel).VerifyConfigVersionHandle
    ) {
      TimerSystem_1.TimerSystem.Remove(e.VerifyConfigVersionHandle);
      e.VerifyConfigVersionHandle = undefined;
    }
  }
}
exports.LoginController = LoginController;
(_a = LoginController).Evi = (e) => {
  cpp_1.FuncOpenLibrary.SetFirstTimestamp(0);
  if (e.Kms === Protocol_1.Aki.Protocol.lkn.Sys) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Login", 9, "收到登出通知, 但没有登出原因!");
    }
  } else if (UiManager_1.UiManager.IsInited) {
    LoginController.yvi(e);
  } else {
    ModelManager_1.ModelManager.LoginModel.LogoutNotify = e;
  }
};
LoginController.Wpi = () => {
  ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(2);
};
LoginController.Mvi = () => {
  if (ModelManager_1.ModelManager.LoginModel.GetAutoOpenLoginView()) {
    ModelManager_1.ModelManager.LoginModel.SetAutoOpenLoginView(false);
    LoginController.OpenLoginView();
  }
  if (ModelManager_1.ModelManager.LoginModel.LogoutNotify) {
    LoginController.yvi(ModelManager_1.ModelManager.LoginModel.LogoutNotify);
  }
  if (ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction) {
    ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction();
    ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction = undefined;
  }
};
LoginController.Svi = () => {
  Net_1.Net.Send(114, Protocol_1.Aki.Protocol.Tis.create());
  LanguageUpdateManager_1.LanguageUpdateManager.StopAllDownload();
};
LoginController.GetHttp = (n = false, e = true) => {
  var o;
  var r;
  ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo();
  if (ModelManager_1.ModelManager.LoginModel.IsThisTimeCanLogin()) {
    if (
      ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
        LoginDefine_1.ELoginStatus.Init,
      )
    ) {
      GameUtils_1.GameUtils.CreateStat("Login-GetAccount");
      r = ModelManager_1.ModelManager.LoginModel.GetAccount();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Login", 17, "获取本地保存账号", ["account", r]);
      }
      o = encodeURIComponent(r);
      if ((o = decodeURIComponent(o)) !== r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error(
            "Login",
            9,
            "玩家账号http编码后再解码与原先不一致, 无法登录",
            ["account", r],
            ["accountAfterUrlDecode", o],
          );
        }
      } else {
        Heartbeat_1.Heartbeat.StopHeartBeat(
          HeartbeatDefine_1.EStopHeartbeat.BeforeGetToken,
        );
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
          LoginDefine_1.ELoginStatus.LoginHttp,
        );
        if (e) {
          ModelManager_1.ModelManager.LoginModel.LoginTraceId =
            UE.KismetGuidLibrary.NewGuid().ToString();
        }
        GameUtils_1.GameUtils.CreateStat("Login-BuildHttp");
        r = LoginController.Tvi();
        LoginController.LogLoginProcessLink(
          LoginDefine_1.ELoginStatus.LoginHttp,
        );
        CrashCollectionController_1.CrashCollectionController.RecordHttpInfo(r);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 17, "LoginProcedure-Http-登录Http请求");
        }
        Http_1.Http.Get(r, undefined, (e, o, r) => {
          LoginController.ConnectServer(o, r, n);
        });
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Login", 9, "正在登录中, 请勿重复操作！");
    }
  } else {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "LoginFailTooManyTimes",
    );
  }
};
LoginController.Lvi = () => {
  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByTextId(
    "HttpTimeout",
  );
  ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
  ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
    LoginDefine_1.ELoginStatus.Init,
  );
  LoginController.LogLoginProcessLink(
    LoginDefine_1.ELoginStatus.LoginHttpRet,
    Protocol_1.Aki.Protocol.lkn.Proto_HttpTimeout,
  );
};
LoginController.Avi = (e) => {
  if (e instanceof Error) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.ErrorWithStack("Login", 9, "登录异常发生异常", e, [
        "error",
        e.message,
      ]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Login", 9, "登录异常发生异常", ["error", e ?? undefined]);
  }
};
LoginController.OnSdkLogin = (e) => {
  if (e.LoginCode === 1) {
    LoginController.LogLoginProcessLink(
      LoginDefine_1.ELoginStatus.SdkLoginSuccecc,
    );
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(1);
    HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
      HotPatchLogReport_1.LoginLogEventDefine.SdkLogin,
      "sdk_login_success",
    );
    LoginController.Vvi(e);
  } else {
    LoginController.LogLoginProcessLink(
      LoginDefine_1.ELoginStatus.SdkLoginFail,
    );
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0);
    HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
      HotPatchLogReport_1.LoginLogEventDefine.SdkLogin,
      "sdk_login_failed",
    );
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Login", 28, "Sdk登录失败!!!");
    }
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkLoginResult);
};
LoginController.OnLogoutAccount = () => {
  var e = ModelManager_1.ModelManager.LoginModel.GetSdkLoginState();
  ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0);
  if (
    ModelManager_1.ModelManager.LoginModel.GetLoginStatus() >=
      LoginDefine_1.ELoginStatus.EnterGameRet &&
    e !== 0
  ) {
    ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
      ReconnectDefine_1.ELogoutReason.SdkLogoutAccount,
    );
  } else {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkLoginResult);
    HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
      HotPatchLogReport_1.LoginLogEventDefine.SdkLogin,
      "sdk_login_logout",
    );
  }
};
LoginController.Nvi = () => {
  ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(5);
};
LoginController.Hvi = (e, o, r) => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Login", 9, "获取登录公告返回", ["data", r]);
  }
  if (o === 200 && (o = Json_1.Json.Parse(r))) {
    (r = new LoginModel_1.LoginNotice()).Phrase(o);
    if (
      !!PublicUtil_1.PublicUtil.IsInIpWhiteList(r.WhiteLists) &&
      !(
        (o = new Date().getTime() * TimeUtil_1.TimeUtil.Millisecond) <
        r.BeginTime
      ) &&
      !(o > r.EndTime)
    ) {
      LoginController.Wvi(r);
    }
  } else {
    _a.jvi();
  }
};
LoginController.C9s = () => {
  var e = ModelManager_1.ModelManager.LoginModel;
  var o = Protocol_1.Aki.Protocol.s7s.create();
  o.h6n = UE.KuroLauncherLibrary.GetAppVersion();
  o.l6n = e.LauncherVersion;
  o._6n = e.ResourceVersion;
  Net_1.Net.Send(115, o);
};
LoginController.i9s = () => {
  var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
    "ErrorCode_100017_Text",
  );
  var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(10);
  o.SetTextArgs(e);
  o.FunctionMap.set(1, () => {
    ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
      ReconnectDefine_1.ELogoutReason.LogoutNotify,
    );
  });
  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
    o,
  );
}; //# sourceMappingURL=LoginController.js.map
