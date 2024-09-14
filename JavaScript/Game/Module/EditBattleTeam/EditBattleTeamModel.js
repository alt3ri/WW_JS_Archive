"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditBattleTeamModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  InstOnlineType_1 = require("../../../Core/Define/Config/SubType/InstOnlineType"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RoleDefine_1 = require("../RoleUi/RoleDefine"),
  SceneTeamDefine_1 = require("../SceneTeam/SceneTeamDefine"),
  EditBattleRoleData_1 = require("./EditBattleRoleData"),
  EditBattleRoleSlotData_1 = require("./EditBattleRoleSlotData"),
  EditBattleTeamController_1 = require("./EditBattleTeamController"),
  LIMIT_COUNT_MAX_LENGTH = 3;
class EditBattleTeamModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Y3t = new Map()),
      (this.J3t = void 0),
      (this.z3t = void 0),
      (this.Z3t = void 0),
      (this.e4t = new Map()),
      (this.t4t = void 0),
      (this.i4t = !0),
      (this.o4t = !1);
  }
  get NeedEntrance() {
    return this.i4t;
  }
  set NeedEntrance(e) {
    this.i4t = e;
  }
  get InstanceMultiEnter() {
    return this.o4t;
  }
  set InstanceMultiEnter(e) {
    this.o4t = e;
  }
  SetInstanceDungeonId(e) {
    this.z3t = e;
  }
  get GetInstanceDungeonId() {
    return this.z3t;
  }
  get GetAllRoleConfigIdList() {
    var t = [];
    for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
      var r = this.GetRoleSlotData(e);
      r && r.HasRole && ((r = r.GetRoleData.ConfigId), t.push(r));
    }
    return t;
  }
  get IsAllRoleDie() {
    for (const t of this.GetAllRoleSlotData)
      if (t.HasRole) {
        var e = t.GetRoleData.ConfigId;
        if (this.IsTrialRole(e)) return !1;
        if (!ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e))
          return !1;
      }
    return !0;
  }
  get GetOwnRoleConfigIdList() {
    var t = new Array(),
      r = new Array(),
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
      var o = this.GetRoleSlotData(e);
      o &&
        o.HasRole &&
        i === (o = o.GetRoleData).PlayerId &&
        ((o = o.ConfigId), t.push(o), r.push(e - 1));
    }
    return [t, r];
  }
  get IsMultiInstanceDungeon() {
    var e = this.GetCurrentDungeonConfig;
    return (
      (!e || e.OnlineType !== InstOnlineType_1.InstOnlineType.Single) &&
      this.InstanceMultiEnter
    );
  }
  SetLeaderPlayerId(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Formation", 8, "[EditBattleTeam]设置队长", [
        "PlayerId",
        e,
      ]),
      (this.Z3t = e);
  }
  get GetLeaderPlayerId() {
    return this.Z3t;
  }
  get GetLeaderIsSelf() {
    return (
      !!this.GetLeaderPlayerId &&
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() ===
        this.GetLeaderPlayerId
    );
  }
  get IsInInstanceDungeon() {
    return ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
  }
  GetAllRoleCanAddToTeam() {
    for (const e of this.GetAllRoleConfigIdList)
      if (!this.CanAddRoleToEditTeam(e)) return { CanAdd: !1, LimitRoleId: e };
    return { CanAdd: !0, LimitRoleId: 0 };
  }
  InitTrailRoleInstance() {
    this.e4t.clear();
    var e,
      t = this.GetCurrentFightFormation.TrialRole,
      r = ModelManager_1.ModelManager.RoleModel;
    for (const i of t)
      this.e4t.has(i) ||
        ((e = r.GetRoleDataById(
          ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
            i,
          ),
        )),
        this.e4t.set(i, e));
  }
  GetRoleList() {
    var t = ModelManager_1.ModelManager.RoleModel,
      r = [],
      e = t.GetRoleMap();
    if (this.r4t())
      for (const s of this.n4t()) {
        var i,
          o = t.GetRoleDataById(s);
        o && ((i = o.GetDataId()), this.CanAddRoleToEditTeam(i)) && r.push(o);
      }
    else {
      for (const l of e.values()) {
        var a = l.GetDataId();
        this.CanAddRoleToEditTeam(a) && r.push(l);
      }
      for (const f of this.e4t.values()) r.push(f);
    }
    if (!this.t4t) {
      this.t4t = new Array();
      (e = ModelManager_1.ModelManager.WorldLevelModel.Sex),
        (e = ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(e));
      if (e) for (const h of e) this.t4t.push(h.Id);
    }
    for (let e = 0; e < r.length; ) {
      var n = r[e].GetRoleId();
      t.IsMainRole(n) && !this.t4t.includes(n) ? r.splice(e, 1) : e++;
    }
    return r;
  }
  HasAnyLimit() {
    return !!(this.r4t() || this.s4t() || this.a4t() || this.h4t());
  }
  n4t() {
    var e = this.GetCurrentFightFormation;
    if (e) return e.LimitRole;
  }
  r4t() {
    var e = this.n4t();
    return !!e && 0 < e.length;
  }
  s4t() {
    var e = this.GetCurrentFightFormation;
    return !!e && (e = e.LimitCount.length) !== LIMIT_COUNT_MAX_LENGTH && 0 < e;
  }
  a4t() {
    var e = this.GetCurrentFightFormation;
    return !!e && 0 < e.LitmitElement.length;
  }
  h4t() {
    return !!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon();
  }
  CanAddRoleToEditTeam(e) {
    var t;
    return (
      !!this.IsTrialRole(e) ||
      ((t = this.IsInLimitRole(e)), (e = this.IsInLimitElement(e)), t && e)
    );
  }
  IsInLimitRoleCount(e) {
    var t = this.GetLimitRoleCountList();
    return !t || t.includes(e);
  }
  IsInLimitRole(e) {
    var t = this.GetCurrentFightFormation;
    return !t || (t = t.LimitRole).length <= 0 || t.includes(e);
  }
  IsInLimitElement(e) {
    var t = this.GetCurrentFightFormation;
    return (
      !t ||
      (!!(e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)) &&
        ((e = e.ElementId), (t = t.LitmitElement).length <= 0 || t.includes(e)))
    );
  }
  GetLimitRoleCountList() {
    var e = this.GetCurrentFightFormation;
    if (e) {
      var e = e.LimitCount,
        t = e.length;
      if (0 !== t) return e;
    }
  }
  GetMaxLimitRoleCount() {
    var e = this.GetLimitRoleCountList();
    return e ? e[e.length - 1] : 0;
  }
  get GetCurrentDungeonConfig() {
    if (this.GetInstanceDungeonId)
      return ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetDungeonConfig(
        this.GetInstanceDungeonId,
      );
  }
  get GetCurrentFightFormation() {
    var e = this.GetCurrentDungeonConfig;
    if (e) {
      e = e.FightFormationId;
      if (0 !== e)
        return ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          e,
        );
    }
  }
  CreateAllRoleSlotData() {
    for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
      var t = new EditBattleRoleSlotData_1.EditBattleRoleSlotData(e);
      this.Y3t.set(e, t);
    }
  }
  ResetAllRoleSlotData() {
    for (const e of this.Y3t.values()) e.ResetRoleData();
    this.e4t.clear(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Formation", 8, "[EditBattleTeam]还原所有战前编队数据");
  }
  HasSameConfigIdInAnyOwnRoleSlot(e) {
    for (const r of this.Y3t.values()) {
      var t = r.GetRoleData;
      if (t && t.IsSelf && r.GetRoleConfigId === e) return !0;
    }
    return !1;
  }
  GetPlayerRoleNumber(e) {
    let t = 0;
    for (var [, r] of this.Y3t) e === r.GetRoleData?.PlayerId && t++;
    return t;
  }
  GetParentRolePositionInEditBattleTeam(e) {
    var t;
    if (this.IsTrialRole(e))
      return (
        (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).Id),
        (t = this.GetSlotDataByConfigId(t)) ? t.GetPosition : -1
      );
    for (const i of this.GetAllRoleSlotData) {
      var r = i.GetRoleData;
      if (r) {
        r = r.GetTrialRoleConfig;
        if (r) if (r.ParentId === e) return i.GetPosition;
      }
    }
    return -1;
  }
  get GetOwnRoleCountInRoleSlot() {
    let e = 0;
    for (const r of this.Y3t.values()) {
      var t = r.GetRoleData;
      t && t.IsSelf && e++;
    }
    return e;
  }
  GetRoleCountInRoleSlot() {
    let e = 0;
    for (const t of this.Y3t.values()) t.GetRoleData && e++;
    return e;
  }
  PrintRoleSlotsDebugString() {
    for (let e = 1; e <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
      var t = this.GetRoleSlotData(e);
      t.HasRole
        ? ((t = t.GetRoleData),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Formation",
              8,
              "[EditBattleTeam]战前编队 Position 号位的角色信息: RoleData ",
              ["Position", e],
              ["RoleData", t],
            ))
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Formation",
            8,
            "[EditBattleTeam]战前编队 Position 号位没有角色",
            ["Position", e],
          );
    }
  }
  SetCurrentEditPosition(e) {
    this.J3t = e;
  }
  get GetCurrentEditRoleSlotData() {
    if (this.J3t) return this.GetRoleSlotData(this.J3t);
  }
  IsInEditBattleTeam(e, t = !1) {
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (const o of this.Y3t.values()) {
      var i = o.GetRoleData;
      if (i && (!t || r === i.PlayerId) && i.ConfigId === e) return !0;
    }
    return !1;
  }
  GetEditBattleTeamPositionByConfigId(e) {
    e = this.GetSlotDataByConfigId(e);
    return e ? e.GetPosition : -1;
  }
  GetSlotDataByConfigId(e) {
    for (const r of this.Y3t.values()) {
      var t = r.GetRoleData;
      if (t && t.ConfigId === e) return r;
    }
  }
  InitAllRoleSlotData() {
    var e;
    this.IsMultiInstanceDungeon
      ? (ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarFormationDataList(),
        (e =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarFormationDataList()),
        this.InitAllMultiRoleData(e))
      : this.InitAllSingleRoleData();
  }
  GetRoleSlotData(e) {
    return this.Y3t.get(e);
  }
  RefreshAllEmptySlotData() {
    for (let t = 1; t <= this.Y3t.size; t++) {
      var r = this.Y3t.get(t);
      if (r) {
        var e = r.GetRoleData;
        if (!e)
          for (let e = t + 1; e <= this.Y3t.size; e++) {
            var i = this.Y3t.get(e);
            if (i) {
              var o = i.GetRoleData;
              if (o) {
                r.SetRoleData(o), i.ResetRoleData();
                break;
              }
            }
          }
      }
    }
  }
  get GetAllRoleSlotData() {
    var e = [];
    for (const t of this.Y3t.values()) e.push(t);
    return e;
  }
  SetPlayerReady(e, t) {
    for (var [, r] of this.Y3t) {
      var i;
      r.HasRole &&
        (i = r.GetRoleData).PlayerId === e &&
        (i.SetReady(t),
        (i = r.GetPosition),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshEditBattleRoleReady,
          i,
          t,
        ));
    }
  }
  get GetIsAllReady() {
    var e = this.GetAllRoleSlotData,
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      r = this.GetLeaderIsSelf;
    for (const o of e)
      if (o.HasRole) {
        var i = o.GetRoleData;
        if (r) if (t === i.PlayerId) continue;
        if (!i.IsReady) return !1;
      }
    return !0;
  }
  get HasSameRole() {
    var e = this.GetAllRoleSlotData;
    for (const o of e)
      if (o.HasRole && o.GetRoleData.IsSelf) {
        var r = o.GetRoleData;
        let t = r.ConfigId;
        this.IsTrialRole(t) && (t = r.GetTrialRoleConfig.ParentId);
        for (const a of e)
          if (a.HasRole && o.GetPosition !== a.GetPosition) {
            var i = a.GetRoleData;
            let e = i.ConfigId;
            if (
              (this.IsTrialRole(e) && (e = i.GetTrialRoleConfig.ParentId),
              t === e)
            )
              return !0;
          }
      }
    return !1;
  }
  IsRoleConflict(e, t) {
    for (var [, r] of this.Y3t)
      if (r && r.GetRoleData?.PlayerId !== e && r.GetRoleConfigId === t)
        return !0;
    return !1;
  }
  get GetSelfIsReady() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    return ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarPlayerReadyState(
      e,
    );
  }
  RefreshAllMultiRoleData() {
    var t =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarFormationDataList(),
      r = t.length;
    for (let e = 0; e < LIMIT_COUNT_MAX_LENGTH; e++) {
      var i = this.Y3t.get(e + 1);
      e + 1 > r ? i.ResetRoleData() : i.SetRoleDataByPrewarInfo(t[e]);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      "刷新所有多人联机的战前编队角色数据",
    );
  }
  InitAllMultiRoleData(e) {
    this.ResetAllRoleSlotData();
    for (const i of e) {
      var t = i.GetIndex(),
        r = this.GetRoleSlotData(t);
      r &&
        (i.IsEmpty() && i.IsLeader()
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Formation",
              8,
              "[EditBattleTeam]此位置没有角色:{Position}",
              ["{Position}", t],
            )
          : i.IsEmpty() ||
            ((t = this.CreateRoleDataFromPrewarData(i)),
            r.SetRoleData(t),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                8,
                "[EditBattleTeam]当初始化所有联机战前编队数据时,玩家在线索引:OnlineIndex,玩家信息:PrewarFormation",
                ["OnlineIndex", i.GetOnlineNumber()],
                ["PrewarFormation", i],
              ),
            i.IsLeader() &&
              ((r = i.GetPlayerId()), this.SetLeaderPlayerId(r))));
    }
    void 0 === this.GetLeaderPlayerId &&
      ((e = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
      this.SetLeaderPlayerId(e)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
        "初始化所有多人联机的战前编队角色数据",
      ),
      this.PrintRoleSlotsDebugString();
  }
  InitAllSingleRoleData() {
    this.ResetAllRoleSlotData();
    const t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    this.SetLeaderPlayerId(t), this.InitTrailRoleInstance();
    var r = this.GetCurrentFightFormation.AutoRole;
    if (r && 0 < r.length) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Formation",
          8,
          "[EditBattleTeam]当初始化所有单人战前编队数据时,此编队填写了自动上阵角色",
          ["autoRoleGroupIdList", r],
        );
      let e = 1;
      for (const d of r) {
        var i,
          o = this.GetRoleSlotData(e);
        o &&
          ((i = this.e4t.get(d))
            ? ((i = this.CreateRoleDataFromRoleInstance(i)),
              o.SetRoleData(i),
              e++)
            : Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Formation",
                8,
                "[EditBattleTeam]自动上阵角色配置的角色Id不在试用角色列表中",
                ["autoRoleGroupConfigId", d],
              ));
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
        "自动上阵指定临时角色",
      ),
        void this.PrintRoleSlotsDebugString();
    } else if (this.HasAnyLimit())
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Formation",
          8,
          "[EditBattleTeam]单人战前编队存在编队限制,将不会读取编队数据初始化",
        );
    else {
      if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation()) {
        r = ModelManager_1.ModelManager.TowerModel.GetFloorFormation(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor,
        );
        let e = void 0;
        (e =
          !ModelManager_1.ModelManager.TowerModel.CheckInTower() ||
          0 < r?.length
            ? r
            : ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation),
          EditBattleTeamController_1.EditBattleTeamController.SetEditBattleTeamByRoleId(
            e,
          );
      } else {
        let e = 1;
        var a = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
        const t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
        var n = ModelManager_1.ModelManager.RoleModel;
        for (const _ of ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData.GetRoleDataMap().values()) {
          var s,
            l,
            f,
            h = _.ConfigId;
          h <= 0 ||
            t !== _.PlayerId ||
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Formation",
                8,
                "[EditBattleTeam]当初始化所有单人战前编队数据时,编队位置:{Position},角色Id:{ConfigId},玩家Id:{PlayerId}",
                ["{Position}", e],
                ["{ConfigId}", h],
                ["{PlayerId}", _.PlayerId],
              ),
            0 < (s = this.GetMaxLimitRoleCount()) && e > s) ||
            ((s = this.GetRoleSlotData(e)),
            this.CanAddRoleToEditTeam(h) &&
              ((l = new EditBattleRoleData_1.EditBattleRoleData()),
              (f = n.GetRoleDataById(h)?.GetLevelData().GetLevel() ?? 0),
              l.Init(t, h, 1, a, f, !0, !0),
              s.SetRoleData(l),
              e++));
        }
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
        "初始化所有单人的战前编队角色数据",
      ),
        this.PrintRoleSlotsDebugString();
    }
  }
  CreateRoleDataFromPrewarData(e) {
    var t = e.GetConfigId(),
      r = e.GetOnlineNumber(),
      i = e.GetPlayerName(),
      o = e.GetPlayerId(),
      a = e.GetLevel(),
      n = e.IsSelf(),
      s = e.GetIsReady(),
      l = new EditBattleRoleData_1.EditBattleRoleData();
    return (
      l.Init(o, t, r, i, a, n, s),
      (l.ThirdPartyOnlineId = e.GetPlayerOnlineId()),
      l
    );
  }
  CreateRoleDataFromRoleInstance(e) {
    var t = e.GetDataId(),
      e = e.GetLevelData(),
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetAccountName(),
      e = e.GetLevel(),
      o = this.GetSelfIsReady,
      a = new EditBattleRoleData_1.EditBattleRoleData();
    return a.Init(r, t, 1, i, e, !0, o), a;
  }
  IsTrialRole(e) {
    return e > RoleDefine_1.ROBOT_DATA_MIN_ID;
  }
  ChangeMainRoleData() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var e = ModelManager_1.ModelManager.RoleModel;
      for (const o of this.Y3t.values()) {
        var t,
          r = o.GetRoleData,
          i = r?.ConfigId;
        i &&
          !this.IsTrialRole(i) &&
          e.IsMainRole(i) &&
          (t = e.GetNewMainRoleId(i)) &&
          i !== t &&
          (r.ConfigId = t);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
        "单机更换主角色",
      );
    }
  }
}
exports.EditBattleTeamModel = EditBattleTeamModel;
//# sourceMappingURL=EditBattleTeamModel.js.map
