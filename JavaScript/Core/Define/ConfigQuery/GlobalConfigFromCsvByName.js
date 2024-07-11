"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configGlobalConfigFromCsvByName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GlobalConfigFromCsv_1 = require("../Config/GlobalConfigFromCsv");
const DB = "db_global_config.db";
const FILE = "k.可视化编辑/c.Csv/q.全局配置/*.csv*";
const TABLE = "GlobalConfigFromCsv";
const COMMAND = "select BinData from `GlobalConfigFromCsv` where Name=?";
const KEY_PREFIX = "GlobalConfigFromCsvByName";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configGlobalConfigFromCsvByName.GetConfig(";
exports.configGlobalConfigFromCsvByName = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n = !0) => {
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) return C;
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Name",
            o,
          ]) > 0)
      ) {
        var e;
        var i = void 0;
        if (
          (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Name", o],
          )),
          e)
        ) {
          const C =
            GlobalConfigFromCsv_1.GlobalConfigFromCsv.getRootAsGlobalConfigFromCsv(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            n &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=GlobalConfigFromCsvByName.js.map
