"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTowerDefencePhantomById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TowerDefencePhantom_1 = require("../Config/TowerDefencePhantom"),
  DB = "db_activity.db",
  FILE = "l.联机塔防活动.xlsx",
  TABLE = "TowerDefencePhantom",
  COMMAND = "select BinData from `TowerDefencePhantom` where Id = ?",
  KEY_PREFIX = "TowerDefencePhantomById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configTowerDefencePhantomById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configTowerDefencePhantomById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTowerDefencePhantomById.GetConfig(";
exports.configTowerDefencePhantomById = {
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
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          t)
        ) {
          const f =
            TowerDefencePhantom_1.TowerDefencePhantom.getRootAsTowerDefencePhantom(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, f)),
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
//# sourceMappingURL=TowerDefencePhantomById.js.map
