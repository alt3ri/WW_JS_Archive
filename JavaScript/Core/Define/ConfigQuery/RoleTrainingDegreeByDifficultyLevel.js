"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoleTrainingDegreeByDifficultyLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleTrainingDegree_1 = require("../Config/RoleTrainingDegree"),
  DB = "db_roletrainingdegree.db",
  FILE = "j.角色练度标准.xlsx",
  TABLE = "RoleTrainingDegree",
  COMMAND =
    "select BinData from `RoleTrainingDegree` where DifficultyLevel = ?",
  KEY_PREFIX = "RoleTrainingDegreeByDifficultyLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configRoleTrainingDegreeByDifficultyLevel.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configRoleTrainingDegreeByDifficultyLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configRoleTrainingDegreeByDifficultyLevel.GetConfig(";
exports.configRoleTrainingDegreeByDifficultyLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (e, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e})`),
      o =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (i) {
        var t = KEY_PREFIX + `#${e})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (o =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "DifficultyLevel",
              e,
            ]))
      ) {
        t = void 0;
        if (
          (([o, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["DifficultyLevel", e],
          )),
          o)
        ) {
          const g =
            RoleTrainingDegree_1.RoleTrainingDegree.getRootAsRoleTrainingDegree(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            i &&
              ((o = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(o, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
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
//# sourceMappingURL=RoleTrainingDegreeByDifficultyLevel.js.map
