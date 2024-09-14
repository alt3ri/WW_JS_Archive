"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAdventureTaskChapterAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AdventureTaskChapter_1 = require("../Config/AdventureTaskChapter"),
  DB = "db_adventuretask.db",
  FILE = "k.开拓任务.xlsx",
  TABLE = "AdventureTaskChapter",
  COMMAND = "select BinData from `AdventureTaskChapter`",
  KEY_PREFIX = "AdventureTaskChapterAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAdventureTaskChapterAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configAdventureTaskChapterAll.GetConfigList",
  );
exports.configAdventureTaskChapterAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t = !0) => {
    var n;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (t) {
        var o = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (i)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      const i = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !n)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        e =
          AdventureTaskChapter_1.AdventureTaskChapter.getRootAsAdventureTaskChapter(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
        i.push(e);
      }
      return (
        t &&
          ((o = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(o, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        i
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=AdventureTaskChapterAll.js.map
