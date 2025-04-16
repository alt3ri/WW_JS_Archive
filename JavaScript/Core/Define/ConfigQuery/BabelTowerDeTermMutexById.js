"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configBabelTowerDeTermMutexById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  BabelTowerDeTermMutex_1 = require("../Config/BabelTowerDeTermMutex"),
  DB = "db_activity.db",
  FILE = "b.巴别塔活动.xlsx",
  TABLE = "BabelTowerDeTermMutex",
  COMMAND = "select BinData from `BabelTowerDeTermMutex` where Id=?",
  KEY_PREFIX = "BabelTowerDeTermMutexById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configBabelTowerDeTermMutexById.Init",
  ),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph(
    "configBabelTowerDeTermMutexById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configBabelTowerDeTermMutexById.GetConfig(";
exports.configBabelTowerDeTermMutexById = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfig: (e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${e})`),
      n =
        (t?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (o) {
        var i = KEY_PREFIX + `#${e})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r)
          return (
            t?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              e,
            ]))
      ) {
        i = void 0;
        if (
          (([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", e],
          )),
          n)
        ) {
          const r =
            BabelTowerDeTermMutex_1.BabelTowerDeTermMutex.getRootAsBabelTowerDeTermMutex(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            o &&
              ((n = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t?.Stop(),
            getConfigStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop(),
      getConfigStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=BabelTowerDeTermMutexById.js.map
