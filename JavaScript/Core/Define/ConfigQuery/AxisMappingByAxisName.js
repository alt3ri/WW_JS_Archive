"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAxisMappingByAxisName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AxisMapping_1 = require("../Config/AxisMapping");
const DB = "db_input_settings.db";
const FILE = "s.输入配置.xlsx";
const TABLE = "AxisMapping";
const COMMAND = "select BinData from `AxisMapping` where AxisName=?";
const KEY_PREFIX = "AxisMappingByAxisName";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configAxisMappingByAxisName.GetConfig(";
exports.configAxisMappingByAxisName = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (i, o = !0) => {
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + `#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) return a;
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "AxisName",
            i,
          ]) > 0)
      ) {
        var e;
        var n = void 0;
        if (
          (([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["AxisName", i],
          )),
          e)
        ) {
          const a = AxisMapping_1.AxisMapping.getRootAsAxisMapping(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          return (
            o &&
              ((e = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=AxisMappingByAxisName.js.map
