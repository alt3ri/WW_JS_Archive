"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMappingBySheetNameAndFieldName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  Mapping_1 = require("../Config/Mapping"),
  DB = "db_mapping.db",
  FILE = "s.数据枚举对应关系.xlsx",
  TABLE = "Mapping",
  COMMAND = "select BinData from `Mapping` where SheetName=? AND FieldName=?",
  KEY_PREFIX = "MappingBySheetNameAndFieldName",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configMappingBySheetNameAndFieldName.Init",
  ),
  getConfigListStat = Stats_1.Stat.Create(
    "configMappingBySheetNameAndFieldName.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configMappingBySheetNameAndFieldName.GetConfigList(";
exports.configMappingBySheetNameAndFieldName = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (n, i, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${n}#${i})`),
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var a = KEY_PREFIX + `#${n}#${i})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (m)
          return (
            e.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair))
      ) {
        const m = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["SheetName", n],
              ["FieldName", i],
            )
          )
            break;
          var g = void 0;
          if (
            (([t, g] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["SheetName", n],
              ["FieldName", i],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          g = Mapping_1.Mapping.getRootAsMapping(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          m.push(g);
        }
        return (
          o &&
            ((a = KEY_PREFIX + `#${n}#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(a, m, m.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          m
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MappingBySheetNameAndFieldName.js.map
