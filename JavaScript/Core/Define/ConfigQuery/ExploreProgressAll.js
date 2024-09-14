"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configExploreProgressAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ExploreProgress_1 = require("../Config/ExploreProgress"),
  DB = "db_explore_progress.db",
  FILE = "t.探索度.xlsx",
  TABLE = "ExploreProgress",
  COMMAND = "select BinData from `ExploreProgress`",
  KEY_PREFIX = "ExploreProgressAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configExploreProgressAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configExploreProgressAll.GetConfigList",
  );
exports.configExploreProgressAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o = !0) => {
    var e;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var n = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
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
        var t = void 0;
        if (
          (([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !e)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        t = ExploreProgress_1.ExploreProgress.getRootAsExploreProgress(
          new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
        );
        i.push(t);
      }
      return (
        o &&
          ((n = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(n, i, i.length)),
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
//# sourceMappingURL=ExploreProgressAll.js.map
