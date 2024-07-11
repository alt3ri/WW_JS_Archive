"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookRewardPopData = exports.CookModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
const CookController_1 = require("./CookController");
class CookModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Wbt = -1),
      (this.LastExp = 0),
      (this.CurrentInteractCreatureDataLongId = void 0),
      (this.Kbt = 0),
      (this.Qbt = 0),
      (this.Xbt = void 0),
      (this.$bt = new Map()),
      (this.Ybt = void 0),
      (this.Jbt = (t, e) => {
        const i = t.IsUnLock ? 1 : 0;
        const o = e.IsUnLock ? 1 : 0;
        return i == 1 && i == o
          ? t.IsMachining === e.IsMachining
            ? t.Quality === e.Quality
              ? t.ItemId - e.ItemId
              : t.Quality - e.Quality
            : e.IsMachining - t.IsMachining
          : i == 0 && i == o
            ? t.Quality === e.Quality
              ? t.ItemId - e.ItemId
              : t.Quality - e.Quality
            : o - i;
      }),
      (this.zbt = 0),
      (this.Zbt = void 0),
      (this.eqt = void 0),
      (this.tqt = void 0),
      (this.iqt = void 0),
      (this.oqt = void 0),
      (this.rqt = void 0),
      (this.nqt = void 0),
      (this.sqt = (t, e) =>
        t.IsBuff === e.IsBuff ? t.RoleId - e.RoleId : t.IsBuff ? -1 : 1),
      (this.aqt = 0),
      (this.E0 = void 0),
      (this.hqt = void 0);
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.ClearCookRoleItemDataList(), !0;
  }
  set CurrentCookViewType(t) {
    this.Kbt = t;
  }
  get CurrentCookViewType() {
    return this.Kbt;
  }
  set CurrentCookListType(t) {
    this.Qbt = t;
  }
  get CurrentCookListType() {
    return this.Qbt;
  }
  SaveLimitRefreshTime(t) {
    this.Wbt =
      MathUtils_1.MathUtils.LongToNumber(t) * TimeUtil_1.TimeUtil.Millisecond;
  }
  CheckCanCook(t) {
    return (
      this.CheckLimitCount(t) &&
      this.CheckCoinEnough(t) &&
      this.CheckMaterialEnough(t)
    );
  }
  CheckLimitCount(t) {
    t = this.GetCookingDataById(t);
    return t.LimitTotalCount <= 0 || t.CookCount < t.LimitTotalCount;
  }
  CheckCoinEnough(t) {
    t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t);
    return ModelManager_1.ModelManager.InventoryModel.CheckIsCoinEnough(
      CookController_1.CookController.CookCoinId,
      t.ConsumeItems,
    );
  }
  CheckMaterialEnough(t) {
    for (const i of ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
      t,
    ).ConsumeItems) {
      const e =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          i.ItemId,
        );
      if (i.Count > e) return !1;
    }
    return !0;
  }
  CheckHasItemTimeoutStateChangedCore() {
    let t;
    let e;
    let i;
    let o;
    let r;
    let s;
    const n = this.Xbt;
    const a = this.$bt;
    for ([t, e] of a) a.set(t, e - 1);
    let h = !1;
    for (const l of n)
      l.ExistStartTime !== 0 &&
        l.ExistEndTime !== 0 &&
        ((i = l.ItemId),
        (o = TimeUtil_1.TimeUtil.IsInTimeSpan(l.ExistStartTime, l.ExistEndTime)
          ? 1
          : 3),
        (a.has(i) && a.get(i) === o - 1) || (h = !0),
        a.set(i, o));
    for ([r, s] of a) (s !== 0 && s !== 2) || a.delete(r);
    return h;
  }
  CreateCookingDataList(t) {
    this.Xbt || (this.Xbt = new Array()), (this.Xbt.length = 0);
    const e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormula() ?? [];
    const i = new Map();
    for (const a of e) {
      const o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
        a.FoodItemId,
      );
      const r = {
        MainType: 0,
        SubType: 6e4,
        UniqueId: 0,
        ItemId: a.Id,
        CookCount: 0,
        IsNew: !1,
        LastRoleId: void 0,
        IsCook: 0,
        Quality: o.QualityId,
        EffectType: a.TypeId,
        DataId: a.FoodItemId,
        LimitTotalCount: 0,
        LimitedCount: 0,
        ExistStartTime: 0,
        ExistEndTime: 0,
        IsUnLock: !1,
      };
      i.set(r.ItemId, r), this.Xbt.push(r);
    }
    let r = void 0;
    for (const h of t) {
      const s = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
        h.Ekn,
      );
      const n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
        s.FoodItemId,
      );
      i.has(h.Ekn)
        ? (((r = i.get(h.Ekn)).CookCount = h.O4n),
          (r.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
            h.Ekn,
          )),
          (r.LastRoleId = h.NTs),
          (r.IsCook = 0),
          (r.LimitTotalCount = h.FTs),
          (r.LimitedCount = h.VTs),
          (r.DataId = s.FoodItemId),
          (r.ExistStartTime =
            MathUtils_1.MathUtils.LongToNumber(h.$Ts) *
            TimeUtil_1.TimeUtil.Millisecond),
          (r.ExistEndTime =
            MathUtils_1.MathUtils.LongToNumber(h.HTs) *
            TimeUtil_1.TimeUtil.Millisecond),
          (r.IsUnLock = !0))
        : ((r = {
            MainType: 0,
            SubType: 0,
            UniqueId: 0,
            ItemId: h.Ekn,
            CookCount: h.O4n,
            IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
              h.Ekn,
            ),
            LastRoleId: h.NTs,
            IsCook: 0,
            Quality: n.QualityId,
            EffectType: s.TypeId,
            DataId: s.FoodItemId,
            LimitTotalCount: h.FTs,
            LimitedCount: h.VTs,
            ExistStartTime:
              MathUtils_1.MathUtils.LongToNumber(h.$Ts) *
              TimeUtil_1.TimeUtil.Millisecond,
            ExistEndTime:
              MathUtils_1.MathUtils.LongToNumber(h.HTs) *
              TimeUtil_1.TimeUtil.Millisecond,
            IsUnLock: !0,
          }),
          this.Xbt.push(r)),
        (r.IsCook = this.CheckCanCook(h.Ekn) ? 1 : 0);
    }
  }
  UpdateCookingDataList(t) {
    this.Xbt || this.CreateCookingDataList(t);
    for (const i of t)
      for (const o of this.Xbt) {
        var e;
        i.Ekn === o.ItemId &&
          ((o.CookCount = i.O4n),
          (o.LimitedCount = i.VTs),
          o.IsUnLock ||
            ((e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
              i.Ekn,
            )),
            (o.IsNew = !0),
            (o.IsUnLock = !0),
            (o.DataId = e.FoodItemId),
            (o.ExistStartTime =
              MathUtils_1.MathUtils.LongToNumber(i.$Ts) *
              TimeUtil_1.TimeUtil.Millisecond),
            (o.ExistEndTime =
              MathUtils_1.MathUtils.LongToNumber(i.HTs) *
              TimeUtil_1.TimeUtil.Millisecond),
            ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
              i.Ekn,
            ),
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "FormulaLearned",
            )),
          (o.IsCook = this.CheckCanCook(i.Ekn) ? 1 : 0));
      }
  }
  UpdateCookingDataByServerConfig(t) {
    for (const r of t) {
      const e =
        MathUtils_1.MathUtils.LongToNumber(r.$Ts) *
        TimeUtil_1.TimeUtil.Millisecond;
      const i =
        MathUtils_1.MathUtils.LongToNumber(r.HTs) *
        TimeUtil_1.TimeUtil.Millisecond;
      const o = this.Xbt.findIndex((t) => t.ItemId === r.Ekn);
      o !== -1 &&
        ((this.Xbt[o].ExistStartTime = e), (this.Xbt[o].ExistEndTime = i));
    }
  }
  UnlockCookMenuData(t) {
    const e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t);
    let i = 0;
    for (
      ;
      i < this.Xbt.length &&
      (this.Xbt[i].SubType !== 6e4 || this.Xbt[i].ItemId !== e.FormulaItemId);
      i++
    );
    this.Xbt.splice(i, 1);
  }
  GetCookingDataList() {
    return this.Xbt;
  }
  GetCookingDataById(t) {
    for (const e of this.Xbt) if (t === e.ItemId) return e;
  }
  GetCookRoleId(t) {
    t = this.GetCookingDataById(t);
    return t?.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId() ?? 1502;
  }
  CreateMachiningDataList() {
    this.Ybt || (this.Ybt = new Array());
    for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessed()) {
      var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.FinalItemId);
      var t = {
        MainType: 1,
        ItemId: e.Id,
        IsUnLock: !1,
        InteractiveList: [],
        UnlockList: [],
        IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
          e.Id,
        ),
        IsMachining: CookController_1.CookController.CheckCanProcessed(e.Id)
          ? 1
          : 0,
        Quality: t.QualityId,
      };
      this.Ybt.push(t);
    }
    this.Ybt.sort(this.Jbt);
  }
  UpdateMachiningDataList(t, e) {
    for (const s of t)
      for (const n of this.Ybt)
        if (s.Ekn === n.ItemId) {
          let t = [];
          const i = [];
          const o =
            ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
              s.Ekn,
            );
          if (s.jTs) {
            for (const a of o.ConsumeItemsId) i.push(a.ItemId);
            t = o.InterationId;
          } else
            for (const h of (t = s.WTs)) {
              let r = o.InterationId.indexOf(h);
              r >= 0 && ((r = o.ConsumeItemsId[r].ItemId), i.push(r));
            }
          (n.IsUnLock = t.length === o.InterationId.length),
            (n.InteractiveList = t),
            (n.UnlockList = i),
            (n.IsMachining = CookController_1.CookController.CheckCanProcessed(
              s.Ekn,
            )
              ? 1
              : 0),
            e &&
              ((n.IsNew = e),
              ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
                LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
                s.Ekn,
              ),
              s.jTs) &&
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "FormulaLearned",
              );
          break;
        }
    this.Ybt.sort(this.Jbt);
  }
  GetMachiningDataList() {
    return this.Ybt;
  }
  GetMachiningDataById(t) {
    for (const e of this.Ybt) if (t === e.ItemId) return e;
  }
  set SelectedCookerLevel(t) {
    this.zbt = t;
  }
  get SelectedCookerLevel() {
    return this.zbt;
  }
  CreateCookerInfo(t) {
    this.UpdateCookerInfo(t), (this.Zbt = new Map());
    for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookLevel())
      this.Zbt.set(e.Id, e);
  }
  UpdateCookerInfo(t) {
    let e = 0;
    this.eqt &&
      ((this.LastExp = this.eqt.TotalProficiencys),
      (e = t.kTs - this.eqt.TotalProficiencys)),
      (this.eqt = { CookingLevel: t.OTs, TotalProficiencys: t.kTs, AddExp: e });
  }
  GetCookerInfo() {
    return this.eqt;
  }
  CleanAddExp() {
    this.eqt.AddExp = 0;
  }
  GetCookLevelByLevel(t) {
    return this.Zbt.get(t);
  }
  GetCookerMaxLevel() {
    return this.Zbt.size;
  }
  GetSumExpByLevel(t) {
    const e = this.GetCookerMaxLevel();
    let i = t + 1;
    return i > e && (i = e), this.GetCookLevelByLevel(i).Completeness;
  }
  GetDropIdByLevel(t) {
    t += 1;
    return this.GetCookerMaxLevel() < t
      ? -1
      : this.GetCookLevelByLevel(t).DropIds;
  }
  CreateTmpMachiningItemList(t) {
    this.tqt || (this.tqt = new Array()),
      (this.tqt.length = 0),
      this.iqt || (this.iqt = new Array()),
      (this.iqt.length = 0),
      this.oqt || (this.oqt = new Map()),
      this.oqt.clear(),
      (this.tqt.length = 0),
      (this.iqt.length = 0);
    for (const e of t) this.tqt.push(e), e.m3n || this.iqt.push(e);
  }
  UpdateTmpMachiningItemList(t, e) {
    this.tqt[t] = e;
  }
  SubOneTmpMachiningItemSelectNum(e) {
    if (this.tqt[e]) {
      e = this.tqt[e];
      if (this.oqt.has(e.G3n)) {
        var i = this.oqt.get(e.G3n) - 1;
        if ((this.oqt.set(e.G3n, i), !(i > 0))) {
          this.oqt.delete(e.G3n);
          const o = function (t, e) {
            (t.m3n = e.m3n), (t.G3n = e.G3n);
          };
          var i = { m3n: (e.m3n = !1), G3n: 0, k4n: 0 };
          o(i, e);
          let t = this.iqt.indexOf(e);
          for (; t < this.iqt.length - 1; t++) {
            const r = this.iqt[t + 1];
            o(this.iqt[t], r);
          }
          o(this.iqt[t], i);
        }
      }
    }
  }
  ClearTmpMachiningItemList() {
    (this.tqt.length = 0), (this.iqt.length = 0), this.oqt.clear();
  }
  SetEmptyBySelectedItem(t, e, i, o) {
    t = this.iqt[t];
    t && (i && ((t.G3n = i), o) && this.oqt.set(i, o), (t.m3n = e));
  }
  IsSelectNumFromEmpty(t) {
    let e = !1;
    let i = 0;
    return this.oqt.has(t) && ((e = !0), (i = this.oqt.get(t))), [e, i];
  }
  CheckCanProcessedNew(t) {
    if (this.oqt.size === 0)
      return CookController_1.CookController.CheckCanProcessed(t);
    let e = !0;
    for (const o of this.tqt)
      if (this.oqt.has(o.G3n)) {
        const i = this.oqt.get(o.G3n);
        if (o.k4n > i) {
          e = !1;
          break;
        }
      }
    return e;
  }
  GetTmpMachiningItemList() {
    return this.tqt;
  }
  GetEmptyMachiningItemListNum() {
    return this.iqt.length;
  }
  set CurrentCookRoleId(t) {
    this.rqt = t;
  }
  get CurrentCookRoleId() {
    return this.rqt;
  }
  UpdateCookRoleItemDataList() {
    this.nqt || (this.nqt = new Array()), (this.nqt.length = 0);
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList())
      this.nqt.push({
        RoleId: t.GetRoleId(),
        RoleName: t.GetRoleRealName(),
        RoleIcon: t.GetRoleConfig().RoleHeadIcon,
        IsBuff: !1,
        ItemId: 0,
      });
  }
  ClearCookRoleItemDataList() {
    this.nqt = void 0;
  }
  GetCookRoleItemDataList(t) {
    this.nqt || this.UpdateCookRoleItemDataList();
    for (const e of this.nqt)
      (e.ItemId = t),
        (e.IsBuff = CookController_1.CookController.CheckIsBuff(e.RoleId, t));
    return this.nqt.sort(this.sqt);
  }
  GetCookMaterialList(t, e) {
    const i = new Array();
    if (e === 0)
      for (const r of ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
        t,
      ).ConsumeItems)
        i.push({ G3n: r.ItemId, k4n: r.Count, m3n: !0 });
    else {
      const o = this.GetMachiningDataById(t);
      for (const s of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
        t,
      ).ConsumeItemsId)
        i.push({
          G3n: s.ItemId,
          k4n: s.Count,
          m3n: o.UnlockList.includes(s.ItemId),
        });
    }
    return i;
  }
  GetMachiningMaterialStudyList(t) {
    const e = new Array();
    const i = this.GetMachiningDataById(t);
    for (const r of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
      t,
    ).ConsumeItemsId) {
      const o = i.UnlockList.includes(r.ItemId);
      e.push({ G3n: o ? r.ItemId : 0, k4n: r.Count, m3n: o });
    }
    return e;
  }
  GetRefreshLimitTime() {
    let t;
    if (this.Wbt !== 0)
      return (
        (t = TimeUtil_1.TimeUtil.GetServerTime()),
        TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Wbt - t).CountDownText
      );
  }
  GetRefreshLimitTimeValue() {
    let t;
    return this.Wbt <= 0
      ? 1
      : ((t = TimeUtil_1.TimeUtil.GetServerTime()),
        TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Wbt - t)
          .RemainingTime);
  }
  set CurrentFixId(t) {
    this.aqt = t;
  }
  get CurrentFixId() {
    return this.aqt;
  }
  set CurrentEntityId(t) {
    this.E0 = t;
  }
  get CurrentEntityId() {
    return this.E0;
  }
  UpdateCookItemList(t) {
    this.hqt || (this.hqt = new Array()), (this.hqt.length = 0);
    for (const e of t) this.hqt.push({ ItemId: e.G3n, ItemNum: e.k4n });
  }
  GetCookItemList() {
    return this.hqt;
  }
}
exports.CookModel = CookModel;
class CookRewardPopData extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments), (this.CookRewardPopType = 0);
  }
}
exports.CookRewardPopData = CookRewardPopData;
// # sourceMappingURL=CookModel.js.map
