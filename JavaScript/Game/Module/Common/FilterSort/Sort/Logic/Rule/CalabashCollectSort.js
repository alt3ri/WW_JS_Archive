"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashCollectSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class CalabashCollectSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.VLt = (e, t, r) => {
        (e = e.DevelopRewardData.MonsterId),
          (e =
            ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterRarity(e)),
          (t = t.DevelopRewardData.MonsterId),
          (t =
            ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterRarity(t));
        return e !== t ? (e - t) * (r ? -1 : 1) : 0;
      }),
      (this.jLt = (e, t, r) => {
        (e = e.DevelopRewardData.SortId), (t = t.DevelopRewardData.SortId);
        return e !== t ? (e - t) * (r ? -1 : 1) : 0;
      }),
      (this.WLt = (e, t, r) => {
        (e = e.DevelopRewardData.MonsterId),
          (t = t.DevelopRewardData.MonsterId);
        return e !== t ? (e - t) * (r ? -1 : 1) : 0;
      }),
      (this.KLt = (e, t, r) => {
        (e = e.DevelopRewardData.MonsterId),
          (t = t.DevelopRewardData.MonsterId),
          (e =
            ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardExpByMonsterId(
              e,
            )),
          (t =
            ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardExpByMonsterId(
              t,
            ));
        return e !== t ? (e - t) * (r ? 1 : -1) : 0;
      }),
      (this.QLt = (e, t, r) => {
        (e = e.DevelopRewardData.MonsterId),
          (t = t.DevelopRewardData.MonsterId),
          (e =
            ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
              e,
            )?.length ?? 0),
          (t =
            ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
              t,
            )?.length ?? 0);
        return e !== t ? (e - t) * (r ? 1 : -1) : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.VLt),
      this.SortMap.set(2, this.jLt),
      this.SortMap.set(3, this.WLt),
      this.SortMap.set(4, this.KLt),
      this.SortMap.set(5, this.QLt);
  }
}
exports.CalabashCollectSort = CalabashCollectSort;
// # sourceMappingURL=CalabashCollectSort.js.map
