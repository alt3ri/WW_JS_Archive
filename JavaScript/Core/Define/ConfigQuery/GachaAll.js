"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configGachaAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  Gacha_1 = require("../Config/Gacha"),
  DB = "db_gacha.db",
  FILE = "c.抽卡.xlsx",
  TABLE = "Gacha",
  COMMAND = "select BinData from `Gacha`",
  KEY_PREFIX = "GachaAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configGachaAll.Init"),
  getConfigListStat = Stats_1.Stat.Create("configGachaAll.GetConfigList");
exports.configGachaAll = {
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
        var t = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      const a = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var i = void 0;
        if (
          (([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
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
        i = Gacha_1.Gacha.getRootAsGacha(
          new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
        );
        a.push(i);
      }
      return (
        o &&
          ((t = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        a
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=GachaAll.js.map
