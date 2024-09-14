"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  WeaponPropertyGrowth_1 = require("../Config/WeaponPropertyGrowth"),
  DB = "db_property.db",
  FILE = "s.属性.xlsx",
  TABLE = "WeaponPropertyGrowth",
  COMMAND =
    "select BinData from `WeaponPropertyGrowth` where CurveId = ? AND Level = ? AND BreachLevel = ?",
  KEY_PREFIX = "WeaponPropertyGrowthByCurveIdLevelAndBreachLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.GetConfig(";
exports.configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e, n, r = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${e}#${n})`),
      i =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (r) {
        var C = KEY_PREFIX + `#${o}#${e}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a)
          return (
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["CurveId", o],
              ["Level", e],
              ["BreachLevel", n],
            ))
      ) {
        C = void 0;
        if (
          (([i, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["CurveId", o],
            ["Level", e],
            ["BreachLevel", n],
          )),
          i)
        ) {
          const a =
            WeaponPropertyGrowth_1.WeaponPropertyGrowth.getRootAsWeaponPropertyGrowth(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            r &&
              ((i = KEY_PREFIX + `#${o}#${e}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
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
//# sourceMappingURL=WeaponPropertyGrowthByCurveIdLevelAndBreachLevel.js.map
