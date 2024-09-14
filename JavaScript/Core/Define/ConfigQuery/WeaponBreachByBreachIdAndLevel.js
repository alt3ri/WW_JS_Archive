"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponBreachByBreachIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  WeaponBreach_1 = require("../Config/WeaponBreach"),
  DB = "db_weapon.db",
  FILE = "w.武器基础配置.xlsx",
  TABLE = "WeaponBreach",
  COMMAND =
    "select BinData from `WeaponBreach` where BreachId = ? AND Level = ?",
  KEY_PREFIX = "WeaponBreachByBreachIdAndLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configWeaponBreachByBreachIdAndLevel.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configWeaponBreachByBreachIdAndLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configWeaponBreachByBreachIdAndLevel.GetConfig(";
exports.configWeaponBreachByBreachIdAndLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var a = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${e})`),
      i =
        (a.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var t = KEY_PREFIX + `#${o}#${e})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r)
          return (
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["BreachId", o],
              ["Level", e],
            ))
      ) {
        t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["BreachId", o],
            ["Level", e],
          )),
          i)
        ) {
          const r = WeaponBreach_1.WeaponBreach.getRootAsWeaponBreach(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            n &&
              ((i = KEY_PREFIX + `#${o}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            r
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
//# sourceMappingURL=WeaponBreachByBreachIdAndLevel.js.map
