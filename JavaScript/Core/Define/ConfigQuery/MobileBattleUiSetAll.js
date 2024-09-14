"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMobileBattleUiSetAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MobileBattleUiSet_1 = require("../Config/MobileBattleUiSet"),
  DB = "db_mobile_battle_ui_set.db",
  FILE = "y.移动端主界面键位配置.xlsx",
  TABLE = "MobileBattleUiSet",
  COMMAND = "select BinData from `MobileBattleUiSet`",
  KEY_PREFIX = "MobileBattleUiSetAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configMobileBattleUiSetAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configMobileBattleUiSetAll.GetConfigList",
  );
exports.configMobileBattleUiSetAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t = !0) => {
    var o;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (t) {
        var i = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (n)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            n
          );
      }
      const n = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var e = void 0;
        if (
          (([o, e] = ConfigCommon_1.ConfigCommon.GetValue(
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
        e = MobileBattleUiSet_1.MobileBattleUiSet.getRootAsMobileBattleUiSet(
          new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
        );
        n.push(e);
      }
      return (
        t &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, n, n.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        n
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MobileBattleUiSetAll.js.map
