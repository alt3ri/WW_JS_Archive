"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonSort_1 = require("./CommonSort");
class ComposeSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.ZDt = (r, e, t) => {
        return r.SubType !== e.SubType
          ? (e.SubType - r.SubType) * (t ? -1 : 1)
          : 0;
      }),
      (this.zDt = (r, e, t) => {
        var o;
        return e.IsUnlock !== r.IsUnlock
          ? ((o = e.IsUnlock - r.IsUnlock), t ? o : -o)
          : (t = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(r)
                ? 0
                : 1) !=
              (o = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(e)
                ? 0
                : 1)
            ? t - o
            : r.SortId - e.SortId;
      }),
      (this.KDt = (r, e, t) => {
        var o;
        return e.IsUnlock !== r.IsUnlock
          ? ((o = e.IsUnlock - r.IsUnlock), t ? o : -o)
          : r.Quality !== e.Quality
            ? (e.Quality - r.Quality) * (t ? -1 : 1)
            : r.SortId - e.SortId;
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
