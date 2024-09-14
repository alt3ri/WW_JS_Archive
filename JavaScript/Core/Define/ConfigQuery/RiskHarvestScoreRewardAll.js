"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRiskHarvestScoreRewardAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RiskHarvestScoreReward_1 = require("../Config/RiskHarvestScoreReward"),
  DB = "db_activity.db",
  FILE = "g.割草冒险活动.xlsx",
  TABLE = "RiskHarvestScoreReward",
  COMMAND = "select BinData from `RiskHarvestScoreReward`",
  KEY_PREFIX = "RiskHarvestScoreRewardAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRiskHarvestScoreRewardAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configRiskHarvestScoreRewardAll.GetConfigList",
  );
exports.configRiskHarvestScoreRewardAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o = !0) => {
    var t;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (n)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            n
          );
      }
      const n = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var e = void 0;
        if (
          (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !t)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        e =
          RiskHarvestScoreReward_1.RiskHarvestScoreReward.getRootAsRiskHarvestScoreReward(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
        n.push(e);
      }
      return (
        o &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, n, n.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        n
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RiskHarvestScoreRewardAll.js.map
