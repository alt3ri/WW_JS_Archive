"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposePurificationSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonSort_1 = require("./CommonSort");
class ComposePurificationSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.zDt = (o, r, e) => {
        var t, s;
        return o.IsUnlock !== r.IsUnlock
          ? (r.IsUnlock - o.IsUnlock) * (e ? -1 : 1)
          : (s = o.IsUnlock) !== (t = r.IsUnlock)
            ? e
              ? t - s
              : s - t
            : (e = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(o)
                  ? 0
                  : 1) !=
                (s = ModelManager_1.ModelManager.ComposeModel.CheckBaseItemData(
                  r,
                )
                  ? 0
                  : 1)
              ? e - s
              : o.SortId - r.SortId;
      }),
      (this.KDt = (o, r, e) => {
        var t;
        return r.IsUnlock !== o.IsUnlock
          ? ((t = r.IsUnlock - o.IsUnlock), e ? t : -t)
          : o.Quality !== r.Quality
            ? (r.Quality - o.Quality) * (e ? -1 : 1)
            : o.ConfigId - r.ConfigId;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.zDt), this.SortMap.set(2, this.KDt);
  }
}
exports.ComposePurificationSort = ComposePurificationSort;
//# sourceMappingURL=ComposePurificationSort.js.map
