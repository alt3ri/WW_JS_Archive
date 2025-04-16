"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEntityGravityConfigByMapIdAndEntityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EntityGravityConfig_1 = require("../Config/EntityGravityConfig"),
  DB = "db_entitygravity.db",
  FILE = "UniverseEditor/Gravity/重力方向_Json_GravityAbnormalEntityList.csv",
  TABLE = "EntityGravityConfig",
  COMMAND =
    "select BinData from `EntityGravityConfig` where MapId=? And EntityId=?",
  KEY_PREFIX = "EntityGravityConfigByMapIdAndEntityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configEntityGravityConfigByMapIdAndEntityId.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configEntityGravityConfigByMapIdAndEntityId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configEntityGravityConfigByMapIdAndEntityId.GetConfig(";
exports.configEntityGravityConfigByMapIdAndEntityId = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (t, n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${t}#${n})`),
      a =
        (o?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (i) {
        var C = KEY_PREFIX + `#${t}#${n})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e)
          return (
            o?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["MapId", t],
              ["EntityId", n],
            ))
      ) {
        C = void 0;
        if (
          (([a, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MapId", t],
            ["EntityId", n],
          )),
          a)
        ) {
          const e =
            EntityGravityConfig_1.EntityGravityConfig.getRootAsEntityGravityConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            i &&
              ((a = KEY_PREFIX + `#${t}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=EntityGravityConfigByMapIdAndEntityId.js.map
