"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPlatformIconById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PlatformIcon_1 = require("../Config/PlatformIcon"),
  DB = "db_platformicon.db",
  FILE = "d.多端图标.xlsx",
  TABLE = "PlatformIcon",
  COMMAND = "select BinData from `PlatformIcon` where Id=?",
  KEY_PREFIX = "PlatformIconById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPlatformIconById.Init"),
  getConfigStat = Stats_1.Stat.Create("configPlatformIconById.GetConfig"),
  CONFIG_STAT_PREFIX = "configPlatformIconById.GetConfig(";
exports.configPlatformIconById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      i =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var f = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (e)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        f = void 0;
        if (
          (([i, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          i)
        ) {
          const e = PlatformIcon_1.PlatformIcon.getRootAsPlatformIcon(
            new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
          );
          return (
            n &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PlatformIconById.js.map
