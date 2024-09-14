"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEntitySkillPreloadByActorBlueprint = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EntitySkillPreload_1 = require("../Config/EntitySkillPreload"),
  DB = "db_entity_skill_preload.db",
  FILE = "Preload/EntitySkillPreload.csv",
  TABLE = "EntitySkillPreload",
  COMMAND = "select BinData from `EntitySkillPreload` where ActorBlueprint=?",
  KEY_PREFIX = "EntitySkillPreloadByActorBlueprint",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configEntitySkillPreloadByActorBlueprint.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configEntitySkillPreloadByActorBlueprint.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configEntitySkillPreloadByActorBlueprint.GetConfigList(";
exports.configEntitySkillPreloadByActorBlueprint = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${t})`),
      n =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (o) {
        var e = KEY_PREFIX + `#${t})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (l)
          return (
            i.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, t, ...logPair))
      ) {
        const l = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ActorBlueprint",
              t,
            ])
          )
            break;
          var r = void 0;
          if (
            (([n, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActorBlueprint", t],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r =
            EntitySkillPreload_1.EntitySkillPreload.getRootAsEntitySkillPreload(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          l.push(r);
        }
        return (
          o &&
            ((e = KEY_PREFIX + `#${t})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, l, l.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          l
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=EntitySkillPreloadByActorBlueprint.js.map
