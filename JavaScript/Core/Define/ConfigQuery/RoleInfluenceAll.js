"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoleInfluenceAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleInfluence_1 = require("../Config/RoleInfluence"),
  DB = "db_roleinfluence.db",
  FILE = "j.角色势力.xlsx",
  TABLE = "RoleInfluence",
  COMMAND = "select BinData from `RoleInfluence`",
  KEY_PREFIX = "RoleInfluenceAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRoleInfluenceAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configRoleInfluenceAll.GetConfigList",
  );
exports.configRoleInfluenceAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (n = !0) => {
    var o;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (n) {
        var e = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      const i = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var t = void 0;
        if (
          (([o, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        t = RoleInfluence_1.RoleInfluence.getRootAsRoleInfluence(
          new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
        );
        i.push(t);
      }
      return (
        n &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        i
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RoleInfluenceAll.js.map
