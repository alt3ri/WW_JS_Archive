"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoguePopularEntrieArgBySeasonIdAndInstId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoguePopularEntrieArg_1 = require("../Config/RoguePopularEntrieArg");
const DB = "db_rogue.db";
const FILE = "r.肉鸽.xlsx";
const TABLE = "RoguePopularEntrieArg";
const COMMAND =
  "select BinData from `RoguePopularEntrieArg` where SeasonId=? AND InstId=?";
const KEY_PREFIX = "RoguePopularEntrieArgBySeasonIdAndInstId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX =
  "configRoguePopularEntrieArgBySeasonIdAndInstId.GetConfig(";
exports.configRoguePopularEntrieArgBySeasonIdAndInstId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n, e = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var r = KEY_PREFIX + `#${o}#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (t) return t;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["SeasonId", o],
            ["InstId", n],
          ) > 0)
      ) {
        var i;
        var r = void 0;
        if (
          (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["SeasonId", o],
            ["InstId", n],
          )),
          i)
        ) {
          const t =
            RoguePopularEntrieArg_1.RoguePopularEntrieArg.getRootAsRoguePopularEntrieArg(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          return (
            e &&
              ((i = KEY_PREFIX + `#${o}#${n})`),
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
// # sourceMappingURL=RoguePopularEntrieArgBySeasonIdAndInstId.js.map
