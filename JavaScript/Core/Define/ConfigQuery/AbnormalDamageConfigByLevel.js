"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAbnormalDamageConfigByLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AbnormalDamageConfig_1 = require("../Config/AbnormalDamageConfig"),
  DB = "db_abnormaldamage.db",
  FILE = "y.异常伤害.xlsx",
  TABLE = "AbnormalDamageConfig",
  COMMAND = "select BinData from `AbnormalDamageConfig` where Level=?",
  KEY_PREFIX = "AbnormalDamageConfigByLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAbnormalDamageConfigByLevel.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configAbnormalDamageConfigByLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configAbnormalDamageConfigByLevel.GetConfig(";
exports.configAbnormalDamageConfigByLevel = {
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
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var a = KEY_PREFIX + `#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (g)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Level",
              o,
            ]))
      ) {
        a = void 0;
        if (
          (([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Level", o],
          )),
          i)
        ) {
          const g =
            AbnormalDamageConfig_1.AbnormalDamageConfig.getRootAsAbnormalDamageConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          return (
            n &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
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
//# sourceMappingURL=AbnormalDamageConfigByLevel.js.map
