"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ForgingController_1 = require("./ForgingController");
class ForgingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Xqt = -1),
      (this.CurrentInteractCreatureDataLongId = void 0),
      (this.nLi = 0),
      (this.ForgingEnterFlow = void 0),
      (this.ForgingSuccessFlow = void 0),
      (this.ForgingFailFlow = void 0),
      (this.sLi = void 0),
      (this.XQs = new Map()),
      (this.aLi = void 0),
      (this.hLi = 0),
      (this.lLi = void 0),
      (this.fTi = (t, e) =>
        t.IsBuff === e.IsBuff ? t.RoleId - e.RoleId : t.IsBuff ? -1 : 1);
  }
  SaveLimitRefreshTime(t) {
    this.Xqt =
      MathUtils_1.MathUtils.LongToNumber(t) * TimeUtil_1.TimeUtil.Millisecond;
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
  OnInit() {
    return (
      (this.ForgingEnterFlow = {
        StateId: CommonParamById_1.configCommonParamById.GetIntConfig(
          "ForgingEnterStateId",
        ),
        FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
          "ForgingEnterFlowListName",
        ),
        FlowId:
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "ForgingEnterFlowId",
          ),
      }),
      (this.ForgingSuccessFlow = {
        StateId: CommonParamById_1.configCommonParamById.GetIntConfig(
          "ForgingSuccessStateId",
        ),
        FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
          "ForgingSuccessFlowListName",
        ),
        FlowId: CommonParamById_1.configCommonParamById.GetIntConfig(
          "ForgingSuccessFlowId",
        ),
      }),
      (this.ForgingFailFlow = {
        StateId:
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "ForgingFailStateId",
          ),
        FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
          "ForgingFailFlowListName",
        ),
        FlowId:
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "ForgingFailFlowId",
          ),
      }),
      !0
    );
  }
  OnClear() {
    return (
      (this.ForgingEnterFlow = void 0),
      (this.ForgingSuccessFlow = void 0),
      !(this.ForgingFailFlow = void 0)
    );
  }
  set CurrentForgingViewType(t) {
    this.nLi = t;
  }
  get CurrentForgingViewType() {
    return this.nLi;
  }
  CreateForgingDataList() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Forging", 50, "初始化锻造数据相关数据列表"),
      this.sLi || (this.sLi = new Array()),
      (this.sLi.length = 0);
    for (const o of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeList()) {
      var t = o.Id,
        e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(t),
        i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
          e.ItemId,
        ),
        e = {
          MainType: 0,
          ItemId: t,
          IsUnlock: 0,
          FormulaItemId: e.FormulaItemId,
          UniqueId: 0,
          IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey,
            t,
          ),
          IsForging: 0,
          Quality: i.QualityId,
          LastRoleId: 0,
          WeaponType: i.WeaponType,
          ExistStartTime: 0,
          ExistEndTime: 0,
          MadeCountInLimitTime: 0,
          TotalMakeCountInLimitTime: 0,
        };
      this.sLi.push(e),
        this.XQs.set(t, e),
        (e.IsForging = this.CheckCanForging(t) ? 1 : 0);
    }
  }
  YQs(e) {
    var t = this.sLi.findIndex((t) => t.ItemId === e);
    this.sLi.splice(t, 1), this.XQs.delete(e);
  }
  CheckCanForging(t) {
    t = this.GetForgingDataById(t);
    return (
      this.CheckUnlock(t) &&
      this.CheckLimitCount(t) &&
      this.CheckCoinEnough(t.ItemId) &&
      this.CheckMaterialEnough(t.ItemId)
    );
  }
  CheckCoinEnough(t) {
    t = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(t);
    return ModelManager_1.ModelManager.InventoryModel.CheckIsCoinEnough(
      ForgingController_1.ForgingController.ForgingCostId,
      t.ConsumeItems,
    );
  }
  CheckLimitCount(t) {
    return (
      t.TotalMakeCountInLimitTime <= 0 ||
      t.MadeCountInLimitTime < t.TotalMakeCountInLimitTime
    );
  }
  CheckUnlock(t) {
    return 0 < t.IsUnlock;
  }
  CheckMaterialEnough(t) {
    for (const i of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
      t,
    ).ConsumeItems) {
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        i.ItemId,
      );
      if (i.Count > e) return !1;
    }
    return !0;
  }
  UpdateForgingDataList(t) {
    for (const o of t) {
      var e = o.s5n,
        i = this.GetForgingDataById(e);
      i &&
        ((i.LastRoleId = o.cPs ?? 0),
        (i.ExistStartTime =
          MathUtils_1.MathUtils.LongToNumber(o.CPs) *
          TimeUtil_1.TimeUtil.Millisecond),
        (i.ExistEndTime =
          MathUtils_1.MathUtils.LongToNumber(o.gPs) *
          TimeUtil_1.TimeUtil.Millisecond),
        (i.MadeCountInLimitTime = o.TUs),
        (i.TotalMakeCountInLimitTime = o.dPs),
        (i.IsUnlock = 1),
        (i.IsForging = this.CheckCanForging(e) ? 1 : 0));
    }
  }
  UpdateForgingByServerConfig(t) {
    for (const n of t) {
      var e =
          MathUtils_1.MathUtils.LongToNumber(n.CPs) *
          TimeUtil_1.TimeUtil.Millisecond,
        i =
          MathUtils_1.MathUtils.LongToNumber(n.gPs) *
          TimeUtil_1.TimeUtil.Millisecond,
        o = n.s5n,
        r = this.GetForgingDataById(o);
      r &&
        ((0 == e && 0 == i) || TimeUtil_1.TimeUtil.IsInTimeSpan(e, i)
          ? ((r.ExistStartTime = e), (r.ExistEndTime = i))
          : this.YQs(o));
    }
  }
  GetForgingDataList() {
    return this.sLi;
  }
  GetForgingDataById(t) {
    return this.XQs.get(t);
  }
  GetForgingRoleId(t) {
    t = this.GetForgingDataById(t);
    return t?.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
  }
  GetForgingMaterialList(t) {
    var e = new Array();
    for (const i of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
      t,
    ).ConsumeItems)
      e.push({ L8n: i.ItemId, UVn: i.Count, K6n: !0 });
    return e;
  }
  UpdateForgingItemList(t) {
    this.aLi || (this.aLi = new Array()), (this.aLi.length = 0);
    for (const e of t) this.aLi.push({ ItemId: e.L8n, ItemNum: e.UVn });
  }
  GetForgingItemList() {
    return this.aLi;
  }
  set CurrentForgingRoleId(t) {
    this.hLi = t;
  }
  get CurrentForgingRoleId() {
    return this.hLi;
  }
  UpdateHelpRoleItemDataList() {
    this.lLi || (this.lLi = new Array()), (this.lLi.length = 0);
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList())
      this.lLi.push({
        RoleId: t.GetRoleId(),
        RoleName: t.GetRoleRealName(),
        RoleIcon: t.GetRoleConfig().RoleHeadIcon,
        IsBuff: !1,
        ItemId: 0,
      });
  }
  GetHelpRoleItemDataList(t) {
    this.lLi || this.UpdateHelpRoleItemDataList();
    for (const e of this.lLi)
      (e.ItemId = t),
        (e.IsBuff = ForgingController_1.ForgingController.CheckIsBuff(
          e.RoleId,
          t,
        ));
    return this.lLi.sort(this.fTi);
  }
}
exports.ForgingModel = ForgingModel;
//# sourceMappingURL=ForgingModel.js.map
