"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSkillButtonByRoleId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SkillButton_1 = require("../Config/SkillButton"),
  DB = "db_skillbutton.db",
  FILE = "j.技能按钮.xlsx",
  TABLE = "SkillButton",
  COMMAND = "select BinData from `SkillButton` where RoleId=?",
  KEY_PREFIX = "SkillButtonByRoleId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configSkillButtonByRoleId.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configSkillButtonByRoleId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configSkillButtonByRoleId.GetConfigList(";
exports.configSkillButtonByRoleId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start();
    var n = Stats_1.Stat.Create(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      i =
        (n.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (t) {
        var e = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C)
          return (
            n.Stop(),
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "RoleId",
              o,
            ])
          )
            break;
          var l = void 0;
          if (
            (([i, l] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RoleId", o],
            )),
            !i)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n.Stop(),
              getConfigListStat.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          l = SkillButton_1.SkillButton.getRootAsSkillButton(
            new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)),
          );
          C.push(l);
        }
        return (
          t &&
            ((e = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n.Stop(),
          getConfigListStat.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n.Stop(),
      getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=SkillButtonByRoleId.js.map
