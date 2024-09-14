"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTimePointRewardActivityById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TimePointRewardActivity_1 = require("../Config/TimePointRewardActivity"),
  DB = "db_activity.db",
  FILE = "d.定点奖励领取活动.xlsx",
  TABLE = "TimePointRewardActivity",
  COMMAND = "select BinData from `TimePointRewardActivity` where Id = ?",
  KEY_PREFIX = "TimePointRewardActivityById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configTimePointRewardActivityById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configTimePointRewardActivityById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTimePointRewardActivityById.GetConfig(";
exports.configTimePointRewardActivityById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (i, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${i})`),
      n =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (t) {
        var e = KEY_PREFIX + `#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              i,
            ]))
      ) {
        e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", i],
          )),
          n)
        ) {
          const a =
            TimePointRewardActivity_1.TimePointRewardActivity.getRootAsTimePointRewardActivity(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            t &&
              ((n = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=TimePointRewardActivityById.js.map
