"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, r, l) {
    let o;
    const i = arguments.length;
    let n =
      i < 3 ? e : l === null ? (l = Object.getOwnPropertyDescriptor(e, r)) : l;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, r, l);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (o = t[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, r, n) : o(e, r)) || n);
    return i > 3 && n && Object.defineProperty(e, r, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletController = void 0);
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../Core/Entity/Entity");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const PerformanceDecorators_1 = require("../../../Core/Performance/PerformanceDecorators");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const StatDefine_1 = require("../../Common/StatDefine");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage");
const CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds");
const BulletActionRunner_1 = require("./Action/BulletActionRunner");
const BulletConfig_1 = require("./BulletConfig");
const BulletConstant_1 = require("./BulletConstant");
const BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction");
const BulletPool_1 = require("./Model/BulletPool");
const BulletCollisionSystem_1 = require("./System/BulletCollisionSystem");
const BulletMoveSystem_1 = require("./System/BulletMoveSystem");
class BulletController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        ((BulletConstant_1.BulletConstant.OpenCreateLog = !0),
        (BulletConstant_1.BulletConstant.OpenActionStat = !0)),
      BulletActionRunner_1.BulletActionRunner.InitStat(),
      this.Y8o || (this.Y8o = new BulletActionRunner_1.BulletActionRunner()),
      this.Y8o.Init(),
      BulletPool_1.BulletPool.Init(),
      (this.J8o.length = 0),
      this.J8o.push(new BulletMoveSystem_1.BulletMoveSystem()),
      this.J8o.push(new BulletCollisionSystem_1.BulletCollisionSystem()),
      this.sCe(),
      !0
    );
  }
  static OnTick(t) {
    if (this.Y8o) {
      this.Y8o.Pause();
      for (const e of this.J8o) e.OnTick(t);
      this.Y8o.Resume(),
        this.Y8o.Run(t),
        ConfigManager_1.ConfigManager.BulletConfig.TickPreload();
    }
  }
  static OnAfterTick(t) {
    if (this.J8o && this.Y8o) {
      this.Y8o.Pause();
      for (const e of this.J8o) e.OnAfterTick(t);
      this.Y8o.Resume(),
        this.Y8o.Run(t, !0),
        BulletPool_1.BulletPool.CheckAtFrameEnd();
    }
  }
  static OnClear() {
    return (
      this.Y8o.Clear(),
      this.aCe(),
      BulletPool_1.BulletPool.Clear(),
      !(this.J8o.length = 0)
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
    return this.Y8o.GetActionCenter();
  }
  static GetActionRunner() {
    return this.Y8o;
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSkillEnd,
      BulletController.yYe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        BulletController.zpe,
      );
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSkillEnd,
      BulletController.yYe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        BulletController.zpe,
      );
  }
  static HasAuthority(t) {
    return (
      (t instanceof Entity_1.Entity
        ? t.GetComponent(3)?.Actor
        : t
      )?.IsAutonomousProxy() ?? !1
    );
  }
  static CreateBulletCustomTarget(
    t,
    e,
    r,
    {
      SkillId: l = 0,
      SyncType: o = 0,
      ParentVictimId: i = 0,
      ParentTargetId: n = 0,
      ParentId: a = 0,
      Size: s,
      InitTargetLocation: u,
      Source: _ = Protocol_1.Aki.Protocol.LOs.Proto_NormalSource,
      LocationOffset: f,
      DtType: c = -1,
    } = {},
    d = void 0,
  ) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      StatDefine_1.BATTLESTAT_ENABLED,
        t ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 21, "创建子弹时Owner为空", [
              "rowName",
              e,
            ])),
        d ||
          (0, CharacterBuffIds_1.checkBulletInSpecialList)(e) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 36, "创建子弹时contextId为空", [
              "rowName",
              e,
            ]));
      const B = t instanceof Entity_1.Entity ? t : t.GetEntityNoBlueprint();
      const C = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
        B,
        e,
        !0,
        c,
      );
      if (C) {
        let M;
        var o = BulletController.Qqn(o, C);
        if (o !== 1 || BulletController.HasAuthority(t))
          return (
            (t = this.Z8o(B, C, e, i, n)),
            (M = this.e9o(B, C, e, i, n)),
            (i = this.$qn(B, C, e, i, n)),
            (n = this.CreateBullet(
              B,
              e,
              r,
              {
                SkillId: l,
                SyncType: o,
                ParentId: a,
                BulletData: C,
                TargetId: t,
                BaseTransformId: i,
                BaseVelocityId: M,
                Size: s,
                InitTargetLocation: u,
                Source: _,
                LocationOffset: f,
                DtType: c,
              },
              d,
            )),
            StatDefine_1.BATTLESTAT_ENABLED,
            n
          );
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            18,
            "等待远端创建同步子弹",
            ["bulletRowName", e],
            ["skillId", l],
          ),
          StatDefine_1.BATTLESTAT_ENABLED;
      }
    }
  }
  static $qn(t, e, r, l, o) {
    const i = e.Base.BornPositionStandard;
    if (i === 1) return this.t9o(t, r);
    if (i === 5)
      return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
        t.Id,
        e.Base.BlackboardKey,
        r,
      );
    if (i === 7) return l;
    if (i === 8) return o;
    if (i === 10)
      return (l = parseInt(e.Base.BlackboardKey)), this.i9o(t, l, r);
    if (i === 4) {
      o = t.GetComponent(29)?.GetCurrentTarget();
      if (o?.Valid) return o.Id;
    } else if (i === 9) return this.Xqn();
    return 0;
  }
  static Qqn(t, e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && t === 0) {
      if (e.Base.SyncType === 1) return 1;
      let r = e.Base.BornPositionStandard;
      if (r === 4 || r === 9 || r === 10) return 1;
      r = e.Move.InitVelocityDirStandard;
      if (r === 10 || r === 5) return 1;
      r = e.Move.TrackTarget;
      if (r === 4 || r === 3) return 1;
    }
    return t;
  }
  static CreateBulletForDebug(t, e) {
    var t = t.GetEntityNoBlueprint()?.Id ?? 0;
    var t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
    const r = new Protocol_1.Aki.Protocol.qQn();
    return (
      (r.Z4n = 0),
      (r.H3n = `@gmcreatebullet ${t} ` + e),
      Net_1.Net.Call(28935, Protocol_1.Aki.Protocol.qQn.create(r), () => {}),
      0
    );
  }
  static Z8o(t, e, r, l, o) {
    const i = e.Move.TrackTarget;
    if (i === 4 || i === 3) {
      var n = t.GetComponent(29)?.GetCurrentTarget();
      if (n?.Valid) return n.Id;
    } else {
      if (i === 5)
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
          t.Id,
          e.Move.TrackTargetBlackboardKey,
          r,
        );
      if (i === 7) {
        if (l) return l;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 21, "父子弹受击者 VictimId为空", [
            "rowName",
            r,
          ]);
      } else if (i === 8) {
        if (o) return o;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 21, "父子弹目标为空", ["rowName", r]);
      } else {
        if (i === 6) return t.Id;
        if (i === 2) return BulletController.t9o(t, r);
        if (i === 1) {
          if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
            return Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
          (n = t.GetComponent(0)),
            (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
              n.GetPlayerId(),
              { ParamType: 2, IsControl: !0 },
            ).EntityHandle);
          if (e?.Valid) return e.Id;
        } else if (i === 9) return this.Xqn();
      }
    }
    return 0;
  }
  static t9o(t, e) {
    let r;
    var t = t.GetComponent(33)?.SkillTarget;
    return (
      BulletConstant_1.BulletConstant.OpenCreateLog &&
        ((r = t?.Entity?.GetComponent(1)?.Owner?.GetName()),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Bullet",
          21,
          "获取技能目标",
          ["BulletId", e],
          ["Target", r ?? StringUtils_1.NONE_STRING],
        ),
      t?.Valid ? t.Id : 0
    );
  }
  static Xqn() {
    const t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        29,
      )?.GetCurrentTarget();
    return t?.Valid ? t.Id : 0;
  }
  static e9o(t, e, r, l, o) {
    const i = e.Move.InitVelocityDirStandard;
    if (i === 5) {
      var n = t.GetComponent(29)?.GetCurrentTarget();
      if (n?.Valid) return n.Id;
    } else {
      if (i === 6)
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
          t.Id,
          e.Move.TrackTargetBlackboardKey,
          r,
        );
      if (i === 11)
        return (n = parseInt(e.Move.InitVelocityDirParam)), this.i9o(t, n, r);
      if (i === 10) return this.Xqn();
      if (i === 8) return l;
      if (i === 9) return o;
    }
    return 0;
  }
  static CreateBullet(
    t,
    e,
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
      Source: c = Protocol_1.Aki.Protocol.LOs.Proto_NormalSource,
      LocationOffset: d,
      DtType: B = -1,
      RandomPosOffset: C = void 0,
      RandomInitSpeedOffset: M = void 0,
    } = {},
    g = void 0,
  ) {
    const h = o === 2;
    var t = ModelManager_1.ModelManager.BulletModel.CreateBullet(
      t,
      e,
      r,
      f,
      l,
      i,
      h,
      a,
      s,
      u,
      _,
      n,
      o,
      g,
      c,
      d,
      B,
      C,
      M,
    );
    if (t?.Valid) return t;
  }
  static DestroyBullet(t, e, r = 0) {
    StatDefine_1.BATTLESTAT_ENABLED,
      ModelManager_1.ModelManager.BulletModel.DestroyBullet(t, e, r),
      StatDefine_1.BATTLESTAT_ENABLED;
  }
  static DestroyAllBullet(t = !1) {
    ModelManager_1.ModelManager.BulletModel.DestroyAllBullet(t);
  }
  static AddSimpleAction(t, e) {
    e = this.GetActionCenter().CreateBulletActionInfo(e);
    this.Y8o.AddAction(t, e);
  }
  static SetTimeDilation(t) {
    for (const e of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator())
      for (const r of e) r.SetTimeDilation(t);
  }
  static CreateBulletNotify(e, r) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone && e) {
      const l = r.vkn;
      let o = String(MathUtils_1.MathUtils.LongToBigInt(r.wVn));
      var i = r?.UIs;
      var i =
        (i
          ? (i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(i),
            )?.Entity?.GetComponent(3)) &&
            this.Mme.FromUeTransform(i.ActorTransform)
          : void 0 !== r?.$kn || void 0 !== r?.D3n
            ? (this.Mme.Reset(),
              (i = r.$kn),
              (n = r.D3n) &&
                (this.cie.DeepCopy(n),
                this.cie.Quaternion(this.o9o),
                this.Mme.SetRotation(this.o9o)),
              i && this.Mme.SetLocation(i),
              this.Mme.SetScale3D(Vector_1.Vector.OneVectorProxy))
            : (n = e?.CheckGetComponent(3)) &&
              (this.Mme.SetLocation(n.ActorLocationProxy),
              this.cie.DeepCopy(n.ActorRotationProxy),
              this.Mme.SetRotation(n.ActorQuatProxy)),
        ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(r.qVn),
        ));
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        MathUtils_1.MathUtils.LongToNumber(r.GVn),
      );
      const a = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
        MathUtils_1.MathUtils.LongToNumber(r.L4n),
      );
      let t = void 0;
      r.PIs && (t = new UE.Vector(r.PIs.X, r.PIs.Y, r.PIs.Z));
      e = BulletController.r9o(
        e,
        o,
        this.Mme.ToUeTransform(),
        l,
        i,
        n,
        a,
        MathUtils_1.MathUtils.LongToBigInt(r.r4n.s4n),
        t,
        r.NVn,
        r.kVn,
        r.FVn,
      );
      e &&
        (ModelManager_1.ModelManager.BulletModel.RegisterBullet(r.E4n, e.Id),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            18,
            "创建子弹Notify",
            ["bulletRowName", o],
            ["skillId", l],
            ["handleId", r.E4n?.y4n],
            ["playerId", r.E4n?.aFn],
            ["Location", this.Mme.GetLocation()],
            ["Rotation", this.cie],
            ["TargetId", r.L4n],
            ["CurrentTargetId", a],
          ),
        e.Data.Render.HandOverParentEffect) &&
        ((i = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
          r.bVn,
        )),
        (n =
          ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
            i,
          )?.GetBulletInfo()),
        (o = e.GetBulletInfo()),
        n &&
          o &&
          BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(n, o),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Bullet", 18, "接手父子弹特效", ["parentBulletId", i]);
    }
  }
  static DestroyBulletNotify(t, e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Bullet",
        18,
        "删除子弹Notify",
        ["handleId", e?.E4n?.y4n],
        ["playerId", e?.E4n?.aFn],
      ),
      ModelManager_1.ModelManager.BulletModel.DestroyBulletRemote(e.E4n, e.wIs);
  }
  static ModifyBulletParamsNotify(t, e) {
    var r = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
      e?.VVn?.E4n,
    );
    var r = EntitySystem_1.EntitySystem.Get(r);
    var e = MathUtils_1.MathUtils.LongToNumber(e.VVn.L4n);
    const l = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    var e =
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          21,
          "收到修改子弹目标通知",
          ["新的目标id", l.Id],
          ["CreatureId", e],
        ),
      r.GetBulletInfo());
    e && e.SetTargetById(l.Id);
  }
  static r9o(t, e, r, l, o, i, n, a, s, u = -1, _ = void 0, f = void 0) {
    StatDefine_1.BATTLESTAT_ENABLED;
    t = this.CreateBullet(
      t,
      e,
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
      },
      a,
    );
    return StatDefine_1.BATTLESTAT_ENABLED, t;
  }
  static i9o(t, e, r) {
    if (isNaN(e))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 21, "pos NAN！", ["bulletRowName", r]);
    else {
      t = t.GetComponent(0).CustomServerEntityIds;
      if (e > t.length || e === 0)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            21,
            "pos不合法！",
            ["bulletRowName", r],
            ["pos", e],
            ["serverEntityIds", t],
          );
      else {
        const l = ModelManager_1.ModelManager.CreatureModel.GetEntity(t[e - 1]);
        if (l) return l.Id;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            21,
            "无法找到伴生物实体",
            ["bulletRowName", r],
            ["pos", e],
            ["serverEntityIds", t],
          );
      }
    }
    return 0;
  }
  static GetBulletCreateStat(t) {
    let e = this.n9o.get(t);
    return e || ((e = void 0), this.n9o.set(t, e)), e;
  }
  static GetBulletDestroyStat(t) {
    let e = this.s9o.get(t);
    return e || ((e = void 0), this.s9o.set(t, e)), e;
  }
  static GetBulletMoveTickStat(t) {
    let e = this.a9o.get(t);
    return e || ((e = void 0), this.a9o.set(t, e)), e;
  }
  static GetBulletCollisionTickStat(t) {
    let e = this.h9o.get(t);
    return e || ((e = void 0), this.h9o.set(t, e)), e;
  }
  static GetBulletCollisionAfterTickStat(t) {
    let e = this.l9o.get(t);
    return e || ((e = void 0), this.l9o.set(t, e)), e;
  }
}
(BulletController.J8o = []),
  (BulletController.Y8o = void 0),
  (BulletController.n9o = new Map()),
  (BulletController.s9o = new Map()),
  (BulletController.a9o = new Map()),
  (BulletController.h9o = new Map()),
  (BulletController.l9o = new Map()),
  (BulletController.yYe = (t, e) => {
    if (e) {
      t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
      if (t)
        for (const o of t) {
          var r;
          const l = o.GetBulletInfo();
          e === l.BulletInitParams.SkillId &&
            ((r = l.BulletDataMain).Move.IsDetachOnSkillEnd &&
              l.Actor.K2_DetachFromActor(1, 1, 1),
            r.Base.DestroyOnSkillEnd) &&
            ((l.IsDestroyByCharSkillEnd = !0),
            BulletController.DestroyBullet(o.Id, !1));
        }
    }
  }),
  (BulletController.zpe = (t, e) => {
    e && BulletConfig_1.BulletConfig.RemoveCacheBulletDataByEntityId(e.Id);
  }),
  (BulletController.z8o = void 0),
  (BulletController.Mme = Transform_1.Transform.Create()),
  (BulletController.cie = Rotator_1.Rotator.Create()),
  (BulletController.o9o = Quat_1.Quat.Create()),
  __decorate(
    [(0, PerformanceDecorators_1.TickPerformanceEx)("Bullet", !1, 0)],
    BulletController,
    "CreateBullet",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("qOn")],
    BulletController,
    "CreateBulletNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("GOn")],
    BulletController,
    "DestroyBulletNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("r2n")],
    BulletController,
    "ModifyBulletParamsNotify",
    null,
  ),
  (exports.BulletController = BulletController);
// # sourceMappingURL=BulletController.js.map
