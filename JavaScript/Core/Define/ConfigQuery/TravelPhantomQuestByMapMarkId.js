"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTravelPhantomQuestByMapMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TravelPhantomQuest_1 = require("../Config/TravelPhantomQuest"),
  DB = "db_activitymaptravel.db",
  FILE = "d.地图主题活动.xlsx",
  TABLE = "TravelPhantomQuest",
  COMMAND = "select BinData from `TravelPhantomQuest` where MapMarkId=?",
  KEY_PREFIX = "TravelPhantomQuestByMapMarkId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configTravelPhantomQuestByMapMarkId.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configTravelPhantomQuestByMapMarkId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTravelPhantomQuestByMapMarkId.GetConfig(";
exports.configTravelPhantomQuestByMapMarkId = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      a =
        (n?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (t) {
        var e = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i)
          return (
            n?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "MapMarkId",
              o,
            ]))
      ) {
        e = void 0;
        if (
          (([a, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MapMarkId", o],
          )),
          a)
        ) {
          const i =
            TravelPhantomQuest_1.TravelPhantomQuest.getRootAsTravelPhantomQuest(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            t &&
              ((a = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=TravelPhantomQuestByMapMarkId.js.map
