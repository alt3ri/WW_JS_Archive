"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSynthesisFormulaByFormulaItemId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SynthesisFormula_1 = require("../Config/SynthesisFormula");
const DB = "db_compose.db";
const FILE = "h.合成.xlsx";
const TABLE = "SynthesisFormula";
const COMMAND = "select BinData from `SynthesisFormula` where FormulaItemId=?";
const KEY_PREFIX = "SynthesisFormulaByFormulaItemId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configSynthesisFormulaByFormulaItemId.GetConfig(";
exports.configSynthesisFormulaByFormulaItemId = {
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
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) return r;
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "FormulaItemId",
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
            ["FormulaItemId", o],
          )),
          i)
        ) {
          const r =
            SynthesisFormula_1.SynthesisFormula.getRootAsSynthesisFormula(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            e &&
              ((i = KEY_PREFIX + `#${o})`),
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
// # sourceMappingURL=SynthesisFormulaByFormulaItemId.js.map
