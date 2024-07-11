"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonCurrencyItemListComponent = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  PowerCurrencyItem_1 = require("../Power/SubViews/PowerCurrencyItem"),
  CommonCurrencyItem_1 = require("./CommonCurrencyItem");
class CommonCurrencyItemListComponent {
  constructor(e) {
    (this.PTt = void 0), (this.xTt = void 0), (this.xTt = e);
  }
  pQs(e) {
    return new (
      ModelManager_1.ModelManager.PowerModel.CheckItemIfPowerItem(e)
        ? PowerCurrencyItem_1.PowerCurrencyItem
        : CommonCurrencyItem_1.CommonCurrencyItem
    )();
  }
  async SetCurrencyItemList(r) {
    this.PTt || (this.PTt = new Array());
    let t = void 0;
    var o = [];
    for (let e = this.PTt.length; e < r.length; e++) {
      const t = this.pQs(r[e]);
      this.PTt.push(t);
      var n = t.CreateThenShowByResourceIdAsync(
        "UIItem_CommonCurrencyItem",
        this.xTt,
      );
      o.push(n);
    }
    await Promise.all(o);
    for (let e = 0; e < r.length; e++) {
      const t = this.PTt[e];
      t.RefreshTemp(r[e]), t.SetActive(!0), t.RefreshAddButtonActive();
    }
    for (let e = r.length; e < this.PTt.length; e++)
      (t = this.PTt[e]).SetActive(!1);
  }
  GetCurrencyItemList() {
    return this.PTt;
  }
}
exports.CommonCurrencyItemListComponent = CommonCurrencyItemListComponent;
//# sourceMappingURL=CommonCurrencyItemListComponent.js.map
