"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLivenessTaskByTaskId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LivenessTask_1 = require("../Config/LivenessTask");
const DB = "db_daily_activity.db";
const FILE = "h.活跃度.xlsx";
const TABLE = "LivenessTask";
const COMMAND = "select BinData from `LivenessTask` where TaskId=?";
const KEY_PREFIX = "LivenessTaskByTaskId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configLivenessTaskByTaskId.GetConfig(";
exports.configLivenessTaskByTaskId = {
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
        const s = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (s) return s;
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
          const s = LivenessTask_1.LivenessTask.getRootAsLivenessTask(
            new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
          );
          return (
            e &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, s)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            s
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=LivenessTaskByTaskId.js.map
