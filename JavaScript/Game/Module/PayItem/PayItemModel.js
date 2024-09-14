"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayItemModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PayItemDefine_1 = require("./PayItemDefine");
class PayItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.YOi = []),
      (this.JOi = new Map()),
      (this.Version = ""),
      (this.zOi = void 0),
      (this.lka = new Map());
  }
  UpdateProductInfoMap(e) {
    e.forEach((e) => {
      this.lka.set(e.GoodId, e);
    }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Pay", 17, "PayItemModel UpdateProductInfoMap:", [
          "ProductInfoMap",
          this.lka,
        ]);
  }
  GetProductLabelByGoodsId(e) {
    return this.lka.get(e)?.GoodLabel;
  }
  GetProductInfoByGoodsId(e) {
    return this.lka.get(e);
  }
  GetDataList() {
    return this.YOi;
  }
  GetPayingItemName() {
    return this.zOi;
  }
  CleanPayingItemName() {
    this.zOi = void 0;
  }
  ConvertPayItemDataToPayShopItemBaseSt(e) {
    return e.ConvertPayItemDataToPayShopItemBaseSt();
  }
  UpdatePayingItemName(e) {
    (e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(e)),
      (e = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.ItemId));
    this.zOi = e;
  }
  ResetSpecialBonus(e) {
    for (const a of e) {
      var t = this.JOi.get(a);
      t && (t.CanSpecialBonus = !0);
    }
  }
  InitDataListByServer(e) {
    0 !== this.YOi.length && 0 !== e.length && (this.YOi.length = 0);
    for (const a of e) {
      var t = new PayItemDefine_1.PayItemData();
      t.Phrase(a), this.YOi.push(t), this.JOi.set(a.s5n, t);
    }
  }
  OnClear() {
    return (
      (this.YOi.length = 0),
      (this.YOi = void 0),
      this.JOi.clear(),
      (this.Version = ""),
      !(this.zOi = void 0)
    );
  }
  CreateSdkPayment(e, t, a) {
    var e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(e),
      r = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e.ItemId),
      o = ConfigManager_1.ConfigManager.ItemConfig.GetItemDesc(e.ItemId),
      i = e.PayId,
      n = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(i);
    return {
      product_id:
        ModelManager_1.ModelManager.RechargeModel.GetPayIdProductId(i),
      cpOrderId: t,
      price: n,
      goodsName: "" + r + e.ItemCount,
      goodsDesc: "" + o + e.ItemCount,
      extraParams: " ",
      callbackUrl: a,
      currency: "",
    };
  }
}
exports.PayItemModel = PayItemModel;
//# sourceMappingURL=PayItemModel.js.map
