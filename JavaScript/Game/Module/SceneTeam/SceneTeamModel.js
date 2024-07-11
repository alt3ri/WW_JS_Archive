"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamModel = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../Common/StatDefine"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  RoleTeamComponent_1 = require("../../NewWorld/Character/Role/Component/RoleTeamComponent"),
  GameModePromise_1 = require("../../World/Define/GameModePromise"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  WorldGlobal_1 = require("../../World/WorldGlobal"),
  UiBlueprintFunctionLibrary_1 = require("../BpBridge/UiBlueprintFunctionLibrary"),
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
      (this.CurrentGroupType = void 0),
      (this.Vpo = void 0),
      (this.zpo = void 0),
      (this.YBi = void 0),
      (this.IsTeamReady = !1),
      (this.GoBattleInvincible = !1),
      (this.ChangingRole = !1),
      (this.IsPhantomTeam = !1),
      (this.ChangeCreatureDataIdCache = 0),
      (this.ChangeRoleCooldown = -0),
      (this.Zpo = void 0),
      (this.LastEntityIsOnGround = !0),
      (this.LoadTeamPromise = void 0);
  }
  OnInit() {
    return (
      (this.ChangeRoleCooldown =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "change_role_cooldown",
        )),
      !(this.Xpo = void 0)
    );
  }
  OnLeaveLevel() {
    return this.evo(), !0;
  }
  OnChangeMode() {
    return this.evo(), !0;
  }
  evo() {
    (this.ChangeCreatureDataIdCache = 0), (this.Zpo = void 0);
    for (const e of this.$po.values()) e.Clear();
    this.$po.clear();
    for (const t of this.aPr) t.Reset();
    (this.aPr.length = 0),
      this.Jpo.clear(),
      (this.Vpo = void 0),
      (this.YBi = void 0),
      (this.IsPhantomTeam = !1),
      (this.zpo = void 0);
  }
  SwitchGroup(e, t, r = !1) {
    var o,
      i = this.$po.get(e);
    i
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneTeam",
            49,
            "切换编队组",
            ["PlayerId", e],
            ["GroupType", t],
          ),
        t !== i.GetCurrentGroupType() &&
          ((o = this.CurrentGroupType),
          i.SwitchGroup(t),
          e === ModelManager_1.ModelManager.PlayerInfoModel?.GetId() &&
            ((this.CurrentGroupType = t), (this.IsPhantomTeam = 2 === t)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnUpdateTeamGroupType,
          ),
          this.tvo(o, r)))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneTeam", 49, "切换编队组玩家不存在", [
          "PlayerId",
          e,
        ]);
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
        t.IsRetain ?? !1,
      ),
      r.RefreshEntityVisible(),
      t.GroupType === this.$po.get(e)?.GetCurrentGroupType() && this.tvo();
  }
  UpdateAllPlayerData(t) {
    var r = [];
    for (const a of this.$po.keys()) {
      let e = !1;
      for (const n of t)
        if (n.PlayerId === a) {
          e = !0;
          break;
        }
      e || r.push(a);
    }
    for (const s of r) this.$po.get(s)?.Clear(), this.$po.delete(s);
    var e = this.CurrentGroupType;
    for (const l of t) {
      var o = l.PlayerId;
      let e = this.$po.get(o);
      e ||
        ((e = SceneTeamData_1.SceneTeamPlayer.Create(o)), this.$po.set(o, e));
      var i = l.CurrentGroupType;
      e.SwitchGroup(i),
        o === ModelManager_1.ModelManager.PlayerInfoModel?.GetId() &&
          ((this.CurrentGroupType = i), (this.IsPhantomTeam = 2 === i));
      for (const _ of l.Groups)
        e.UpdateGroup(
          _.GroupType,
          _.GroupRoleList,
          _.CurrentRoleId,
          _.LivingState ?? 1,
          _.IsFixedLocation ?? !1,
          _.IsRetain ?? !1,
        );
      e.RefreshEntityVisible();
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnUpdateTeamGroupType,
    ),
      this.tvo(e);
  }
  UpdateGroupLivingStates(e, t) {
    var r = this.$po.get(e);
    if (r) for (var [o, i] of t) r.GetGroup(o)?.UpdateLivingState(i);
  }
  tvo(i = this.CurrentGroupType ?? 0, a = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，开始"),
      (this.IsTeamReady = !1),
      this.RefreshLastTransform(),
      (this.aPr.length = 0),
      this.Jpo.clear(),
      this.LoadTeamPromise ||
        (this.LoadTeamPromise = new GameModePromise_1.GameModePromise()),
      this.Vpo &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，中断等待"),
        this.Vpo.Cancel());
    let n = void 0,
      s = !1;
    var e = [];
    const l = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    for (const c of ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
      : [l]) {
      var t = this.$po.get(c)?.GetCurrentGroup(),
        r = t?.GetRoleList();
      if (r && 0 !== r.length) {
        c === l && (s = !t.IsFixedLocation);
        var o = t.GetGroupType(),
          _ = t.GetCurrentRole();
        for (const d of r) {
          var h,
            m,
            f = d.CreatureDataId;
          f <= 0 ||
            ((m = d.RoleId),
            (h = d === _),
            (m = SceneTeamItem_1.SceneTeamItem.Create(o, c, m, f)),
            this.aPr.push(m),
            this.Jpo.add(c),
            e.push(f),
            m.IsMyRole()
              ? h &&
                (f = (n = m).EntityHandle?.Entity)?.Valid &&
                f.Active &&
                f.GetComponent(188)?.HasAnyTag([-1384309247, -1388400236]) &&
                (s = !1)
              : m.SetRemoteIsControl(h));
        }
      }
    }
    this.GetTeamItems(!0).length <= 0
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneTeam", 49, "刷新出战编队，当前玩家无角色实体")
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，等待加载开始"),
        (this.Vpo = WaitEntityTask_1.WaitEntityTask.Create(
          e,
          (e) => {
            e ||
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("SceneTeam", 49, "刷新出战编队，加载角色失败")),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，等待加载结束");
            for (const t of this.aPr) t.UpdateEntityHandle();
            this.RefreshLastTransform();
            e = this.CurrentGroupType;
            if (
              (!e ||
                e === i ||
                SceneTeamDefine_1.innerGroupType.includes(i) ||
                SceneTeamDefine_1.innerGroupType.includes(e) ||
                (this.YBi = void 0),
              this.YBi?.EntityHandle?.Valid || (this.YBi = void 0),
              n && !n.IsDead())
            ) {
              const r = n.EntityHandle;
              r && r.Id === this.YBi?.EntityHandle?.Id
                ? (this.YBi = n)
                : this.ChangeRole(n.GetCreatureDataId(), {
                    UseGoBattleSkill: a,
                    AllowRefreshTransform: s,
                  }),
                void this.sHs();
            } else {
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneTeam",
                  49,
                  "刷新出战编队，当前角色不可上阵",
                );
              for (const o of this.aPr)
                if (o.IsMyRole() && !o.IsDead())
                  return (
                    ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(
                      o.GetCreatureDataId(),
                      { FilterSameRole: !1 },
                    ),
                    void this.sHs()
                  );
              if (
                (Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "SceneTeam",
                    49,
                    "刷新出战编队，未找到存活角色",
                  ),
                n)
              ) {
                this.ChangeRole(n.GetCreatureDataId(), { ForceChangeRole: !0 });
                const r = n.EntityHandle?.Entity;
                r &&
                  ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                    r,
                    !1,
                    "SceneTeamControl.SwitchRoleAllDead",
                  );
              } else
                Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "SceneTeam",
                    49,
                    "刷新出战编队，数据错误，当前玩家找不到可上阵角色",
                    [
                      "CurrentRole",
                      this.$po.get(l)?.GetCurrentGroup()?.GetCurrentRole(),
                    ],
                  );
              this.sHs();
            }
          },
          !0,
          -1,
        )));
  }
  sHs() {
    (this.Vpo = void 0),
      (this.IsTeamReady = !0),
      this.LoadTeamPromise?.SetResult(!0),
      (this.LoadTeamPromise = void 0),
      this.ivo(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，结束");
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
  AddEntity(e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      e = e.Entity.GetComponent(0);
      if (e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player) {
        var t,
          r,
          o = e.GetCreatureDataId(),
          i = ModelManager_1.ModelManager.CreatureModel;
        for (const a of this.GetTeamItems())
          o === a.GetCreatureDataId() &&
            ((t = i.GetEntity(o)?.Entity),
            (r = i.GetScenePlayerData(a.GetPlayerId())?.IsRemoteSceneLoading()),
            t && r) &&
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              t,
              !1,
              "模拟端加载中，暂时隐藏实体",
            );
        if (ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady)
          for (const n of this.aPr)
            if (n.GetCreatureDataId() === o) {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("SceneTeam", 49, "更新联机场景队伍"),
                n.UpdateEntityHandle(),
                this.ivo();
              break;
            }
      }
    }
  }
  get GetCurrentTeamItem() {
    return this.YBi;
  }
  get GetCurrentEntity() {
    return this.YBi?.EntityHandle;
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
      Log_1.Log.Info("SceneTeam", 49, "开始切换角色", ["CreatureDataId", e]);
    var r = this.GetTeamItem(e, { ParamType: 3 });
    if (r && r.IsMyRole()) {
      var o = t?.UseGoBattleSkill ?? !1,
        i = t?.CoolDown ?? 0,
        a = t?.GoDownWaitSkillEnd ?? !1,
        n = t?.AllowRefreshTransform ?? !0,
        s = t?.ForceInheritTransform ?? !0;
      if (!(t?.ForceChangeRole ?? !1) && r.IsDead())
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneTeam", 49, "角色已经死亡", [
            "CreatureDataId",
            e,
          ]);
      else {
        var l,
          t = this.GetCurrentTeamItem,
          _ = t?.EntityHandle,
          h = r.EntityHandle;
        if (h)
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "角色上阵", [
                "CreatureDataId",
                e,
              ]),
            (l = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
            ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
              l,
            )?.ControlRole(r.GetCreatureDataId()),
            this.$po
              .get(l)
              ?.GetCurrentGroup()
              ?.SetCurrentRole(r.GetCreatureDataId()),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SceneTeam",
                49,
                "替换队伍当前角色",
                ["LastEntity", _?.Id],
                ["NewEntity", h.Id],
              ),
            (this.YBi = r),
            RoleTeamComponent_1.RoleTeamComponent.OnChangeRole(
              _,
              h,
              o,
              i,
              a,
              n,
              s,
            ),
            _ &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleGoDown,
                _.Id,
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnChangeRole,
              h,
              _,
            ),
            t
          );
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneTeam", 49, "角色实体无效", [
            "CreatureDataId",
            e,
          ]);
      }
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneTeam", 49, "队伍实例不存在或非本机角色", [
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
      ? (e = CharacterController_1.CharacterController.GetActor(e))?.IsValid()
        ? ((e = e.GetTransform()),
          (this.Zpo = e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("SceneTeam", 8, "刷新上一个角色的位置信息成功", [
              "transform",
              e.ToString(),
            ]))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneTeam",
            8,
            "刷新上一个角色的位置信息时，当前角色Actor已失效",
          )
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneTeam",
          8,
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
    if (r?.Valid) return r.Entity.GetComponent(3).Actor.GetTransform();
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
              (r = (0, puerts_1.$unref)(o).Get(0).GetTransform()),
              (e = r.GetLocation()),
              (t = r.Rotator())),
          UE.KismetMathLibrary.MakeTransform(e, t, new UE.Vector(1, 1, 1)));
      return o;
    }
  }
  RoleDeathEnded(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 49, "开始执行队伍角色死亡逻辑", [
        "EntityId",
        e,
      ]);
    var e = this.GetTeamItem(e, { ParamType: 1 }),
      t = e?.EntityHandle?.Entity;
    if (t) {
      var r = e.GetGroupType(),
        e = e.GetPlayerId(),
        e = this.$po.get(e)?.GetCurrentGroup();
      if (e && r === e.GetGroupType())
        if (2 === e.GetLivingState())
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "隐藏死亡角色"),
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              t,
              !1,
              "SceneTeamControl.RoleDeathEnded",
            );
        else if (t.GetComponent(3)?.IsAutonomousProxy) {
          t = this.GetCurrentTeamItem;
          if (t)
            if (t.IsDead()) {
              for (const i of this.GetTeamItems(!0))
                if (!i.IsDead()) {
                  var o = i.GetCreatureDataId();
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("SceneTeam", 49, "前台角色死亡进行切人", [
                      "CreatureDataId",
                      o,
                    ]),
                    (this.GoBattleInvincible = !0),
                    ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(
                      o,
                    );
                  break;
                }
            } else
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("SceneTeam", 49, "当前角色未死亡");
          else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "死亡时编队无当前角色");
        } else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 49, "非逻辑主控死亡不进行切人");
      else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneTeam",
            49,
            "死亡角色非玩家当前编队",
            ["DeadGroupType", r],
            ["CurrentGroupType", e?.GetGroupType()],
          );
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "无法获取死亡角色Entity");
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
        const m = [];
        var s = a.length;
        let t = s;
        for (let e = 1; e <= s; ++e) {
          var l = o[e - 1];
          const f = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
          var _ = a[e - 1],
            h = Protocol_1.Aki.Protocol.n3s.create();
          (h.J4n = MathUtils_1.MathUtils.NumberToLong(l)),
            (h.e8n = WorldGlobal_1.WorldGlobal.ToTsVector(n.GetLocation())),
            (h.t8n = WorldGlobal_1.WorldGlobal.ToTsRotator(
              n.GetRotation().Rotator(),
            )),
            (h.X8n = !0),
            (h.q5n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
            (h.HHn = Protocol_1.Aki.Protocol.wks.Proto_Player),
            (h.jHn = Protocol_1.Aki.Protocol.YTs.Proto_Character),
            (h._9n = a[e - 1]);
          const c =
            ControllerHolder_1.ControllerHolder.CreatureController.CreateEntity(
              h,
              "InitializeOfflineSceneTeam",
            );
          h = new SceneTeamData_1.SceneTeamRole();
          (h.CreatureDataId = l),
            (h.RoleId = _),
            m.push(h),
            ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
              c,
              (e) => {
                e &&
                  (t--,
                  (e = c?.Entity) &&
                    (e.CheckGetComponent(83)?.SetTeamTag(2),
                    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                      e,
                      !1,
                      "InitOfflineTeam",
                    )),
                  0 === t) &&
                  (this.UpdateGroupData(f, {
                    GroupType: 1,
                    GroupRoleList: m,
                    CurrentRoleId: m[0].RoleId,
                  }),
                  this.SwitchGroup(f, 1));
              },
            );
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneTeam",
            49,
            "初始化失败队伍失败，GetSpawnTransform为空。",
          );
    }
  }
}
exports.SceneTeamModel = SceneTeamModel;
//# sourceMappingURL=SceneTeamModel.js.map
