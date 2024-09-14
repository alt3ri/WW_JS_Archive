"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRewardViewFromSourceBySourceId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RewardViewFromSource_1 = require("../Config/RewardViewFromSource"),
  DB = "db_rewardui.db",
  FILE = "j.奖励界面表现.xlsx",
  TABLE = "RewardViewFromSource",
  COMMAND = "select BinData from `RewardViewFromSource` where RewardSourceId=?",
  KEY_PREFIX = "RewardViewFromSourceBySourceId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configRewardViewFromSourceBySourceId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configRewardViewFromSourceBySourceId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configRewardViewFromSourceBySourceId.GetConfig(";
exports.configRewardViewFromSourceBySourceId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var r = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      i =
        (r.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (e) {
        var n = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (t)
          return (
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "RewardSourceId",
              o,
            ]))
      ) {
        n = void 0;
        if (
          (([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["RewardSourceId", o],
          )),
          i)
        ) {
          const t =
            RewardViewFromSource_1.RewardViewFromSource.getRootAsRewardViewFromSource(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            e &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RewardViewFromSourceBySourceId.js.map
