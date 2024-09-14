"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEffectConfigById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EffectConfig_1 = require("../Config/EffectConfig"),
  DB = "db_effect.db",
  FILE = "t.特效.xlsx",
  TABLE = "EffectConfig",
  COMMAND = "select BinData from `EffectConfig` where Id=?",
  KEY_PREFIX = "EffectConfigById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configEffectConfigById.Init"),
  getConfigStat = Stats_1.Stat.Create("configEffectConfigById.GetConfig"),
  CONFIG_STAT_PREFIX = "configEffectConfigById.GetConfig(";
exports.configEffectConfigById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var f = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      t =
        (f.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (e)
          return (
            f.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          t)
        ) {
          const e = EffectConfig_1.EffectConfig.getRootAsEffectConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            f.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    f.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=EffectConfigById.js.map
