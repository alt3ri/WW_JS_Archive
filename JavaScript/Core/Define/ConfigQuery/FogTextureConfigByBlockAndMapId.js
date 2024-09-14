"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFogTextureConfigByBlockAndMapId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FogTextureConfig_1 = require("../Config/FogTextureConfig"),
  DB = "db_mapfog.db",
  FILE = "d.地图迷雾.xlsx",
  TABLE = "FogTextureConfig",
  COMMAND = "select BinData from `FogTextureConfig` where Block=? And MapId=?",
  KEY_PREFIX = "FogTextureConfigByBlockAndMapId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configFogTextureConfigByBlockAndMapId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configFogTextureConfigByBlockAndMapId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configFogTextureConfigByBlockAndMapId.GetConfig(";
exports.configFogTextureConfigByBlockAndMapId = {
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
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (i) {
        var g = KEY_PREFIX + `#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (C)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Block", o],
              ["MapId", n],
            ))
      ) {
        g = void 0;
        if (
          (([t, g] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Block", o],
            ["MapId", n],
          )),
          t)
        ) {
          const C =
            FogTextureConfig_1.FogTextureConfig.getRootAsFogTextureConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
            );
          return (
            i &&
              ((t = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
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
//# sourceMappingURL=FogTextureConfigByBlockAndMapId.js.map
