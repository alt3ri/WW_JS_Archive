"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ForgingModel = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ForgingController_1 = require("./ForgingController");
class ForgingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Wbt = -1),
      (this.CurrentInteractCreatureDataLongId = void 0),
      (this.nTi = 0),
      (this.ForgingEnterFlow = void 0),
      (this.ForgingSuccessFlow = void 0),
      (this.ForgingFailFlow = void 0),
      (this.sTi = void 0),
      (this.i8s = new Map()),
      (this.aTi = void 0),
      (this.hTi = 0),
      (this.lTi = void 0),
      (this.fIi = (t, e) =>
        t.IsBuff === e.IsBuff ? t.RoleId - e.RoleId : t.IsBuff ? -1 : 1);
  }
  SaveLimitRefreshTime(t) {
    this.Wbt =
      MathUtils_1.MathUtils.LongToNumber(t) * TimeUtil_1.TimeUtil.Millisecond;
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
    this.nTi = t;
  }
  get CurrentForgingViewType() {
    return this.nTi;
  }
  CreateForgingDataList() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Forging", 50, "初始化锻造数据相关数据列表"),
      this.sTi || (this.sTi = new Array()),
      (this.sTi.length = 0);
    for (const o of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeList()) {
      const t = o.Id;
      var e =
        ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(t);
      const i =
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
          e.ItemId,
        );
      var e = {
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
      this.sTi.push(e),
        this.i8s.set(t, e),
        (e.IsForging = this.CheckCanForging(t) ? 1 : 0);
    }
  }
  r8s(e) {
    const t = this.sTi.findIndex((t) => t.ItemId === e);
    this.sTi.splice(t, 1), this.i8s.delete(e);
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
    return t.IsUnlock > 0;
  }
  CheckMaterialEnough(t) {
    for (const i of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
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
  UpdateForgingDataList(t) {
    for (const o of t) {
      const e = o.Ekn;
      const i = this.GetForgingDataById(e);
      i &&
        ((i.LastRoleId = o.NTs ?? 0),
        (i.ExistStartTime =
          MathUtils_1.MathUtils.LongToNumber(o.$Ts) *
          TimeUtil_1.TimeUtil.Millisecond),
        (i.ExistEndTime =
          MathUtils_1.MathUtils.LongToNumber(o.HTs) *
          TimeUtil_1.TimeUtil.Millisecond),
        (i.MadeCountInLimitTime = o.ZLs),
        (i.TotalMakeCountInLimitTime = o.FTs),
        (i.IsUnlock = 1),
        (i.IsForging = this.CheckCanForging(e) ? 1 : 0));
    }
  }
  UpdateForgingByServerConfig(t) {
    for (const n of t) {
      const e =
        MathUtils_1.MathUtils.LongToNumber(n.$Ts) *
        TimeUtil_1.TimeUtil.Millisecond;
      const i =
        MathUtils_1.MathUtils.LongToNumber(n.HTs) *
        TimeUtil_1.TimeUtil.Millisecond;
      const o = n.Ekn;
      const r = this.GetForgingDataById(o);
      r &&
        ((e == 0 && i == 0) || TimeUtil_1.TimeUtil.IsInTimeSpan(e, i)
          ? ((r.ExistStartTime = e), (r.ExistEndTime = i))
          : this.r8s(o));
    }
  }
  GetForgingDataList() {
    return this.sTi;
  }
  GetForgingDataById(t) {
    return this.i8s.get(t);
  }
  GetForgingRoleId(t) {
    t = this.GetForgingDataById(t);
    return t?.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
  }
  GetForgingMaterialList(t) {
    const e = new Array();
    for (const i of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(
      t,
    ).ConsumeItems)
      e.push({ G3n: i.ItemId, k4n: i.Count, m3n: !0 });
    return e;
  }
  UpdateForgingItemList(t) {
    this.aTi || (this.aTi = new Array()), (this.aTi.length = 0);
    for (const e of t) this.aTi.push({ ItemId: e.G3n, ItemNum: e.k4n });
  }
  GetForgingItemList() {
    return this.aTi;
  }
  set CurrentForgingRoleId(t) {
    this.hTi = t;
  }
  get CurrentForgingRoleId() {
    return this.hTi;
  }
  UpdateHelpRoleItemDataList() {
    this.lTi || (this.lTi = new Array()), (this.lTi.length = 0);
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList())
      this.lTi.push({
        RoleId: t.GetRoleId(),
        RoleName: t.GetRoleRealName(),
        RoleIcon: t.GetRoleConfig().RoleHeadIcon,
        IsBuff: !1,
        ItemId: 0,
      });
  }
  GetHelpRoleItemDataList(t) {
    this.lTi || this.UpdateHelpRoleItemDataList();
    for (const e of this.lTi)
      (e.ItemId = t),
        (e.IsBuff = ForgingController_1.ForgingController.CheckIsBuff(
          e.RoleId,
          t,
        ));
    return this.lTi.sort(this.fIi);
  }
}
exports.ForgingModel = ForgingModel;
// # sourceMappingURL=ForgingModel.js.map
