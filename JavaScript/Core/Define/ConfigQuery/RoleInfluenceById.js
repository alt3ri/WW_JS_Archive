"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoleInfluenceById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleInfluence_1 = require("../Config/RoleInfluence"),
  DB = "db_roleinfluence.db",
  FILE = "j.角色势力.xlsx",
  TABLE = "RoleInfluence",
  COMMAND = "select BinData from `RoleInfluence` where Id=?",
  KEY_PREFIX = "RoleInfluenceById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRoleInfluenceById.Init"),
  getConfigStat = Stats_1.Stat.Create("configRoleInfluenceById.GetConfig"),
  CONFIG_STAT_PREFIX = "configRoleInfluenceById.GetConfig(";
exports.configRoleInfluenceById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var t = KEY_PREFIX + `#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              n,
            ]))
      ) {
        t = void 0;
        if (
          (([i, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", n],
          )),
          i)
        ) {
          const f = RoleInfluence_1.RoleInfluence.getRootAsRoleInfluence(
            new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
          );
          return (
            o &&
              ((i = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RoleInfluenceById.js.map
