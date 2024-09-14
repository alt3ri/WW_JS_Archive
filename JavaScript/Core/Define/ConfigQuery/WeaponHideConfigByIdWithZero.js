"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponHideConfigByIdWithZero = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  WeaponHideConfig_1 = require("../Config/WeaponHideConfig"),
  DB = "db_weapon_visible.db",
  FILE = "w.武器显示配置.xlsx",
  TABLE = "WeaponHideConfig",
  COMMAND =
    "select BinData from `WeaponHideConfig` where id=0 AND (SELECT count(0) from `WeaponHideConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `WeaponHideConfig` WHERE id = ?) >0;",
  KEY_PREFIX = "WeaponHideConfigByIdWithZero",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configWeaponHideConfigByIdWithZero.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configWeaponHideConfigByIdWithZero.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configWeaponHideConfigByIdWithZero.GetConfig(";
exports.configWeaponHideConfigByIdWithZero = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, i, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n}#${i})`),
      C =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (C) {
      if (e) {
        var f = KEY_PREFIX + `#${o}#${n}#${i})`;
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
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Id", o],
              ["Id", n],
              ["Id", i],
            ))
      ) {
        f = void 0;
        if (
          (([C, f] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
            ["Id", n],
            ["Id", i],
          )),
          C)
        ) {
          const g =
            WeaponHideConfig_1.WeaponHideConfig.getRootAsWeaponHideConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
            );
          return (
            e &&
              ((C = KEY_PREFIX + `#${o}#${n}#${i})`),
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
//# sourceMappingURL=WeaponHideConfigByIdWithZero.js.map
