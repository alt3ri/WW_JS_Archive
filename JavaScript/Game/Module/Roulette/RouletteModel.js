"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  InputKeyDisplayData_1 = require("../../InputSettings/InputKeyDisplayData"),
  InputSettings_1 = require("../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  RouletteDefine_1 = require("./Data/RouletteDefine"),
  RouletteController_1 = require("./RouletteController"),
  RouletteGridData_1 = require("./RouletteGrid/RouletteGridData");
class RouletteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentRouletteType = 0),
      (this.H0o = 0),
      (this.j0o = 0),
      (this.ExploreSkillIdList = []),
      (this.UnlockExploreSkillDataMap = new Map()),
      (this.W0o = (e, t) => e.SortId - t.SortId),
      (this.CurrentFunctionIdList = []),
      (this.K0o = new Map()),
      (this.UnlockFunctionDataMap = new Map()),
      (this.Q0o = (e, t) => e.SortId - t.SortId),
      (this.X0o = (e, t) => {
        e = this.K0o.get(e);
        void 0 !== e && (t ? this.$0o(e) : this.dqt(e));
      }),
      (this.CurrentEquipItemId = 0),
      (this.XPn = new InputKeyDisplayData_1.InputKeyDisplayData());
  }
  IsExploreRouletteOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10026);
  }
  IsFunctionRouletteOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10056);
  }
  OnInit() {
    return this.Y0o(), this.AddEvents(), !0;
  }
  OnClear() {
    return this.RemoveEvents(), !0;
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
  set CurrentExploreSkillId(e) {
    this.H0o !== e &&
      ((this.j0o = this.H0o),
      (this.H0o = e),
      this.J0o(this.H0o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 38, "设置新探索技能Id成功", ["Id", this.H0o]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnChangeSelectedExploreId,
      ));
  }
  get CurrentExploreSkillId() {
    return this.H0o;
  }
  z0o(e) {
    this.ExploreSkillIdList = e;
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
    return 0 !== this.j0o
      ? this.j0o
      : this.UnlockExploreSkillDataMap.keys()?.next().value;
  }
  GetExploreDataBySkillId(e) {
    if (this.UnlockExploreSkillDataMap.has(e))
      return this.UnlockExploreSkillDataMap.get(e);
  }
  UnlockExploreSkill(e) {
    var t =
      ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    1 === t.SkillType &&
      (this.UnlockExploreSkillDataMap.set(e, t),
      this.TryAddRedDotItem(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AddExploreVisionSkill,
        e,
      ));
  }
  CreateAllUnlockExploreSkill(e) {
    this.UnlockExploreSkillDataMap.clear();
    for (const r of e) {
      var t =
        ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(r);
      1 === t.SkillType && this.UnlockExploreSkillDataMap.set(r, t);
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Phantom", 38, "设置当前解锁的探索技能", ["技能列表", e]);
  }
  Z0o(e) {
    var t;
    if (!(e > this.ExploreSkillIdList.length))
      return (
        ((t = new RouletteGridData_1.RouletteData()).Id =
          this.ExploreSkillIdList[e]),
        t
      );
  }
  efo() {
    const i = [];
    return (
      this.UnlockExploreSkillDataMap.forEach((e, t) => {
        var r = new RouletteDefine_1.AssemblyExploreGridData();
        (r.GridType = 0),
          (r.IconPath = e.BackGround),
          (r.Name = e.Name),
          (r.Id = t),
          (r.SortId = e.SortId),
          i.push(r);
      }),
      i.sort(this.W0o),
      i
    );
  }
  GetDefaultExploreSkillIdList() {
    var t = new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
    const r = [];
    this.UnlockExploreSkillDataMap.forEach((e, t) => {
      e.AutoFill && r.push([t, e.SortId]);
    }),
      r.sort((e, t) => e[1] - t[1]);
    var i = Math.min(r.length, t.length);
    for (let e = 0; e < i; e++) t[e] = r[e][0];
    return t;
  }
  SetFunctionIdList(e) {
    this.CurrentFunctionIdList = e;
  }
  GetFuncDataByFuncId(e) {
    if (this.UnlockFunctionDataMap.has(e))
      return this.UnlockFunctionDataMap.get(e);
  }
  Y0o() {
    for (const e of ConfigManager_1.ConfigManager.RouletteConfig.GetAllFuncConfig())
      this.K0o.set(e.UnlockCondition, e.FuncId);
  }
  tfo(e) {
    var t;
    if (!(e > this.CurrentFunctionIdList.length))
      return (
        ((t = new RouletteGridData_1.RouletteData()).Id =
          this.CurrentFunctionIdList[e]),
        t
      );
  }
  $0o(e) {
    var t = ConfigManager_1.ConfigManager.RouletteConfig.GetFuncConfigById(e);
    t &&
      !this.UnlockFunctionDataMap.has(e) &&
      this.UnlockFunctionDataMap.set(e, t);
  }
  dqt(e) {
    this.UnlockFunctionDataMap.has(e) &&
      (this.UnlockFunctionDataMap.delete(e),
      0 <= (e = this.CurrentFunctionIdList.indexOf(e))) &&
      (this.CurrentFunctionIdList[e] = 0);
  }
  ifo() {
    const i = [];
    return (
      this.UnlockFunctionDataMap.forEach((e, t) => {
        var r = new RouletteDefine_1.AssemblyFunctionGridData();
        (r.GridType = 1),
          (r.IconPath = e.FuncMenuIconPath),
          (r.Name = e.FuncName),
          (r.Id = t),
          (r.SortId = e.FuncMenuSequence),
          i.push(r);
      }),
      i.sort(this.Q0o),
      i
    );
  }
  GetDefaultFunctionIdList() {
    var t = new Array(RouletteDefine_1.ROULETTE_NUM).fill(0);
    const r = [];
    this.UnlockFunctionDataMap.forEach((e, t) => {
      e.AutoEquip && r.push([t, e.FuncMenuSequence]);
    }),
      r.sort((e, t) => e[1] - t[1]);
    var i = Math.min(r.length, t.length);
    for (let e = 0; e < i; e++) t[e] = r[e][0];
    return t;
  }
  SetCurrentEquipItemId(e) {
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
  nfo(e) {
    var t = new RouletteGridData_1.RouletteData();
    return 0 !== this.CurrentEquipItemId && (t.Id = this.CurrentEquipItemId), t;
  }
  sfo() {
    var e = [];
    for (const n of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(
      13,
    )) {
      var t = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(
        n.GetConfigId(),
      );
      t &&
        0 === t.SpecialItemType &&
        (((t = new RouletteDefine_1.AssemblyEquipItemGridData()).Id =
          n.GetConfigId()),
        (t.GridType = 2),
        (t.Name = n.GetConfig().Name),
        (t.ItemNum = n.GetCount()),
        (t.ItemType = 13),
        (t.SortId = n.GetSortIndex()),
        (t.QualityId = n.GetQuality()),
        e.push(t));
    }
    var r = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "Roulette_EquipItem_ShowTypeList",
    );
    for (const o of ModelManager_1.ModelManager.InventoryModel.GetCommonItemByItemType(
      1,
    )) {
      var i = o.GetConfig().ItemBuffType;
      r.includes(i) &&
        (((i = new RouletteDefine_1.AssemblyEquipItemGridData()).Id =
          o.GetConfigId()),
        (i.GridType = 2),
        (i.Name = o.GetConfig().Name),
        (i.ItemNum = o.GetCount()),
        (i.ItemType = 1),
        (i.SortId = o.GetSortIndex()),
        (i.QualityId = o.GetQuality()),
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
    for (const e of this.UnlockExploreSkillDataMap.keys())
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
  SaveCurrentRouletteData(e, t, r, i = !1, n) {
    RouletteController_1.RouletteController.SaveRouletteDataRequest(
      e ?? this.ExploreSkillIdList,
      t ?? this.CurrentFunctionIdList,
      r ?? this.CurrentEquipItemId,
      i,
      n,
    );
  }
  UpdateRouletteData(i) {
    if (0 === i.length)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 38, "当前不存在保存的轮盘数据");
    else {
      let e = i[0]?.GHn,
        t =
          ((e = e || new Array(RouletteDefine_1.ROULETTE_NUM).fill(0)),
          this.z0o(e),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 38, "探索技能列表", ["Id", e]),
          i[0]?.OHn),
        r =
          (void 0 === t && (t = 0),
          this.SetCurrentEquipItemId(t),
          this.afo(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 38, "装配道具", ["Id", t]),
          i[1]?.GHn);
      (r = r || new Array(RouletteDefine_1.ROULETTE_NUM).fill(0)),
        this.SetFunctionIdList(r),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "功能轮盘列表", ["Id", r]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRouletteSaveDataChange,
        );
    }
  }
  CopyRouletteData(e) {
    var t = new RouletteGridData_1.RouletteData();
    return (
      (t.DataIndex = e?.DataIndex),
      (t.GridIndex = e?.GridIndex),
      (t.GridType = e?.GridType),
      (t.Id = e?.Id),
      (t.Name = e?.Name),
      (t.State = e?.State),
      (t.ShowIndex = e?.ShowIndex),
      (t.ShowRedDot = e?.ShowRedDot),
      t
    );
  }
  CreateGridData(e, t) {
    switch (t) {
      case 0:
        return this.Z0o(e);
      case 1:
        return this.tfo(e);
      case 2:
        return this.nfo(e);
    }
  }
  CreateAssemblyGridData() {
    var e = new Map();
    return e.set(0, this.efo()), e.set(1, this.ifo()), e.set(2, this.sfo()), e;
  }
  CreateTempAssemblyIdListData(e, t, r) {
    var i = new Map(),
      n = [];
    for (const a of e) n.push(a);
    i.set(0, n);
    var o = [];
    for (const s of t) o.push(s);
    return i.set(1, o), i.set(2, r), i;
  }
  CreateTempAssemblyData() {
    return this.CreateTempAssemblyIdListData(
      this.ExploreSkillIdList,
      this.CurrentFunctionIdList,
      [this.CurrentEquipItemId],
    );
  }
  CreateDefaultAssemblyData(e) {
    return this.CreateTempAssemblyIdListData(
      this.GetDefaultExploreSkillIdList(),
      this.GetDefaultFunctionIdList(),
      e ?? [0],
    );
  }
  GetRouletteKeyRichText() {
    var e;
    return InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
      this.XPn,
      InputMappingsDefine_1.actionMappings.幻象探索选择界面,
    ) &&
      (e = this.XPn.GetDisplayKeyNameList()) &&
      0 !== e.length
      ? `<texture=${InputSettings_1.InputSettings.GetKeyIconPath(e[0])}>`
      : "";
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
  J0o(e) {
    var t = new LogReportDefine_1.ExploreToolSwitchLogData(),
      r = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    const i = [];
    r.Authorization.forEach((e, t) => {
      0 <
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) &&
        i.push([t, e]);
    }),
      (t.o_authorization = i),
      (t.i_explore_tool_id = e),
      LogReportController_1.LogReportController.LogReport(t);
  }
  SendExploreToolEquipLogData(e, t, r) {
    var i = new LogReportDefine_1.ExploreToolEquipLogData(),
      n = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    const o = [];
    n.Authorization.forEach((e, t) => {
      0 <
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) &&
        o.push([t, e]);
    }),
      (i.o_authorization = o),
      (i.i_explore_tool_id = e),
      (i.i_operation = t),
      void 0 !== r && (i.i_item_id = r),
      LogReportController_1.LogReportController.LogReport(i);
  }
  SendExploreToolItemUseLogData(e) {
    var t = new LogReportDefine_1.ExploreToolItemUseLogData(),
      r =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy;
    (t.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId),
      (t.i_father_area_id =
        ModelManager_1.ModelManager.AreaModel.AreaInfo.Father),
      (t.f_pos_x = r.X),
      (t.f_pos_y = r.Y),
      (t.f_pos_z = r.Z),
      (t.i_item_id = e),
      LogReportController_1.LogReportController.LogReport(t);
  }
}
exports.RouletteModel = RouletteModel;
//# sourceMappingURL=RouletteModel.js.map
