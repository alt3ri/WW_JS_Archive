"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configItemExchangeLimitByItemId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ItemExchangeLimit_1 = require("../Config/ItemExchangeLimit"),
  DB = "db_item_exchange.db",
  FILE = "d.道具兑换.xlsx",
  TABLE = "ItemExchangeLimit",
  COMMAND = "select BinData from `ItemExchangeLimit` where ItemId=?",
  KEY_PREFIX = "ItemExchangeLimitByItemId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configItemExchangeLimitByItemId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configItemExchangeLimitByItemId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configItemExchangeLimitByItemId.GetConfig(";
exports.configItemExchangeLimitByItemId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (t, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${t})`),
      i =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var o = KEY_PREFIX + `#${t})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (m)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
          );
      }
      if (
        (i =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "ItemId",
              t,
            ]))
      ) {
        o = void 0;
        if (
          (([i, o] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ItemId", t],
          )),
          i)
        ) {
          const m =
            ItemExchangeLimit_1.ItemExchangeLimit.getRootAsItemExchangeLimit(
              new byte_buffer_1.ByteBuffer(new Uint8Array(o.buffer)),
            );
          return (
            n &&
              ((i = KEY_PREFIX + `#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(i, m)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            m
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ItemExchangeLimitByItemId.js.map
