"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configForgeFormulaAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ForgeFormula_1 = require("../Config/ForgeFormula");
const DB = "db_forge.db";
const FILE = "d.锻造.xlsx";
const TABLE = "ForgeFormula";
const COMMAND = "select BinData from `ForgeFormula`";
const KEY_PREFIX = "ForgeFormulaAll";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
exports.configForgeFormulaAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    let e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var r = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (i) return i;
      }
      const i = new Array();
      for (;;) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair) !== 1)
          break;
        let n = void 0;
        if (
          (([e, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !e)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n = ForgeFormula_1.ForgeFormula.getRootAsForgeFormula(
          new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
        );
        i.push(n);
      }
      return (
        o &&
          ((r = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(r, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        i
      );
    }
  },
};
// # sourceMappingURL=ForgeFormulaAll.js.map
