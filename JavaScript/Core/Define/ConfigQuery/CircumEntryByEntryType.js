"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCircumEntryByEntryType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  CircumEntry_1 = require("../Config/CircumEntry"),
  DB = "db_activity.db",
  FILE = "h.回流活动.xlsx",
  TABLE = "CircumEntry",
  COMMAND = "select BinData from `CircumEntry` where EntryType=?",
  KEY_PREFIX = "CircumEntryByEntryType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configCircumEntryByEntryType.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configCircumEntryByEntryType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configCircumEntryByEntryType.GetConfigList(";
exports.configCircumEntryByEntryType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (n, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${n})`),
      i =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (t) {
        var r = KEY_PREFIX + `#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (C)
          return (
            o.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "EntryType",
              n,
            ])
          )
            break;
          var e = void 0;
          if (
            (([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["EntryType", n],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              o.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          e = CircumEntry_1.CircumEntry.getRootAsCircumEntry(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          C.push(e);
        }
        return (
          t &&
            ((r = KEY_PREFIX + `#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(r, C, C.length)),
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
//# sourceMappingURL=CircumEntryByEntryType.js.map
