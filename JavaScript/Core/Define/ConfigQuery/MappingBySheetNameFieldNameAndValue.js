"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMappingBySheetNameFieldNameAndValue = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  Mapping_1 = require("../Config/Mapping"),
  DB = "db_mapping.db",
  FILE = "s.数据枚举对应关系.xlsx",
  TABLE = "Mapping",
  COMMAND =
    "select BinData from `Mapping` where SheetName=? AND FieldName=? AND Value=?",
  KEY_PREFIX = "MappingBySheetNameFieldNameAndValue",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configMappingBySheetNameFieldNameAndValue.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configMappingBySheetNameFieldNameAndValue.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configMappingBySheetNameFieldNameAndValue.GetConfig(";
exports.configMappingBySheetNameFieldNameAndValue = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (e, n, o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var a = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e}#${n}#${o})`),
      t =
        (a.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (i) {
        var g = KEY_PREFIX + `#${e}#${n}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (m)
          return (
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["SheetName", e],
              ["FieldName", n],
              ["Value", o],
            ))
      ) {
        g = void 0;
        if (
          (([t, g] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["SheetName", e],
            ["FieldName", n],
            ["Value", o],
          )),
          t)
        ) {
          const m = Mapping_1.Mapping.getRootAsMapping(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          return (
            i &&
              ((t = KEY_PREFIX + `#${e}#${n}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, m)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MappingBySheetNameFieldNameAndValue.js.map
