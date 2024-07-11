"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoginServerModel =
    exports.RegionAndIpSt =
    exports.LocalPlayerIpLevelData =
    exports.CurrentRecommendInfo =
    exports.LoginPlayerInfo =
    exports.DEFAULTPING =
      void 0);
const UE = require("ue"),
  Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  DEFAULTSERVERREGION = "America",
  CNSERVERNAME = "Default";
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
      (this.DEi = new Map()),
      (this.REi = new Map()),
      (this.OnBeginSuggestServerData = void 0),
      (this.CurrentSelectServerData = void 0),
      (this.CurrentUiSelectSeverData = void 0);
  }
  GetCurrentSelectServerName() {
    let e =
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea");
    return (
      "CN" !== e && this.CurrentSelectServerData
        ? ((e = this.CurrentSelectServerData.Region),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Pay", 28, "海外支付区域", ["area", e]))
        : (e = CNSERVERNAME),
      (e = StringUtils_1.StringUtils.IsEmpty(e) ? CNSERVERNAME : e)
    );
  }
  GetCurrentLoginServerId() {
    var e;
    return ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
      ? this.CurrentSelectServerData
        ? this.CurrentSelectServerData.id
        : ""
      : (e = BaseConfigController_1.BaseConfigController.GetLoginServers()) &&
          0 < e.length
        ? e[0].id
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Login", 28, "当前没有服务器，请检查CDN配置"),
          "");
  }
  IsFirstLogin(e) {
    var r = LocalStorage_1.LocalStorage.GetGlobal(
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
    var r = LocalStorage_1.LocalStorage.GetGlobal(
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
    var o = LocalStorage_1.LocalStorage.GetGlobal(
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
    this.REi.set(e, r);
  }
  RefreshIpPing(r, o) {
    var t = Array.from(this.REi.keys()),
      i = t.length;
    for (let e = 0; e < i; e++)
      t[e].PingUrl === r &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Login", 28, "RefreshIpPing", [t[e].Region, 1e3 * o]),
        this.REi.set(t[e], 1e3 * o));
  }
  GetPlayerLoginInfo(e) {
    return this.DEi.get(e);
  }
  SetPlayerLoginInfo(e, r) {
    this.DEi.set(e, r);
  }
  FindIpServerData(r) {
    var o = Array.from(this.REi.keys()),
      t = o.length;
    for (let e = 0; e < t; e++)
      if (o[e].ip === r.Ip && o[e].Region === r.Region) return o[e];
  }
  InitSuggestData(e, r) {
    this.CurrentSelectServerData = void 0;
    var e = this.UEi(e);
    (this.CurrentSelectServerData = this.FindIpServerData(e)),
      (this.OnBeginSuggestServerData = this.CurrentSelectServerData),
      this.OnBeginSuggestServerData ||
        ((e = BaseConfigController_1.BaseConfigController.GetLoginServers()) &&
          0 < e.length &&
          ((this.OnBeginSuggestServerData = e[0]),
          (this.CurrentSelectServerData = e[0]))),
      r?.(this.CurrentSelectServerData);
  }
  UEi(e) {
    var r = Array.from(this.REi.keys()),
      o = r.length,
      t =
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
          this.AEi(DEFAULTSERVERREGION));
    let i = "";
    if (0 < t.UserInfos.length) {
      var n = t.UserInfos[0].LastOnlineTime,
        a = ((i = t.UserInfos[0].Region), t.UserInfos.length);
      for (let e = 0; e < a; e++)
        t.UserInfos[e].LastOnlineTime > n && (i = t.UserInfos[e].Region);
    }
    if ("" !== i) {
      var s,
        e = this.PEi(i);
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
    var g = t.RecommendRegion;
    for (let e = 0; e < o; e++)
      if (r[e].Region === g) {
        if (this.xEi())
          return (
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Login", 28, "PingHigh", [r[e].Region, r[e].ip]),
            (L = new RegionAndIpSt()).Phrase(r[e].Region, r[e].ip),
            L
          );
        var L = this.REi.get(r[e]);
        if (L && 100 < L)
          return (
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Login",
                28,
                "this.RegionPingMap.get(keys[i]) > 100",
              ),
            this.AEi(DEFAULTSERVERREGION)
          );
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("Login", 28, "返回推荐");
        var l = new RegionAndIpSt();
        return l.Phrase(r[e].Region, r[e].ip), l;
      }
    return this.AEi(DEFAULTSERVERREGION);
  }
  PEi(r) {
    var o = Array.from(this.REi.keys()),
      t = o.length;
    for (let e = 0; e < t; e++) if (o[e].Region === r) return o[e];
  }
  xEi() {
    var r = Array.from(this.REi.keys()),
      o = r.length;
    for (let e = 0; e < o; e++) {
      var t = this.REi.get(r[e]);
      if (t && t < 100) return !1;
    }
    return !0;
  }
  AEi(r) {
    var o = Array.from(this.REi.keys()),
      t = o.length;
    let i = exports.DEFAULTPING,
      n = "";
    var a = new RegionAndIpSt();
    for (let e = 0; e < t; e++)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Login", 28, "区域ping", [
          "ping",
          this.REi.get(o[e]).toString(),
        ]),
        i > this.REi.get(o[e]) &&
          ((i = this.REi.get(o[e])),
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
    var o = this.GetPlayerLoginInfo(e);
    if (o) {
      var t = o.UserInfos?.length ?? 0;
      for (let e = 0; e < t; e++)
        if (o.UserInfos[e]?.Region === r) return o.UserInfos[e].Level;
      return 0;
    }
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Login", 28, "找不到ServerLevel", ["region", r]),
      this.wEi(e, r)
    );
  }
  wEi(e, r) {
    var o = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData,
    );
    if (o?.has(e)) {
      var t = o.get(e),
        i = t.length;
      for (let e = 0; e < i; e++) if (t[e].Region === r) return t[e].Level;
    }
    return 0;
  }
  GetCurrentArea() {
    var e = UE.KuroStaticLibrary.GetCultureRegion().split("-"),
      r = e.length;
    return 1 < r ? e[r - 1] : "US";
  }
  SaveLocalRegionLevel(e, r, o) {
    var t = LocalStorage_1.LocalStorage.GetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData,
    );
    const i = new Map();
    t?.forEach((e, r) => {
      i.set(r, e);
    });
    let n = i.get(e);
    var a = (n = n || new Array()).length;
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
//# sourceMappingURL=LoginServerModel.js.map
