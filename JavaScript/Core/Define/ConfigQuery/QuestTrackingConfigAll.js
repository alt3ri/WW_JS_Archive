"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configQuestTrackingConfigAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  QuestTrackingConfig_1 = require("../Config/QuestTrackingConfig"),
  DB = "db_questtrackingconfig.db",
  FILE = "k.可视化编辑/c.Csv/r.任务追踪配置/*.csv*",
  TABLE = "QuestTrackingConfig",
  COMMAND = "select BinData from `QuestTrackingConfig`",
  KEY_PREFIX = "QuestTrackingConfigAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configQuestTrackingConfigAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configQuestTrackingConfigAll.GetConfigList",
  );
exports.configQuestTrackingConfigAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (n = !0) => {
    var o;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (n) {
        var i = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (e)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      const e = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var t = void 0;
        if (
          (([o, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        t =
          QuestTrackingConfig_1.QuestTrackingConfig.getRootAsQuestTrackingConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
        e.push(t);
      }
      return (
        n &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, e, e.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        e
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=QuestTrackingConfigAll.js.map
