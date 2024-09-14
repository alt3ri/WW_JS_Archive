"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTurntableActivityByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TurntableActivity_1 = require("../Config/TurntableActivity"),
  DB = "db_activity.db",
  FILE = "z.转盘活动.xlsx",
  TABLE = "TurntableActivity",
  COMMAND = "select BinData from `TurntableActivity` where ActivityId = ?",
  KEY_PREFIX = "TurntableActivityByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configTurntableActivityByActivityId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configTurntableActivityByActivityId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configTurntableActivityByActivityId.GetConfigList(";
exports.configTurntableActivityByActivityId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${t})`),
      n =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (i) {
        var e = KEY_PREFIX + `#${t})`;
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
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActivityId",
              t,
            ])
          )
            break;
          var a = void 0;
          if (
            (([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", t],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              o.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a = TurntableActivity_1.TurntableActivity.getRootAsTurntableActivity(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          C.push(a);
        }
        return (
          i &&
            ((e = KEY_PREFIX + `#${t})`),
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
//# sourceMappingURL=TurntableActivityByActivityId.js.map
