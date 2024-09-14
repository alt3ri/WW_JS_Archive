"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEntitySkillPreloadByActorBlueprintAndSkillId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EntitySkillPreload_1 = require("../Config/EntitySkillPreload"),
  DB = "db_entity_skill_preload.db",
  FILE = "Preload/EntitySkillPreload.csv",
  TABLE = "EntitySkillPreload",
  COMMAND =
    "select BinData from `EntitySkillPreload` where ActorBlueprint=? AND SkillId=?",
  KEY_PREFIX = "EntitySkillPreloadByActorBlueprintAndSkillId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configEntitySkillPreloadByActorBlueprintAndSkillId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configEntitySkillPreloadByActorBlueprintAndSkillId.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configEntitySkillPreloadByActorBlueprintAndSkillId.GetConfig(";
exports.configEntitySkillPreloadByActorBlueprintAndSkillId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${i})`),
      l =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (l) {
      if (t) {
        var e = KEY_PREFIX + `#${o}#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (l =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ActorBlueprint", o],
              ["SkillId", i],
            ))
      ) {
        e = void 0;
        if (
          (([l, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ActorBlueprint", o],
            ["SkillId", i],
          )),
          l)
        ) {
          const r =
            EntitySkillPreload_1.EntitySkillPreload.getRootAsEntitySkillPreload(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            t &&
              ((l = KEY_PREFIX + `#${o}#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(l, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
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
//# sourceMappingURL=EntitySkillPreloadByActorBlueprintAndSkillId.js.map
