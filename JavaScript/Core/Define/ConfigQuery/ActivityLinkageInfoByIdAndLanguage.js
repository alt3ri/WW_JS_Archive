"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configActivityLinkageInfoByIdAndLanguage = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ActivityLinkageInfo_1 = require("../Config/ActivityLinkageInfo"),
  DB = "db_activitylinkage.db",
  FILE = "h.活动联动页活动.xlsx",
  TABLE = "ActivityLinkageInfo",
  COMMAND =
    "select BinData from `ActivityLinkageInfo` where ActivityLinkageId=? And Language=?",
  KEY_PREFIX = "ActivityLinkageInfoByIdAndLanguage",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configActivityLinkageInfoByIdAndLanguage.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configActivityLinkageInfoByIdAndLanguage.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configActivityLinkageInfoByIdAndLanguage.GetConfig(";
exports.configActivityLinkageInfoByIdAndLanguage = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (n, i, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${n}#${i})`),
      e =
        (t?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (o) {
        var g = KEY_PREFIX + `#${n}#${i})`;
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
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ActivityLinkageId", n],
              ["Language", i],
            ))
      ) {
        g = void 0;
        if (
          (([e, g] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ActivityLinkageId", n],
            ["Language", i],
          )),
          e)
        ) {
          const a =
            ActivityLinkageInfo_1.ActivityLinkageInfo.getRootAsActivityLinkageInfo(
              new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
            );
          return (
            o &&
              ((e = KEY_PREFIX + `#${n}#${i})`),
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
//# sourceMappingURL=ActivityLinkageInfoByIdAndLanguage.js.map
