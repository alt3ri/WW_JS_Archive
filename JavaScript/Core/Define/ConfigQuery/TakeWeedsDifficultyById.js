"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTakeWeedsDifficultyById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TakeWeedsDifficulty_1 = require("../Config/TakeWeedsDifficulty"),
  DB = "db_activity.db",
  FILE = "g.割草活动.xlsx",
  TABLE = "TakeWeedsDifficulty",
  COMMAND = "select BinData from `TakeWeedsDifficulty` where Id=?",
  KEY_PREFIX = "TakeWeedsDifficultyById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configTakeWeedsDifficultyById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configTakeWeedsDifficultyById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTakeWeedsDifficultyById.GetConfig(";
exports.configTakeWeedsDifficultyById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (i, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${i})`),
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var n = KEY_PREFIX + `#${i})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (f)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              i,
            ]))
      ) {
        n = void 0;
        if (
          (([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", i],
          )),
          t)
        ) {
          const f =
            TakeWeedsDifficulty_1.TakeWeedsDifficulty.getRootAsTakeWeedsDifficulty(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            o &&
              ((t = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=TakeWeedsDifficultyById.js.map
