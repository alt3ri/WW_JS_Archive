"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFoleySynthConfigByIdWithDefaultId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FoleySynthConfig_1 = require("../Config/FoleySynthConfig");
const DB = "db_entity_audio.db";
const FILE = "y.音频组件配置.xlsx";
const TABLE = "FoleySynthConfig";
const COMMAND =
  "select BinData from `FoleySynthConfig` where id = ? AND (SELECT count() from `FoleySynthConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `FoleySynthConfig` WHERE id = ?) >0;";
const KEY_PREFIX = "FoleySynthConfigByIdWithDefaultId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configFoleySynthConfigByIdWithDefaultId.GetConfig(";
exports.configFoleySynthConfigByIdWithDefaultId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n, i, e, t = !0) => {
    if (
      (d = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (t) {
        var C = KEY_PREFIX + `#${o}#${n}#${i}#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f) return f;
      }
      if (
        (d =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 4, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["Id", o],
            ["Id", n],
            ["Id", i],
            ["Id", e],
          ) > 0)
      ) {
        var d;
        var C = void 0;
        if (
          (([d, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
            ["Id", n],
            ["Id", i],
            ["Id", e],
          )),
          d)
        ) {
          const f =
            FoleySynthConfig_1.FoleySynthConfig.getRootAsFoleySynthConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            t &&
              ((d = KEY_PREFIX + `#${o}#${n}#${i}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(d, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=FoleySynthConfigByIdWithDefaultId.js.map
