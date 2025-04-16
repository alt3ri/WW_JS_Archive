"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configDangoMonopolyGridByGroup = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  DangoMonopolyGrid_1 = require("../Config/DangoMonopolyGrid"),
  DB = "db_dangomonopoly.db",
  FILE = "t.团子大富翁.xlsx",
  TABLE = "DangoMonopolyGrid",
  COMMAND = "select BinData from `DangoMonopolyGrid` where GridGroupId=?",
  KEY_PREFIX = "DangoMonopolyGridByGroup",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configDangoMonopolyGridByGroup.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configDangoMonopolyGridByGroup.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configDangoMonopolyGridByGroup.GetConfigList(";
exports.configDangoMonopolyGridByGroup = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      t =
        (i?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var r = KEY_PREFIX + `#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (g)
          return (
            i?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            g
          );
      }
      if (
        (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const g = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "GridGroupId",
              o,
            ])
          )
            break;
          var e = void 0;
          if (
            (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["GridGroupId", o],
            )),
            !t)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          e = DangoMonopolyGrid_1.DangoMonopolyGrid.getRootAsDangoMonopolyGrid(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          g.push(e);
        }
        return (
          n &&
            ((r = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(r, g, g.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          g
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=DangoMonopolyGridByGroup.js.map
