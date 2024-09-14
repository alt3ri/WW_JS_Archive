"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookRewardPopData = exports.CookModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiPopViewData_1 = require("../../Ui/Define/UiPopViewData"),
  CookController_1 = require("./CookController");
class CookModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Xqt = -1),
      (this.LastExp = 0),
      (this.CurrentInteractCreatureDataLongId = void 0),
      (this.$qt = 0),
      (this.Yqt = 0),
      (this.Jqt = void 0),
      (this.zqt = new Map()),
      (this.Zqt = void 0),
      (this.eGt = (t, e) => {
        var i = t.IsUnLock ? 1 : 0,
          o = e.IsUnLock ? 1 : 0;
        return 1 == i && i == o
          ? t.IsMachining === e.IsMachining
            ? t.Quality === e.Quality
              ? t.ItemId - e.ItemId
              : t.Quality - e.Quality
            : e.IsMachining - t.IsMachining
          : 0 == i && i == o
            ? t.Quality === e.Quality
              ? t.ItemId - e.ItemId
              : t.Quality - e.Quality
            : o - i;
      }),
      (this.tGt = 0),
      (this.iGt = void 0),
      (this.oGt = void 0),
      (this.rGt = void 0),
      (this.nGt = void 0),
      (this.sGt = void 0),
      (this.aGt = void 0),
      (this.hGt = void 0),
      (this.lGt = (t, e) =>
        t.IsBuff === e.IsBuff ? t.RoleId - e.RoleId : t.IsBuff ? -1 : 1),
      (this._Gt = 0),
      (this.E0 = void 0),
      (this.uGt = void 0);
  }
  OnInit() {
    return !0;
  }
  OnClear() {
    return this.ClearCookRoleItemDataList(), !0;
  }
  set CurrentCookViewType(t) {
    this.$qt = t;
  }
  get CurrentCookViewType() {
    return this.$qt;
  }
  set CurrentCookListType(t) {
    this.Yqt = t;
  }
  get CurrentCookListType() {
    return this.Yqt;
  }
  SaveLimitRefreshTime(t) {
    this.Xqt =
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
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        i.ItemId,
      );
      if (i.Count > e) return !1;
    }
    return !0;
  }
  CheckHasItemTimeoutStateChangedCore() {
    var t,
      e,
      i,
      o,
      r,
      s,
      n = this.Jqt,
      a = this.zqt;
    for ([t, e] of a) a.set(t, e - 1);
    let h = !1;
    for (const l of n)
      0 !== l.ExistStartTime &&
        0 !== l.ExistEndTime &&
        ((i = l.ItemId),
        (o = TimeUtil_1.TimeUtil.IsInTimeSpan(l.ExistStartTime, l.ExistEndTime)
          ? 1
          : 3),
        (a.has(i) && a.get(i) === o - 1) || (h = !0),
        a.set(i, o));
    for ([r, s] of a) (0 !== s && 2 !== s) || a.delete(r);
    return h;
  }
  CreateCookingDataList(t) {
    this.Jqt || (this.Jqt = new Array()), (this.Jqt.length = 0);
    var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormula() ?? [],
      i = new Map();
    for (const a of e) {
      var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a.FoodItemId);
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
      i.set(r.ItemId, r), this.Jqt.push(r);
    }
    let r = void 0;
    for (const h of t) {
      var s = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
          h.s5n,
        ),
        n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(s.FoodItemId);
      i.has(h.s5n)
        ? (((r = i.get(h.s5n)).CookCount = h.DVn),
          (r.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
            h.s5n,
          )),
          (r.LastRoleId = h.cPs),
          (r.IsCook = 0),
          (r.LimitTotalCount = h.dPs),
          (r.LimitedCount = h.mPs),
          (r.DataId = s.FoodItemId),
          (r.ExistStartTime =
            MathUtils_1.MathUtils.LongToNumber(h.CPs) *
            TimeUtil_1.TimeUtil.Millisecond),
          (r.ExistEndTime =
            MathUtils_1.MathUtils.LongToNumber(h.gPs) *
            TimeUtil_1.TimeUtil.Millisecond),
          (r.IsUnLock = !0))
        : ((r = {
            MainType: 0,
            SubType: 0,
            UniqueId: 0,
            ItemId: h.s5n,
            CookCount: h.DVn,
            IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
              h.s5n,
            ),
            LastRoleId: h.cPs,
            IsCook: 0,
            Quality: n.QualityId,
            EffectType: s.TypeId,
            DataId: s.FoodItemId,
            LimitTotalCount: h.dPs,
            LimitedCount: h.mPs,
            ExistStartTime:
              MathUtils_1.MathUtils.LongToNumber(h.CPs) *
              TimeUtil_1.TimeUtil.Millisecond,
            ExistEndTime:
              MathUtils_1.MathUtils.LongToNumber(h.gPs) *
              TimeUtil_1.TimeUtil.Millisecond,
            IsUnLock: !0,
          }),
          this.Jqt.push(r)),
        (r.IsCook = this.CheckCanCook(h.s5n) ? 1 : 0);
    }
  }
  UpdateCookingDataList(t) {
    this.Jqt || this.CreateCookingDataList(t);
    for (const i of t)
      for (const o of this.Jqt) {
        var e;
        i.s5n === o.ItemId &&
          ((o.CookCount = i.DVn),
          (o.LimitedCount = i.mPs),
          o.IsUnLock ||
            ((e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
              i.s5n,
            )),
            (o.IsNew = !0),
            (o.IsUnLock = !0),
            (o.DataId = e.FoodItemId),
            (o.ExistStartTime =
              MathUtils_1.MathUtils.LongToNumber(i.CPs) *
              TimeUtil_1.TimeUtil.Millisecond),
            (o.ExistEndTime =
              MathUtils_1.MathUtils.LongToNumber(i.gPs) *
              TimeUtil_1.TimeUtil.Millisecond),
            ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
              i.s5n,
            ),
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "FormulaLearned",
            )),
          (o.IsCook = this.CheckCanCook(i.s5n) ? 1 : 0));
      }
  }
  UpdateCookingDataByServerConfig(t) {
    for (const r of t) {
      var e =
          MathUtils_1.MathUtils.LongToNumber(r.CPs) *
          TimeUtil_1.TimeUtil.Millisecond,
        i =
          MathUtils_1.MathUtils.LongToNumber(r.gPs) *
          TimeUtil_1.TimeUtil.Millisecond,
        o = this.Jqt.findIndex((t) => t.ItemId === r.s5n);
      -1 !== o &&
        ((this.Jqt[o].ExistStartTime = e), (this.Jqt[o].ExistEndTime = i));
    }
  }
  UnlockCookMenuData(t) {
    var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t);
    let i = 0;
    for (
      ;
      i < this.Jqt.length &&
      (6e4 !== this.Jqt[i].SubType || this.Jqt[i].ItemId !== e.FormulaItemId);
      i++
    );
    this.Jqt.splice(i, 1);
  }
  GetCookingDataList() {
    return this.Jqt;
  }
  GetCookingDataById(t) {
    for (const e of this.Jqt) if (t === e.ItemId) return e;
  }
  GetCookRoleId(t) {
    t = this.GetCookingDataById(t);
    return t?.LastRoleId
      ? t.LastRoleId
      : (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId() ?? 1502);
  }
  CreateMachiningDataList() {
    this.Zqt || (this.Zqt = new Array());
    for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessed()) {
      var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.FinalItemId),
        t = {
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
      this.Zqt.push(t);
    }
    this.Zqt.sort(this.eGt);
  }
  UpdateMachiningDataList(t, e) {
    for (const s of t)
      for (const n of this.Zqt)
        if (s.s5n === n.ItemId) {
          let t = [];
          var i = [],
            o = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
              s.s5n,
            );
          if (s.fPs) {
            for (const a of o.ConsumeItemsId) i.push(a.ItemId);
            t = o.InterationId;
          } else
            for (const h of (t = s.vPs)) {
              var r = o.InterationId.indexOf(h);
              0 <= r && ((r = o.ConsumeItemsId[r].ItemId), i.push(r));
            }
          (n.IsUnLock = t.length === o.InterationId.length),
            (n.InteractiveList = t),
            (n.UnlockList = i),
            (n.IsMachining = CookController_1.CookController.CheckCanProcessed(
              s.s5n,
            )
              ? 1
              : 0),
            e &&
              ((n.IsNew = e),
              ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
                LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
                s.s5n,
              ),
              s.fPs) &&
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "FormulaLearned",
              );
          break;
        }
    this.Zqt.sort(this.eGt);
  }
  GetMachiningDataList() {
    return this.Zqt;
  }
  GetMachiningDataById(t) {
    for (const e of this.Zqt) if (t === e.ItemId) return e;
  }
  set SelectedCookerLevel(t) {
    this.tGt = t;
  }
  get SelectedCookerLevel() {
    return this.tGt;
  }
  CreateCookerInfo(t) {
    this.UpdateCookerInfo(t), (this.iGt = new Map());
    for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookLevel())
      this.iGt.set(e.Id, e);
  }
  UpdateCookerInfo(t) {
    let e = 0;
    this.oGt &&
      ((this.LastExp = this.oGt.TotalProficiencys),
      (e = t.uPs - this.oGt.TotalProficiencys)),
      (this.oGt = { CookingLevel: t._Ps, TotalProficiencys: t.uPs, AddExp: e });
  }
  GetCookerInfo() {
    return this.oGt;
  }
  CleanAddExp() {
    this.oGt.AddExp = 0;
  }
  GetCookLevelByLevel(t) {
    return this.iGt.get(t);
  }
  GetCookerMaxLevel() {
    return this.iGt.size;
  }
  GetSumExpByLevel(t) {
    var e = this.GetCookerMaxLevel();
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
    this.rGt || (this.rGt = new Array()),
      (this.rGt.length = 0),
      this.nGt || (this.nGt = new Array()),
      (this.nGt.length = 0),
      this.sGt || (this.sGt = new Map()),
      this.sGt.clear(),
      (this.rGt.length = 0),
      (this.nGt.length = 0);
    for (const e of t) this.rGt.push(e), e.K6n || this.nGt.push(e);
  }
  UpdateTmpMachiningItemList(t, e) {
    this.rGt[t] = e;
  }
  SubOneTmpMachiningItemSelectNum(e) {
    if (this.rGt[e]) {
      e = this.rGt[e];
      if (this.sGt.has(e.L8n)) {
        var i = this.sGt.get(e.L8n) - 1;
        if ((this.sGt.set(e.L8n, i), !(0 < i))) {
          this.sGt.delete(e.L8n);
          var o = function (t, e) {
              (t.K6n = e.K6n), (t.L8n = e.L8n);
            },
            i = { K6n: (e.K6n = !1), L8n: 0, UVn: 0 };
          o(i, e);
          let t = this.nGt.indexOf(e);
          for (; t < this.nGt.length - 1; t++) {
            var r = this.nGt[t + 1];
            o(this.nGt[t], r);
          }
          o(this.nGt[t], i);
        }
      }
    }
  }
  ClearTmpMachiningItemList() {
    (this.rGt.length = 0), (this.nGt.length = 0), this.sGt.clear();
  }
  SetEmptyBySelectedItem(t, e, i, o) {
    t = this.nGt[t];
    t && (i && ((t.L8n = i), o) && this.sGt.set(i, o), (t.K6n = e));
  }
  IsSelectNumFromEmpty(t) {
    let e = !1,
      i = 0;
    return this.sGt.has(t) && ((e = !0), (i = this.sGt.get(t))), [e, i];
  }
  CheckCanProcessedNew(t) {
    if (0 === this.sGt.size)
      return CookController_1.CookController.CheckCanProcessed(t);
    let e = !0;
    for (const o of this.rGt)
      if (this.sGt.has(o.L8n)) {
        var i = this.sGt.get(o.L8n);
        if (o.UVn > i) {
          e = !1;
          break;
        }
      }
    return e;
  }
  GetTmpMachiningItemList() {
    return this.rGt;
  }
  GetEmptyMachiningItemListNum() {
    return this.nGt.length;
  }
  set CurrentCookRoleId(t) {
    this.aGt = t;
  }
  get CurrentCookRoleId() {
    return this.aGt;
  }
  UpdateCookRoleItemDataList() {
    this.hGt || (this.hGt = new Array()), (this.hGt.length = 0);
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList())
      this.hGt.push({
        RoleId: t.GetRoleId(),
        RoleName: t.GetRoleRealName(),
        RoleIcon: t.GetRoleConfig().RoleHeadIcon,
        IsBuff: !1,
        ItemId: 0,
      });
  }
  ClearCookRoleItemDataList() {
    this.hGt = void 0;
  }
  GetCookRoleItemDataList(t) {
    this.hGt || this.UpdateCookRoleItemDataList();
    for (const e of this.hGt)
      (e.ItemId = t),
        (e.IsBuff = CookController_1.CookController.CheckIsBuff(e.RoleId, t));
    return this.hGt.sort(this.lGt);
  }
  GetCookMaterialList(t, e) {
    var i = new Array();
    if (0 === e)
      for (const r of ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
        t,
      ).ConsumeItems)
        i.push({ L8n: r.ItemId, UVn: r.Count, K6n: !0 });
    else {
      var o = this.GetMachiningDataById(t);
      for (const s of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
        t,
      ).ConsumeItemsId)
        i.push({
          L8n: s.ItemId,
          UVn: s.Count,
          K6n: o.UnlockList.includes(s.ItemId),
        });
    }
    return i;
  }
  GetMachiningMaterialStudyList(t) {
    var e = new Array(),
      i = this.GetMachiningDataById(t);
    for (const r of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
      t,
    ).ConsumeItemsId) {
      var o = i.UnlockList.includes(r.ItemId);
      e.push({ L8n: o ? r.ItemId : 0, UVn: r.Count, K6n: o });
    }
    return e;
  }
  GetRefreshLimitTime() {
    var t;
    if (0 !== this.Xqt)
      return (
        (t = TimeUtil_1.TimeUtil.GetServerTime()),
        TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Xqt - t).CountDownText
      );
  }
  GetRefreshLimitTimeValue() {
    var t;
    return this.Xqt <= 0
      ? 1
      : ((t = TimeUtil_1.TimeUtil.GetServerTime()),
        TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Xqt - t)
          .RemainingTime);
  }
  set CurrentFixId(t) {
    this._Gt = t;
  }
  get CurrentFixId() {
    return this._Gt;
  }
  set CurrentEntityId(t) {
    this.E0 = t;
  }
  get CurrentEntityId() {
    return this.E0;
  }
  UpdateCookItemList(t) {
    this.uGt || (this.uGt = new Array()), (this.uGt.length = 0);
    for (const e of t) this.uGt.push({ ItemId: e.L8n, ItemNum: e.UVn });
  }
  GetCookItemList() {
    return this.uGt;
  }
}
exports.CookModel = CookModel;
class CookRewardPopData extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments), (this.CookRewardPopType = 0);
  }
}
exports.CookRewardPopData = CookRewardPopData;
//# sourceMappingURL=CookModel.js.map
