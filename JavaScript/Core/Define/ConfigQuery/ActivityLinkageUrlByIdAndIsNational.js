"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configActivityLinkageUrlByIdAndIsNational = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ActivityLinkageUrl_1 = require("../Config/ActivityLinkageUrl"),
  DB = "db_activitylinkage.db",
  FILE = "h.活动联动页活动.xlsx",
  TABLE = "ActivityLinkageUrl",
  COMMAND =
    "select BinData from `ActivityLinkageUrl` where ActivityLinkageId=? And IsNational=?",
  KEY_PREFIX = "ActivityLinkageUrlByIdAndIsNational",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configActivityLinkageUrlByIdAndIsNational.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configActivityLinkageUrlByIdAndIsNational.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configActivityLinkageUrlByIdAndIsNational.GetConfig(";
exports.configActivityLinkageUrlByIdAndIsNational = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (i, n, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${i}#${n})`),
      a =
        (o?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (t) {
        var e = KEY_PREFIX + `#${i}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g)
          return (
            o?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindBool(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ActivityLinkageId", i],
              ["IsNational", n],
            ))
      ) {
        e = void 0;
        if (
          (([a, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ActivityLinkageId", i],
            ["IsNational", n],
          )),
          a)
        ) {
          const g =
            ActivityLinkageUrl_1.ActivityLinkageUrl.getRootAsActivityLinkageUrl(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            t &&
              ((a = KEY_PREFIX + `#${i}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ActivityLinkageUrlByIdAndIsNational.js.map
