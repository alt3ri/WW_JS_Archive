"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSignRewardByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SignReward_1 = require("../Config/SignReward"),
  DB = "db_activity.db",
  FILE = "h.回流活动.xlsx",
  TABLE = "SignReward",
  COMMAND = "select BinData from `SignReward` where ActivityId=?",
  KEY_PREFIX = "SignRewardByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configSignRewardByActivityId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configSignRewardByActivityId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configSignRewardByActivityId.GetConfigList(";
exports.configSignRewardByActivityId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (i, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${i})`),
      n =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (o) {
        var e = KEY_PREFIX + `#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActivityId",
              i,
            ])
          )
            break;
          var g = void 0;
          if (
            (([n, g] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", i],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          g = SignReward_1.SignReward.getRootAsSignReward(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          a.push(g);
        }
        return (
          o &&
            ((e = KEY_PREFIX + `#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=SignRewardByActivityId.js.map
