"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAchievementStarLevelByLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AchievementStarLevel_1 = require("../Config/AchievementStarLevel");
const DB = "db_achievement.db";
const FILE = "c.成就.xlsx";
const TABLE = "AchievementStarLevel";
const COMMAND = "select BinData from `AchievementStarLevel` where Level=?";
const KEY_PREFIX = "AchievementStarLevelByLevel";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configAchievementStarLevelByLevel.GetConfig(";
exports.configAchievementStarLevelByLevel = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, o = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + `#${e})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (t) return t;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Level",
            e,
          ]) > 0)
      ) {
        var i;
        var n = void 0;
        if (
          (([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Level", e],
          )),
          i)
        ) {
          const t =
            AchievementStarLevel_1.AchievementStarLevel.getRootAsAchievementStarLevel(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            o &&
              ((i = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=AchievementStarLevelByLevel.js.map
