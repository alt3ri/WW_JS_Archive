"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBattlePassTaskByTaskId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BattlePassTask_1 = require("../Config/BattlePassTask"),
  DB = "db_battle_pass.db",
  FILE = "z.战令.xlsx",
  TABLE = "BattlePassTask",
  COMMAND = "select BinData from `BattlePassTask` where TaskId=?",
  KEY_PREFIX = "BattlePassTaskByTaskId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configBattlePassTaskByTaskId.Init"),
  getConfigStat = Stats_1.Stat.Create("configBattlePassTaskByTaskId.GetConfig"),
  CONFIG_STAT_PREFIX = "configBattlePassTaskByTaskId.GetConfig(";
exports.configBattlePassTaskByTaskId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var a = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${t})`),
      n =
        (a.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (o) {
        var e = KEY_PREFIX + `#${t})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i)
          return (
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "TaskId",
              t,
            ]))
      ) {
        e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["TaskId", t],
          )),
          n)
        ) {
          const i = BattlePassTask_1.BattlePassTask.getRootAsBattlePassTask(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            o &&
              ((n = KEY_PREFIX + `#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BattlePassTaskByTaskId.js.map
