"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDailyAdventureTaskByTaskId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DailyAdventureTask_1 = require("../Config/DailyAdventureTask");
const DB = "db_activity.db";
const FILE = "r.日常探险活动.xlsx";
const TABLE = "DailyAdventureTask";
const COMMAND = "select BinData from `DailyAdventureTask` where TaskId=?";
const KEY_PREFIX = "DailyAdventureTaskByTaskId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configDailyAdventureTaskByTaskId.GetConfig(";
exports.configDailyAdventureTaskByTaskId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, e = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var n = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) return a;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "TaskId",
            o,
          ]) > 0)
      ) {
        var i;
        var n = void 0;
        if (
          (([i, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["TaskId", o],
          )),
          i)
        ) {
          const a =
            DailyAdventureTask_1.DailyAdventureTask.getRootAsDailyAdventureTask(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            e &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=DailyAdventureTaskByTaskId.js.map
