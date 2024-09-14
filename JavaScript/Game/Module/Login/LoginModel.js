"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginModel =
    exports.LoginNotice =
    exports.LoginNoticeEx =
    exports.ServerInfo =
    exports.ServerData =
    exports.ReconnectInfo =
    exports.DEFAULT_SERVER_IP =
    exports.STREAM_MAINLINE =
    exports.STREAM =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager"),
  LoginDefine_1 = require("./Data/LoginDefine"),
  Heartbeat_1 = require("./Heartbeat"),
  HeartbeatDefine_1 = require("./HeartbeatDefine"),
  LOADING_WIDGET_KEY = "loading_widget",
  BACK_TO_GAME_KEY = "back_to_game";
(exports.STREAM = "Stream"),
  (exports.STREAM_MAINLINE = "mainline"),
  (exports.DEFAULT_SERVER_IP = "127.0.0.1");
class ReconnectInfo {
  constructor(t, e, i) {
    (this.Token = ""),
      (this.Host = ""),
      (this.Port = 0),
      (this.Token = t),
      (this.Host = e),
      (this.Port = i);
  }
}
exports.ReconnectInfo = ReconnectInfo;
class MapConfig {
  constructor(t, e) {
    (this.MapId = 0), (this.MapName = ""), (this.MapId = t), (this.MapName = e);
  }
}
class ServerData {
  constructor(t) {
    (this.Config = new ServerConfig()), t && (this.Config = t);
  }
  SetIp(t) {
    return (this.Config.Ip = t), this;
  }
}
exports.ServerData = ServerData;
class ServerConfig extends Json_1.JsonObjBase {
  constructor(t = "", e = "", i = "", o = 0) {
    super(),
      (this.Ip = ""),
      (this.Port = ""),
      (this.Name = ""),
      (this.Order = 0),
      (this.Ip = t),
      (this.Port = e),
      (this.Name = i),
      (this.Order = o);
  }
}
class ServerInfo extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.server = ""),
      (this.address = ""),
      (this.description = ""),
      (this.stream = ""),
      (this.editor = void 0),
      (this.package = void 0),
      (this.order = void 0);
  }
}
exports.ServerInfo = ServerInfo;
class LoginNoticeEx extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.title = ""),
      (this.content = ""),
      (this.whiteList = void 0),
      (this.startTimeMs = -0),
      (this.endTimeMs = -0);
  }
}
exports.LoginNoticeEx = LoginNoticeEx;
class LoginNotice {
  constructor() {
    (this.Id = ""),
      (this.WhiteLists = void 0),
      (this.ModifyTime = -0),
      (this.BeginTime = -0),
      (this.EndTime = -0),
      (this.Title = ""),
      (this.content = "");
  }
  Phrase(t) {
    (this.WhiteLists = t.whiteList),
      (this.BeginTime = t.startTimeMs / 1e3),
      (this.EndTime = t.endTimeMs / 1e3),
      (this.Title = t.title),
      (this.content = t.content);
  }
}
exports.LoginNotice = LoginNotice;
class SdkLoginConfig {
  constructor(t = "", e = "", i = "") {
    (this.Uid = ""),
      (this.UserName = ""),
      (this.Token = ""),
      (this.Uid = t),
      (this.UserName = e),
      (this.Token = i);
  }
  GetLoginUserNameWithUriEncode() {
    return encodeURIComponent(this.UserName);
  }
}
class SdkLoginInfo {
  constructor() {
    (this.LoginCode = ""), (this.Uid = ""), (this.UserName = "");
  }
}
class LoginModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.BornMode = 1),
      (this.BornLocation = void 0),
      (this.Platform = ""),
      (this.QMi = void 0),
      (this.XMi = void 0),
      (this.$Mi = void 0),
      (this.YMi = void 0),
      (this.hGn = void 0),
      (this.XK = LoginDefine_1.ELoginStatus.Init),
      (this.JMi = void 0),
      (this.zMi = !1),
      (this.ZMi = void 0),
      (this.B9e = ""),
      (this.eEi = void 0),
      (this.tEi = !1),
      (this.SmokeTestReady = !1),
      (this.SdkAccountChangeNeedExitFlag = !1),
      (this.PlayStationGameAutoLoginId = "-1"),
      (this.iEi = 0),
      (this.oEi = new Map()),
      (this.rEi = void 0),
      (this.nEi = !1),
      (this.sEi = -0),
      (this.aEi = 0),
      (this.yX = void 0),
      (this.rFn = void 0),
      (this.oFn = "0"),
      (this._Pa = void 0),
      (this.SdkAccessToken = ""),
      (this.SdkAccessTokenTimer = void 0),
      (this.hEi = 0),
      (this.LoginNotice = void 0),
      (this.lEi = 0),
      (this.JIa = void 0),
      (this.IsCopyAccount = !1),
      (this._Ei = 0),
      (this.uEi = 0),
      (this.Coa = void 0),
      (this.goa = void 0),
      (this.foa = void 0),
      (this.cEi = void 0),
      (this.mEi = 10),
      (this.dEi = void 0),
      (this.CEi = void 0),
      (this.gEi = void 0),
      (this.fEi = void 0),
      (this.AutoLoginTimerIdInternal = void 0),
      (this.zPa = void 0),
      (this.JPa = void 0),
      (this.d$a = void 0),
      (this.Mla = void 0),
      (this.Sla = 0),
      (this.TryBackToGameMaxCount = 5);
  }
  get pEi() {
    return LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.LoginFailCount,
      0,
    );
  }
  set pEi(t) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.LoginFailCount,
      t,
    );
  }
  get vEi() {
    return LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.NextLoginTime,
      0,
    );
  }
  set vEi(t) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.NextLoginTime,
      t,
    );
  }
  get MEi() {
    return LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.ResetLoginFailCountTime,
      0,
    );
  }
  set MEi(t) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.ResetLoginFailCountTime,
      t,
    );
  }
  get PublicJsonVersion() {
    return this.lEi;
  }
  set PublicJsonVersion(t) {
    this.lEi = t;
  }
  get PublicMiscVersion() {
    return this._Ei;
  }
  set PublicMiscVersion(t) {
    this._Ei = t;
  }
  get PublicUniverseEditorVersion() {
    return this.uEi;
  }
  set PublicUniverseEditorVersion(t) {
    this.uEi = t;
  }
  get LauncherVersion() {
    return this.Coa;
  }
  set LauncherVersion(t) {
    this.Coa = t;
  }
  get ResourceVersion() {
    return this.goa;
  }
  set ResourceVersion(t) {
    this.goa = t;
  }
  get VerifyConfigVersionHandle() {
    return this.foa;
  }
  set VerifyConfigVersionHandle(t) {
    this.foa = t;
  }
  OnInit() {
    return (
      (this.BornMode = 1),
      (this.BornLocation = new Protocol_1.Aki.Protocol.Gks()),
      (this.XK = LoginDefine_1.ELoginStatus.Init),
      (this.hEi = 0),
      (this.zPa = UE.KuroStaticLibrary.GetDeviceCPU()),
      (this.JPa = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName()),
      (this.d$a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDriverDate()),
      this.d$a?.length || (this.d$a = "Unknown"),
      !0
    );
  }
  OnClear() {
    return (
      (this.XK = LoginDefine_1.ELoginStatus.Init),
      (this.hEi = 0),
      (this.QMi = []),
      (this.XMi = []),
      (this.$Mi = []),
      (this.YMi = []),
      (this.XK = LoginDefine_1.ELoginStatus.Init),
      (this.zMi = !1),
      (this.B9e = ""),
      (this.eEi = void 0),
      (this.tEi = !1),
      (this.JMi = void 0),
      (this.lEi = 0),
      (this._Ei = 0),
      (this.uEi = 0),
      (this.Coa = void 0),
      (this.goa = void 0),
      (this.zPa = void 0),
      (this.JPa = void 0),
      (this.d$a = void 0),
      (this.iEi = 0),
      this.oEi.clear(),
      !0
    );
  }
  InitConfig() {
    if (!this.QMi || !this.XMi || !this.$Mi) {
      (this.QMi = new Array()),
        (this.XMi = new Array()),
        (this.$Mi = new Array()),
        (this.YMi = new Array());
      var t = ConfigManager_1.ConfigManager.LoginConfig.GetAllInstanceDungeon();
      if (t)
        for (const e of t) {
          let t =
            ConfigManager_1.ConfigManager.LoginConfig.GetInstanceDungeonNameById(
              e.MapName,
            );
          void 0 === t && (t = ""), this.QMi.push(new MapConfig(e.Id, t));
        }
    }
  }
  AddServerInfoByCdn() {
    if (this.$Mi) {
      var t = BaseConfigController_1.BaseConfigController.GetLoginServers();
      if (t) {
        t.length <= 0 &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Login", 11, "CDN的服务器数据列表为空");
        for (const i of t) {
          var e = new ServerConfig(i.ip, LoginDefine_1.DEFAULTPORT, i.name, 0);
          this.$Mi.push(e), this.YMi.push(new ServerData(e));
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 11, "拿不到CDN返回的服务器数据");
    }
  }
  AddExtraServer() {
    var t = UE.BlueprintPathsLibrary.ProjectConfigDir() + "/ServerConfig.json",
      e = UE.KuroStaticLibrary.LoadFileToStringArray(t);
    if (!(e.Num() <= 0))
      for (let t = 0; t < e.Num(); ++t) {
        var i = Json_1.Json.Parse(e.Get(t));
        this.$Mi.push(i);
      }
  }
  AddServerInfos(t) {
    if (this.$Mi) {
      var e = Info_1.Info.IsPlayInEditor;
      for (const i of t)
        ((e && i.editor) || (!e && i.package)) &&
          this.$Mi.push(
            new ServerConfig(
              i.address,
              LoginDefine_1.DEFAULTPORT,
              i.description,
              i.order,
            ),
          );
    }
  }
  AddDataTableServers() {
    if (this.$Mi && GlobalData_1.GlobalData.World)
      for (const t of DataTableUtil_1.DataTableUtil.GetDataTableAllRow(14))
        this.$Mi.push(new ServerConfig(t.IP, t.Port, t.Name, t.Order));
  }
  CleanConfig() {
    (this.QMi = void 0),
      (this.XMi = void 0),
      (this.$Mi = void 0),
      (this.rEi = void 0),
      (this.YMi = void 0);
  }
  SetCreatePlayerTime(t) {
    this.sEi = t;
  }
  GetCreatePlayerTime() {
    return this.sEi;
  }
  SetCreatePlayerId(t) {
    this.aEi = t;
  }
  GetCreatePlayerId() {
    return this.aEi;
  }
  GetServerIp() {
    return this.yX;
  }
  GetSourcePlayerAccount() {
    return this.JIa;
  }
  SetServerIp(t, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Login",
        9,
        "保存服务器IP",
        ["serverIp", t],
        ["reason", e],
      ),
      (this.yX = t);
  }
  TrySetCustomServerPort(t, e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Login",
        9,
        "自定义服务器Port",
        ["port", t],
        ["reason", e],
      ),
      (this.hGn = t);
  }
  TryGetRealServerPort() {
    var t = this.GetCustomServerPort();
    return t ? ((this.hGn = void 0), t) : this.GetServerPort();
  }
  GetCustomServerPort() {
    return this.hGn;
  }
  GetServerPort() {
    var t = "5500",
      e = UE.KismetSystemLibrary.GetCommandLine().split(" "),
      i = e.indexOf("-LocalGameServerStartPort");
    return -1 === i ||
      i + 1 >= e.length ||
      ((e = parseInt(e[i + 1], 10)), isNaN(e))
      ? t
      : (e + 1).toString();
  }
  GetServerName() {
    return this.rFn;
  }
  SetServerName(t) {
    (this.rFn = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 28, "当前选择服务器Name", ["serverId", t]);
  }
  GetServerId() {
    return this.oFn;
  }
  SetServerId(t) {
    (this.oFn = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSetLoginServerId,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 28, "当前选择服务器Id", ["serverId", t]);
  }
  GetSingleMapId() {
    var t = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SingleMapId,
      -1,
    );
    return -1 === t ? void 0 : t;
  }
  SetSingleMapId(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Login", 9, "保存单人副本id", ["singleMapId", t]),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SingleMapId,
        t,
      );
  }
  GetMultiMapId() {
    var t = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.MultiMapId,
      -1,
    );
    return -1 === t ? void 0 : t;
  }
  SetMultiMapId(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Login", 9, "保存多人副本id", ["multiMapId", t]),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MultiMapId,
        t,
      );
  }
  GetAccount() {
    return LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.Account,
      "",
    );
  }
  SetAccount(t) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.Account,
      t,
    ),
      this.AddRecentlyAccount(t),
      ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfo(t);
  }
  SetSourceAccount(t) {
    (this.JIa = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 5, "设置复制账号", ["目标账号:", t]);
  }
  GetSelectBoxActive() {
    return (
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SelectBoxActive,
        !0,
      ) ?? !1
    );
  }
  SetSelectBoxActive(t) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SelectBoxActive,
      t,
    );
  }
  GetAutoOpenLoginView() {
    return this.zMi;
  }
  SetAutoOpenLoginView(t) {
    this.zMi = t;
  }
  GetLoginStatus() {
    return this.XK;
  }
  GetLastFailStatus() {
    return this.JMi;
  }
  SetLoginStatus(t, e = 0) {
    t !== this.XK &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          9,
          "登录状态变化",
          ["Before", LoginDefine_1.ELoginStatus[this.XK]],
          ["After", LoginDefine_1.ELoginStatus[t]],
        ),
      this.XK !== LoginDefine_1.ELoginStatus.Init &&
      t === LoginDefine_1.ELoginStatus.Init
        ? (Log_1.Log.CheckError() && Log_1.Log.Error("Login", 22, "登录失败"),
          Heartbeat_1.Heartbeat.StopHeartBeat(
            HeartbeatDefine_1.EStopHeartbeat.LoginStatusInit,
          ),
          (this.JMi = this.XK))
        : (this.JMi = void 0),
      (this.XK = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LoginStatusChange,
      ));
  }
  IsLoginStatus(t) {
    return this.XK === t;
  }
  SetSdkLoginState(t) {
    0 === (this.hEi = t) && (this.PlayStationGameAutoLoginId = "-1");
  }
  SetSdkLoginInfo(t, e, i) {
    this._Pa || (this._Pa = new SdkLoginInfo()),
      (this._Pa.LoginCode = t),
      (this._Pa.Uid = e),
      (this._Pa.UserName = i);
  }
  GetSdkLoginInfo() {
    return this._Pa;
  }
  IsSdkLoggedIn() {
    return 1 === this.hEi;
  }
  IsSdkLoggingIn() {
    return 2 === this.hEi;
  }
  IsSdkLogout() {
    return 0 === this.hEi;
  }
  GetSingleMapList() {
    return this.QMi;
  }
  GetSingleMapIp(t) {
    if (t < this.QMi.length) return this.QMi[t].MapId;
  }
  GetServerInfoList() {
    return this.$Mi?.sort((t, e) => t.Order - e.Order), this.$Mi;
  }
  GetServerDataList() {
    return this.YMi;
  }
  GetServerInfo(t) {
    if (t < this.$Mi.length) return this.$Mi[t];
  }
  HasReconnectInfo() {
    return void 0 !== this.ZMi;
  }
  SetReconnectInfo(t, e, i) {
    this.ZMi = new ReconnectInfo(t, e, i);
  }
  SetReconnectToken(t) {
    this.ZMi && (this.ZMi.Token = t);
  }
  GetReconnectToken() {
    if (void 0 !== this.ZMi) return this.ZMi.Token;
  }
  GetReconnectHost() {
    if (void 0 !== this.ZMi) return this.ZMi.Host;
  }
  GetReconnectPort() {
    if (void 0 !== this.ZMi) return this.ZMi.Port;
  }
  GetPlayerName() {
    return this.B9e;
  }
  SetPlayerName(t) {
    this.B9e = t;
  }
  GetPlayerSex() {
    return this.eEi;
  }
  SetPlayerSex(t) {
    this.eEi = t;
  }
  IsPlayerSexValid(t) {
    let e = t;
    return (
      (e = void 0 === t ? this.eEi : e) === LoginDefine_1.ELoginSex.Boy ||
      e === LoginDefine_1.ELoginSex.Girl
    );
  }
  GetHasCharacter() {
    return this.tEi;
  }
  SetHasCharacter(t) {
    this.tEi = t;
  }
  CleanCreateData() {
    (this.tEi = !1), (this.B9e = ""), (this.eEi = void 0);
  }
  SetRpcHttp(t, e) {
    const i = ++this.iEi;
    e = TimerSystem_1.TimerSystem.Delay(() => {
      this.IsLoginStatus(LoginDefine_1.ELoginStatus.LoginHttp) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Login", 9, "http请求超时", ["rpcId", i]),
        this.oEi.delete(i),
        t());
    }, e);
    return this.oEi.set(i, e), i;
  }
  CleanRpcHttp(t) {
    var e = this.oEi.get(t);
    return !!e && (TimerSystem_1.TimerSystem.Remove(e), this.oEi.delete(t), !0);
  }
  AddLoginFailCount() {
    0 === this.pEi &&
      ((t = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime()),
      this.EEi(t)),
      this.SetLoginFailCount(this.pEi + 1);
    var t = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(
      this.pEi,
    );
    this.SEi(t);
  }
  IsThisTimeCanLogin() {
    var t = 0.001 * Date.now();
    if (0 < this.pEi) {
      var e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime();
      if (t >= this.MEi + e)
        return (
          this.CleanLoginFailCount(
            LoginDefine_1.ECleanFailCountWay.RefreshTime,
          ),
          !0
        );
    }
    e =
      this.vEi +
      ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(this.pEi);
    return (
      e <= t ||
      ((t = new Date(1e3 * e)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Login", 9, "下次可登录的时间戳", [
          "NextLoginTime",
          TimeUtil_1.TimeUtil.DateFormat(t),
        ]),
      !1)
    );
  }
  CleanLoginFailCount(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Login", 9, "清空登录失败信息", [
        "way",
        LoginDefine_1.ECleanFailCountWay[t],
      ]),
      this.SetLoginFailCount(0, !1),
      this.SEi(0, !1),
      this.EEi(0, !1);
  }
  SetLoginFailCount(t, e = !0) {
    (this.pEi = t),
      e &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Login", 9, "登录失败次数增加", [
          "LoginFailCount",
          this.pEi,
        ]);
  }
  SEi(t, e = !0) {
    (this.vEi = 0.001 * Date.now()),
      e &&
        ((e = new Date(1e3 * (this.vEi + t))), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Login", 9, "设置下次可登录时间", [
          "NextLoginTime",
          TimeUtil_1.TimeUtil.DateFormat(e),
        ]);
  }
  EEi(t, e = !0) {
    (this.MEi = 0.001 * Date.now()),
      e &&
        ((e = new Date(1e3 * (this.MEi + t))), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Login", 9, "设置下次重置登录失败时间", [
          "ResetLoginFailCountTime",
          TimeUtil_1.TimeUtil.DateFormat(e),
        ]);
  }
  FixLoginFailInfo() {
    var t,
      e = 0.001 * Date.now();
    this.MEi > e &&
      ((t = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime()),
      this.EEi(t)),
      this.vEi > e &&
        ((t = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(
          this.pEi,
        )),
        this.SEi(t));
  }
  SetSdkLoginConfig(t, e, i) {
    var o = this.rEi?.Uid !== t,
      i =
        ((this.rEi = new SdkLoginConfig(t, e, i)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Login",
            28,
            "设置SDK登录配置",
            ["uId", t],
            ["userName", e],
          ),
        this.GetLoginStatus() >= LoginDefine_1.ELoginStatus.EnterGameRet);
    o
      ? i && o && (this.SdkAccountChangeNeedExitFlag = !0)
      : (this.SdkAccountChangeNeedExitFlag = !1);
  }
  GetSdkLoginConfig() {
    return this.rEi;
  }
  GetLoginUid() {
    return ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() ||
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn
      ? this.rEi
        ? this.rEi.Uid
        : ""
      : this.GetAccount();
  }
  GetLoginUserName() {
    return this.rEi ? this.rEi.UserName : "";
  }
  GetLoginUserNameWithUriEncode() {
    return this.rEi ? this.rEi.GetLoginUserNameWithUriEncode() : "";
  }
  GetLoginToken() {
    return this.rEi ? this.rEi.Token : "";
  }
  set LogoutNotify(t) {
    this.cEi = t;
  }
  get LogoutNotify() {
    return this.cEi;
  }
  SetTodayFirstTimeLogin(t) {
    this.nEi = t;
  }
  GetTodayFirstTimeLogin() {
    return this.nEi;
  }
  GetLastLoginTime() {
    return LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.LoginTime,
      0,
    );
  }
  SetLastLoginTime(t) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.LoginTime,
      t,
    );
  }
  AddRecentlyAccount(i) {
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      for (this.dEi || (this.dEi = []); this.dEi.length >= this.mEi; )
        this.dEi.splice(0, 1);
      let e = -1;
      for (let t = 0; t < this.dEi.length; t++)
        if (this.dEi[t] === i) {
          e = t;
          break;
        }
      -1 !== e && this.dEi.splice(e, 1), this.dEi.push(i);
    }
  }
  InitRecentlyAccountList() {
    (this.dEi = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyAccountList,
    )),
      this.dEi || (this.dEi = []);
  }
  GetRecentlyAccountList() {
    return this.dEi;
  }
  SaveRecentlyAccountList() {
    this.dEi &&
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyAccountList,
        this.dEi,
      );
  }
  get LoginTraceId() {
    return this.CEi;
  }
  set LoginTraceId(t) {
    this.CEi = t;
  }
  CreateLoginPromise() {
    this.gEi = new CustomPromise_1.CustomPromise();
  }
  FinishLoginPromise() {
    this.gEi?.SetResult(void 0);
  }
  async WaitLoginPromise() {
    await this.gEi?.Promise, (this.gEi = void 0);
  }
  HasLoginPromise() {
    return void 0 !== this.gEi;
  }
  CreateAutoLoginPromise() {
    this.fEi = new CustomPromise_1.CustomPromise();
  }
  ClearAutoLoginPromise() {
    this.fEi = void 0;
  }
  FinishAutoLoginPromise(t) {
    this.fEi.SetResult(t);
  }
  async WaitAutoLoginPromise() {
    var t = await this.fEi?.Promise;
    return (this.fEi = void 0), t;
  }
  HasAutoLoginPromise() {
    return void 0 !== this.fEi;
  }
  get AutoLoginTimerId() {
    return this.AutoLoginTimerIdInternal;
  }
  set AutoLoginTimerId(t) {
    this.AutoLoginTimerIdInternal = t;
  }
  ClearAutoLoginTimerId() {
    void 0 !== this.AutoLoginTimerId &&
      (TimerSystem_1.TimerSystem.Remove(this.AutoLoginTimerId),
      (this.AutoLoginTimerId = void 0));
  }
  CpuInfo() {
    return this.zPa;
  }
  DeviceInfo() {
    return this.JPa;
  }
  DriverDate() {
    return this.d$a;
  }
  HasBackToGameData() {
    return (
      !!this.Mla ||
      UE.KuroVariableFunctionLibrary.HasStringValue(BACK_TO_GAME_KEY)
    );
  }
  SaveKuroVariableStringValue(t, e) {
    return (
      !!UE.KuroVariableFunctionLibrary.SetStringValue(t, e) ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Login",
          28,
          "SetStringValue失败",
          ["key", t],
          ["jsonData", e],
        ),
      !1)
    );
  }
  SaveKuroVariableObject(t, e) {
    return e?.IsValid()
      ? !!UE.KuroVariableFunctionLibrary.SetObject(t, e) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Login", 28, "SetObject失败", ["key", t]),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 28, "SaveKuroVariableObject Object无效", [
            "key",
            t,
          ]),
        !1);
  }
  SaveBackToGameData(t) {
    var e = JSON.stringify(t, (t, e) => {
        if ("LoadingWidget" !== t) return e;
      }),
      i = t.LoadingWidget;
    return i?.IsValid()
      ? this.SaveKuroVariableObject(LOADING_WIDGET_KEY, i)
        ? this.SaveKuroVariableStringValue(BACK_TO_GAME_KEY, e)
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Login", 28, "保存BackToGameData", [
                "backToGame",
                e,
              ]),
            (this.Mla = t),
            !0)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Login",
                3,
                "SetStringValue重复设置参数",
                ["backToGame", e],
                ["key", BACK_TO_GAME_KEY],
              ),
            !1)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Login",
              3,
              "SetObject重复设置参数",
              ["backToGame", e],
              ["key", LOADING_WIDGET_KEY],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 3, "loadingWidget无效", ["backToGame", e]),
        !1);
  }
  RemoveBackToGameData() {
    if (this.Mla) {
      if (!UE.KuroVariableFunctionLibrary.RemoveObject(LOADING_WIDGET_KEY))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Login", 3, "RemoveObject失败", [
              "key",
              LOADING_WIDGET_KEY,
            ]),
          !1
        );
      if (!UE.KuroVariableFunctionLibrary.RemoveStringValue(BACK_TO_GAME_KEY))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Login", 3, "RemoveStringValue失败", [
              "key",
              BACK_TO_GAME_KEY,
            ]),
          !1
        );
      (this.Mla = void 0),
        (this.Sla = 0),
        AudioSystem_1.AudioSystem.SetState(
          "reconnect_auto_login",
          "not_in_auto_login",
        );
    }
    return !0;
  }
  GetBackToGameData() {
    if (this.Mla) return this.Mla;
    var t,
      e = (0, puerts_1.$ref)("");
    if (
      UE.KuroVariableFunctionLibrary.GetStringValue(BACK_TO_GAME_KEY, e) &&
      (e = (0, puerts_1.$unref)(e))?.length
    )
      return (
        (e = JSON.parse(e)),
        (t = (0, puerts_1.$ref)(void 0)),
        UE.KuroVariableFunctionLibrary.GetObject(LOADING_WIDGET_KEY, t) &&
          (e.LoadingWidget = (0, puerts_1.$unref)(t)),
        (this.Mla = e),
        this.Mla
      );
  }
  CheckBackToGameFailCount() {
    return ++this.Sla, this.Sla <= this.TryBackToGameMaxCount;
  }
}
exports.LoginModel = LoginModel;
//# sourceMappingURL=LoginModel.js.map
