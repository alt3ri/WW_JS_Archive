"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRegressInvestigationByInvestigationTypeAndIfGlobal = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RegressInvestigation_1 = require("../Config/RegressInvestigation"),
  DB = "db_activity.db",
  FILE = "h.回流活动(新).xlsx",
  TABLE = "RegressInvestigation",
  COMMAND =
    "select BinData from `RegressInvestigation` where InvestigationType=? And IfGlobal=?",
  KEY_PREFIX = "RegressInvestigationByInvestigationTypeAndIfGlobal",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configRegressInvestigationByInvestigationTypeAndIfGlobal.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configRegressInvestigationByInvestigationTypeAndIfGlobal.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configRegressInvestigationByInvestigationTypeAndIfGlobal.GetConfig(";
exports.configRegressInvestigationByInvestigationTypeAndIfGlobal = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (n, o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${n}#${o})`),
      e =
        (t?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var g = KEY_PREFIX + `#${n}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (a)
          return (
            t?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindBool(handleId, 2, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["InvestigationType", n],
              ["IfGlobal", o],
            ))
      ) {
        g = void 0;
        if (
          (([e, g] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["InvestigationType", n],
            ["IfGlobal", o],
          )),
          e)
        ) {
          const a =
            RegressInvestigation_1.RegressInvestigation.getRootAsRegressInvestigation(
              new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
            );
          return (
            i &&
              ((e = KEY_PREFIX + `#${n}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RegressInvestigationByInvestigationTypeAndIfGlobal.js.map
