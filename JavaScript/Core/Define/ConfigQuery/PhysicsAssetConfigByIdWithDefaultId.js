"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhysicsAssetConfigByIdWithDefaultId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhysicsAssetConfig_1 = require("../Config/PhysicsAssetConfig"),
  DB = "db_physics_asset.db",
  FILE = "j.角色物理资产.xlsx",
  TABLE = "PhysicsAssetConfig",
  COMMAND =
    "select BinData from `PhysicsAssetConfig` where id = ? AND (SELECT count() from `PhysicsAssetConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `PhysicsAssetConfig` WHERE id = ?) >0;",
  KEY_PREFIX = "PhysicsAssetConfigByIdWithDefaultId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configPhysicsAssetConfigByIdWithDefaultId.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configPhysicsAssetConfigByIdWithDefaultId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configPhysicsAssetConfigByIdWithDefaultId.GetConfig(";
exports.configPhysicsAssetConfigByIdWithDefaultId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, i, n, t, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var s = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${i}#${n}#${t})`),
      C =
        (s.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (C) {
      if (e) {
        var f = KEY_PREFIX + `#${o}#${i}#${n}#${t})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (g)
          return (
            s.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (C =
          ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 4, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Id", o],
              ["Id", i],
              ["Id", n],
              ["Id", t],
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
            ["Id", t],
          )),
          C)
        ) {
          const g =
            PhysicsAssetConfig_1.PhysicsAssetConfig.getRootAsPhysicsAssetConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
            );
          return (
            e &&
              ((C = KEY_PREFIX + `#${o}#${i}#${n}#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(C, g)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            s.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    s.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PhysicsAssetConfigByIdWithDefaultId.js.map
