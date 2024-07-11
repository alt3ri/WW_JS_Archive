"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhantomGrowthByGrowthIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomGrowth_1 = require("../Config/PhantomGrowth");
const DB = "db_phantom.db";
const FILE = "h.幻象.xlsx";
const TABLE = "PhantomGrowth";
const COMMAND =
  "select BinData from `PhantomGrowth` where GrowthId=? AND Level=?";
const KEY_PREFIX = "PhantomGrowthByGrowthIdAndLevel";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configPhantomGrowthByGrowthIdAndLevel.GetConfig(";
exports.configPhantomGrowthByGrowthIdAndLevel = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n, e = !0) => {
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var t = KEY_PREFIX + `#${o}#${n})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r) return r;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["GrowthId", o],
            ["Level", n],
          ) > 0)
      ) {
        var i;
        var t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["GrowthId", o],
            ["Level", n],
          )),
          i)
        ) {
          const r = PhantomGrowth_1.PhantomGrowth.getRootAsPhantomGrowth(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            e &&
              ((i = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=PhantomGrowthByGrowthIdAndLevel.js.map
