"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAxisMappingByAxisType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AxisMapping_1 = require("../Config/AxisMapping"),
  DB = "db_input_settings.db",
  FILE = "s.输入配置.xlsx",
  TABLE = "AxisMapping",
  COMMAND = "select BinData from `AxisMapping` where AxisType=?",
  KEY_PREFIX = "AxisMappingByAxisType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAxisMappingByAxisType.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configAxisMappingByAxisType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configAxisMappingByAxisType.GetConfigList(";
exports.configAxisMappingByAxisType = {
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
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            o.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "AxisType",
              i,
            ])
          )
            break;
          var g = void 0;
          if (
            (([t, g] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["AxisType", i],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              o.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          g = AxisMapping_1.AxisMapping.getRootAsAxisMapping(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          a.push(g);
        }
        return (
          n &&
            ((e = KEY_PREFIX + `#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          o.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=AxisMappingByAxisType.js.map
