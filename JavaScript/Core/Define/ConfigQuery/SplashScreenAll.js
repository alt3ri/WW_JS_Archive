"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configSplashScreenAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  SplashScreen_1 = require("../Config/SplashScreen"),
  DB = "db_splashscreen.db",
  FILE = "k.开屏动画.xlsx",
  TABLE = "SplashScreen",
  COMMAND = "select BinData from `SplashScreen`",
  KEY_PREFIX = "SplashScreenAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSplashScreenAll.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph(
    "configSplashScreenAll.GetConfigList",
  );
exports.configSplashScreenAll = {
  Init: () => {
    initStat?.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat?.Stop();
  },
  GetConfigList: (n = !0) => {
    var o;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat?.Start(),
      (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (n) {
        var e = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i)
          return (
            getConfigListStat?.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      const i = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var t = void 0;
        if (
          (([o, t] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !o)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat?.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        t = SplashScreen_1.SplashScreen.getRootAsSplashScreen(
          new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)),
        );
        i.push(t);
      }
      return (
        n &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat?.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        i
      );
    }
    getConfigListStat?.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=SplashScreenAll.js.map
