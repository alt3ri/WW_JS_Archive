"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponResonByResonIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  WeaponReson_1 = require("../Config/WeaponReson"),
  DB = "db_weapon.db",
  FILE = "w.武器基础配置.xlsx",
  TABLE = "WeaponReson",
  COMMAND = "select BinData from `WeaponReson` where ResonId = ? AND Level = ?",
  KEY_PREFIX = "WeaponResonByResonIdAndLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configWeaponResonByResonIdAndLevel.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configWeaponResonByResonIdAndLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configWeaponResonByResonIdAndLevel.GetConfig(";
exports.configWeaponResonByResonIdAndLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (e) {
        var a = KEY_PREFIX + `#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ResonId", o],
              ["Level", n],
            ))
      ) {
        a = void 0;
        if (
          (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ResonId", o],
            ["Level", n],
          )),
          t)
        ) {
          const C = WeaponReson_1.WeaponReson.getRootAsWeaponReson(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            e &&
              ((t = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=WeaponResonByResonIdAndLevel.js.map
