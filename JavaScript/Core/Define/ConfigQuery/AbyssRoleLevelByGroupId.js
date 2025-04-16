"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAbyssRoleLevelByGroupId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AbyssRoleLevel_1 = require("../Config/AbyssRoleLevel"),
  DB = "db_dangoabysssuit.db",
  FILE = "s.深渊爬塔.xlsx",
  TABLE = "AbyssRoleLevel",
  COMMAND = "select BinData from `AbyssRoleLevel` where GroupId=?",
  KEY_PREFIX = "AbyssRoleLevelByGroupId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configAbyssRoleLevelByGroupId.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configAbyssRoleLevelByGroupId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configAbyssRoleLevelByGroupId.GetConfigList(";
exports.configAbyssRoleLevelByGroupId = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      i =
        (n?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (e) {
        var t = KEY_PREFIX + `#${o})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (s)
          return (
            n?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            s
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const s = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "GroupId",
              o,
            ])
          )
            break;
          var C = void 0;
          if (
            (([i, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["GroupId", o],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C = AbyssRoleLevel_1.AbyssRoleLevel.getRootAsAbyssRoleLevel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          s.push(C);
        }
        return (
          e &&
            ((t = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, s, s.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          s
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=AbyssRoleLevelByGroupId.js.map
