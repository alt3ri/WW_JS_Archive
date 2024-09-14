"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCharacterAudioConfigByIdWithDefaultId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  CharacterAudioConfig_1 = require("../Config/CharacterAudioConfig"),
  DB = "db_entity_audio.db",
  FILE = "y.音频组件配置.xlsx",
  TABLE = "CharacterAudioConfig",
  COMMAND =
    "select BinData from `CharacterAudioConfig` where id = ? AND (SELECT count(0) from `CharacterAudioConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `CharacterAudioConfig` WHERE id = ?) >0;",
  KEY_PREFIX = "CharacterAudioConfigByIdWithDefaultId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configCharacterAudioConfigByIdWithDefaultId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configCharacterAudioConfigByIdWithDefaultId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configCharacterAudioConfigByIdWithDefaultId.GetConfig(";
exports.configCharacterAudioConfigByIdWithDefaultId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i, n, t, C = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var a = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${i}#${n}#${t})`),
      e =
        (a.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (C) {
        var f = KEY_PREFIX + `#${o}#${i}#${n}#${t})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (d)
          return (
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            d
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 4, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Id", o],
              ["Id", i],
              ["Id", n],
              ["Id", t],
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
            ["Id", t],
          )),
          e)
        ) {
          const d =
            CharacterAudioConfig_1.CharacterAudioConfig.getRootAsCharacterAudioConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
            );
          return (
            C &&
              ((e = KEY_PREFIX + `#${o}#${i}#${n}#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, d)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            d
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=CharacterAudioConfigByIdWithDefaultId.js.map
