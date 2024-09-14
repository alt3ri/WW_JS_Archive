"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRiskHarvestBuffRewardById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RiskHarvestBuffReward_1 = require("../Config/RiskHarvestBuffReward"),
  DB = "db_activity.db",
  FILE = "g.割草冒险活动.xlsx",
  TABLE = "RiskHarvestBuffReward",
  COMMAND = "select BinData from `RiskHarvestBuffReward` where Id = ?",
  KEY_PREFIX = "RiskHarvestBuffRewardById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRiskHarvestBuffRewardById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configRiskHarvestBuffRewardById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configRiskHarvestBuffRewardById.GetConfig(";
exports.configRiskHarvestBuffRewardById = {
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
        var e = KEY_PREFIX + `#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
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
        e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          n)
        ) {
          const f =
            RiskHarvestBuffReward_1.RiskHarvestBuffReward.getRootAsRiskHarvestBuffReward(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            i &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, f)),
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
//# sourceMappingURL=RiskHarvestBuffRewardById.js.map
