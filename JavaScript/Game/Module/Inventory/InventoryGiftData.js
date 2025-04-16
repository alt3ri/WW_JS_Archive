"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GiftItemData = exports.InventoryGiftData = void 0);
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
class InventoryGiftData extends UiPopViewData_1.UiPopViewData {
  constructor(t, i, s, e) {
    super(), (this.InitializedSelectedId = void 0), (this.ConfigId = t);
    var o = i.length;
    this.ItemList = [];
    for (let t = 0; t < o; t++) this.ItemList.push(i[t]);
    (this.GiftPackage = s), (this.InitializedSelectedId = e);
  }
}
exports.InventoryGiftData = InventoryGiftData;
class GiftItemData {
  constructor(t, i, s) {
    (this.ItemId = void 0),
      (this.ItemCount = void 0),
      (this.IncId = void 0),
      (this.PhantomItemData = void 0),
      (this.ItemId = t),
      (this.ItemCount = i),
      (this.IncId = s);
  }
  SetPhantomItemData(t) {
    this.PhantomItemData = t;
  }
}
exports.GiftItemData = GiftItemData;
//# sourceMappingURL=InventoryGiftData.js.map
