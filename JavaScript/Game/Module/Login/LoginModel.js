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
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager");
const LoginDefine_1 = require("./Data/LoginDefine");
const Heartbeat_1 = require("./Heartbeat");
const HeartbeatDefine_1 = require("./HeartbeatDefine");
(exports.STREAM = "Stream"),
  (exports.STREAM_MAINLINE = "mainline"),
  (exports.DEFAULT_SERVER_IP = "127.0.0.1");
class ReconnectInfo {
  constructor(e, t, i) {
    (this.Token = ""),
      (this.Host = ""),
      (this.Port = 0),
      (this.Token = e),
      (this.Host = t),
      (this.Port = i);
  }
}
exports.ReconnectInfo = ReconnectInfo;
class MapConfig {
  constructor(e, t) {
    (this.MapId = 0), (this.MapName = ""), (this.MapId = e), (this.MapName = t);
  }
}
class ServerData {
  constructor(e) {
    (this.Config = new ServerConfig()), e && (this.Config = e);
  }
  SetIp(e) {
    return (this.Config.Ip = e), this;
  }
}
exports.ServerData = ServerData;
class ServerConfig extends Json_1.JsonObjBase {
  constructor(e = "", t = "", i = "", o = 0) {
    super(),
      (this.Ip = ""),
      (this.Port = ""),
      (this.Name = ""),
      (this.Order = 0),
      (this.Ip = e),
      (this.Port = t),
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
  Phrase(e) {
    (this.WhiteLists = e.whiteList),
      (this.BeginTime = e.startTimeMs / 1e3),
      (this.EndTime = e.endTimeMs / 1e3),
      (this.Title = e.title),
      (this.content = e.content);
  }
}
exports.LoginNotice = LoginNotice;
class SdkLoginConfig {
  constructor(e = "", t = "", i = "") {
    (this.Uid = ""),
      (this.UserName = ""),
      (this.Token = ""),
      (this.Uid = e),
      (this.UserName = t),
      (this.Token = i);
  }
}
class LoginModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.BornMode = 1),
      (this.BornLocation = void 0),
      (this.Platform = ""),
      (this.Qvi = void 0),
      (this.Xvi = void 0),
      (this.$vi = void 0),
      (this.Yvi = void 0),
      (this.RBn = void 0),
      (this.XK = LoginDefine_1.ELoginStatus.Init),
      (this.Jvi = void 0),
      (this.zvi = !1),
      (this.Zvi = void 0),
      (this.M8e = ""),
      (this.eMi = void 0),
      (this.tMi = !1),
      (this.SmokeTestReady = !1),
      (this.iMi = 0),
      (this.oMi = new Map()),
      (this.rMi = void 0),
      (this.nMi = !1),
      (this.sMi = -0),
      (this.aMi = 0),
      (this.hMi = 0),
      (this.LoginNotice = void 0),
      (this.lMi = 0),
      (this._Mi = 0),
      (this.uMi = 0),
      (this.g9s = void 0),
      (this.f9s = void 0),
      (this.p9s = void 0),
      (this.cMi = void 0),
      (this.mMi = 10),
      (this.dMi = void 0),
      (this.CMi = void 0),
      (this.gMi = void 0),
      (this.fMi = void 0),
      (this.AutoLoginTimerIdInternal = void 0);
  }
  get pMi() {
    return LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.LoginFailCount,
      0,
    );
  }
  set pMi(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.LoginFailCount,
      e,
    );
  }
  get vMi() {
    return LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.NextLoginTime,
      0,
    );
  }
  set vMi(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.NextLoginTime,
      e,
    );
  }
  get MMi() {
    return LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.ResetLoginFailCountTime,
      0,
    );
  }
  set MMi(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.ResetLoginFailCountTime,
      e,
    );
  }
  get PublicJsonVersion() {
    return this.lMi;
  }
  set PublicJsonVersion(e) {
    this.lMi = e;
  }
  get PublicMiscVersion() {
    return this._Mi;
  }
  set PublicMiscVersion(e) {
    this._Mi = e;
  }
  get PublicUniverseEditorVersion() {
    return this.uMi;
  }
  set PublicUniverseEditorVersion(e) {
    this.uMi = e;
  }
  get LauncherVersion() {
    return this.g9s;
  }
  set LauncherVersion(e) {
    this.g9s = e;
  }
  get ResourceVersion() {
    return this.f9s;
  }
  set ResourceVersion(e) {
    this.f9s = e;
  }
  get VerifyConfigVersionHandle() {
    return this.p9s;
  }
  set VerifyConfigVersionHandle(e) {
    this.p9s = e;
  }
  OnInit() {
    return (
      (this.BornMode = 1),
      (this.BornLocation = new Protocol_1.Aki.Protocol.VBs()),
      (this.XK = LoginDefine_1.ELoginStatus.Init),
      (this.hMi = 0),
      this.InitRecentlyAccountList(),
      !0
    );
  }
  OnClear() {
    return (
      (this.XK = LoginDefine_1.ELoginStatus.Init),
      (this.hMi = 0),
      (this.Qvi = []),
      (this.Xvi = []),
      (this.$vi = []),
      (this.Yvi = []),
      (this.XK = LoginDefine_1.ELoginStatus.Init),
      (this.zvi = !1),
      (this.M8e = ""),
      (this.eMi = void 0),
      (this.tMi = !1),
      (this.Jvi = void 0),
      (this.lMi = 0),
      (this._Mi = 0),
      (this.uMi = 0),
      (this.g9s = void 0),
      (this.f9s = void 0),
      (this.iMi = 0),
      this.oMi.clear(),
      !0
    );
  }
  InitConfig() {
    if (!this.Qvi || !this.Xvi || !this.$vi) {
      (this.Qvi = new Array()),
        (this.Xvi = new Array()),
        (this.$vi = new Array()),
        (this.Yvi = new Array());
      const e =
        ConfigManager_1.ConfigManager.LoginConfig.GetAllInstanceDungeon();
      if (e)
        for (const t of e) {
          let e =
            ConfigManager_1.ConfigManager.LoginConfig.GetInstanceDungeonNameById(
              t.MapName,
            );
          void 0 === e && (e = ""), this.Qvi.push(new MapConfig(t.Id, e));
        }
    }
  }
  AddServerInfoByCdn() {
    if (this.$vi) {
      const e = BaseConfigController_1.BaseConfigController.GetLoginServers();
      if (e) {
        e.length <= 0 &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Login", 11, "CDN的服务器数据列表为空");
        for (const i of e) {
          const t = new ServerConfig(
            i.ip,
            LoginDefine_1.DEFAULTPORT,
            i.name,
            0,
          );
          this.$vi.push(t), this.Yvi.push(new ServerData(t));
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Login", 11, "拿不到CDN返回的服务器数据");
    }
  }
  AddExtraServer() {
    const e =
      UE.BlueprintPathsLibrary.ProjectConfigDir() + "/ServerConfig.json";
    const t = UE.KuroStaticLibrary.LoadFileToStringArray(e);
    if (!(t.Num() <= 0))
      for (let e = 0; e < t.Num(); ++e) {
        const i = Json_1.Json.Parse(t.Get(e));
        this.$vi.push(i);
      }
  }
  AddServerInfos(e) {
    if (this.$vi) {
      const t = Info_1.Info.IsPlayInEditor;
      for (const i of e)
        ((t && i.editor) || (!t && i.package)) &&
          this.$vi.push(
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
    if (this.$vi && GlobalData_1.GlobalData.World) {
      const e = DataTableUtil_1.DataTableUtil.GetAllDataTableRow(14);
      if (e)
        for (const t of e)
          this.$vi.push(new ServerConfig(t.IP, t.Port, t.Name, t.Order));
    }
  }
  CleanConfig() {
    (this.Qvi = void 0),
      (this.Xvi = void 0),
      (this.$vi = void 0),
      (this.rMi = void 0),
      (this.Yvi = void 0);
  }
  SetCreatePlayerTime(e) {
    this.sMi = e;
  }
  GetCreatePlayerTime() {
    return this.sMi;
  }
  SetCreatePlayerId(e) {
    this.aMi = e;
  }
  GetCreatePlayerId() {
    return this.aMi;
  }
  GetServerIp() {
    const e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.ServerIp,
      "-1",
    );
    return e === "-1" ? void 0 : e;
  }
  SetServerIp(e, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Login",
        9,
        "保存服务器IP",
        ["serverIp", e],
        ["reason", t],
      ),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.ServerIp,
        e,
      );
  }
  TrySetCustomServerPort(e, t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Login",
        9,
        "自定义服务器Port",
        ["port", e],
        ["reason", t],
      ),
      (this.RBn = e);
  }
  TryGetRealServerPort() {
    const e = this.GetCustomServerPort();
    return e ? ((this.RBn = void 0), e) : this.GetServerPort();
  }
  GetCustomServerPort() {
    return this.RBn;
  }
  GetServerPort() {
    const e = "5500";
    let t = UE.KismetSystemLibrary.GetCommandLine().split(" ");
    const i = t.indexOf("-LocalGameServerStartPort");
    return i === -1 ||
      i + 1 >= t.length ||
      ((t = parseInt(t[i + 1], 10)), isNaN(t))
      ? e
      : (t + 1).toString();
  }
  GetServerName() {
    const e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.ServerName,
      "-1",
    );
    return e === "-1" ? void 0 : e;
  }
  SetServerName(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.ServerName,
      e,
    ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 28, "当前选择服务器Name", ["serverId", e]);
  }
  GetServerId() {
    return LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.ServerId,
      "0",
    );
  }
  SetServerId(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.ServerId,
      e,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSetLoginServerId,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Login", 28, "当前选择服务器Id", ["serverId", e]);
  }
  GetSingleMapId() {
    const e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SingleMapId,
      -1,
    );
    return e === -1 ? void 0 : e;
  }
  SetSingleMapId(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Login", 9, "保存单人副本id", ["singleMapId", e]),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SingleMapId,
        e,
      );
  }
  GetMultiMapId() {
    const e = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.MultiMapId,
      -1,
    );
    return e === -1 ? void 0 : e;
  }
  SetMultiMapId(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Login", 9, "保存多人副本id", ["multiMapId", e]),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.MultiMapId,
        e,
      );
  }
  GetAccount() {
    return LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.Account,
      "",
    );
  }
  SetAccount(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.Account,
      e,
    ),
      this.AddRecentlyAccount(e),
      ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfo(e);
  }
  GetSelectBoxActive() {
    return (
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SelectBoxActive,
        !0,
      ) ?? !1
    );
  }
  SetSelectBoxActive(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SelectBoxActive,
      e,
    );
  }
  GetAutoOpenLoginView() {
    return this.zvi;
  }
  SetAutoOpenLoginView(e) {
    this.zvi = e;
  }
  GetLoginStatus() {
    return this.XK;
  }
  GetLastFailStatus() {
    return this.Jvi;
  }
  SetLoginStatus(e, t = 0) {
    e !== this.XK &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Login",
          9,
          "登录状态变化",
          ["Before", LoginDefine_1.ELoginStatus[this.XK]],
          ["After", LoginDefine_1.ELoginStatus[e]],
        ),
      this.XK !== LoginDefine_1.ELoginStatus.Init &&
      e === LoginDefine_1.ELoginStatus.Init
        ? (Log_1.Log.CheckError() && Log_1.Log.Error("Login", 22, "登录失败"),
          Heartbeat_1.Heartbeat.StopHeartBeat(
            HeartbeatDefine_1.EStopHeartbeat.LoginStatusInit,
          ),
          (this.Jvi = this.XK))
        : (this.Jvi = void 0),
      (this.XK = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LoginStatusChange,
      ));
  }
  IsLoginStatus(e) {
    return this.XK === e;
  }
  SetSdkLoginState(e) {
    this.hMi = e;
  }
  GetSdkLoginState() {
    return this.hMi;
  }
  IsSdkLoggedIn() {
    return this.hMi === 1;
  }
  GetSingleMapList() {
    return this.Qvi;
  }
  GetSingleMapIp(e) {
    if (e < this.Qvi.length) return this.Qvi[e].MapId;
  }
  GetServerInfoList() {
    return this.$vi?.sort((e, t) => e.Order - t.Order), this.$vi;
  }
  GetServerDataList() {
    return this.Yvi;
  }
  GetServerInfo(e) {
    if (e < this.$vi.length) return this.$vi[e];
  }
  HasReconnectInfo() {
    return void 0 !== this.Zvi;
  }
  SetReconnectInfo(e, t, i) {
    this.Zvi = new ReconnectInfo(e, t, i);
  }
  SetReconnectToken(e) {
    this.Zvi && (this.Zvi.Token = e);
  }
  GetReconnectToken() {
    if (void 0 !== this.Zvi) return this.Zvi.Token;
  }
  GetReconnectHost() {
    if (void 0 !== this.Zvi) return this.Zvi.Host;
  }
  GetReconnectPort() {
    if (void 0 !== this.Zvi) return this.Zvi.Port;
  }
  GetPlayerName() {
    return this.M8e;
  }
  SetPlayerName(e) {
    this.M8e = e;
  }
  GetPlayerSex() {
    return this.eMi;
  }
  SetPlayerSex(e) {
    this.eMi = e;
  }
  IsPlayerSexValid(e) {
    let t = e;
    return (
      (t = void 0 === e ? this.eMi : t) === LoginDefine_1.ELoginSex.Boy ||
      t === LoginDefine_1.ELoginSex.Girl
    );
  }
  GetHasCharacter() {
    return this.tMi;
  }
  SetHasCharacter(e) {
    this.tMi = e;
  }
  CleanCreateData() {
    (this.tMi = !1), (this.M8e = ""), (this.eMi = void 0);
  }
  SetRpcHttp(e, t) {
    const i = ++this.iMi;
    t = TimerSystem_1.TimerSystem.Delay(() => {
      this.IsLoginStatus(LoginDefine_1.ELoginStatus.LoginHttp) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Login", 9, "http请求超时", ["rpcId", i]),
        this.oMi.delete(i),
        e());
    }, t);
    return this.oMi.set(i, t), i;
  }
  CleanRpcHttp(e) {
    const t = this.oMi.get(e);
    return !!t && (TimerSystem_1.TimerSystem.Remove(t), this.oMi.delete(e), !0);
  }
  AddLoginFailCount() {
    this.pMi === 0 &&
      ((e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime()),
      this.SMi(e)),
      this.SetLoginFailCount(this.pMi + 1);
    var e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(
      this.pMi,
    );
    this.EMi(e);
  }
  IsThisTimeCanLogin() {
    let e = 0.001 * Date.now();
    if (this.pMi > 0) {
      var t = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime();
      if (e >= this.MMi + t)
        return (
          this.CleanLoginFailCount(
            LoginDefine_1.ECleanFailCountWay.RefreshTime,
          ),
          !0
        );
    }
    t =
      this.vMi +
      ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(this.pMi);
    return (
      t <= e ||
      ((e = new Date(1e3 * t)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Login", 9, "下次可登录的时间戳", [
          "NextLoginTime",
          TimeUtil_1.TimeUtil.DateFormat(e),
        ]),
      !1)
    );
  }
  CleanLoginFailCount(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Login", 9, "清空登录失败信息", [
        "way",
        LoginDefine_1.ECleanFailCountWay[e],
      ]),
      this.SetLoginFailCount(0, !1),
      this.EMi(0, !1),
      this.SMi(0, !1);
  }
  SetLoginFailCount(e, t = !0) {
    (this.pMi = e),
      t &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Login", 9, "登录失败次数增加", [
          "LoginFailCount",
          this.pMi,
        ]);
  }
  EMi(e, t = !0) {
    (this.vMi = 0.001 * Date.now()),
      t &&
        ((t = new Date(1e3 * (this.vMi + e))), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Login", 9, "设置下次可登录时间", [
          "NextLoginTime",
          TimeUtil_1.TimeUtil.DateFormat(t),
        ]);
  }
  SMi(e, t = !0) {
    (this.MMi = 0.001 * Date.now()),
      t &&
        ((t = new Date(1e3 * (this.MMi + e))), Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Login", 9, "设置下次重置登录失败时间", [
          "ResetLoginFailCountTime",
          TimeUtil_1.TimeUtil.DateFormat(t),
        ]);
  }
  FixLoginFailInfo() {
    let e;
    const t = 0.001 * Date.now();
    this.MMi > t &&
      ((e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime()),
      this.SMi(e)),
      this.vMi > t &&
        ((e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(
          this.pMi,
        )),
        this.EMi(e));
  }
  SetSdkLoginConfig(e, t, i) {
    this.rMi = new SdkLoginConfig(e, t, i);
  }
  GetSdkLoginConfig() {
    return this.rMi;
  }
  set LogoutNotify(e) {
    this.cMi = e;
  }
  get LogoutNotify() {
    return this.cMi;
  }
  SetTodayFirstTimeLogin(e) {
    this.nMi = e;
  }
  GetTodayFirstTimeLogin() {
    return this.nMi;
  }
  GetLastLoginTime() {
    return LocalStorage_1.LocalStorage.GetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.LoginTime,
      0,
    );
  }
  SetLastLoginTime(e) {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey.LoginTime,
      e,
    );
  }
  AddRecentlyAccount(i) {
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      for (this.dMi || (this.dMi = []); this.dMi.length >= this.mMi; )
        this.dMi.splice(0, 1);
      let t = -1;
      for (let e = 0; e < this.dMi.length; e++)
        if (this.dMi[e] === i) {
          t = e;
          break;
        }
      t !== -1 && this.dMi.splice(t, 1), this.dMi.push(i);
    }
  }
  InitRecentlyAccountList() {
    (this.dMi = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyAccountList,
    )),
      this.dMi || (this.dMi = []);
  }
  GetRecentlyAccountList() {
    return this.dMi;
  }
  SaveRecentlyAccountList() {
    this.dMi &&
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyAccountList,
        this.dMi,
      );
  }
  get LoginTraceId() {
    return this.CMi;
  }
  set LoginTraceId(e) {
    this.CMi = e;
  }
  CreateLoginPromise() {
    this.gMi = new CustomPromise_1.CustomPromise();
  }
  FinishLoginPromise() {
    this.gMi?.SetResult(void 0);
  }
  async WaitLoginPromise() {
    await this.gMi?.Promise, (this.gMi = void 0);
  }
  HasLoginPromise() {
    return void 0 !== this.gMi;
  }
  CreateAutoLoginPromise() {
    this.fMi = new CustomPromise_1.CustomPromise();
  }
  ClearAutoLoginPromise() {
    this.fMi = void 0;
  }
  FinishAutoLoginPromise(e) {
    this.fMi.SetResult(e);
  }
  async WaitAutoLoginPromise() {
    const e = await this.fMi?.Promise;
    return (this.fMi = void 0), e;
  }
  HasAutoLoginPromise() {
    return void 0 !== this.fMi;
  }
  get AutoLoginTimerId() {
    return this.AutoLoginTimerIdInternal;
  }
  set AutoLoginTimerId(e) {
    this.AutoLoginTimerIdInternal = e;
  }
  ClearAutoLoginTimerId() {
    void 0 !== this.AutoLoginTimerId &&
      (TimerSystem_1.TimerSystem.Remove(this.AutoLoginTimerId),
      (this.AutoLoginTimerId = void 0));
  }
}
exports.LoginModel = LoginModel;
// # sourceMappingURL=LoginModel.js.map
