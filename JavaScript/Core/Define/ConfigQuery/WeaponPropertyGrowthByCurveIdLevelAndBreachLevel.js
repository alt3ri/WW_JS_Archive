"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const WeaponPropertyGrowth_1 = require("../Config/WeaponPropertyGrowth");
const DB = "db_property.db";
const FILE = "s.属性.xlsx";
const TABLE = "WeaponPropertyGrowth";
const COMMAND =
  "select BinData from `WeaponPropertyGrowth` where CurveId = ? AND Level = ? AND BreachLevel = ?";
const KEY_PREFIX = "WeaponPropertyGrowthByCurveIdLevelAndBreachLevel";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX =
  "configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.GetConfig(";
exports.configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, o, r, n = !0) => {
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var i = KEY_PREFIX + `#${e}#${o}#${r})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) return a;
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, r, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["CurveId", e],
            ["Level", o],
            ["BreachLevel", r],
          ) > 0)
      ) {
        var t;
        var i = void 0;
        if (
          (([t, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["CurveId", e],
            ["Level", o],
            ["BreachLevel", r],
          )),
          t)
        ) {
          const a =
            WeaponPropertyGrowth_1.WeaponPropertyGrowth.getRootAsWeaponPropertyGrowth(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            n &&
              ((t = KEY_PREFIX + `#${e}#${o}#${r})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=WeaponPropertyGrowthByCurveIdLevelAndBreachLevel.js.map
