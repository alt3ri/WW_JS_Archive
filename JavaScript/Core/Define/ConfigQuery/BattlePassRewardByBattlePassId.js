"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBattlePassRewardByBattlePassId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BattlePassReward_1 = require("../Config/BattlePassReward"),
  DB = "db_battle_pass.db",
  FILE = "z.战令.xlsx",
  TABLE = "BattlePassReward",
  COMMAND = "select BinData from `BattlePassReward` where BattlePassId=?",
  KEY_PREFIX = "BattlePassRewardByBattlePassId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configBattlePassRewardByBattlePassId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configBattlePassRewardByBattlePassId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configBattlePassRewardByBattlePassId.GetConfigList(";
exports.configBattlePassRewardByBattlePassId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var a = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${t})`),
      e =
        (a.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (o) {
        var n = KEY_PREFIX + `#${t})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (s)
          return (
            a.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            s
          );
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair))
      ) {
        const s = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "BattlePassId",
              t,
            ])
          )
            break;
          var i = void 0;
          if (
            (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["BattlePassId", t],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              a.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          i = BattlePassReward_1.BattlePassReward.getRootAsBattlePassReward(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          s.push(i);
        }
        return (
          o &&
            ((n = KEY_PREFIX + `#${t})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, s, s.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          a.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          s
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BattlePassRewardByBattlePassId.js.map
