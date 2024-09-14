"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LocalStorage = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
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
  CHECK_COMPLEX_THRESHOLD = 600,
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
  static GetGlobal(e, a = void 0) {
    e = LocalStorage.gde(e);
    if (e) {
      var e = LocalStorage.fde(e);
      if (e[0]) return (e = e[1]) ? LocalStorage.pde(e) : a;
    }
  }
  static SetGlobal(e, a) {
    var t = LocalStorage.gde(e);
    return (
      !!t &&
      (null == a
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LocalStorage",
              31,
              "value值非法",
              ["keyName", t],
              ["value", a],
            ),
          !1)
        : !!(e = LocalStorage.kkn(e, a)) && LocalStorage.vde(t, e))
    );
  }
  static DeleteGlobal(e) {
    e = LocalStorage.gde(e);
    return !!e && LocalStorage.Mde(e);
  }
  static GetPlayer(e, a = void 0) {
    e = LocalStorage.Ede(e);
    if (e) {
      var e = LocalStorage.fde(e);
      if (e[0]) return (e = e[1]) ? LocalStorage.pde(e) : a;
    }
  }
  static SetPlayer(e, a) {
    var t = LocalStorage.Ede(e);
    return (
      !!t &&
      (null == a
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LocalStorage",
              31,
              "value值非法",
              ["keyName", t],
              ["value", a],
            ),
          !1)
        : !!(e = LocalStorage.Fkn(e, a)) && LocalStorage.vde(t, e))
    );
  }
  static DeletePlayer(e) {
    e = LocalStorage.Ede(e);
    return !!e && LocalStorage.Mde(e);
  }
  static cde() {
    var e;
    LocalStorage.Sde ||
      ((e = UE.KuroLauncherLibrary.GameSavedDir()),
      (LocalStorage.Sde = e + DBPATH + DBSUFFIX));
  }
  static mde() {
    this.yde.Start();
    let a = LocalStorage.Sde,
      t = UE.KuroSqliteLibrary.OpenCreateDB(a, USE_THREAD);
    if (!t) {
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LocalStorage", 31, "打开DB失败！", ["dbFilePath", a]);
      for (let e = 2; e <= DBNUM; e++) {
        var r = UE.KuroLauncherLibrary.GameSavedDir();
        if (
          ((a = r + DBPATH + e + DBSUFFIX),
          (t = UE.KuroSqliteLibrary.OpenCreateDB(a, USE_THREAD)))
        ) {
          LocalStorage.Sde = a;
          break;
        }
      }
      if (!t)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("LocalStorage", 31, "创建10次DB都失败！", [
              "dbFilePath",
              a,
            ]),
          this.yde.Stop(),
          !1
        );
    }
    return (
      UE.KuroSqliteLibrary.Execute(a, getJournalMode(USE_JOURNAL_MODE)),
      (t = LocalStorage.Ide()),
      this.yde.Stop(),
      t
    );
  }
  static Ide() {
    this.Tde.Start();
    var e = LocalStorage.Sde,
      a = `create table if not exists ${TABLENAME}(key text primary key not null , value text not null)`,
      e = UE.KuroSqliteLibrary.Execute(e, a);
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("LocalStorage", 31, "创建Table失败！", [
            "command",
            a,
          ])),
      this.Tde.Stop(),
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
    var a = LocalStorage.Sde,
      e = `SELECT value FROM ${TABLENAME} WHERE key ='${e}'`,
      t = (0, puerts_1.$ref)(void 0),
      a = UE.KuroSqliteLibrary.QueryValue(a, e, t);
    if (a === SQLITE_ERR) return [!1, void 0];
    if (a === SQLITE_NO_DATA) return [!0, void 0];
    const r = (0, puerts_1.$unref)(t);
    return [!0, r];
  }
  static vde(e, a) {
    var t, r;
    return ISUSEDB
      ? ((t = LocalStorage.Sde),
        (r = `insert into ${TABLENAME} (key,value) values('${e}' , '${a}') on CONFLICT(key) do update set value = '${a}'`),
        USE_THREAD
          ? (UE.KuroSqliteLibrary.ExecuteAsync(t, r), !0)
          : UE.KuroSqliteLibrary.Execute(t, r))
      : (UE.KuroRenderingRuntimeBPPluginBPLibrary.SetString(
          GlobalData_1.GlobalData.World,
          e,
          a,
        ),
        UE.KuroRenderingRuntimeBPPluginBPLibrary.Save(
          GlobalData_1.GlobalData.World,
        ),
        !0);
  }
  static Mde(e) {
    var a;
    return (
      !ISUSEDB ||
      ((a = LocalStorage.Sde),
      (e = `delete from ${TABLENAME} where key = '${e}'`),
      USE_THREAD
        ? (UE.KuroSqliteLibrary.ExecuteAsync(a, e), !0)
        : UE.KuroSqliteLibrary.Execute(a, e))
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
      var a = LocalStorageDefine_1.ELocalStorageGlobalKey[e];
      if (a) return a;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LocalStorage", 31, "keyName值非法", ["key", e]);
    }
  }
  static Ede(e) {
    if (null == e)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("LocalStorage", 31, "key值非法", ["key", e]);
    else {
      var a = LocalStorageDefine_1.ELocalStoragePlayerKey[e];
      if (a) {
        if (LocalStorage.j8) return a + "_" + LocalStorage.j8;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LocalStorage",
            31,
            "尚未获取到playerId，无法操作Player相关的存储值！",
            ["keyName", a],
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LocalStorage",
            31,
            "keyName值非法！",
            ["key", e],
            ["keyName", a],
          );
    }
  }
  static kkn(e, a) {
    return LocalStorage.Vkn(
      LocalStorageDefine_1.ELocalStorageGlobalKey[e],
      a,
      LocalStorage.Hkn.includes(e),
    );
  }
  static Fkn(e, a) {
    return LocalStorage.Vkn(
      LocalStorageDefine_1.ELocalStoragePlayerKey[e],
      a,
      LocalStorage.jkn.includes(e),
    );
  }
  static Vkn(e, a, t) {
    a = LocalStorage.O8(a);
    return (
      t ||
        Info_1.Info.IsBuildShipping ||
        ((t = a?.length ?? 0),
        (t = LocalStorage.Wkn + t) >= CHECK_COMPLEX_THRESHOLD &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "LocalStorage",
            64,
            "[存储对象复杂度检查]->存储对象疑似属性过多,请考虑拆分对象",
            ["存储Key", e],
            ["对象复杂度", t],
            ["存储对象", a],
          )),
      a
    );
  }
  static O8(a) {
    LocalStorage.Wkn = 0;
    try {
      return JSON.stringify(a, LocalStorage.Dde);
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "LocalStorage",
            31,
            "序列化异常",
            e,
            ["value", a],
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LocalStorage",
            31,
            "序列化异常",
            ["value", a],
            ["error", e],
          );
    }
  }
  static pde(a) {
    try {
      return JSON.parse(a, LocalStorage.Rde);
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "LocalStorage",
            31,
            "反序列化异常",
            e,
            ["text", a],
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LocalStorage",
            31,
            "反序列化异常",
            ["text", a],
            ["error", e],
          );
    }
  }
}
((exports.LocalStorage = LocalStorage).Sde = void 0),
  (LocalStorage.j8 = void 0),
  (LocalStorage.yde = Stats_1.Stat.Create("LocalStorage_OpenOrCreateDb")),
  (LocalStorage.Tde = Stats_1.Stat.Create("LocalStorage_CreateTable")),
  (LocalStorage.Lde = (e) => {
    (LocalStorage.j8 = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LocalStorageInitPlayerId,
      );
  }),
  (LocalStorage.Wkn = 0),
  (LocalStorage.Hkn = [
    LocalStorageDefine_1.ELocalStorageGlobalKey.PlayMenuInfo,
    LocalStorageDefine_1.ELocalStorageGlobalKey.MenuData,
    LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
  ]),
  (LocalStorage.jkn = [
    LocalStorageDefine_1.ELocalStoragePlayerKey.GetItemConfigListSaveKey,
  ]),
  (LocalStorage.Dde = (e, a) => {
    if ((++LocalStorage.Wkn, void 0 === a)) return "___undefined___";
    if (Number.isNaN(a)) return "___NaN___";
    if (a === 1 / 0) return "___Infinity___";
    if (a === -1 / 0) return "___-Infinity___";
    if (null === a) return null;
    switch (typeof a) {
      case "boolean":
        return a ? "___1B___" : "___0B___";
      case "bigint":
        return a + "___BI___";
      case "object":
        return a instanceof Map
          ? { ___MetaType___: "___Map___", Content: Array.from(a.entries()) }
          : a instanceof Set
            ? { ___MetaType___: "___Set___", Content: Array.from(a.values()) }
            : a;
      default:
        return a;
    }
  }),
  (LocalStorage.Rde = (e, a) => {
    if (null == a) return a;
    switch (typeof a) {
      case "string":
        switch (a) {
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
              let e = a;
              if ("___1B___" === e) return !0;
              if ("___0B___" === e) return !1;
              if (e.endsWith("___BI___"))
                return (e = e.replace("___BI___", "")), BigInt(e);
            }
            return a;
        }
      case "object":
        var t = a;
        if (t?.___MetaType___) {
          if ("___Map___" === t.___MetaType___) return new Map(t.Content);
          if ("___Set___" === t.___MetaType___) return new Set(t.Content);
        }
        return a;
      default:
        return a;
    }
  });
//# sourceMappingURL=LocalStorage.js.map
