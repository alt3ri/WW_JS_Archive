"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDevicePlatformByPidAndVid = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DevicePlatform_1 = require("../Config/DevicePlatform");
const DB = "db_deviceplatform.db";
const FILE = "s.设备平台.xlsx";
const TABLE = "DevicePlatform";
const COMMAND = "select BinData from `DevicePlatform` where PidAndVid=?";
const KEY_PREFIX = "DevicePlatformByPidAndVid";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configDevicePlatformByPidAndVid.GetConfig(";
exports.configDevicePlatformByPidAndVid = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, i = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var e = KEY_PREFIX + `#${o})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (d) return d;
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "PidAndVid",
            o,
          ]) > 0)
      ) {
        var n;
        var e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["PidAndVid", o],
          )),
          n)
        ) {
          const d = DevicePlatform_1.DevicePlatform.getRootAsDevicePlatform(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            i &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, d)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            d
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=DevicePlatformByPidAndVid.js.map
