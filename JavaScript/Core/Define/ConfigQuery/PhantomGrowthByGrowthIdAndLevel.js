"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhantomGrowthByGrowthIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomGrowth_1 = require("../Config/PhantomGrowth"),
  DB = "db_phantom.db",
  FILE = "h.幻象.xlsx",
  TABLE = "PhantomGrowth",
  COMMAND = "select BinData from `PhantomGrowth` where GrowthId=? AND Level=?",
  KEY_PREFIX = "PhantomGrowthByGrowthIdAndLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configPhantomGrowthByGrowthIdAndLevel.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configPhantomGrowthByGrowthIdAndLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configPhantomGrowthByGrowthIdAndLevel.GetConfig(";
exports.configPhantomGrowthByGrowthIdAndLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (t) {
        var r = KEY_PREFIX + `#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (a)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["GrowthId", o],
              ["Level", n],
            ))
      ) {
        r = void 0;
        if (
          (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["GrowthId", o],
            ["Level", n],
          )),
          i)
        ) {
          const a = PhantomGrowth_1.PhantomGrowth.getRootAsPhantomGrowth(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          return (
            t &&
              ((i = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PhantomGrowthByGrowthIdAndLevel.js.map
