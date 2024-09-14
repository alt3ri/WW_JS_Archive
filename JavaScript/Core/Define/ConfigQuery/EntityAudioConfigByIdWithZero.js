"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEntityAudioConfigByIdWithZero = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EntityAudioConfig_1 = require("../Config/EntityAudioConfig"),
  DB = "db_entity_audio.db",
  FILE = "y.音频组件配置.xlsx",
  TABLE = "EntityAudioConfig",
  COMMAND =
    "select BinData from `EntityAudioConfig` where id=0 AND (SELECT count(0) from `EntityAudioConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `EntityAudioConfig` WHERE id = ?) >0;",
  KEY_PREFIX = "EntityAudioConfigByIdWithZero",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configEntityAudioConfigByIdWithZero.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configEntityAudioConfigByIdWithZero.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configEntityAudioConfigByIdWithZero.GetConfig(";
exports.configEntityAudioConfigByIdWithZero = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i, n, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var C = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${i}#${n})`),
      e =
        (C.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (t) {
        var f = KEY_PREFIX + `#${o}#${i}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (g)
          return (
            C.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Id", o],
              ["Id", i],
              ["Id", n],
            ))
      ) {
        f = void 0;
        if (
          (([e, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
            ["Id", i],
            ["Id", n],
          )),
          e)
        ) {
          const g =
            EntityAudioConfig_1.EntityAudioConfig.getRootAsEntityAudioConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
            );
          return (
            t &&
              ((e = KEY_PREFIX + `#${o}#${i}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            C.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    C.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=EntityAudioConfigByIdWithZero.js.map
