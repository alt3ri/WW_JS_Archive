"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMobileBattleUiSetByPanelIndex = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MobileBattleUiSet_1 = require("../Config/MobileBattleUiSet"),
  DB = "db_mobile_battle_ui_set.db",
  FILE = "y.移动端主界面键位配置.xlsx",
  TABLE = "MobileBattleUiSet",
  COMMAND = "select BinData from `MobileBattleUiSet` where PanelIndex=?",
  KEY_PREFIX = "MobileBattleUiSetByPanelIndex",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configMobileBattleUiSetByPanelIndex.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configMobileBattleUiSetByPanelIndex.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configMobileBattleUiSetByPanelIndex.GetConfigList(";
exports.configMobileBattleUiSetByPanelIndex = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (t, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${t})`),
      i =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (e) {
        var n = KEY_PREFIX + `#${t})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (l)
          return (
            o.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair))
      ) {
        const l = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "PanelIndex",
              t,
            ])
          )
            break;
          var a = void 0;
          if (
            (([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PanelIndex", t],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              o.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a = MobileBattleUiSet_1.MobileBattleUiSet.getRootAsMobileBattleUiSet(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          l.push(a);
        }
        return (
          e &&
            ((n = KEY_PREFIX + `#${t})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, l, l.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          o.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          l
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MobileBattleUiSetByPanelIndex.js.map
