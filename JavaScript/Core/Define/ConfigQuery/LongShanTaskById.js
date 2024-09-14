"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLongShanTaskById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  LongShanTask_1 = require("../Config/LongShanTask"),
  DB = "db_activity.db",
  FILE = "l.龙山主题活动.xlsx",
  TABLE = "LongShanTask",
  COMMAND = "select BinData from `LongShanTask` where TaskId=?",
  KEY_PREFIX = "LongShanTaskById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configLongShanTaskById.Init"),
  getConfigStat = Stats_1.Stat.Create("configLongShanTaskById.GetConfig"),
  CONFIG_STAT_PREFIX = "configLongShanTaskById.GetConfig(";
exports.configLongShanTaskById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var a = KEY_PREFIX + `#${n})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "TaskId",
              n,
            ]))
      ) {
        a = void 0;
        if (
          (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["TaskId", n],
          )),
          t)
        ) {
          const e = LongShanTask_1.LongShanTask.getRootAsLongShanTask(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            o &&
              ((t = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=LongShanTaskById.js.map
