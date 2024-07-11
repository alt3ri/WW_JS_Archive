"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionFetterSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class VisionFetterSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.oRt = (e, r, t) => {
        const o = e;
        const s = r;
        var e = ModelManager_1.ModelManager.RoleModel?.GetCurSelectMainRoleId();
        if (e && e > 0)
          for (const i of ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
            e,
          ).GetIncrIdList()) {
            var a =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                i,
              );
            var a = a ? a.GetMonsterId() : 0;
            let e =
              ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
                o.Id,
              );
            const n = e.includes(a) ? 1 : -1;
            var a = (e =
              ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
                s.Id,
              )).includes(a)
              ? 1
              : -1;
            if (n != a) return a < n ? (t ? 1 : -1) : t ? -1 : 1;
          }
        return 0;
      }),
      (this.rRt = (e, r, t) => 0),
      (this.zLt = (e, r, t) => {
        return e.Id !== r.Id ? (e.Id - r.Id) * (t ? -1 : 1) : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.oRt),
      this.SortMap.set(2, this.rRt),
      this.SortMap.set(3, this.zLt);
  }
}
exports.VisionFetterSort = VisionFetterSort;
// # sourceMappingURL=VisionFetterSort.js.map
