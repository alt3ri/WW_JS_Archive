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
      (this.Xqt = -1),
      (this.CurrentInteractCreatureDataLongId = void 0),
      (this.nTi = 0),
      (this.LastExp = 0),
      (this.ComposeEnterFlow = void 0),
      (this.ComposeSuccessFlow = void 0),
      (this.ComposeFailFlow = void 0),
      (this.sTi = 1),
      (this.aTi = []),
      (this.hTi = void 0),
      (this.lTi = void 0),
      (this._Ti = (t, e) =>
        t.IsPurification === e.IsPurification
          ? t.IsUnlock === e.IsUnlock
            ? e.ItemId - t.ItemId
            : e.IsUnlock - t.IsUnlock
          : e.IsPurification - t.IsPurification),
      (this.uTi = 0),
      (this.cTi = void 0),
      (this.mTi = void 0),
      (this.dTi = void 0),
      (this.CTi = 0),
      (this.gTi = void 0),
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
    this.nTi = t;
  }
  get CurrentComposeViewType() {
    return this.nTi;
  }
  set CurrentComposeListType(t) {
    this.sTi = t;
  }
  get CurrentComposeListType() {
    return this.sTi;
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
          MathUtils_1.MathUtils.LongToNumber(r.CPs) *
          TimeUtil_1.TimeUtil.Millisecond,
        i =
          MathUtils_1.MathUtils.LongToNumber(r.gPs) *
          TimeUtil_1.TimeUtil.Millisecond,
        o = this.aTi.findIndex((t) => t.ItemId === r.s5n);
      -1 !== o &&
        ((0 == e && 0 == i) || TimeUtil_1.TimeUtil.IsInTimeSpan(e, i)
          ? ((this.aTi[o].ExistStartTime = e), (this.aTi[o].ExistEndTime = i))
          : this.aTi.splice(o, 1));
    }
  }
  HideComposeDataList(t) {
    this.HideStructureDataList(t);
  }
  CreateReagentProductionDataList(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Compose", 50, "初始化药剂制造相关数据列表"),
      this.aTi || (this.aTi = new Array()),
      (this.aTi.length = 0);
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
      this.aTi.push(r), o.set(a.Id, r);
    }
    for (const s of t)
      1 ===
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          s.s5n,
        ).FormulaType &&
        o.has(s.s5n) &&
        (((e = o.get(s.s5n)).ItemId = s.s5n),
        (e.ComposeCount = s.m9n ?? 0),
        (e.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
          s.s5n,
        )),
        (e.LastRoleId = s.cPs ?? 0),
        (e.ExistStartTime =
          MathUtils_1.MathUtils.LongToNumber(s.CPs) *
          TimeUtil_1.TimeUtil.Millisecond),
        (e.ExistEndTime =
          MathUtils_1.MathUtils.LongToNumber(s.gPs) *
          TimeUtil_1.TimeUtil.Millisecond),
        (e.MadeCountInLimitTime = s.lGs),
        (e.TotalMakeCountInLimitTime = s.dPs),
        (e.IsUnlock = 1),
        (e.IsCompose = this.CheckCanReagentProduction(e.ItemId) ? 1 : 0));
  }
  UpdateReagentProductionDataList(t) {
    if (!(this.aTi.length <= 0)) {
      let e = !1;
      for (const a of t) {
        var i,
          o =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              a.s5n,
            );
        if (1 === o.FormulaType) {
          let t = !1;
          for (const s of this.aTi)
            if (a.s5n === s.ItemId) {
              var r = 1 === s.IsUnlock;
              (s.ComposeCount = a.m9n ?? 0),
                (s.MadeCountInLimitTime = a.lGs ?? 0),
                (s.IsCompose = this.CheckCanReagentProduction(a.s5n) ? 1 : 0),
                (s.IsUnlock = 1),
                (t = !0),
                r || (e = !0);
              break;
            }
          t ||
            ((o =
              ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                a.s5n,
              )),
            (i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(o.ItemId)),
            (i = {
              MainType: 1,
              SubType: 0,
              UniqueId: 0,
              ItemId: a.s5n,
              ComposeCount: a.m9n ?? 0,
              IsNew: !0,
              LastRoleId: a.cPs ?? 0,
              IsCompose: 0,
              Quality: i.QualityId,
              EffectType: o.TypeId,
              ExistStartTime:
                MathUtils_1.MathUtils.LongToNumber(a.CPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              ExistEndTime:
                MathUtils_1.MathUtils.LongToNumber(a.gPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              MadeCountInLimitTime: a.lGs,
              TotalMakeCountInLimitTime: a.dPs,
              IsUnlock: 1,
            }),
            (e = !0),
            ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
              a.s5n,
            ),
            this.aTi.push(i),
            (i.IsCompose = this.CheckCanReagentProduction(i.ItemId) ? 1 : 0));
        }
      }
      e &&
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FormulaLearned",
        );
    }
  }
  UnlockReagentProductionData(t) {
    var e =
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t);
    if (1 === e.FormulaType) {
      let t = 0;
      for (
        ;
        t < this.aTi.length &&
        (35 !== this.aTi[t].SubType || this.aTi[t].ItemId !== e.FormulaItemId);
        t++
      );
      this.aTi.splice(t, 1);
    }
  }
  GetReagentProductionDataList() {
    return this.aTi;
  }
  GetReagentProductionDataById(t) {
    for (const e of this.aTi) if (t === e.ItemId) return e;
  }
  GetReagentProductionRoleId(t) {
    t = this.GetReagentProductionDataById(t);
    return t?.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
  }
  CheckCanReagentProduction(t) {
    return this.pTi(this.GetReagentProductionDataById(t));
  }
  CheckCanPurification(t) {
    return this.pTi(this.GetPurificationDataById(t));
  }
  CheckCanStructure(t) {
    return this.pTi(this.GetStructureDataById(t));
  }
  pTi(t) {
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
      this.hTi || (this.hTi = new Array()),
      (this.hTi.length = 0);
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
        this.hTi.push(e));
    for (const s of t) {
      var r =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          s.s5n,
        );
      if (2 === r.FormulaType) {
        r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r.ItemId);
        let t = void 0;
        o.has(s.s5n)
          ? (((t = o.get(s.s5n)).StructureCount = s.m9n),
            (t.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
              s.s5n,
            )),
            (t.LastRoleId = s.cPs),
            (t.IsStructure = 0),
            (t.ExistStartTime =
              MathUtils_1.MathUtils.LongToNumber(s.CPs) *
              TimeUtil_1.TimeUtil.Millisecond),
            (t.ExistEndTime =
              MathUtils_1.MathUtils.LongToNumber(s.gPs) *
              TimeUtil_1.TimeUtil.Millisecond),
            (t.MadeCountInLimitTime = s.lGs),
            (t.TotalMakeCountInLimitTime = s.dPs),
            (t.IsUnlock = 1))
          : ((t = {
              MainType: 2,
              SubType: 0,
              ItemId: s.s5n,
              StructureCount: s.m9n ?? 0,
              IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
                LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
                s.s5n,
              ),
              LastRoleId: s.cPs ?? 0,
              IsStructure: 0,
              Quality: r.QualityId,
              ExistStartTime:
                MathUtils_1.MathUtils.LongToNumber(s.CPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              ExistEndTime:
                MathUtils_1.MathUtils.LongToNumber(s.gPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              MadeCountInLimitTime: s.lGs,
              TotalMakeCountInLimitTime: s.dPs,
              IsUnlock: 1,
            }),
            this.hTi.push(t)),
          (t.IsStructure = this.CheckCanStructure(t.ItemId) ? 1 : 0);
      }
    }
  }
  UpdateStructureDataList(t) {
    for (const o of t) {
      var i =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          o.s5n,
        );
      if (2 === i.FormulaType) {
        let t = !1,
          e = !1;
        for (const r of this.hTi)
          if (o.s5n === r.ItemId) {
            (r.StructureCount = o.m9n ?? 0),
              (r.MadeCountInLimitTime = o.lGs ?? 0),
              (t = !0),
              (e = !r.IsUnlock),
              (r.IsUnlock = 1),
              (r.IsStructure = this.CheckCanStructure(o.s5n) ? 1 : 0);
            break;
          }
        (!e && t) ||
          (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
            o.s5n,
          ),
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "FormulaLearned",
          )),
          t ||
            ((i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId)),
            (i = {
              MainType: 2,
              SubType: 0,
              ItemId: o.s5n,
              StructureCount: o.m9n ?? 0,
              IsNew: !0,
              LastRoleId: o.cPs ?? 0,
              IsStructure: 0,
              Quality: i.QualityId,
              ExistStartTime:
                MathUtils_1.MathUtils.LongToNumber(o.CPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              ExistEndTime:
                MathUtils_1.MathUtils.LongToNumber(o.gPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              MadeCountInLimitTime: o.lGs,
              TotalMakeCountInLimitTime: o.dPs,
              IsUnlock: 1,
            }),
            this.hTi.push(i),
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
        t < this.hTi.length &&
        (37 !== this.hTi[t].SubType || this.hTi[t].ItemId !== e.FormulaItemId);
        t++
      );
      this.hTi.splice(t, 1);
    }
  }
  HideStructureDataList(t) {
    for (const i of t) {
      var e =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(i);
      if (2 === e.FormulaType) {
        let t = 0;
        for (; t < this.hTi.length && this.hTi[t].ItemId !== i; t++);
        this.hTi.splice(t, 1);
      }
    }
  }
  GetStructureDataList() {
    return this.hTi;
  }
  GetStructureDataById(t) {
    for (const e of this.hTi) if (t === e.ItemId) return e;
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
      this.lTi || (this.lTi = new Array());
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
      this.lTi.push(t),
        (t.IsPurification = this.CheckCanPurification(t.ItemId) ? 1 : 0);
    }
    this.lTi.sort(this._Ti);
  }
  UpdatePurificationDataList(t, e) {
    for (const o of t) {
      var i =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          o.s5n,
        );
      if (3 === i.FormulaType)
        for (const r of this.lTi)
          if (o.s5n === r.ItemId) {
            (r.IsUnlock = 1),
              (r.LastRoleId = o.cPs ?? 0),
              (r.ExistStartTime =
                MathUtils_1.MathUtils.LongToNumber(o.CPs) *
                TimeUtil_1.TimeUtil.Millisecond),
              (r.ExistEndTime =
                MathUtils_1.MathUtils.LongToNumber(o.gPs) *
                TimeUtil_1.TimeUtil.Millisecond),
              (r.MadeCountInLimitTime = o.lGs),
              (r.TotalMakeCountInLimitTime = o.dPs),
              e &&
                0 === o.cPs &&
                ((r.IsNew = e),
                ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
                  LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
                  o.s5n,
                ),
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "FormulaLearned",
                )),
              (r.IsPurification = this.CheckCanPurification(o.s5n) ? 1 : 0);
            break;
          }
    }
  }
  GetPurificationDataList() {
    return this.lTi;
  }
  GetPurificationDataById(t) {
    for (const e of this.lTi) if (t === e.ItemId) return e;
  }
  GetPurificationRoleId(t) {
    t = this.GetPurificationDataById(t);
    return t?.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
  }
  set SelectedComposeLevel(t) {
    this.uTi = t;
  }
  get SelectedComposeLevel() {
    return this.uTi;
  }
  CreateComposeLevelInfo(t) {
    this.UpdateComposeInfo(t), (this.cTi = new Map());
    for (const e of ConfigManager_1.ConfigManager.ComposeConfig.GetComposeLevel())
      this.cTi.set(e.Id, e);
  }
  UpdateComposeInfo(t) {
    let e = 0;
    this.mTi &&
      ((this.LastExp = this.mTi.TotalProficiency),
      (e = t.hGs - this.mTi.TotalProficiency)),
      (this.mTi = { ComposeLevel: t.F6n, TotalProficiency: t.hGs, AddExp: e });
  }
  GetComposeInfo() {
    return this.mTi;
  }
  CleanAddExp() {
    this.mTi.AddExp = 0;
  }
  GetComposeLevelByLevel(t) {
    return this.cTi.get(t);
  }
  GetComposeMaxLevel() {
    return this.cTi.size;
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
      e.push({ L8n: i.ItemId, UVn: i.Count, K6n: !0 });
    return e;
  }
  UpdateComposeItemList(t) {
    this.dTi || (this.dTi = new Array()), (this.dTi.length = 0);
    for (const e of t) this.dTi.push({ ItemId: e.L8n, ItemNum: e.UVn });
  }
  GetComposeItemList() {
    return this.dTi;
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
    this.CTi = t;
  }
  get CurrentComposeRoleId() {
    return this.CTi;
  }
  UpdateHelpRoleItemDataList() {
    this.gTi || (this.gTi = new Array()), (this.gTi.length = 0);
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList())
      this.gTi.push({
        RoleId: t.GetRoleId(),
        RoleName: t.GetRoleRealName(),
        RoleIcon: t.GetRoleConfig().RoleHeadIcon,
        IsBuff: !1,
        ItemId: 0,
      });
  }
  ClearComposeRoleItemDataList() {
    this.gTi = void 0;
  }
  GetHelpRoleItemDataList(t) {
    this.gTi || this.UpdateHelpRoleItemDataList();
    for (const e of this.gTi)
      (e.ItemId = t),
        (e.IsBuff = ComposeController_1.ComposeController.CheckIsBuff(
          e.RoleId,
          t,
        ));
    return this.gTi.sort(this.fTi);
  }
}
exports.ComposeModel = ComposeModel;
//# sourceMappingURL=ComposeModel.js.map
