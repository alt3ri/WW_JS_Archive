"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTowerDifficultyByDifficulty = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TowerDifficulty_1 = require("../Config/TowerDifficulty"),
  DB = "db_tower.db",
  FILE = "p.爬塔新.xlsx",
  TABLE = "TowerDifficulty",
  COMMAND = "select BinData from `TowerDifficulty` where Difficulty = ?",
  KEY_PREFIX = "TowerDifficultyByDifficulty",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configTowerDifficultyByDifficulty.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configTowerDifficultyByDifficulty.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTowerDifficultyByDifficulty.GetConfig(";
exports.configTowerDifficultyByDifficulty = {
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
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${i})`),
      f =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (f) {
      if (o) {
        var n = KEY_PREFIX + `#${i})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (e)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (f =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Difficulty",
              i,
            ]))
      ) {
        n = void 0;
        if (
          (([f, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Difficulty", i],
          )),
          f)
        ) {
          const e = TowerDifficulty_1.TowerDifficulty.getRootAsTowerDifficulty(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          return (
            o &&
              ((f = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(f, e)),
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
//# sourceMappingURL=TowerDifficultyByDifficulty.js.map
