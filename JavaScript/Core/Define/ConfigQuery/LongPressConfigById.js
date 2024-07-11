"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLongPressConfigById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LongPressConfig_1 = require("../Config/LongPressConfig");
const DB = "db_longpress_config.db";
const FILE = "c.长按组件配置.xlsx";
const TABLE = "LongPressConfig";
const COMMAND = "select BinData from `LongPressConfig` where Id = ?";
const KEY_PREFIX = "LongPressConfigById";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configLongPressConfigById.GetConfig(";
exports.configLongPressConfigById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) return g;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Id",
            o,
          ]) > 0)
      ) {
        var i;
        var e = void 0;
        if (
          (([i, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          i)
        ) {
          const g = LongPressConfig_1.LongPressConfig.getRootAsLongPressConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            n &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            g
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=LongPressConfigById.js.map
