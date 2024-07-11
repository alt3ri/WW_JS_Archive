"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonSort_1 = require("./CommonSort");
class WeaponSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.oRt = (t, e, r) => {
        var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            t.GetUniqueId(),
          ),
          e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            e.GetUniqueId(),
          ),
          i = t ? t.GetLevel() : 0,
          s = e ? e.GetLevel() : 0;
        return i !== s
          ? (s - i) * (r ? -1 : 1)
          : (s = t ? t.GetResonanceLevel() : 0) !==
              (i = e ? e.GetResonanceLevel() : 0)
            ? (i - s) * (r ? -1 : 1)
            : void 0;
      }),
      (this.lUt = (t, e, r) => {
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
      (this._Ut = (t, e, r) => {
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
      (this.KDt = (t, e, r) => {
        if (t.GetQuality() !== e.GetQuality())
          return (e.GetQuality() - t.GetQuality()) * (r ? -1 : 1);
      }),
      (this.KRt = (t, e, r) => {
        if (t.GetIsLock() !== e.GetIsLock())
          return -1 * ((t.GetIsLock() ? 1 : 0) - (e.GetIsLock() ? 1 : 0));
      }),
      (this.sRt = (t, e, r) => {
        (t = ModelManager_1.ModelManager.WeaponModel.GetWeaponItemBaseExp(t)),
          (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponItemBaseExp(e));
        if (t !== e) return (e - t) * (r ? -1 : 1);
      }),
      (this.rRt = (t, e, r) => {
        return (e.GetUniqueId() - t.GetUniqueId()) * (r ? -1 : 1);
      }),
      (this.jDt = (t, e, r) => {
        return (e.GetConfigId() - t.GetConfigId()) * (r ? -1 : 1);
      }),
      (this.aRt = (t, e, r) => {
        (t = 4 === t.GetType()), (e = 4 === e.GetType());
        if (t != e) return (e ? 1 : 0) - (t ? 1 : 0);
      }),
      (this.uUt = (t, e, r) => {
        (t = this.cUt(t)), (e = this.cUt(e));
        return void 0 !== t && void 0 !== e && t !== e ? t - e : void 0;
      }),
      (this.mUt = (t, e, r) => {
        (t = 2 === t.GetType()), (e = 2 === e.GetType());
        if (t != e) return (e ? 1 : 0) - (t ? 1 : 0);
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.oRt),
      this.SortMap.set(2, this.KDt),
      this.SortMap.set(3, this.KRt),
      this.SortMap.set(4, this.sRt),
      this.SortMap.set(5, this.rRt),
      this.SortMap.set(6, this.lUt),
      this.SortMap.set(7, this._Ut),
      this.SortMap.set(8, this.jDt),
      this.SortMap.set(9, this.aRt),
      this.SortMap.set(10, this.uUt),
      this.SortMap.set(11, this.mUt);
  }
  cUt(t) {
    var e;
    if (t)
      return 4 === (e = t.GetType())
        ? 2
        : 2 === e
          ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
              t.GetUniqueId(),
            )?.HasWeaponCultivated()
            ? 3
            : 1
          : void 0;
  }
}
exports.WeaponSort = WeaponSort;
//# sourceMappingURL=WeaponSort.js.map
