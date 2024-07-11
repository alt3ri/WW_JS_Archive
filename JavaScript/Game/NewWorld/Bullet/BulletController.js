"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, l) {
    var o,
      i = arguments.length,
      n =
        i < 3
          ? t
          : null === l
            ? (l = Object.getOwnPropertyDescriptor(t, r))
            : l;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, r, l);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (n = (i < 3 ? o(n) : 3 < i ? o(t, r, n) : o(t, r)) || n);
    return 3 < i && n && Object.defineProperty(t, r, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletController = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../Core/Entity/Entity"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  PerformanceDecorators_1 = require("../../../Core/Performance/PerformanceDecorators"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../Common/StatDefine"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds"),
  BulletActionRunner_1 = require("./Action/BulletActionRunner"),
  BulletConfig_1 = require("./BulletConfig"),
  BulletConstant_1 = require("./BulletConstant"),
  BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction"),
  BulletPool_1 = require("./Model/BulletPool"),
  BulletCollisionSystem_1 = require("./System/BulletCollisionSystem"),
  BulletMoveSystem_1 = require("./System/BulletMoveSystem");
class BulletController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        ((BulletConstant_1.BulletConstant.OpenCreateLog = !0),
        (BulletConstant_1.BulletConstant.OpenActionStat = !0)),
      BulletActionRunner_1.BulletActionRunner.InitStat(),
      this.Q9o || (this.Q9o = new BulletActionRunner_1.BulletActionRunner()),
      this.Q9o.Init(),
      BulletPool_1.BulletPool.Init(),
      (this.X9o.length = 0),
      this.X9o.push(new BulletMoveSystem_1.BulletMoveSystem()),
      this.X9o.push(new BulletCollisionSystem_1.BulletCollisionSystem()),
      this.sCe(),
      !0
    );
  }
  static OnTick(e) {
    if (this.Q9o) {
      this.Q9o.Pause();
      for (const t of this.X9o) t.OnTick(e);
      this.Q9o.Resume(),
        this.Q9o.Run(e),
        ConfigManager_1.ConfigManager.BulletConfig.TickPreload();
    }
  }
  static OnAfterTick(e) {
    if (this.X9o && this.Q9o) {
      this.Q9o.Pause();
      for (const t of this.X9o) t.OnAfterTick(e);
      this.Q9o.Resume(),
        this.Q9o.Run(e, !0),
        BulletPool_1.BulletPool.CheckAtFrameEnd();
    }
  }
  static OnClear() {
    return (
      this.Q9o.Clear(),
      this.aCe(),
      BulletPool_1.BulletPool.Clear(),
      !(this.X9o.length = 0)
    );
  }
  static OnLeaveLevel() {
    return (
      BulletConfig_1.BulletConfig.ClearBulletDataCache(),
      ConfigManager_1.ConfigManager.BulletConfig.ClearPreload(),
      !0
    );
  }
  static GetActionCenter() {
    return this.Q9o.GetActionCenter();
  }
  static GetActionRunner() {
    return this.Q9o;
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSkillEnd,
      BulletController.bJe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        BulletController.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      );
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSkillEnd,
      BulletController.bJe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        BulletController.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      );
  }
  static HasAuthority(e) {
    return (
      (e instanceof Entity_1.Entity
        ? e.GetComponent(3)?.Actor
        : e
      )?.IsAutonomousProxy() ?? !1
    );
  }
  static CreateBulletCustomTarget(
    e,
    t,
    r,
    {
      SkillId: l = 0,
      SyncType: o = 0,
      ParentVictimId: i = 0,
      ParentTargetId: n = 0,
      ParentId: a = 0,
      Size: s,
      InitTargetLocation: u,
      Source: _ = Protocol_1.Aki.Protocol.C4s.Proto_NormalSource,
      LocationOffset: f,
      BeginRotatorOffset: c,
      DtType: d = -1,
    } = {},
    B = void 0,
  ) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      StatDefine_1.BATTLESTAT_ENABLED,
        e ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 21, "创建子弹时Owner为空", [
              "rowName",
              t,
            ])),
        B ||
          (0, CharacterBuffIds_1.checkBulletInSpecialList)(t) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 36, "创建子弹时contextId为空", [
              "rowName",
              t,
            ]));
      var M = e instanceof Entity_1.Entity ? e : e.GetEntityNoBlueprint(),
        g = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
          M,
          t,
          !0,
          d,
        );
      if (g) {
        var C,
          o = BulletController.J2n(o, g);
        if (1 !== o || BulletController.HasAuthority(e))
          return (
            (e = this.Y9o(M, g, t, i, n)),
            (C = this.J9o(M, g, t, i, n)),
            (i = this.z2n(M, g, t, i, n)),
            (n = this.CreateBullet(
              M,
              t,
              r,
              {
                SkillId: l,
                SyncType: o,
                ParentId: a,
                BulletData: g,
                TargetId: e,
                BaseTransformId: i,
                BaseVelocityId: C,
                Size: s,
                InitTargetLocation: u,
                Source: _,
                LocationOffset: f,
                BeginRotatorOffset: c,
                DtType: d,
              },
              B,
            )),
            StatDefine_1.BATTLESTAT_ENABLED,
            n
          );
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            18,
            "等待远端创建同步子弹",
            ["bulletRowName", t],
            ["skillId", l],
          ),
          StatDefine_1.BATTLESTAT_ENABLED;
      }
    }
  }
  static z2n(e, t, r, l, o) {
    var i = t.Base.BornPositionStandard;
    if (1 === i) return this.z9o(e, r);
    if (5 === i)
      return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
        e.Id,
        t.Base.BlackboardKey,
        r,
      );
    if (7 === i) return l;
    if (8 === i) return o;
    if (10 === i)
      return (l = parseInt(t.Base.BlackboardKey)), this.Z9o(e, l, r);
    if (4 === i) {
      o = e.GetComponent(29)?.GetCurrentTarget();
      if (o?.Valid) return o.Id;
    } else if (9 === i) return this.Z2n();
    return 0;
  }
  static J2n(e, t) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && 0 === e) {
      if (1 === t.Base.SyncType) return 1;
      var r = t.Base.BornPositionStandard;
      if (4 === r || 9 === r || 10 === r) return 1;
      r = t.Move.InitVelocityDirStandard;
      if (10 === r || 5 === r) return 1;
      r = t.Move.TrackTarget;
      if (4 === r || 3 === r) return 1;
    }
    return e;
  }
  static CreateBulletForDebug(e, t) {
    var e = e.GetEntityNoBlueprint()?.Id ?? 0,
      e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
      r = new Protocol_1.Aki.Protocol.Pzn();
    return (
      (r.BVn = 0),
      (r.y8n = `@gmcreatebullet ${e} ` + t),
      Net_1.Net.Call(29711, Protocol_1.Aki.Protocol.Pzn.create(r), () => {}),
      0
    );
  }
  static Y9o(e, t, r, l, o) {
    var i = t.Move.TrackTarget;
    if (4 === i || 3 === i) {
      var n = e.GetComponent(29)?.GetCurrentTarget();
      if (n?.Valid) return n.Id;
    } else {
      if (5 === i)
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
          e.Id,
          t.Move.TrackTargetBlackboardKey,
          r,
        );
      if (7 === i) {
        if (l) return l;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 21, "父子弹受击者 VictimId为空", [
            "rowName",
            r,
          ]);
      } else if (8 === i) {
        if (o) return o;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 21, "父子弹目标为空", ["rowName", r]);
      } else {
        if (6 === i) return e.Id;
        if (2 === i) return BulletController.z9o(e, r);
        if (1 === i) {
          if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
            return Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
          (n = e.GetComponent(0)),
            (t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
              n.GetPlayerId(),
              { ParamType: 2, IsControl: !0 },
            ).EntityHandle);
          if (t?.Valid) return t.Id;
        } else if (9 === i) return this.Z2n();
      }
    }
    return 0;
  }
  static z9o(e, t) {
    var r,
      e = e.GetComponent(33)?.SkillTarget;
    return (
      BulletConstant_1.BulletConstant.OpenCreateLog &&
        ((r = e?.Entity?.GetComponent(1)?.Owner?.GetName()),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Bullet",
          21,
          "获取技能目标",
          ["BulletId", t],
          ["Target", r ?? StringUtils_1.NONE_STRING],
        ),
      e?.Valid ? e.Id : 0
    );
  }
  static Z2n() {
    var e =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        29,
      )?.GetCurrentTarget();
    return e?.Valid ? e.Id : 0;
  }
  static J9o(e, t, r, l, o) {
    var i = t.Move.InitVelocityDirStandard;
    if (5 === i) {
      var n = e.GetComponent(29)?.GetCurrentTarget();
      if (n?.Valid) return n.Id;
    } else {
      if (6 === i)
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
          e.Id,
          t.Move.TrackTargetBlackboardKey,
          r,
        );
      if (11 === i)
        return (n = parseInt(t.Move.InitVelocityDirParam)), this.Z9o(e, n, r);
      if (10 === i) return this.Z2n();
      if (8 === i) return l;
      if (9 === i) return o;
    }
    return 0;
  }
  static CreateBullet(
    e,
    t,
    r,
    {
      SkillId: l = 0,
      SyncType: o = 0,
      ParentId: i,
      BulletData: n,
      TargetId: a = 0,
      BaseTransformId: s,
      BaseVelocityId: u,
      Size: _,
      InitTargetLocation: f,
      Source: c = Protocol_1.Aki.Protocol.C4s.Proto_NormalSource,
      LocationOffset: d,
      BeginRotatorOffset: B,
      DtType: M = -1,
      RandomPosOffset: g = void 0,
      RandomInitSpeedOffset: C = void 0,
    } = {},
    h = void 0,
  ) {
    var m = 2 === o,
      e = ModelManager_1.ModelManager.BulletModel.CreateBullet(
        e,
        t,
        r,
        f,
        l,
        i,
        m,
        a,
        s,
        u,
        _,
        n,
        o,
        h,
        c,
        d,
        B,
        M,
        g,
        C,
      );
    if (e?.Valid) return e;
  }
  static DestroyBullet(e, t, r = 0) {
    StatDefine_1.BATTLESTAT_ENABLED,
      ModelManager_1.ModelManager.BulletModel.DestroyBullet(e, t, r),
      StatDefine_1.BATTLESTAT_ENABLED;
  }
  static DestroyAllBullet(e = !1) {
    ModelManager_1.ModelManager.BulletModel.DestroyAllBullet(e);
  }
  static DestroySpecifiedBullet(t, r, l = !1, o = 0) {
    if (1 === o) {
      let e = !1;
      o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
      for (const i of o)
        if (i.Id === t) {
          e = !0;
          break;
        }
      if (e) for (const n of o) this.DestroyBulletByOwnerIdAndName(n.Id, r, l);
    } else this.DestroyBulletByOwnerIdAndName(t, r, l);
  }
  static DestroyBulletByOwnerIdAndName(e, t, r = !1) {
    e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(e);
    if (e)
      for (const l of e)
        l.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(t) &&
          BulletController.DestroyBullet(l.Id, r);
  }
  static GetSpecifiedBulletCount(e, t) {
    let r = 0;
    e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(e);
    if (e)
      for (const l of e)
        l.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(t) && r++;
    return r;
  }
  static AddSimpleAction(e, t) {
    t = this.GetActionCenter().CreateBulletActionInfo(t);
    this.Q9o.AddAction(e, t);
  }
  static SetTimeDilation(e) {
    for (const t of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator())
      for (const r of t) r.SetTimeDilation(e);
  }
  static CreateBulletNotify(t, r) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone && t) {
      var l = r.X4n,
        o = String(MathUtils_1.MathUtils.LongToBigInt(r.ujn)),
        i = r?.YDs,
        i =
          (i
            ? (i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
                MathUtils_1.MathUtils.LongToNumber(i),
              )?.Entity?.GetComponent(3)) &&
              this.Mme.FromUeTransform(i.ActorTransform)
            : void 0 !== r?.y5n || void 0 !== r?.a8n
              ? (this.Mme.Reset(),
                (i = r.y5n),
                (n = r.a8n) &&
                  (this.cie.DeepCopy(n),
                  this.cie.Quaternion(this.e7o),
                  this.Mme.SetRotation(this.e7o)),
                i && this.Mme.SetLocation(i),
                this.Mme.SetScale3D(Vector_1.Vector.OneVectorProxy))
              : (n = t?.CheckGetComponent(3)) &&
                (this.Mme.SetLocation(n.ActorLocationProxy),
                this.cie.DeepCopy(n.ActorRotationProxy),
                this.Mme.SetRotation(n.ActorQuatProxy)),
          ModelManager_1.ModelManager.CreatureModel.GetEntityId(
            MathUtils_1.MathUtils.LongToNumber(r.mjn),
          )),
        n = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(r.djn),
        ),
        a = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(r.sVn),
        );
      let e = void 0;
      r.XDs && (e = new UE.Vector(r.XDs.X, r.XDs.Y, r.XDs.Z));
      t = BulletController.t7o(
        t,
        o,
        this.Mme.ToUeTransform(),
        l,
        i,
        n,
        a,
        MathUtils_1.MathUtils.LongToBigInt(r.G8n.k8n),
        e,
        r.gjn,
        r.fjn,
        r.pjn,
        r.u8n,
      );
      t &&
        (ModelManager_1.ModelManager.BulletModel.RegisterBullet(r.iVn, t.Id),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            18,
            "创建子弹Notify",
            ["bulletRowName", o],
            ["skillId", l],
            ["handleId", r.iVn?.rVn],
            ["playerId", r.iVn?.q5n],
            ["Location", this.Mme.GetLocation()],
            ["Rotation", this.cie],
            ["TargetId", r.sVn],
            ["CurrentTargetId", a],
          ),
        t.Data.Render.HandOverParentEffect) &&
        ((i = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
          r.cjn,
        )),
        (n =
          ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
            i,
          )?.GetBulletInfo()),
        (o = t.GetBulletInfo()),
        n &&
          o &&
          BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(n, o),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Bullet", 18, "接手父子弹特效", ["parentBulletId", i]);
    }
  }
  static DestroyBulletNotify(e, t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Bullet",
        18,
        "删除子弹Notify",
        ["handleId", t?.iVn?.rVn],
        ["playerId", t?.iVn?.q5n],
      ),
      ModelManager_1.ModelManager.BulletModel.DestroyBulletRemote(t.iVn, t.JDs);
  }
  static ModifyBulletParamsNotify(e, t) {
    var r = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
        t?.vjn?.iVn,
      ),
      r = EntitySystem_1.EntitySystem.Get(r),
      t = MathUtils_1.MathUtils.LongToNumber(t.vjn.sVn),
      l = ModelManager_1.ModelManager.CreatureModel.GetEntity(t),
      t =
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            21,
            "收到修改子弹目标通知",
            ["新的目标id", l.Id],
            ["CreatureId", t],
          ),
        r.GetBulletInfo());
    t && t.SetTargetById(l.Id);
  }
  static t7o(
    e,
    t,
    r,
    l,
    o,
    i,
    n,
    a,
    s,
    u = -1,
    _ = void 0,
    f = void 0,
    c = void 0,
  ) {
    StatDefine_1.BATTLESTAT_ENABLED;
    e = this.CreateBullet(
      e,
      t,
      r,
      {
        SkillId: l,
        SyncType: 2,
        BaseTransformId: o,
        BaseVelocityId: i,
        TargetId: n,
        InitTargetLocation: s,
        DtType: u,
        RandomPosOffset: _,
        RandomInitSpeedOffset: f,
        Size: c ? Vector_1.Vector.Create(c) : void 0,
      },
      a,
    );
    return StatDefine_1.BATTLESTAT_ENABLED, e;
  }
  static Z9o(e, t, r) {
    if (isNaN(t))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 21, "pos NAN！", ["bulletRowName", r]);
    else {
      e = e.GetComponent(0).CustomServerEntityIds;
      if (t > e.length || 0 === t)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            21,
            "pos不合法！",
            ["bulletRowName", r],
            ["pos", t],
            ["serverEntityIds", e],
          );
      else {
        var l = ModelManager_1.ModelManager.CreatureModel.GetEntity(e[t - 1]);
        if (l) return l.Id;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            21,
            "无法找到伴生物实体",
            ["bulletRowName", r],
            ["pos", t],
            ["serverEntityIds", e],
          );
      }
    }
    return 0;
  }
  static GetBulletCreateStat(e) {
    let t = this.i7o.get(e);
    return t || ((t = void 0), this.i7o.set(e, t)), t;
  }
  static GetBulletDestroyStat(e) {
    let t = this.o7o.get(e);
    return t || ((t = void 0), this.o7o.set(e, t)), t;
  }
  static GetBulletMoveTickStat(e) {
    let t = this.r7o.get(e);
    return t || ((t = void 0), this.r7o.set(e, t)), t;
  }
  static GetBulletCollisionTickStat(e) {
    let t = this.n7o.get(e);
    return t || ((t = void 0), this.n7o.set(e, t)), t;
  }
  static GetBulletCollisionAfterTickStat(e) {
    let t = this.s7o.get(e);
    return t || ((t = void 0), this.s7o.set(e, t)), t;
  }
  static GetSceneBulletOwner() {
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(
      ModelManager_1.ModelManager.BulletModel.SceneBulletOwnerId,
    );
  }
}
(BulletController.X9o = []),
  (BulletController.Q9o = void 0),
  (BulletController.i7o = new Map()),
  (BulletController.o7o = new Map()),
  (BulletController.r7o = new Map()),
  (BulletController.n7o = new Map()),
  (BulletController.s7o = new Map()),
  (BulletController.bJe = (e, t) => {
    if (t) {
      e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(e);
      if (e)
        for (const o of e) {
          var r,
            l = o.GetBulletInfo();
          t === l.BulletInitParams.SkillId &&
            ((r = l.BulletDataMain).Move.IsDetachOnSkillEnd &&
              l.Actor.K2_DetachFromActor(1, 1, 1),
            r.Base.DestroyOnSkillEnd) &&
            ((l.IsDestroyByCharSkillEnd = !0),
            BulletController.DestroyBullet(o.Id, !1));
        }
    }
  }),
  (BulletController.zpe = (e, t) => {
    t && BulletConfig_1.BulletConfig.RemoveCacheBulletDataByEntityId(t.Id);
  }),
  (BulletController.nye = () => {
    ModelManager_1.ModelManager.BulletModel.WaitSceneBulletOwnerInit();
  }),
  (BulletController.$9o = void 0),
  (BulletController.Mme = Transform_1.Transform.Create()),
  (BulletController.cie = Rotator_1.Rotator.Create()),
  (BulletController.e7o = Quat_1.Quat.Create()),
  __decorate(
    [(0, PerformanceDecorators_1.TickPerformanceEx)("Bullet", !1, 0)],
    BulletController,
    "CreateBullet",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("uFn")],
    BulletController,
    "CreateBulletNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("cFn")],
    BulletController,
    "DestroyBulletNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("PFn")],
    BulletController,
    "ModifyBulletParamsNotify",
    null,
  ),
  (exports.BulletController = BulletController);
//# sourceMappingURL=BulletController.js.map
