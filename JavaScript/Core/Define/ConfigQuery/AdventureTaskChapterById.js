"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAdventureTaskChapterById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AdventureTaskChapter_1 = require("../Config/AdventureTaskChapter"),
  DB = "db_adventuretask.db",
  FILE = "k.开拓任务.xlsx",
  TABLE = "AdventureTaskChapter",
  COMMAND = "select BinData from `AdventureTaskChapter` where Id=?",
  KEY_PREFIX = "AdventureTaskChapterById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAdventureTaskChapterById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configAdventureTaskChapterById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configAdventureTaskChapterById.GetConfig(";
exports.configAdventureTaskChapterById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (e, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e})`),
      o =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (n) {
        var i = KEY_PREFIX + `#${e})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (o =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              e,
            ]))
      ) {
        i = void 0;
        if (
          (([o, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", e],
          )),
          o)
        ) {
          const a =
            AdventureTaskChapter_1.AdventureTaskChapter.getRootAsAdventureTaskChapter(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            n &&
              ((o = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(o, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
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
//# sourceMappingURL=AdventureTaskChapterById.js.map
