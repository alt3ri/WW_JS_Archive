"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAxisMappingByAxisName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AxisMapping_1 = require("../Config/AxisMapping"),
  DB = "db_input_settings.db",
  FILE = "s.输入配置.xlsx",
  TABLE = "AxisMapping",
  COMMAND = "select BinData from `AxisMapping` where AxisName=?",
  KEY_PREFIX = "AxisMappingByAxisName",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAxisMappingByAxisName.Init"),
  getConfigStat = Stats_1.Stat.Create("configAxisMappingByAxisName.GetConfig"),
  CONFIG_STAT_PREFIX = "configAxisMappingByAxisName.GetConfig(";
exports.configAxisMappingByAxisName = {
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
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "AxisName",
              i,
            ]))
      ) {
        e = void 0;
        if (
          (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["AxisName", i],
          )),
          t)
        ) {
          const a = AxisMapping_1.AxisMapping.getRootAsAxisMapping(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            n &&
              ((t = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
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
//# sourceMappingURL=AxisMappingByAxisName.js.map
