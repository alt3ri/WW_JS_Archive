"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configResonantChainByGroupIdAndGroupIndex = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ResonantChain_1 = require("../Config/ResonantChain");
const DB = "db_resonate_chain.db";
const FILE = "g.共鸣链.xlsx";
const TABLE = "ResonantChain";
const COMMAND =
  "select BinData from `ResonantChain` where GroupId=? AND GroupIndex=?";
const KEY_PREFIX = "ResonantChainByGroupIdAndGroupIndex";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX =
  "configResonantChainByGroupIdAndGroupIndex.GetConfig(";
exports.configResonantChainByGroupIdAndGroupIndex = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (n, o, e = !0) => {
    if (
      (a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var i = KEY_PREFIX + `#${n}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) return r;
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["GroupId", n],
            ["GroupIndex", o],
          ) > 0)
      ) {
        var a;
        var i = void 0;
        if (
          (([a, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["GroupId", n],
            ["GroupIndex", o],
          )),
          a)
        ) {
          const r = ResonantChain_1.ResonantChain.getRootAsResonantChain(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            e &&
              ((a = KEY_PREFIX + `#${n}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=ResonantChainByGroupIdAndGroupIndex.js.map
