"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPerformanceConditionById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PerformanceCondition_1 = require("../Config/PerformanceCondition"),
  DB = "db_roleidle.db",
  FILE = "d.待机动作播放条件.xlsx",
  TABLE = "PerformanceCondition",
  COMMAND = "select BinData from `PerformanceCondition` where Id=?",
  KEY_PREFIX = "PerformanceConditionById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPerformanceConditionById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configPerformanceConditionById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configPerformanceConditionById.GetConfig(";
exports.configPerformanceConditionById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      e =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var t = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        t = void 0;
        if (
          (([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          e)
        ) {
          const C =
            PerformanceCondition_1.PerformanceCondition.getRootAsPerformanceCondition(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            n &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PerformanceConditionById.js.map
