"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemSort = void 0);
const CommonItemData_1 = require("../../../../../Inventory/ItemData/CommonItemData"),
  CommonSort_1 = require("./CommonSort");
class ItemSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.HDt = (t, s, e) => {
        return t.GetConfigId() - s.GetConfigId();
      }),
      (this.jDt = (t, s, e) => {
        t = t.GetConfigId();
        return (s.GetConfigId() - t) * (e ? -1 : 1);
      }),
      (this.oRt = (t, s, e) => {
        t = t.GetAttributeLevel();
        return (s.GetAttributeLevel() - t) * (e ? -1 : 1);
      }),
      (this.KDt = (t, s, e) => {
        t = t.GetQuality();
        return (s.GetQuality() - t) * (e ? -1 : 1);
      }),
      (this.QDt = (t, s, e) => {
        return (t.GetCount() - s.GetCount()) * (e ? -1 : 1);
      }),
      (this.WDt = (t, s, e) => {
        return (t.GetSortIndex() - s.GetSortIndex()) * (e ? -1 : 1);
      }),
      (this.rRt = (t, s, e) => {
        return (t.GetUniqueId() - s.GetUniqueId()) * (e ? -1 : 1);
      }),
      (this.nRt = (t, s, e) => {
        (t = t.GetItemDataBase()), (s = s.GetItemDataBase());
        let r = 0,
          i = 0;
        return (
          t instanceof CommonItemData_1.CommonItemData &&
            (r = t.IsLimitTimeItem() ? 1 : 0),
          (i =
            s instanceof CommonItemData_1.CommonItemData
              ? s.IsLimitTimeItem()
                ? 1
                : 0
              : i) - r
        );
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.jDt),
      this.SortMap.set(4, this.QDt),
      this.SortMap.set(2, this.oRt),
      this.SortMap.set(3, this.KDt),
      this.SortMap.set(5, this.WDt),
      this.SortMap.set(6, this.rRt),
      this.SortMap.set(7, this.HDt),
      this.SortMap.set(8, this.nRt);
  }
}
exports.ItemSort = ItemSort;
//# sourceMappingURL=ItemSort.js.map
