"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  GongduolaPassengerVoiceConfig_1 = require("../Config/GongduolaPassengerVoiceConfig"),
  DB = "db_gongduolapassengervoiceconfig.db",
  FILE = "k.可视化编辑/c.Csv/g.贡多拉共乘角色语音配置/*.csv*",
  TABLE = "GongduolaPassengerVoiceConfig",
  COMMAND =
    "select BinData from `GongduolaPassengerVoiceConfig` where RoleId=? And TriggerType=?",
  KEY_PREFIX = "GongduolaPassengerVoiceConfigByRoleIdAndTriggerType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType.GetConfigList(";
exports.configGongduolaPassengerVoiceConfigByRoleIdAndTriggerType = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (o, n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(
        CONFIG_LIST_STAT_PREFIX + `#${o}#${n})`,
      ),
      g =
        (i?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (g) {
      if (e) {
        var t = KEY_PREFIX + `#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a)
          return (
            i?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (g =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair))
      ) {
        const a = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["RoleId", o],
              ["TriggerType", n],
            )
          )
            break;
          var r = void 0;
          if (
            (([g, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RoleId", o],
              ["TriggerType", n],
            )),
            !g)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r =
            GongduolaPassengerVoiceConfig_1.GongduolaPassengerVoiceConfig.getRootAsGongduolaPassengerVoiceConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          a.push(r);
        }
        return (
          e &&
            ((t = KEY_PREFIX + `#${o}#${n})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          a
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=GongduolaPassengerVoiceConfigByRoleIdAndTriggerType.js.map
