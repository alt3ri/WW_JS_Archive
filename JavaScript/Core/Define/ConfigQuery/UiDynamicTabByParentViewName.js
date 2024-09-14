"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configUiDynamicTabByParentViewName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  UiDynamicTab_1 = require("../Config/UiDynamicTab"),
  DB = "db_ui.db",
  FILE = "u.UI动态页签.csv",
  TABLE = "UiDynamicTab",
  COMMAND = "select BinData from `UiDynamicTab` where ParentViewName = ?",
  KEY_PREFIX = "UiDynamicTabByParentViewName",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configUiDynamicTabByParentViewName.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configUiDynamicTabByParentViewName.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configUiDynamicTabByParentViewName.GetConfigList(";
exports.configUiDynamicTabByParentViewName = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (i, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${i})`),
      t =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var e = KEY_PREFIX + `#${i})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (m)
          return (
            o.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair))
      ) {
        const m = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ParentViewName",
              i,
            ])
          )
            break;
          var a = void 0;
          if (
            (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ParentViewName", i],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              o.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          a = UiDynamicTab_1.UiDynamicTab.getRootAsUiDynamicTab(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          m.push(a);
        }
        return (
          n &&
            ((e = KEY_PREFIX + `#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, m, m.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          o.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          m
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=UiDynamicTabByParentViewName.js.map
