"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configQuestTypeByMainId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  QuestType_1 = require("../Config/QuestType"),
  DB = "db_questtype.db",
  FILE = "r.任务类型.xlsx",
  TABLE = "QuestType",
  COMMAND = "select BinData from `QuestType` where MainId=?",
  KEY_PREFIX = "QuestTypeByMainId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configQuestTypeByMainId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configQuestTypeByMainId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configQuestTypeByMainId.GetConfigList(";
exports.configQuestTypeByMainId = {
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
              "MainId",
              o,
            ])
          )
            break;
          var C = void 0;
          if (
            (([i, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["MainId", o],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C = QuestType_1.QuestType.getRootAsQuestType(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          a.push(C);
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
//# sourceMappingURL=QuestTypeByMainId.js.map
