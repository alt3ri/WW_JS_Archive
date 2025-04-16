"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configExploreActivityTaskByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ExploreActivityTask_1 = require("../Config/ExploreActivityTask"),
  DB = "db_exploreactivity.db",
  FILE = "t.探索度活动.xlsx",
  TABLE = "ExploreActivityTask",
  COMMAND = "select BinData from `ExploreActivityTask` where ActivityId=?",
  KEY_PREFIX = "ExploreActivityTaskByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configExploreActivityTaskByActivityId.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configExploreActivityTaskByActivityId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configExploreActivityTaskByActivityId.GetConfigList(";
exports.configExploreActivityTaskByActivityId = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (i, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${i})`),
      n =
        (o?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (t) {
        var e = KEY_PREFIX + `#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r)
          return (
            o?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActivityId",
              i,
            ])
          )
            break;
          var a = void 0;
          if (
            (([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", i],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              o?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a =
            ExploreActivityTask_1.ExploreActivityTask.getRootAsExploreActivityTask(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          r.push(a);
        }
        return (
          t &&
            ((e = KEY_PREFIX + `#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          o?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ExploreActivityTaskByActivityId.js.map
