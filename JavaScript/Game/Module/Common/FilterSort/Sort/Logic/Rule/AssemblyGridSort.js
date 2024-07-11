"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AssemblyGridSort = void 0);
const CommonSort_1 = require("./CommonSort");
class AssemblyGridSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.HDt = (t, s, r) => {
        return t.Id - s.Id;
      }),
      (this.jDt = (t, s, r) => {
        t = t.Id;
        return (s.Id - t) * (r ? -1 : 1);
      }),
      (this.WDt = (t, s, r) => {
        return (t.SortId - s.SortId) * (r ? -1 : 1);
      }),
      (this.KDt = (t, s, r) => {
        let e = 0;
        return (
          2 === t.GridType &&
            ((t = t.QualityId), (s = s.QualityId), (e = s - t)),
          e * (r ? -1 : 1)
        );
      }),
      (this.QDt = (t, s, r) => {
        let e = 0;
        return (
          2 === t.GridType && ((t = t.ItemNum), (s = s.ItemNum), (e = t - s)),
          e * (r ? -1 : 1)
        );
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.jDt),
      this.SortMap.set(3, this.HDt),
      this.SortMap.set(2, this.WDt),
      this.SortMap.set(4, this.KDt),
      this.SortMap.set(5, this.QDt);
  }
}
exports.AssemblyGridSort = AssemblyGridSort;
//# sourceMappingURL=AssemblyGridSort.js.map
