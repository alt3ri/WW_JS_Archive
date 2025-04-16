"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMonsterPerformanceConfById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MonsterPerformanceConf_1 = require("../Config/MonsterPerformanceConf"),
  DB = "db_monster_info.db",
  FILE = "g.怪物战斗配置.xlsx",
  TABLE = "MonsterPerformanceConf",
  COMMAND =
    "select BinData from `MonsterPerformanceConf` where MonsterPerformanceId=?",
  KEY_PREFIX = "MonsterPerformanceConfById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configMonsterPerformanceConfById.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configMonsterPerformanceConfById.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configMonsterPerformanceConfById.GetConfigList(";
exports.configMonsterPerformanceConfById = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      t =
        (e?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var r = KEY_PREFIX + `#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (f)
          return (
            e?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const f = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "MonsterPerformanceId",
              o,
            ])
          )
            break;
          var i = void 0;
          if (
            (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["MonsterPerformanceId", o],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              e?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          i =
            MonsterPerformanceConf_1.MonsterPerformanceConf.getRootAsMonsterPerformanceConf(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          f.push(i);
        }
        return (
          n &&
            ((r = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(r, f, f.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          e?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          f
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MonsterPerformanceConfById.js.map
