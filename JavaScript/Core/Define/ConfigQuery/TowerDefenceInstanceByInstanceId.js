"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTowerDefenceInstanceByInstanceId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TowerDefenceInstance_1 = require("../Config/TowerDefenceInstance"),
  DB = "db_activity.db",
  FILE = "l.联机塔防活动.xlsx",
  TABLE = "TowerDefenceInstance",
  COMMAND = "select BinData from `TowerDefenceInstance` where InstanceId = ?",
  KEY_PREFIX = "TowerDefenceInstanceByInstanceId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configTowerDefenceInstanceByInstanceId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configTowerDefenceInstanceByInstanceId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configTowerDefenceInstanceByInstanceId.GetConfig(";
exports.configTowerDefenceInstanceByInstanceId = {
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
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a)
          return (
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "InstanceId",
              n,
            ]))
      ) {
        i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["InstanceId", n],
          )),
          t)
        ) {
          const a =
            TowerDefenceInstance_1.TowerDefenceInstance.getRootAsTowerDefenceInstance(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            e &&
              ((t = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            o.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
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
//# sourceMappingURL=TowerDefenceInstanceByInstanceId.js.map
