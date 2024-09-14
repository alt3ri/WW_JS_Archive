"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configShopFixedByShopIdAndId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ShopFixed_1 = require("../Config/ShopFixed"),
  DB = "db_shop.db",
  FILE = "s.商城.xlsx",
  TABLE = "ShopFixed",
  COMMAND = "select BinData from `ShopFixed` where ShopId =? AND Id = ?",
  KEY_PREFIX = "ShopFixedByShopIdAndId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configShopFixedByShopIdAndId.Init"),
  getConfigStat = Stats_1.Stat.Create("configShopFixedByShopIdAndId.GetConfig"),
  CONFIG_STAT_PREFIX = "configShopFixedByShopIdAndId.GetConfig(";
exports.configShopFixedByShopIdAndId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var e = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${n})`),
      t =
        (e.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (i) {
        var d = KEY_PREFIX + `#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(d);
        if (C)
          return (
            e.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            C
          );
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["ShopId", o],
              ["Id", n],
            ))
      ) {
        d = void 0;
        if (
          (([t, d] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["ShopId", o],
            ["Id", n],
          )),
          t)
        ) {
          const C = ShopFixed_1.ShopFixed.getRootAsShopFixed(
            new byte_buffer_1.ByteBuffer(new Uint8Array(d.buffer)),
          );
          return (
            i &&
              ((t = KEY_PREFIX + `#${o}#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, C)),
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
//# sourceMappingURL=ShopFixedByShopIdAndId.js.map
