"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMotionByRoleIdAndType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  Motion_1 = require("../Config/Motion"),
  DB = "db_motion.db",
  FILE = "d.动作.xlsx",
  TABLE = "Motion",
  COMMAND =
    "select BinData from `Motion` where RoleId=? And Type=? Order By Sort",
  KEY_PREFIX = "MotionByRoleIdAndType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configMotionByRoleIdAndType.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configMotionByRoleIdAndType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configMotionByRoleIdAndType.GetConfigList(";
exports.configMotionByRoleIdAndType = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o}#${n})`),
      e =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var C = KEY_PREFIX + `#${o}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (g)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
      ) {
        const g = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["RoleId", o],
              ["Type", n],
            )
          )
            break;
          var f = void 0;
          if (
            (([e, f] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RoleId", o],
              ["Type", n],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          f = Motion_1.Motion.getRootAsMotion(
            new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)),
          );
          g.push(f);
        }
        return (
          i &&
            ((C = KEY_PREFIX + `#${o}#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(C, g, g.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          g
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=MotionByRoleIdAndType.js.map
