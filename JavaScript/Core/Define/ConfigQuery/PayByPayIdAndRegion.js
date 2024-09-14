"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPayByPayIdAndRegion = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  Pay_1 = require("../Config/Pay"),
  DB = "db_paycurrency.db",
  FILE = "c.充值.xlsx",
  TABLE = "Pay",
  COMMAND = "select BinData from `Pay` where PayId=? AND Region=?",
  KEY_PREFIX = "PayByPayIdAndRegion",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPayByPayIdAndRegion.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configPayByPayIdAndRegion.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configPayByPayIdAndRegion.GetConfigList(";
exports.configPayByPayIdAndRegion = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o}#${n})`),
      e =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var a = KEY_PREFIX + `#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, n, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["PayId", o],
              ["Region", n],
            )
          )
            break;
          var g = void 0;
          if (
            (([e, g] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PayId", o],
              ["Region", n],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          g = Pay_1.Pay.getRootAsPay(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          C.push(g);
        }
        return (
          i &&
            ((a = KEY_PREFIX + `#${o}#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(a, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PayByPayIdAndRegion.js.map
