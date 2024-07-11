"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAbnormalDamageConfigByLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AbnormalDamageConfig_1 = require("../Config/AbnormalDamageConfig");
const DB = "db_abnormaldamage.db";
const FILE = "y.异常伤害.xlsx";
const TABLE = "AbnormalDamageConfig";
const COMMAND = "select BinData from `AbnormalDamageConfig` where Level=?";
const KEY_PREFIX = "AbnormalDamageConfigByLevel";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configAbnormalDamageConfigByLevel.GetConfig(";
exports.configAbnormalDamageConfigByLevel = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n = !0) => {
    if (
      (a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) return i;
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Level",
            o,
          ]) > 0)
      ) {
        var a;
        var e = void 0;
        if (
          (([a, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Level", o],
          )),
          a)
        ) {
          const i =
            AbnormalDamageConfig_1.AbnormalDamageConfig.getRootAsAbnormalDamageConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            n &&
              ((a = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=AbnormalDamageConfigByLevel.js.map
