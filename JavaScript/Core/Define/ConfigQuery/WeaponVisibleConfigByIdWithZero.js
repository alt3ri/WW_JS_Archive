"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponVisibleConfigByIdWithZero = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  WeaponVisibleConfig_1 = require("../Config/WeaponVisibleConfig"),
  DB = "db_weapon_visible.db",
  FILE = "w.武器显示配置.xlsx",
  TABLE = "WeaponVisibleConfig",
  COMMAND =
    "select BinData from `WeaponVisibleConfig` where id=0 AND (SELECT count(0) from `WeaponVisibleConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `WeaponVisibleConfig` WHERE id = ?) >0;",
  KEY_PREFIX = "WeaponVisibleConfigByIdWithZero",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configWeaponVisibleConfigByIdWithZero.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configWeaponVisibleConfigByIdWithZero.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configWeaponVisibleConfigByIdWithZero.GetConfig(";
exports.configWeaponVisibleConfigByIdWithZero = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i, n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${i}#${n})`),
      C =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (C) {
      if (e) {
        var f = KEY_PREFIX + `#${o}#${i}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (g)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (C =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Id", o],
              ["Id", i],
              ["Id", n],
            ))
      ) {
        f = void 0;
        if (
          (([C, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
            ["Id", i],
            ["Id", n],
          )),
          C)
        ) {
          const g =
            WeaponVisibleConfig_1.WeaponVisibleConfig.getRootAsWeaponVisibleConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
            );
          return (
            e &&
              ((C = KEY_PREFIX + `#${o}#${i}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(C, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
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
//# sourceMappingURL=WeaponVisibleConfigByIdWithZero.js.map
