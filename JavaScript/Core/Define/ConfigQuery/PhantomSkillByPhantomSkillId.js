"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhantomSkillByPhantomSkillId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomSkill_1 = require("../Config/PhantomSkill"),
  DB = "db_phantom.db",
  FILE = "h.幻象.xlsx",
  TABLE = "PhantomSkill",
  COMMAND = "select BinData from `PhantomSkill` where PhantomSkillId=?",
  KEY_PREFIX = "PhantomSkillByPhantomSkillId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPhantomSkillByPhantomSkillId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configPhantomSkillByPhantomSkillId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configPhantomSkillByPhantomSkillId.GetConfigList(";
exports.configPhantomSkillByPhantomSkillId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var a = KEY_PREFIX + `#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e)
          return (
            i.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            e
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const e = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "PhantomSkillId",
              o,
            ])
          )
            break;
          var l = void 0;
          if (
            (([t, l] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["PhantomSkillId", o],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          l = PhantomSkill_1.PhantomSkill.getRootAsPhantomSkill(
            new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)),
          );
          e.push(l);
        }
        return (
          n &&
            ((a = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(a, e, e.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          e
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PhantomSkillByPhantomSkillId.js.map
