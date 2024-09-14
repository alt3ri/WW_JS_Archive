"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configStateMachinePreloadByFsmKey = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  StateMachinePreload_1 = require("../Config/StateMachinePreload"),
  DB = "db_state_machine_preload.db",
  FILE = "Preload/StateMachinePreload.csv",
  TABLE = "StateMachinePreload",
  COMMAND = "select BinData from `StateMachinePreload` where FsmKey=?",
  KEY_PREFIX = "StateMachinePreloadByFsmKey",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configStateMachinePreloadByFsmKey.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configStateMachinePreloadByFsmKey.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configStateMachinePreloadByFsmKey.GetConfig(";
exports.configStateMachinePreloadByFsmKey = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e})`),
      n =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (o) {
        var a = KEY_PREFIX + `#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "FsmKey",
              e,
            ]))
      ) {
        a = void 0;
        if (
          (([n, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["FsmKey", e],
          )),
          n)
        ) {
          const i =
            StateMachinePreload_1.StateMachinePreload.getRootAsStateMachinePreload(
              new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
            );
          return (
            o &&
              ((n = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
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
//# sourceMappingURL=StateMachinePreloadByFsmKey.js.map
