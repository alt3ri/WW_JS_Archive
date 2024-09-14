"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLongShanStageAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  LongShanStage_1 = require("../Config/LongShanStage"),
  DB = "db_activity.db",
  FILE = "l.龙山主题活动.xlsx",
  TABLE = "LongShanStage",
  COMMAND = "select BinData from `LongShanStage` where ActivityId=?",
  KEY_PREFIX = "LongShanStageAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configLongShanStageAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configLongShanStageAll.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configLongShanStageAll.GetConfigList(";
exports.configLongShanStageAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      i =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActivityId",
              o,
            ])
          )
            break;
          var g = void 0;
          if (
            (([i, g] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", o],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          g = LongShanStage_1.LongShanStage.getRootAsLongShanStage(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          a.push(g);
        }
        return (
          n &&
            ((e = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=LongShanStageAll.js.map
