"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRewardViewFromSourceAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RewardViewFromSource_1 = require("../Config/RewardViewFromSource"),
  DB = "db_rewardui.db",
  FILE = "j.奖励界面表现.xlsx",
  TABLE = "RewardViewFromSource",
  COMMAND = "select BinData from `RewardViewFromSource`",
  KEY_PREFIX = "RewardViewFromSourceAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRewardViewFromSourceAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configRewardViewFromSourceAll.GetConfigList",
  );
exports.configRewardViewFromSourceAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o = !0) => {
    var e;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      const t = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var n = void 0;
        if (
          (([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !e)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        n =
          RewardViewFromSource_1.RewardViewFromSource.getRootAsRewardViewFromSource(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
        t.push(n);
      }
      return (
        o &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, t, t.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        t
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RewardViewFromSourceAll.js.map
