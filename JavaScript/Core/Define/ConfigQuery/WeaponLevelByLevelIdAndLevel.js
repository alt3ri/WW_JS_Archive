"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configWeaponLevelByLevelIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const WeaponLevel_1 = require("../Config/WeaponLevel");
const DB = "db_weapon.db";
const FILE = "w.武器基础配置.xlsx";
const TABLE = "WeaponLevel";
const COMMAND =
  "select BinData from `WeaponLevel` where LevelId = ? AND Level =?";
const KEY_PREFIX = "WeaponLevelByLevelIdAndLevel";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configWeaponLevelByLevelIdAndLevel.GetConfig(";
exports.configWeaponLevelByLevelIdAndLevel = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (e, o, n = !0) => {
    if (
      (l = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var i = KEY_PREFIX + `#${e}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) return a;
      }
      if (
        (l =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["LevelId", e],
            ["Level", o],
          ) > 0)
      ) {
        var l;
        var i = void 0;
        if (
          (([l, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["LevelId", e],
            ["Level", o],
          )),
          l)
        ) {
          const a = WeaponLevel_1.WeaponLevel.getRootAsWeaponLevel(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            n &&
              ((l = KEY_PREFIX + `#${e}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(l, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=WeaponLevelByLevelIdAndLevel.js.map
