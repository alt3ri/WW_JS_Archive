"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEffectSpecDataByPath = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EffectSpecData_1 = require("../Config/EffectSpecData");
const DB = "db_effectspec.db";
const FILE = "UniverseEditor/EffectSpec.csv";
const TABLE = "EffectSpecData";
const COMMAND = "select BinData from `EffectSpecData` where Path=?";
const KEY_PREFIX = "EffectSpecDataByPath";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configEffectSpecDataByPath.GetConfig(";
exports.configEffectSpecDataByPath = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, o = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var t = KEY_PREFIX + `#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) return f;
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Path",
            e,
          ]) > 0)
      ) {
        var n;
        var t = void 0;
        if (
          (([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Path", e],
          )),
          n)
        ) {
          const f = EffectSpecData_1.EffectSpecData.getRootAsEffectSpecData(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            o &&
              ((n = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=EffectSpecDataByPath.js.map
