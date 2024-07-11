"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMappingBySheetNameFieldNameAndValue = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Mapping_1 = require("../Config/Mapping");
const DB = "db_mapping.db";
const FILE = "s.数据枚举对应关系.xlsx";
const TABLE = "Mapping";
const COMMAND =
  "select BinData from `Mapping` where SheetName=? AND FieldName=? AND Value=?";
const KEY_PREFIX = "MappingBySheetNameFieldNameAndValue";
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
  "configMappingBySheetNameFieldNameAndValue.GetConfig(";
exports.configMappingBySheetNameFieldNameAndValue = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, o, n, i = !0) => {
    if (
      (m = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var a = KEY_PREFIX + `#${e}#${o}#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (t) return t;
      }
      if (
        (m =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["SheetName", e],
            ["FieldName", o],
            ["Value", n],
          ) > 0)
      ) {
        var m;
        var a = void 0;
        if (
          (([m, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["SheetName", e],
            ["FieldName", o],
            ["Value", n],
          )),
          m)
        ) {
          const t = Mapping_1.Mapping.getRootAsMapping(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            i &&
              ((m = KEY_PREFIX + `#${e}#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(m, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=MappingBySheetNameFieldNameAndValue.js.map
