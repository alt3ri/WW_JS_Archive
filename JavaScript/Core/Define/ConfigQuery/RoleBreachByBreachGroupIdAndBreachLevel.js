"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoleBreachByBreachGroupIdAndBreachLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleBreach_1 = require("../Config/RoleBreach"),
  DB = "db_role_level.db",
  FILE = "j.角色升级突破.xlsx",
  TABLE = "RoleBreach",
  COMMAND =
    "select BinData from `RoleBreach` where BreachGroupId=? AND BreachLevel=?",
  KEY_PREFIX = "RoleBreachByBreachGroupIdAndBreachLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configRoleBreachByBreachGroupIdAndBreachLevel.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configRoleBreachByBreachGroupIdAndBreachLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configRoleBreachByBreachGroupIdAndBreachLevel.GetConfig(";
exports.configRoleBreachByBreachGroupIdAndBreachLevel = {
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
    var r = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${e}#${o})`),
      a =
        (r.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (n) {
        var i = KEY_PREFIX + `#${e}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t)
          return (
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      if (
        (a =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["BreachGroupId", e],
              ["BreachLevel", o],
            ))
      ) {
        i = void 0;
        if (
          (([a, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["BreachGroupId", e],
            ["BreachLevel", o],
          )),
          a)
        ) {
          const t = RoleBreach_1.RoleBreach.getRootAsRoleBreach(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            n &&
              ((a = KEY_PREFIX + `#${e}#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(a, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RoleBreachByBreachGroupIdAndBreachLevel.js.map
