"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemSort = void 0);
const CommonItemData_1 = require("../../../../../Inventory/ItemData/CommonItemData");
const CommonSort_1 = require("./CommonSort");
class ItemSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.OLt = (t, s, e) => {
        return t.GetConfigId() - s.GetConfigId();
      }),
      (this.kLt = (t, s, e) => {
        t = t.GetConfigId();
        return (s.GetConfigId() - t) * (e ? -1 : 1);
      }),
      (this.ZLt = (t, s, e) => {
        t = t.GetAttributeLevel();
        return (s.GetAttributeLevel() - t) * (e ? -1 : 1);
      }),
      (this.VLt = (t, s, e) => {
        t = t.GetQuality();
        return (s.GetQuality() - t) * (e ? -1 : 1);
      }),
      (this.HLt = (t, s, e) => {
        return (t.GetCount() - s.GetCount()) * (e ? -1 : 1);
      }),
      (this.FLt = (t, s, e) => {
        return (t.GetSortIndex() - s.GetSortIndex()) * (e ? -1 : 1);
      }),
      (this.eDt = (t, s, e) => {
        return (t.GetUniqueId() - s.GetUniqueId()) * (e ? -1 : 1);
      }),
      (this.tDt = (t, s, e) => {
        (t = t.GetItemDataBase()), (s = s.GetItemDataBase());
        let r = 0;
        let i = 0;
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
    this.SortMap.set(1, this.kLt),
      this.SortMap.set(4, this.HLt),
      this.SortMap.set(2, this.ZLt),
      this.SortMap.set(3, this.VLt),
      this.SortMap.set(5, this.FLt),
      this.SortMap.set(6, this.eDt),
      this.SortMap.set(7, this.OLt),
      this.SortMap.set(8, this.tDt);
  }
}
exports.ItemSort = ItemSort;
// # sourceMappingURL=ItemSort.js.map
