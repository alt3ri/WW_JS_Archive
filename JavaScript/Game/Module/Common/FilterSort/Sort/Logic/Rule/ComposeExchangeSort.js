"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeExchangeSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonSort_1 = require("./CommonSort");
class ComposeExchangeSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.KDt = (e, o, r) => {
        var t;
        return o.IsUnlock !== e.IsUnlock
          ? ((t = o.IsUnlock - e.IsUnlock), r ? t : -t)
          : e.Quality !== o.Quality
            ? (o.Quality - e.Quality) * (r ? -1 : 1)
            : e.ConfigId - o.ConfigId;
      }),
      (this.zDt = (e, o, r) => {
        var t;
        return o.IsUnlock !== e.IsUnlock
          ? ((t = o.IsUnlock - e.IsUnlock), r ? t : -t)
          : (r = ModelManager_1.ModelManager.ComposeModel.CheckCanExchange(
                e.ConfigId,
              )
                ? 0
                : 1) !=
              (t = ModelManager_1.ModelManager.ComposeModel.CheckCanExchange(
                o.ConfigId,
              )
                ? 0
                : 1)
            ? r - t
            : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.KDt), this.SortMap.set(2, this.zDt);
  }
}
exports.ComposeExchangeSort = ComposeExchangeSort;
//# sourceMappingURL=ComposeExchangeSort.js.map
