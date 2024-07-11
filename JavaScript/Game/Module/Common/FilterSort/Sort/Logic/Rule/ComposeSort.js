"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeSort = void 0);
const CommonSort_1 = require("./CommonSort");
class ComposeSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.ZDt = (t, o, r) => {
        return t.SubType !== o.SubType
          ? (o.SubType - t.SubType) * (r ? -1 : 1)
          : 0;
      }),
      (this.zDt = (t, o, r) => {
        var s;
        return o.IsUnlock !== t.IsUnlock
          ? ((s = o.IsUnlock - t.IsUnlock), r ? s : -s)
          : o.IsCompose !== t.IsCompose
            ? ((s = o.IsCompose - t.IsCompose), r ? s : -s)
            : 0;
      }),
      (this.KDt = (t, o, r) => {
        var s;
        return o.IsUnlock !== t.IsUnlock
          ? ((s = o.IsUnlock - t.IsUnlock), r ? s : -s)
          : t.Quality !== o.Quality
            ? (o.Quality - t.Quality) * (r ? -1 : 1)
            : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.ZDt),
      this.SortMap.set(2, this.zDt),
      this.SortMap.set(3, this.KDt);
  }
}
exports.ComposeSort = ComposeSort;
//# sourceMappingURL=ComposeSort.js.map
