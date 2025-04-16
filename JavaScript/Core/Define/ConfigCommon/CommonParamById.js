"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCommonParamById = void 0);
const Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DeserializeConfig_1 = require("../../Config/DeserializeConfig"),
  FILE = "c.参数.xlsx",
  DB = "db_common_param.db",
  TABLE = "CommonParam",
  COMMAND = "select BinData from `CommonParam` where KeyName = ?",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const intCache = new Map(),
  floatCache = new Map(),
  long54Cache = new Map(),
  boolCache = new Map(),
  stringCache = new Map(),
  intListCache = new Map(),
  floatListCache = new Map(),
  long54ListCache = new Map(),
  stringListCache = new Map();
function getDataView(t) {
  var a, o;
  return (a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, [
    "command",
    COMMAND,
  ]))
    ? (a =
        (a = ConfigCommon_1.ConfigCommon.BindString(
          handleId,
          1,
          t,
          ...logPair,
          ["Id", t],
        )) &&
        0 <
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", t]))
      ? ((o = void 0),
        ([a, o] = ConfigCommon_1.ConfigCommon.GetValue(
          handleId,
          0,
          ...logPair,
          ["Id", t],
        )),
        ConfigCommon_1.ConfigCommon.Reset(handleId),
        [a, o])
      : (ConfigCommon_1.ConfigCommon.Reset(handleId), [!1, void 0])
    : [!1, void 0];
}
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamById.Init"),
  getIntConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCommonParamById.GetIntConfig",
  ),
  INT_STAT_PREFIX = "configCommonParamById.GetIntConfig(",
  getFloatConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCommonParamById.GetFloatConfig",
  ),
  FLOAT_STAT_PREFIX = "configCommonParamById.GetFloatConfig(",
  getLong54ConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCommonParamById.GetLong54Config",
  ),
  LONG54_STAT_PREFIX = "configCommonParamById.GetLong54Config(",
  getBoolConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCommonParamById.GetBoolConfig",
  ),
  BOOL_STAT_PREFIX = "configCommonParamById.GetBoolConfig(",
  getStringConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCommonParamById.GetStringConfig",
  ),
  STRING_STAT_PREFIX = "configCommonParamById.GetStringConfig(",
  getIntArrayConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCommonParamById.GetIntArrayConfig",
  ),
  INT_ARRAY_STAT_PREFIX = "configCommonParamById.GetIntArrayConfig(",
  getFloatArrayConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCommonParamById.GetFloatArrayConfig",
  ),
  FLOAT_ARRAY_STAT_PREFIX = "configCommonParamById.GetFloatArrayConfig(",
  getLong54ArrayConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCommonParamById.GetLong54ArrayConfig",
  ),
  LONG54_ARRAY_STAT_PREFIX = "configCommonParamById.GetLong54ArrayConfig(",
  getStringArrayConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configCommonParamById.GetStringArrayConfig",
  ),
  STRING_ARRAY_STAT_PREFIX = "configCommonParamById.GetStringArrayConfig(";
exports.configCommonParamById = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetIntConfig: (t) => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + INT_STAT_PREFIX + t + ")"),
      o = (getIntConfigStat?.Start(), a?.Start(), intCache.get(t));
    if (o) return a?.Stop(), getIntConfigStat?.Stop(), o;
    var [o, n] = getDataView(t);
    if (
      o &&
      (o = DeserializeConfig_1.DeserializeConfig.ParseInt(n, 0, ...logPair, [
        "Id",
        t,
      ])).Success
    )
      return (
        intCache.set(t, o.Value), a?.Stop(), getIntConfigStat?.Stop(), o.Value
      );
    a?.Stop(), getIntConfigStat?.Stop();
  },
  GetFloatConfig: (t) => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + FLOAT_STAT_PREFIX + t + ")"),
      o = (getFloatConfigStat?.Start(), a?.Start(), floatCache.get(t));
    if (o) return a?.Stop(), getFloatConfigStat?.Stop(), o;
    var [o, n] = getDataView(t);
    if (
      o &&
      (o = DeserializeConfig_1.DeserializeConfig.ParseFloat(n, 0, ...logPair, [
        "Id",
        t,
      ])).Success
    )
      return (
        floatCache.set(t, o.Value),
        a?.Stop(),
        getFloatConfigStat?.Stop(),
        o.Value
      );
    a?.Stop(), getFloatConfigStat?.Stop();
  },
  GetLong54Config: (t) => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + LONG54_STAT_PREFIX + t + ")"),
      o = (getLong54ConfigStat?.Start(), a?.Start(), long54Cache.get(t));
    if (o) return a?.Stop(), getLong54ConfigStat?.Stop(), o;
    var [o, n] = getDataView(t);
    if (
      o &&
      (o = DeserializeConfig_1.DeserializeConfig.ParseFloat64(
        n,
        0,
        ...logPair,
        ["Id", t],
      )).Success
    )
      return (
        long54Cache.set(t, o.Value),
        a?.Stop(),
        getLong54ConfigStat?.Stop(),
        o.Value
      );
    a?.Stop(), getLong54ConfigStat?.Stop();
  },
  GetBoolConfig: (t) => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + BOOL_STAT_PREFIX + t + ")"),
      o = (getBoolConfigStat?.Start(), a?.Start(), boolCache.get(t));
    if (o) return a?.Stop(), getBoolConfigStat?.Stop(), o;
    var [o, n] = getDataView(t);
    if (
      o &&
      (o = DeserializeConfig_1.DeserializeConfig.ParseBoolean(
        n,
        0,
        ...logPair,
        ["Id", t],
      )).Success
    )
      return (
        boolCache.set(t, o.Value), a?.Stop(), getBoolConfigStat?.Stop(), o.Value
      );
    a?.Stop(), getBoolConfigStat?.Stop();
  },
  GetStringConfig: (t) => {
    var a = Stats_1.Stat.CreateNoFlameGraph("" + STRING_STAT_PREFIX + t + ")"),
      o = (getStringConfigStat?.Start(), a?.Start(), stringCache.get(t));
    if (o) return a?.Stop(), getStringConfigStat?.Stop(), o;
    var [o, n] = getDataView(t);
    if (
      o &&
      (o = DeserializeConfig_1.DeserializeConfig.ParseString(n, 0, ...logPair, [
        "Id",
        t,
      ])).Success
    )
      return (
        stringCache.set(t, o.Value),
        a?.Stop(),
        getStringConfigStat?.Stop(),
        o.Value
      );
    a?.Stop(), getStringConfigStat?.Stop();
  },
  GetIntArrayConfig: (o) => {
    var n = Stats_1.Stat.CreateNoFlameGraph(
      "" + INT_ARRAY_STAT_PREFIX + o + ")",
    );
    if ((getIntArrayConfigStat?.Start(), n?.Start(), (r = intListCache.get(o))))
      return n?.Stop(), getIntArrayConfigStat?.Stop(), r;
    var [t, i] = getDataView(o);
    if (t) {
      var r = new Array(),
        g = DeserializeConfig_1.DeserializeConfig.ParseInt(i, 0, ...logPair, [
          "Id",
          o,
        ]);
      if (g.Success) {
        let a = g.Position;
        for (let t = 0; t < g.Value; t++) {
          var e = DeserializeConfig_1.DeserializeConfig.ParseInt(
            i,
            a,
            ...logPair,
            ["Id", o],
          );
          if (!e.Success) return n?.Stop(), void getIntArrayConfigStat?.Stop();
          (a = e.Position), r.push(e.Value);
        }
        return (
          intListCache.set(o, r), n?.Stop(), getIntArrayConfigStat?.Stop(), r
        );
      }
    }
    n?.Stop(), getIntArrayConfigStat?.Stop();
  },
  GetFloatArrayConfig: (o) => {
    var n = Stats_1.Stat.CreateNoFlameGraph(
      "" + FLOAT_ARRAY_STAT_PREFIX + o + ")",
    );
    if (
      (getFloatArrayConfigStat?.Start(),
      n?.Start(),
      (r = floatListCache.get(o)))
    )
      return n?.Stop(), getFloatArrayConfigStat?.Stop(), r;
    var [t, i] = getDataView(o);
    if (t) {
      var r = new Array(),
        g = DeserializeConfig_1.DeserializeConfig.ParseInt(i, 0, ...logPair, [
          "Id",
          o,
        ]);
      if (g.Success) {
        let a = g.Position;
        for (let t = 0; t < g.Value; t++) {
          var e = DeserializeConfig_1.DeserializeConfig.ParseFloat(
            i,
            a,
            ...logPair,
            ["Id", o],
          );
          if (!e.Success)
            return n?.Stop(), void getFloatArrayConfigStat?.Stop();
          (a = e.Position), r.push(e.Value);
        }
        return (
          floatListCache.set(o, r),
          n?.Stop(),
          getFloatArrayConfigStat?.Stop(),
          r
        );
      }
    }
    n?.Stop(), getFloatArrayConfigStat?.Stop();
  },
  GetLong54ArrayConfig: (o) => {
    var n = Stats_1.Stat.CreateNoFlameGraph(
      "" + LONG54_ARRAY_STAT_PREFIX + o + ")",
    );
    if (
      (getLong54ArrayConfigStat?.Start(),
      n?.Start(),
      (r = long54ListCache.get(o)))
    )
      return n?.Stop(), getLong54ArrayConfigStat?.Stop(), r;
    var [t, i] = getDataView(o);
    if (t) {
      var r = new Array(),
        g = DeserializeConfig_1.DeserializeConfig.ParseInt(i, 0, ...logPair, [
          "Id",
          o,
        ]);
      if (g.Success) {
        let a = g.Position;
        for (let t = 0; t < g.Value; t++) {
          var e = DeserializeConfig_1.DeserializeConfig.ParseFloat64(
            i,
            a,
            ...logPair,
            ["Id", o],
          );
          if (!e.Success)
            return n?.Stop(), void getLong54ArrayConfigStat?.Stop();
          (a = e.Position), r.push(e.Value);
        }
        return (
          long54ListCache.set(o, r),
          n?.Stop(),
          getLong54ArrayConfigStat?.Stop(),
          r
        );
      }
    }
    n?.Stop(), getLong54ArrayConfigStat?.Stop();
  },
  GetStringArrayConfig: (o) => {
    var n = Stats_1.Stat.CreateNoFlameGraph(
      "" + STRING_ARRAY_STAT_PREFIX + o + ")",
    );
    if (
      (getStringArrayConfigStat?.Start(),
      n?.Start(),
      (r = stringListCache.get(o)))
    )
      return n?.Stop(), getStringArrayConfigStat?.Stop(), r;
    var [t, i] = getDataView(o);
    if (t) {
      var r = new Array(),
        g = DeserializeConfig_1.DeserializeConfig.ParseInt(i, 0, ...logPair, [
          "Id",
          o,
        ]);
      if (g.Success) {
        let a = g.Position;
        for (let t = 0; t < g.Value; t++) {
          var e = DeserializeConfig_1.DeserializeConfig.ParseString(
            i,
            a,
            ...logPair,
            ["Id", o],
          );
          if (!e.Success)
            return n?.Stop(), void getStringArrayConfigStat?.Stop();
          (a = e.Position), r.push(e.Value);
        }
        return (
          stringListCache.set(o, r),
          n?.Stop(),
          getStringArrayConfigStat?.Stop(),
          r
        );
      }
    }
    n?.Stop(), getStringArrayConfigStat?.Stop();
  },
};
//# sourceMappingURL=CommonParamById.js.map
