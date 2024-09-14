"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionFetterSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonSort_1 = require("./CommonSort");
class VisionFetterSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.aUt = (e, r, t, o) => {
        var s = e,
          n = r,
          e = o;
        if (e && 0 < e)
          for (const M of ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
            e,
          ).GetIncrIdList()) {
            var a =
                ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                  M,
                ),
              a = a ? a.GetMonsterId() : 0;
            let e =
              ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
                s.Id,
              );
            var i = e.includes(a) ? 1 : -1,
              a = (e =
                ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
                  n.Id,
                )).includes(a)
                ? 1
                : -1;
            if (i != a) return a < i ? (t ? 1 : -1) : t ? -1 : 1;
          }
        return 0;
      }),
      (this.hUt = (e, r, t) => 0),
      (this.iRt = (e, r, t) => {
        return e.Id !== r.Id ? (e.Id - r.Id) * (t ? -1 : 1) : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.aUt),
      this.SortMap.set(2, this.hUt),
      this.SortMap.set(3, this.iRt);
  }
}
exports.VisionFetterSort = VisionFetterSort;
//# sourceMappingURL=VisionFetterSort.js.map
