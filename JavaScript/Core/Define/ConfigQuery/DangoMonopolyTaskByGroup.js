"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDangoMonopolyTaskByGroup = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DangoMonopolyTask_1 = require("../Config/DangoMonopolyTask"),
  DB = "db_dangomonopoly.db",
  FILE = "t.团子大富翁.xlsx",
  TABLE = "DangoMonopolyTask",
  COMMAND = "select BinData from `DangoMonopolyTask` where TaskGroupId=?",
  KEY_PREFIX = "DangoMonopolyTaskByGroup",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configDangoMonopolyTaskByGroup.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configDangoMonopolyTaskByGroup.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configDangoMonopolyTaskByGroup.GetConfigList(";
exports.configDangoMonopolyTaskByGroup = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      t =
        (i?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var a = KEY_PREFIX + `#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (g)
          return (
            i?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const g = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "TaskGroupId",
              o,
            ])
          )
            break;
          var e = void 0;
          if (
            (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["TaskGroupId", o],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          e = DangoMonopolyTask_1.DangoMonopolyTask.getRootAsDangoMonopolyTask(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          g.push(e);
        }
        return (
          n &&
            ((a = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(a, g, g.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          g
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=DangoMonopolyTaskByGroup.js.map
