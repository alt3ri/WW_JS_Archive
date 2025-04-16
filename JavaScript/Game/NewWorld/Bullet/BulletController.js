"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, r, l) {
    var o,
      i = arguments.length,
      a =
        i < 3
          ? e
          : null === l
            ? (l = Object.getOwnPropertyDescriptor(e, r))
            : l;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, r, l);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (a = (i < 3 ? o(a) : 3 < i ? o(e, r, a) : o(e, r)) || a);
    return 3 < i && a && Object.defineProperty(e, r, a), a;
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
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../Utils/CombatLog"),
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
  static OnTick(t) {
    if (this.Q9o) {
      this.Q9o.Pause();
      for (const e of this.X9o) e.OnTick(t);
      this.Q9o.Resume(),
        this.Q9o.Run(t),
        ConfigManager_1.ConfigManager.BulletConfig.TickPreload();
    }
  }
  static OnAfterTick(t) {
    if (this.X9o && this.Q9o) {
      this.Q9o.Pause();
      for (const e of this.X9o) e.OnAfterTick(t);
      this.Q9o.Resume(),
        this.Q9o.Run(t, !0),
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
        EventDefine_1.EEventName.SetNiagaraQuality,
        BulletController.mna,
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
        EventDefine_1.EEventName.SetNiagaraQuality,
        BulletController.mna,
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
      SkillContextId: o,
      SyncType: i = 0,
      ParentVictimId: a = 0,
      ParentTargetId: n = 0,
      ParentId: s = 0,
      Size: u,
      InitTargetLocation: _,
      Source: f = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource,
      LocationOffset: B,
      BeginRotatorOffset: c,
      DtType: d = -1,
      CreateOnAuthority: C = !0,
      BattleFlags: g = void 0,
      ParentIds: M = void 0,
    } = {},
    h = void 0,
  ) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone)
      if (
        (StatDefine_1.BATTLESTAT_ENABLED &&
          (this.GetBulletCreateStat(e).Start(),
          StatDefine_1.battleStat.BulletCreate?.Start()),
        t ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 20, "创建子弹时Owner为空", [
              "rowName",
              e,
            ])),
        h || (0, CharacterBuffIds_1.checkBulletInSpecialList)(e))
      ) {
        var m = t instanceof Entity_1.Entity ? t : t.GetEntityNoBlueprint(),
          S =
            (BulletController.$9o.Start(),
            ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
              m,
              e,
              !0,
              d,
            ));
        if (S) {
          BulletController.$9o.Stop();
          i = BulletController.sNn(i, S);
          if (!C || 1 !== i || BulletController.HasAuthority(t))
            return (
              (C = this.Y9o(m, S, e, a, n)),
              (t = this.J9o(m, S, e, a, n)),
              (a = this.aNn(m, S, e, a, n)),
              (n = this.CreateBullet(
                m,
                e,
                r,
                {
                  SkillId: l,
                  SkillContextId: o,
                  SyncType: i,
                  ParentId: s,
                  BulletData: S,
                  TargetId: C,
                  BaseTransformId: a,
                  BaseVelocityId: t,
                  Size: u,
                  InitTargetLocation: _,
                  Source: f,
                  LocationOffset: B,
                  BeginRotatorOffset: c,
                  DtType: d,
                  BattleFlags: g,
                  ParentIds: M,
                },
                h,
              )),
              StatDefine_1.BATTLESTAT_ENABLED &&
                (StatDefine_1.battleStat.BulletCreate?.Stop(),
                this.GetBulletCreateStat(e).Stop()),
              n
            );
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Bullet",
              17,
              "等待远端创建同步子弹",
              ["bulletRowName", e],
              ["skillId", l],
            ),
            StatDefine_1.BATTLESTAT_ENABLED &&
              (StatDefine_1.battleStat.BulletCreate?.Stop(),
              this.GetBulletCreateStat(e).Stop());
        }
      } else
        CombatLog_1.CombatLog.Error("Bullet", 35, "创建子弹时contextId为空", [
          "rowName",
          e,
        ]);
  }
  static aNn(t, e, r, l, o) {
    var i = e.Base.BornPositionStandard;
    if (1 === i) return this.z9o(t, r);
    if (5 === i)
      return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
        t.Id,
        e.Base.BlackboardKey,
        r,
      );
    if (7 === i) return l;
    if (8 === i) return o;
    if (10 === i || 11 === i)
      return (l = parseInt(e.Base.BlackboardKey)), this.Z9o(t, l, r);
    if (4 === i) {
      o = t.GetComponent(32)?.GetCurrentTarget();
      if (o?.Valid) return o.Id;
    } else if (9 === i) return this.hNn();
    return 0;
  }
  static sNn(t, e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && 0 === t) {
      if (1 === e.Base.SyncType) return 1;
      var r = e.Base.BornPositionStandard;
      if (4 === r || 9 === r || 10 === r) return 1;
      r = e.Move.InitVelocityDirStandard;
      if (10 === r || 5 === r) return 1;
      r = e.Move.TrackTarget;
      if (4 === r || 3 === r) return 1;
      r = e.Execution;
      if ((r.InitGbGroup(), r.HasRebound)) return 1;
    }
    return t;
  }
  static CreateBulletForDebug(t, e) {
    var t = t.GetEntityNoBlueprint()?.Id ?? 0,
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t),
      r = new Protocol_1.Aki.Protocol.Gzn();
    return (
      (r.VVn = 0),
      (r.P8n = `@gmcreatebullet ${t} ` + e),
      Net_1.Net.Call(24668, Protocol_1.Aki.Protocol.Gzn.create(r), () => {}),
      0
    );
  }
  static Y9o(t, e, r, l, o) {
    var i = e.Move.TrackTarget;
    if (4 === i || 3 === i) {
      var a = t.GetComponent(32)?.GetCurrentTarget();
      if (a?.Valid) return a.Id;
    } else {
      if (5 === i)
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
          t.Id,
          e.Move.TrackTargetBlackboardKey,
          r,
        );
      if (7 === i) {
        if (l) return l;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 20, "父子弹受击者 VictimId为空", [
            "rowName",
            r,
          ]);
      } else if (8 === i) {
        if (o) return o;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 20, "父子弹目标为空", ["rowName", r]);
      } else {
        if (6 === i) return t.Id;
        if (2 === i || 11 === i) return BulletController.z9o(t, r);
        if (1 === i) {
          if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
            return Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
          (a = t.GetComponent(0)),
            (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
              a.GetPlayerId(),
              { ParamType: 2, IsControl: !0 },
            ).EntityHandle);
          if (e?.Valid) return e.Id;
        } else if (9 === i) return this.hNn();
      }
    }
    return 0;
  }
  static z9o(t, e) {
    var r,
      t = t.GetComponent(39)?.SkillTarget;
    return (
      BulletConstant_1.BulletConstant.OpenCreateLog &&
        ((r = t?.Entity?.GetComponent(1)?.Owner?.GetName()),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug(
          "Bullet",
          20,
          "获取技能目标",
          ["BulletId", e],
          ["Target", r ?? StringUtils_1.NONE_STRING],
        ),
      t?.Valid ? t.Id : 0
    );
  }
  static hNn() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        32,
      )?.GetCurrentTarget();
    return t?.Valid ? t.Id : 0;
  }
  static J9o(t, e, r, l, o) {
    var i = e.Move.InitVelocityDirStandard;
    if (5 === i) {
      var a = t.GetComponent(32)?.GetCurrentTarget();
      if (a?.Valid) return a.Id;
    } else {
      if (6 === i)
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
          t.Id,
          e.Move.TrackTargetBlackboardKey,
          r,
        );
      if (11 === i || 12 === i)
        return (a = parseInt(e.Move.InitVelocityDirParam)), this.Z9o(t, a, r);
      if (10 === i) return this.hNn();
      if (8 === i) return l;
      if (9 === i) return o;
    }
    return 0;
  }
  static CreateBullet(
    t,
    e,
    r,
    {
      SkillId: l = 0,
      SkillContextId: o = BigInt(0),
      SyncType: i = 0,
      ParentId: a,
      BulletData: n,
      TargetId: s = 0,
      BaseTransformId: u,
      BaseVelocityId: _,
      Size: f,
      InitTargetLocation: B,
      Source: c = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource,
      LocationOffset: d,
      BeginRotatorOffset: C,
      DtType: g = -1,
      RandomPosOffset: M = void 0,
      RandomInitSpeedOffset: h = void 0,
      BattleFlags: m = void 0,
      ParentIds: S = void 0,
    } = {},
    y = void 0,
  ) {
    var v = 2 === i,
      t = ModelManager_1.ModelManager.BulletModel.CreateBullet(
        t,
        e,
        r,
        B,
        l,
        a,
        v,
        s,
        u,
        _,
        f,
        n,
        i,
        y,
        o,
        c,
        d,
        C,
        g,
        M,
        h,
        m,
        S,
      );
    if (t?.Valid) return t;
  }
  static DestroyBullet(t, e, r = 0) {
    StatDefine_1.BATTLESTAT_ENABLED &&
      StatDefine_1.battleStat.BulletDestroy?.Start(),
      ModelManager_1.ModelManager.BulletModel.DestroyBullet(t, e, r),
      StatDefine_1.BATTLESTAT_ENABLED &&
        StatDefine_1.battleStat.BulletDestroy?.Stop();
  }
  static DestroyAllBullet(t = !1) {
    ModelManager_1.ModelManager.BulletModel.DestroyAllBullet(t);
  }
  static DestroySpecifiedBullet(e, r, l = !1, o = 0, i = 0) {
    if (1 === o) {
      let t = !1;
      o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
      for (const a of o)
        if (a.Id === e) {
          t = !0;
          break;
        }
      if (t)
        for (const n of o) this.DestroyBulletByOwnerIdAndName(n.Id, r, l, i);
    } else this.DestroyBulletByOwnerIdAndName(e, r, l, i);
  }
  static DestroyBulletByOwnerIdAndName(e, r, l = !1, o = 0) {
    e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(e);
    if (e)
      if (o <= 0)
        for (const t of e)
          t.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(r) &&
            BulletController.DestroyBullet(t.Id, l);
      else {
        let t = 0;
        for (const i of e)
          i.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(r) &&
            (BulletController.DelayDestroyBullet(i.GetBulletInfo(), l, t * o),
            t++);
      }
  }
  static DelayDestroyBullet(t, e, r) {
    var l;
    r <= 0
      ? BulletController.DestroyBullet(t.BulletEntityId, e)
      : (((l =
          BulletController.GetActionCenter().CreateBulletActionInfo(
            17,
          )).DelayTime = r * TimeUtil_1.TimeUtil.InverseMillisecond),
        (l.SummonChild = e),
        (l.IgnoreBulletActorTimeScale = !0),
        BulletController.GetActionRunner().AddAction(t, l),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            17,
            "延迟销毁子弹",
            ["BulletId", t.BulletRowName],
            ["EntityId", t.BulletEntityId],
            ["delayTime", l.DelayTime],
          ));
  }
  static GetSpecifiedBulletCount(t, e) {
    let r = 0;
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t)
      for (const l of t)
        l.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(e) && r++;
    return r;
  }
  static AddSimpleAction(t, e) {
    e = this.GetActionCenter().CreateBulletActionInfo(e);
    this.Q9o.AddAction(t, e);
  }
  static SetTimeDilation(t) {
    for (const e of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator())
      for (const r of e) r.SetTimeDilation(t);
  }
  static CreateBulletNotify(r, l) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone && r) {
      var o = l.r5n,
        i = String(MathUtils_1.MathUtils.LongToBigInt(l.Mjn)),
        a = l?.rAs;
      let t = !1;
      a &&
        (s = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          MathUtils_1.MathUtils.LongToNumber(a),
        ))?.Valid &&
        (s.IsInit
          ? ((n = s.Entity.GetComponent(1)),
            this.Mme.FromUeTransform(n.ActorTransform))
          : ((n = s.Entity.GetComponent(0)),
            this.Mme.FromUeTransform(n.D_GetTransform()),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Bullet",
                20,
                "实体未加载完成, 从CreatureData里面获取信息",
                ["Transform", this.Mme.ToUeTransform().ToString()],
                ["Bullet", i],
                ["Creature", a],
              )),
        (t = !0)),
        t ||
          (void 0 !== l?.P5n || void 0 !== l?.g8n
            ? (this.Mme.Reset(),
              (s = l.P5n),
              (n = l.g8n) &&
                (this.cie.DeepCopy(n),
                this.cie.Quaternion(this.e7o),
                this.Mme.SetRotation(this.e7o)),
              s && this.Mme.SetLocation(s),
              this.Mme.SetScale3D(Vector_1.Vector.OneVectorProxy))
            : (a = r?.CheckGetComponent(3)) &&
              (this.Mme.SetLocation(a.ActorLocationProxy),
              this.cie.DeepCopy(a.ActorRotationProxy),
              this.Mme.SetRotation(a.ActorQuatProxy)));
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(l.Ejn),
        ),
        s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(l.yjn),
        ),
        a = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(l.CVn),
        );
      let e = void 0;
      l.iAs && (e = new UE.VectorDouble(l.iAs.X, l.iAs.Y, l.iAs.Z));
      r = BulletController.t7o(
        r,
        i,
        this.Mme.ToUeTransform(),
        o,
        n,
        s,
        a,
        MathUtils_1.MathUtils.LongToBigInt(l.K8n.$8n),
        e,
        l.Tjn,
        l.Ljn,
        l.Djn,
        l.M8n,
      );
      r &&
        (ModelManager_1.ModelManager.BulletModel.RegisterBullet(l.uVn, r.Id),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            17,
            "创建子弹Notify",
            ["bulletRowName", i],
            ["skillId", o],
            ["handleId", l.uVn?.cVn],
            ["playerId", l.uVn?.W5n],
            ["Location", this.Mme.GetLocation()],
            ["Rotation", this.cie],
            ["TargetId", l.CVn],
            ["CurrentTargetId", a],
          ),
        r.Data.Render.HandOverParentEffect) &&
        ((n = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
          l.Sjn,
        )),
        (s =
          ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
            n,
          )?.GetBulletInfo()),
        (i = r.GetBulletInfo()),
        s &&
          i &&
          BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(s, i),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("Bullet", 17, "接手父子弹特效", ["parentBulletId", n]);
    }
  }
  static DestroyBulletNotify(t, e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Bullet",
        17,
        "删除子弹Notify",
        ["handleId", e?.uVn?.cVn],
        ["playerId", e?.uVn?.W5n],
      ),
      ModelManager_1.ModelManager.BulletModel.DestroyBulletRemote(e.uVn, e.oAs);
  }
  static ModifyBulletParamsNotify(t, e) {
    var r = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
        e?.Ajn?.uVn,
      ),
      r = EntitySystem_1.EntitySystem.Get(r),
      e = MathUtils_1.MathUtils.LongToNumber(e.Ajn.CVn),
      l = ModelManager_1.ModelManager.CreatureModel.GetEntity(e),
      e =
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            20,
            "收到修改子弹目标通知",
            ["新的目标id", l?.Id],
            ["CreatureId", e],
          ),
        r?.GetBulletInfo());
    e && l?.Valid && e.SetTargetById(l.Id);
  }
  static t7o(
    t,
    e,
    r,
    l,
    o,
    i,
    a,
    n,
    s,
    u = -1,
    _ = void 0,
    f = void 0,
    B = void 0,
  ) {
    StatDefine_1.BATTLESTAT_ENABLED &&
      (this.GetBulletCreateStat(e).Start(),
      StatDefine_1.battleStat.BulletCreate?.Start());
    t = this.CreateBullet(
      t,
      e,
      r,
      {
        SkillId: l,
        SyncType: 2,
        BaseTransformId: o,
        BaseVelocityId: i,
        TargetId: a,
        InitTargetLocation: s,
        DtType: u,
        RandomPosOffset: _,
        RandomInitSpeedOffset: f,
        Size: B ? Vector_1.Vector.Create(B) : void 0,
      },
      n,
    );
    return (
      StatDefine_1.BATTLESTAT_ENABLED &&
        (StatDefine_1.battleStat.BulletCreate?.Stop(),
        this.GetBulletCreateStat(e).Stop()),
      t
    );
  }
  static Z9o(t, e, r) {
    if (isNaN(e))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 20, "pos NAN！", ["bulletRowName", r]);
    else {
      t = t.GetComponent(0).CustomServerEntityIds;
      if (e > t.length || 0 === e)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            20,
            "pos不合法！",
            ["bulletRowName", r],
            ["pos", e],
            ["serverEntityIds", t],
          );
      else {
        var l = ModelManager_1.ModelManager.CreatureModel.GetEntity(t[e - 1]);
        if (l) return l.Id;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            20,
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
    let e = this.i7o.get(t);
    return (
      e ||
        ((e = Stats_1.Stat.CreateNoFlameGraph("BulletCreate" + t)),
        this.i7o.set(t, e)),
      e
    );
  }
  static GetBulletDestroyStat(t) {
    let e = this.o7o.get(t);
    return (
      e ||
        ((e = Stats_1.Stat.CreateNoFlameGraph("BulletDestroy" + t)),
        this.o7o.set(t, e)),
      e
    );
  }
  static GetBulletMoveTickStat(t) {
    let e = this.r7o.get(t);
    return (
      e ||
        ((e = Stats_1.Stat.CreateNoFlameGraph("BulletMoveTick" + t)),
        this.r7o.set(t, e)),
      e
    );
  }
  static GetBulletCollisionTickStat(t) {
    let e = this.n7o.get(t);
    return (
      e ||
        ((e = Stats_1.Stat.CreateNoFlameGraph("BulletCollisionTick" + t)),
        this.n7o.set(t, e)),
      e
    );
  }
  static GetBulletCollisionAfterTickStat(t) {
    let e = this.s7o.get(t);
    return (
      e ||
        ((e = Stats_1.Stat.CreateNoFlameGraph("BulletCollisionAfterTick" + t)),
        this.s7o.set(t, e)),
      e
    );
  }
  static GetSceneBulletOwner() {
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(
      ModelManager_1.ModelManager.BulletModel.SceneBulletOwnerId,
    );
  }
  static SetBulletSpeedRatio(t, e) {
    t =
      ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
        t,
      )?.GetBulletInfo()?.MoveInfo;
    t && (t.BulletSpeedRatio = e);
  }
  static SetBulletLiveRatio(t, e) {
    t =
      ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
        t,
      )?.GetBulletInfo();
    t && (t.LiveTimeRatio = e);
  }
}
(BulletController.X9o = []),
  (BulletController.Q9o = void 0),
  (BulletController.i7o = new Map()),
  (BulletController.o7o = new Map()),
  (BulletController.r7o = new Map()),
  (BulletController.n7o = new Map()),
  (BulletController.s7o = new Map()),
  (BulletController.bJe = (t, e) => {
    if (e) {
      t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
      if (t)
        for (const o of t) {
          var r,
            l = o.GetBulletInfo();
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
  (BulletController.mna = () => {
    for (const e of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
      var t = e.GetBulletInfo();
      t.NeedDestroy ||
        BulletStaticFunction_1.BulletStaticFunction.UpdateEffectQualityLevel(t);
    }
  }),
  (BulletController.$9o = Stats_1.Stat.Create("BulletConfigGetData")),
  (BulletController.Mme = Transform_1.Transform.Create()),
  (BulletController.cie = Rotator_1.Rotator.Create()),
  (BulletController.e7o = Quat_1.Quat.Create()),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("MFn", !0)],
    BulletController,
    "CreateBulletNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("SFn", !0)],
    BulletController,
    "DestroyBulletNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("FFn", !0)],
    BulletController,
    "ModifyBulletParamsNotify",
    null,
  ),
  (exports.BulletController = BulletController);
//# sourceMappingURL=BulletController.js.map
