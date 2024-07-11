"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomSort = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonItemData_1 = require("../../../../../Inventory/ItemData/CommonItemData");
const PhantomItemData_1 = require("../../../../../Inventory/ItemData/PhantomItemData");
const ItemViewData_1 = require("../../../../../Inventory/ItemViewData");
const CommonSort_1 = require("./CommonSort");
class PhantomSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.ZLt = (t, i, s) => {
        let e, h, a;
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
      (this.iDt = (t, i, s) => {
        const e = t;
        const h = i;
        var t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
            e.GetUniqueId(),
          );
        var i =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(
            h.GetUniqueId(),
          );
        let a = 0;
        let n = 0;
        if (t) a = t.GetExp();
        else {
          const r =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
          const o = r.length;
          for (let t = 0; t < o; t++)
            if (r[t].ItemId === e.GetConfigId()) {
              a = r[t].Exp;
              break;
            }
        }
        if (i) n = t.GetExp();
        else {
          const m =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
          const _ = m.length;
          for (let t = 0; t < _; t++)
            if (m[t].ItemId === h.GetConfigId()) {
              n = m[t].Exp;
              break;
            }
        }
        return a !== n ? (n - a) * (s ? -1 : 1) : 0;
      }),
      (this.oDt = (t, i, s) => {
        const e = t;
        const h = i;
        const a =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
        const n = a.length;
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
      (this.rDt = (t, i, s) => {
        let e, h, a;
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
            (e = a?.length > 0 ? 1 : 0) != (a = h?.length > 0 ? 1 : 0)
              ? (a - e) * (s ? -1 : 1)
              : 0)
          : (h = t.IsBreach ? 1 : 0) != (a = i.IsBreach ? 1 : 0)
            ? (a - h) * (s ? -1 : 1)
            : 0;
      }),
      (this.VLt = (t, i, s) => {
        let e, h, a;
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
      (this.WLt = (t, i, s) => {
        let e, h, a;
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
      (this.eDt = (t, i, s) => {
        let e, h, a;
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
      (this.nDt = (i, s, e = !1) => {
        const h = i.length;
        for (let t = 0; t < h; t++)
          if (i[t].PhantomPropId === s) {
            if (e && i[t].IfPercentage) return i[t].Value;
            if (!e && !i[t].IfPercentage) return i[t].Value;
          }
        return 0;
      }),
      (this.sDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 10002)),
          (i = this.nDt(i.MainPropMap, 10002));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.aDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 10002, !0)),
          (i = this.nDt(i.MainPropMap, 10002, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.hDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 10007)),
          (i = this.nDt(i.MainPropMap, 10007));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.lDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 10007, !0)),
          (i = this.nDt(i.MainPropMap, 10007, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this._Dt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 10010)),
          (i = this.nDt(i.MainPropMap, 10010));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.uDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 10010, !0)),
          (i = this.nDt(i.MainPropMap, 10010, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.cDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 8)), (i = this.nDt(i.MainPropMap, 8));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.mDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 9)), (i = this.nDt(i.MainPropMap, 9));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.dDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 35)), (i = this.nDt(i.MainPropMap, 35));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.CDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 21)), (i = this.nDt(i.MainPropMap, 21));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.gDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 22)), (i = this.nDt(i.MainPropMap, 22));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.fDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 23)), (i = this.nDt(i.MainPropMap, 23));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.pDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 24)), (i = this.nDt(i.MainPropMap, 24));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.vDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 25)), (i = this.nDt(i.MainPropMap, 25));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.MDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 26)), (i = this.nDt(i.MainPropMap, 26));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.SDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 27)), (i = this.nDt(i.MainPropMap, 27));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.EDt = (t, i, s) => {
        (t = this.nDt(t.MainPropMap, 11)), (i = this.nDt(i.MainPropMap, 11));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.yDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 1)), (i = this.nDt(i.SubPropMap, 1));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.IDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 4, !0)),
          (i = this.nDt(i.SubPropMap, 4, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.TDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 2)), (i = this.nDt(i.SubPropMap, 2));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.LDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 5, !0)),
          (i = this.nDt(i.SubPropMap, 5, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.DDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 3)), (i = this.nDt(i.SubPropMap, 3));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.RDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 6, !0)),
          (i = this.nDt(i.SubPropMap, 6, !0));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.UDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 14)), (i = this.nDt(i.SubPropMap, 14));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.ADt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 15)), (i = this.nDt(i.SubPropMap, 15));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.PDt = (t, i, s) => 0),
      (this.xDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 7)), (i = this.nDt(i.SubPropMap, 7));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.wDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 8)), (i = this.nDt(i.SubPropMap, 8));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.BDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 9)), (i = this.nDt(i.SubPropMap, 9));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.bDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 10)), (i = this.nDt(i.SubPropMap, 10));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.qDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 11)), (i = this.nDt(i.SubPropMap, 11));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.GDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 12)), (i = this.nDt(i.SubPropMap, 12));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.NDt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 13)), (i = this.nDt(i.SubPropMap, 13));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.ODt = (t, i, s) => {
        (t = this.nDt(t.SubPropMap, 16)), (i = this.nDt(i.MainPropMap, 16));
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      }),
      (this.kDt = (t, i, s) => {
        if (
          (t instanceof ItemViewData_1.ItemViewData &&
            i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
        ) {
          var e = t.GetUniqueId();
          var h = i.GetUniqueId();
          var e =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              e,
            );
          var h =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              h,
            );
          const a = e.GetEquipRoleId() > 0 ? 1 : 0;
          const n = h.GetEquipRoleId() > 0 ? 1 : 0;
          if (a != n) return (a - n) * (s ? -1 : 1);
        }
        const a = t.Role > 0 ? 1 : 0;
        const n = i.Role > 0 ? 1 : 0;
        return a !== n ? (a - n) * (s ? -1 : 1) : 0;
      }),
      (this.FDt = (t, i, s, e) => {
        if (e <= 0) return 0;
        if (
          (t instanceof ItemViewData_1.ItemViewData &&
            i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
        ) {
          var h = t.GetUniqueId();
          var a = i.GetUniqueId();
          var h =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              h,
            );
          var a =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              a,
            );
          const n = h.GetEquipRoleId() === e ? 1 : 0;
          const r = a.GetEquipRoleId() === e ? 1 : 0;
          if ((n == 1 || r == 1) && n != r) return -1 * (n - r);
        }
        const n = t.Role === e ? 1 : 0;
        const r = i.Role === e ? 1 : 0;
        return (n !== 1 && r !== 1) || n === r ? 0 : -1 * (n - r);
      }),
      (this.VDt = (t, i, s) => {
        if (
          (t instanceof ItemViewData_1.ItemViewData &&
            i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
        ) {
          var e = t.GetUniqueId();
          var h = i.GetUniqueId();
          var e =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              e,
            );
          var h =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              h,
            );
          const a = e.GetIfLock() ? 1 : 0;
          const n = h.GetIfLock() ? 1 : 0;
          if (a != n) return a - n;
        }
        const a = t.IsLock ? 1 : 0;
        const n = i.IsLock ? 1 : 0;
        return a !== n ? -1 * (a - n) : 0;
      }),
      (this.HDt = (t, i, s) => {
        if (
          (t instanceof ItemViewData_1.ItemViewData &&
            i instanceof ItemViewData_1.ItemViewData) ||
          (t instanceof PhantomItemData_1.PhantomItemData &&
            i instanceof PhantomItemData_1.PhantomItemData)
        ) {
          var e = t.GetUniqueId();
          var h = i.GetUniqueId();
          var e =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              e,
            );
          var h =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              h,
            );
          const a = e.GetConfig().Rarity;
          const n = h.GetConfig().Rarity;
          if (a !== n) return (a - n) * (s ? 1 : -1);
        }
        const a = t.Rarity;
        const n = i.Rarity;
        return a !== n ? (a - n) * (s ? 1 : -1) : 0;
      }),
      (this.QLt = (t, i, s) => {
        (t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
            t.MonsterId,
          )?.length ?? 0),
          (i =
            ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(
              i.MonsterId,
            )?.length ?? 0);
        return t !== i ? (i - t) * (s ? -1 : 1) : 0;
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.ZLt),
      this.SortMap.set(2, this.rDt),
      this.SortMap.set(3, this.VLt),
      this.SortMap.set(4, this.WLt),
      this.SortMap.set(5, this.eDt),
      this.SortMap.set(8, this.hDt),
      this.SortMap.set(9, this.lDt),
      this.SortMap.set(6, this.sDt),
      this.SortMap.set(7, this.aDt),
      this.SortMap.set(10, this._Dt),
      this.SortMap.set(11, this.uDt),
      this.SortMap.set(12, this.cDt),
      this.SortMap.set(13, this.mDt),
      this.SortMap.set(14, this.dDt),
      this.SortMap.set(15, this.CDt),
      this.SortMap.set(16, this.gDt),
      this.SortMap.set(17, this.fDt),
      this.SortMap.set(18, this.pDt),
      this.SortMap.set(19, this.vDt),
      this.SortMap.set(20, this.MDt),
      this.SortMap.set(21, this.SDt),
      this.SortMap.set(22, this.EDt),
      this.SortMap.set(25, this.TDt),
      this.SortMap.set(26, this.LDt),
      this.SortMap.set(23, this.yDt),
      this.SortMap.set(24, this.IDt),
      this.SortMap.set(27, this.DDt),
      this.SortMap.set(28, this.RDt),
      this.SortMap.set(29, this.UDt),
      this.SortMap.set(30, this.ADt),
      this.SortMap.set(31, this.PDt),
      this.SortMap.set(32, this.xDt),
      this.SortMap.set(33, this.wDt),
      this.SortMap.set(34, this.BDt),
      this.SortMap.set(35, this.bDt),
      this.SortMap.set(36, this.qDt),
      this.SortMap.set(37, this.GDt),
      this.SortMap.set(38, this.NDt),
      this.SortMap.set(39, this.ODt),
      this.SortMap.set(40, this.iDt),
      this.SortMap.set(41, this.oDt),
      this.SortMap.set(42, this.kDt),
      this.SortMap.set(43, this.FDt),
      this.SortMap.set(44, this.VDt),
      this.SortMap.set(45, this.HDt),
      this.SortMap.set(46, this.QLt);
  }
}
exports.PhantomSort = PhantomSort;
// # sourceMappingURL=PhantomSort.js.map
