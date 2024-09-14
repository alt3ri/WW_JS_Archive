"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBattleScoreLevelConfByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BattleScoreLevelConf_1 = require("../Config/BattleScoreLevelConf"),
  DB = "db_battlescore.db",
  FILE = "z.战斗评分.xlsx",
  TABLE = "BattleScoreLevelConf",
  COMMAND = "select BinData from `BattleScoreLevelConf` where GroupId=?",
  KEY_PREFIX = "BattleScoreLevelConfByGroupId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configBattleScoreLevelConfByGroupId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configBattleScoreLevelConfByGroupId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configBattleScoreLevelConfByGroupId.GetConfigList(";
exports.configBattleScoreLevelConfByGroupId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      n =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (e) {
        var i = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "GroupId",
              o,
            ])
          )
            break;
          var C = void 0;
          if (
            (([n, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["GroupId", o],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C =
            BattleScoreLevelConf_1.BattleScoreLevelConf.getRootAsBattleScoreLevelConf(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          r.push(C);
        }
        return (
          e &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BattleScoreLevelConfByGroupId.js.map
