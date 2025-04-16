"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAbyssRouteByRouterAndFloor = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AbyssRoute_1 = require("../Config/AbyssRoute"),
  DB = "db_dangoabyss.db",
  FILE = "s.深渊爬塔副本.xlsx",
  TABLE = "AbyssRoute",
  COMMAND = "select BinData from `AbyssRoute` where RouteId=? And Floor=?",
  KEY_PREFIX = "AbyssRouteByRouterAndFloor",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph(
    "configAbyssRouteByRouterAndFloor.Init",
  ),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configAbyssRouteByRouterAndFloor.GetConfigList",
  ),
  CONFIG_LIST_STAT_PREFIX = "configAbyssRouteByRouterAndFloor.GetConfigList(";
exports.configAbyssRouteByRouterAndFloor = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (o, t, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(
        CONFIG_LIST_STAT_PREFIX + `#${o}#${t})`,
      ),
      e =
        (i?.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var r = KEY_PREFIX + `#${o}#${t})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (s)
          return (
            i?.Stop(),
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            s
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, t, ...logPair))
      ) {
        const s = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !1,
              ...logPair,
              ["RouteId", o],
              ["Floor", t],
            )
          )
            break;
          var C = void 0;
          if (
            (([e, C] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RouteId", o],
              ["Floor", t],
            )),
            !e)
          )
            return (
              ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
              i?.Stop(),
              getConfigListStat?.Stop(),
              void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
            );
          C = AbyssRoute_1.AbyssRoute.getRootAsAbyssRoute(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          s.push(C);
        }
        return (
          n &&
            ((r = KEY_PREFIX + `#${o}#${t})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(r, s, s.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          i?.Stop(),
          getConfigListStat?.Stop(),
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
          s
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop(),
      getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=AbyssRouteByRouterAndFloor.js.map
