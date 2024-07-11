"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayItemModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PayItemDefine_1 = require("./PayItemDefine");
class PayItemModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.YOi = []),
      (this.JOi = new Map()),
      (this.Version = ""),
      (this.zOi = void 0);
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
      t.Phrase(a), this.YOi.push(t), this.JOi.set(a.J4n, t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayItemList);
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
      n = ConfigManager_1.ConfigManager.ItemConfig.GetItemDesc(e.ItemId),
      i = e.PayId,
      o = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(i);
    return {
      product_id:
        ModelManager_1.ModelManager.RechargeModel.GetPayIdProductId(i),
      cpOrderId: t,
      price: o,
      goodsName: "" + r + e.ItemCount,
      goodsDesc: "" + n + e.ItemCount,
      extraParams: " ",
      callbackUrl: a,
      currency: "",
    };
  }
}
exports.PayItemModel = PayItemModel;
//# sourceMappingURL=PayItemModel.js.map
