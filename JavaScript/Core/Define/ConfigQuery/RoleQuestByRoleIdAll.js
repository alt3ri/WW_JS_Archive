"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configRoleQuestByRoleIdAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleQuest_1 = require("../Config/RoleQuest"),
  DB = "db_rolequest.db",
  FILE = "j.角色任务.xlsx",
  TABLE = "RoleQuest",
  COMMAND = "select BinData from `RoleQuest` where RoleId =?",
  KEY_PREFIX = "RoleQuestByRoleIdAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configRoleQuestByRoleIdAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configRoleQuestByRoleIdAll.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configRoleQuestByRoleIdAll.GetConfigList(";
exports.configRoleQuestByRoleIdAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var t = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      n =
        (t.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (e) {
        var i = KEY_PREFIX + `#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (l)
          return (
            t.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            l
          );
      }
      if (
        (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const l = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "RoleId",
              o,
            ])
          )
            break;
          var C = void 0;
          if (
            (([n, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RoleId", o],
            )),
            !n)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C = RoleQuest_1.RoleQuest.getRootAsRoleQuest(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          l.push(C);
        }
        return (
          e &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, l, l.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          l
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=RoleQuestByRoleIdAll.js.map
