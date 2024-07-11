"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayGiftModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const PayPackageData_1 = require("./PayShopData/PayPackageData");
class PayGiftModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Version = ""),
      (this.l2i = []),
      (this._2i = []),
      (this.u2i = new Map()),
      (this.c2i = new Map()),
      (this.m2i = new Array());
  }
  InitDataByServer(e) {
    if (e.length !== 0) {
      (this._2i = []),
        (this.l2i = []),
        (this.m2i = []),
        this.u2i.clear(),
        this.c2i.clear();
      const t = new Array();
      for (const a of e) {
        const r = new PayPackageData_1.PayPackageData();
        r.Phrase(a),
          t.push(a.OPs),
          this.l2i.push(r),
          this._2i.push(r.GetPayShopGoods()),
          this.u2i.set(r.Id, r.GetPayShopGoods()),
          this.c2i.set(r.Id, r),
          !this.m2i.includes(r.TabId) &&
            r.ShowInShop() &&
            this.m2i.push(r.TabId);
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
    for (const e of this.l2i) if (e.Amount === "0") return !0;
    return !1;
  }
  GetTabList() {
    const e = new Set();
    const t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(3);
    for (const r of this.m2i) e.add(r);
    for (const a of t) e.add(a);
    return Array.from(e);
  }
  GetPayShopGoodsById(e) {
    const t = this.u2i.get(e);
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
    return this.l2i;
  }
  GetPayGiftDataById(e) {
    return this.c2i.get(e);
  }
  GetPayShopGoodsList() {
    return this._2i;
  }
  GetDataList() {
    return this.l2i;
  }
}
exports.PayGiftModel = PayGiftModel;
// # sourceMappingURL=PayGiftModel.js.map
