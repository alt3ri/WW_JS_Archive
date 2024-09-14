"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTowerDefenceInstanceById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TowerDefenceInstance_1 = require("../Config/TowerDefenceInstance"),
  DB = "db_activity.db",
  FILE = "l.联机塔防活动.xlsx",
  TABLE = "TowerDefenceInstance",
  COMMAND = "select BinData from `TowerDefenceInstance` where Id = ?",
  KEY_PREFIX = "TowerDefenceInstanceById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configTowerDefenceInstanceById.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configTowerDefenceInstanceById.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTowerDefenceInstanceById.GetConfig(";
exports.configTowerDefenceInstanceById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var o = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      t =
        (o.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (e) {
        var i = KEY_PREFIX + `#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
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
          const f =
            TowerDefenceInstance_1.TowerDefenceInstance.getRootAsTowerDefenceInstance(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            e &&
              ((t = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=TowerDefenceInstanceById.js.map
