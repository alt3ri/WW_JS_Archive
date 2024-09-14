"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoleBattleViewInfoAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleBattleViewInfo_1 = require("../Config/RoleBattleViewInfo"),
  DB = "db_role_battle_view.db",
  FILE = "j.角色战斗界面布局.xlsx",
  TABLE = "RoleBattleViewInfo",
  COMMAND = "select BinData from `RoleBattleViewInfo`",
  KEY_PREFIX = "RoleBattleViewInfoAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRoleBattleViewInfoAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configRoleBattleViewInfoAll.GetConfigList",
  );
exports.configRoleBattleViewInfoAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o = !0) => {
    var t;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
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
        var n = void 0;
        if (
          (([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !t)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        n = RoleBattleViewInfo_1.RoleBattleViewInfo.getRootAsRoleBattleViewInfo(
          new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
        );
        i.push(n);
      }
      return (
        o &&
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
//# sourceMappingURL=RoleBattleViewInfoAll.js.map
