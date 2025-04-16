"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAbyssRoleLevelByLevelAndGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AbyssRoleLevel_1 = require("../Config/AbyssRoleLevel"),
  DB = "db_dangoabysssuit.db",
  FILE = "s.深渊爬塔.xlsx",
  TABLE = "AbyssRoleLevel",
  COMMAND = "select BinData from `AbyssRoleLevel` where Level=? AND GroupId=?",
  KEY_PREFIX = "AbyssRoleLevelByLevelAndGroupId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configAbyssRoleLevelByLevelAndGroupId.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configAbyssRoleLevelByLevelAndGroupId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configAbyssRoleLevelByLevelAndGroupId.GetConfig(";
exports.configAbyssRoleLevelByLevelAndGroupId = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (o, e, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o}#${e})`),
      t =
        (i?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var l = KEY_PREFIX + `#${o}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(l);
        if (C)
          return (
            i?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
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
              ["Level", o],
              ["GroupId", e],
            ))
      ) {
        l = void 0;
        if (
          (([t, l] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Level", o],
            ["GroupId", e],
          )),
          t)
        ) {
          const C = AbyssRoleLevel_1.AbyssRoleLevel.getRootAsAbyssRoleLevel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)),
          );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=AbyssRoleLevelByLevelAndGroupId.js.map
