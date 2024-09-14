"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configExploreToolsByPhantomSkillId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ExploreTools_1 = require("../Config/ExploreTools"),
  DB = "db_explore_skill.db",
  FILE = "t.探索工具.xlsx",
  TABLE = "ExploreTools",
  COMMAND = "select BinData from `ExploreTools` where PhantomSkillId=?",
  KEY_PREFIX = "ExploreToolsByPhantomSkillId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configExploreToolsByPhantomSkillId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configExploreToolsByPhantomSkillId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configExploreToolsByPhantomSkillId.GetConfig(";
exports.configExploreToolsByPhantomSkillId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (l)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "PhantomSkillId",
              o,
            ]))
      ) {
        e = void 0;
        if (
          (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["PhantomSkillId", o],
          )),
          t)
        ) {
          const l = ExploreTools_1.ExploreTools.getRootAsExploreTools(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, l)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ExploreToolsByPhantomSkillId.js.map
