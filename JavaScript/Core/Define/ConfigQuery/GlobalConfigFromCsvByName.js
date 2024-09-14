"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configGlobalConfigFromCsvByName = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  GlobalConfigFromCsv_1 = require("../Config/GlobalConfigFromCsv"),
  DB = "db_global_config.db",
  FILE = "k.可视化编辑/c.Csv/q.全局配置/*.csv*",
  TABLE = "GlobalConfigFromCsv",
  COMMAND = "select BinData from `GlobalConfigFromCsv` where Name=?",
  KEY_PREFIX = "GlobalConfigFromCsvByName",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configGlobalConfigFromCsvByName.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configGlobalConfigFromCsvByName.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configGlobalConfigFromCsvByName.GetConfig(";
exports.configGlobalConfigFromCsvByName = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      C =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (C) {
      if (n) {
        var t = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (C =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Name",
              o,
            ]))
      ) {
        t = void 0;
        if (
          (([C, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Name", o],
          )),
          C)
        ) {
          const e =
            GlobalConfigFromCsv_1.GlobalConfigFromCsv.getRootAsGlobalConfigFromCsv(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            n &&
              ((C = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(C, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=GlobalConfigFromCsvByName.js.map
