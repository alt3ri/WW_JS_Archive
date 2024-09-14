"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDevicePlatformByPidAndVid = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DevicePlatform_1 = require("../Config/DevicePlatform"),
  DB = "db_deviceplatform.db",
  FILE = "s.设备平台.xlsx",
  TABLE = "DevicePlatform",
  COMMAND = "select BinData from `DevicePlatform` where PidAndVid=?",
  KEY_PREFIX = "DevicePlatformByPidAndVid",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configDevicePlatformByPidAndVid.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configDevicePlatformByPidAndVid.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configDevicePlatformByPidAndVid.GetConfig(";
exports.configDevicePlatformByPidAndVid = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      e =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var t = KEY_PREFIX + `#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "PidAndVid",
              o,
            ]))
      ) {
        t = void 0;
        if (
          (([e, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["PidAndVid", o],
          )),
          e)
        ) {
          const f = DevicePlatform_1.DevicePlatform.getRootAsDevicePlatform(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            i &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=DevicePlatformByPidAndVid.js.map
