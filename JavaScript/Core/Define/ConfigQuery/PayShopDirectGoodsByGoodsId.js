"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPayShopDirectGoodsByGoodsId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PayShopDirectGoods_1 = require("../Config/PayShopDirectGoods"),
  DB = "db_payshop.db",
  FILE = "s.商业化商城.xlsx",
  TABLE = "PayShopDirectGoods",
  COMMAND = "select BinData from `PayShopDirectGoods` where GoodsId=?",
  KEY_PREFIX = "PayShopDirectGoodsByGoodsId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configPayShopDirectGoodsByGoodsId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configPayShopDirectGoodsByGoodsId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configPayShopDirectGoodsByGoodsId.GetConfig(";
exports.configPayShopDirectGoodsByGoodsId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      t =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "GoodsId",
              o,
            ]))
      ) {
        e = void 0;
        if (
          (([t, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["GoodsId", o],
          )),
          t)
        ) {
          const a =
            PayShopDirectGoods_1.PayShopDirectGoods.getRootAsPayShopDirectGoods(
              new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
            );
          return (
            n &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, a)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            a
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=PayShopDirectGoodsByGoodsId.js.map
