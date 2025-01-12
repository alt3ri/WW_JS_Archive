"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  PayShopById_1 = require("../../../Core/Define/ConfigQuery/PayShopById"),
  PayShopConditionById_1 = require("../../../Core/Define/ConfigQuery/PayShopConditionById"),
  PayShopDirectGoodsByGoodsId_1 = require("../../../Core/Define/ConfigQuery/PayShopDirectGoodsByGoodsId"),
  PayShopGoodsById_1 = require("../../../Core/Define/ConfigQuery/PayShopGoodsById"),
  PayShopGoodsByItemId_1 = require("../../../Core/Define/ConfigQuery/PayShopGoodsByItemId"),
  PayShopTabByShopId_1 = require("../../../Core/Define/ConfigQuery/PayShopTabByShopId"),
  PayShopTabByShopIdAndTabId_1 = require("../../../Core/Define/ConfigQuery/PayShopTabByShopIdAndTabId"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class PayShopConfig extends ConfigBase_1.ConfigBase {
  GetPayShopGoodsConfig(o) {
    return PayShopGoodsById_1.configPayShopGoodsById.GetConfig(o);
  }
  GetPayShopGoodsLocalText(o) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
  }
  GetPayShopConfig(o) {
    var e = PayShopById_1.configPayShopById.GetConfig(o);
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
    var r =
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
    var e =
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
    var e = PayShopConditionById_1.configPayShopConditionById.GetConfig(o);
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
      ),
      e = [];
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
//# sourceMappingURL=PayShopConfig.js.map
