"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSkillLevelBySkillLevelGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SkillLevel_1 = require("../Config/SkillLevel"),
  DB = "db_skill.db",
  FILE = "j.技能.xlsx",
  TABLE = "SkillLevel",
  COMMAND = "select BinData from `SkillLevel` where SkillLevelGroupId = ?",
  KEY_PREFIX = "SkillLevelBySkillLevelGroupId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configSkillLevelBySkillLevelGroupId.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configSkillLevelBySkillLevelGroupId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configSkillLevelBySkillLevelGroupId.GetConfigList(";
exports.configSkillLevelBySkillLevelGroupId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      n =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (i) {
        var l = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(l);
        if (C)
          return (
            e.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "SkillLevelGroupId",
              o,
            ])
          )
            break;
          var t = void 0;
          if (
            (([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["SkillLevelGroupId", o],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          t = SkillLevel_1.SkillLevel.getRootAsSkillLevel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          C.push(t);
        }
        return (
          i &&
            ((l = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(l, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=SkillLevelBySkillLevelGroupId.js.map
