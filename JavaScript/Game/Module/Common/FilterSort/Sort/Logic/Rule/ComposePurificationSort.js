"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposePurificationSort = void 0);
const CommonSort_1 = require("./CommonSort");
class ComposePurificationSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.XLt = (t, o, r) => {
        return t.IsUnlock !== o.IsUnlock
          ? (o.IsUnlock - t.IsUnlock) * (r ? -1 : 1)
          : 1 === t.IsUnlock &&
              t.IsUnlock === o.IsUnlock &&
              o.IsPurification !== t.IsPurification
            ? o.IsPurification - t.IsPurification
            : 0;
      }),
      (this.VLt = (t, o, r) => {
        var s;
        return o.IsUnlock !== t.IsUnlock
          ? ((s = o.IsUnlock - t.IsUnlock), r ? s : -s)
          : t.Quality !== o.Quality
            ? (o.Quality - t.Quality) * (r ? -1 : 1)
            : t.ItemId - o.ItemId;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.XLt), this.SortMap.set(2, this.VLt);
  }
}
exports.ComposePurificationSort = ComposePurificationSort;
//# sourceMappingURL=ComposePurificationSort.js.map
