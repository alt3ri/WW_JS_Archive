"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configEnrichmentAreaConfigByItemId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  EnrichmentAreaConfig_1 = require("../Config/EnrichmentAreaConfig"),
  DB = "db_enrichment.db",
  FILE = "UniverseEditor/Enrichment/富集区_Json_EnrichmentArea.csv",
  TABLE = "EnrichmentAreaConfig",
  COMMAND = "select BinData from `EnrichmentAreaConfig` where ItemId=?",
  KEY_PREFIX = "EnrichmentAreaConfigByItemId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configEnrichmentAreaConfigByItemId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configEnrichmentAreaConfigByItemId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configEnrichmentAreaConfigByItemId.GetConfigList(";
exports.configEnrichmentAreaConfigByItemId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${n})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var e = KEY_PREFIX + `#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C)
          return (
            i.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ItemId",
              n,
            ])
          )
            break;
          var r = void 0;
          if (
            (([t, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ItemId", n],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r =
            EnrichmentAreaConfig_1.EnrichmentAreaConfig.getRootAsEnrichmentAreaConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          C.push(r);
        }
        return (
          o &&
            ((e = KEY_PREFIX + `#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=EnrichmentAreaConfigByItemId.js.map
