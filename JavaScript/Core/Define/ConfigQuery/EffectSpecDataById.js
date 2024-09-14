"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEffectSpecDataById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EffectSpecData_1 = require("../Config/EffectSpecData"),
  DB = "db_effectspec.db",
  FILE = "UniverseEditor/EffectSpec.csv",
  TABLE = "EffectSpecData",
  COMMAND = "select BinData from `EffectSpecData` where Id=?",
  KEY_PREFIX = "EffectSpecDataById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configEffectSpecDataById.Init"),
  getConfigStat = Stats_1.Stat.Create("configEffectSpecDataById.GetConfig"),
  CONFIG_STAT_PREFIX = "configEffectSpecDataById.GetConfig(";
exports.configEffectSpecDataById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${t})`),
      n =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (o) {
        var f = KEY_PREFIX + `#${t})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (i)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              t,
            ]))
      ) {
        f = void 0;
        if (
          (([n, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", t],
          )),
          n)
        ) {
          const i = EffectSpecData_1.EffectSpecData.getRootAsEffectSpecData(
            new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
          );
          return (
            o &&
              ((n = KEY_PREFIX + `#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=EffectSpecDataById.js.map
