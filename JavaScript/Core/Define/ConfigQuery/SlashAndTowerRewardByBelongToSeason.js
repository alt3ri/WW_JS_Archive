"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSlashAndTowerRewardByBelongToSeason = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SlashAndTowerReward_1 = require("../Config/SlashAndTowerReward"),
  DB = "db_shiptower.db",
  FILE = "g.割草爬塔常驻.xlsx",
  TABLE = "SlashAndTowerReward",
  COMMAND = "select BinData from `SlashAndTowerReward` where BelongToSeason=?",
  KEY_PREFIX = "SlashAndTowerRewardByBelongToSeason",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configSlashAndTowerRewardByBelongToSeason.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configSlashAndTowerRewardByBelongToSeason.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configSlashAndTowerRewardByBelongToSeason.GetConfigList(";
exports.configSlashAndTowerRewardByBelongToSeason = {
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
    var e = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      i =
        (e?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var t = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r)
          return (
            e?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "BelongToSeason",
              o,
            ])
          )
            break;
          var a = void 0;
          if (
            (([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["BelongToSeason", o],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a =
            SlashAndTowerReward_1.SlashAndTowerReward.getRootAsSlashAndTowerReward(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          r.push(a);
        }
        return (
          n &&
            ((t = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=SlashAndTowerRewardByBelongToSeason.js.map
