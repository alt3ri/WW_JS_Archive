"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBossRushTaskTabAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BossRushTaskTab_1 = require("../Config/BossRushTaskTab"),
  DB = "db_activity.db",
  FILE = "b.bossrush活动.xlsx",
  TABLE = "BossRushTaskTab",
  COMMAND = "select BinData from `BossRushTaskTab`",
  KEY_PREFIX = "BossRushTaskTabAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configBossRushTaskTabAll.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configBossRushTaskTabAll.GetConfigList",
  );
exports.configBossRushTaskTabAll = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (o = !0) => {
    var t;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start(),
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var n = KEY_PREFIX + ")";
        const s = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (s)
          return (
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            s
          );
      }
      const s = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !t)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat?.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        i = BossRushTaskTab_1.BossRushTaskTab.getRootAsBossRushTaskTab(
          new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
        );
        s.push(i);
      }
      return (
        o &&
          ((n = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(n, s, s.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat?.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        s
      );
    }
    getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BossRushTaskTabAll.js.map
