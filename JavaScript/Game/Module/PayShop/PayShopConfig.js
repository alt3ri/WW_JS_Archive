"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const PayShopById_1 = require("../../../Core/Define/ConfigQuery/PayShopById");
const PayShopConditionById_1 = require("../../../Core/Define/ConfigQuery/PayShopConditionById");
const PayShopDirectGoodsByGoodsId_1 = require("../../../Core/Define/ConfigQuery/PayShopDirectGoodsByGoodsId");
const PayShopGoodsById_1 = require("../../../Core/Define/ConfigQuery/PayShopGoodsById");
const PayShopGoodsByItemId_1 = require("../../../Core/Define/ConfigQuery/PayShopGoodsByItemId");
const PayShopTabByShopId_1 = require("../../../Core/Define/ConfigQuery/PayShopTabByShopId");
const PayShopTabByShopIdAndTabId_1 = require("../../../Core/Define/ConfigQuery/PayShopTabByShopIdAndTabId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class PayShopConfig extends ConfigBase_1.ConfigBase {
  GetPayShopGoodsConfig(o) {
    return PayShopGoodsById_1.configPayShopGoodsById.GetConfig(o);
  }
  GetPayShopGoodsLocalText(o) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
  }
  GetPayShopConfig(o) {
    const e = PayShopById_1.configPayShopById.GetConfig(o);
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            11,
            "查询商城数据失败,查看商业化商城表格PayShop",
            ["商城ID", o],
          )),
      e
    );
  }
  GetPayShopTabConfig(o, e) {
    const r =
      PayShopTabByShopIdAndTabId_1.configPayShopTabByShopIdAndTabId.GetConfig(
        o,
        e,
      );
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            11,
            "查询商城数据失败,查看商业化商城表格PayShopTab",
            ["商城ID", o],
            ["页签ID", e],
          )),
      r
    );
  }
  GetPayShopGoodsConfigByItemConfigId(o) {
    return PayShopGoodsByItemId_1.configPayShopGoodsByItemId.GetConfig(o);
  }
  GetPayShopDirectGoods(o) {
    const e =
      PayShopDirectGoodsByGoodsId_1.configPayShopDirectGoodsByGoodsId.GetConfig(
        o,
      );
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            11,
            "查询直购商品ID数据失败,查看商业化商城表格PayShopDirectGoods",
            ["直购商品ID", o],
          )),
      e
    );
  }
  GetPayShopCondition(o) {
    const e = PayShopConditionById_1.configPayShopConditionById.GetConfig(o);
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            11,
            "查询商品条件ID数据失败,查看商业化商城表格PayShopCondition",
            ["商品条件ID", o],
          )),
      e
    );
  }
  GetPayShopConditionLocalText(o) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
  }
  GetPayShopTableList(o) {
    var o = ConfigCommon_1.ConfigCommon.ToList(
      PayShopTabByShopId_1.configPayShopTabByShopId.GetConfigList(o),
    );
    const e = [];
    o.sort((o, e) => o.Sort - e.Sort);
    for (const r of o) r.Enable && e.push(r.TabId);
    return e;
  }
  GetPayShopItemName(o) {
    o =
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
        o,
      ).ItemId;
    return ConfigManager_1.ConfigManager.ItemConfig.GetItemName(o);
  }
  GetShopDiscountLabel(o) {
    return "ShopDiscountLabel_" + o;
  }
  GetMonthCardShopId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MonthCardPayItemId",
    );
  }
  GetMonthCardRewardId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "MonthCardRewardId",
    );
  }
}
exports.PayShopConfig = PayShopConfig;
// # sourceMappingURL=PayShopConfig.js.map
