"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTowerDefencePhantomLevelById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TowerDefencePhantomLevel_1 = require("../Config/TowerDefencePhantomLevel"),
  DB = "db_activity.db",
  FILE = "l.联机塔防活动.xlsx",
  TABLE = "TowerDefencePhantomLevel",
  COMMAND = "select BinData from `TowerDefencePhantomLevel` where Id = ?",
  KEY_PREFIX = "TowerDefencePhantomLevelById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configTowerDefencePhantomLevelById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configTowerDefencePhantomLevelById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTowerDefencePhantomLevelById.GetConfig(";
exports.configTowerDefencePhantomLevelById = {
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
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e})`),
      t =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var i = KEY_PREFIX + `#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              e,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", e],
          )),
          t)
        ) {
          const f =
            TowerDefencePhantomLevel_1.TowerDefencePhantomLevel.getRootAsTowerDefencePhantomLevel(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            o &&
              ((t = KEY_PREFIX + `#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=TowerDefencePhantomLevelById.js.map
