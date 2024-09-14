"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMailFilterAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MailFilter_1 = require("../Config/MailFilter"),
  DB = "db_mail.db",
  FILE = "y.邮件.xlsx",
  TABLE = "MailFilter",
  COMMAND = "select BinData from `MailFilter`",
  KEY_PREFIX = "MailFilterAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configMailFilterAll.Init"),
  getConfigListStat = Stats_1.Stat.Create("configMailFilterAll.GetConfigList");
exports.configMailFilterAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (i = !0) => {
    var o;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (i) {
        var t = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      const e = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var n = void 0;
        if (
          (([o, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        n = MailFilter_1.MailFilter.getRootAsMailFilter(
          new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
        );
        e.push(n);
      }
      return (
        i &&
          ((t = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(t, e, e.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        e
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MailFilterAll.js.map
