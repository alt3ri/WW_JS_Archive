"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPerformanceConditionByIdWithZero = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PerformanceCondition_1 = require("../Config/PerformanceCondition"),
  DB = "db_roleidle.db",
  FILE = "d.待机动作播放条件.xlsx",
  TABLE = "PerformanceCondition",
  COMMAND =
    "select BinData from `PerformanceCondition` where id=0 AND (SELECT count(0) from `PerformanceCondition` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `PerformanceCondition` WHERE id = ?) >0;",
  KEY_PREFIX = "PerformanceConditionByIdWithZero",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configPerformanceConditionByIdWithZero.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configPerformanceConditionByIdWithZero.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configPerformanceConditionByIdWithZero.GetConfig(";
exports.configPerformanceConditionByIdWithZero = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, i, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n}#${i})`),
      r =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (r) {
      if (e) {
        var C = KEY_PREFIX + `#${o}#${n}#${i})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (r =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Id", o],
              ["Id", n],
              ["Id", i],
            ))
      ) {
        C = void 0;
        if (
          (([r, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
            ["Id", n],
            ["Id", i],
          )),
          r)
        ) {
          const f =
            PerformanceCondition_1.PerformanceCondition.getRootAsPerformanceCondition(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            e &&
              ((r = KEY_PREFIX + `#${o}#${n}#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(r, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PerformanceConditionByIdWithZero.js.map
