"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRolePropertyGrowthByLevelAndBreachLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RolePropertyGrowth_1 = require("../Config/RolePropertyGrowth");
const DB = "db_property.db";
const FILE = "s.属性.xlsx";
const TABLE = "RolePropertyGrowth";
const COMMAND =
  "select BinData from `RolePropertyGrowth` where Level = ? AND BreachLevel = ?";
const KEY_PREFIX = "RolePropertyGrowthByLevelAndBreachLevel";
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
  "configRolePropertyGrowthByLevelAndBreachLevel.GetConfig(";
exports.configRolePropertyGrowthByLevelAndBreachLevel = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, e, r = !0) => {
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (r) {
        var n = KEY_PREFIX + `#${o}#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) return i;
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["Level", o],
            ["BreachLevel", e],
          ) > 0)
      ) {
        var t;
        var n = void 0;
        if (
          (([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Level", o],
            ["BreachLevel", e],
          )),
          t)
        ) {
          const i =
            RolePropertyGrowth_1.RolePropertyGrowth.getRootAsRolePropertyGrowth(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            r &&
              ((t = KEY_PREFIX + `#${o}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=RolePropertyGrowthByLevelAndBreachLevel.js.map
