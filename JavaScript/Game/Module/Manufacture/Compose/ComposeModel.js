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
  ComposeController_1 = require("./ComposeController"),
  ComposeDefine_1 = require("./ComposeDefine");
class ComposeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ExchangeItemBaseMap = new Map()),
      (this.Xqt = -1),
      (this.CurrentInteractCreatureDataLongId = void 0),
      (this.nTi = 0),
      (this.LastExp = 0),
      (this.ComposeEnterFlow = void 0),
      (this.ComposeSuccessFlow = void 0),
      (this.ComposeFailFlow = void 0),
      (this.sTi = 3),
      (this.aTi = []),
      (this.Tjl = []),
      (this.hTi = void 0),
      (this.lTi = void 0),
      (this.uTi = 0),
      (this.cTi = void 0),
      (this.mTi = void 0),
      (this.dTi = void 0),
      (this.CTi = 0),
      (this.gTi = void 0),
      (this.fTi = (t, e) =>
        t.IsBuff === e.IsBuff ? t.RoleId - e.RoleId : t.IsBuff ? -1 : 1),
      (this.ComposeSelectItem = void 0);
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
      this.UpdatePurificationDataList(t),
      this.CreateExchangeDataList();
  }
  UpdateComposeDataList(t) {
    this.UpdateReagentProductionDataList(t),
      this.UpdateStructureDataList(t),
      this.UpdatePurificationDataList(t);
  }
  UpdateComposeByServerConfig(t) {
    for (const r of t) {
      var e =
          MathUtils_1.MathUtils.LongToNumber(r.CPs) *
          TimeUtil_1.TimeUtil.Millisecond,
        o =
          MathUtils_1.MathUtils.LongToNumber(r.gPs) *
          TimeUtil_1.TimeUtil.Millisecond,
        i = this.aTi.findIndex((t) => t.ConfigId === r.s5n);
      -1 !== i &&
        ((0 == e && 0 == o) || TimeUtil_1.TimeUtil.IsInTimeSpan(e, o)
          ? ((this.aTi[i].ExistStartTime = e), (this.aTi[i].ExistEndTime = o))
          : this.aTi.splice(i, 1));
    }
  }
  HideComposeDataList(t) {
    this.HideStructureDataList(t);
  }
  CreateReagentProductionDataList(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Compose", 49, "初始化药剂制造相关数据列表"),
      this.aTi || (this.aTi = new Array()),
      (this.aTi.length = 0);
    var e,
      o =
        ConfigManager_1.ConfigManager.ComposeConfig.GetComposeListByType(1) ??
        [],
      i = new Map();
    for (const a of o) {
      var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a.ItemId),
        r = {
          MainType: 1,
          SubType: 0,
          UniqueId: 0,
          ConfigId: a.Id,
          ComposeCount: 0,
          IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
            a.Id,
          ),
          LastRoleId: 0,
          Quality: r.QualityId,
          EffectType: a.TypeId,
          ExistStartTime: 0,
          ExistEndTime: 0,
          MadeCountInLimitTime: 0,
          TotalMakeCountInLimitTime: a.LimitCount,
          IsUnlock: 0,
          GroupId: 0,
          IsLimitForever: a.PermanentLimit,
          SortId: a.SortId,
        };
      this.aTi.push(r), i.set(a.Id, r);
    }
    for (const s of t)
      1 ===
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          s.s5n,
        ).FormulaType &&
        i.has(s.s5n) &&
        (((e = i.get(s.s5n)).ConfigId = s.s5n),
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
        (e.IsUnlock = 1));
  }
  UpdateReagentProductionDataList(t) {
    if (!(this.aTi.length <= 0)) {
      let e = !1;
      for (const a of t) {
        var o,
          i =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              a.s5n,
            );
        if (1 === i.FormulaType) {
          let t = !1;
          for (const s of this.aTi)
            if (a.s5n === s.ConfigId) {
              var r = 1 === s.IsUnlock;
              (s.ComposeCount = a.m9n ?? 0),
                (s.MadeCountInLimitTime = a.lGs ?? 0),
                (s.IsUnlock = 1),
                (t = !0),
                r || (e = !0);
              break;
            }
          t ||
            ((i =
              ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
                a.s5n,
              )),
            (o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId)),
            (o = {
              MainType: 1,
              SubType: 0,
              UniqueId: 0,
              ConfigId: a.s5n,
              ComposeCount: a.m9n ?? 0,
              IsNew: !0,
              LastRoleId: a.cPs ?? 0,
              Quality: o.QualityId,
              EffectType: i.TypeId,
              ExistStartTime:
                MathUtils_1.MathUtils.LongToNumber(a.CPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              ExistEndTime:
                MathUtils_1.MathUtils.LongToNumber(a.gPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              MadeCountInLimitTime: a.lGs,
              TotalMakeCountInLimitTime: a.dPs,
              IsUnlock: 1,
              GroupId: 0,
              IsLimitForever: i.PermanentLimit,
              SortId: i.SortId,
            }),
            (e = !0),
            ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
              a.s5n,
            ),
            this.aTi.push(o));
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
        (35 !== this.aTi[t].SubType ||
          this.aTi[t].ConfigId !== e.FormulaItemId);
        t++
      );
      this.aTi.splice(t, 1);
    }
  }
  GetReagentProductionDataList() {
    return this.aTi;
  }
  GetReagentProductionDataById(t) {
    for (const e of this.aTi) if (t === e.ConfigId) return e;
  }
  GetReagentProductionRoleId(t) {
    t = this.GetReagentProductionDataById(t);
    return t?.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
  }
  CreateExchangeDataList() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Compose", 5, "初始化置换道具列表"),
      this.Tjl || (this.Tjl = new Array()),
      (this.Tjl.length = 0);
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetExchangeList() ?? [],
      e = new Map();
    for (const i of t) {
      var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId),
        o = {
          MainType: 4,
          ConfigId: i.ItemId,
          IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
            i.ItemId,
          ),
          LastRoleId: 0,
          Quality: o.QualityId,
          ExistStartTime: 0,
          ExistEndTime: 0,
          MadeCountInLimitTime: 0,
          TotalMakeCountInLimitTime: 0,
          IsUnlock: 1,
          ExchangeGroupId: i.GroupId,
          GroupId: i.ShowGroupId,
          IsLimitForever: !1,
          SortId: i.SortId,
        };
      this.Tjl.push(o), e.set(i.ItemId, o);
    }
  }
  GetExchangeDataById(t) {
    for (const e of this.Tjl) if (t === e.ConfigId) return e;
  }
  GetExchangeDataList() {
    return this.Tjl;
  }
  GetExchangeMaterialListByGroupIdAndQualityId(t, e) {
    var o = new Array(),
      t = this.ExchangeItemBaseMap.get(t);
    if (t)
      for (const r of t) {
        var i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(r);
        i?.GetQuality() === e &&
          o.push({ L8n: i.GetConfigId(), UVn: i.GetCount(), K6n: !0 });
      }
    return o;
  }
  GetExchangeMaterialListByGroupId(t) {
    var e = new Array(),
      t = ConfigManager_1.ConfigManager.ComposeConfig?.GetExchangeByGroupId(t);
    if (t)
      for (const i of t) {
        var o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(
          i.ItemId,
        );
        e.push({ L8n: i.ItemId, UVn: o?.GetCount() ?? 0, K6n: !0 });
      }
    return e;
  }
  CheckCanReagentProduction(t) {
    return this.CheckBaseItemData(this.GetReagentProductionDataById(t), 239);
  }
  CheckCanPurification(t) {
    return this.CheckBaseItemData(this.GetPurificationDataById(t), 239);
  }
  CheckCanStructure(t) {
    return this.CheckBaseItemData(this.GetStructureDataById(t), 239);
  }
  CheckCanExchange(t) {
    return this.CheckBaseItemData(this.GetExchangeDataById(t), 19);
  }
  CheckBaseItemData(t, e = 255) {
    var o = !0;
    return (
      (o &&= !(0 < (1 & e)) || this.CheckUnlock(t)) &&
      (!(0 < (2 & e)) || this.CheckLimitCount(t)) &&
      (!(0 < (4 & e)) || this.CheckCoinEnough(t.ConfigId)) &&
      (!(0 < (8 & e)) || this.CheckComposeMaterialEnough(t.ConfigId)) &&
      (!(0 < (16 & e)) || this.CheckExchangeMaterialEnough(t.ConfigId))
    );
  }
  CheckCoinEnough(t) {
    var e =
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t);
    return e
      ? ModelManager_1.ModelManager.InventoryModel.CheckIsCoinEnough(
          ComposeController_1.ComposeController.ComposeCoinId,
          e.ConsumeItems,
        )
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Compose",
            74,
            "合成配方不存在, 跳过CheckCoinEnough检查",
            ["id=", t],
          ),
        !0);
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
    var e =
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t);
    if (e)
      for (const i of e.ConsumeItems) {
        var o =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            i.ItemId,
          );
        if (i.Count > o) return !1;
      }
    else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Compose",
          74,
          "合成配方不存在, 跳过CheckComposeMaterialEnough检查",
          ["id=", t],
        );
    return !0;
  }
  CheckExchangeMaterialEnough(t) {
    var e = this.GetExchangeDataById(t);
    if (!e)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Compose",
            74,
            "置换数据不存在, 跳过CheckExchangeMaterialEnough检查",
            ["id=", t],
          ),
        !0
      );
    for (const o of this.GetExchangeMaterialListByGroupId(e.ExchangeGroupId))
      if (o.L8n !== t && o.UVn >= ComposeDefine_1.EXCHANGE_COUNT) return !0;
    return !1;
  }
  CreateStructureDataList(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Compose", 49, "初始化构造数据相关数据列表"),
      this.hTi || (this.hTi = new Array()),
      (this.hTi.length = 0);
    var e,
      o =
        ConfigManager_1.ConfigManager.ComposeConfig.GetComposeListByType(2) ??
        [],
      i = new Map();
    for (const s of o)
      s.FormulaItemId <= 0 ||
        ((e = ConfigManager_1.ConfigManager.ItemConfig?.GetConfig(s.ItemId)),
        (e = {
          MainType: 2,
          SubType: 37,
          ConfigId: s.Id,
          StructureCount: 0,
          IsNew: !1,
          LastRoleId: 0,
          Quality: e.QualityId,
          ExistStartTime: 0,
          ExistEndTime: 0,
          MadeCountInLimitTime: 0,
          TotalMakeCountInLimitTime: 0,
          IsUnlock: 0,
          GroupId: 0,
          IsLimitForever: s.PermanentLimit,
          SortId: s.SortId,
        }),
        i.set(e.ConfigId, e),
        this.hTi.push(e));
    for (const n of t) {
      var r =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
          n.s5n,
        );
      if (2 === r.FormulaType) {
        var a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(r.ItemId);
        let t = void 0;
        i.has(n.s5n)
          ? (((t = i.get(n.s5n)).StructureCount = n.m9n),
            (t.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
              n.s5n,
            )),
            (t.LastRoleId = n.cPs),
            (t.ExistStartTime =
              MathUtils_1.MathUtils.LongToNumber(n.CPs) *
              TimeUtil_1.TimeUtil.Millisecond),
            (t.ExistEndTime =
              MathUtils_1.MathUtils.LongToNumber(n.gPs) *
              TimeUtil_1.TimeUtil.Millisecond),
            (t.MadeCountInLimitTime = n.lGs),
            (t.TotalMakeCountInLimitTime = n.dPs),
            (t.IsUnlock = 1))
          : ((t = {
              MainType: 2,
              SubType: 0,
              ConfigId: n.s5n,
              StructureCount: n.m9n ?? 0,
              IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
                LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
                n.s5n,
              ),
              LastRoleId: n.cPs ?? 0,
              Quality: a.QualityId,
              ExistStartTime:
                MathUtils_1.MathUtils.LongToNumber(n.CPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              ExistEndTime:
                MathUtils_1.MathUtils.LongToNumber(n.gPs) *
                TimeUtil_1.TimeUtil.Millisecond,
              MadeCountInLimitTime: n.lGs,
              TotalMakeCountInLimitTime: n.dPs,
              IsUnlock: 1,
              GroupId: 0,
              IsLimitForever: r.PermanentLimit,
              SortId: r.SortId,
            }),
            this.hTi.push(t));
      }
    }
  }
  UpdateStructureDataList(t) {
    if (this.hTi && !(this.hTi.length <= 0))
      for (const r of t) {
        var o,
          i =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              r.s5n,
            );
        if (2 === i.FormulaType) {
          let t = !1,
            e = !1;
          for (const a of this.hTi)
            if (r.s5n === a.ConfigId) {
              (a.StructureCount = r.m9n ?? 0),
                (a.MadeCountInLimitTime = r.lGs ?? 0),
                (t = !0),
                (e = !a.IsUnlock),
                (a.IsUnlock = 1);
              break;
            }
          (!e && t) ||
            (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
              LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
              r.s5n,
            ),
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "FormulaLearned",
            )),
            t ||
              ((o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
                i.ItemId,
              )),
              (o = {
                MainType: 2,
                SubType: 0,
                ConfigId: r.s5n,
                StructureCount: r.m9n ?? 0,
                IsNew: !0,
                LastRoleId: r.cPs ?? 0,
                Quality: o.QualityId,
                ExistStartTime:
                  MathUtils_1.MathUtils.LongToNumber(r.CPs) *
                  TimeUtil_1.TimeUtil.Millisecond,
                ExistEndTime:
                  MathUtils_1.MathUtils.LongToNumber(r.gPs) *
                  TimeUtil_1.TimeUtil.Millisecond,
                MadeCountInLimitTime: r.lGs,
                TotalMakeCountInLimitTime: r.dPs,
                IsUnlock: 1,
                GroupId: 0,
                IsLimitForever: i.PermanentLimit,
                SortId: i.SortId,
              }),
              this.hTi.push(o));
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
        (37 !== this.hTi[t].SubType ||
          this.hTi[t].ConfigId !== e.FormulaItemId);
        t++
      );
      this.hTi.splice(t, 1);
    }
  }
  HideStructureDataList(t) {
    for (const o of t) {
      var e =
        ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(o);
      if (2 === e.FormulaType) {
        let t = 0;
        for (; t < this.hTi.length && this.hTi[t].ConfigId !== o; t++);
        this.hTi.splice(t, 1);
      }
    }
  }
  GetStructureDataList() {
    return this.hTi;
  }
  GetStructureDataById(t) {
    for (const e of this.hTi) if (t === e.ConfigId) return e;
  }
  GetStructureRoleId(t) {
    t = this.GetStructureDataById(t);
    return t && t.LastRoleId
      ? t.LastRoleId
      : ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
  }
  CreatePurificationDataList() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Compose", 49, "初始化纯化数据相关数据列表"),
      this.lTi || (this.lTi = new Array());
    for (const e of ConfigManager_1.ConfigManager.ComposeConfig.GetComposeListByType(
      3,
    )) {
      var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId),
        t = {
          MainType: 3,
          ConfigId: e.Id,
          IsUnlock: 0,
          IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
            LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey,
            e.Id,
          ),
          Quality: t.QualityId,
          LastRoleId: 0,
          ExistStartTime: 0,
          ExistEndTime: 0,
          MadeCountInLimitTime: 0,
          TotalMakeCountInLimitTime: 0,
          IsLimitForever: e.PermanentLimit,
          GroupId: e.ItemGroup,
          SortId: e.SortId,
        };
      this.lTi.push(t);
    }
  }
  UpdatePurificationDataList(t) {
    if (this.lTi && !(this.lTi.length <= 0))
      for (const o of t) {
        var e =
          ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
            o.s5n,
          );
        if (3 === e.FormulaType)
          for (const i of this.lTi)
            if (o.s5n === i.ConfigId) {
              (i.IsUnlock = 1),
                (i.LastRoleId = o.cPs ?? 0),
                (i.ExistStartTime =
                  MathUtils_1.MathUtils.LongToNumber(o.CPs) *
                  TimeUtil_1.TimeUtil.Millisecond),
                (i.ExistEndTime =
                  MathUtils_1.MathUtils.LongToNumber(o.gPs) *
                  TimeUtil_1.TimeUtil.Millisecond),
                (i.MadeCountInLimitTime = o.lGs),
                (i.TotalMakeCountInLimitTime = o.dPs);
              break;
            }
      }
  }
  GetPurificationDataList() {
    return this.lTi;
  }
  GetPurificationDataById(t) {
    for (const e of this.lTi) if (t === e.ConfigId) return e;
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
    let o = t + 1;
    return o > e && (o = e), this.GetComposeLevelByLevel(o).Completeness;
  }
  GetDropIdByLevel(t) {
    t += 1;
    return this.GetComposeMaxLevel() < t
      ? -1
      : this.GetComposeLevelByLevel(t).DropIds;
  }
  GetComposeMaterialList(t) {
    var e = new Array();
    for (const o of ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
      t,
    ).ConsumeItems)
      e.push({ L8n: o.ItemId, UVn: o.Count, K6n: !0 });
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
  GetSameGroupItem(t) {
    var e = [],
      o = t.GroupId,
      t = t.MainType;
    if (3 === t) for (const i of this.lTi) i.GroupId === o && e.push(i);
    else if (4 === t) for (const r of this.Tjl) r.GroupId === o && e.push(r);
    return e.sort((t, e) => t.Quality - e.Quality);
  }
}
exports.ComposeModel = ComposeModel;
//# sourceMappingURL=ComposeModel.js.map
