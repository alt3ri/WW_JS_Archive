"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryGiftData = void 0);
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
class InventoryGiftData extends UiPopViewData_1.UiPopViewData {
  constructor(t, e, i) {
    super(), (this.ConfigId = t);
    var s = e.length;
    this.ItemList = [];
    for (let t = 0; t < s; t++) this.ItemList.push(e[t]);
    this.GiftPackage = i;
  }
}
exports.InventoryGiftData = InventoryGiftData;
//# sourceMappingURL=InventoryGiftData.js.map
