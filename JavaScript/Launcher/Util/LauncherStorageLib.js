"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherStorageLib = exports.ELauncherStorageGlobalKey = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const LauncherLog_1 = require("./LauncherLog");
let ELauncherStorageGlobalKey;
!(function (e) {
  (e[(e.PlayMenuInfo = 0)] = "PlayMenuInfo"),
    (e[(e.CacheP4Version = 1)] = "CacheP4Version"),
    (e[(e.PatchP4Version = 2)] = "PatchP4Version"),
    (e[(e.PatchVersion = 3)] = "PatchVersion"),
    (e[(e.LauncherPatchVersion = 4)] = "LauncherPatchVersion"),
    (e[(e.NotFirstTimeOpenPush = 5)] = "NotFirstTimeOpenPush"),
    (e[(e.CachePushOpenState = 6)] = "CachePushOpenState"),
    (e[(e.AndroidNotFirstTimeOpenPush = 7)] = "AndroidNotFirstTimeOpenPush");
})(
  (ELauncherStorageGlobalKey =
    exports.ELauncherStorageGlobalKey ||
    (exports.ELauncherStorageGlobalKey = {})),
);
const DBPATH = "LocalStorage/LocalStorage";
const DBSUFFIX = ".db";
const TABLENAME = "LocalStorage";
const DBNUM = 10;
const USE_THREAD = !0;
const SQLITE_ERR = -1;
const SQLITE_NO_DATA = 1;
const USE_JOURNAL_MODE = 2;
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
  static Initialize() {
    this.gU ||
      ((this.gU = !0), LauncherStorageLib.cde(), LauncherStorageLib.mde());
  }
  static Destroy() {}
  static GetGlobal(e, r = void 0) {
    e = LauncherStorageLib.gde(e);
    if (e) {
      var e = LauncherStorageLib.fde(e);
      if (e[0]) return (e = e[1]) ? LauncherStorageLib.pde(e) : r;
    }
  }
  static SetGlobal(e, r) {
    e = LauncherStorageLib.gde(e);
    return (
      !!e &&
      (r == null
        ? (LauncherLog_1.LauncherLog.Error(
            "value值非法",
            ["keyName", e],
            ["value", r],
          ),
          !1)
        : !!(r = LauncherStorageLib.O8(r)) && LauncherStorageLib.vde(e, r))
    );
  }
  static DeleteGlobal(e) {
    e = LauncherStorageLib.gde(e);
    return !!e && LauncherStorageLib.Mde(e);
  }
  static GetGlobalString(e, r = void 0) {
    if (e) {
      let t = LauncherStorageLib.fde(e);
      if (t[0]) return (t = t[1]) ? LauncherStorageLib.pde(t) : r;
    } else LauncherLog_1.LauncherLog.Error("key值非法", ["key", e]);
  }
  static SetGlobalString(e, r) {
    return e
      ? r == null
        ? (LauncherLog_1.LauncherLog.Error(
            "value值非法",
            ["key", e],
            ["value", r],
          ),
          !1)
        : !!(r = LauncherStorageLib.O8(r)) && LauncherStorageLib.vde(e, r)
      : (LauncherLog_1.LauncherLog.Error("key值非法", ["key", e]), !1);
  }
  static DeleteGlobalString(e) {
    return e
      ? LauncherStorageLib.Mde(e)
      : (LauncherLog_1.LauncherLog.Error("key值非法", ["key", e]), !1);
  }
  static cde() {
    let e;
    LauncherStorageLib.Ede ||
      ((e = UE.KismetSystemLibrary.GetProjectSavedDirectory()),
      (LauncherStorageLib.Ede = e + DBPATH + DBSUFFIX));
  }
  static mde() {
    let r = LauncherStorageLib.Ede;
    let t = UE.KuroSqliteLibrary.OpenCreateDB(r, USE_THREAD);
    if (!t) {
      LauncherLog_1.LauncherLog.Error("打开DB失败！", ["dbFilePath", r]);
      for (let e = 2; e <= DBNUM; e++) {
        const a = UE.KismetSystemLibrary.GetProjectSavedDirectory();
        if (
          ((r = a + DBPATH + e + DBSUFFIX),
          (t = UE.KuroSqliteLibrary.OpenCreateDB(r, USE_THREAD)))
        ) {
          LauncherStorageLib.Ede = r;
          break;
        }
      }
      if (!t)
        return (
          LauncherLog_1.LauncherLog.Error("创建10次DB都失败！", [
            "dbFilePath",
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
    var e = LauncherStorageLib.Ede;
    const r = `create table if not exists ${TABLENAME}(key text primary key not null , value text not null)`;
    var e = UE.KuroSqliteLibrary.Execute(e, r);
    return (
      e || LauncherLog_1.LauncherLog.Error("创建Table失败！", ["command", r]), e
    );
  }
  static fde(e) {
    var r = LauncherStorageLib.Ede;
    var e = `SELECT value FROM ${TABLENAME} WHERE key ='${e}'`;
    const t = (0, puerts_1.$ref)(void 0);
    var r = UE.KuroSqliteLibrary.QueryValue(r, e, t);
    return r === SQLITE_ERR
      ? [!1, void 0]
      : r === SQLITE_NO_DATA
        ? [!0, void 0]
        : [!0, (0, puerts_1.$unref)(t)];
  }
  static vde(e, r) {
    const t = LauncherStorageLib.Ede;
    var e = `insert into ${TABLENAME} (key,value) values('${e}' , '${r}') on CONFLICT(key) do update set value = '${r}'`;
    return USE_THREAD
      ? (UE.KuroSqliteLibrary.ExecuteAsync(t, e), !0)
      : UE.KuroSqliteLibrary.Execute(t, e);
  }
  static Mde(e) {
    const r = LauncherStorageLib.Ede;
    var e = `delete from ${TABLENAME} where key = '${e}'`;
    return USE_THREAD
      ? (UE.KuroSqliteLibrary.ExecuteAsync(r, e), !0)
      : UE.KuroSqliteLibrary.Execute(r, e);
  }
  static gde(e) {
    if (e == null) LauncherLog_1.LauncherLog.Error("key值非法", ["key", e]);
    else {
      const r = ELauncherStorageGlobalKey[e];
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
((exports.LauncherStorageLib = LauncherStorageLib).Ede = void 0),
  (LauncherStorageLib.gU = !1),
  (LauncherStorageLib.Dde = (e, r) => {
    if (void 0 === r) return "___undefined___";
    if (Number.isNaN(r)) return "___NaN___";
    if (r === 1 / 0) return "___Infinity___";
    if (r === -1 / 0) return "___-Infinity___";
    if (r === null) return null;
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
    if (r == null) return r;
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
              if (e === "___1B___") return !0;
              if (e === "___0B___") return !1;
              if (e.endsWith("___BI___"))
                return (e = e.replace("___BI___", "")), BigInt(e);
            }
            return r;
        }
      case "object":
        var t = r;
        if (t?.___MetaType___) {
          if (t.___MetaType___ === "___Map___") return new Map(t.Content);
          if (t.___MetaType___ === "___Set___") return new Set(t.Content);
        }
        return r;
      default:
        return r;
    }
  });
// # sourceMappingURL=LauncherStorageLib.js.map
