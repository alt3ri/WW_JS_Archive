"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeStructureSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonSort_1 = require("./CommonSort");
class ComposeStructureSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.ZDt = (r, t, e) => {
        return r.SubType !== t.SubType
          ? (t.SubType - r.SubType) * (e ? -1 : 1)
          : 0;
      }),
      (this.zDt = (r, t, e) => {
        var o = r.IsUnlock,
          s = t.IsUnlock;
        return o !== s
          ? e
            ? s - o
            : o - s
          : (e = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(r)
                ? 0
                : 1) !=
              (o = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(t)
                ? 0
                : 1)
            ? e - o
            : r.SortId - t.SortId;
      }),
      (this.KDt = (r, t, e) => {
        var o;
        return t.IsUnlock !== r.IsUnlock
          ? ((o = t.IsUnlock - r.IsUnlock), e ? o : -o)
          : r.Quality !== t.Quality
            ? (t.Quality - r.Quality) * (e ? -1 : 1)
            : r.SortId - t.SortId;
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
