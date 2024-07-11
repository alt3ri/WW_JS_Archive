"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class WeaponSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.ZLt = (t, e, r) => {
        var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
          t.GetUniqueId(),
        );
        var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
          e.GetUniqueId(),
        );
        let i = t ? t.GetLevel() : 0;
        let s = e ? e.GetLevel() : 0;
        return i !== s
          ? (s - i) * (r ? -1 : 1)
          : (s = t ? t.GetResonanceLevel() : 0) !==
              (i = e ? e.GetResonanceLevel() : 0)
            ? (i - s) * (r ? -1 : 1)
            : void 0;
      }),
      (this.nRt = (t, e, r) => {
        (t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
          t.GetUniqueId(),
        )),
          (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            e.GetUniqueId(),
          )),
          (t = t ? t.GetBreachLevel() : 0),
          (e = e ? e.GetBreachLevel() : 0);
        if (t !== e) return (e - t) * (r ? -1 : 1);
      }),
      (this.sRt = (t, e, r) => {
        (t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
          t.GetUniqueId(),
        )),
          (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            e.GetUniqueId(),
          )),
          (t = t ? t.GetResonanceLevel() : 0),
          (e = e ? e.GetResonanceLevel() : 0);
        if (t !== e) return (e - t) * (r ? -1 : 1);
      }),
      (this.VLt = (t, e, r) => {
        if (t.GetQuality() !== e.GetQuality())
          return (e.GetQuality() - t.GetQuality()) * (r ? -1 : 1);
      }),
      (this.VDt = (t, e, r) => {
        if (t.GetIsLock() !== e.GetIsLock())
          return -1 * ((t.GetIsLock() ? 1 : 0) - (e.GetIsLock() ? 1 : 0));
      }),
      (this.iDt = (t, e, r) => {
        (t = ModelManager_1.ModelManager.WeaponModel.GetWeaponItemBaseExp(t)),
          (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponItemBaseExp(e));
        if (t !== e) return (e - t) * (r ? -1 : 1);
      }),
      (this.eDt = (t, e, r) => {
        return (e.GetUniqueId() - t.GetUniqueId()) * (r ? -1 : 1);
      }),
      (this.kLt = (t, e, r) => {
        return (e.GetConfigId() - t.GetConfigId()) * (r ? -1 : 1);
      }),
      (this.oDt = (t, e, r) => {
        (t = t.GetType() === 4), (e = e.GetType() === 4);
        if (t != e) return (e ? 1 : 0) - (t ? 1 : 0);
      }),
      (this.aRt = (t, e, r) => {
        (t = this.hRt(t)), (e = this.hRt(e));
        return void 0 !== t && void 0 !== e && t !== e ? t - e : void 0;
      }),
      (this.lRt = (t, e, r) => {
        (t = t.GetType() === 2), (e = e.GetType() === 2);
        if (t != e) return (e ? 1 : 0) - (t ? 1 : 0);
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.ZLt),
      this.SortMap.set(2, this.VLt),
      this.SortMap.set(3, this.VDt),
      this.SortMap.set(4, this.iDt),
      this.SortMap.set(5, this.eDt),
      this.SortMap.set(6, this.nRt),
      this.SortMap.set(7, this.sRt),
      this.SortMap.set(8, this.kLt),
      this.SortMap.set(9, this.oDt),
      this.SortMap.set(10, this.aRt),
      this.SortMap.set(11, this.lRt);
  }
  hRt(t) {
    let e;
    if (t)
      return (e = t.GetType()) === 4
        ? 2
        : e === 2
          ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
              t.GetUniqueId(),
            )?.HasWeaponCultivated()
            ? 3
            : 1
          : void 0;
  }
}
exports.WeaponSort = WeaponSort;
// # sourceMappingURL=WeaponSort.js.map
