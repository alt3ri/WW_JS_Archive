"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomSort = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonItemData_1 = require("../../../../../Inventory/ItemData/CommonItemData"),
  PhantomItemData_1 = require("../../../../../Inventory/ItemData/PhantomItemData"),
  ItemViewData_1 = require("../../../../../Inventory/ItemViewData"),
  CommonSort_1 = require("./CommonSort");
class PhantomSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.oRt = (t, i, s) => {
        var e, h, a;
        return (t instanceof ItemViewData_1.ItemViewData &&
          i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
          ? ((a = ModelManager_1.ModelManager.PhantomBattleModel),
            (h = t.GetUniqueId()),
            (e = i.GetUniqueId()),
            (h = a.GetPhantomBattleData(h)),
            (a = a.GetPhantomBattleData(e)),
            h.GetPhantomLevel() !== a.GetPhantomLevel()
              ? (a.GetPhantomLevel() - h.GetPhantomLevel()) * (s ? -1 : 1)
              : 0)
          : t.Level !== i.Level
            ? (i.Level - t.Level) * (s ? -1 : 1)
            : 0;
      }),
      (this.sRt = (t, i, s) => {
        var e = t,
          h = i,
          t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
            e.GetUniqueId(),
          ),
          i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
            h.GetUniqueId(),
          );
        let a = 0,
          n = 0;
        if (t) a = t.GetExp();
        else {
          var r =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList(),
            o = r.length;
          for (let t = 0; t < o; t++)
            if (r[t].ItemId === e.GetConfigId()) {
              a = r[t].Exp;
              break;
            }
        }
        if (i) n = t.GetExp();
        else {
          var m =
              ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList(),
            _ = m.length;
          for (let t = 0; t < _; t++)
            if (m[t].ItemId === h.GetConfigId()) {
              n = m[t].Exp;
              break;
            }
        }
        return a !== n ? (n - a) * (s ? -1 : 1) : 0;
      }),
      (this.aRt = (t, i, s) => {
        var e = t,
          h = i,
          a =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList(),
          n = a.length;
        let r = !1;
        for (let t = 0; t < n; t++)
          if (a[t].ItemId === e.GetConfigId()) {
            r = !0;
            break;
          }
        let o = !1;
        for (let t = 0; t < n; t++)
          if (a[t].ItemId === h.GetConfigId()) {
            o = !0;
            break;
          }
        return r !== o ? ((t = r ? 1 : 0), (o ? 1 : 0) - t) : 0;
      }),
      (this.hRt = (t, i, s) => {
        var e, h, a;
        return (t instanceof ItemViewData_1.ItemViewData &&
          i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
          ? ((e = ModelManager_1.ModelManager.PhantomBattleModel),
            (h = t.GetUniqueId()),
            (a = i.GetUniqueId()),
            (h = e.GetPhantomBattleData(h)),
            (e = e.GetPhantomBattleData(a)),
            (a = h.GetPhantomSubProp()),
            (h = e.GetPhantomSubProp()),
            (e = 0 < a?.length ? 1 : 0) != (a = 0 < h?.length ? 1 : 0)
              ? (a - e) * (s ? -1 : 1)
              : 0)
          : (h = t.IsBreach ? 1 : 0) != (a = i.IsBreach ? 1 : 0)
            ? (a - h) * (s ? -1 : 1)
            : 0;
      }),
      (this.KDt = (t, i, s) => {
        var e, h, a;
        return t instanceof CommonItemData_1.CommonItemData &&
          i instanceof CommonItemData_1.CommonItemData
          ? (i.GetQuality() - t.GetQuality()) * (s ? -1 : 1)
          : (t instanceof ItemViewData_1.ItemViewData &&
                i instanceof ItemViewData_1.ItemViewData) ||
              (t instanceof PhantomItemData_1.PhantomItemData &&
                i instanceof PhantomItemData_1.PhantomItemData)
            ? ((a = ModelManager_1.ModelManager.PhantomBattleModel),
              (h = t.GetUniqueId()),
              (e = i.GetUniqueId()),
              (h = a.GetPhantomBattleData(h)),
              (a = a.GetPhantomBattleData(e)),
              h.GetQuality() !== a.GetQuality()
                ? (a.GetQuality() - h.GetQuality()) * (s ? -1 : 1)
                : 0)
            : t.Quality !== i.Quality
              ? (i.Quality - t.Quality) * (s ? -1 : 1)
              : 0;
      }),
      (this.$Dt = (t, i, s) => {
        var e, h, a;
        return (t instanceof ItemViewData_1.ItemViewData &&
          i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
          ? ((a = ModelManager_1.ModelManager.PhantomBattleModel),
            (h = t.GetUniqueId()),
            (e = i.GetUniqueId()),
            (h = a.GetPhantomBattleData(h)),
            (a = a.GetPhantomBattleData(e)),
            h.GetConfigId() !== a.GetConfigId()
              ? (a.GetConfigId() - h.GetConfigId()) * (s ? -1 : 1)
              : 0)
          : t.MonsterId !== i.MonsterId
            ? (i.MonsterId - t.MonsterId) * (s ? -1 : 1)
            : 0;
      }),
      (this.rRt = (t, i, s) => {
        var e, h, a;
        return (t instanceof ItemViewData_1.ItemViewData &&
          i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
          ? ((a = ModelManager_1.ModelManager.PhantomBattleModel),
            (h = t.GetUniqueId()),
            (e = i.GetUniqueId()),
            (h = a.GetPhantomBattleData(h)),
            (a = a.GetPhantomBattleData(e)),
            h.GetUniqueId() !== a.GetUniqueId()
              ? (a.GetUniqueId() - h.GetUniqueId()) * (s ? -1 : 1)
              : 0)
          : t.Id !== i.Id
            ? (i.Id - t.Id) * (s ? -1 : 1)
            : 0;
      }),
      (this.lRt = (i, s, e = !1) => {
        var h = i.length;
        for (let t = 0; t < h; t++)
          if (i[t].PhantomPropId === s) {
            if (e && i[t].IfPercentage) return i[t].Value;
            if (!e && !i[t].IfPercentage) return i[t].Value;
          }
        return 0;
      }),
      (this._Rt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 10002)),
          (i = this.lRt(i.MainPropMap, 10002));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.uRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 10002, !0)),
          (i = this.lRt(i.MainPropMap, 10002, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.cRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 10007)),
          (i = this.lRt(i.MainPropMap, 10007));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.mRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 10007, !0)),
          (i = this.lRt(i.MainPropMap, 10007, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.dRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 10010)),
          (i = this.lRt(i.MainPropMap, 10010));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.CRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 10010, !0)),
          (i = this.lRt(i.MainPropMap, 10010, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.gRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 8)), (i = this.lRt(i.MainPropMap, 8));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.fRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 9)), (i = this.lRt(i.MainPropMap, 9));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.pRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 35)), (i = this.lRt(i.MainPropMap, 35));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.vRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 21)), (i = this.lRt(i.MainPropMap, 21));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.MRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 22)), (i = this.lRt(i.MainPropMap, 22));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.ERt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 23)), (i = this.lRt(i.MainPropMap, 23));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.SRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 24)), (i = this.lRt(i.MainPropMap, 24));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.yRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 25)), (i = this.lRt(i.MainPropMap, 25));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.IRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 26)), (i = this.lRt(i.MainPropMap, 26));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.TRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 27)), (i = this.lRt(i.MainPropMap, 27));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.LRt = (t, i, s) => {
        (t = this.lRt(t.MainPropMap, 11)), (i = this.lRt(i.MainPropMap, 11));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.DRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 1)), (i = this.lRt(i.SubPropMap, 1));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.RRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 4, !0)),
          (i = this.lRt(i.SubPropMap, 4, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.URt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 2)), (i = this.lRt(i.SubPropMap, 2));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.ARt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 5, !0)),
          (i = this.lRt(i.SubPropMap, 5, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.PRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 3)), (i = this.lRt(i.SubPropMap, 3));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.xRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 6, !0)),
          (i = this.lRt(i.SubPropMap, 6, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.wRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 14)), (i = this.lRt(i.SubPropMap, 14));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.BRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 15)), (i = this.lRt(i.SubPropMap, 15));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.bRt = (t, i, s) => 0),
      (this.kRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 11)), (i = this.lRt(i.SubPropMap, 11));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.FRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 12)), (i = this.lRt(i.SubPropMap, 12));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.VRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 13)), (i = this.lRt(i.SubPropMap, 13));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.HRt = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 16)), (i = this.lRt(i.MainPropMap, 16));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.jRt = (t, i, s) => {
        if (
          (t instanceof ItemViewData_1.ItemViewData &&
            i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
        ) {
          var e = t.GetUniqueId(),
            h = i.GetUniqueId(),
            e =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                e,
              ),
            h =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                h,
              );
          const a = 0 < e.GetEquipRoleId() ? 1 : 0,
            n = 0 < h.GetEquipRoleId() ? 1 : 0;
          if (a != n) return (a - n) * (s ? -1 : 1);
        }
        const a = 0 < t.Role ? 1 : 0,
          n = 0 < i.Role ? 1 : 0;
        return a !== n ? (a - n) * (s ? -1 : 1) : 0;
      }),
      (this.WRt = (t, i, s, e) => {
        if (e <= 0) return 0;
        if (
          (t instanceof ItemViewData_1.ItemViewData &&
            i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
        ) {
          var h = t.GetUniqueId(),
            a = i.GetUniqueId(),
            h =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                h,
              ),
            a =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                a,
              );
          const n = h.GetEquipRoleId() === e ? 1 : 0,
            r = a.GetEquipRoleId() === e ? 1 : 0;
          if ((1 == n || 1 == r) && n != r) return -1 * (n - r);
        }
        const n = t.Role === e ? 1 : 0,
          r = i.Role === e ? 1 : 0;
        return (1 !== n && 1 !== r) || n === r ? 0 : -1 * (n - r);
      }),
      (this.KRt = (t, i, s) => {
        if (
          (t instanceof ItemViewData_1.ItemViewData &&
            i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
        ) {
          var e = t.GetUniqueId(),
            h = i.GetUniqueId(),
            e =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                e,
              ),
            h =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                h,
              );
          const a = e.GetIfLock() ? 1 : 0,
            n = h.GetIfLock() ? 1 : 0;
          if (a != n) return a - n;
        }
        const a = t.IsLock ? 1 : 0,
          n = i.IsLock ? 1 : 0;
        return a !== n ? -1 * (a - n) : 0;
      }),
      (this.QRt = (t, i, s) => {
        if (
          (t instanceof ItemViewData_1.ItemViewData &&
            i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
        ) {
          var e = t.GetUniqueId(),
            h = i.GetUniqueId(),
            e =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                e,
              ),
            h =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                h,
              );
          const a = e.GetConfig().Rarity,
            n = h.GetConfig().Rarity;
          if (a !== n) return (a - n) * (s ? 1 : -1);
        }
        const a = t.Rarity,
          n = i.Rarity;
        return a !== n ? (a - n) * (s ? 1 : -1) : 0;
      }),
      (this.JDt = (t, i, s) => {
        (t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
            t.MonsterId,
          )?.length ?? 0),
          (i =
            ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
              i.MonsterId,
            )?.length ?? 0);
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.hVs = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 7)), (i = this.lRt(i.SubPropMap, 7));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.lVs = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 8)), (i = this.lRt(i.SubPropMap, 8));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this._Vs = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 9)), (i = this.lRt(i.SubPropMap, 9));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.uVs = (t, i, s) => {
        (t = this.lRt(t.SubPropMap, 10)), (i = this.lRt(i.SubPropMap, 10));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.oRt),
      this.SortMap.set(2, this.hRt),
      this.SortMap.set(3, this.KDt),
      this.SortMap.set(4, this.$Dt),
      this.SortMap.set(5, this.rRt),
      this.SortMap.set(8, this.cRt),
      this.SortMap.set(9, this.mRt),
      this.SortMap.set(6, this._Rt),
      this.SortMap.set(7, this.uRt),
      this.SortMap.set(10, this.dRt),
      this.SortMap.set(11, this.CRt),
      this.SortMap.set(12, this.gRt),
      this.SortMap.set(13, this.fRt),
      this.SortMap.set(14, this.pRt),
      this.SortMap.set(15, this.vRt),
      this.SortMap.set(16, this.MRt),
      this.SortMap.set(17, this.ERt),
      this.SortMap.set(18, this.SRt),
      this.SortMap.set(19, this.yRt),
      this.SortMap.set(20, this.IRt),
      this.SortMap.set(21, this.TRt),
      this.SortMap.set(22, this.LRt),
      this.SortMap.set(25, this.URt),
      this.SortMap.set(26, this.ARt),
      this.SortMap.set(23, this.DRt),
      this.SortMap.set(24, this.RRt),
      this.SortMap.set(27, this.PRt),
      this.SortMap.set(28, this.xRt),
      this.SortMap.set(29, this.wRt),
      this.SortMap.set(30, this.BRt),
      this.SortMap.set(31, this.bRt),
      this.SortMap.set(36, this.kRt),
      this.SortMap.set(37, this.FRt),
      this.SortMap.set(38, this.VRt),
      this.SortMap.set(39, this.HRt),
      this.SortMap.set(40, this.sRt),
      this.SortMap.set(41, this.aRt),
      this.SortMap.set(42, this.jRt),
      this.SortMap.set(43, this.WRt),
      this.SortMap.set(44, this.KRt),
      this.SortMap.set(45, this.QRt),
      this.SortMap.set(46, this.JDt),
      this.SortMap.set(47, this.hVs),
      this.SortMap.set(48, this.lVs),
      this.SortMap.set(49, this._Vs),
      this.SortMap.set(50, this.uVs);
  }
}
exports.PhantomSort = PhantomSort;
//# sourceMappingURL=PhantomSort.js.map
