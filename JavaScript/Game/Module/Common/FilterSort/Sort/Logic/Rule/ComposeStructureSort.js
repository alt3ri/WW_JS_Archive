"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeStructureSort = void 0);
const CommonSort_1 = require("./CommonSort");
class ComposeStructureSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.ZDt = (t, r, o) => {
        return t.SubType !== r.SubType
          ? (r.SubType - t.SubType) * (o ? -1 : 1)
          : 0;
      }),
      (this.zDt = (t, r, o) => {
        var s = t.IsUnlock,
          e = r.IsUnlock,
          t = t.IsStructure,
          r = r.IsStructure;
        return s !== e
          ? o
            ? e - s
            : s - e
          : r !== t
            ? o
              ? r - t
              : t - r
            : 0;
      }),
      (this.KDt = (t, r, o) => {
        var s;
        return r.IsUnlock !== t.IsUnlock
          ? ((s = r.IsUnlock - t.IsUnlock), o ? s : -s)
          : t.Quality !== r.Quality
            ? (r.Quality - t.Quality) * (o ? -1 : 1)
            : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.ZDt),
      this.SortMap.set(2, this.zDt),
      this.SortMap.set(3, this.KDt);
  }
}
exports.ComposeStructureSort = ComposeStructureSort;
//# sourceMappingURL=ComposeStructureSort.js.map
