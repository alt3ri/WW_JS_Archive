"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLevelPlayDataById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  LevelPlayData_1 = require("../Config/LevelPlayData"),
  DB = "db_levelplaydata.db",
  FILE = "UniverseEditor/LevelPlay/玩法*",
  TABLE = "LevelPlayData",
  COMMAND = "select BinData from `LevelPlayData` where LevelPlayId=?",
  KEY_PREFIX = "LevelPlayDataById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configLevelPlayDataById.Init"),
  getConfigStat = Stats_1.Stat.Create("configLevelPlayDataById.GetConfig"),
  CONFIG_STAT_PREFIX = "configLevelPlayDataById.GetConfig(";
exports.configLevelPlayDataById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var a = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e})`),
      n =
        (a.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (o) {
        var t = KEY_PREFIX + `#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i)
          return (
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "LevelPlayId",
              e,
            ]))
      ) {
        t = void 0;
        if (
          (([n, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["LevelPlayId", e],
          )),
          n)
        ) {
          const i = LevelPlayData_1.LevelPlayData.getRootAsLevelPlayData(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            o &&
              ((n = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=LevelPlayDataById.js.map
