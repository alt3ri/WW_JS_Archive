"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRiskHarvestArtifactById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RiskHarvestArtifact_1 = require("../Config/RiskHarvestArtifact"),
  DB = "db_activity.db",
  FILE = "g.割草冒险活动.xlsx",
  TABLE = "RiskHarvestArtifact",
  COMMAND = "select BinData from `RiskHarvestArtifact` where Id = ?",
  KEY_PREFIX = "RiskHarvestArtifactById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRiskHarvestArtifactById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configRiskHarvestArtifactById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configRiskHarvestArtifactById.GetConfig(";
exports.configRiskHarvestArtifactById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (t, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${t})`),
      n =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (i) {
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
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              t,
            ]))
      ) {
        e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", t],
          )),
          n)
        ) {
          const a =
            RiskHarvestArtifact_1.RiskHarvestArtifact.getRootAsRiskHarvestArtifact(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            i &&
              ((n = KEY_PREFIX + `#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, a)),
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
//# sourceMappingURL=RiskHarvestArtifactById.js.map
