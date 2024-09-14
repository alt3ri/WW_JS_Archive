"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEntityAudioConfigById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EntityAudioConfig_1 = require("../Config/EntityAudioConfig"),
  DB = "db_entity_audio.db",
  FILE = "y.音频组件配置.xlsx",
  TABLE = "EntityAudioConfig",
  COMMAND = "select BinData from `EntityAudioConfig` where Id=?",
  KEY_PREFIX = "EntityAudioConfigById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configEntityAudioConfigById.Init"),
  getConfigStat = Stats_1.Stat.Create("configEntityAudioConfigById.GetConfig"),
  CONFIG_STAT_PREFIX = "configEntityAudioConfigById.GetConfig(";
exports.configEntityAudioConfigById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      t =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (i) {
        var C = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e)
          return (
            n.Stop(),
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
        C = void 0;
        if (
          (([t, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          t)
        ) {
          const e =
            EntityAudioConfig_1.EntityAudioConfig.getRootAsEntityAudioConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            i &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=EntityAudioConfigById.js.map
