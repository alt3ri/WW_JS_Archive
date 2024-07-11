"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonCurrencyItemListComponent = void 0);
const CommonCurrencyItem_1 = require("./CommonCurrencyItem");
class CommonCurrencyItemListComponent {
  constructor(t) {
    (this.LIt = void 0), (this.DIt = void 0), (this.DIt = t);
  }
  async SetCurrencyItemList(e) {
    this.LIt || (this.LIt = new Array());
    let r = void 0;
    const o = [];
    for (let t = this.LIt.length; t < e.length; t++) {
      const r = new CommonCurrencyItem_1.CommonCurrencyItem();
      this.LIt.push(r);
      const s = r.CreateThenShowByResourceIdAsync(
        "UIItem_CommonCurrencyItem",
        this.DIt,
      );
      o.push(s);
    }
    await Promise.all(o);
    for (let t = 0; t < e.length; t++) {
      const r = this.LIt[t];
      r.RefreshTemp(e[t]), r.SetActive(!0), r.SetPayShopButtonActive();
    }
    for (let t = e.length; t < this.LIt.length; t++)
      (r = this.LIt[t]).SetActive(!1);
  }
  GetCurrencyItemList() {
    return this.LIt;
  }
}
exports.CommonCurrencyItemListComponent = CommonCurrencyItemListComponent;
// # sourceMappingURL=CommonCurrencyItemListComponent.js.map
