"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhantomQualityByQuality = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomQuality_1 = require("../Config/PhantomQuality"),
  DB = "db_phantom.db",
  FILE = "h.幻象.xlsx",
  TABLE = "PhantomQuality",
  COMMAND = "select BinData from `PhantomQuality` where Quality=?",
  KEY_PREFIX = "PhantomQualityByQuality",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPhantomQualityByQuality.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configPhantomQualityByQuality.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configPhantomQualityByQuality.GetConfig(";
exports.configPhantomQualityByQuality = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      i =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (t) {
        var a = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Quality",
              o,
            ]))
      ) {
        a = void 0;
        if (
          (([i, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Quality", o],
          )),
          i)
        ) {
          const e = PhantomQuality_1.PhantomQuality.getRootAsPhantomQuality(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            t &&
              ((i = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, e)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PhantomQualityByQuality.js.map
