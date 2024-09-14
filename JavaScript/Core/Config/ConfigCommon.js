"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfigCommon = exports.ConfigBase = exports.dataRef = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
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
  static SaveConfig(o, n, t = 1) {
    this.G9.Put(o, n, t);
  }
  static GetConfig(o) {
    return this.G9.Get(o);
  }
  static ToList(n) {
    if (n) {
      var t = n.length,
        i = new Array(t);
      for (let o = 0; o < t; o++) i[o] = n[o];
      return i;
    }
  }
  static GetProjectContentDir() {
    return (
      ConfigCommon.N9 ||
        (ConfigCommon.N9 = "" + UE.BlueprintPathsLibrary.ProjectContentDir()),
      ConfigCommon.N9
    );
  }
  static InitDataStatement(o, n, t) {
    if ((ConfigCommon.O9.Start(), 0 !== o)) return ConfigCommon.O9.Stop(), o;
    n.length <= 0 &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Config",
        2,
        "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！",
      );
    var i = ConfigCommon.GetProjectContentDir() + "Aki/ConfigDB/" + n,
      o = UE.KuroPrepareStatementLib.CreateStatement(i, t);
    switch (o) {
      case -1:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Config", 2, "找不到Db连接", ["path", i]);
        break;
      case -2:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "创建语句失败",
            ["path", i],
            ["command", t],
          );
    }
    return ConfigCommon.O9.Stop(), o;
  }
  static GetLangStatementId(o, n, t, i = "") {
    ConfigCommon.k9.Start(),
      n.length <= 0 &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Config",
          2,
          "dbName为空！请确认该配置表在拆分Db表中是否有正确配置！",
        );
    i =
      i && 0 !== i.length ? i : LanguageSystem_1.LanguageSystem.PackageLanguage;
    let e = ConfigCommon.F9.get(o),
      C = (e || ((e = new Map()), ConfigCommon.F9.set(o, e)), e.get(i));
    if (!C) {
      var g = ConfigCommon.GetProjectContentDir() + `Aki/ConfigDB/${i}/` + n;
      switch ((C = UE.KuroPrepareStatementLib.CreateStatement(g, t))) {
        case -1:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Config", 2, "找不到语言表Db连接", ["path", g]);
          break;
        case -2:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              2,
              "创建语言表语句失败",
              ["path", g],
              ["command", t],
            );
      }
      e.set(i, C);
    }
    return ConfigCommon.k9.Stop(), C;
  }
  static CheckStatement(o, ...n) {
    let t = !0,
      i = "";
    switch (o) {
      case 0:
        i = "语句未初始化！";
        break;
      case -1:
        i = "找不到该语句的 DB 连接！";
        break;
      case -2:
        i = "语句创建不成功！";
    }
    return (
      i &&
        ((t = !1), Log_1.Log.CheckError()) &&
        Log_1.Log.Error("Config", 2, i, ...n),
      t
    );
  }
  static BindBigInt(o, n, t, ...i) {
    return (
      ConfigCommon.V9.Start(),
      "bigint" != typeof t
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Config",
              2,
              "绑定参数 int64 失败",
              ["handleId", o],
              ["bindingIndex", n],
              ["value", t],
              ...i,
            ),
          ConfigCommon.V9.Stop(),
          !1)
        : ((t = UE.KuroPrepareStatementLib.SetBindingValueBigInt(o, n, t)) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Config",
                2,
                "绑定参数 int64 失败",
                ["handleId", o],
                ["bindingIndex", n],
                ...i,
              )),
          ConfigCommon.V9.Stop(),
          t)
    );
  }
  static BindInt(o, n, t, ...i) {
    ConfigCommon.H9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueInt(o, n, t);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "绑定参数 int32 失败",
            ["handleId", o],
            ["bindingIndex", n],
            ...i,
          )),
      ConfigCommon.H9.Stop(),
      t
    );
  }
  static BindFloat(o, n, t, ...i) {
    ConfigCommon.j9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueFloat(o, n, t);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "绑定参数 float 失败",
            ["handleId", o],
            ["bindingIndex", n],
            ...i,
          )),
      ConfigCommon.j9.Stop(),
      t
    );
  }
  static BindBool(o, n, t, ...i) {
    ConfigCommon.W9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueBool(o, n, t);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "绑定参数 bool 失败",
            ["handleId", o],
            ["bindingIndex", n],
            ...i,
          )),
      ConfigCommon.W9.Stop(),
      t
    );
  }
  static BindString(o, n, t, ...i) {
    ConfigCommon.K9.Start();
    t = UE.KuroPrepareStatementLib.SetBindingValueString(o, n, t);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "绑定参数 string 失败",
            ["handleId", o],
            ["bindingIndex", n],
            ...i,
          )),
      ConfigCommon.K9.Stop(),
      t
    );
  }
  static ClearBind(o) {
    UE.KuroPrepareStatementLib.ClearBindings(o);
  }
  static Reset(o, ...n) {
    var t = UE.KuroPrepareStatementLib.Reset(o);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "重置语句失败！",
            ["handleId", o],
            ...n,
          )),
      t
    );
  }
  static Step(o, n = !1, ...t) {
    var i = cpp_1.KuroTime.GetMilliseconds64(),
      e = UE.KuroPrepareStatementLib.Step(o),
      i = cpp_1.KuroTime.GetMilliseconds64() - i;
    cpp_1.FKuroPerfSightHelper.PostValueFloat1(
      "CustomPerformance",
      "SQL_Step",
      i,
    );
    let C = "";
    switch (e) {
      case 0:
        C = n
          ? "配置表中没有该数据，请确认该问题，或修改为合理的查询！"
          : void 0;
        break;
      case -1:
        C = "找不到创建的语句，确认语句是否已调用过销毁，但业务还持有着句柄！";
        break;
      case -2:
        C = "创建的语句无效或已被释放！";
        break;
      case -3:
        C = "事务繁忙中，查询失败！";
        break;
      case -4:
        C = "执行查询出错！";
    }
    return (
      C &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Config", 2, C, ["handleId", o], ...t),
      e
    );
  }
  static GetValue(o, n, ...t) {
    ConfigCommon.Q9.Start();
    (n = UE.KuroPrepareStatementLib.GetColumnValueBytes(o, n, exports.dataRef)),
      n ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            2,
            "获取配置表字段数值出错",
            ["handleId", o],
            ...t,
          )),
      (o = n
        ? new DataView((0, puerts_1.$unref)(exports.dataRef).slice(0))
        : void 0);
    return ConfigCommon.Q9.Stop(), [n, o];
  }
}
((exports.ConfigCommon = ConfigCommon).N9 = void 0),
  (ConfigCommon.F9 = new Map()),
  (ConfigCommon.G9 = new TrimLru_1.TrimLru(3e3)),
  (ConfigCommon.O9 = Stats_1.Stat.Create("ConfigCommon.InitDataStatement")),
  (ConfigCommon.k9 = Stats_1.Stat.Create("ConfigCommon.GetLangStatementId")),
  (ConfigCommon.V9 = Stats_1.Stat.Create("ConfigCommon.BindBigInt")),
  (ConfigCommon.H9 = Stats_1.Stat.Create("ConfigCommon.BindInt")),
  (ConfigCommon.j9 = Stats_1.Stat.Create("ConfigCommon.BindFloat")),
  (ConfigCommon.W9 = Stats_1.Stat.Create("ConfigCommon.BindBool")),
  (ConfigCommon.K9 = Stats_1.Stat.Create("ConfigCommon.BindString")),
  (ConfigCommon.Q9 = Stats_1.Stat.Create("ConfigCommon.GetValue")),
  (ConfigCommon.AllConfigStatementStat = Stats_1.Stat.Create(
    "ConfigCommon.AllConfig",
  ));
//# sourceMappingURL=ConfigCommon.js.map
