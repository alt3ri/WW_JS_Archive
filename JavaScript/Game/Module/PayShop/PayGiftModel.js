"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayGiftModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PayPackageData_1 = require("./PayShopData/PayPackageData");
class PayGiftModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Version = ""),
      (this.lFi = []),
      (this._Fi = []),
      (this.uFi = new Map()),
      (this.cFi = new Map()),
      (this.mFi = new Array());
  }
  InitDataByServer(t) {
    if (0 !== t.length) {
      (this._Fi = []),
        (this.lFi = []),
        (this.mFi = []),
        this.uFi.clear(),
        this.cFi.clear();
      var e = new Array();
      for (const r of t) {
        var a = new PayPackageData_1.PayPackageData();
        a.Phrase(r),
          e.push(r.uBs),
          this.lFi.push(a),
          this._Fi.push(a.GetPayShopGoods()),
          this.uFi.set(a.Id, a.GetPayShopGoods()),
          this.cFi.set(a.Id, a),
          !this.mFi.includes(a.TabId) &&
            a.ShowInShop() &&
            this.mFi.push(a.TabId);
      }
    }
  }
  IfHaveFreeGift() {
    for (const t of this.lFi) if ("0" === t.Amount) return !0;
    return !1;
  }
  GetTabList() {
    var t = new Set(),
      e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(3);
    for (const a of this.mFi) t.add(a);
    for (const r of e) t.add(r);
    return Array.from(t);
  }
  GetPayShopGoodsById(t) {
    var e = this.uFi.get(t);
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Pay", 28, "找不到对应的商品，检查配置或者协议顺序", [
            "id",
            t,
          ])),
      e
    );
  }
  GetPayGiftDataList() {
    return this.lFi;
  }
  GetPayGiftDataById(t) {
    return this.cFi.get(t);
  }
  GetPayShopGoodsList() {
    return this._Fi;
  }
  GetDataList() {
    return this.lFi;
  }
}
exports.PayGiftModel = PayGiftModel;
//# sourceMappingURL=PayGiftModel.js.map
