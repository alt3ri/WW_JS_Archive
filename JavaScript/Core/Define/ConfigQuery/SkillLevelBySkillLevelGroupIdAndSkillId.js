"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSkillLevelBySkillLevelGroupIdAndSkillId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SkillLevel_1 = require("../Config/SkillLevel"),
  DB = "db_skill.db",
  FILE = "j.技能.xlsx",
  TABLE = "SkillLevel",
  COMMAND =
    "select BinData from `SkillLevel` where SkillLevelGroupId = ? AND SkillId = ?",
  KEY_PREFIX = "SkillLevelBySkillLevelGroupIdAndSkillId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configSkillLevelBySkillLevelGroupIdAndSkillId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configSkillLevelBySkillLevelGroupIdAndSkillId.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configSkillLevelBySkillLevelGroupIdAndSkillId.GetConfig(";
exports.configSkillLevelBySkillLevelGroupIdAndSkillId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, l, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${l})`),
      n =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (i) {
        var t = KEY_PREFIX + `#${o}#${l})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, l, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["SkillLevelGroupId", o],
              ["SkillId", l],
            ))
      ) {
        t = void 0;
        if (
          (([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["SkillLevelGroupId", o],
            ["SkillId", l],
          )),
          n)
        ) {
          const C = SkillLevel_1.SkillLevel.getRootAsSkillLevel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            i &&
              ((n = KEY_PREFIX + `#${o}#${l})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, C)),
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
//# sourceMappingURL=SkillLevelBySkillLevelGroupIdAndSkillId.js.map
