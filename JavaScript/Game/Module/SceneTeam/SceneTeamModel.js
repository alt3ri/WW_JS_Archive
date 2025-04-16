"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamModel = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  TrialRoleInfoById_1 = require("../../../Core/Define/ConfigQuery/TrialRoleInfoById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../Common/StatDefine"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RoleTeamComponent_1 = require("../../NewWorld/Character/Role/Component/RoleTeamComponent"),
  GameModePromise_1 = require("../../World/Define/GameModePromise"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  WorldGlobal_1 = require("../../World/WorldGlobal"),
  UiBlueprintFunctionLibrary_1 = require("../BpBridge/UiBlueprintFunctionLibrary"),
  RoleDefine_1 = require("../RoleUi/RoleDefine"),
  SceneTeamData_1 = require("./SceneTeamData"),
  SceneTeamDefine_1 = require("./SceneTeamDefine"),
  SceneTeamItem_1 = require("./SceneTeamItem");
class SceneTeamModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Xpo = void 0),
      (this.$po = new Map()),
      (this.aPr = new Array()),
      (this.Jpo = new Set()),
      (this.bhl = new Set()),
      (this.CurrentGroupType = void 0),
      (this.Vpo = void 0),
      (this.zpo = void 0),
      (this.YBi = void 0),
      (this.IsTeamReady = !1),
      (this.ChangingTeam = !1),
      (this.IsPhantomTeam = !1),
      (this.PanelQteHandleId = 0),
      (this.PanelQteRoleIdSet = new Set()),
      (this.Wtc = -0),
      (this.Qtc = -0),
      (this.Zpo = void 0),
      (this.LastEntityIsOnGround = !0),
      (this.LoadTeamPromise = void 0),
      (this.vwa = void 0),
      (this.BKl = 0),
      (this.OpenClientAuthorityCheckCount = 0),
      (this.Mwa = (e) => {
        this.vwa !== e && (this.vwa = e);
      });
  }
  get ChangingRole() {
    return !(
      this.BKl <= 0 ||
      (Date.now() - this.BKl > SceneTeamDefine_1.CHANGING_ROLE_TIMEOUT &&
        ((this.BKl = 0), 1))
    );
  }
  set ChangingRole(e) {
    this.BKl = e ? Date.now() : 0;
  }
  OnInit() {
    return (
      (this.Qtc = CommonParamById_1.configCommonParamById.GetFloatConfig(
        "change_role_cooldown",
      )),
      this.ResetChangeRoleCooldown(),
      (this.Xpo = Stats_1.Stat.Create(
        "SceneTeamModel.OnChangeRoleStat",
        "",
        StatDefine_1.BATTLESTAT_GROUP,
      )),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGlobalFootstepMaterialChange,
        this.Mwa,
      ),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGlobalFootstepMaterialChange,
        this.Mwa,
      ),
      !0
    );
  }
  OnLeaveLevel() {
    return (
      this.ResetChangeRoleCooldown(),
      ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel ||
        this.evo(),
      !0
    );
  }
  OnChangeMode() {
    return this.ResetChangeRoleCooldown(), this.evo(), !0;
  }
  evo() {
    this.Zpo = void 0;
    for (const e of this.$po.values()) e.Clear();
    this.$po.clear();
    for (const t of this.aPr) t.Reset();
    (this.aPr.length = 0),
      this.Jpo.clear(),
      this.bhl.clear(),
      (this.PanelQteHandleId = 0),
      this.PanelQteRoleIdSet.clear(),
      (this.Vpo = void 0),
      (this.YBi = void 0),
      (this.IsPhantomTeam = !1),
      (this.zpo = void 0),
      (this.OpenClientAuthorityCheckCount = 0);
  }
  SwitchGroup(t, r, o = !1, i = !1) {
    var a = this.$po.get(t);
    if (a) {
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneTeam",
            48,
            "切换编队组",
            ["PlayerId", t],
            ["GroupType", r],
          ),
        r !== a.GetCurrentGroupType())
      ) {
        this.uMl(t, a, r);
        let e = i;
        e || ((a = this.CurrentGroupType), (e = this.DGl(a, r))),
          this.tvo(e, o);
      }
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneTeam", 48, "切换编队组玩家不存在", [
          "PlayerId",
          t,
        ]);
  }
  uMl(e, t, r) {
    t.SwitchGroup(r),
      e === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
        ((this.CurrentGroupType = r),
        (this.IsPhantomTeam = 2 === r),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnUpdateTeamGroupType,
        ));
  }
  UpdateGroupData(e, t) {
    let r = this.$po.get(e);
    r || ((r = SceneTeamData_1.SceneTeamPlayer.Create(e)), this.$po.set(e, r)),
      r.UpdateGroup(
        t.GroupType,
        t.GroupRoleList,
        t.CurrentRoleId,
        t.LivingState ?? 1,
        t.IsFixedLocation ?? !1,
      ),
      r.RefreshEntityEnable(),
      t.GroupType === this.$po.get(e)?.GetCurrentGroupType() && this.tvo(!0);
  }
  UpdateGroupDataAndSwitchGroup(e, t) {
    let r = this.$po.get(e);
    r || ((r = SceneTeamData_1.SceneTeamPlayer.Create(e)), this.$po.set(e, r));
    var o = t.GroupType;
    r.UpdateGroup(
      o,
      t.GroupRoleList,
      t.CurrentRoleId,
      t.LivingState ?? 1,
      t.IsFixedLocation ?? !1,
    ),
      this.uMl(e, r, o),
      r.RefreshEntityEnable(),
      this.tvo(!0);
  }
  AddRoleAndSwitchGroup(e, t, r) {
    var o,
      i = this.$po.get(e);
    i &&
      (o = i.GetGroup(t)) &&
      2 !== o.GetLivingState() &&
      (o.AddRoleList(r),
      this.uMl(e, i, t),
      i.RefreshEntityEnable(),
      this.tvo(!0));
  }
  UpdateAllPlayerData(t, r = !0) {
    var o = [];
    for (const _ of this.$po.keys()) {
      let e = !1;
      for (const f of t)
        if (f.PlayerId === _) {
          e = !0;
          break;
        }
      e || o.push(_);
    }
    for (const m of o) this.$po.get(m)?.Clear(), this.$po.delete(m);
    var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      e = this.CurrentGroupType;
    for (const g of t) {
      var a = g.PlayerId,
        n = g.CurrentGroupType;
      let e = this.$po.get(a);
      e ||
        ((e = SceneTeamData_1.SceneTeamPlayer.Create(a)), this.$po.set(a, e));
      var s = e.GetCurrentGroup(),
        l =
          i === a &&
          !r &&
          (this.ChangingTeam || 0 < this.OpenClientAuthorityCheckCount) &&
          s?.GetGroupType() === n;
      this.uMl(a, e, n);
      for (const c of g.Groups)
        l && c.GroupType === n && this.gwl(s, c)
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneTeam",
              48,
              "更新编队组数据时，跳过本机当前编队组",
            )
          : e.UpdateGroup(
              c.GroupType,
              c.GroupRoleList,
              c.CurrentRoleId,
              c.LivingState ?? 1,
              c.IsFixedLocation ?? !1,
            );
      e.RefreshEntityEnable();
    }
    var h = this.CurrentGroupType,
      e = this.DGl(e, h);
    this.tvo(e);
  }
  DGl(e = 0, t = 0) {
    return (
      t === e ||
      SceneTeamDefine_1.innerGroupType.includes(e) ||
      SceneTeamDefine_1.innerGroupType.includes(t)
    );
  }
  gwl(e, t) {
    var r = t.GroupType;
    if (e.GetLivingState() !== t.LivingState)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneTeam", 48, "编队组存活状态不一致，不可跳过", [
            "Type",
            r,
          ]),
        !1
      );
    var o = e.GetCurrentRole()?.RoleId;
    if (o !== t.CurrentRoleId && !this.ChangingRole)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneTeam",
            48,
            "当前角色不一致，不在换人中，不可跳过",
            ["Type", r],
            ["RoleId", o],
          ),
        !1
      );
    var i = t.GroupRoleList,
      a = e.GetRoleList();
    if (i.length !== a.length)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "SceneTeam",
            48,
            "编队组角色列表不一致，不可跳过",
            ["Type", r],
            ["RoleList", a],
          ),
        !1
      );
    for (let e = 0; e < i.length; e++) {
      var n = i[e],
        s = a[e];
      if (n.RoleId !== s.RoleId || n.CreatureDataId !== s.CreatureDataId)
        return (
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "SceneTeam",
              48,
              "编队组角色不一致，不可跳过",
              ["TargetRole", n],
              ["Role", s],
            ),
          !1
        );
    }
    return !0;
  }
  UpdateGroupLivingStates(e, t) {
    var r = this.$po.get(e);
    if (r) for (var [o, i] of t) r.GetGroup(o)?.UpdateLivingState(i);
  }
  tvo(i, a = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，开始"),
      (this.IsTeamReady = !1),
      this.RefreshLastTransform(),
      (this.aPr.length = 0),
      this.Jpo.clear(),
      this.LoadTeamPromise ||
        (this.LoadTeamPromise = new GameModePromise_1.GameModePromise()),
      this.Vpo &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，中断等待"),
        this.Vpo.Cancel());
    let n = void 0,
      s = !1;
    var e = [];
    const l = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    for (const g of ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
      : [l]) {
      var t = this.$po.get(g)?.GetCurrentGroup(),
        r = t?.GetRoleList();
      if (r && 0 !== r.length) {
        g === l && (s = !t.IsFixedLocation);
        var o = t.GetGroupType(),
          h = t.GetCurrentRole();
        for (const c of r) {
          var _,
            f,
            m = c.CreatureDataId;
          m <= 0 ||
            ((f = c.RoleId),
            (_ = c === h),
            (f = SceneTeamItem_1.SceneTeamItem.Create(o, g, f, m)),
            this.aPr.push(f),
            this.Jpo.add(g),
            e.push(m),
            f.IsMyRole() ? _ && (n = f) : f.SetRemoteIsControl(_));
        }
      }
    }
    this.GetTeamItems(!0).length <= 0
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneTeam", 48, "刷新出战编队，当前玩家无角色实体")
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，等待加载开始"),
        (this.Vpo = WaitEntityTask_1.WaitEntityTask.Create(
          "SceneTeamModel.TeamGoBattle",
          e,
          (e) => {
            e ||
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("SceneTeam", 48, "刷新出战编队，加载角色失败")),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，等待加载结束"),
              this.RefreshLastTransform(),
              this.Bvl(i);
            var e = n?.EntityHandle,
              t = this.YBi?.EntityHandle,
              r =
                (EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnBeforeUpdateSceneTeam,
                  e,
                  t,
                ),
                e?.Entity);
            if (
              (r?.Valid &&
                r.Active &&
                r.GetComponent(203)?.HasAnyTag([-1384309247, -1388400236]) &&
                (s = !1),
              n && n.CanControl())
            )
              e && e.Id === t?.Id
                ? (this.YBi = n)
                : (0 < n.GetGroupType() &&
                    ControllerHolder_1.ControllerHolder.SceneTeamController.SendSwitchRole(
                      n,
                    ),
                  this.ChangeRole(n.GetCreatureDataId(), {
                    UseGoBattleSkill: a,
                    AllowRefreshTransform: s,
                  }));
            else {
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneTeam",
                  48,
                  "刷新出战编队，当前角色不可上阵",
                );
              for (const o of this.aPr)
                if (o.IsMyRole() && o.CanControl())
                  return (
                    ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(
                      o.GetCreatureDataId(),
                      { FilterSameRole: !1 },
                    ),
                    void this.pHs()
                  );
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("SceneTeam", 48, "刷新出战编队，未找到存活角色"),
                n
                  ? (this.ChangeRole(n.GetCreatureDataId(), {
                      ForceChangeRole: !0,
                      AllowRefreshTransform: !0,
                    }),
                    n.EntityHandle?.Entity?.DisableByKey(1, !0))
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "SceneTeam",
                      48,
                      "刷新出战编队，数据错误，当前玩家找不到可上阵角色",
                      [
                        "CurrentRole",
                        this.$po.get(l)?.GetCurrentGroup()?.GetCurrentRole(),
                      ],
                    );
            }
            this.pHs();
          },
          -1,
        )));
  }
  Bvl(e) {
    var t;
    this.YBi &&
      ((t = this.YBi.EntityHandle?.Entity) &&
      Global_1.Global.BaseCharacter?.IsValid()
        ? e ||
          (this.GetTeamPlayerData(
            ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
          )?.IsRoleOnStageWithoutControl(this.YBi.GetCreatureDataId()) ||
            (t.DisableByKey(1, !0), t.GetComponent(91)?.SetTeamTag(2)),
          (this.YBi = void 0))
        : (this.YBi = void 0));
  }
  pHs() {
    (this.Vpo = void 0),
      (this.IsTeamReady = !0),
      this.LoadTeamPromise?.SetResult(!0),
      (this.LoadTeamPromise = void 0),
      this.ivo(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 48, "刷新出战编队，结束");
  }
  ivo() {
    var e = this.CurrentGroupType;
    if (e && !SceneTeamDefine_1.innerGroupType.includes(e)) {
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && 1 === e) {
        var t = this.zpo ?? [],
          r = [];
        for (const a of this.GetTeamItems()) r.push(a.GetConfigId);
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var o = t[e],
            i = r[e];
          o !== i &&
            (o &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RedDotRoleChange,
                o,
              ),
            i) &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RedDotRoleChange,
              i,
            );
        }
        this.zpo = r;
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
      ),
        GlobalData_1.GlobalData.GameInstance &&
          GlobalData_1.GlobalData.BpEventManager.当编队更新时.Broadcast();
    }
  }
  OnAddEntity(e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      e = e.Entity.GetComponent(0);
      if (e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        var t,
          r,
          o = e.GetCreatureDataId(),
          i = ModelManager_1.ModelManager.CreatureModel;
        for (const a of this.GetTeamItems())
          o === a.GetCreatureDataId() &&
            ((t = i.GetEntity(o)?.Entity),
            (r = i.GetScenePlayerData(a.GetPlayerId())?.IsRemoteSceneLoading()),
            t && r) &&
            t.DisableByKey(1, !0);
        if (ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady)
          for (const n of this.aPr)
            if (n.GetCreatureDataId() === o) {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("SceneTeam", 48, "更新联机场景队伍"),
                n.UpdateEntityHandle(),
                this.ivo();
              break;
            }
      }
    }
  }
  OnRemoveEntity(e) {
    var t = e.Entity,
      r = t.GetComponent(0).GetCreatureDataId();
    this.bhl.delete(r),
      e.Id === this.GetCurrentEntity?.Id &&
        ((this.LastEntityIsOnGround =
          t.GetComponent(99).PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground),
        ModelManager_1.ModelManager.GameModeModel.IsMulti ||
          this.RefreshLastTransform());
  }
  AddPreloadEntity(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 48, "添加预加载角色实体", [
        "CreatureDataId",
        e,
      ]),
      this.bhl.add(e);
  }
  GetPreloadEntityData(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    for (const i of this.bhl) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(i),
        o = r?.Entity;
      if (o?.Valid) {
        o = o.GetComponent(0);
        if (o && o.GetPlayerId() === t) {
          o = o.GetRoleId();
          if (this.Ghl(o, e)) return [i, r];
        }
      }
    }
  }
  Ghl(e, t) {
    if (e === t) return !0;
    if (
      e > RoleDefine_1.ROBOT_DATA_MIN_ID &&
      TrialRoleInfoById_1.configTrialRoleInfoById.GetConfig(e)?.GroupId === t
    )
      return !0;
    return !1;
  }
  get GetCurrentTeamItem() {
    return this.YBi;
  }
  get GetCurrentEntity() {
    return this.YBi?.EntityHandle;
  }
  get GetPhysMaterial() {
    return this.vwa;
  }
  GetTeamLength() {
    return this.aPr.length;
  }
  GetTeamPlayerSize() {
    return this.Jpo.size;
  }
  GetTeamItem(e, t) {
    for (const r of this.aPr) if (this.ovo(r, e, t)) return r;
  }
  ovo(e, t, r) {
    if (r.OnlyMyRole && !e.IsMyRole()) return !1;
    if (r.IsControl && !e.IsControl()) return !1;
    switch (r.ParamType) {
      case 0:
        return e.GetConfigId === t;
      case 1:
        return e.EntityHandle?.Id === t;
      case 2:
        return e.GetPlayerId() === t;
      case 3:
        return e.GetCreatureDataId() === t;
      default:
        return !1;
    }
  }
  GetTeamItems(e = !1) {
    var t = [];
    for (const r of this.aPr) (e && !r.IsMyRole()) || t.push(r);
    return t;
  }
  GetTeamItemsByPlayer(e) {
    var t = [];
    for (const r of this.aPr) r.GetPlayerId() === e && t.push(r);
    return t;
  }
  GetTeamRoleConfigIdList(e = !1, t = !1) {
    var r = [];
    for (const o of this.aPr)
      (e && !o.IsMyRole()) ||
        r.push(
          t
            ? ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(
                o.GetConfigId,
              )
            : o.GetConfigId,
        );
    return r;
  }
  GetTeamEntities(e = !1) {
    var t,
      r = [];
    for (const o of this.aPr)
      (e && !o.IsMyRole()) || ((t = o.EntityHandle) && r.push(t));
    return r;
  }
  GetAllGroupEntities(e) {
    var t = [],
      e = this.$po.get(e);
    if (e) {
      var r = ModelManager_1.ModelManager.CreatureModel;
      for (const i of e.GetGroupList())
        for (const a of i.GetRoleList()) {
          var o = r.GetEntity(a.CreatureDataId);
          o?.IsInit && t.push(o);
        }
    }
    return t;
  }
  GetTeamItemsInRange(e, t) {
    var r,
      o = [],
      i = t * t;
    for (const a of this.aPr)
      a.EntityHandle?.Entity &&
        (r = ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
          a.GetPlayerId(),
        )?.GetLocation()) &&
        Vector_1.Vector.DistSquared(e, r) <= i &&
        o.push(a);
    return o;
  }
  GetTeamPlayerData(e) {
    return this.$po.get(e);
  }
  ChangeRole(e, t = void 0) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 48, "开始切换角色", ["CreatureDataId", e]);
    var r = this.GetTeamItem(e, { ParamType: 3 });
    if (r && r.IsMyRole()) {
      if (!(t?.ForceChangeRole ?? !1) && r.IsDead())
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneTeam", 48, "角色已经死亡", [
            "CreatureDataId",
            e,
          ]);
      else if (!r.IsAutoRole()) {
        var o,
          i,
          a,
          n,
          s,
          l = this.GetCurrentTeamItem,
          h = l?.EntityHandle,
          _ = r.EntityHandle;
        if (_)
          return (
            (o = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
            this.$po
              .get(o)
              ?.GetCurrentGroup()
              ?.SetCurrentRole(r.GetCreatureDataId()),
            (this.YBi = r),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnBeforeChangeRole,
              _,
              h,
            ),
            (o = t?.UseGoBattleSkill ?? !1),
            (r = t?.CoolDown ?? 0),
            (i = t?.GoDownWaitSkillEnd ?? !1),
            (a = t?.AllowRefreshTransform ?? !_.Entity?.Active),
            (n = t?.ForceInheritTransform ?? !0),
            (s = t?.GoBattleInvincible ?? !1),
            (t = t?.MessageId),
            this.Xpo.Start(),
            RoleTeamComponent_1.RoleTeamComponent.OnChangeRole(
              h,
              _,
              o,
              s,
              r,
              i,
              a,
              n,
              t,
            ),
            this.Xpo.Stop(),
            h &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleGoDown,
                h.Id,
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnChangeRole,
              _,
              h,
            ),
            l
          );
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneTeam", 48, "角色实体无效", [
            "CreatureDataId",
            e,
          ]);
      }
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneTeam", 48, "队伍实例不存在或非本机角色", [
          "CreatureDataId",
          e,
        ]);
  }
  OtherPlayerChangeRole(e, t) {
    this.$po.get(e)?.GetCurrentGroup()?.SetCurrentRole(t);
  }
  RefreshLastTransform() {
    var e = this.GetCurrentEntity;
    e?.Valid
      ? (e =
          ControllerHolder_1.ControllerHolder.CharacterController.GetActor(
            e,
          ))?.IsValid()
        ? ((e = e.D_GetTransform()),
          (this.Zpo = e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("SceneTeam", 48, "刷新上一个角色的位置信息成功", [
              "transform",
              e.ToString(),
            ]))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneTeam",
            48,
            "刷新上一个角色的位置信息时，当前角色Actor已失效",
          )
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneTeam",
          48,
          "刷新上一个角色的位置信息时，当前角色实体已失效",
        );
  }
  SetLastTransform(e) {
    this.Zpo = e;
  }
  GetSpawnTransform() {
    var r = this.Zpo;
    if (r) return r;
    r = this.GetCurrentEntity;
    if (r?.Valid) return r.Entity.GetComponent(3).Actor.D_GetTransform();
    r = GlobalData_1.GlobalData.World;
    if (r) {
      let e = void 0,
        t = void 0;
      var o =
          UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TestSceneLoadBornMode(),
        o =
          (0 === o
            ? ((e =
                UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TempLocation.ToUeVector()),
              ((t =
                UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TempRotator.ToUeRotator()).Roll =
                0),
              (t.Pitch = 0))
            : 1 === o &&
              ((o = (0, puerts_1.$ref)(void 0)),
              UE.GameplayStatics.GetAllActorsOfClass(
                r,
                UE.PlayerStart.StaticClass(),
                o,
              ),
              (r = (0, puerts_1.$unref)(o).Get(0).D_GetTransform()),
              (e = r.GetLocation()),
              (t = r.Rotator())),
          UE.KismetMathLibrary.MakeTransformDouble(
            e,
            t,
            new UE.Vector(1, 1, 1),
          ));
      return o;
    }
  }
  GetChangeRoleCooldown() {
    return this.Wtc;
  }
  ResetChangeRoleCooldown() {
    this.Wtc = this.Qtc;
  }
  UpdateChangeRoleCooldown(e) {
    this.Wtc = e;
  }
  RoleDeathEnded(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 48, "开始执行队伍角色死亡逻辑", [
        "EntityId",
        e,
      ]);
    var e = this.GetTeamItem(e, { ParamType: 1 }),
      t = e?.EntityHandle?.Entity;
    if (t) {
      var r = e.GetGroupType(),
        o = e.GetPlayerId(),
        o = this.$po.get(o)?.GetCurrentGroup();
      if (o && r === o.GetGroupType())
        if (2 === o.GetLivingState() || e.IsAutoRole())
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 48, "隐藏死亡角色"),
            t.DisableByKey(1, !0);
        else if (t.GetComponent(3)?.IsAutonomousProxy) {
          e = this.GetCurrentTeamItem;
          if (e)
            if (e.IsDead()) {
              for (const a of this.GetTeamItems(!0))
                if (a.CanControl()) {
                  var i = a.GetCreatureDataId();
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("SceneTeam", 48, "前台角色死亡进行切人", [
                      "CreatureDataId",
                      i,
                    ]),
                    ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(
                      i,
                      { GoBattleInvincible: !0 },
                    );
                  break;
                }
            } else
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("SceneTeam", 48, "当前角色未死亡");
          else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 48, "死亡时编队无当前角色");
        } else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 48, "非逻辑主控死亡不进行切人");
      else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneTeam",
            48,
            "死亡角色非玩家当前编队",
            ["DeadGroupType", r],
            ["CurrentGroupType", o?.GetGroupType()],
          );
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 48, "无法获取死亡角色Entity");
  }
  IsAllDid() {
    for (const e of this.aPr) if (!e.IsDead()) return !1;
    return !0;
  }
  GetCurrentGroupLivingState(e) {
    e = this.$po.get(e)?.GetCurrentGroup();
    return e ? e.GetLivingState() : 0;
  }
  GetGroupLivingState(e, t) {
    e = this.$po.get(e)?.GetGroup(t);
    return e ? e.GetLivingState() : 0;
  }
  InitializeOfflineSceneTeam(e, t, r) {
    if (1 !== UE.Actor.GetKuroNetMode()) {
      var o = [
          ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
          ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
          ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
        ],
        i = 100003,
        a = [0 < e ? e : i, 0 < t ? t : i, 0 < r ? r : i],
        n = this.GetSpawnTransform();
      if (n) {
        const f = [];
        var s = a.length;
        let t = s;
        for (let e = 1; e <= s; ++e) {
          var l = o[e - 1];
          const m = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
          var h = a[e - 1],
            _ = Protocol_1.Aki.Protocol.c3s.create();
          (_.s5n = MathUtils_1.MathUtils.NumberToLong(l)),
            (_.l8n = WorldGlobal_1.WorldGlobal.ToTsVector(n.GetLocation())),
            (_._8n = WorldGlobal_1.WorldGlobal.ToTsRotator(
              n.GetRotation().Rotator(),
            )),
            (_.rVn = !0),
            (_.W5n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
            (_.zHn = Protocol_1.Aki.Protocol.kks.Proto_Player),
            (_.ZHn = Protocol_1.Aki.Protocol.rLs.Proto_Character),
            (_.v9n = a[e - 1]);
          const g =
            ControllerHolder_1.ControllerHolder.CreatureController.CreateEntity(
              _,
              "InitializeOfflineSceneTeam",
            );
          _ = new SceneTeamData_1.SceneTeamRole();
          (_.CreatureDataId = l),
            (_.RoleId = h),
            f.push(_),
            ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
              g,
              (e) => {
                e &&
                  (t--,
                  (e = g?.Entity) &&
                    (e.CheckGetComponent(91)?.SetTeamTag(2),
                    e.DisableByKey(1, !0)),
                  0 === t) &&
                  (this.UpdateGroupData(m, {
                    GroupType: 1,
                    GroupRoleList: f,
                    CurrentRoleId: f[0].RoleId,
                  }),
                  this.SwitchGroup(m, 1));
              },
            );
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneTeam",
            48,
            "初始化失败队伍失败，GetSpawnTransform为空。",
          );
    }
  }
}
exports.SceneTeamModel = SceneTeamModel;
//# sourceMappingURL=SceneTeamModel.js.map
