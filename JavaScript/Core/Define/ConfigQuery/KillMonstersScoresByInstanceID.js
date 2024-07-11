"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configKillMonstersScoresByInstanceID = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KillMonstersScores_1 = require("../Config/KillMonstersScores");
const DB = "db_activity.db";
const FILE = "g.割草活动.xlsx";
const TABLE = "KillMonstersScores";
const COMMAND = "select BinData from `KillMonstersScores` where InstanceID=?";
const KEY_PREFIX = "KillMonstersScoresByInstanceID";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configKillMonstersScoresByInstanceID.GetConfig(";
exports.configKillMonstersScoresByInstanceID = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) return r;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "InstanceID",
            o,
          ]) > 0)
      ) {
        var i;
        var e = void 0;
        if (
          (([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["InstanceID", o],
          )),
          i)
        ) {
          const r =
            KillMonstersScores_1.KillMonstersScores.getRootAsKillMonstersScores(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            n &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=KillMonstersScoresByInstanceID.js.map
