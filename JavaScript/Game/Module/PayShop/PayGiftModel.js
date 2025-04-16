"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayGiftModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
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
  InitDataByServer(e, t = !1) {
    if (0 !== e.length) {
      (this._Fi = []),
        (this.lFi = []),
        (this.mFi = []),
        this.uFi.clear(),
        this.cFi.clear();
      var r = new Array();
      for (const o of e) {
        var a = new PayPackageData_1.PayPackageData();
        a.Phrase(o),
          r.push(o.uBs),
          this.lFi.push(a),
          this._Fi.push(a.GetPayShopGoods()),
          this.uFi.set(a.Id, a.GetPayShopGoods()),
          this.cFi.set(a.Id, a),
          !this.mFi.includes(a.TabId) &&
            a.ShowInShop() &&
            this.mFi.push(a.TabId);
      }
      if (t) {
        var s = new Set();
        for (const i of this.mFi) s.add(i);
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshGoodsList,
          s,
        );
      }
    }
  }
  IfHaveFreeGift() {
    for (const e of this.lFi) if ("0" === e.Amount) return !0;
    return !1;
  }
  GetTabList() {
    var e = new Set(),
      t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(3);
    for (const r of this.mFi) e.add(r);
    for (const a of t) e.add(a);
    return Array.from(e);
  }
  GetPayShopGoodsById(e) {
    var t = this.uFi.get(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Pay", 27, "找不到对应的商品，检查配置或者协议顺序", [
            "id",
            e,
          ])),
      t
    );
  }
  GetPayGiftDataList() {
    return this.lFi;
  }
  GetPayGiftDataById(e) {
    return this.cFi.get(e);
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
