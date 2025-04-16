"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherStorageLib =
    exports.ELauncherStorageDeviceKey =
    exports.ELauncherStorageGlobalKey =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherLog_1 = require("./LauncherLog");
var ELauncherStorageGlobalKey, ELauncherStorageDeviceKey;
!(function (e) {
  (e[(e.PlayMenuInfo = 0)] = "PlayMenuInfo"),
    (e[(e.MenuData = 1)] = "MenuData"),
    (e[(e.NotFirstTimeOpenPush = 2)] = "NotFirstTimeOpenPush"),
    (e[(e.CachePushOpenState = 3)] = "CachePushOpenState"),
    (e[(e.AndroidNotFirstTimeOpenPush = 4)] = "AndroidNotFirstTimeOpenPush"),
    (e[(e.SdkProtocolAgreeState = 5)] = "SdkProtocolAgreeState"),
    (e[(e.UserProtocolAgreeState = 6)] = "UserProtocolAgreeState"),
    (e[(e.PlayStationFriendOnly = 7)] = "PlayStationFriendOnly"),
    (e[(e.MasterVolume = 8)] = "MasterVolume"),
    (e[(e.VoiceVolume = 9)] = "VoiceVolume"),
    (e[(e.MusicVolume = 10)] = "MusicVolume"),
    (e[(e.SFXVolume = 11)] = "SFXVolume"),
    (e[(e.AMBVolume = 12)] = "AMBVolume"),
    (e[(e.UIVolume = 13)] = "UIVolume"),
    (e[(e.PcResolutionIndex = 14)] = "PcResolutionIndex"),
    (e[(e.TextLanguage = 15)] = "TextLanguage"),
    (e[(e.VoiceLanguage = 16)] = "VoiceLanguage"),
    (e[(e.HasLocalGameSettings = 17)] = "HasLocalGameSettings"),
    (e[(e.RecentlyLoginUID = 18)] = "RecentlyLoginUID");
})(
  (ELauncherStorageGlobalKey =
    exports.ELauncherStorageGlobalKey ||
    (exports.ELauncherStorageGlobalKey = {})),
),
  (function (e) {
    (e[(e.CacheP4Version = 0)] = "CacheP4Version"),
      (e[(e.PatchP4Version = 1)] = "PatchP4Version"),
      (e[(e.PatchVersion = 2)] = "PatchVersion"),
      (e[(e.LauncherPatchVersion = 3)] = "LauncherPatchVersion"),
      (e[(e.RemoteVersionUpdate = 4)] = "RemoteVersionUpdate"),
      (e[(e.EntryModifyTime = 5)] = "EntryModifyTime"),
      (e[(e.PreDownloadUpdateTime = 6)] = "PreDownloadUpdateTime"),
      (e[(e.PreDownloadVerCfgUpdateTime = 7)] = "PreDownloadVerCfgUpdateTime"),
      (e[(e.PreDownloadConfig = 8)] = "PreDownloadConfig"),
      (e[(e.PreDownloadRecord = 9)] = "PreDownloadRecord"),
      (e[(e.RemoteVideoCfgUpdateTime = 10)] = "RemoteVideoCfgUpdateTime"),
      (e[(e.PreDownloadVideoCfgUpdateTime = 11)] =
        "PreDownloadVideoCfgUpdateTime"),
      (e[(e.PreDownloadVideoConfig = 12)] = "PreDownloadVideoConfig"),
      (e[(e.UserSelectedVideoUpdate = 13)] = "UserSelectedVideoUpdate"),
      (e[(e.IsNewUserSelected = 14)] = "IsNewUserSelected");
  })(
    (ELauncherStorageDeviceKey =
      exports.ELauncherStorageDeviceKey ||
      (exports.ELauncherStorageDeviceKey = {})),
  );
const DBPATH = "LocalStorage/LocalStorage",
  DEVICEDBPATH = "DeviceSaved/DeviceStorage",
  DBSUFFIX = ".db",
  TABLENAME = "LocalStorage",
  DBNUM = 10,
  USE_THREAD = !1,
  SQLITE_ERR = -1,
  SQLITE_NO_DATA = 1,
  USE_JOURNAL_MODE = 2;
function getJournalMode(e) {
  switch (e) {
    case 0:
      return "PRAGMA journal_mode=DELETE";
    case 1:
      return "PRAGMA journal_mode=TRUNCATE";
    case 2:
      return "PRAGMA journal_mode=PERSIST";
    case 3:
      return "PRAGMA journal_mode=MEMORY";
    case 4:
      return "PRAGMA journal_mode=OFF";
  }
}
class LauncherStorageLib {
  static LockDbPath(e, r) {
    LauncherLog_1.LauncherLog.Info(
      "[LauncherStorageLib][LockDbPath] 设置锁",
      ["isLockDbPath", e],
      ["reason", r],
    ),
      (this.qwc = e);
  }
  static Initialize() {
    this.gU ||
      ((this.gU = !0), LauncherStorageLib.cde(), LauncherStorageLib.mde());
  }
  static Destroy() {}
  static GetGlobal(e, r = void 0) {
    e = LauncherStorageLib.gde(e);
    if (e) {
      var e = LauncherStorageLib.fde(e, !1);
      if (e[0]) return (e = e[1]) ? LauncherStorageLib.pde(e) : r;
    }
  }
  static SetGlobal(e, r) {
    e = LauncherStorageLib.gde(e);
    return (
      !!e &&
      (null == r
        ? (LauncherLog_1.LauncherLog.Error(
            "value值非法",
            ["keyName", e],
            ["value", r],
          ),
          !1)
        : !!(r = LauncherStorageLib.O8(r)) && LauncherStorageLib.vde(e, r, !1))
    );
  }
  static DeleteGlobal(e) {
    e = LauncherStorageLib.gde(e);
    return !!e && LauncherStorageLib.Mde(e, !1);
  }
  static GetDeviceSaved(e, r = void 0) {
    e = LauncherStorageLib.O4l(e);
    if (e) {
      var e = LauncherStorageLib.fde(e, !0);
      if (e[0]) return (e = e[1]) ? LauncherStorageLib.pde(e) : r;
    }
  }
  static SetDeviceSaved(e, r) {
    e = LauncherStorageLib.O4l(e);
    return (
      !!e &&
      (null == r
        ? (LauncherLog_1.LauncherLog.Error(
            "value值非法",
            ["keyName", e],
            ["value", r],
          ),
          !1)
        : !!(r = LauncherStorageLib.O8(r)) && LauncherStorageLib.vde(e, r, !0))
    );
  }
  static DeleteDeviceSaved(e) {
    e = LauncherStorageLib.O4l(e);
    return !!e && LauncherStorageLib.Mde(e, !0);
  }
  static GetDeviceSavedString(e, r = void 0) {
    if (e) {
      var a = LauncherStorageLib.fde(e, !0);
      if (a[0]) return (a = a[1]) ? LauncherStorageLib.pde(a) : r;
    } else LauncherLog_1.LauncherLog.Error("key值非法", ["key", e]);
  }
  static SetDeviceSavedString(e, r) {
    return e
      ? null == r
        ? (LauncherLog_1.LauncherLog.Error(
            "value值非法",
            ["key", e],
            ["value", r],
          ),
          !1)
        : !!(r = LauncherStorageLib.O8(r)) && LauncherStorageLib.vde(e, r, !0)
      : (LauncherLog_1.LauncherLog.Error("key值非法", ["key", e]), !1);
  }
  static DeleteDeviceSavedString(e) {
    return e
      ? LauncherStorageLib.Mde(e, !0)
      : (LauncherLog_1.LauncherLog.Error("key值非法", ["key", e]), !1);
  }
  static cde() {
    var e = UE.KuroLauncherLibrary.GameSavedDir();
    LauncherStorageLib.Sde || (LauncherStorageLib.Sde = e + DBPATH + DBSUFFIX),
      LauncherStorageLib.F4l ||
        (LauncherStorageLib.F4l = e + DEVICEDBPATH + DBSUFFIX);
  }
  static mde() {
    if (!this.qwc) {
      let r = LauncherStorageLib.Sde,
        a =
          (LauncherLog_1.LauncherLog.Info("OpenSync", ["dbFilePath", r]),
          UE.KuroSqliteLibrary.OpenCreateDB(r, USE_THREAD));
      if (!a) {
        LauncherLog_1.LauncherLog.Error("打开DB失败！", ["dbFilePath", r]);
        for (let e = 2; e <= DBNUM; e++) {
          var t = UE.KuroLauncherLibrary.GameSavedDir();
          if (
            ((r = t + DBPATH + e + DBSUFFIX),
            (a = UE.KuroSqliteLibrary.OpenCreateDB(r, USE_THREAD)))
          ) {
            LauncherStorageLib.Sde = r;
            break;
          }
        }
        if (!a)
          return (
            LauncherLog_1.LauncherLog.Error("创建10次DB都失败！", [
              "dbFilePath",
              r,
            ]),
            !1
          );
      }
      UE.KuroSqliteLibrary.Execute(r, getJournalMode(USE_JOURNAL_MODE));
    }
    let r = LauncherStorageLib.F4l,
      a =
        (LauncherLog_1.LauncherLog.Info("OpenSync", ["deviceDbPath", r]),
        UE.KuroSqliteLibrary.OpenCreateDB(r, USE_THREAD));
    if (!a) {
      LauncherLog_1.LauncherLog.Error("打开DB失败！", ["deviceDbPath", r]);
      for (let e = 2; e <= DBNUM; e++) {
        var n = UE.KuroLauncherLibrary.GameSavedDir();
        if (
          ((r = n + DEVICEDBPATH + e + DBSUFFIX),
          (a = UE.KuroSqliteLibrary.OpenCreateDB(r, USE_THREAD)))
        ) {
          LauncherStorageLib.F4l = r;
          break;
        }
      }
      if (!a)
        return (
          LauncherLog_1.LauncherLog.Error("创建10次DB都失败！", [
            "deviceDbPath",
            r,
          ]),
          !1
        );
    }
    return (
      UE.KuroSqliteLibrary.Execute(r, getJournalMode(USE_JOURNAL_MODE)),
      LauncherStorageLib.Ide()
    );
  }
  static Ide() {
    var e = `create table if not exists ${TABLENAME}(key text primary key not null , value text not null)`;
    if (!this.qwc) {
      var r = LauncherStorageLib.Sde;
      const a = UE.KuroSqliteLibrary.Execute(r, e);
      a || LauncherLog_1.LauncherLog.Error("创建DbTable失败！", ["command", e]);
    }
    r = LauncherStorageLib.F4l;
    const a = UE.KuroSqliteLibrary.Execute(r, e);
    return (
      a ||
        LauncherLog_1.LauncherLog.Error("创建DeviceDbTable失败！", [
          "command",
          e,
        ]),
      a
    );
  }
  static fde(e, r) {
    var a;
    return !r && this.qwc
      ? (LauncherLog_1.LauncherLog.Info(
          "[LauncherStorageLib][LockDbPath] 获取默认值",
          ["keyName", e],
        ),
        [!0, void 0])
      : ((r = r ? LauncherStorageLib.F4l : LauncherStorageLib.Sde),
        (e = `SELECT value FROM ${TABLENAME} WHERE key ='${e}'`),
        (a = (0, puerts_1.$ref)(void 0)),
        (r = UE.KuroSqliteLibrary.QueryValue(r, e, a)) === SQLITE_ERR
          ? [!1, void 0]
          : r === SQLITE_NO_DATA
            ? [!0, void 0]
            : [!0, (0, puerts_1.$unref)(a)]);
  }
  static vde(e, r, a) {
    return !a && this.qwc
      ? (LauncherLog_1.LauncherLog.Info(
          "[LauncherStorageLib][LockDbPath] 跳过设置值",
          ["keyName", e],
          ["value", r],
        ),
        !0)
      : ((a = a ? LauncherStorageLib.F4l : LauncherStorageLib.Sde),
        (e = `insert into ${TABLENAME} (key,value) values('${e}' , '${r}') on CONFLICT(key) do update set value = '${r}'`),
        USE_THREAD
          ? (UE.KuroSqliteLibrary.ExecuteAsync(a, e), !0)
          : UE.KuroSqliteLibrary.Execute(a, e));
  }
  static Mde(e, r) {
    return !r && this.qwc
      ? (LauncherLog_1.LauncherLog.Info(
          "[LauncherStorageLib][LockDbPath] 跳过删除值",
          ["key", e],
        ),
        !0)
      : ((r = r ? LauncherStorageLib.F4l : LauncherStorageLib.Sde),
        (e = `delete from ${TABLENAME} where key = '${e}'`),
        USE_THREAD
          ? (UE.KuroSqliteLibrary.ExecuteAsync(r, e), !0)
          : UE.KuroSqliteLibrary.Execute(r, e));
  }
  static gde(e) {
    if (null == e) LauncherLog_1.LauncherLog.Error("key值非法", ["key", e]);
    else {
      var r = ELauncherStorageGlobalKey[e];
      if (r) return r;
      LauncherLog_1.LauncherLog.Error("keyName值非法", ["key", e]);
    }
  }
  static O4l(e) {
    if (null == e) LauncherLog_1.LauncherLog.Error("key值非法", ["key", e]);
    else {
      var r = ELauncherStorageDeviceKey[e];
      if (r) return r;
      LauncherLog_1.LauncherLog.Error("keyName值非法", ["key", e]);
    }
  }
  static O8(r) {
    try {
      return JSON.stringify(r, LauncherStorageLib.Dde);
    } catch (e) {
      e instanceof Error
        ? LauncherLog_1.LauncherLog.ErrorWithStack(
            "序列化异常",
            e,
            ["value", r],
            ["error", e.message],
          )
        : LauncherLog_1.LauncherLog.Error(
            "序列化异常",
            ["value", r],
            ["error", e],
          );
    }
  }
  static pde(r) {
    try {
      return JSON.parse(r, LauncherStorageLib.Rde);
    } catch (e) {
      e instanceof Error
        ? LauncherLog_1.LauncherLog.ErrorWithStack(
            "反序列化异常",
            e,
            ["text", r],
            ["error", e.message],
          )
        : LauncherLog_1.LauncherLog.Error(
            "反序列化异常",
            ["text", r],
            ["error", e],
          );
    }
  }
}
((exports.LauncherStorageLib = LauncherStorageLib).Sde = void 0),
  (LauncherStorageLib.F4l = void 0),
  (LauncherStorageLib.gU = !1),
  (LauncherStorageLib.qwc = !1),
  (LauncherStorageLib.Dde = (e, r) => {
    if (void 0 === r) return "___undefined___";
    if (Number.isNaN(r)) return "___NaN___";
    if (r === 1 / 0) return "___Infinity___";
    if (r === -1 / 0) return "___-Infinity___";
    if (null === r) return null;
    switch (typeof r) {
      case "boolean":
        return r ? "___1B___" : "___0B___";
      case "bigint":
        return r + "___BI___";
      case "object":
        return r instanceof Map
          ? { ___MetaType___: "___Map___", Content: Array.from(r.entries()) }
          : r instanceof Set
            ? { ___MetaType___: "___Set___", Content: Array.from(r.values()) }
            : r;
      default:
        return r;
    }
  }),
  (LauncherStorageLib.Rde = (e, r) => {
    if (null == r) return r;
    switch (typeof r) {
      case "string":
        switch (r) {
          case "___undefined___":
            return;
          case "___NaN___":
            return NaN;
          case "___Infinity___":
            return 1 / 0;
          case "___-Infinity___":
            return -1 / 0;
          default:
            {
              let e = r;
              if ("___1B___" === e) return !0;
              if ("___0B___" === e) return !1;
              if (e.endsWith("___BI___"))
                return (e = e.replace("___BI___", "")), BigInt(e);
            }
            return r;
        }
      case "object":
        var a = r;
        if (a?.___MetaType___) {
          if ("___Map___" === a.___MetaType___) return new Map(a.Content);
          if ("___Set___" === a.___MetaType___) return new Set(a.Content);
        }
        return r;
      default:
        return r;
    }
  });
//# sourceMappingURL=LauncherStorageLib.js.map
