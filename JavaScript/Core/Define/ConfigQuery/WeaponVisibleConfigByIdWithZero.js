"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponVisibleConfigByIdWithZero = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const WeaponVisibleConfig_1 = require("../Config/WeaponVisibleConfig");
const DB = "db_weapon_visible.db";
const FILE = "w.武器显示配置.xlsx";
const TABLE = "WeaponVisibleConfig";
const COMMAND =
  "select BinData from `WeaponVisibleConfig` where id=0 AND (SELECT count(0) from `WeaponVisibleConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `WeaponVisibleConfig` WHERE id = ?) >0;";
const KEY_PREFIX = "WeaponVisibleConfigByIdWithZero";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configWeaponVisibleConfigByIdWithZero.GetConfig(";
exports.configWeaponVisibleConfigByIdWithZero = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, i, n, e = !0) => {
    if (
      (f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var C = KEY_PREFIX + `#${o}#${i}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a) return a;
      }
      if (
        (f =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["Id", o],
            ["Id", i],
            ["Id", n],
          ) > 0)
      ) {
        var f;
        var C = void 0;
        if (
          (([f, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
            ["Id", i],
            ["Id", n],
          )),
          f)
        ) {
          const a =
            WeaponVisibleConfig_1.WeaponVisibleConfig.getRootAsWeaponVisibleConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
            );
          return (
            e &&
              ((f = KEY_PREFIX + `#${o}#${i}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(f, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=WeaponVisibleConfigByIdWithZero.js.map
