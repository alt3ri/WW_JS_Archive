"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleModel = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  BasePropertyById_1 = require("../../../Core/Define/ConfigQuery/BasePropertyById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  MenuController_1 = require("../Menu/MenuController"),
  SkillNodeDataInfo_1 = require("./RoleData/Module/DataInfo/SkillNodeDataInfo"),
  RoleOnlineInstanceData_1 = require("./RoleData/RoleOnlineInstanceData"),
  RoleRobotData_1 = require("./RoleData/RoleRobotData"),
  RoleDefine_1 = require("./RoleDefine"),
  RoleBreachResponseData_1 = require("./RoleLevel/RoleBreachResponseData"),
  RoleLevelResponseData_1 = require("./RoleLevel/RoleLevelResponseData"),
  RoleSkillResponseData_1 = require("./RoleSkill/RoleSkillResponseData"),
  RoleInstance_1 = require("./View/ViewData/RoleInstance");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
  RolePropertyGrowthByLevelAndBreachLevel_1 = require("../../../Core/Define/ConfigQuery/RolePropertyGrowthByLevelAndBreachLevel"),
  StringBuilder_1 = require("../../../Core/Utils/StringBuilder"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  RoleNewJoinAgent_1 = require("./View/AgentData/RoleNewJoinAgent"),
  RolePreviewAgent_1 = require("./View/AgentData/RolePreviewAgent"),
  RoleViewAgent_1 = require("./View/AgentData/RoleViewAgent");
class RoleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.puo = new Map()),
      (this.vuo = new Map()),
      (this.Muo = new Set()),
      (this.Suo = new Map()),
      (this.Euo = !0),
      (this.yuo = void 0),
      (this.Iuo = !1),
      (this.RoleTrialIdList = new Set()),
      (this.DefaultSortFunc = (e, t) => {
        var r = e.GetLevelData(),
          n = t.GetLevelData();
        return r.GetLevel() !== n.GetLevel()
          ? n.GetLevel() - r.GetLevel()
          : e.GetRoleConfig().QualityId !== t.GetRoleConfig().QualityId
            ? t.GetRoleConfig().QualityId - e.GetRoleConfig().QualityId
            : e.GetRoleConfig().Priority !== t.GetRoleConfig().Priority
              ? t.GetRoleConfig().Priority - e.GetRoleConfig().Priority
              : -1;
      }),
      (this.Tuo = void 0),
      (this.Luo = void 0),
      (this.Duo = void 0),
      (this.Ruo = []),
      (this.KEn = !1),
      (this.xie = (e, t) => {
        t &&
          t.Entity?.GetComponent(174).RemoveTagAddOrRemoveListener(
            1733479717,
            this.QEn,
          ),
          e &&
            ((t = e.Entity?.GetComponent(174)).AddTagAddOrRemoveListener(
              1733479717,
              this.QEn,
            ),
            this.KEn !== t.HasTag(1733479717)) &&
            ((this.KEn = !this.KEn),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
              this.KEn,
            ));
      }),
      (this.QEn = (e, t) => {
        1733479717 === e &&
          ((this.KEn = t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
            t,
          ));
      });
  }
  set IsInRoleTrial(e) {
    (this.Iuo = e), ModelManager_1.ModelManager.OnlineModel.DisableOnline(2, e);
  }
  get IsInRoleTrial() {
    return this.Iuo;
  }
  OnInit() {
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(
        LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
      ),
      (this.IsInRoleTrial = !1),
      this.puo.clear(),
      this.vuo.clear(),
      !0
    );
  }
  UpdateRoleInfoByServerData(e) {
    for (const t of e) this.UpdateRoleInfo(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleInfoUpdate);
  }
  RoleChange(e, t) {
    this.puo.delete(e),
      this.UpdateRoleInfo(t),
      this.UpdateMainRoleMap(t.l3n),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        t.l3n,
      );
  }
  UpdateRoleInfo(e) {
    let t = this.puo.get(e.l3n);
    var r;
    t || ((t = new RoleInstance_1.RoleInstance(e.l3n)), this.puo.set(e.l3n, t)),
      this.IsMainRole(e.l3n) &&
        ((r = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleById(e.l3n)),
        MenuController_1.MenuController.SetTargetConfig(88, r.Gender),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshMenuSetting,
          88,
        )),
      t.RefreshRoleInfo(e);
  }
  UpdateMainRoleMap(e) {
    for (const t of this.Uuo().values()) this.Suo.set(t, e);
  }
  RoleLevelUp(e, t, r) {
    var n = this.GetRoleInstanceById(e),
      o = n.GetLevelData(),
      i = o.GetLevel();
    n && (o.SetLevel(r), o.SetExp(t)),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleInfoUpdate),
      i < r &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoleLevelUp,
          e,
          t,
          r,
        );
  }
  RoleLevelUpReceiveItem(e) {
    var t = [];
    for (const n of Object.keys(e)) {
      var r = [{ IncId: 0, ItemId: Number.parseInt(n) }, e[n]];
      t.push(r);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RoleLevelUpReceiveItem,
      t,
    );
  }
  RoleBreakUp(e, t) {
    var r = this.GetRoleInstanceById(e);
    r && r.GetLevelData().SetBreachLevel(t),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleInfoUpdate),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleBreakUp,
        e,
        t,
      );
  }
  RoleSkillLevelUp(e, t) {
    var r = this.GetRoleInstanceById(e);
    r && r.RefreshSkillInfo(t.Ckn, t.gkn),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RoleSkillLevelUp,
        e,
        t,
      );
  }
  RoleNameUpdate(e, t) {
    e = this.GetRoleInstanceById(e);
    e &&
      (e.SetRoleName(t),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleRefreshName));
  }
  RoleAttrUpdate(e, t, r) {
    e = this.GetRoleInstanceById(e);
    e && e.RefreshRoleAttr(t, r);
  }
  RoleResonanceLockFinish(e) {
    this.puo.get(e.l3n).GetResonanceData().SetResonanceLock(e.xDs);
  }
  GetRoleViewAgent(e) {
    switch (e) {
      case 1:
        return new RolePreviewAgent_1.RolePreviewAgent();
      case 2:
        return new RoleNewJoinAgent_1.RoleNewJoinAgent();
      default:
        return new RoleViewAgent_1.RoleViewAgent();
    }
  }
  get IsShowMultiSkillDesc() {
    return this.Euo;
  }
  set IsShowMultiSkillDesc(e) {
    this.Euo = e;
  }
  GetRoleList() {
    var e = Array.from(this.puo.keys()),
      t = (this.n5i(e), []);
    for (const n of e) {
      var r = this.puo.get(n);
      1 === r.GetRoleConfig().RoleType && t.push(r);
    }
    return t;
  }
  GetRoleMap() {
    return this.puo;
  }
  GetRoleRobotMap() {
    return this.vuo;
  }
  GetBattleTeamFirstRoleId() {
    return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem
      ?.GetConfigId;
  }
  n5i(e) {
    e.sort((t, r) => {
      let n = -1,
        o = -1;
      var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
      for (let e = 0; e < i.length; e++) {
        var a = i[e];
        t === a.GetConfigId && (n = e), r === a.GetConfigId && (o = e);
      }
      var e = void 0 !== i[n],
        l = void 0 !== i[o];
      return e != l
        ? (l ? 1 : 0) - (e ? 1 : 0)
        : e
          ? n - o
          : ((l = this.GetRoleDataById(t)),
            (e = this.GetRoleDataById(r)),
            this.DefaultSortFunc(l, e));
    });
  }
  GetRoleDataById(e, t = !0) {
    let r = void 0;
    return t
      ? (e > RoleDefine_1.ROBOT_DATA_MIN_ID
          ? (r = this.GetRoleRobotData(e))
          : !(r = this.puo.get(e)) &&
            this.IsMainRole(e) &&
            ((t = this.GetNewMainRoleId(e)), (r = this.puo.get(t))),
        r)
      : new RoleOnlineInstanceData_1.RoleOnlineInstanceData(e);
  }
  GetNewMainRoleId(e) {
    return this.Suo.get(e);
  }
  GetRoleRobotData(e) {
    let t = this.vuo.get(e);
    return (
      t || ((t = new RoleRobotData_1.RoleRobotData(e)), this.vuo.set(e, t)), t
    );
  }
  GetRoleInstanceById(e) {
    return this.puo.get(e);
  }
  GetRoleName(e, t = void 0) {
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    return r
      ? r.GetName(t)
      : ((r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Name));
  }
  Auo(e, t, r) {
    let n = 0;
    ModelManager_1.ModelManager.WeaponModel.AutoAddExpItemEx(e, t, r);
    for (const o of t) n += o.SelectedCount * r(o);
    return n;
  }
  Puo() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList()) {
      var t = {
        IncId: 0,
        ItemId: r.Id,
        Count: ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
          r.Id,
        ),
        SelectedCount: 0,
      };
      e.push(t);
    }
    return e;
  }
  GetSelectLevelUpItemNeedMoney(e) {
    var e = this.GetRoleInstanceById(e).GetLevelData().GetLevelUpNeedExp(),
      t = this.Puo(),
      e = this.Auo(e, t, (e) => this.GetRoleExpItemExp(e.ItemId));
    return this.GetMoneyToLevelUp(e);
  }
  GetMoneyToLevelUp(e) {
    var t =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "ExpConversionCount",
      );
    return Math.ceil((e * t) / 1e3);
  }
  GetHasEnoughMoneyLevelUp(e) {
    e = this.GetSelectLevelUpItemNeedMoney(e);
    return !(
      ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(
        ItemDefines_1.EItemId.Gold,
      ) < e
    );
  }
  GetSelectHasEnoughItemToLevelUp(e) {
    e = this.GetRoleInstanceById(e)?.GetLevelData()?.GetLevelUpNeedExp();
    let t = 0;
    for (const n of this.GetRoleCostExpList()) {
      var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
        n.Id,
      );
      t += this.GetRoleExpItemExp(n.Id) * r;
    }
    return t >= e;
  }
  GetRoleBreachState(e) {
    (e = this.GetRoleInstanceById(e).GetLevelData()),
      (e = e.GetBreachConfig(e.GetBreachLevel() + 1));
    if (!e) return 3;
    if (
      !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
        e.ConditionId.toString(),
        void 0,
        !0,
      )
    )
      return 4;
    for (const t of e.BreachConsume)
      if (t[0] === ItemDefines_1.EItemId.Gold) {
        if (
          ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(
            ItemDefines_1.EItemId.Gold,
          ) < t[1]
        )
          return 1;
      } else if (
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          t[0],
        ) < t[1]
      )
        return 0;
    return 2;
  }
  GetBreachItemList() {
    var t = this.RoleBreachResponseData.GetCostList();
    if (t) {
      var r = new Map();
      let e = void 0;
      for (const n of t)
        n.Ckn === ItemDefines_1.EItemId.Gold
          ? (e = n.gkn)
          : r.set(n.Ckn, n.gkn);
      return { needGold: e, costItemList: r };
    }
  }
  GetRoleCostExpList() {
    var e = [],
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleExpItemList();
    if (t)
      for (const n of t) {
        var r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(n.Id);
        r && e.push(r);
      }
    return e;
  }
  GetRoleExpItemExp(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleExpItemExp(e);
  }
  GetAllRoleList() {
    return Array.from(this.puo.values());
  }
  GetRoleIdList() {
    var e = Array.from(this.puo.keys()),
      t = (this.n5i(e), []);
    for (const r of e)
      1 === this.puo.get(r).GetRoleConfig().RoleType && t.push(r);
    return t;
  }
  GetRoleTabList() {
    var t =
        ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
          "RoleRootView",
        ),
      r = t.length,
      n = [];
    for (let e = 0; e < r; e++) {
      var o = t[e];
      ModelManager_1.ModelManager.FunctionModel.IsOpen(o.FunctionId) &&
        n.push(o);
    }
    return n;
  }
  GetNormalRoleTabList() {
    return this.GetRoleTabList().filter(
      (e) =>
        "RoleAttributeTabView" === e.ChildViewName ||
        "RoleWeaponTabView" === e.ChildViewName ||
        "RolePhantomTabView" === e.ChildViewName ||
        "RoleSkillTabView" === e.ChildViewName ||
        "RoleResonanceTabNewView" === e.ChildViewName ||
        "RoleFavorTabView" === e.ChildViewName,
    );
  }
  GetTrialRoleTabList() {
    return this.GetRoleTabList().filter(
      (e) =>
        "RoleAttributeTabView" === e.ChildViewName ||
        "RoleWeaponTabView" === e.ChildViewName ||
        "RolePhantomTabView" === e.ChildViewName ||
        "RoleSkillTabView" === e.ChildViewName ||
        "RoleResonanceTabNewView" === e.ChildViewName,
    );
  }
  GetPreviewRoleTabList() {
    return this.GetRoleTabList().filter(
      (e) =>
        "RolePreviewAttributeTabView" === e.ChildViewName ||
        "RoleSkillTabView" === e.ChildViewName ||
        "RoleResonanceTabNewView" === e.ChildViewName,
    );
  }
  GetRoleTabListByUiParam(e) {
    switch (e) {
      case 1:
      case 3:
        return this.GetNormalRoleTabList();
      case 0:
        return this.GetTrialRoleTabList();
      case 2:
        return this.GetPreviewRoleTabList();
      default:
        return this.GetNormalRoleTabList();
    }
  }
  RedDotRoleSelectionListCondition() {
    for (const e of this.GetRoleSystemRoleList())
      if (
        ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
          LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem,
          e,
        )
      )
        return !0;
    return !1;
  }
  RedDotRoleSystemRoleListCondition(e) {
    let t = !1;
    var r =
      ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData
        ?.GetRoleIdList;
    return (t = r ? r.includes(e) : t)
      ? !!this.RedDotResonanceTabCondition(e)
      : this.RedDotResonanceTabCondition(e);
  }
  RedDotAttributeTabLevelUpCondition(e) {
    var t = this.GetRoleDataById(e);
    return (
      !t.IsTrialRole() &&
      !t.GetLevelData().GetRoleIsMaxLevel() &&
      !(
        !this.GetSelectHasEnoughItemToLevelUp(e) ||
        !this.GetHasEnoughMoneyLevelUp(e)
      )
    );
  }
  RedDotAttributeTabBreakUpCondition(e) {
    e = this.GetRoleDataById(e);
    return (
      !e.IsTrialRole() && !!e.GetLevelData().GetRoleNeedBreakUp() && this.xuo(e)
    );
  }
  RedDotFavorItemActiveCondition(e) {
    e = this.GetRoleDataById(e);
    return !e.IsTrialRole() && e.GetFavorData().IsExistCanUnlockFavorItem();
  }
  xuo(e) {
    return e.GetLevelData().IsEnoughBreachConsume();
  }
  RedDotResonanceTabCondition(e) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    for (const r of ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(
      t.GetRoleConfig().ResonanceId,
    ))
      if (this.RedDotResonanceTabHoleCondition(e, r.GroupIndex)) return !0;
    return !1;
  }
  RedDotResonanceTabHoleCondition(e, t) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (!e || e.IsTrialRole()) return !1;
    if (t - this.GetRoleResonanceGroupIndex(e) != 1) return !1;
    e = this.GetRoleResonanceConfigList(e)[t - 1];
    let r = !0;
    return (
      e.ActivateConsume.forEach((e, t) => {
        ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t) < e &&
          (r = !1);
      }),
      r
    );
  }
  GetRoleResonanceState(e, t) {
    e = e.GetResonanceData().GetResonantChainGroupIndex();
    return t <= e ? 2 : t - 1 === e ? 1 : 0;
  }
  GetRoleResonanceGroupIndex(e) {
    return e.GetResonanceData().GetResonantChainGroupIndex();
  }
  GetRoleResonanceConfigList(e) {
    (e = e.GetDataId()),
      (e =
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          e,
        ).ResonantChainGroupId);
    return ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(
      e,
    );
  }
  get RoleLevelResponseData() {
    return (
      this.Tuo ||
        (this.Tuo = new RoleLevelResponseData_1.RoleLevelResponseData()),
      this.Tuo
    );
  }
  UpdateLevelViewResponseData(e) {
    this.RoleLevelResponseData.UpdateRoleLevelUpViewResponse(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SelectLevelUpItemCount,
      );
  }
  get RoleBreachResponseData() {
    return (
      this.Luo ||
        (this.Luo = new RoleBreachResponseData_1.RoleBreachResponseData()),
      this.Luo
    );
  }
  UpdateRoleBreachViewResponseData(e) {
    this.RoleBreachResponseData.UpdateRoleBreakThroughViewResponse(e);
  }
  get RoleSkillResponseData() {
    return (
      this.Duo ||
        (this.Duo = new RoleSkillResponseData_1.RoleSkillResponseData()),
      this.Duo
    );
  }
  GetCurRoleSkillViewDataLocal(e, t) {
    e = this.GetRoleDataById(e).GetSkillData().GetSkillLevel(t);
    return this.GetRoleSkillEffect(t, e);
  }
  GetNextRoleSkillViewDataLocal(e, t) {
    var e = this.GetRoleDataById(e).GetSkillData().GetSkillLevel(t),
      r =
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(
          t,
        ).MaxSkillLevel;
    return this.GetRoleSkillEffect(t, e < r ? e + 1 : r);
  }
  GetRoleSkillEffect(e, t) {
    var r = new RoleDefine_1.SkillEffect(),
      e = ConfigCommon_1.ConfigCommon.ToList(
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetAllRoleSkillDescConfigByGroupId(
          e,
        ),
      ),
      n = (e.sort((e, t) => e.Order - t.Order), []);
    for (const i of e) {
      var o = new RoleDefine_1.OneSkillEffect();
      (o.Id = i.Id), (o.Desc = []);
      for (const a of i.SkillDetailNum)
        a.ArrayString.length <= 0 ||
          t > a.ArrayString.length ||
          o.Desc.push(a.ArrayString[t - 1]);
      n.push(o);
    }
    return (r.Level = t), (r.EffectDescList = n), r;
  }
  UpdateRoleSkillViewData(e, t, r) {
    this.RoleSkillResponseData.UpdateRoleSkillViewResponse(e, t, r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.UpdateRoleSkillView,
      );
  }
  UpdateRoleSkillNodeData(e, t) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
    if (e) {
      e = e.GetSkillData();
      if (e) {
        var r = t.length,
          n = [];
        for (let e = 0; e < r; e++) {
          var o = t[e];
          n.push(
            new SkillNodeDataInfo_1.SkillNodeDataInfo(o.$8n, o.rVn, o.vkn),
          );
        }
        e.SetSkillNodeStateData(n);
      }
    }
  }
  UpdateRoleFavorData(t) {
    var r = t.length;
    for (let e = 0; e < r; e++) this.UpdateRoleFavorDataSingle(t[e]);
  }
  UpdateRoleFavorCondition(e) {
    for (var [t, r] of e)
      ModelManager_1.ModelManager.RoleFavorConditionModel.UpdateRoleFavorCondtion(
        t,
        r,
      );
  }
  UpdateRoleFavorDataSingle(e) {
    var t,
      r,
      n,
      o,
      i = e.l3n,
      i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(i);
    i &&
      (i = i.GetFavorData()) &&
      ((t = e.r3n),
      (r = e.k3n),
      (n = e.SLs),
      (o = e.ELs),
      (e = e.yLs),
      i.SetFavorLevel(t),
      i.SetFavorExp(r),
      i.UpdateRoleFavorData(0, n),
      i.UpdateRoleFavorData(1, o),
      i.UpdateRoleFavorData(3, e));
  }
  UpdateRoleFavorNewCanUnLockId(e) {
    var t = e.l3n;
    ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t)
      .GetFavorData()
      .UpdateCanUnlockId(e.t6n, e.DLs);
  }
  UpdateRoleFavorLevelAndExp(e) {
    var t = e.l3n,
      t =
        ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          t,
        ).GetFavorData();
    t.SetFavorLevel(e.r3n), t.SetFavorExp(e.k3n);
  }
  GetRoleSystemRoleList() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var e = [];
      for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
        var t = i.GetConfigId,
          r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
        r && r.IsTrialRole() && e.push(t);
      }
      var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamLength();
      if (
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
        0 < e.length &&
        e.length === n
      )
        return e;
      if (0 < e.length) {
        var o = Array.from(this.puo.keys());
        for (const a of e) o.push(a);
        return this.n5i(o), o;
      }
    }
    return this.GetRoleIdList();
  }
  GetRoleListHighestLevel() {
    let e = -1;
    for (var [, t] of this.puo) {
      t = t.GetLevelData().GetLevel();
      e = t > e ? t : e;
    }
    for (var [, r] of this.vuo)
      ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(r.GetDataId(), {
        ParamType: 0,
      }) && ((r = r.GetLevelData().GetLevel()), (e = r > e ? r : e));
    return e;
  }
  UpdateCanChangeRoleIdList(e) {
    this.Ruo = this.Ruo.concat(e);
  }
  GetCanChangeRoleIdList() {
    return this.Ruo;
  }
  IsMainRole(e) {
    return this.Uuo().has(e);
  }
  Uuo() {
    return 0 === this.Muo.size && this.wuo(), this.Muo;
  }
  wuo() {
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetAllMainRoleConfig(),
      r = t.length;
    for (let e = 0; e < r; e++) {
      var n = t[e];
      this.Muo.add(n.Id);
    }
  }
  GetCurSelectMainRoleId() {
    for (const e of this.Uuo().values()) if (this.puo.get(e)) return e;
  }
  GetCurSelectMainRoleInstance() {
    for (const t of this.Uuo().values()) {
      var e = this.puo.get(t);
      if (e) return e;
    }
  }
  GetRoleLevelUpExp(e, t) {
    (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
      (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelConsume(
        e.LevelConsumeId,
        t,
      ));
    return e ? e.ExpCount : 1;
  }
  CalculateExpBackItem(e) {
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleExpItemList(),
      r = t.length;
    let n = e;
    var o = new Map();
    for (let e = r - 1; 0 <= e; e--) {
      var i = t[e].BasicExp,
        a = Math.floor(n / i);
      (n %= i), 0 < a && o.set(t[e].Id, a);
    }
    return o;
  }
  GetBaseAttributeById(e, t) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
      r = BasePropertyById_1.configBasePropertyById.GetConfig(e.PropertyId);
    switch (t) {
      case EAttributeId.Proto_Atk:
        return r.Atk;
      case EAttributeId.Proto_Def:
        return r.Def;
      case EAttributeId.Tkn:
        return r.LifeMax;
    }
    return 0;
  }
  GetAttributeRadioByLevel(e, t, r) {
    var n =
      RolePropertyGrowthByLevelAndBreachLevel_1.configRolePropertyGrowthByLevelAndBreachLevel.GetConfig(
        t,
        r,
      );
    switch (e) {
      case EAttributeId.Proto_Atk:
        return n.AtkRatio;
      case EAttributeId.Proto_Def:
        return n.DefRatio;
      case EAttributeId.Tkn:
        return n.LifeMaxRatio;
    }
    return 0;
  }
  GetAttributeByLevel(e, t, r, n) {
    e =
      this.GetBaseAttributeById(e, t) *
      this.GetAttributeRadioByLevel(t, r, n) *
      RoleDefine_1.MUL_RATIO;
    return Math.floor(e);
  }
  GetAddAttrLevelUp(e, t, r, n, o, i) {
    t = this.GetAttributeByLevel(e, i, t, r);
    return this.GetAttributeByLevel(e, i, n, o) - t;
  }
  GetRoleSkillTreeNodeLevel(e, t) {
    t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(t);
    if (!t) return 0;
    let r = this.GetRoleInstanceById(e);
    return (
      (r = r || this.GetRoleDataById(e)),
      this.GetRoleSkillTreeNodeLevelByConfig(r, t)
    );
  }
  GetRoleSkillTreeNodeLevelByConfig(e, t) {
    return e.GetSkillData().GetSkillNodeLevel(t);
  }
  GetRoleSkillTreeNodeState(t, r) {
    r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(r);
    if (r) {
      let e = this.GetRoleInstanceById(t);
      return (e = e || this.GetRoleDataById(t))
        .GetSkillData()
        .GetSkillTreeNodeState(r, t);
    }
  }
  GetRoleSkillTreeNodeConsumeSatisfied(e, t) {
    e = this.GetRoleInstanceById(e);
    return !!e && e.GetSkillData().IsSkillTreeNodeConsumeSatisfied(t);
  }
  GetSkillAttributeNameByOneSkillEffect(e) {
    return ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillDescriptionConfigById(
      e.Id,
    ).AttributeName;
  }
  GetSkillAttributeDescriptionByOneSkillEffect(t) {
    var e =
      ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillDescriptionConfigById(
        t.Id,
      );
    let r = "";
    if (e.Description)
      r = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Description),
        ...t.Desc,
      );
    else {
      var n = new StringBuilder_1.StringBuilder(),
        o = t.Desc.length;
      for (let e = 0; e < o; ++e) n.Append(t.Desc[e]);
      r = n.ToString();
    }
    return r;
  }
  GetResonantItemRoleMap() {
    if (!this.yuo) {
      var e;
      this.yuo = new Map();
      for (const r of ConfigManager_1.ConfigManager.RoleConfig.GetRoleList())
        r.ResonantChainGroupId <= 0 ||
          ((e =
            ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceList(
              r.ResonantChainGroupId,
            )) &&
            e.forEach((e) => {
              for (const t of e.ActivateConsume) {
                let e = this.yuo.get(t[0]);
                (e = e || new Array()).includes(r.Id) || e.push(r.Id),
                  this.yuo.set(t[0], e);
              }
            }));
    }
    return this.yuo;
  }
  GetResonantItemRoleId(e) {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
      e,
    )?.ShowTypes.includes(30) &&
      (e = this.GetResonantItemRoleMap().get(e)) &&
      0 < e.length
      ? e
      : void 0;
  }
  CheckRoleResonantIfMax(e) {
    e = this.GetRoleInstanceById(e);
    return (
      !!e &&
      (this.GetRoleResonanceGroupIndex(e) ?? 0) >=
        ConfigManager_1.ConfigManager.RoleResonanceConfig.GetResonanceMaxLevel()
    );
  }
  GetRoleLeftResonantCount(e) {
    var e = this.GetRoleInstanceById(e);
    return e
      ? ((e = this.GetRoleResonanceGroupIndex(e) ?? 0),
        ConfigManager_1.ConfigManager.RoleResonanceConfig.GetResonanceMaxLevel() -
          e)
      : 0;
  }
  GetRoleLeftResonantCountWithInventoryItem(e) {
    var t,
      e = this.GetRoleInstanceById(e);
    if (!e) return 0;
    let r = 0;
    for ([t] of e.GetRoleConfig().SpilloverItem)
      r += ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
    e = this.GetRoleResonanceGroupIndex(e) ?? 0;
    return (
      ConfigManager_1.ConfigManager.RoleResonanceConfig.GetResonanceMaxLevel() -
      e -
      r
    );
  }
  InUltraSkill() {
    return this.KEn;
  }
}
exports.RoleModel = RoleModel;
//# sourceMappingURL=RoleModel.js.map
