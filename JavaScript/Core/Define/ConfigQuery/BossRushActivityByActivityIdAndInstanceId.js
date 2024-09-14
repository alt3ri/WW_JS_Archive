"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBossRushActivityByActivityIdAndInstanceId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BossRushActivity_1 = require("../Config/BossRushActivity"),
  DB = "db_activity.db",
  FILE = "b.bossrush活动.xlsx",
  TABLE = "BossRushActivity",
  COMMAND =
    "select BinData from `BossRushActivity` where ActivityId=? And InstId=?",
  KEY_PREFIX = "BossRushActivityByActivityIdAndInstanceId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configBossRushActivityByActivityIdAndInstanceId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configBossRushActivityByActivityIdAndInstanceId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configBossRushActivityByActivityIdAndInstanceId.GetConfigList(";
exports.configBossRushActivityByActivityIdAndInstanceId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t, i, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${t}#${i})`),
      s =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (s) {
      if (o) {
        var e = KEY_PREFIX + `#${t}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            n.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (s =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["ActivityId", t],
              ["InstId", i],
            )
          )
            break;
          var C = void 0;
          if (
            (([s, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", t],
              ["InstId", i],
            )),
            !s)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C = BossRushActivity_1.BossRushActivity.getRootAsBossRushActivity(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          a.push(C);
        }
        return (
          o &&
            ((e = KEY_PREFIX + `#${t}#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BossRushActivityByActivityIdAndInstanceId.js.map
