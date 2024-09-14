"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configInfluenceById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  Influence_1 = require("../Config/Influence"),
  DB = "db_influence.db",
  FILE = "s.势力.xlsx",
  TABLE = "Influence",
  COMMAND = "select BinData from `Influence` where Id=?",
  KEY_PREFIX = "InfluenceById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configInfluenceById.Init"),
  getConfigStat = Stats_1.Stat.Create("configInfluenceById.GetConfig"),
  CONFIG_STAT_PREFIX = "configInfluenceById.GetConfig(";
exports.configInfluenceById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var t = KEY_PREFIX + `#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              n,
            ]))
      ) {
        t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", n],
          )),
          i)
        ) {
          const f = Influence_1.Influence.getRootAsInfluence(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            o &&
              ((i = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
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
//# sourceMappingURL=InfluenceById.js.map
