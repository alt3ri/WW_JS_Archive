"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingSort = void 0);
const ForgingController_1 = require("../../../../../Manufacture/Forging/ForgingController");
const CommonSort_1 = require("./CommonSort");
class ForgingSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.XLt = (r, t, o) => {
        const n =
          ForgingController_1.ForgingController.CheckCanForgingOrCanUnlock(
            r.ItemId,
          )
            ? 1
            : 0;
        const e =
          ForgingController_1.ForgingController.CheckCanForgingOrCanUnlock(
            t.ItemId,
          )
            ? 1
            : 0;
        if (n == 1 && n == e) {
          if (r.IsUnlock === t.IsUnlock) return 0;
          {
            const i = r.IsUnlock - t.IsUnlock;
            return i * (o ? -1 : 1);
          }
        }
        if (n == 0 && n == e) {
          if (r.IsUnlock === t.IsUnlock) return 0;
          {
            const i = t.IsUnlock - r.IsUnlock;
            return i * (o ? -1 : 1);
          }
        }
        const i = e - n;
        return i * (o ? -1 : 1);
      }),
      (this.K7e = (r, t, o) => {
        return t.WeaponType !== r.WeaponType
          ? (t.WeaponType - r.WeaponType) * (o ? -1 : 1)
          : 0;
      }),
      (this.zLt = (r, t, o) => {
        return r.ItemId !== t.ItemId ? (t.ItemId - r.ItemId) * (o ? -1 : 1) : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.XLt),
      this.SortMap.set(2, this.K7e),
      this.SortMap.set(3, this.zLt);
  }
}
exports.ForgingSort = ForgingSort;
// # sourceMappingURL=ForgingSort.js.map
