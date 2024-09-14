"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDebugEntranceConfigById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DebugEntranceConfig_1 = require("../Config/DebugEntranceConfig"),
  DB = "db_debugview.db",
  FILE = "t.调试界面.xlsx",
  TABLE = "DebugEntranceConfig",
  COMMAND = "select BinData from `DebugEntranceConfig` where Id=?",
  KEY_PREFIX = "DebugEntranceConfigById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configDebugEntranceConfigById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configDebugEntranceConfigById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configDebugEntranceConfigById.GetConfig(";
exports.configDebugEntranceConfigById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var t = KEY_PREFIX + `#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              n,
            ]))
      ) {
        t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", n],
          )),
          i)
        ) {
          const g =
            DebugEntranceConfig_1.DebugEntranceConfig.getRootAsDebugEntranceConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            o &&
              ((i = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=DebugEntranceConfigById.js.map
