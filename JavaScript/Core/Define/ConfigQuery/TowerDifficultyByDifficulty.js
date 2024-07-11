"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTowerDifficultyByDifficulty = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TowerDifficulty_1 = require("../Config/TowerDifficulty");
const DB = "db_tower.db";
const FILE = "p.爬塔新.xlsx";
const TABLE = "TowerDifficulty";
const COMMAND = "select BinData from `TowerDifficulty` where Difficulty = ?";
const KEY_PREFIX = "TowerDifficultyByDifficulty";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configTowerDifficultyByDifficulty.GetConfig(";
exports.configTowerDifficultyByDifficulty = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (i, o = !0) => {
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var f = KEY_PREFIX + `#${i})`;
        const n = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (n) return n;
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Difficulty",
            i,
          ]) > 0)
      ) {
        var e;
        var f = void 0;
        if (
          (([e, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Difficulty", i],
          )),
          e)
        ) {
          const n = TowerDifficulty_1.TowerDifficulty.getRootAsTowerDifficulty(
            new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
          );
          return (
            o &&
              ((e = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, n)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=TowerDifficultyByDifficulty.js.map
