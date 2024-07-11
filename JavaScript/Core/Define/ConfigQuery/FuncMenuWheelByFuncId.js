"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFuncMenuWheelByFuncId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FuncMenuWheel_1 = require("../Config/FuncMenuWheel");
const DB = "db_roulette.db";
const FILE = "l.轮盘.xlsx";
const TABLE = "FuncMenuWheel";
const COMMAND = "select BinData from `FuncMenuWheel` where FuncId=?";
const KEY_PREFIX = "FuncMenuWheelByFuncId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configFuncMenuWheelByFuncId.GetConfig(";
exports.configFuncMenuWheelByFuncId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (n, e = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var o = KEY_PREFIX + `#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (t) return t;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "FuncId",
            n,
          ]) > 0)
      ) {
        var i;
        var o = void 0;
        if (
          (([i, o] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["FuncId", n],
          )),
          i)
        ) {
          const t = FuncMenuWheel_1.FuncMenuWheel.getRootAsFuncMenuWheel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
          );
          return (
            e &&
              ((i = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=FuncMenuWheelByFuncId.js.map
