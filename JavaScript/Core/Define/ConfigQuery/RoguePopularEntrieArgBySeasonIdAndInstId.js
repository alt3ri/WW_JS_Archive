"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoguePopularEntrieArgBySeasonIdAndInstId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoguePopularEntrieArg_1 = require("../Config/RoguePopularEntrieArg"),
  DB = "db_rogue.db",
  FILE = "r.肉鸽.xlsx",
  TABLE = "RoguePopularEntrieArg",
  COMMAND =
    "select BinData from `RoguePopularEntrieArg` where SeasonId=? AND InstId=?",
  KEY_PREFIX = "RoguePopularEntrieArgBySeasonIdAndInstId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configRoguePopularEntrieArgBySeasonIdAndInstId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configRoguePopularEntrieArgBySeasonIdAndInstId.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configRoguePopularEntrieArgBySeasonIdAndInstId.GetConfig(";
exports.configRoguePopularEntrieArgBySeasonIdAndInstId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      i =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (e) {
        var r = KEY_PREFIX + `#${o}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (g)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["SeasonId", o],
              ["InstId", n],
            ))
      ) {
        r = void 0;
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
          const g =
            RoguePopularEntrieArg_1.RoguePopularEntrieArg.getRootAsRoguePopularEntrieArg(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          return (
            e &&
              ((i = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
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
//# sourceMappingURL=RoguePopularEntrieArgBySeasonIdAndInstId.js.map
