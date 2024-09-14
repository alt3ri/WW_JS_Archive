"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDailyAdventureActivityByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DailyAdventureActivity_1 = require("../Config/DailyAdventureActivity"),
  DB = "db_activity.db",
  FILE = "r.日常探险活动.xlsx",
  TABLE = "DailyAdventureActivity",
  COMMAND = "select BinData from `DailyAdventureActivity` where ActivityId=?",
  KEY_PREFIX = "DailyAdventureActivityByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configDailyAdventureActivityByActivityId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configDailyAdventureActivityByActivityId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configDailyAdventureActivityByActivityId.GetConfig(";
exports.configDailyAdventureActivityByActivityId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (i, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${i})`),
      o =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (t) {
        var e = KEY_PREFIX + `#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (o =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "ActivityId",
              i,
            ]))
      ) {
        e = void 0;
        if (
          (([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ActivityId", i],
          )),
          o)
        ) {
          const a =
            DailyAdventureActivity_1.DailyAdventureActivity.getRootAsDailyAdventureActivity(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            t &&
              ((o = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(o, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=DailyAdventureActivityByActivityId.js.map
