"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingSort = void 0);
const ForgingController_1 = require("../../../../../Manufacture/Forging/ForgingController"),
  CommonSort_1 = require("./CommonSort");
class ForgingSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.zDt = (r, t, o) => {
        var n =
            ForgingController_1.ForgingController.CheckCanForgingOrCanUnlock(
              r.ItemId,
            )
              ? 1
              : 0,
          e = ForgingController_1.ForgingController.CheckCanForgingOrCanUnlock(
            t.ItemId,
          )
            ? 1
            : 0;
        if (1 == n && n == e) {
          if (r.IsUnlock === t.IsUnlock) return 0;
          {
            const i = r.IsUnlock - t.IsUnlock;
            return i * (o ? -1 : 1);
          }
        }
        if (0 == n && n == e) {
          if (r.IsUnlock === t.IsUnlock) return 0;
          {
            const i = t.IsUnlock - r.IsUnlock;
            return i * (o ? -1 : 1);
          }
        }
        const i = e - n;
        return i * (o ? -1 : 1);
      }),
      (this.rje = (r, t, o) => {
        return t.WeaponType !== r.WeaponType
          ? (t.WeaponType - r.WeaponType) * (o ? -1 : 1)
          : 0;
      }),
      (this.iRt = (r, t, o) => {
        return r.ItemId !== t.ItemId ? (t.ItemId - r.ItemId) * (o ? -1 : 1) : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.zDt),
      this.SortMap.set(2, this.rje),
      this.SortMap.set(3, this.iRt);
  }
}
exports.ForgingSort = ForgingSort;
//# sourceMappingURL=ForgingSort.js.map
