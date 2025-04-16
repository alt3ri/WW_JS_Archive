"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFishingActivityByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FishingActivity_1 = require("../Config/FishingActivity"),
  DB = "db_fishing.db",
  FILE = "b.捕鱼大活动.xlsx",
  TABLE = "FishingActivity",
  COMMAND = "select BinData from `FishingActivity` where ActivityId=?",
  KEY_PREFIX = "FishingActivityByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configFishingActivityByActivityId.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configFishingActivityByActivityId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configFishingActivityByActivityId.GetConfig(";
exports.configFishingActivityByActivityId = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (i, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${i})`),
      o =
        (n?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (t) {
        var e = KEY_PREFIX + `#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g)
          return (
            n?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (o =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "ActivityId",
              i,
            ]))
      ) {
        e = void 0;
        if (
          (([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ActivityId", i],
          )),
          o)
        ) {
          const g = FishingActivity_1.FishingActivity.getRootAsFishingActivity(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            t &&
              ((o = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(o, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FishingActivityByActivityId.js.map
