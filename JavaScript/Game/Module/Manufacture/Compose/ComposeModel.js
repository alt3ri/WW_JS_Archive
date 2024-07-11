"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ComposeController_1 = require("./ComposeController");
class ComposeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Wbt = -1),
      (this.CurrentInteractCreatureDataLongId = void 0),
      (this.nIi = 0),
      (this.LastExp = 0),
      (this.ComposeEnterFlow = void 0),
      (this.ComposeSuccessFlow = void 0),
      (this.ComposeFailFlow = void 0),
      (this.sIi = 1),
      (this.aIi = []),
      (this.hIi = void 0),
      (this.lIi = void 0),
      (this._Ii = (t, e) =>
        t.IsPurification === e.IsPurification
          ? t.IsUnlock === e.IsUnlock
            ? e.ItemId - t.ItemId
            : e.IsUnlock - t.IsUnlock
          : e.IsPurification - t.IsPurification),
      (this.uIi = 0),
      (this.cIi = void 0),
      (this.mIi = void 0),
      (this.dIi = void 0),
      (this.CIi = 0),
      (this.gIi = void 0),
      (this.fIi = (t, e) =>
        t.IsBuff === e.IsBuff ? t.RoleId - e.RoleId : t.IsBuff ? -1 : 1);
  }
  SaveLimitRefreshTime(t) {
    this.Wbt =
      MathUtils_1.MathUtils.LongToNumber(t) * TimeUtil_1.TimeUtil.Millisecond;
  }
  GetRefreshLimitTime() {
    var t;
    if (0 !== this.Wbt)
      return (
        (t = TimeUtil_1.TimeUtil.GetServerTime()),
        TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Wbt - t).CountDownText
      );
  }
  GetRefreshLimitTimeValue() {
    var t;
    return this.Wbt <= 0
      ? 1
      : ((t = TimeUtil_1.TimeUtil.GetServerTime()),
        TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Wbt - t)
          .RemainingTime);
  }
  OnInit() {
    return (
      (this.ComposeEnterFlow = {
        StateId: CommonParamById_1.configCommonParamById.GetIntConfig(
          "ComposeEnterStateId",
        ),
        FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
          "ComposeEnterFlowListName",
        ),
        FlowId:
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "ComposeEnterFlowId",
          ),
      }),
      (this.ComposeSuccessFlow = {
        StateId: CommonParamById_1.configCommonParamById.GetIntConfig(
          "ComposeSuccessStateId",
        ),
        FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
          "ComposeSuccessFlowListName",
        ),
        FlowId: CommonParamById_1.configCommonParamById.GetIntConfig(
          "ComposeSuccessFlowId",
        ),
      }),
      (this.ComposeFailFlow = {
        StateId:
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "ComposeFailStateId",
          ),
        FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig(
          "ComposeFailFlowListName",
        ),
        FlowId:
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "ComposeFailFlowId",
          ),
      }),
      !0
    );
  }
  OnClear() {
    return (
      (this.ComposeEnterFlow = void 0),
      (this.ComposeSuccessFlow = void 0),
      (this.ComposeFailFlow = void 0),
      this.ClearComposeRoleItemDataList(),
      !0
    );
  }
  set CurrentComposeViewType(t) {
    this.nIi = t;
  }
  get CurrentComposeViewType() {
    return this.nIi;
  }
  set CurrentComposeListType(t) {
    this.sIi = t;
  }
  get CurrentComposeListType() {
    return this.sIi;
  }
  CreateComposeDataList(t) {
    this.CreateReagentProductionDataList(t),
      this.CreateStructureDataList(t),
      this.UpdatePurificationDataList(t, !1);
  }
  UpdateComposeDataList(t) {
    this.UpdateReagentProductionDataList(t),
      this.UpdateStructureDataList(t),
      this.UpdatePurificationDataList(t, !0);
  }
  UpdateComposeByServerConfig(t) {
    for (const r of t) {
      var e =
          MathUtils_1.MathUtils.LongToNumber(r.$Ts) *
          TimeUtil_1.TimeUtil.Millisecond,
        i =
          MathUtils_1.MathUtils.LongToNumber(r.HTs) *
          TimeUtil_1.TimeUtil.Millisecond,
        o = this.aIi.findIndex((t) => t.ItemId === r.Ekn);
      -1 !== o &&
        ((0 == e && 0 == i) || TimeUtil_1.TimeUtil.IsInTimeSpan(e, i)
          ? ((this.aIi[o].ExistStartTime = e), (this.aIi[o].ExistEndTime = i))
          : this.aIi.splice(o, 1));
    }
  }
  HideComposeDataList(t) {
    this.HideStructureDataList(t);
  }
  CreateReagentProductionDataList(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Compose", 50, "初始化药剂制造相关数据列表"),
      this.aIi || (this.aIi = new Array()),
      (this.aIi.length = 0);
    var e,
      i =
        ConfigManager_1.ConfigManager.ComposeConfig.GetComposeListByType(1) ??
        [],
      o = new Map();
    for (const a of i) {
      var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a.ItemId),
        r = {
          MainType: 1,
          SubType: 0,
          UniqueId: 0,
          ItemId: a.Id,
          ComposeCount: 0,
          IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
            a.Id,
          ),
          LastRoleId: 0,
          IsCompose: 0,
          Quality: r.QualityId,
          EffectType: a.TypeId,
          ExistStartTime: 0,
          ExistEndTime: 0,
          MadeCountInLimitTime: 0,
          TotalMakeCountInLimitTime: a.LimitCount,
          IsUnlock: 0,
        };
      this.aIi.push(r), o.set(a.Id, r);
    }
    for (const s of t)
      1 ===
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          s.Ekn,
        ).FormulaType &&
        o.has(s.Ekn) &&
        (((e = o.get(s.Ekn)).ItemId = s.Ekn),
        (e.ComposeCount = s.I5n ?? 0),
        (e.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
          s.Ekn,
        )),
        (e.LastRoleId = s.NTs ?? 0),
        (e.ExistStartTime =
          MathUtils_1.MathUtils.LongToNumber(s.$Ts) *
          TimeUtil_1.TimeUtil.Millisecond),
        (e.ExistEndTime =
          MathUtils_1.MathUtils.LongToNumber(s.HTs) *
          TimeUtil_1.TimeUtil.Millisecond),
        (e.MadeCountInLimitTime = s.Gxs),
        (e.TotalMakeCountInLimitTime = s.FTs),
        (e.IsUnlock = 1),
        (e.IsCompose = this.CheckCanReagentProduction(e.ItemId) ? 1 : 0));
  }
  UpdateReagentProductionDataList(t) {
    let e = !1;
    for (const a of t) {
      var i,
        o = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          a.Ekn,
        );
      if (1 === o.FormulaType) {
        let t = !1;
        for (const s of this.aIi)
          if (a.Ekn === s.ItemId) {
            var r = 1 === s.IsUnlock;
            (s.ComposeCount = a.I5n ?? 0),
              (s.MadeCountInLimitTime = a.Gxs ?? 0),
              (s.IsCompose = this.CheckCanReagentProduction(a.Ekn) ? 1 : 0),
              (s.IsUnlock = 1),
              (t = !0),
              r || (e = !0);
            break;
          }
        t ||
          ((o =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              a.Ekn,
            )),
          (i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(o.ItemId)),
          (i = {
            MainType: 1,
            SubType: 0,
            UniqueId: 0,
            ItemId: a.Ekn,
            ComposeCount: a.I5n ?? 0,
            IsNew: !0,
            LastRoleId: a.NTs ?? 0,
            IsCompose: 0,
            Quality: i.QualityId,
            EffectType: o.TypeId,
            ExistStartTime:
              MathUtils_1.MathUtils.LongToNumber(a.$Ts) *
              TimeUtil_1.TimeUtil.Millisecond,
            ExistEndTime:
              MathUtils_1.MathUtils.LongToNumber(a.HTs) *
              TimeUtil_1.TimeUtil.Millisecond,
            MadeCountInLimitTime: a.Gxs,
            TotalMakeCountInLimitTime: a.FTs,
            IsUnlock: 1,
          }),
          (e = !0),
          ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
            a.Ekn,
          ),
          this.aIi.push(i),
          (i.IsCompose = this.CheckCanReagentProduction(i.ItemId) ? 1 : 0));
      }
    }
    e &&
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "FormulaLearned",
      );
  }
  UnlockReagentProductionData(t) {
    var e =
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t);
    if (1 === e.FormulaType) {
      let t = 0;
      for (
        ;
        t < this.aIi.length &&
        (35 !== this.aIi[t].SubType || this.aIi[t].ItemId !== e.FormulaItemId);
        t++
      );
      this.aIi.splice(t, 1);
    }
  }
  GetReagentProductionDataList() {
    return this.aIi;
  }
  GetReagentProductionDataById(t) {
    for (const e of this.aIi) if (t === e.ItemId) return e;
  }
  GetReagentProductionRoleId(t) {
    t = this.GetReagentProductionDataById(t);
    return t?.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
  }
  CheckCanReagentProduction(t) {
    return this.pIi(this.GetReagentProductionDataById(t));
  }
  CheckCanPurification(t) {
    return this.pIi(this.GetPurificationDataById(t));
  }
  CheckCanStructure(t) {
    return this.pIi(this.GetStructureDataById(t));
  }
  pIi(t) {
    return (
      this.CheckUnlock(t) &&
      this.CheckLimitCount(t) &&
      this.CheckCoinEnough(t.ItemId) &&
      this.CheckComposeMaterialEnough(t.ItemId)
    );
  }
  CheckCoinEnough(t) {
    t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t);
    return ModelManager_1.ModelManager.InventoryModel.CheckIsCoinEnough(
      ComposeController_1.ComposeController.ComposeCoinId,
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
  CheckComposeMaterialEnough(t) {
    for (const i of ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
      t,
    ).ConsumeItems) {
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
        i.ItemId,
      );
      if (i.Count > e) return !1;
    }
    return !0;
  }
  CreateStructureDataList(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Compose", 50, "初始化构造数据相关数据列表"),
      this.hIi || (this.hIi = new Array()),
      (this.hIi.length = 0);
    var e,
      i =
        ConfigManager_1.ConfigManager.ComposeConfig.GetComposeListByType(2) ??
        [],
      o = new Map();
    for (const a of i)
      a.FormulaItemId <= 0 ||
        ((e = ConfigManager_1.ConfigManager.ItemConfig?.GetConfig(a.ItemId)),
        (e = {
          MainType: 2,
          SubType: 37,
          ItemId: a.Id,
          StructureCount: 0,
          IsNew: !1,
          LastRoleId: 0,
          IsStructure: 0,
          Quality: e.QualityId,
          ExistStartTime: 0,
          ExistEndTime: 0,
          MadeCountInLimitTime: 0,
          TotalMakeCountInLimitTime: 0,
          IsUnlock: 0,
        }),
        o.set(e.ItemId, e),
        this.hIi.push(e));
    for (const s of t) {
      var r =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          s.Ekn,
        );
      if (2 === r.FormulaType) {
        r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r.ItemId);
        let t = void 0;
        o.has(s.Ekn)
          ? (((t = o.get(s.Ekn)).StructureCount = s.I5n),
            (t.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
              s.Ekn,
            )),
            (t.LastRoleId = s.NTs),
            (t.IsStructure = 0),
            (t.ExistStartTime =
              MathUtils_1.MathUtils.LongToNumber(s.$Ts) *
              TimeUtil_1.TimeUtil.Millisecond),
            (t.ExistEndTime =
              MathUtils_1.MathUtils.LongToNumber(s.HTs) *
              TimeUtil_1.TimeUtil.Millisecond),
            (t.MadeCountInLimitTime = s.Gxs),
            (t.TotalMakeCountInLimitTime = s.FTs),
            (t.IsUnlock = 1))
          : ((t = {
              MainType: 2,
              SubType: 0,
              ItemId: s.Ekn,
              StructureCount: s.I5n ?? 0,
              IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
                LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
                s.Ekn,
              ),
              LastRoleId: s.NTs ?? 0,
              IsStructure: 0,
              Quality: r.QualityId,
              ExistStartTime:
                MathUtils_1.MathUtils.LongToNumber(s.$Ts) *
                TimeUtil_1.TimeUtil.Millisecond,
              ExistEndTime:
                MathUtils_1.MathUtils.LongToNumber(s.HTs) *
                TimeUtil_1.TimeUtil.Millisecond,
              MadeCountInLimitTime: s.Gxs,
              TotalMakeCountInLimitTime: s.FTs,
              IsUnlock: 1,
            }),
            this.hIi.push(t)),
          (t.IsStructure = this.CheckCanStructure(t.ItemId) ? 1 : 0);
      }
    }
  }
  UpdateStructureDataList(t) {
    for (const o of t) {
      var i =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          o.Ekn,
        );
      if (2 === i.FormulaType) {
        let t = !1,
          e = !1;
        for (const r of this.hIi)
          if (o.Ekn === r.ItemId) {
            (r.StructureCount = o.I5n ?? 0),
              (r.MadeCountInLimitTime = o.Gxs ?? 0),
              (t = !0),
              (e = !r.IsUnlock),
              (r.IsUnlock = 1),
              (r.IsStructure = this.CheckCanStructure(o.Ekn) ? 1 : 0);
            break;
          }
        (!e && t) ||
          (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
            o.Ekn,
          ),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "FormulaLearned",
          )),
          t ||
            ((i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId)),
            (i = {
              MainType: 2,
              SubType: 0,
              ItemId: o.Ekn,
              StructureCount: o.I5n ?? 0,
              IsNew: !0,
              LastRoleId: o.NTs ?? 0,
              IsStructure: 0,
              Quality: i.QualityId,
              ExistStartTime:
                MathUtils_1.MathUtils.LongToNumber(o.$Ts) *
                TimeUtil_1.TimeUtil.Millisecond,
              ExistEndTime:
                MathUtils_1.MathUtils.LongToNumber(o.HTs) *
                TimeUtil_1.TimeUtil.Millisecond,
              MadeCountInLimitTime: o.Gxs,
              TotalMakeCountInLimitTime: o.FTs,
              IsUnlock: 1,
            }),
            this.hIi.push(i),
            (i.IsStructure = this.CheckCanStructure(i.ItemId) ? 1 : 0));
      }
    }
  }
  UnlockStructureData(t) {
    var e =
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t);
    if (2 === e.FormulaType) {
      let t = 0;
      for (
        ;
        t < this.hIi.length &&
        (37 !== this.hIi[t].SubType || this.hIi[t].ItemId !== e.FormulaItemId);
        t++
      );
      this.hIi.splice(t, 1);
    }
  }
  HideStructureDataList(t) {
    for (const i of t) {
      var e =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(i);
      if (2 === e.FormulaType) {
        let t = 0;
        for (; t < this.hIi.length && this.hIi[t].ItemId !== i; t++);
        this.hIi.splice(t, 1);
      }
    }
  }
  GetStructureDataList() {
    return this.hIi;
  }
  GetStructureDataById(t) {
    for (const e of this.hIi) if (t === e.ItemId) return e;
  }
  GetStructureRoleId(t) {
    t = this.GetStructureDataById(t);
    return t && t.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
  }
  CreatePurificationDataList() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Compose", 50, "初始化纯化数据相关数据列表"),
      this.lIi || (this.lIi = new Array());
    for (const e of ConfigManager_1.ConfigManager.ComposeConfig.GetComposeListByType(
      3,
    )) {
      var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId),
        t = {
          MainType: 3,
          ItemId: e.Id,
          IsUnlock: 0,
          IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
            e.Id,
          ),
          IsPurification: 0,
          Quality: t.QualityId,
          LastRoleId: 0,
          ExistStartTime: 0,
          ExistEndTime: 0,
          MadeCountInLimitTime: 0,
          TotalMakeCountInLimitTime: 0,
        };
      this.lIi.push(t),
        (t.IsPurification = this.CheckCanPurification(t.ItemId) ? 1 : 0);
    }
    this.lIi.sort(this._Ii);
  }
  UpdatePurificationDataList(t, e) {
    for (const o of t) {
      var i =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          o.Ekn,
        );
      if (3 === i.FormulaType)
        for (const r of this.lIi)
          if (o.Ekn === r.ItemId) {
            (r.IsUnlock = 1),
              (r.LastRoleId = o.NTs ?? 0),
              (r.ExistStartTime =
                MathUtils_1.MathUtils.LongToNumber(o.$Ts) *
                TimeUtil_1.TimeUtil.Millisecond),
              (r.ExistEndTime =
                MathUtils_1.MathUtils.LongToNumber(o.HTs) *
                TimeUtil_1.TimeUtil.Millisecond),
              (r.MadeCountInLimitTime = o.Gxs),
              (r.TotalMakeCountInLimitTime = o.FTs),
              e &&
                0 === o.NTs &&
                ((r.IsNew = e),
                ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
                  LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
                  o.Ekn,
                ),
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "FormulaLearned",
                )),
              (r.IsPurification = this.CheckCanPurification(o.Ekn) ? 1 : 0);
            break;
          }
    }
  }
  GetPurificationDataList() {
    return this.lIi;
  }
  GetPurificationDataById(t) {
    for (const e of this.lIi) if (t === e.ItemId) return e;
  }
  GetPurificationRoleId(t) {
    t = this.GetPurificationDataById(t);
    return t?.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
  }
  set SelectedComposeLevel(t) {
    this.uIi = t;
  }
  get SelectedComposeLevel() {
    return this.uIi;
  }
  CreateComposeLevelInfo(t) {
    this.UpdateComposeInfo(t), (this.cIi = new Map());
    for (const e of ConfigManager_1.ConfigManager.ComposeConfig.GetComposeLevel())
      this.cIi.set(e.Id, e);
  }
  UpdateComposeInfo(t) {
    let e = 0;
    this.mIi &&
      ((this.LastExp = this.mIi.TotalProficiency),
      (e = t.qxs - this.mIi.TotalProficiency)),
      (this.mIi = { ComposeLevel: t.r3n, TotalProficiency: t.qxs, AddExp: e });
  }
  GetComposeInfo() {
    return this.mIi;
  }
  CleanAddExp() {
    this.mIi.AddExp = 0;
  }
  GetComposeLevelByLevel(t) {
    return this.cIi.get(t);
  }
  GetComposeMaxLevel() {
    return this.cIi.size;
  }
  GetSumExpByLevel(t) {
    var e = this.GetComposeMaxLevel();
    let i = t + 1;
    return i > e && (i = e), this.GetComposeLevelByLevel(i).Completeness;
  }
  GetDropIdByLevel(t) {
    t += 1;
    return this.GetComposeMaxLevel() < t
      ? -1
      : this.GetComposeLevelByLevel(t).DropIds;
  }
  GetComposeMaterialList(t) {
    var e = new Array();
    for (const i of ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
      t,
    ).ConsumeItems)
      e.push({ G3n: i.ItemId, k4n: i.Count, m3n: !0 });
    return e;
  }
  UpdateComposeItemList(t) {
    this.dIi || (this.dIi = new Array()), (this.dIi.length = 0);
    for (const e of t) this.dIi.push({ ItemId: e.G3n, ItemNum: e.k4n });
  }
  GetComposeItemList() {
    return this.dIi;
  }
  GetComposeText(t) {
    t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t);
    return ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name);
  }
  GetComposeId(t) {
    return ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
      t,
    ).ItemId;
  }
  set CurrentComposeRoleId(t) {
    this.CIi = t;
  }
  get CurrentComposeRoleId() {
    return this.CIi;
  }
  UpdateHelpRoleItemDataList() {
    this.gIi || (this.gIi = new Array()), (this.gIi.length = 0);
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList())
      this.gIi.push({
        RoleId: t.GetRoleId(),
        RoleName: t.GetRoleRealName(),
        RoleIcon: t.GetRoleConfig().RoleHeadIcon,
        IsBuff: !1,
        ItemId: 0,
      });
  }
  ClearComposeRoleItemDataList() {
    this.gIi = void 0;
  }
  GetHelpRoleItemDataList(t) {
    this.gIi || this.UpdateHelpRoleItemDataList();
    for (const e of this.gIi)
      (e.ItemId = t),
        (e.IsBuff = ComposeController_1.ComposeController.CheckIsBuff(
          e.RoleId,
          t,
        ));
    return this.gIi.sort(this.fIi);
  }
}
exports.ComposeModel = ComposeModel;
//# sourceMappingURL=ComposeModel.js.map
