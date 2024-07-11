"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhysicsAssetConfigByIdWithDefaultId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhysicsAssetConfig_1 = require("../Config/PhysicsAssetConfig");
const DB = "db_physics_asset.db";
const FILE = "j.角色物理资产.xlsx";
const TABLE = "PhysicsAssetConfig";
const COMMAND =
  "select BinData from `PhysicsAssetConfig` where id = ? AND (SELECT count() from `PhysicsAssetConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `PhysicsAssetConfig` WHERE id = ?) >0;";
const KEY_PREFIX = "PhysicsAssetConfigByIdWithDefaultId";
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
  "configPhysicsAssetConfigByIdWithDefaultId.GetConfig(";
exports.configPhysicsAssetConfigByIdWithDefaultId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, i, n, e, s = !0) => {
    if (
      (C = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (s) {
        var t = KEY_PREFIX + `#${o}#${i}#${n}#${e})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (d) return d;
      }
      if (
        (C =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 4, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(
            handleId,
            !0,
            ...logPair,
            ["Id", o],
            ["Id", i],
            ["Id", n],
            ["Id", e],
          ) > 0)
      ) {
        var C;
        var t = void 0;
        if (
          (([C, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
            ["Id", i],
            ["Id", n],
            ["Id", e],
          )),
          C)
        ) {
          const d =
            PhysicsAssetConfig_1.PhysicsAssetConfig.getRootAsPhysicsAssetConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            s &&
              ((C = KEY_PREFIX + `#${o}#${i}#${n}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(C, d)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            d
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=PhysicsAssetConfigByIdWithDefaultId.js.map
