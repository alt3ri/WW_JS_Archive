"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAiStateMachineConfigById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AiStateMachineConfig_1 = require("../Config/AiStateMachineConfig"),
  DB = "db_aistatemachineconfig.db",
  FILE = "z.战斗/a.AI/a.AI状态机.csv",
  TABLE = "AiStateMachineConfig",
  COMMAND = "select BinData from `AiStateMachineConfig` where Id=?",
  KEY_PREFIX = "AiStateMachineConfigById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configAiStateMachineConfigById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configAiStateMachineConfigById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configAiStateMachineConfigById.GetConfig(";
exports.configAiStateMachineConfigById = {
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
              "Id",
              i,
            ]))
      ) {
        e = void 0;
        if (
          (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", i],
          )),
          t)
        ) {
          const a =
            AiStateMachineConfig_1.AiStateMachineConfig.getRootAsAiStateMachineConfig(
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
//# sourceMappingURL=AiStateMachineConfigById.js.map
