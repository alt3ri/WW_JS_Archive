"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configLoadingLevelAreaAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  LoadingLevelArea_1 = require("../Config/LoadingLevelArea"),
  DB = "db_loadingtips.db",
  FILE = "z.载入提示.xlsx",
  TABLE = "LoadingLevelArea",
  COMMAND = "select BinData from `LoadingLevelArea`",
  KEY_PREFIX = "LoadingLevelAreaAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configLoadingLevelAreaAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configLoadingLevelAreaAll.GetConfigList",
  );
exports.configLoadingLevelAreaAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (o = !0) => {
    var n;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      const t = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !n)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        e = LoadingLevelArea_1.LoadingLevelArea.getRootAsLoadingLevelArea(
          new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
        );
        t.push(e);
      }
      return (
        o &&
          ((i = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(i, t, t.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        t
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=LoadingLevelAreaAll.js.map
