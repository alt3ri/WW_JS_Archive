"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configGachaEffectConfigByTimesAndQuality = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  GachaEffectConfig_1 = require("../Config/GachaEffectConfig"),
  DB = "db_gacha.db",
  FILE = "c.抽卡.xlsx",
  TABLE = "GachaEffectConfig",
  COMMAND =
    "select BinData from `GachaEffectConfig` where Times=? AND Quality=?",
  KEY_PREFIX = "GachaEffectConfigByTimesAndQuality",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configGachaEffectConfigByTimesAndQuality.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configGachaEffectConfigByTimesAndQuality.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configGachaEffectConfigByTimesAndQuality.GetConfig(";
exports.configGachaEffectConfigByTimesAndQuality = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      f =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (f) {
      if (i) {
        var e = KEY_PREFIX + `#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (f =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Times", o],
              ["Quality", n],
            ))
      ) {
        e = void 0;
        if (
          (([f, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Times", o],
            ["Quality", n],
          )),
          f)
        ) {
          const a =
            GachaEffectConfig_1.GachaEffectConfig.getRootAsGachaEffectConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            i &&
              ((f = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(f, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=GachaEffectConfigByTimesAndQuality.js.map
