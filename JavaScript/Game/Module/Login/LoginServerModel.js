"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginServerModel =
    exports.RegionAndIpSt =
    exports.LocalPlayerIpLevelData =
    exports.CurrentRecommendInfo =
    exports.LoginPlayerInfo =
    exports.DEFAULTPING =
      void 0);
const UE = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const DEFAULTSERVERREGION = "America";
const CNSERVERNAME = "Default";
exports.DEFAULTPING = 9999;
class LoginPlayerInfo extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments),
      (this.Code = 0),
      (this.SdkLoginCode = 0),
      (this.UserId = ""),
      (this.UserInfos = void 0),
      (this.RecommendRegion = "");
  }
}
exports.LoginPlayerInfo = LoginPlayerInfo;
class UserRegionInfo {
  constructor() {
    (this.Region = ""), (this.Level = 0), (this.LastOnlineTime = -0);
  }
}
class CurrentRecommendInfo {
  constructor() {
    (this.Index = 0), (this.Ip = "");
  }
}
exports.CurrentRecommendInfo = CurrentRecommendInfo;
class LocalPlayerIpLevelData {
  constructor() {
    (this.Region = ""), (this.Level = 0);
  }
}
exports.LocalPlayerIpLevelData = LocalPlayerIpLevelData;
class RegionAndIpSt {
  constructor() {
    (this.Region = ""), (this.Ip = "");
  }
  Phrase(e, r) {
    (this.Region = e), (this.Ip = r);
  }
}
exports.RegionAndIpSt = RegionAndIpSt;
class LoginServerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.DMi = new Map()),
      (this.RMi = new Map()),
      (this.OnBeginSuggestServerData = void 0),
      (this.CurrentSelectServerData = void 0),
      (this.CurrentUiSelectSeverData = void 0);
  }
  GetCurrentSelectServerName() {
    let e =
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea");
    return (
      e !== "CN" && this.CurrentSelectServerData
        ? ((e = this.CurrentSelectServerData.Region),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Pay", 28, "海外支付区域", ["area", e]))
        : (e = CNSERVERNAME),
      (e = StringUtils_1.StringUtils.IsEmpty(e) ? CNSERVERNAME : e)
    );
  }
  GetCurrentLoginServerId() {
    let e;
    return ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
      ? this.CurrentSelectServerData
        ? this.CurrentSelectServerData.id
        : ""
      : (e = BaseConfigController_1.BaseConfigController.GetLoginServers()) &&
          e.length > 0
        ? e[0].id
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 28, "当前没有服务器，请检查CDN配置"),
          "");
  }
  IsFirstLogin(e) {
    const r = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData,
    );
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Login",
          28,
          "IsFirstLogin",
          ["IsFirstLogin", r?.get(e)],
          ["sdkId", e],
        ),
      !r?.has(e)
    );
  }
  LastTimeLoginData(e) {
    const r = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData,
    );
    if (r?.has(e))
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Login",
            28,
            "LastTimeLoginData",
            ["result?.get(sdkUid).Ip", r?.get(e).Ip],
            ["sdkId", e],
            ["result?.get(sdkUid).Region", r?.get(e).Region],
          ),
        r.get(e)
      );
  }
  SaveFirstLogin(e, r) {
    let o = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData,
    );
    const t = new Map();
    o?.forEach((e, r) => {
      t.set(r, e);
    });
    o = new RegionAndIpSt();
    o.Phrase(r.Region, r.ip),
      t.set(e, o),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData,
        t,
      );
  }
  AddRegionPingValue(e, r) {
    this.RMi.set(e, r);
  }
  RefreshIpPing(r, o) {
    const t = Array.from(this.RMi.keys());
    const i = t.length;
    for (let e = 0; e < i; e++)
      t[e].PingUrl === r &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Login", 28, "RefreshIpPing", [t[e].Region, 1e3 * o]),
        this.RMi.set(t[e], 1e3 * o));
  }
  GetPlayerLoginInfo(e) {
    return this.DMi.get(e);
  }
  SetPlayerLoginInfo(e, r) {
    this.DMi.set(e, r);
  }
  FindIpServerData(r) {
    const o = Array.from(this.RMi.keys());
    const t = o.length;
    for (let e = 0; e < t; e++)
      if (o[e].ip === r.Ip && o[e].Region === r.Region) return o[e];
  }
  InitSuggestData(e, r) {
    this.CurrentSelectServerData = void 0;
    var e = this.UMi(e);
    (this.CurrentSelectServerData = this.FindIpServerData(e)),
      (this.OnBeginSuggestServerData = this.CurrentSelectServerData),
      this.OnBeginSuggestServerData ||
        ((e = BaseConfigController_1.BaseConfigController.GetLoginServers()) &&
          e.length > 0 &&
          ((this.OnBeginSuggestServerData = e[0]),
          (this.CurrentSelectServerData = e[0]))),
      r?.(this.CurrentSelectServerData);
  }
  UMi(e) {
    const r = Array.from(this.RMi.keys());
    const o = r.length;
    const t =
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Login", 28, "GetSuggestServerData"),
      this.GetPlayerLoginInfo(e));
    if (!t)
      return (e = this.LastTimeLoginData(e))
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Login", 28, "没有服务器信息拿本地登录信息", [
              "data",
              e.Region,
            ]),
          e)
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Login", 28, "没有拿到服务器推荐返回低Ping"),
          this.AMi(DEFAULTSERVERREGION));
    let i = "";
    if (t.UserInfos.length > 0) {
      const n = t.UserInfos[0].LastOnlineTime;
      const a = ((i = t.UserInfos[0].Region), t.UserInfos.length);
      for (let e = 0; e < a; e++)
        t.UserInfos[e].LastOnlineTime > n && (i = t.UserInfos[e].Region);
    }
    if (i !== "") {
      let s;
      var e = this.PMi(i);
      if (e)
        return (
          (s = new RegionAndIpSt()).Phrase(e.Region, e.ip),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Login", 28, "recommendRegion", [
              "recommendRegion",
              i,
            ]),
          s
        );
    }
    const g = t.RecommendRegion;
    for (let e = 0; e < o; e++)
      if (r[e].Region === g) {
        if (this.xMi())
          return (
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Login", 28, "PingHigh", [r[e].Region, r[e].ip]),
            (L = new RegionAndIpSt()).Phrase(r[e].Region, r[e].ip),
            L
          );
        var L = this.RMi.get(r[e]);
        if (L && L > 100)
          return (
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Login",
                28,
                "this.RegionPingMap.get(keys[i]) > 100",
              ),
            this.AMi(DEFAULTSERVERREGION)
          );
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Login", 28, "返回推荐");
        const l = new RegionAndIpSt();
        return l.Phrase(r[e].Region, r[e].ip), l;
      }
    return this.AMi(DEFAULTSERVERREGION);
  }
  PMi(r) {
    const o = Array.from(this.RMi.keys());
    const t = o.length;
    for (let e = 0; e < t; e++) if (o[e].Region === r) return o[e];
  }
  xMi() {
    const r = Array.from(this.RMi.keys());
    const o = r.length;
    for (let e = 0; e < o; e++) {
      const t = this.RMi.get(r[e]);
      if (t && t < 100) return !1;
    }
    return !0;
  }
  AMi(r) {
    const o = Array.from(this.RMi.keys());
    const t = o.length;
    let i = exports.DEFAULTPING;
    let n = "";
    const a = new RegionAndIpSt();
    for (let e = 0; e < t; e++)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Login", 28, "区域ping", [
          "ping",
          this.RMi.get(o[e]).toString(),
        ]),
        i > this.RMi.get(o[e]) &&
          ((i = this.RMi.get(o[e])),
          a.Phrase(o[e].Region, o[e].ip),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("Login", 28, "尝试选择低Ping", [o[e].Region, i]),
        o[e].Region === r && (n = o[e].ip);
    return (
      StringUtils_1.StringUtils.IsEmpty(a.Ip) &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Login", 28, "找不到低ping，用默认服务器"),
        a.Phrase(r, n)),
      a
    );
  }
  GetLoginLevel(e, r) {
    const o = this.GetPlayerLoginInfo(e);
    if (o) {
      const t = o.UserInfos?.length ?? 0;
      for (let e = 0; e < t; e++)
        if (o.UserInfos[e]?.Region === r) return o.UserInfos[e].Level;
      return 0;
    }
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Login", 28, "找不到ServerLevel", ["region", r]),
      this.wMi(e, r)
    );
  }
  wMi(e, r) {
    const o = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData,
    );
    if (o?.has(e)) {
      const t = o.get(e);
      const i = t.length;
      for (let e = 0; e < i; e++) if (t[e].Region === r) return t[e].Level;
    }
    return 0;
  }
  GetCurrentArea() {
    const e = UE.KuroStaticLibrary.GetCultureRegion().split("-");
    const r = e.length;
    return r > 1 ? e[r - 1] : "US";
  }
  SaveLocalRegionLevel(e, r, o) {
    let t = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData,
    );
    const i = new Map();
    t?.forEach((e, r) => {
      i.set(r, e);
    });
    let n = i.get(e);
    const a = (n = n || new Array()).length;
    let s = !1;
    for (let e = 0; e < a; e++)
      if (n[e].Region === r) {
        (n[e].Level = o), (s = !0);
        break;
      }
    s ||
      (((t = new LocalPlayerIpLevelData()).Region = r),
      (t.Level = o),
      n.push(t)),
      i.set(e, n),
      LocalStorage_1.LocalStorage.SetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData,
        i,
      );
  }
}
exports.LoginServerModel = LoginServerModel;
// # sourceMappingURL=LoginServerModel.js.map
