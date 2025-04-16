"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFishingManualRefreshByEntrustPoolTypeAndStar = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FishingManualRefresh_1 = require("../Config/FishingManualRefresh"),
  DB = "db_fishing.db",
  FILE = "b.捕鱼委托.xlsx",
  TABLE = "FishingManualRefresh",
  COMMAND =
    "select BinData from `FishingManualRefresh` where EntrustPoolType=? And Star=?",
  KEY_PREFIX = "FishingManualRefreshByEntrustPoolTypeAndStar",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configFishingManualRefreshByEntrustPoolTypeAndStar.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configFishingManualRefreshByEntrustPoolTypeAndStar.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX =
    "configFishingManualRefreshByEntrustPoolTypeAndStar.GetConfigList(";
exports.configFishingManualRefreshByEntrustPoolTypeAndStar = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (n, o, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(
        CONFIG_LIST_STAT_PREFIX + `#${n}#${o})`,
      ),
      e =
        (t?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (i) {
        var a = KEY_PREFIX + `#${n}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (f)
          return (
            t?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair))
      ) {
        const f = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["EntrustPoolType", n],
              ["Star", o],
            )
          )
            break;
          var r = void 0;
          if (
            (([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["EntrustPoolType", n],
              ["Star", o],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              t?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          r =
            FishingManualRefresh_1.FishingManualRefresh.getRootAsFishingManualRefresh(
              new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
            );
          f.push(r);
        }
        return (
          i &&
            ((a = KEY_PREFIX + `#${n}#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(a, f, f.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          f
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FishingManualRefreshByEntrustPoolTypeAndStar.js.map
