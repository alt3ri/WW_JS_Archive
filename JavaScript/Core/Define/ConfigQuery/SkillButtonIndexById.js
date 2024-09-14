"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSkillButtonIndexById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SkillButtonIndex_1 = require("../Config/SkillButtonIndex"),
  DB = "db_skillbutton.db",
  FILE = "j.技能按钮.xlsx",
  TABLE = "SkillButtonIndex",
  COMMAND = "select BinData from `SkillButtonIndex` where Id=?",
  KEY_PREFIX = "SkillButtonIndexById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configSkillButtonIndexById.Init"),
  getConfigStat = Stats_1.Stat.Create("configSkillButtonIndexById.GetConfig"),
  CONFIG_STAT_PREFIX = "configSkillButtonIndexById.GetConfig(";
exports.configSkillButtonIndexById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      i =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var e = KEY_PREFIX + `#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              n,
            ]))
      ) {
        e = void 0;
        if (
          (([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", n],
          )),
          i)
        ) {
          const C =
            SkillButtonIndex_1.SkillButtonIndex.getRootAsSkillButtonIndex(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            o &&
              ((i = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=SkillButtonIndexById.js.map
