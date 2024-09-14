"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLevelEntityConfigByMapIdAndEntityId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  LevelEntityConfig_1 = require("../Config/LevelEntityConfig"),
  DB = "db_level_entity.db",
  FILE = "UniverseEditor/Entity/LevelEntity.csv",
  TABLE = "LevelEntityConfig",
  COMMAND =
    "select BinData from `LevelEntityConfig` where MapId=? and EntityId=?",
  KEY_PREFIX = "LevelEntityConfigByMapIdAndEntityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configLevelEntityConfigByMapIdAndEntityId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configLevelEntityConfigByMapIdAndEntityId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configLevelEntityConfigByMapIdAndEntityId.GetConfig(";
exports.configLevelEntityConfigByMapIdAndEntityId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n}#${t})`),
      e =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (o) {
        var C = KEY_PREFIX + `#${n}#${t})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["MapId", n],
              ["EntityId", t],
            ))
      ) {
        C = void 0;
        if (
          (([e, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MapId", n],
            ["EntityId", t],
          )),
          e)
        ) {
          const f =
            LevelEntityConfig_1.LevelEntityConfig.getRootAsLevelEntityConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            o &&
              ((e = KEY_PREFIX + `#${n}#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=LevelEntityConfigByMapIdAndEntityId.js.map
