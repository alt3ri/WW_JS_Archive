"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEffectSpecDataGetAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EffectSpecData_1 = require("../Config/EffectSpecData"),
  DB = "db_effectspec.db",
  FILE = "UniverseEditor/EffectSpec.csv",
  TABLE = "EffectSpecData",
  COMMAND = "select BinData from `EffectSpecData`",
  KEY_PREFIX = "EffectSpecDataGetAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configEffectSpecDataGetAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configEffectSpecDataGetAll.GetConfigList",
  );
exports.configEffectSpecDataGetAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t = !0) => {
    var o;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (t) {
        var e = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
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
        n = EffectSpecData_1.EffectSpecData.getRootAsEffectSpecData(
          new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
        );
        i.push(n);
      }
      return (
        t &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, i, i.length)),
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
//# sourceMappingURL=EffectSpecDataGetAll.js.map
