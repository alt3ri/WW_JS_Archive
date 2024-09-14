"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoleLevelConsumeByConsumeGroupIdAndLevel = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleLevelConsume_1 = require("../Config/RoleLevelConsume"),
  DB = "db_role_level.db",
  FILE = "j.角色升级突破.xlsx",
  TABLE = "RoleLevelConsume",
  COMMAND =
    "select BinData from `RoleLevelConsume` where ConsumeGroupId=? AND Level=?",
  KEY_PREFIX = "RoleLevelConsumeByConsumeGroupIdAndLevel",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create(
    "configRoleLevelConsumeByConsumeGroupIdAndLevel.Init",
  ),
  getConfigStat = Stats_1.Stat.Create(
    "configRoleLevelConsumeByConsumeGroupIdAndLevel.GetConfig",
  ),
  CONFIG_STAT_PREFIX =
    "configRoleLevelConsumeByConsumeGroupIdAndLevel.GetConfig(";
exports.configRoleLevelConsumeByConsumeGroupIdAndLevel = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, e, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var C = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${e})`),
      i =
        (C.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var t = KEY_PREFIX + `#${o}#${e})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (l)
          return (
            C.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ConsumeGroupId", o],
              ["Level", e],
            ))
      ) {
        t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ConsumeGroupId", o],
            ["Level", e],
          )),
          i)
        ) {
          const l =
            RoleLevelConsume_1.RoleLevelConsume.getRootAsRoleLevelConsume(
              new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
            );
          return (
            n &&
              ((i = KEY_PREFIX + `#${o}#${e})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, l)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            C.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    C.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RoleLevelConsumeByConsumeGroupIdAndLevel.js.map
