"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configExploreProgressByArea = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ExploreProgress_1 = require("../Config/ExploreProgress"),
  DB = "db_explore_progress.db",
  FILE = "t.探索度.xlsx",
  TABLE = "ExploreProgress",
  COMMAND = "select BinData from `ExploreProgress` where Area=?",
  KEY_PREFIX = "ExploreProgressByArea",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configExploreProgressByArea.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configExploreProgressByArea.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configExploreProgressByArea.GetConfigList(";
exports.configExploreProgressByArea = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var r = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      n =
        (r.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (e) {
        var i = KEY_PREFIX + `#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (g)
          return (
            r.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const g = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "Area",
              o,
            ])
          )
            break;
          var t = void 0;
          if (
            (([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["Area", o],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              r.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          t = ExploreProgress_1.ExploreProgress.getRootAsExploreProgress(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          g.push(t);
        }
        return (
          e &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, g, g.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          r.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          g
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ExploreProgressByArea.js.map
