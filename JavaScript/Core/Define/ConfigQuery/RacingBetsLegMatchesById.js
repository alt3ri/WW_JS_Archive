"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRacingBetsLegMatchesById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RacingBetsLegMatches_1 = require("../Config/RacingBetsLegMatches"),
  DB = "db_racingbets.db",
  FILE = "q.全服赌马.xlsx",
  TABLE = "RacingBetsLegMatches",
  COMMAND = "select BinData from `RacingBetsLegMatches` where Id=?",
  KEY_PREFIX = "RacingBetsLegMatchesById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configRacingBetsLegMatchesById.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configRacingBetsLegMatchesById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configRacingBetsLegMatchesById.GetConfig(";
exports.configRacingBetsLegMatchesById = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${n})`),
      t =
        (o?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (e) {
        var i = KEY_PREFIX + `#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (g)
          return (
            o?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              n,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", n],
          )),
          t)
        ) {
          const g =
            RacingBetsLegMatches_1.RacingBetsLegMatches.getRootAsRacingBetsLegMatches(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            e &&
              ((t = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RacingBetsLegMatchesById.js.map
