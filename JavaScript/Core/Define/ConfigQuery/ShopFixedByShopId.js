"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configShopFixedByShopId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ShopFixed_1 = require("../Config/ShopFixed");
const DB = "db_shop.db";
const FILE = "s.商城.xlsx";
const TABLE = "ShopFixed";
const COMMAND = "select BinData from `ShopFixed` where ShopId = ?";
const KEY_PREFIX = "ShopFixedByShopId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configShopFixedByShopId.GetConfigList(";
exports.configShopFixedByShopId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, i = !0) => {
    let e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var n = KEY_PREFIX + `#${o})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (d) return d;
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const d = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "ShopId",
              o,
            ]) !== 1
          )
            break;
          let r = void 0;
          if (
            (([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["ShopId", o],
            )),
            !e)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = ShopFixed_1.ShopFixed.getRootAsShopFixed(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          d.push(r);
        }
        return (
          i &&
            ((n = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, d, d.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          d
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=ShopFixedByShopId.js.map
