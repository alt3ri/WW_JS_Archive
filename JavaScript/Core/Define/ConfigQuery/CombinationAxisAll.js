"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCombinationAxisAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  CombinationAxis_1 = require("../Config/CombinationAxis"),
  DB = "db_input_settings.db",
  FILE = "s.输入配置.xlsx",
  TABLE = "CombinationAxis",
  COMMAND = "select BinData from `CombinationAxis`",
  KEY_PREFIX = "CombinationAxisAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configCombinationAxisAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configCombinationAxisAll.GetConfigList",
  );
exports.configCombinationAxisAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o = !0) => {
    var i;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var n = KEY_PREFIX + ")";
        const C = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (C)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      const C = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !i)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        t = CombinationAxis_1.CombinationAxis.getRootAsCombinationAxis(
          new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
        );
        C.push(t);
      }
      return (
        o &&
          ((n = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(n, C, C.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        C
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=CombinationAxisAll.js.map
