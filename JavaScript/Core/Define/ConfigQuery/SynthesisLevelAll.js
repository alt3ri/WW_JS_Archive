"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSynthesisLevelAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SynthesisLevel_1 = require("../Config/SynthesisLevel"),
  DB = "db_compose.db",
  FILE = "h.合成.xlsx",
  TABLE = "SynthesisLevel",
  COMMAND = "select BinData from `SynthesisLevel`",
  KEY_PREFIX = "SynthesisLevelAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configSynthesisLevelAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configSynthesisLevelAll.GetConfigList",
  );
exports.configSynthesisLevelAll = {
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
    var n;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var t = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      const i = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !n)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        e = SynthesisLevel_1.SynthesisLevel.getRootAsSynthesisLevel(
          new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
        );
        i.push(e);
      }
      return (
        o &&
          ((t = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(t, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        i
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=SynthesisLevelAll.js.map
