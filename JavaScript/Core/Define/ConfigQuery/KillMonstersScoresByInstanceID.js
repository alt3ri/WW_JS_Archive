"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configKillMonstersScoresByInstanceID = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  KillMonstersScores_1 = require("../Config/KillMonstersScores"),
  DB = "db_activity.db",
  FILE = "g.割草活动.xlsx",
  TABLE = "KillMonstersScores",
  COMMAND = "select BinData from `KillMonstersScores` where InstanceID=?",
  KEY_PREFIX = "KillMonstersScoresByInstanceID",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configKillMonstersScoresByInstanceID.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configKillMonstersScoresByInstanceID.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configKillMonstersScoresByInstanceID.GetConfig(";
exports.configKillMonstersScoresByInstanceID = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      e =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (s)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            s
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "InstanceID",
              o,
            ]))
      ) {
        i = void 0;
        if (
          (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["InstanceID", o],
          )),
          e)
        ) {
          const s =
            KillMonstersScores_1.KillMonstersScores.getRootAsKillMonstersScores(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            n &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, s)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            s
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=KillMonstersScoresByInstanceID.js.map
