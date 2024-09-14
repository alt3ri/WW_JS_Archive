"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, r, l) {
    var o,
      i = arguments.length,
      n =
        i < 3
          ? e
          : null === l
            ? (l = Object.getOwnPropertyDescriptor(e, r))
            : l;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, r, l);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (o = t[a]) && (n = (i < 3 ? o(n) : 3 < i ? o(e, r, n) : o(e, r)) || n);
    return 3 < i && n && Object.defineProperty(e, r, n), n;
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
      Source: _ = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource,
      LocationOffset: f,
      BeginRotatorOffset: c,
      DtType: B = -1,
      CreateOnAuthority: d = !0,
    } = {},
    C = void 0,
  ) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      StatDefine_1.BATTLESTAT_ENABLED &&
        (this.GetBulletCreateStat(e).Start(),
        StatDefine_1.battleStat.BulletCreate.Start()),
        t ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Bullet", 21, "创建子弹时Owner为空", [
              "rowName",
              e,
            ])),
        C ||
          (0, CharacterBuffIds_1.checkBulletInSpecialList)(e) ||
          CombatLog_1.CombatLog.Error("Bullet", 36, "创建子弹时contextId为空", [
            "rowName",
            e,
          ]);
      var M = t instanceof Entity_1.Entity ? t : t.GetEntityNoBlueprint(),
        g =
          (BulletController.$9o.Start(),
          ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(
            M,
            e,
            !0,
            B,
          ));
      if (g) {
        BulletController.$9o.Stop();
        o = BulletController.sNn(o, g);
        if (!d || 1 !== o || BulletController.HasAuthority(t))
          return (
            (d = this.Y9o(M, g, e, i, n)),
            (t = this.J9o(M, g, e, i, n)),
            (i = this.aNn(M, g, e, i, n)),
            (n = this.CreateBullet(
              M,
              e,
              r,
              {
                SkillId: l,
                SyncType: o,
                ParentId: a,
                BulletData: g,
                TargetId: d,
                BaseTransformId: i,
                BaseVelocityId: t,
                Size: s,
                InitTargetLocation: u,
                Source: _,
                LocationOffset: f,
                BeginRotatorOffset: c,
                DtType: B,
              },
              C,
            )),
            StatDefine_1.BATTLESTAT_ENABLED &&
              (StatDefine_1.battleStat.BulletCreate.Stop(),
              this.GetBulletCreateStat(e).Stop()),
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
          StatDefine_1.BATTLESTAT_ENABLED &&
            (StatDefine_1.battleStat.BulletCreate.Stop(),
            this.GetBulletCreateStat(e).Stop());
      }
    }
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
    if (10 === i)
      return (l = parseInt(e.Base.BlackboardKey)), this.Z9o(t, l, r);
    if (4 === i) {
      o = t.GetComponent(29)?.GetCurrentTarget();
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
      Net_1.Net.Call(29319, Protocol_1.Aki.Protocol.Gzn.create(r), () => {}),
      0
    );
  }
  static Y9o(t, e, r, l, o) {
    var i = e.Move.TrackTarget;
    if (4 === i || 3 === i) {
      var n = t.GetComponent(29)?.GetCurrentTarget();
      if (n?.Valid) return n.Id;
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
          Log_1.Log.Error("Bullet", 21, "父子弹受击者 VictimId为空", [
            "rowName",
            r,
          ]);
      } else if (8 === i) {
        if (o) return o;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 21, "父子弹目标为空", ["rowName", r]);
      } else {
        if (6 === i) return t.Id;
        if (2 === i) return BulletController.z9o(t, r);
        if (1 === i) {
          if (!ModelManager_1.ModelManager.GameModeModel.IsMulti)
            return Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
          (n = t.GetComponent(0)),
            (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
              n.GetPlayerId(),
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
      t = t.GetComponent(34)?.SkillTarget;
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
  static hNn() {
    var t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
        29,
      )?.GetCurrentTarget();
    return t?.Valid ? t.Id : 0;
  }
  static J9o(t, e, r, l, o) {
    var i = e.Move.InitVelocityDirStandard;
    if (5 === i) {
      var n = t.GetComponent(29)?.GetCurrentTarget();
      if (n?.Valid) return n.Id;
    } else {
      if (6 === i)
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(
          t.Id,
          e.Move.TrackTargetBlackboardKey,
          r,
        );
      if (11 === i)
        return (n = parseInt(e.Move.InitVelocityDirParam)), this.Z9o(t, n, r);
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
      SyncType: o = 0,
      ParentId: i,
      BulletData: n,
      TargetId: a = 0,
      BaseTransformId: s,
      BaseVelocityId: u,
      Size: _,
      InitTargetLocation: f,
      Source: c = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource,
      LocationOffset: B,
      BeginRotatorOffset: d,
      DtType: C = -1,
      RandomPosOffset: M = void 0,
      RandomInitSpeedOffset: g = void 0,
    } = {},
    h = void 0,
  ) {
    var m = 2 === o,
      t = ModelManager_1.ModelManager.BulletModel.CreateBullet(
        t,
        e,
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
        B,
        d,
        C,
        M,
        g,
      );
    if (t?.Valid) return t;
  }
  static DestroyBullet(t, e, r = 0) {
    StatDefine_1.BATTLESTAT_ENABLED &&
      StatDefine_1.battleStat.BulletDestroy.Start(),
      ModelManager_1.ModelManager.BulletModel.DestroyBullet(t, e, r),
      StatDefine_1.BATTLESTAT_ENABLED &&
        StatDefine_1.battleStat.BulletDestroy.Stop();
  }
  static DestroyAllBullet(t = !1) {
    ModelManager_1.ModelManager.BulletModel.DestroyAllBullet(t);
  }
  static DestroySpecifiedBullet(e, r, l = !1, o = 0, i = 0) {
    if (1 === o) {
      let t = !1;
      o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
      for (const n of o)
        if (n.Id === e) {
          t = !0;
          break;
        }
      if (t)
        for (const a of o) this.DestroyBulletByOwnerIdAndName(a.Id, r, l, i);
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
            18,
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
  static CreateBulletNotify(e, r) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone && e) {
      var l = r.r5n,
        o = String(MathUtils_1.MathUtils.LongToBigInt(r.Mjn)),
        i = r?.rAs,
        i =
          (i
            ? (i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
                MathUtils_1.MathUtils.LongToNumber(i),
              )?.Entity?.GetComponent(3)) &&
              this.Mme.FromUeTransform(i.ActorTransform)
            : void 0 !== r?.P5n || void 0 !== r?.g8n
              ? (this.Mme.Reset(),
                (i = r.P5n),
                (n = r.g8n) &&
                  (this.cie.DeepCopy(n),
                  this.cie.Quaternion(this.e7o),
                  this.Mme.SetRotation(this.e7o)),
                i && this.Mme.SetLocation(i),
                this.Mme.SetScale3D(Vector_1.Vector.OneVectorProxy))
              : (n = e?.CheckGetComponent(3)) &&
                (this.Mme.SetLocation(n.ActorLocationProxy),
                this.cie.DeepCopy(n.ActorRotationProxy),
                this.Mme.SetRotation(n.ActorQuatProxy)),
          ModelManager_1.ModelManager.CreatureModel.GetEntityId(
            MathUtils_1.MathUtils.LongToNumber(r.Ejn),
          )),
        n = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(r.yjn),
        ),
        a = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          MathUtils_1.MathUtils.LongToNumber(r.CVn),
        );
      let t = void 0;
      r.iAs && (t = new UE.Vector(r.iAs.X, r.iAs.Y, r.iAs.Z));
      e = BulletController.t7o(
        e,
        o,
        this.Mme.ToUeTransform(),
        l,
        i,
        n,
        a,
        MathUtils_1.MathUtils.LongToBigInt(r.K8n.$8n),
        t,
        r.Tjn,
        r.Ljn,
        r.Djn,
        r.M8n,
      );
      e &&
        (ModelManager_1.ModelManager.BulletModel.RegisterBullet(r.uVn, e.Id),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            18,
            "创建子弹Notify",
            ["bulletRowName", o],
            ["skillId", l],
            ["handleId", r.uVn?.cVn],
            ["playerId", r.uVn?.W5n],
            ["Location", this.Mme.GetLocation()],
            ["Rotation", this.cie],
            ["TargetId", r.CVn],
            ["CurrentTargetId", a],
          ),
        e.Data.Render.HandOverParentEffect) &&
        ((i = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(
          r.Sjn,
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
            21,
            "收到修改子弹目标通知",
            ["新的目标id", l.Id],
            ["CreatureId", e],
          ),
        r.GetBulletInfo());
    e && e.SetTargetById(l.Id);
  }
  static t7o(
    t,
    e,
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
    StatDefine_1.BATTLESTAT_ENABLED &&
      (this.GetBulletCreateStat(e).Start(),
      StatDefine_1.battleStat.BulletCreate.Start());
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
        Size: c ? Vector_1.Vector.Create(c) : void 0,
      },
      a,
    );
    return (
      StatDefine_1.BATTLESTAT_ENABLED &&
        (StatDefine_1.battleStat.BulletCreate.Stop(),
        this.GetBulletCreateStat(e).Stop()),
      t
    );
  }
  static Z9o(t, e, r) {
    if (isNaN(e))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 21, "pos NAN！", ["bulletRowName", r]);
    else {
      t = t.GetComponent(0).CustomServerEntityIds;
      if (e > t.length || 0 === e)
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
        var l = ModelManager_1.ModelManager.CreatureModel.GetEntity(t[e - 1]);
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
    let e = this.i7o.get(t);
    return (
      e || ((e = Stats_1.Stat.Create("BulletCreate" + t)), this.i7o.set(t, e)),
      e
    );
  }
  static GetBulletDestroyStat(t) {
    let e = this.o7o.get(t);
    return (
      e || ((e = Stats_1.Stat.Create("BulletDestroy" + t)), this.o7o.set(t, e)),
      e
    );
  }
  static GetBulletMoveTickStat(t) {
    let e = this.r7o.get(t);
    return (
      e ||
        ((e = Stats_1.Stat.Create("BulletMoveTick" + t)), this.r7o.set(t, e)),
      e
    );
  }
  static GetBulletCollisionTickStat(t) {
    let e = this.n7o.get(t);
    return (
      e ||
        ((e = Stats_1.Stat.Create("BulletCollisionTick" + t)),
        this.n7o.set(t, e)),
      e
    );
  }
  static GetBulletCollisionAfterTickStat(t) {
    let e = this.s7o.get(t);
    return (
      e ||
        ((e = Stats_1.Stat.Create("BulletCollisionAfterTick" + t)),
        this.s7o.set(t, e)),
      e
    );
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
  (BulletController.nye = () => {
    ModelManager_1.ModelManager.BulletModel.WaitSceneBulletOwnerInit();
  }),
  (BulletController.$9o = Stats_1.Stat.Create("BulletConfigGetData")),
  (BulletController.Mme = Transform_1.Transform.Create()),
  (BulletController.cie = Rotator_1.Rotator.Create()),
  (BulletController.e7o = Quat_1.Quat.Create()),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("MFn")],
    BulletController,
    "CreateBulletNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("SFn")],
    BulletController,
    "DestroyBulletNotify",
    null,
  ),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("FFn")],
    BulletController,
    "ModifyBulletParamsNotify",
    null,
  ),
  (exports.BulletController = BulletController);
//# sourceMappingURL=BulletController.js.map
