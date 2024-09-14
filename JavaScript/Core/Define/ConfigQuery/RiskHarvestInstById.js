"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRiskHarvestInstById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RiskHarvestInst_1 = require("../Config/RiskHarvestInst"),
  DB = "db_activity.db",
  FILE = "g.割草冒险活动.xlsx",
  TABLE = "RiskHarvestInst",
  COMMAND = "select BinData from `RiskHarvestInst` where Id = ?",
  KEY_PREFIX = "RiskHarvestInstById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRiskHarvestInstById.Init"),
  getConfigStat = Stats_1.Stat.Create("configRiskHarvestInstById.GetConfig"),
  CONFIG_STAT_PREFIX = "configRiskHarvestInstById.GetConfig(";
exports.configRiskHarvestInstById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (t, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${t})`),
      i =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var e = KEY_PREFIX + `#${t})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              t,
            ]))
      ) {
        e = void 0;
        if (
          (([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", t],
          )),
          i)
        ) {
          const a = RiskHarvestInst_1.RiskHarvestInst.getRootAsRiskHarvestInst(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            n &&
              ((i = KEY_PREFIX + `#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RiskHarvestInstById.js.map
