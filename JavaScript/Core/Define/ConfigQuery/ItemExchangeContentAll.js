"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configItemExchangeContentAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ItemExchangeContent_1 = require("../Config/ItemExchangeContent"),
  DB = "db_item_exchange.db",
  FILE = "d.道具兑换.xlsx",
  TABLE = "ItemExchangeContent",
  COMMAND = "select BinData from `ItemExchangeContent`",
  KEY_PREFIX = "ItemExchangeContentAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configItemExchangeContentAll.Init"),
  getConfigListStat = Stats_1.Stat.Create(
    "configItemExchangeContentAll.GetConfigList",
  );
exports.configItemExchangeContentAll = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfigList: (n = !0) => {
    var t;
    if (
      (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigListStat.Start(),
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)))
    ) {
      if (n) {
        var o = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (i)
          return (
            getConfigListStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            i
          );
      }
      const i = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var e = void 0;
        if (
          (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !t)
        )
          return (
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            getConfigListStat.Stop(),
            void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
          );
        e =
          ItemExchangeContent_1.ItemExchangeContent.getRootAsItemExchangeContent(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
        i.push(e);
      }
      return (
        n &&
          ((o = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(o, i, i.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        getConfigListStat.Stop(),
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
        i
      );
    }
    getConfigListStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ItemExchangeContentAll.js.map
