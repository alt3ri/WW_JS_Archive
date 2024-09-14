"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRiskHarvestBuffGroupById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RiskHarvestBuffGroup_1 = require("../Config/RiskHarvestBuffGroup"),
  DB = "db_activity.db",
  FILE = "g.割草冒险活动.xlsx",
  TABLE = "RiskHarvestBuffGroup",
  COMMAND = "select BinData from `RiskHarvestBuffGroup` where Id = ?",
  KEY_PREFIX = "RiskHarvestBuffGroupById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRiskHarvestBuffGroupById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configRiskHarvestBuffGroupById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configRiskHarvestBuffGroupById.GetConfig(";
exports.configRiskHarvestBuffGroupById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      n =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (i) {
        var f = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (e)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        f = void 0;
        if (
          (([n, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          n)
        ) {
          const e =
            RiskHarvestBuffGroup_1.RiskHarvestBuffGroup.getRootAsRiskHarvestBuffGroup(
              new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
            );
          return (
            i &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
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
//# sourceMappingURL=RiskHarvestBuffGroupById.js.map
