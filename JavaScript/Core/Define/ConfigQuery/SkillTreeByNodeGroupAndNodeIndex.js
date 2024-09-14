"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSkillTreeByNodeGroupAndNodeIndex = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SkillTree_1 = require("../Config/SkillTree"),
  DB = "db_skilltree.db",
  FILE = "j.技能树.xlsx",
  TABLE = "SkillTree",
  COMMAND =
    "select BinData from `SkillTree` where NodeGroup = ? AND NodeIndex = ?",
  KEY_PREFIX = "SkillTreeByNodeGroupAndNodeIndex",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configSkillTreeByNodeGroupAndNodeIndex.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configSkillTreeByNodeGroupAndNodeIndex.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configSkillTreeByNodeGroupAndNodeIndex.GetConfig(";
exports.configSkillTreeByNodeGroupAndNodeIndex = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${e})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var r = KEY_PREFIX + `#${o}#${e})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (d)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            d
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["NodeGroup", o],
              ["NodeIndex", e],
            ))
      ) {
        r = void 0;
        if (
          (([t, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["NodeGroup", o],
            ["NodeIndex", e],
          )),
          t)
        ) {
          const d = SkillTree_1.SkillTree.getRootAsSkillTree(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, d)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            d
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
//# sourceMappingURL=SkillTreeByNodeGroupAndNodeIndex.js.map
