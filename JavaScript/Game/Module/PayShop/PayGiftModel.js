"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayGiftModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
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
  InitDataByServer(e) {
    if (0 !== e.length) {
      (this._Fi = []),
        (this.lFi = []),
        (this.mFi = []),
        this.uFi.clear(),
        this.cFi.clear();
      var t = new Array();
      for (const a of e) {
        var r = new PayPackageData_1.PayPackageData();
        r.Phrase(a),
          t.push(a.oBs),
          this.lFi.push(r),
          this._Fi.push(r.GetPayShopGoods()),
          this.uFi.set(r.Id, r.GetPayShopGoods()),
          this.cFi.set(r.Id, r),
          !this.mFi.includes(r.TabId) &&
            r.ShowInShop() &&
            this.mFi.push(r.TabId);
      }
      ControllerHolder_1.ControllerHolder.KuroSdkController.QueryProductByProductId(
        t,
      ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshPayGiftList,
        );
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
          Log_1.Log.Error("Pay", 28, "找不到对应的商品，检查配置或者协议顺序", [
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
