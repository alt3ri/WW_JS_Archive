"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSkillDescriptionBySkillLevelGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SkillDescription_1 = require("../Config/SkillDescription"),
  DB = "db_skill.db",
  FILE = "j.技能.xlsx",
  TABLE = "SkillDescription",
  COMMAND =
    "select BinData from `SkillDescription` where SkillLevelGroupId = ?",
  KEY_PREFIX = "SkillDescriptionBySkillLevelGroupId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configSkillDescriptionBySkillLevelGroupId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configSkillDescriptionBySkillLevelGroupId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configSkillDescriptionBySkillLevelGroupId.GetConfigList(";
exports.configSkillDescriptionBySkillLevelGroupId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (i, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${i})`),
      t =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var e = KEY_PREFIX + `#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r)
          return (
            n.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
      ) {
        const r = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "SkillLevelGroupId",
              i,
            ])
          )
            break;
          var l = void 0;
          if (
            (([t, l] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["SkillLevelGroupId", i],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          l = SkillDescription_1.SkillDescription.getRootAsSkillDescription(
            new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)),
          );
          r.push(l);
        }
        return (
          o &&
            ((e = KEY_PREFIX + `#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          r
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=SkillDescriptionBySkillLevelGroupId.js.map
