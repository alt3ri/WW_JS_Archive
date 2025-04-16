"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  InputKeyDisplayData_1 = require("../../InputSettings/InputKeyDisplayData"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  RouletteDefine_1 = require("./Data/RouletteDefine"),
  RouletteController_1 = require("./RouletteController");
class RouletteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.RelatedTagEntityHandle = void 0),
      (this.RelatedTagIdPriorityList = []),
      (this.RelatedTagIdExistPriorityList = []),
      (this.cB_ = new Map()),
      (this.uB_ = void 0),
      (this.dB_ = 0),
      (this.mB_ = []),
      (this.Kvc = void 0),
      (this.Xvc = []),
      (this.Yvc = []),
      (this.H0o = 0),
      (this.j0o = 0),
      (this.fB_ = []),
      (this.OnSettingExploreSkillIdList = []),
      (this.UnlockExploreSkillDataMap = new Map()),
      (this.w8_ = []),
      (this.W0o = (e, t) => e.SortId - t.SortId),
      (this.zvc = []),
      (this.K0o = new Map()),
      (this.UnlockFunctionDataMap = new Map()),
      (this.Q0o = (e, t) => e.SortId - t.SortId),
      (this.X0o = (e, t) => {
        e = this.K0o.get(e);
        void 0 !== e && (t ? this.$0o(e) : this.dqt(e));
      }),
      (this.CurrentEquipItemId = 0),
      (this.XPn = new InputKeyDisplayData_1.InputKeyDisplayData()),
      (this.GetRouletteActionName = {
        [1]: InputMappingsDefine_1.actionMappings.幻象探索选择界面,
        2: InputMappingsDefine_1.actionMappings.轮盘2,
      });
  }
  IsExploreRouletteOpen(e = !1) {
    return !ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
      203,
    )?.HasAnyTag(this.GetExploreRouletteBanTagIds()) &&
      ModelManager_1.ModelManager.LevelFuncFlagModel.GetFuncFlagEnable(1)
      ? ModelManager_1.ModelManager.FunctionModel.IsOpen(10026)
      : (e &&
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
            "ExploreToolCantOpen",
          ),
        !1);
  }
  IsFunctionRouletteOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10056);
  }
  OnInit() {
    return (
      this.Y0o(),
      this.gB_(),
      this.Jvc(),
      this.AddEvents(),
      !(this.OnSettingExploreSkillIdList.length = 0)
    );
  }
  OnClear() {
    return this.RemoveEvents(), !0;
  }
  GetExploreRouletteBanTagIds() {
    var e =
        ConfigManager_1.ConfigManager.RouletteConfig.GetExploreRouletteConfig(),
      t = new Array();
    if (0 !== e.length)
      for (const i of e[0].BanTags) {
        var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i);
        o
          ? t.push(o)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Phantom",
              37,
              "探索工具轮盘禁用Tag不存在,请检查配置",
              ["tagName", i],
            );
      }
    return t;
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFunctionOpenSet,
      this.X0o,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.X0o,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFunctionOpenSet,
      this.X0o,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.X0o,
      );
  }
  gB_() {
    this.cB_.clear(),
      (this.RelatedTagIdPriorityList.length = 0),
      (this.RelatedTagIdExistPriorityList.length = 0);
    var e = [];
    for (const i of ConfigManager_1.ConfigManager.RouletteConfig.GetAllReplaceConfig())
      for (const r of i.TagsInForce) {
        var t,
          o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r);
        o
          ? ((t = { TagId: o, SortId: i.Priority, ReplaceId: i.Id }),
            e.push(t),
            this.cB_.set(o, i.Id))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Phantom",
              37,
              "[ExploreRoulette] 探索工具轮盘禁用Tag不存在,请检查配置",
              ["tagName", r],
            );
      }
    e.sort((e, t) => e.SortId - t.SortId);
    for (const n of e)
      this.RelatedTagIdPriorityList.push(n.TagId),
        this.RelatedTagIdExistPriorityList.push(!1);
  }
  ActiveReplaceConfig(t) {
    t = ModelManager_1.ModelManager.RouletteModel.cB_.get(t);
    if (this.uB_ !== t) {
      this.uB_ = t;
      var o =
        ConfigManager_1.ConfigManager.RouletteConfig.GetReplaceConfigById(t);
      if (
        o.RouletteSkillIdList.length !==
        RouletteDefine_1.ROULETTE_EXPLORE_IN_USE
      )
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            37,
            "[ExploreRoulette] 替换配置探索技能数量错误",
            ["ReplaceId", t],
          );
      else {
        (this.mB_.length = 0),
          this.mB_.push(...o.RouletteSkillIdList),
          this.mB_.push(0, 0);
        let e = o.RouletteItemId;
        !e ||
          0 <
            ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
              e,
            ) ||
          (e = 0),
          RouletteController_1.RouletteController.SaveCurrentRouletteData(
            void 0,
            void 0,
            e,
          ),
          this.ExploreSkillIdListServer.includes(this.H0o)
            ? (this.dB_ = this.H0o)
            : ((t = this.w8_[0]), (this.dB_ = t));
        t = o.ReplaceSkillId;
        ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(t),
          RouletteController_1.RouletteController.ExploreSkillSetRequest(
            t,
            void 0,
            !0,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Phantom",
              37,
              "[ExploreRoulette] 进入替换模式",
              ["ReplaceId", this.uB_],
              ["ReplaceSkillId", t],
              ["RestoreSkillId", this.dB_],
            );
      }
    }
  }
  DisActiveReplaceConfig() {
    var e;
    this.uB_ &&
      ((this.uB_ = void 0),
      (e = this.dB_) &&
        (ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e),
        RouletteController_1.RouletteController.ExploreSkillSetRequest(
          e,
          void 0,
          !0,
        )),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 37, "[ExploreRoulette] 退出替换模式", [
          "RestoreSkillId",
          e,
        ]),
      (this.dB_ = 0));
  }
  IsExploreRouletteReplace() {
    return !!this.uB_;
  }
  Jvc() {
    this.Xvc.length = 0;
    for (const e of ConfigManager_1.ConfigManager.RouletteConfig.GetAllFuncReplaceConfig())
      this.Xvc.push(e.InstSubType);
  }
  TryActiveFunctionRouletteReplaceConfig(e) {
    var t;
    this.Xvc.includes(e)
      ? ((t = (e =
          ConfigManager_1.ConfigManager.RouletteConfig.GetFuncReplaceConfig(e))
          .Id),
        this.Kvc !== t &&
          ((this.Kvc = t),
          e.FuncMenuIdList.length !== RouletteDefine_1.ROULETTE_FUNCTION_IN_USE
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Phantom",
                37,
                "[FunctionRoulette] 替换配置功能轮盘Id数量错误",
                ["ReplaceId", t],
              )
            : ((this.Yvc.length = 0),
              this.Yvc.push(...e.FuncMenuIdList),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Phantom",
                  37,
                  "[FunctionRoulette] 功能轮盘进入替换模式",
                  ["ReplaceId", this.Kvc],
                ))))
      : this.DisActiveFunctionRouletteReplaceConfig();
  }
  DisActiveFunctionRouletteReplaceConfig() {
    this.Kvc &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Phantom",
          37,
          "[FunctionRoulette] 功能轮盘退出替换模式",
          ["LastReplaceId", this.Kvc],
        ),
      (this.Kvc = void 0));
  }
  IsFunctionRouletteReplace() {
    return !!this.Kvc;
  }
  get ExploreSkillIdList() {
    return this.IsExploreRouletteReplace() ? this.mB_ : this.fB_;
  }
  get ExploreSkillIdListServer() {
    return this.fB_;
  }
  set CurrentExploreSkillId(e) {
    this.H0o !== e &&
      ((this.j0o = this.H0o),
      (this.H0o = e),
      this.J0o(this.H0o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 37, "设置新探索技能Id成功", ["Id", this.H0o]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
      ));
  }
  get CurrentExploreSkillId() {
    return this.H0o;
  }
  z0o(e) {
    this.fB_ = e;
  }
  get CurrentExploreSkillIcon() {
    if (0 !== this.H0o)
      return this.IsEquipItemSelectOn
        ? 0 === this.CurrentEquipItemId
          ? void 0
          : ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
              this.CurrentEquipItemId,
            )?.Icon
        : (
            this.UnlockExploreSkillDataMap.get(this.H0o) ||
            ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(
              this.H0o,
            )
          ).BattleViewIcon;
  }
  GetLastSkillId() {
    return 0 !== this.j0o ? this.j0o : 0 === this.w8_.length ? 0 : this.w8_[0];
  }
  GetExploreDataBySkillId(e) {
    if (this.UnlockExploreSkillDataMap.has(e))
      return this.UnlockExploreSkillDataMap.get(e);
  }
  UnlockExploreSkill(e, t = !0) {
    var o =
      ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    2 !== o.SkillType &&
      3 !== o.SkillType &&
      (this.UnlockExploreSkillDataMap.set(e, o),
      1 === o.SkillType && this.w8_.push(e),
      t) &&
      (this.TryAddRedDotItem(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddExploreVisionSkill,
        e,
      ));
  }
  CreateAllUnlockExploreSkill(e) {
    this.UnlockExploreSkillDataMap.clear(), (this.w8_.length = 0);
    for (const t of e) this.UnlockExploreSkill(t, !1);
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 37, "设置当前解锁的探索技能", ["技能列表", e]);
  }
  efo() {
    var e = [];
    for (const i of this.w8_) {
      var t = this.UnlockExploreSkillDataMap.get(i),
        o = new RouletteDefine_1.AssemblyExploreGridData();
      (o.GridType = 0),
        (o.IconPath = t.BackGround),
        (o.Name = t.Name),
        (o.Id = i),
        (o.SortId = t.SortId),
        e.push(o);
    }
    return e.sort(this.W0o), e;
  }
  GetDefaultExploreSkillIdList() {
    var t = new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
    const o = [];
    this.UnlockExploreSkillDataMap.forEach((e, t) => {
      e.AutoFill && o.push([t, e.SortId]);
    }),
      o.sort((e, t) => e[1] - t[1]);
    var i = Math.min(o.length, t.length);
    for (let e = 0; e < i; e++) t[e] = o[e][0];
    return t;
  }
  get FunctionIdListServer() {
    return this.zvc;
  }
  get FunctionIdList() {
    return this.IsFunctionRouletteReplace() ? this.Yvc : this.zvc;
  }
  SetFunctionIdList(e) {
    this.zvc = e;
  }
  GetFuncDataByFuncId(e) {
    if (this.UnlockFunctionDataMap.has(e))
      return this.UnlockFunctionDataMap.get(e);
  }
  Y0o() {
    for (const e of ConfigManager_1.ConfigManager.RouletteConfig.GetAllFuncConfig())
      e.UnlockCondition
        ? this.K0o.set(e.UnlockCondition, e.FuncId)
        : this.UnlockFunctionDataMap.set(e.FuncId, e);
  }
  $0o(e) {
    var t = ConfigManager_1.ConfigManager.RouletteConfig.GetFuncConfigById(e);
    t &&
      !this.UnlockFunctionDataMap.has(e) &&
      this.UnlockFunctionDataMap.set(e, t);
  }
  dqt(e) {
    this.UnlockFunctionDataMap.has(e) &&
      (this.UnlockFunctionDataMap.delete(e), 0 <= (e = this.zvc.indexOf(e))) &&
      (this.zvc[e] = 0);
  }
  ifo() {
    var e,
      t,
      o,
      i = [];
    for ([e, t] of this.UnlockFunctionDataMap.entries())
      t.ShowInAssembly &&
        (((o = new RouletteDefine_1.AssemblyFunctionGridData()).GridType = 1),
        (o.IconPath = t.FuncMenuIconPath),
        (o.Name = t.FuncName),
        (o.Id = e),
        (o.SortId = t.FuncMenuSequence),
        i.push(o));
    return i.sort(this.Q0o), i;
  }
  GetDefaultFunctionIdList() {
    var t = new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
    const o = [];
    this.UnlockFunctionDataMap.forEach((e, t) => {
      e.AutoEquip && o.push([t, e.FuncMenuSequence]);
    }),
      o.sort((e, t) => e[1] - t[1]);
    var i = Math.min(o.length, t.length);
    for (let e = 0; e < i; e++) t[e] = o[e][0];
    return t;
  }
  CB_(e) {
    var t = this.rfo(),
      e = ((this.CurrentEquipItemId = e), this.rfo());
    e
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSpecialItemUpdate,
          this.CurrentEquipItemId,
        )
      : t &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSpecialItemUpdate,
          void 0,
        );
  }
  get IsEquipItemSelectOn() {
    return 3001 === this.CurrentExploreSkillId;
  }
  get EquipItemType() {
    if (0 !== this.CurrentEquipItemId)
      return ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(
        this.CurrentEquipItemId,
      )
        ? 13
        : 1;
  }
  sfo() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(
      13,
    )) {
      var t = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(
        r.GetConfigId(),
      );
      t &&
        0 === t.SpecialItemType &&
        (((t = new RouletteDefine_1.AssemblyEquipItemGridData()).Id =
          r.GetConfigId()),
        (t.GridType = 2),
        (t.Name = r.GetConfig().Name),
        (t.ItemNum = r.GetCount()),
        (t.ItemType = 13),
        (t.SortId = r.GetSortIndex()),
        (t.QualityId = r.GetQuality()),
        e.push(t));
    }
    var o = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "Roulette_EquipItem_ShowTypeList",
    );
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(
      1,
    )) {
      var i = n.GetConfig().ItemBuffType;
      o.includes(i) &&
        (((i = new RouletteDefine_1.AssemblyEquipItemGridData()).Id =
          n.GetConfigId()),
        (i.GridType = 2),
        (i.Name = n.GetConfig().Name),
        (i.ItemNum = n.GetCount()),
        (i.ItemType = 1),
        (i.SortId = n.GetSortIndex()),
        (i.QualityId = n.GetQuality()),
        e.push(i));
    }
    return e;
  }
  afo() {
    this.IsEquipItemSelectOn &&
      (0 === this.CurrentEquipItemId
        ? RouletteController_1.RouletteController.SetLastSkillId()
        : RouletteController_1.RouletteController.RefreshExploreSkillButton());
  }
  rfo() {
    return (
      !!this.CurrentEquipItemId &&
      SpecialItemController_1.SpecialItemController.IsSpecialItem(
        this.CurrentEquipItemId,
      )
    );
  }
  IsExploreSkillHasNum() {
    var e;
    return this.IsEquipItemSelectOn
      ? 1 === this.EquipItemType ||
          (ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(
            this.CurrentEquipItemId,
          )?.NeedShowNum ??
            !1)
      : !!(e = this.UnlockExploreSkillDataMap.get(
          this.CurrentExploreSkillId,
        )) && !!((e = e.Cost) && 0 < e.size);
  }
  GetExploreSkillShowNum() {
    var e;
    return this.IsEquipItemSelectOn
      ? ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
          this.CurrentEquipItemId,
        )
      : (e = this.UnlockExploreSkillDataMap.get(this.CurrentExploreSkillId)) &&
          (e = e.Cost) &&
          0 < e.size
        ? (([e] = e.keys()),
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e))
        : 0;
  }
  IsExploreSkillHasSetNum(e) {
    switch (e) {
      case 1010:
      case 1012:
      case 1018:
      case 1011:
        return !0;
    }
    return !1;
  }
  GetExploreSkillShowSetNumById(e) {
    switch (e) {
      case 1010:
        var t =
          ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceLimit(e);
        return [
          ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceNum(e) ??
            0,
          t ?? 0,
        ];
      case 1012:
        t =
          ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceLimit(e);
        return [
          ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceNum(e) ??
            0,
          t ?? 0,
        ];
      case 1011:
        t =
          ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceLimit(e);
        return [
          ModelManager_1.ModelManager.MapExploreToolModel.GetToolPlaceNum(e) ??
            0,
          t ?? 0,
        ];
      case 1018:
        t = ModelManager_1.ModelManager.FishingModel.GetTempFishingPointLimit();
        return [
          ModelManager_1.ModelManager.FishingModel.GetTempFishingPointNum() ??
            0,
          t ?? 0,
        ];
    }
    return [0, 0];
  }
  IsEquipItemInBuffCd() {
    return (
      !!this.IsEquipItemSelectOn &&
      !!ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(
        this.CurrentEquipItemId,
      ) &&
      0 <
        ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
          this.CurrentEquipItemId,
        ) -
          TimeUtil_1.TimeUtil.TimeDeviation
    );
  }
  IsEquippedItemBanReqUse() {
    return (
      !!this.IsEquipItemSelectOn &&
      !!SpecialItemController_1.SpecialItemController.IsSpecialItem(
        this.CurrentEquipItemId,
      ) &&
      !SpecialItemController_1.SpecialItemController.AllowReqUseSpecialItem(
        this.CurrentEquipItemId,
      )
    );
  }
  SaveRedDotItemList() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
      LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RouletteRefreshRedDot,
      );
  }
  TryAddRedDotItem(e) {
    return (
      0 !== e &&
      (ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot,
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RouletteRefreshRedDot,
      ),
      !0)
    );
  }
  TryRemoveRedDotItem(e) {
    return (
      0 !== e &&
      ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAssemblyItemRedDot,
        e,
      )
    );
  }
  CheckHasAnyRedDotItem() {
    for (const e of this.w8_)
      if (
        ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .RouletteAssemblyItemRedDot,
          e,
        )
      )
        return !0;
    return !1;
  }
  UpdateRouletteData(i) {
    if (0 === i.length)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 37, "当前不存在保存的轮盘数据");
    else {
      let e = i[0]?.KHn,
        t =
          ((e = e || new Array(RouletteDefine_1.ROULETTE_NUM).fill(0)),
          this.z0o(e),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 37, "探索技能列表", ["Id", e]),
          i[0]?.QHn),
        o =
          (void 0 === t && (t = 0),
          this.CB_(t),
          this.afo(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 37, "装配道具", ["Id", t]),
          i[1]?.KHn);
      (o = o || new Array(RouletteDefine_1.ROULETTE_NUM).fill(0)),
        this.SetFunctionIdList(o),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 37, "功能轮盘列表", ["Id", o]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRouletteSaveDataChange,
        );
    }
  }
  GetRouletteGridId(e, t, o) {
    switch (t) {
      case 0:
        return (o ? this.ExploreSkillIdList : this.ExploreSkillIdListServer)[e];
      case 1:
        return (o ? this.FunctionIdList : this.FunctionIdListServer)[e];
      case 2:
        return this.CurrentEquipItemId;
    }
  }
  CreateAssemblyGridData() {
    var e = new Map();
    return e.set(0, this.efo()), e.set(1, this.ifo()), e.set(2, this.sfo()), e;
  }
  CreateTempAssemblyIdListData(e, t, o) {
    var i = new Map();
    return i.set(0, Array.from(e)), i.set(1, Array.from(t)), i.set(2, [o]), i;
  }
  CreateDefaultAssemblyData(e) {
    return this.CreateTempAssemblyIdListData(
      this.GetDefaultExploreSkillIdList(),
      this.GetDefaultFunctionIdList(),
      e ?? 0,
    );
  }
  GetRouletteKeyRichText(e) {
    this.XPn.Reset();
    var e = InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
      this.XPn,
      e,
    );
    return (e = e && this.XPn.GetDisplayKeyIconPathList(0)) && 0 !== e.length
      ? `<texture=${e[0]}>`
      : "";
  }
  GetRouletteMainAction(e) {
    return InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
      this.XPn,
      e,
    ) && this.XPn.IsCombination
      ? InputMappingsDefine_1.actionMappings.组合主键
      : e;
  }
  GetRouletteSelectConfig() {
    return (
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadRouletteSelectConfig,
      ) ?? 1
    );
  }
  SaveRouletteSelectConfig(e) {
    LocalStorage_1.LocalStorage.SetGlobal(
      LocalStorageDefine_1.ELocalStorageGlobalKey.GamepadRouletteSelectConfig,
      e,
    );
  }
  GetRouletteActionOpenConfig(e) {
    var t = 1 === e ? 0 : 1;
    return Info_1.Info.IsInGamepad()
      ? ((e =
          1 === e
            ? LocalStorageDefine_1.ELocalStoragePlayerKey
                .RouletteAction01OpenConfig
            : LocalStorageDefine_1.ELocalStoragePlayerKey
                .RouletteAction02OpenConfig),
        LocalStorage_1.LocalStorage.GetPlayer(e) ?? t)
      : t;
  }
  SaveRouletteActionOpenConfig(e, t) {
    e =
      1 === e
        ? LocalStorageDefine_1.ELocalStoragePlayerKey.RouletteAction01OpenConfig
        : LocalStorageDefine_1.ELocalStoragePlayerKey
            .RouletteAction02OpenConfig;
    LocalStorage_1.LocalStorage.SetPlayer(e, t);
  }
  J0o(e) {
    var t = new LogReportDefine_1.ExploreToolSwitchLogData(),
      o = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    const i = [];
    o.Authorization.forEach((e, t) => {
      0 <
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) &&
        i.push([t, e]);
    }),
      (t.o_authorization = i),
      (t.i_explore_tool_id = e),
      LogReportController_1.LogReportController.LogReport(t);
  }
  SendExploreToolEquipLogData(e, t, o) {
    var i = new LogReportDefine_1.ExploreToolEquipLogData(),
      r = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    const n = [];
    r.Authorization.forEach((e, t) => {
      0 <
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) &&
        n.push([t, e]);
    }),
      (i.o_authorization = n),
      (i.i_explore_tool_id = e),
      (i.i_operation = t),
      void 0 !== o && (i.i_item_id = o),
      LogReportController_1.LogReportController.LogReport(i);
  }
  SendExploreToolItemUseLogData(e) {
    var t = new LogReportDefine_1.ExploreToolItemUseLogData(),
      o =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy;
    (t.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
      (t.i_father_area_id =
        ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
      (t.f_pos_x = o.X),
      (t.f_pos_y = o.Y),
      (t.f_pos_z = o.Z),
      (t.i_item_id = e),
      LogReportController_1.LogReportController.LogReport(t);
  }
}
exports.RouletteModel = RouletteModel;
//# sourceMappingURL=RouletteModel.js.map
