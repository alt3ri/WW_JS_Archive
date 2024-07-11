"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LocalStorage = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  GlobalData_1 = require("../GlobalData"),
  EventDefine_1 = require("./Event/EventDefine"),
  EventSystem_1 = require("./Event/EventSystem"),
  LocalStorageDefine_1 = require("./LocalStorageDefine"),
  DBPATH = "LocalStorage/LocalStorage",
  DBSUFFIX = ".db",
  TABLENAME = "LocalStorage",
  DBNUM = 10,
  ISUSEDB = !0,
  USE_THREAD = !0,
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
class LocalStorage {
  static Initialize() {
    ISUSEDB && (LocalStorage.cde(), LocalStorage.mde()), LocalStorage.dde();
  }
  static Destroy() {
    (LocalStorage.j8 = void 0), LocalStorage.Cde();
  }
  static GetGlobal(e, t = void 0) {
    e = LocalStorage.gde(e);
    if (e) {
      var e = LocalStorage.fde(e);
      if (e[0]) return (e = e[1]) ? LocalStorage.pde(e) : t;
    }
  }
  static SetGlobal(e, t) {
    e = LocalStorage.gde(e);
    return (
      !!e &&
      (null == t
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LocalStorage",
              31,
              "value值非法",
              ["keyName", e],
              ["value", t],
            ),
          !1)
        : !!(t = LocalStorage.O8(t)) && LocalStorage.vde(e, t))
    );
  }
  static DeleteGlobal(e) {
    e = LocalStorage.gde(e);
    return !!e && LocalStorage.Mde(e);
  }
  static GetPlayer(e, t = void 0) {
    e = LocalStorage.Sde(e);
    if (e) {
      var e = LocalStorage.fde(e);
      if (e[0]) return (e = e[1]) ? LocalStorage.pde(e) : t;
    }
  }
  static SetPlayer(e, t) {
    e = LocalStorage.Sde(e);
    return (
      !!e &&
      (null == t
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LocalStorage",
              31,
              "value值非法",
              ["keyName", e],
              ["value", t],
            ),
          !1)
        : !!(t = LocalStorage.O8(t)) && LocalStorage.vde(e, t))
    );
  }
  static DeletePlayer(e) {
    e = LocalStorage.Sde(e);
    return !!e && LocalStorage.Mde(e);
  }
  static cde() {
    var e;
    LocalStorage.Ede ||
      ((e = UE.KismetSystemLibrary.GetProjectSavedDirectory()),
      (LocalStorage.Ede = e + DBPATH + DBSUFFIX));
  }
  static mde() {
    let t = LocalStorage.Ede,
      a = UE.KuroSqliteLibrary.OpenCreateDB(t, USE_THREAD);
    if (!a) {
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LocalStorage", 31, "打开DB失败！", ["dbFilePath", t]);
      for (let e = 2; e <= DBNUM; e++) {
        var r = UE.KismetSystemLibrary.GetProjectSavedDirectory();
        if (
          ((t = r + DBPATH + e + DBSUFFIX),
          (a = UE.KuroSqliteLibrary.OpenCreateDB(t, USE_THREAD)))
        ) {
          LocalStorage.Ede = t;
          break;
        }
      }
      if (!a)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("LocalStorage", 31, "创建10次DB都失败！", [
              "dbFilePath",
              t,
            ]),
          !1
        );
    }
    return (
      UE.KuroSqliteLibrary.Execute(t, getJournalMode(USE_JOURNAL_MODE)),
      (a = LocalStorage.Ide())
    );
  }
  static Ide() {
    var e = LocalStorage.Ede,
      t = `create table if not exists ${TABLENAME}(key text primary key not null , value text not null)`,
      e = UE.KuroSqliteLibrary.Execute(e, t);
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("LocalStorage", 31, "创建Table失败！", [
            "command",
            t,
          ])),
      e
    );
  }
  static fde(e) {
    if (!ISUSEDB) {
      const r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetString(
        GlobalData_1.GlobalData.World,
        e,
        "",
      );
      return [!0, r];
    }
    var t = LocalStorage.Ede,
      e = `SELECT value FROM ${TABLENAME} WHERE key ='${e}'`,
      a = (0, puerts_1.$ref)(void 0),
      t = UE.KuroSqliteLibrary.QueryValue(t, e, a);
    if (t === SQLITE_ERR) return [!1, void 0];
    if (t === SQLITE_NO_DATA) return [!0, void 0];
    const r = (0, puerts_1.$unref)(a);
    return [!0, r];
  }
  static vde(e, t) {
    var a, r;
    return ISUSEDB
      ? ((a = LocalStorage.Ede),
        (r = `insert into ${TABLENAME} (key,value) values('${e}' , '${t}') on CONFLICT(key) do update set value = '${t}'`),
        USE_THREAD
          ? (UE.KuroSqliteLibrary.ExecuteAsync(a, r), !0)
          : UE.KuroSqliteLibrary.Execute(a, r))
      : (UE.KuroRenderingRuntimeBPPluginBPLibrary.SetString(
          GlobalData_1.GlobalData.World,
          e,
          t,
        ),
        UE.KuroRenderingRuntimeBPPluginBPLibrary.Save(
          GlobalData_1.GlobalData.World,
        ),
        !0);
  }
  static Mde(e) {
    var t;
    return (
      !ISUSEDB ||
      ((t = LocalStorage.Ede),
      (e = `delete from ${TABLENAME} where key = '${e}'`),
      USE_THREAD
        ? (UE.KuroSqliteLibrary.ExecuteAsync(t, e), !0)
        : UE.KuroSqliteLibrary.Execute(t, e))
    );
  }
  static dde() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangePlayerInfoId,
      this.Lde,
    );
  }
  static Cde() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangePlayerInfoId,
      this.Lde,
    );
  }
  static gde(e) {
    if (null == e)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LocalStorage", 31, "key值非法", ["key", e]);
    else {
      var t = LocalStorageDefine_1.ELocalStorageGlobalKey[e];
      if (t) return t;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LocalStorage", 31, "keyName值非法", ["key", e]);
    }
  }
  static Sde(e) {
    if (null == e)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LocalStorage", 31, "key值非法", ["key", e]);
    else {
      var t = LocalStorageDefine_1.ELocalStoragePlayerKey[e];
      if (t) {
        if (LocalStorage.j8) return t + "_" + LocalStorage.j8;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LocalStorage",
            31,
            "尚未获取到playerId，无法操作Player相关的存储值！",
            ["keyName", t],
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LocalStorage",
            31,
            "keyName值非法！",
            ["key", e],
            ["keyName", t],
          );
    }
  }
  static O8(t) {
    try {
      return JSON.stringify(t, LocalStorage.Dde);
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "LocalStorage",
            31,
            "序列化异常",
            e,
            ["value", t],
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LocalStorage",
            31,
            "序列化异常",
            ["value", t],
            ["error", e],
          );
    }
  }
  static pde(t) {
    try {
      return JSON.parse(t, LocalStorage.Rde);
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "LocalStorage",
            31,
            "反序列化异常",
            e,
            ["text", t],
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LocalStorage",
            31,
            "反序列化异常",
            ["text", t],
            ["error", e],
          );
    }
  }
}
((exports.LocalStorage = LocalStorage).Ede = void 0),
  (LocalStorage.j8 = void 0),
  (LocalStorage.yde = void 0),
  (LocalStorage.Tde = void 0),
  (LocalStorage.Lde = (e) => {
    (LocalStorage.j8 = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LocalStorageInitPlayerId,
      );
  }),
  (LocalStorage.Dde = (e, t) => {
    if (void 0 === t) return "___undefined___";
    if (Number.isNaN(t)) return "___NaN___";
    if (t === 1 / 0) return "___Infinity___";
    if (t === -1 / 0) return "___-Infinity___";
    if (null === t) return null;
    switch (typeof t) {
      case "boolean":
        return t ? "___1B___" : "___0B___";
      case "bigint":
        return t + "___BI___";
      case "object":
        return t instanceof Map
          ? { ___MetaType___: "___Map___", Content: Array.from(t.entries()) }
          : t instanceof Set
            ? { ___MetaType___: "___Set___", Content: Array.from(t.values()) }
            : t;
      default:
        return t;
    }
  }),
  (LocalStorage.Rde = (e, t) => {
    if (null == t) return t;
    switch (typeof t) {
      case "string":
        switch (t) {
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
              let e = t;
              if ("___1B___" === e) return !0;
              if ("___0B___" === e) return !1;
              if (e.endsWith("___BI___"))
                return (e = e.replace("___BI___", "")), BigInt(e);
            }
            return t;
        }
      case "object":
        var a = t;
        if (a?.___MetaType___) {
          if ("___Map___" === a.___MetaType___) return new Map(a.Content);
          if ("___Set___" === a.___MetaType___) return new Set(a.Content);
        }
        return t;
      default:
        return t;
    }
  });
//# sourceMappingURL=LocalStorage.js.map
