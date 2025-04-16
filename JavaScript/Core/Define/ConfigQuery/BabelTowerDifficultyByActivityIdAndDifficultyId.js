"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBabelTowerDifficultyByActivityIdAndDifficultyId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BabelTowerDifficulty_1 = require("../Config/BabelTowerDifficulty"),
  DB = "db_activity.db",
  FILE = "b.巴别塔活动.xlsx",
  TABLE = "BabelTowerDifficulty",
  COMMAND =
    "select BinData from `BabelTowerDifficulty` where ActivityId=? AND DifficultyId=?",
  KEY_PREFIX = "BabelTowerDifficultyByActivityIdAndDifficultyId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configBabelTowerDifficultyByActivityIdAndDifficultyId.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configBabelTowerDifficultyByActivityIdAndDifficultyId.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configBabelTowerDifficultyByActivityIdAndDifficultyId.GetConfig(";
exports.configBabelTowerDifficultyByActivityIdAndDifficultyId = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (i, o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${i}#${o})`),
      f =
        (n?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (f) {
      if (t) {
        var e = KEY_PREFIX + `#${i}#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (l)
          return (
            n?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
      }
      if (
        (f =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ActivityId", i],
              ["DifficultyId", o],
            ))
      ) {
        e = void 0;
        if (
          (([f, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ActivityId", i],
            ["DifficultyId", o],
          )),
          f)
        ) {
          const l =
            BabelTowerDifficulty_1.BabelTowerDifficulty.getRootAsBabelTowerDifficulty(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            t &&
              ((f = KEY_PREFIX + `#${i}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(f, l)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
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
//# sourceMappingURL=BabelTowerDifficultyByActivityIdAndDifficultyId.js.map
