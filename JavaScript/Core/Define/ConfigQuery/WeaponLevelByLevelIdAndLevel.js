"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponLevelByLevelIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  WeaponLevel_1 = require("../Config/WeaponLevel"),
  DB = "db_weapon.db",
  FILE = "w.武器基础配置.xlsx",
  TABLE = "WeaponLevel",
  COMMAND = "select BinData from `WeaponLevel` where LevelId = ? AND Level =?",
  KEY_PREFIX = "WeaponLevelByLevelIdAndLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configWeaponLevelByLevelIdAndLevel.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configWeaponLevelByLevelIdAndLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configWeaponLevelByLevelIdAndLevel.GetConfig(";
exports.configWeaponLevelByLevelIdAndLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (e, o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e}#${o})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var a = KEY_PREFIX + `#${e}#${o})`;
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
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["LevelId", e],
              ["Level", o],
            ))
      ) {
        a = void 0;
        if (
          (([t, a] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["LevelId", e],
            ["Level", o],
          )),
          t)
        ) {
          const C = WeaponLevel_1.WeaponLevel.getRootAsWeaponLevel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)),
          );
          return (
            n &&
              ((t = KEY_PREFIX + `#${e}#${o})`),
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
//# sourceMappingURL=WeaponLevelByLevelIdAndLevel.js.map
