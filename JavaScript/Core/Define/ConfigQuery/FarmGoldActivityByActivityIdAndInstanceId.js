"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFarmGoldActivityByActivityIdAndInstanceId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FarmGoldActivity_1 = require("../Config/FarmGoldActivity"),
  DB = "db_activity.db",
  FILE = "b.爆金币活动.xlsx",
  TABLE = "FarmGoldActivity",
  COMMAND =
    "select BinData from `FarmGoldActivity` where ActivityId=? And InstId=?",
  KEY_PREFIX = "FarmGoldActivityByActivityIdAndInstanceId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configFarmGoldActivityByActivityIdAndInstanceId.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configFarmGoldActivityByActivityIdAndInstanceId.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configFarmGoldActivityByActivityIdAndInstanceId.GetConfigList(";
exports.configFarmGoldActivityByActivityIdAndInstanceId = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (t, i, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(
        CONFIG_LIST_STAT_PREFIX + `#${t}#${i})`,
      ),
      e =
        (n?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (o) {
        var a = KEY_PREFIX + `#${t}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C)
          return (
            n?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair))
      ) {
        const C = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["ActivityId", t],
              ["InstId", i],
            )
          )
            break;
          var d = void 0;
          if (
            (([e, d] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ActivityId", t],
              ["InstId", i],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              n?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          d = FarmGoldActivity_1.FarmGoldActivity.getRootAsFarmGoldActivity(
            new byte_buffer_1.ByteBuffer(new Uint8Array(d.buffer)),
          );
          C.push(d);
        }
        return (
          o &&
            ((a = KEY_PREFIX + `#${t}#${i})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(a, C, C.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          n?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          C
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FarmGoldActivityByActivityIdAndInstanceId.js.map
