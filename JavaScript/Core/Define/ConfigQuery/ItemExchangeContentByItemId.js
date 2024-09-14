"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configItemExchangeContentByItemId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ItemExchangeContent_1 = require("../Config/ItemExchangeContent"),
  DB = "db_item_exchange.db",
  FILE = "d.道具兑换.xlsx",
  TABLE = "ItemExchangeContent",
  COMMAND = "select BinData from `ItemExchangeContent` where ItemId=?",
  KEY_PREFIX = "ItemExchangeContentByItemId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configItemExchangeContentByItemId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configItemExchangeContentByItemId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configItemExchangeContentByItemId.GetConfig(";
exports.configItemExchangeContentByItemId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (n, t = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${n})`),
      o =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (t) {
        var i = KEY_PREFIX + `#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (o =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "ItemId",
              n,
            ]))
      ) {
        i = void 0;
        if (
          (([o, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ItemId", n],
          )),
          o)
        ) {
          const C =
            ItemExchangeContent_1.ItemExchangeContent.getRootAsItemExchangeContent(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            t &&
              ((o = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(o, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
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
//# sourceMappingURL=ItemExchangeContentByItemId.js.map
