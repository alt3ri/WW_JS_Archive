"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCalabashDevelopRewardByMonsterId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  CalabashDevelopReward_1 = require("../Config/CalabashDevelopReward"),
  DB = "db_calabash.db",
  FILE = "h.葫芦.xlsx",
  TABLE = "CalabashDevelopReward",
  COMMAND = "select BinData from `CalabashDevelopReward` where MonsterId=?",
  KEY_PREFIX = "CalabashDevelopRewardByMonsterId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configCalabashDevelopRewardByMonsterId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configCalabashDevelopRewardByMonsterId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configCalabashDevelopRewardByMonsterId.GetConfig(";
exports.configCalabashDevelopRewardByMonsterId = {
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
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      a =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (e) {
        var t = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "MonsterId",
              o,
            ]))
      ) {
        t = void 0;
        if (
          (([a, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MonsterId", o],
          )),
          a)
        ) {
          const i =
            CalabashDevelopReward_1.CalabashDevelopReward.getRootAsCalabashDevelopReward(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            e &&
              ((a = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=CalabashDevelopRewardByMonsterId.js.map
