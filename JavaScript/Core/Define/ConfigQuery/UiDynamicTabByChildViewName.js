"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configUiDynamicTabByChildViewName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  UiDynamicTab_1 = require("../Config/UiDynamicTab"),
  DB = "db_ui.db",
  FILE = "u.UI动态页签.csv",
  TABLE = "UiDynamicTab",
  COMMAND = "select BinData from `UiDynamicTab` where ChildViewName = ?",
  KEY_PREFIX = "UiDynamicTabByChildViewName",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configUiDynamicTabByChildViewName.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configUiDynamicTabByChildViewName.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configUiDynamicTabByChildViewName.GetConfig(";
exports.configUiDynamicTabByChildViewName = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (i, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${i})`),
      e =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var a = KEY_PREFIX + `#${i})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (t)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "ChildViewName",
              i,
            ]))
      ) {
        a = void 0;
        if (
          (([e, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ChildViewName", i],
          )),
          e)
        ) {
          const t = UiDynamicTab_1.UiDynamicTab.getRootAsUiDynamicTab(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            n &&
              ((e = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=UiDynamicTabByChildViewName.js.map
