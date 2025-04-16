"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRegressSignRewardByGradeAndActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RegressSignReward_1 = require("../Config/RegressSignReward"),
  DB = "db_activity.db",
  FILE = "h.回流活动(新).xlsx",
  TABLE = "RegressSignReward",
  COMMAND =
    "select BinData from `RegressSignReward` where Grade=? And ActivityId = ?",
  KEY_PREFIX = "RegressSignRewardByGradeAndActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configRegressSignRewardByGradeAndActivityId.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configRegressSignRewardByGradeAndActivityId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configRegressSignRewardByGradeAndActivityId.GetConfigList(";
exports.configRegressSignRewardByGradeAndActivityId = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (i, n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(
        CONFIG_LIST_STAT_PREFIX + `#${i}#${n})`,
      ),
      t =
        (e?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var r = KEY_PREFIX + `#${i}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (a)
          return (
            e?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["Grade", i],
              ["ActivityId", n],
            )
          )
            break;
          var g = void 0;
          if (
            (([t, g] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["Grade", i],
              ["ActivityId", n],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          g = RegressSignReward_1.RegressSignReward.getRootAsRegressSignReward(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          a.push(g);
        }
        return (
          o &&
            ((r = KEY_PREFIX + `#${i}#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(r, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RegressSignRewardByGradeAndActivityId.js.map
