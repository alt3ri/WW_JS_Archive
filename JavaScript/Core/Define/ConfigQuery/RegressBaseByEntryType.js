"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRegressBaseByEntryType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RegressBase_1 = require("../Config/RegressBase"),
  DB = "db_activity.db",
  FILE = "h.回流活动(新).xlsx",
  TABLE = "RegressBase",
  COMMAND = "select BinData from `RegressBase` where EntryType=?",
  KEY_PREFIX = "RegressBaseByEntryType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configRegressBaseByEntryType.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configRegressBaseByEntryType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configRegressBaseByEntryType.GetConfigList(";
exports.configRegressBaseByEntryType = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${e})`),
      t =
        (n?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var i = KEY_PREFIX + `#${e})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (s)
          return (
            n?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            s
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
      ) {
        const s = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "EntryType",
              e,
            ])
          )
            break;
          var r = void 0;
          if (
            (([t, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["EntryType", e],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r = RegressBase_1.RegressBase.getRootAsRegressBase(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          s.push(r);
        }
        return (
          o &&
            ((i = KEY_PREFIX + `#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, s, s.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          s
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RegressBaseByEntryType.js.map
