"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configUniversalActivityById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  UniversalActivity_1 = require("../Config/UniversalActivity"),
  DB = "db_activity.db",
  FILE = "t.通用活动.xlsx",
  TABLE = "UniversalActivity",
  COMMAND = "select BinData from `UniversalActivity` where Id=?",
  KEY_PREFIX = "UniversalActivityById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configUniversalActivityById.Init"),
  getConfigStat = Stats_1.Stat.Create("configUniversalActivityById.GetConfig"),
  CONFIG_STAT_PREFIX = "configUniversalActivityById.GetConfig(";
exports.configUniversalActivityById = {
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
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${i})`),
      o =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (t) {
        var e = KEY_PREFIX + `#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (o =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              i,
            ]))
      ) {
        e = void 0;
        if (
          (([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", i],
          )),
          o)
        ) {
          const a =
            UniversalActivity_1.UniversalActivity.getRootAsUniversalActivity(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            t &&
              ((o = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(o, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=UniversalActivityById.js.map
