"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBranchLineAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BranchLine_1 = require("../Config/BranchLine"),
  DB = "db_moonchasing.db",
  FILE = "z.追月节.xlsx",
  TABLE = "BranchLine",
  COMMAND = "select BinData from `BranchLine`",
  KEY_PREFIX = "BranchLineAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configBranchLineAll.Init"),
  getConfigListStat = Stats_1.Stat.Create("configBranchLineAll.GetConfigList");
exports.configBranchLineAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (n = !0) => {
    var o;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (n) {
        var i = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
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
        var t = void 0;
        if (
          (([o, t] = ConfigCommon_1.ConfigCommon.GetValue(
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
        t = BranchLine_1.BranchLine.getRootAsBranchLine(
          new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
        );
        e.push(t);
      }
      return (
        n &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, e, e.length)),
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
//# sourceMappingURL=BranchLineAll.js.map
