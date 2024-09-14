"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configParkourChallengeByMarkId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ParkourChallenge_1 = require("../Config/ParkourChallenge"),
  DB = "db_parkourchallenge.db",
  FILE = "p.跑酷挑战.xlsx",
  TABLE = "ParkourChallenge",
  COMMAND = "select BinData from `ParkourChallenge` where MarkId=?",
  KEY_PREFIX = "ParkourChallengeByMarkId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configParkourChallengeByMarkId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configParkourChallengeByMarkId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configParkourChallengeByMarkId.GetConfig(";
exports.configParkourChallengeByMarkId = {
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
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      a =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (n) {
        var r = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (i)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "MarkId",
              o,
            ]))
      ) {
        r = void 0;
        if (
          (([a, r] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["MarkId", o],
          )),
          a)
        ) {
          const i =
            ParkourChallenge_1.ParkourChallenge.getRootAsParkourChallenge(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          return (
            n &&
              ((a = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
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
//# sourceMappingURL=ParkourChallengeByMarkId.js.map
