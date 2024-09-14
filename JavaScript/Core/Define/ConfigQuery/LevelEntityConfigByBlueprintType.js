"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLevelEntityConfigByBlueprintType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  LevelEntityConfig_1 = require("../Config/LevelEntityConfig"),
  DB = "db_level_entity.db",
  FILE = "UniverseEditor/Entity/LevelEntity.csv",
  TABLE = "LevelEntityConfig",
  COMMAND = "select BinData from `LevelEntityConfig` where BlueprintType=?",
  KEY_PREFIX = "LevelEntityConfigByBlueprintType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configLevelEntityConfigByBlueprintType.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configLevelEntityConfigByBlueprintType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configLevelEntityConfigByBlueprintType.GetConfigList(";
exports.configLevelEntityConfigByBlueprintType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${n})`),
      o =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (i) {
        var e = KEY_PREFIX + `#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (o = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair))
      ) {
        const f = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "BlueprintType",
              n,
            ])
          )
            break;
          var C = void 0;
          if (
            (([o, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["BlueprintType", n],
            )),
            !o)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C = LevelEntityConfig_1.LevelEntityConfig.getRootAsLevelEntityConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          f.push(C);
        }
        return (
          i &&
            ((e = KEY_PREFIX + `#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, f, f.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          f
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=LevelEntityConfigByBlueprintType.js.map
