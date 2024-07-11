"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookSort = void 0);
const CommonSort_1 = require("./CommonSort");
class CookSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.$Lt = (t, s, r) => {
        return t.SubType !== s.SubType
          ? (s.SubType - t.SubType) * (r ? -1 : 1)
          : 0;
      }),
      (this.XLt = (t, s, r) => {
        let o;
        return s.IsUnLock !== t.IsUnLock
          ? ((o = s.IsUnLock ? 1 : -1), r ? o : -o)
          : s.IsCook !== t.IsCook
            ? ((o = s.IsCook - t.IsCook), r ? o : -o)
            : 0;
      }),
      (this.YLt = (t, s, r) => {
        let o = 0;
        return (
          t.IsUnLock === s.IsUnLock
            ? (o = s.IsMachining - t.IsMachining)
            : t.IsUnLock
              ? (o = -1)
              : s.IsUnLock && (o = 1),
          (o = r ? o : -1 * o)
        );
      }),
      (this.VLt = (t, s, r) => {
        return t.Quality !== s.Quality
          ? (s.Quality - t.Quality) * (r ? -1 : 1)
          : 0;
      }),
      (this.JLt = (t, s, r) => {
        return t.ItemId !== s.ItemId ? t.ItemId - s.ItemId : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.$Lt),
      this.SortMap.set(2, this.YLt),
      this.SortMap.set(3, this.VLt),
      this.SortMap.set(4, this.JLt),
      this.SortMap.set(5, this.XLt);
  }
}
exports.CookSort = CookSort;
// # sourceMappingURL=CookSort.js.map
