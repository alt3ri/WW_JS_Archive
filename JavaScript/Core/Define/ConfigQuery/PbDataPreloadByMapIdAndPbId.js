"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPbDataPreloadByMapIdAndPbId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PbDataPreload_1 = require("../Config/PbDataPreload"),
  DB = "db_pbdata_preload.db",
  FILE = "Preload/PbDataPreload.csv",
  TABLE = "PbDataPreload",
  COMMAND = "select BinData from `PbDataPreload` where MapId=? AND PbDataId=?",
  KEY_PREFIX = "PbDataPreloadByMapIdAndPbId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPbDataPreloadByMapIdAndPbId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configPbDataPreloadByMapIdAndPbId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configPbDataPreloadByMapIdAndPbId.GetConfig(";
exports.configPbDataPreloadByMapIdAndPbId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, a, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${a})`),
      e =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var i = KEY_PREFIX + `#${o}#${a})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (d)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            d
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, a, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["MapId", o],
              ["PbDataId", a],
            ))
      ) {
        i = void 0;
        if (
          (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MapId", o],
            ["PbDataId", a],
          )),
          e)
        ) {
          const d = PbDataPreload_1.PbDataPreload.getRootAsPbDataPreload(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            n &&
              ((e = KEY_PREFIX + `#${o}#${a})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, d)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            d
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PbDataPreloadByMapIdAndPbId.js.map
