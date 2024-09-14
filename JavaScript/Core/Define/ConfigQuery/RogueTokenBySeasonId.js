"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRogueTokenBySeasonId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RogueToken_1 = require("../Config/RogueToken"),
  DB = "db_rogue.db",
  FILE = "r.肉鸽.xlsx",
  TABLE = "RogueToken",
  COMMAND = "select BinData from `RogueToken` where SeasonId=?",
  KEY_PREFIX = "RogueTokenBySeasonId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRogueTokenBySeasonId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configRogueTokenBySeasonId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configRogueTokenBySeasonId.GetConfigList(";
exports.configRogueTokenBySeasonId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var t = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C)
          return (
            e.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "SeasonId",
              o,
            ])
          )
            break;
          var g = void 0;
          if (
            (([i, g] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["SeasonId", o],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          g = RogueToken_1.RogueToken.getRootAsRogueToken(
            new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)),
          );
          C.push(g);
        }
        return (
          n &&
            ((t = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RogueTokenBySeasonId.js.map
