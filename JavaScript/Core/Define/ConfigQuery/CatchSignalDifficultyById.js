"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configCatchSignalDifficultyById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  CatchSignalDifficulty_1 = require("../Config/CatchSignalDifficulty"),
  DB = "db_catchsignaldifficulty.db",
  FILE = "k.可视化编辑/c.Csv/m.捕获信号玩法难度/*.csv*",
  TABLE = "CatchSignalDifficulty",
  COMMAND = "select BinData from `CatchSignalDifficulty` where Id=?",
  KEY_PREFIX = "CatchSignalDifficultyById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configCatchSignalDifficultyById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configCatchSignalDifficultyById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configCatchSignalDifficultyById.GetConfig(";
exports.configCatchSignalDifficultyById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (i, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${i})`),
      o =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (n) {
        var f = KEY_PREFIX + `#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (a)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (o =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              i,
            ]))
      ) {
        f = void 0;
        if (
          (([o, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", i],
          )),
          o)
        ) {
          const a =
            CatchSignalDifficulty_1.CatchSignalDifficulty.getRootAsCatchSignalDifficulty(
              new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
            );
          return (
            n &&
              ((o = KEY_PREFIX + `#${i})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(o, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=CatchSignalDifficultyById.js.map
