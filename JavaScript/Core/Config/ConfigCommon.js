"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfigCommon = exports.ConfigBase = exports.dataRef = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LanguageSystem_1 = require("../Common/LanguageSystem"),
  Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  TrimLru_1 = require("../Container/TrimLru");
exports.dataRef = (0, puerts_1.$ref)(void 0);
class ConfigBase {
  constructor() {
    this.RowId = 0;
  }
}
exports.ConfigBase = ConfigBase;
class ConfigCommon {
  static SetLruCapacity(o) {
    this.G9.Capacity = o;
  }
  static SaveConfig(o, n, i = 1) {
    this.G9.Put(o, n, i);
  }
  static GetConfig(o) {
    return this.G9.Get(o);
  }
  static ToList(n) {
    if (n) {
      var i = n.length,
        t = new Array(i);
      for (let o = 0; o < i; o++) t[o] = n[o];
      return t;
    }
  }
  static GetProjectContentDir() {
    return (
      ConfigCommon.N9 ||
        (ConfigCommon.N9 = "" + UE.BlueprintPathsLibrary.ProjectContentDir()),
      ConfigCommon.N9
    );
  }
  static InitDataStatement(o, n, i) {
    if (0 !== o) return o;
    n.length <= 0 &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Config",
        2,
        "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！",
      );
    var t = ConfigCommon.GetProjectContentDir() + "Aki/ConfigDB/" + n,
      o = UE.KuroPrepareStatementLib.CreateStatement(t, i);
    switch (o) {
      case -1:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Config", 2, "找不到Db连接", ["path", t]);
        break;
      case -2:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "创建语句失败",
            ["path", t],
            ["command", i],
          );
    }
    return o;
  }
  static GetLangStatementId(o, n, i, t = "") {
    n.length <= 0 &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Config",
        2,
        "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！",
      );
    t =
      t && 0 !== t.length ? t : LanguageSystem_1.LanguageSystem.PackageLanguage;
    let e = ConfigCommon.F9.get(o),
      g = (e || ((e = new Map()), ConfigCommon.F9.set(o, e)), e.get(t));
    if (!g) {
      var a = ConfigCommon.GetProjectContentDir() + `Aki/ConfigDB/${t}/` + n;
      switch ((g = UE.KuroPrepareStatementLib.CreateStatement(a, i))) {
        case -1:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Config", 2, "找不到语言表Db连接", ["path", a]);
          break;
        case -2:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              2,
              "创建语言表语句失败",
              ["path", a],
              ["command", i],
            );
      }
      e.set(t, g);
    }
    return g;
  }
  static CheckStatement(o, ...n) {
    let i = !0,
      t = "";
    switch (o) {
      case 0:
        t = "语句未初始化！";
        break;
      case -1:
        t = "找不到该语句的 DB 连接！";
        break;
      case -2:
        t = "语句创建不成功！";
    }
    return (
      t &&
        ((i = !1), Log_1.Log.CheckError()) &&
        Log_1.Log.Error("Config", 2, t, ...n),
      i
    );
  }
  static BindBigInt(o, n, i, ...t) {
    return "bigint" != typeof i
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "绑定参数 int64 失败",
            ["handleId", o],
            ["bindingIndex", n],
            ["value", i],
            ...t,
          ),
        !1)
      : ((i = UE.KuroPrepareStatementLib.SetBindingValueBigInt(o, n, i)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              2,
              "绑定参数 int64 失败",
              ["handleId", o],
              ["bindingIndex", n],
              ...t,
            )),
        i);
  }
  static BindInt(o, n, i, ...t) {
    i = UE.KuroPrepareStatementLib.SetBindingValueInt(o, n, i);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "绑定参数 int32 失败",
            ["handleId", o],
            ["bindingIndex", n],
            ...t,
          )),
      i
    );
  }
  static BindFloat(o, n, i, ...t) {
    i = UE.KuroPrepareStatementLib.SetBindingValueFloat(o, n, i);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "绑定参数 float 失败",
            ["handleId", o],
            ["bindingIndex", n],
            ...t,
          )),
      i
    );
  }
  static BindBool(o, n, i, ...t) {
    i = UE.KuroPrepareStatementLib.SetBindingValueBool(o, n, i);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "绑定参数 bool 失败",
            ["handleId", o],
            ["bindingIndex", n],
            ...t,
          )),
      i
    );
  }
  static BindString(o, n, i, ...t) {
    i = UE.KuroPrepareStatementLib.SetBindingValueString(o, n, i);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "绑定参数 string 失败",
            ["handleId", o],
            ["bindingIndex", n],
            ...t,
          )),
      i
    );
  }
  static ClearBind(o) {
    UE.KuroPrepareStatementLib.ClearBindings(o);
  }
  static Reset(o, ...n) {
    var i = UE.KuroPrepareStatementLib.Reset(o);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "重置语句失败！",
            ["handleId", o],
            ...n,
          )),
      i
    );
  }
  static Step(o, n = !1, ...i) {
    var t = UE.KuroPrepareStatementLib.Step(o);
    let e = "";
    switch (t) {
      case 0:
        e = n
          ? "配置表中没有该数据，请确认该问题，或修改为合理的查询！"
          : void 0;
        break;
      case -1:
        e = "找不到创建的语句，确认语句是否已调用过销毁，但业务还持有着句柄！";
        break;
      case -2:
        e = "创建的语句无效或已被释放！";
        break;
      case -3:
        e = "事务繁忙中，查询失败！";
        break;
      case -4:
        e = "执行查询出错！";
    }
    return (
      e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Config", 2, e, ["handleId", o], ...i),
      t
    );
  }
  static GetValue(o, n, ...i) {
    (n = UE.KuroPrepareStatementLib.GetColumnValueBytes(o, n, exports.dataRef)),
      n ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "获取配置表字段数值出错",
            ["handleId", o],
            ...i,
          )),
      (o = n
        ? new DataView((0, puerts_1.$unref)(exports.dataRef).slice(0))
        : void 0);
    return [n, o];
  }
}
((exports.ConfigCommon = ConfigCommon).N9 = void 0),
  (ConfigCommon.F9 = new Map()),
  (ConfigCommon.G9 = new TrimLru_1.TrimLru(3e3)),
  (ConfigCommon.O9 = void 0),
  (ConfigCommon.k9 = void 0),
  (ConfigCommon.V9 = void 0),
  (ConfigCommon.H9 = void 0),
  (ConfigCommon.j9 = void 0),
  (ConfigCommon.W9 = void 0),
  (ConfigCommon.K9 = void 0),
  (ConfigCommon.Q9 = void 0),
  (ConfigCommon.AllConfigStatementStat = void 0);
//# sourceMappingURL=ConfigCommon.js.map
