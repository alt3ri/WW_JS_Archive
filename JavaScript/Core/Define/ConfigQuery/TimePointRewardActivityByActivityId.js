"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTimePointRewardActivityByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TimePointRewardActivity_1 = require("../Config/TimePointRewardActivity"),
  DB = "db_activity.db",
  FILE = "d.定点奖励领取活动.xlsx",
  TABLE = "TimePointRewardActivity",
  COMMAND =
    "select BinData from `TimePointRewardActivity` where ActivityId = ?",
  KEY_PREFIX = "TimePointRewardActivityByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configTimePointRewardActivityByActivityId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configTimePointRewardActivityByActivityId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configTimePointRewardActivityByActivityId.GetConfigList(";
exports.configTimePointRewardActivityByActivityId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (i, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${i})`),
      n =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (t) {
        var e = KEY_PREFIX + `#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C)
          return (
            o.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActivityId",
              i,
            ])
          )
            break;
          var a = void 0;
          if (
            (([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", i],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              o.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a =
            TimePointRewardActivity_1.TimePointRewardActivity.getRootAsTimePointRewardActivity(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          C.push(a);
        }
        return (
          t &&
            ((e = KEY_PREFIX + `#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          o.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=TimePointRewardActivityByActivityId.js.map
