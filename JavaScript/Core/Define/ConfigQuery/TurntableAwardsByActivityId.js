"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTurntableAwardsByActivityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TurntableAwards_1 = require("../Config/TurntableAwards"),
  DB = "db_activity.db",
  FILE = "z.转盘活动.xlsx",
  TABLE = "TurntableAwards",
  COMMAND = "select BinData from `TurntableAwards` where ActivityId = ?",
  KEY_PREFIX = "TurntableAwardsByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configTurntableAwardsByActivityId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configTurntableAwardsByActivityId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configTurntableAwardsByActivityId.GetConfigList(";
exports.configTurntableAwardsByActivityId = {
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
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r)
          return (
            o.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair))
      ) {
        const r = new Array();
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
          a = TurntableAwards_1.TurntableAwards.getRootAsTurntableAwards(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          r.push(a);
        }
        return (
          i &&
            ((e = KEY_PREFIX + `#${t})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          o.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=TurntableAwardsByActivityId.js.map
