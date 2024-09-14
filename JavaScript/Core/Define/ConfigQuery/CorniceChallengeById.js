"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCorniceChallengeById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  CorniceChallenge_1 = require("../Config/CorniceChallenge"),
  DB = "db_activity.db",
  FILE = "s.数据收集异常活动.xlsx",
  TABLE = "CorniceChallenge",
  COMMAND = "select BinData from `CorniceChallenge` where Id=?",
  KEY_PREFIX = "CorniceChallengeById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configCorniceChallengeById.Init"),
  getConfigStat = Stats_1.Stat.Create("configCorniceChallengeById.GetConfig"),
  CONFIG_STAT_PREFIX = "configCorniceChallengeById.GetConfig(";
exports.configCorniceChallengeById = {
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
        var C = KEY_PREFIX + `#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (t)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
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
        C = void 0;
        if (
          (([i, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", n],
          )),
          i)
        ) {
          const t =
            CorniceChallenge_1.CorniceChallenge.getRootAsCorniceChallenge(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            o &&
              ((i = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
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
//# sourceMappingURL=CorniceChallengeById.js.map
