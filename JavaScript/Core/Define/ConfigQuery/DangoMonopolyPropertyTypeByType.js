"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDangoMonopolyPropertyTypeByType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DangoMonopolyPropertyType_1 = require("../Config/DangoMonopolyPropertyType"),
  DB = "db_dangomonopoly.db",
  FILE = "t.团子大富翁.xlsx",
  TABLE = "DangoMonopolyPropertyType",
  COMMAND =
    "select BinData from `DangoMonopolyPropertyType` where PropertyType=?",
  KEY_PREFIX = "DangoMonopolyPropertyTypeByType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configDangoMonopolyPropertyTypeByType.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configDangoMonopolyPropertyTypeByType.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configDangoMonopolyPropertyTypeByType.GetConfig(";
exports.configDangoMonopolyPropertyTypeByType = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      t =
        (e?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r)
          return (
            e?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "PropertyType",
              o,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["PropertyType", o],
          )),
          t)
        ) {
          const r =
            DangoMonopolyPropertyType_1.DangoMonopolyPropertyType.getRootAsDangoMonopolyPropertyType(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=DangoMonopolyPropertyTypeByType.js.map
