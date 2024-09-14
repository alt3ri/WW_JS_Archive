"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRolePropertyGrowthByLevelAndBreachLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RolePropertyGrowth_1 = require("../Config/RolePropertyGrowth"),
  DB = "db_property.db",
  FILE = "s.属性.xlsx",
  TABLE = "RolePropertyGrowth",
  COMMAND =
    "select BinData from `RolePropertyGrowth` where Level = ? AND BreachLevel = ?",
  KEY_PREFIX = "RolePropertyGrowthByLevelAndBreachLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configRolePropertyGrowthByLevelAndBreachLevel.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configRolePropertyGrowthByLevelAndBreachLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configRolePropertyGrowthByLevelAndBreachLevel.GetConfig(";
exports.configRolePropertyGrowthByLevelAndBreachLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${e})`),
      r =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (r) {
      if (t) {
        var i = KEY_PREFIX + `#${o}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C)
          return (
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (r =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Level", o],
              ["BreachLevel", e],
            ))
      ) {
        i = void 0;
        if (
          (([r, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Level", o],
            ["BreachLevel", e],
          )),
          r)
        ) {
          const C =
            RolePropertyGrowth_1.RolePropertyGrowth.getRootAsRolePropertyGrowth(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            t &&
              ((r = KEY_PREFIX + `#${o}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(r, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            n.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RolePropertyGrowthByLevelAndBreachLevel.js.map
