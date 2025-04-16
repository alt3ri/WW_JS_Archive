"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFogTextureConfigByBlockAndMapIdAndGravity = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FogTextureConfig_1 = require("../Config/FogTextureConfig"),
  DB = "db_mapfog.db",
  FILE = "d.地图迷雾.xlsx",
  TABLE = "FogTextureConfig",
  COMMAND =
    "select BinData from `FogTextureConfig` where Block=? And MapId=? And GravityFlip=?",
  KEY_PREFIX = "FogTextureConfigByBlockAndMapIdAndGravity",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configFogTextureConfigByBlockAndMapIdAndGravity.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configFogTextureConfigByBlockAndMapIdAndGravity.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configFogTextureConfigByBlockAndMapIdAndGravity.GetConfig(";
exports.configFogTextureConfigByBlockAndMapIdAndGravity = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (o, n, i, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(
        CONFIG_STAT_PREFIX + `#${o}#${n}#${i})`,
      ),
      g =
        (e?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (g) {
      if (t) {
        var C = KEY_PREFIX + `#${o}#${n}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a)
          return (
            e?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (g =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Block", o],
              ["MapId", n],
              ["GravityFlip", i],
            ))
      ) {
        C = void 0;
        if (
          (([g, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Block", o],
            ["MapId", n],
            ["GravityFlip", i],
          )),
          g)
        ) {
          const a =
            FogTextureConfig_1.FogTextureConfig.getRootAsFogTextureConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            t &&
              ((g = KEY_PREFIX + `#${o}#${n}#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(g, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FogTextureConfigByBlockAndMapIdAndGravity.js.map
