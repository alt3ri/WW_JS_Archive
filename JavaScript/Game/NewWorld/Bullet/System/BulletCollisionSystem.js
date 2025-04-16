"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCollisionSystem = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  SpaceUtils_1 = require("../../../../Core/Utils/SpaceUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  IMatch_1 = require("../../../../UniverseEditor/Interface/IMatch"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../../Common/StatDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneTeamController_1 = require("../../../Module/SceneTeam/SceneTeamController"),
  CombatLog_1 = require("../../../Utils/CombatLog"),
  BulletConstant_1 = require("../../Bullet/BulletConstant"),
  BulletStaticFunction_1 = require("../../Bullet/BulletStaticMethod/BulletStaticFunction"),
  BulletTypes_1 = require("../../Bullet/BulletTypes"),
  ExtraEffectBaseTypes_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectBaseTypes"),
  ExtraEffectDamageFilter_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectDamageFilter"),
  ExtraEffectSnapModifier_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectSnapModifier"),
  RoleAudioController_1 = require("../../Character/Role/RoleAudioController"),
  BulletActionInitHit_1 = require("../Action/BulletActionInitHit"),
  BulletController_1 = require("../BulletController"),
  BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil"),
  BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletEntity_1 = require("../Entity/BulletEntity"),
  BulletCollisionInfo_1 = require("../Model/BulletCollisionInfo"),
  BulletInfo_1 = require("../Model/BulletInfo"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletTraceElementPool_1 = require("../Model/BulletTraceElementPool"),
  BulletSystemBase_1 = require("./BulletSystemBase"),
  PROFILE_UPDATETRACE_BOX = "BulletMoveUpdateTraceBox",
  PROFILE_UPDATETRACE_SPHERE = "BulletMoveUpdateTraceSphere",
  PROFILE_UPDATE_TRACE_DEFAULT = "BulletMoveUpdateTraceDefault",
  PROFILE_OBSTACLES = "BulletMoveObstacles",
  PROFILE_TICKTRACE = "BulletOnTickTrace",
  MIN_DELTA_TIME = 16.7,
  BIG_BULLET_SEARCH_SCENE_ITME_MIN_TIME = 100;
class BulletCollisionSystem extends BulletSystemBase_1.BulletSystemBase {
  constructor() {
    super(...arguments),
      (this.Pjo = Transform_1.Transform.Create()),
      (this.xjo = Vector_1.Vector.Create()),
      (this.wjo = Vector_1.Vector.Create()),
      (this.a7o = void 0),
      (this.Bjo = void 0),
      (this.bjo = void 0),
      (this.qjo = void 0),
      (this.mie = 0),
      (this.sIa = 0),
      (this.Gjo = Vector_1.Vector.Create()),
      (this.Njo = Vector_1.Vector.Create());
  }
  get Ojo() {
    return this.a7o.ActionLogicComponent;
  }
  OnTick(t) {
    let e = 0;
    BulletCollisionSystem.gW.Start(),
      (this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond);
    for (const l of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (e = cpp_1.KuroTime.GetMilliseconds64());
      var i = l.GetBulletInfo();
      !i.NeedDestroy &&
        i.IsInit &&
        (StatDefine_1.BATTLESTAT_ENABLED &&
          BulletController_1.BulletController.GetBulletCollisionTickStat(
            i.BulletRowName,
          ).Start(),
        this.kjo(t, i),
        StatDefine_1.BATTLESTAT_ENABLED) &&
        BulletController_1.BulletController.GetBulletCollisionTickStat(
          i.BulletRowName,
        ).Stop(),
        PerformanceController_1.PerformanceController
          .IsEntityTickPerformanceTest &&
          PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
            "Bullet",
            !1,
            cpp_1.KuroTime.GetMilliseconds64() - e,
            1,
            i.BornFrameCount,
          );
    }
    (this.a7o = void 0),
      (this.Bjo = void 0),
      (this.bjo = void 0),
      (this.qjo = void 0),
      (this.sIa = 0),
      BulletCollisionSystem.gW.Stop();
  }
  kjo(t, e) {
    (this.a7o = e),
      (this.Bjo = e.CollisionInfo),
      (this.bjo = e.BulletDataMain.Base.Shape),
      4 === this.bjo &&
        ((this.qjo = e.RayInfo),
        (this.sIa = e.BulletDataMain.Base.HitActorType),
        this.Fjo(t),
        (this.sIa = 0)),
      this.Vjo(),
      (e.AttackerMoveComp?.IsStandardGravity ?? !0) ? this.LNc() : this.Hjo(),
      this.jjo(),
      this.Wjo(t),
      ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
        this.a7o.Attacker.Id,
      ) && BulletCollisionUtil_1.BulletCollisionUtil.ShowBulletDeBugDraw(e);
  }
  Fjo(t) {
    var e = this.a7o;
    if (!e.NeedDestroy && e.CollisionInfo.IsStartup) {
      this.Bjo.UpdateTraceSphere ||
        (this.Bjo.UpdateTraceSphere =
          BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(
            ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
              this.a7o.BulletDataMain.Logic.ProfileName.toString(),
              this.a7o.BulletRowName,
            ),
            e.AttackerId,
            this.Bjo.IgnoreQueries,
          ));
      var i = this.Bjo.UpdateTraceSphere,
        t =
          ((this.qjo.IsBlock = !1),
          this.qjo.StartPoint.FromUeVector(
            this.a7o.ActorComponent.ActorLocationProxy,
          ),
          this.qjo.EndPoint.FromUeVector(
            this.a7o.ActorComponent.ActorForwardProxy,
          ),
          (this.qjo.Length += this.qjo.Speed * t),
          (this.qjo.Length = Math.min(this.qjo.Length, this.a7o.Size.Y)),
          this.qjo.EndPoint.MultiplyEqual(this.qjo.Length),
          this.qjo.EndPoint.AdditionEqual(this.qjo.StartPoint),
          i.SetStartLocation(
            this.qjo.StartPoint.X,
            this.qjo.StartPoint.Y,
            this.qjo.StartPoint.Z,
          ),
          i.SetEndLocation(
            this.qjo.EndPoint.X,
            this.qjo.EndPoint.Y,
            this.qjo.EndPoint.Z,
          ),
          (i.Radius = e.Size.Z),
          this.Bjo.ClearHitActorData(),
          (this.Bjo.HasSearchedHitActorsCurFrame = !0),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(
            i,
            PROFILE_TICKTRACE,
          ));
      if (t) {
        var l = new Array(),
          o = i.HitResult.GetHitCount();
        for (let t = 0; t < o; t++)
          l.push({ Distance: i.HitResult.DistanceArray.Get(t), Index: t });
        if (0 < l.length) {
          l.sort((t, e) => t.Distance - e.Distance);
          var s = i.HitResult.Actors,
            r = i.HitResult.Components;
          for (const h of l) {
            var a = s.Get(h.Index),
              n = r.Get(h.Index);
            if ((this.Kjo(a, n), 0 < this.Bjo.ArrayHitActorData.length))
              return (
                (this.qjo.IsBlock = !0),
                (this.qjo.Length = h.Distance),
                this.qjo.EndPoint.FromUeVector(
                  this.a7o.ActorComponent.ActorForwardProxy,
                ),
                this.qjo.EndPoint.MultiplyEqual(this.qjo.Length),
                void this.qjo.EndPoint.AdditionEqual(this.qjo.StartPoint)
              );
          }
        }
      }
    }
  }
  Vjo() {
    var t = this.a7o.LiveTimeAddDelta - this.Bjo.ActiveDelayMs;
    !this.Bjo.IsPassDelay &&
      0 < this.Bjo.ActiveDelayMs &&
      0 <= t &&
      ((this.Bjo.IsPassDelay = !0),
      (this.Bjo.IsStartup = !0),
      (this.Bjo.IsProcessOpen = !0),
      BulletConstant_1.BulletConstant.OpenCollisionLog) &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Bullet",
        20,
        "Bullet.UpdateInterval.Delay",
        ["IdName", this.a7o.BulletRowName],
        ["Actor", this.a7o.Actor?.GetName()],
        ["ActiveTime", t],
      );
  }
  Hjo() {
    var t, e, i, l;
    this.a7o.IsTensile &&
      (e = this.a7o.AttackerActorComp)?.Actor &&
      ((t = this.a7o.ActorComponent),
      (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
        e.Actor.Mesh.D_K2_GetComponentToWorld().GetLocation(),
      ),
      (l = this.Pjo).Set(i, e.ActorQuatProxy, e.ActorScaleProxy),
      BulletPool_1.BulletPool.RecycleVector(i),
      (e = BulletPool_1.BulletPool.CreateVector()),
      l.TransformPosition(this.a7o.BornLocationOffset, e),
      (i =
        (this.a7o.AttackerMoveComp?.IsStandardGravity ?? !0)
          ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(
              t.ActorLocationProxy,
              e.ToUeVector(),
              !0,
            )
          : BulletUtil_1.BulletUtil.FindLookAtRotDouble(
              t.ActorLocationProxy,
              e.ToUeVector(),
              !0,
              this.a7o.AttackerMoveComp?.GravityUp.ToUeVector() ??
                Vector_1.Vector.UpVectorDouble,
            )),
      (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
        this.a7o.InitPosition,
      ),
      l.AdditionEqual(e),
      l.DivisionEqual(2),
      e.SubtractionEqual(this.a7o.InitPosition),
      this.xjo.FromUeVector(this.a7o.Size),
      (this.xjo.X += e.Size() / 2),
      this.Bjo.CollisionComponent instanceof UE.BoxComponent &&
        this.Bjo.CollisionComponent.D_SetBoxExtent(this.xjo.ToUeVector(), !1),
      t.SetActorLocationAndRotation(l.ToUeVector(), i),
      BulletPool_1.BulletPool.RecycleVector(l),
      BulletPool_1.BulletPool.RecycleVector(e));
  }
  LNc() {
    var t, e, i, l;
    this.a7o.IsTensile &&
      (e = this.a7o.AttackerActorComp)?.Actor &&
      ((t = this.a7o.ActorComponent),
      (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
        e.Actor.Mesh.D_GetRelativeTransform().GetLocation(),
      ),
      i.AdditionEqual(e.ActorLocationProxy),
      (l = this.Pjo).SetRotation(e.ActorQuatProxy),
      l.SetScale3D(e.ActorScaleProxy),
      l.SetLocation(i),
      BulletPool_1.BulletPool.RecycleVector(i),
      (e = BulletPool_1.BulletPool.CreateVector()),
      l.TransformPosition(this.a7o.BornLocationOffset, e),
      (i = UE.KismetMathLibrary.D_FindLookAtRotation(
        t.ActorLocation,
        e.ToUeVector(),
      )),
      (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
        this.a7o.InitPosition,
      ),
      l.AdditionEqual(e),
      l.DivisionEqual(2),
      e.SubtractionEqual(this.a7o.InitPosition),
      this.xjo.FromUeVector(this.a7o.Size),
      (this.xjo.X += e.Size() / 2),
      this.Bjo.CollisionComponent instanceof UE.BoxComponent &&
        this.Bjo.CollisionComponent.D_SetBoxExtent(this.xjo.ToUeVector(), !1),
      t.SetActorLocationAndRotation(l.ToUeVector(), i),
      BulletPool_1.BulletPool.RecycleVector(l),
      BulletPool_1.BulletPool.RecycleVector(e));
  }
  jjo() {
    var t, e;
    this.Bjo.FinalScale.Equals(Vector_1.Vector.OneVectorProxy) ||
      (this.Bjo.CollisionComponent
        ? ((t = this.a7o.BulletDataMain).Scale.ScaleCurve
            ? (this.wjo.FromUeVector(
                BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
                  this.a7o.LiveTime,
                  this.a7o.Duration * TimeUtil_1.TimeUtil.InverseMillisecond,
                  t.Scale.ScaleCurve,
                ),
              ),
              this.wjo.MultiplyEqual(this.Bjo.FinalScale))
            : Vector_1.Vector.Lerp(
                Vector_1.Vector.OneVectorProxy,
                this.Bjo.FinalScale,
                this.a7o.LiveTime /
                  (TimeUtil_1.TimeUtil.InverseMillisecond * this.a7o.Duration),
                this.wjo,
              ),
          (e = this.a7o.AdditionInfo)?.Valid &&
            !e.SizeScale.IsZero() &&
            this.wjo.MultiplyEqual(e.SizeScale),
          t.Base.Size.Multiply(this.wjo, this.a7o.Size),
          3 === t.Base.Shape &&
            t.Scale.ShapeSwitch &&
            ((e = t.Base.Size.X - t.Base.Size.Y),
            (this.a7o.Size.Y = this.a7o.Size.X - e)),
          BulletCollisionUtil_1.BulletCollisionUtil.UpdateCollisionExtend(
            t.Base.Shape,
            this.Bjo.CollisionComponent,
            this.a7o.Size,
            this.Bjo.CenterLocalLocation,
            t.Base.Rotator,
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            17,
            "更新子弹缩放时，子弹没有碰撞组件",
            ["BulletEntityId", this.a7o.BulletEntityId],
            ["BulletRowName", this.a7o.BulletRowName],
          ));
  }
  Wjo(t) {
    this.a7o.FrozenTime &&
      (BulletUtil_1.BulletUtil.BulletFrozen(this.a7o),
      (this.a7o.FrozenTime -= t),
      this.a7o.FrozenTime <= 0) &&
      (BulletUtil_1.BulletUtil.BulletUnfrozen(this.a7o),
      (this.a7o.FrozenTime = void 0));
  }
  OnAfterTick(t) {
    BulletCollisionSystem.fW.Start(),
      (this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond);
    var e = ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap();
    let i = 0;
    BulletInfo_1.BulletInfo.InAfterTick = !0;
    for (const o of e.values()) {
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (i = cpp_1.KuroTime.GetMilliseconds64());
      var l = o.GetBulletInfo();
      if (!l.NeedDestroy && l.IsInit) {
        if (!BulletUtil_1.BulletUtil.CheckBulletAttackerExist(l)) {
          BulletController_1.BulletController.DestroyBullet(
            l.BulletEntityId,
            !1,
          );
          continue;
        }
        StatDefine_1.BATTLESTAT_ENABLED &&
          BulletController_1.BulletController.GetBulletCollisionAfterTickStat(
            l.BulletRowName,
          ).Start(),
          this.Qjo(t, l),
          StatDefine_1.BATTLESTAT_ENABLED &&
            BulletController_1.BulletController.GetBulletCollisionAfterTickStat(
              l.BulletRowName,
            ).Stop();
      }
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
          "Bullet",
          !1,
          cpp_1.KuroTime.GetMilliseconds64() - i,
          1,
          l.BornFrameCount,
        );
    }
    (BulletInfo_1.BulletInfo.InAfterTick = !1),
      (this.a7o = void 0),
      (this.Bjo = void 0),
      (this.bjo = void 0),
      (this.qjo = void 0),
      BulletCollisionSystem.fW.Stop();
  }
  Qjo(N, i) {
    if (
      ((this.a7o = i),
      (this.Bjo = i.CollisionInfo),
      (this.bjo = i.BulletDataMain.Base.Shape),
      this.Xjo() && this.sSa())
    ) {
      if (((this.sIa = i.BulletDataMain.Base.HitActorType), 7 === this.bjo))
        this.$jo();
      else {
        var t = this.Yjo();
        if (
          (i.HasCheckedPosition ||
            (t && i.BulletDataMain.Logic.DestroyOnHitObstacle && this.Jjo(),
            i.CheckedPosition()),
          this.zjo(),
          !this.Bjo.HasSearchedHitActorsCurFrame)
        ) {
          var t = (0, puerts_1.$ref)(void 0),
            e =
              (this.Bjo.CollisionComponent?.GetOverlappingComponents(t),
              (0, puerts_1.$unref)(t));
          if (e) {
            var l = e.Num();
            for (let t = 0; t < l; t++) {
              var o = e.Get(t),
                s = o.GetOwner();
              this.Kjo(s, o);
            }
          }
        }
      }
      this.Bjo.IsInProcessHit = !0;
      var r,
        t = this.a7o.GetCollisionLocation(),
        a = this.Bjo.ArrayHitActorData,
        n = a.length;
      if (1 < n) {
        for (let t = 0; t < n; t++) {
          var h = a[t],
            _ = BulletCollisionInfo_1.bulletHitPriorityList[h.Type];
          h.Priority = void 0 !== _ ? _ - t : 0;
        }
        this.Bjo.ArrayHitActorData.sort((t, e) => e.Priority - t.Priority);
      }
      if (this.Bjo.IsProcessOpen) {
        var u = i.BulletDataMain.Base.IntervalAfterHit,
          B = this.Bjo.IntervalMs;
        if (B <= 0) {
          let t = 1;
          for (const H of this.Bjo.ArrayHitActorData) this.cXs(H, t) && t++;
        } else if (u) {
          var c = i.LiveTime - this.Bjo.ActiveDelayMs,
            v =
              this.Bjo.ActiveLengthMs <= 0
                ? i.LiveTimeAddDelta - this.Bjo.ActiveDelayMs
                : Math.min(
                    i.LiveTimeAddDelta - this.Bjo.ActiveDelayMs,
                    this.Bjo.ActiveLengthMs + MathUtils_1.MathUtils.SmallNumber,
                  ),
            C = Math.floor((v - c) / B) + 1,
            m = this.Bjo.ObjectsHitCurrent;
          for (let e = 0; e < C; e++) {
            var f = 0 === e;
            let t = 1;
            for (const R of this.Bjo.ArrayHitActorData) {
              var E = R.Entity?.Id;
              if (E) {
                var d = m.get(E);
                if (void 0 !== d) {
                  d = d + B;
                  if (v < d) continue;
                  (i.LiveTimeCurHit = d), m.delete(E);
                } else i.LiveTimeCurHit = c;
                d = i.BulletDataMain.Base.MultiDamageId;
                if (d && 0 < d.length) {
                  var P = i.BulletDataMain.Base.MultiBeHitEffect,
                    U = P?.length ?? 0,
                    g = i.BulletDataMain.Base.MultiHitEffectWeakness,
                    p = g?.length ?? 0,
                    E =
                      BulletHitCountUtil_1.BulletHitCountUtil.GetHitCountByVictim(
                        i,
                        E,
                      );
                  if (d.length <= E) return;
                  (this.Bjo.BeHitEffect =
                    E < U ? P[E] : FNameUtil_1.FNameUtil.NONE),
                    (this.Bjo.WeaknessBeHitEffect =
                      E < p ? g[E] : FNameUtil_1.FNameUtil.NONE),
                    (this.Bjo.DamageId = d[E]);
                }
                this.mXs(R, t, f) && t++;
              } else 0 === e && this.cXs(R, t) && t++;
            }
          }
        } else {
          let t = this.Bjo.StageInterval - this.Bjo.LastStageInterval;
          if (0 < t) {
            var T = this.Bjo.LastStageInterval;
            (this.Bjo.LastStageInterval = this.Bjo.StageInterval),
              B < MIN_DELTA_TIME && (t = 1);
            for (let e = 0; e < t; e++) {
              (this.Bjo.AllowedEnergy = !0), this.Bjo.ObjectsHitCurrent.clear();
              var M = 0 === e;
              let t = 1;
              var S = i.BulletDataMain.Base.MultiDamageId;
              if (S && 0 < S.length) {
                var I = i.BulletDataMain.Base.MultiBeHitEffect,
                  y = I?.length ?? 0,
                  L = i.BulletDataMain.Base.MultiHitEffectWeakness,
                  b = L?.length ?? 0,
                  A = T + e;
                if (S.length <= A) continue;
                (this.Bjo.DamageId = S[A]),
                  (this.Bjo.BeHitEffect =
                    A < y ? I[A] : FNameUtil_1.FNameUtil.NONE),
                  (this.Bjo.WeaknessBeHitEffect =
                    A < b ? L[A] : FNameUtil_1.FNameUtil.NONE);
              }
              for (const D of this.Bjo.ArrayHitActorData)
                this.mXs(D, t, M) && t++;
            }
          }
        }
      }
      for (const k of this.Bjo.LastArrayHitActorData)
        k.IsValidHit &&
          (!(r = k.Actor) ||
            ((r = this.Bjo.MapHitActorData.get(r)) && r.IsValidHit) ||
            BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this.a7o, k));
      this.Bjo.LastFramePosition.FromUeVector(t),
        (this.Bjo.IsInProcessHit = !1),
        this.Bjo.UpdateLastHitActorData();
    } else {
      if (0 < this.Bjo.LastArrayHitActorData.length) {
        this.Bjo.IsInProcessHit = !0;
        for (const q of this.Bjo.LastArrayHitActorData)
          q.IsValidHit &&
            BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this.a7o, q);
        (this.Bjo.IsInProcessHit = !1), this.Bjo.ClearLastHitActorData();
      }
      0 < this.Bjo.ArrayHitActor.length && this.Bjo.ClearHitActorData(),
        this.Bjo.LastFramePosition.FromUeVector(
          this.a7o.GetCollisionLocation(),
        );
    }
  }
  cXs(t, e) {
    return this.Zjo(t)
      ? ((t.ValidProcessIndex = e),
        (t.IsValidHit = !0),
        this.Bjo.LastMapHitActorData.get(t.Actor)?.IsValidHit &&
          (t.IsContinueHit = !0),
        this.eWo(t),
        !0)
      : ((t.IsValidHit = !1), (t.IsContinueHit = !1));
  }
  mXs(t, e, i) {
    return this.Zjo(t)
      ? ((t.ValidProcessIndex = e),
        i
          ? ((t.IsValidHit = !0),
            this.Bjo.LastMapHitActorData.get(t.Actor)?.IsValidHit &&
              (t.IsContinueHit = !0))
          : t.IsValidHit || ((t.IsValidHit = !0), (t.IsContinueHit = !0)),
        this.eWo(t),
        !0)
      : (i
          ? ((t.IsValidHit = !1), (t.IsContinueHit = !1))
          : t.IsValidHit &&
            ((e = this.Bjo.LastMapHitActorData.get(t.Actor))?.IsValidHit &&
              ((e.IsValidHit = !1),
              BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(
                this.a7o,
                t,
              )),
            (t.IsValidHit = !1),
            (t.IsContinueHit = !1)),
        !1);
  }
  Xjo() {
    var t = this.a7o;
    return (
      !(
        (t.CloseCollision ||
          t.NeedDestroy ||
          !t.CollisionInfo.IsStartup ||
          t.ActorComponent.Owner?.IsActorBeingDestroyed()) ??
        t.IsFrozen
      ) && !t.IsTensile
    );
  }
  sSa() {
    var e = this.a7o,
      i = this.Bjo;
    if (!i.IsProcessOpen) return !1;
    if (0 < i.ActiveLengthMs && e.LiveTime - i.ActiveDelayMs > i.ActiveLengthMs)
      return !1;
    if (0 < i.IntervalMs && !e.BulletDataMain.Base.IntervalAfterHit) {
      let t = e.LiveTimeAddDelta - i.ActiveDelayMs;
      if (
        (0 < i.ActiveLengthMs &&
          (t = Math.min(
            t,
            i.ActiveLengthMs + MathUtils_1.MathUtils.SmallNumber,
          )),
        (i.StageInterval = Math.floor(t / i.IntervalMs) + 1),
        i.StageInterval - i.LastStageInterval <= 0)
      )
        return !1;
    }
    return !0;
  }
  tWo(t) {
    var e;
    return (
      !!t.ActorComponent.NeedDetach ||
      !(
        0 == (e = (e = t.MoveInfo).BulletSpeed * e.BulletSpeedRatio) ||
        e * this.mie < t.Size.X
      )
    );
  }
  Yjo() {
    if (4 === this.bjo || this.Bjo.RegionComponent) return !1;
    var t = this.a7o,
      e = this.Bjo.NeedHitObstacles,
      i = t.BulletDataMain.Base.IsOversizeForTrace;
    let l = !0,
      o = !0;
    (l = this.Bjo.HasObstaclesCollision
      ? ((o = e), this.tWo(t))
      : ((o = !1), e ? !i : this.tWo(t))),
      this.Bjo.ClearHitActorData();
    var s = BulletPool_1.BulletPool.CreateVector();
    if (
      (s.FromUeVector(t.GetCollisionLocation()),
      this.Bjo.LastFramePosition.Equals(s) &&
        s.AdditionEqual(t.ActorComponent.ActorForwardProxy),
      o && this.iWo(t, s),
      !l)
    )
      return BulletPool_1.BulletPool.RecycleVector(s), !1;
    let r = !(this.Bjo.HasSearchedHitActorsCurFrame = !0),
      a = void 0,
      n = void 0;
    switch (t.BulletDataMain.Base.Shape) {
      case 0:
        this.Bjo.UpdateTraceBox ||
          (this.Bjo.UpdateTraceBox =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.Bjo.IgnoreQueries,
            )),
          (n = this.Bjo.UpdateTraceBox),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.Bjo.LastFramePosition,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s),
          TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(n, t.Size),
          TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
            n,
            t.CollisionRotator,
          ),
          (r = TraceElementCommon_1.TraceElementCommon.BoxTrace(
            n,
            PROFILE_UPDATETRACE_BOX,
          )) && (a = n.HitResult);
        break;
      case 1:
        this.Bjo.UpdateTraceSphere ||
          (this.Bjo.UpdateTraceSphere =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.Bjo.IgnoreQueries,
            )),
          ((n = this.Bjo.UpdateTraceSphere).Radius = t.Size.X),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.Bjo.LastFramePosition,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s),
          (r = TraceElementCommon_1.TraceElementCommon.SphereTrace(
            n,
            PROFILE_UPDATETRACE_SPHERE,
          )) && (a = n.HitResult);
        break;
      case 3:
        this.Bjo.UpdateTraceBox ||
          (this.Bjo.UpdateTraceBox =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.Bjo.IgnoreQueries,
            )),
          (n = this.Bjo.UpdateTraceBox),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.Bjo.LastFramePosition,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s);
        var h = BulletPool_1.BulletPool.CreateVector();
        h.Set(this.a7o.Size.X, this.a7o.Size.X, this.a7o.Size.Z),
          TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(n, h),
          BulletPool_1.BulletPool.RecycleVector(h),
          TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
            n,
            t.CollisionRotator,
          ),
          (r = TraceElementCommon_1.TraceElementCommon.BoxTrace(
            n,
            PROFILE_UPDATETRACE_BOX,
          )) && (a = n.HitResult);
        break;
      case 2:
        this.Bjo.UpdateTraceBox ||
          (this.Bjo.UpdateTraceBox =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.Bjo.IgnoreQueries,
            )),
          (n = this.Bjo.UpdateTraceBox),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.Bjo.LastFramePosition,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s),
          TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
            n,
            BulletCollisionUtil_1.BulletCollisionUtil.GetSectorExtent(
              this.a7o.Size,
              this.Bjo.CenterLocalLocation,
            ),
          ),
          TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(
            n,
            t.CollisionRotator,
          ),
          (r = TraceElementCommon_1.TraceElementCommon.BoxTrace(
            n,
            PROFILE_UPDATETRACE_BOX,
          )) && (a = n.HitResult);
        break;
      default:
        this.Bjo.UpdateTraceLine ||
          (this.Bjo.UpdateTraceLine =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.Bjo.IgnoreQueries,
            )),
          (n = this.Bjo.UpdateTraceLine),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.Bjo.LastFramePosition,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s),
          (r = TraceElementCommon_1.TraceElementCommon.LineTrace(
            n,
            PROFILE_UPDATE_TRACE_DEFAULT,
          )) && (a = n.HitResult);
    }
    if (
      (BulletConstant_1.BulletConstant.OpenMoveLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Bullet",
          20,
          "BulletCollisionSystem TraceHighSpeed",
          ["Bullet", t.BulletRowName],
          ["Last", this.Bjo.LastFramePosition],
          ["Current", s],
        ),
      BulletPool_1.BulletPool.RecycleVector(s),
      r)
    ) {
      var _ = a.GetHitCount();
      if (!(_ <= 0))
        if (1 === _)
          this.Kjo(a.Actors.Get(0), a.Components.Get(0), void 0, a, 0);
        else {
          var u = new Array(),
            B = a.Components,
            c = a.Actors,
            v = a.LocationX_Array,
            C = a.LocationY_Array,
            m = a.LocationZ_Array;
          for (let t = 0; t < _; t++) {
            var f = BulletPool_1.BulletPool.CreateBulletHitTempResult();
            (f.Index = t),
              (f.ImpactPoint.X = v.Get(t)),
              (f.ImpactPoint.Y = C.Get(t)),
              (f.ImpactPoint.Z = m.Get(t)),
              (f.DistSquared = Vector_1.Vector.DistSquared(
                f.ImpactPoint,
                this.Bjo.LastFramePosition,
              )),
              (f.Component = B.Get(t)),
              (f.Actor = c.Get(t)),
              u.push(f);
          }
          0 < u.length && u.sort((t, e) => t.DistSquared - e.DistSquared);
          for (const E of u)
            this.Kjo(E.Actor, E.Component, E, a),
              BulletPool_1.BulletPool.RecycleBulletHitTempResult(E);
        }
    }
    return !0;
  }
  Jjo() {
    var e = this.a7o;
    if ("" !== e.BulletDataMain.Move.BoneNameString) {
      var t = BulletPool_1.BulletPool.CreateVector(),
        i =
          (t.FromUeVector(e.AttackerActorComp.ActorLocationProxy),
          BulletPool_1.BulletPool.CreateVector()),
        l =
          (i.FromUeVector(e.InitPosition),
          (i.Z = t.Z),
          Math.sqrt(e.AttackerActorComp.ScaledRadius));
      if (Vector_1.Vector.DistSquared2D(t, i) < l)
        BulletPool_1.BulletPool.RecycleVector(t),
          BulletPool_1.BulletPool.RecycleVector(i);
      else {
        (l =
          BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(
            ModelManager_1.ModelManager.BulletModel.ObjectTypeObstacles,
            e.AttackerId,
            this.Bjo.IgnoreQueries,
          )),
          (t =
            (TraceElementCommon_1.TraceElementCommon.SetStartLocation(l, t),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(l, i),
            BulletPool_1.BulletPool.RecycleVector(t),
            BulletPool_1.BulletPool.RecycleVector(i),
            TraceElementCommon_1.TraceElementCommon.LineTrace(
              l,
              "BulletCheckPosition",
            )));
        if (t) {
          var i = l.HitResult,
            o = i.GetHitCount(),
            s = i.Components,
            r = i.Actors;
          for (let t = 0; t < o; t++) {
            var a = r.Get(t),
              n = e.AttackerActorComp.Actor.BasePlatform;
            (n && a === n) || this.Kjo(a, s.Get(t));
          }
        }
        BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceLineElement(
          l,
        );
      }
    }
  }
  $jo() {
    this.Bjo.HasSearchedHitActorsCurFrame = !0;
    var e = [];
    if (
      (this.cth(
        this.bjo,
        this.a7o.ActorComponent.ActorLocation,
        this.a7o.Size,
        e,
      ),
      0 < e.length)
    ) {
      var i = this.a7o.BulletDataMain.Base;
      let t = i.BigRangeHitSceneItem;
      t &&
        (this.a7o.CollisionInfo.IntervalMs <
          BIG_BULLET_SEARCH_SCENE_ITME_MIN_TIME ||
          i.IntervalAfterHit) &&
        (CombatLog_1.CombatLog.Error(
          "Bullet",
          this.a7o?.Entity,
          "大范围子弹对场景物件生效必须配置【作用间隔】大于0.1秒且不能勾选【作用间隔基于个体】",
          ["BulletRowName", this.a7o?.BulletRowName],
        ),
        (t = !1)),
        BulletCollisionSystem.oWo.Start();
      for (const l of e) this.rWo(l, t);
      BulletCollisionSystem.oWo.Stop();
    }
  }
  rWo(t, e) {
    var i,
      e = this.aSa(t, e);
    0 !== e &&
      (i = t.Entity.GetComponent(1))?.ActorLocationProxy &&
      this.hSa(t, i, e);
  }
  aSa(t, e) {
    var i;
    return t?.IsInit && (t = t.Entity) && (i = t.GetComponent(0))
      ? (i = i.GetEntityType()) === Protocol_1.Aki.Protocol.kks.Proto_Player ||
        i === Protocol_1.Aki.Protocol.kks.Proto_Monster ||
        i === Protocol_1.Aki.Protocol.kks.Proto_Vision
        ? this.aIa(1)
        : e &&
            i === Protocol_1.Aki.Protocol.kks.Proto_SceneItem &&
            t.GetComponent(152)
          ? this.aIa(3)
          : 0
      : 0;
  }
  zjo() {
    var e = this.Bjo.RegionDetectComponent,
      i = this.Bjo.RegionComponent;
    if (e && i) {
      this.Bjo.HasSearchedHitActorsCurFrame = !0;
      var l = [];
      if (
        (this.cth(
          this.bjo,
          this.a7o.IsCollisionRelativeLocationZero
            ? this.a7o.ActorComponent.ActorLocation
            : i.D_K2_GetComponentLocation(),
          this.a7o.Size,
          l,
        ),
        0 < l.length)
      ) {
        i = this.a7o.BulletDataMain.Base;
        let t = i.BigRangeHitSceneItem;
        t &&
          (this.a7o.CollisionInfo.IntervalMs <
            BIG_BULLET_SEARCH_SCENE_ITME_MIN_TIME ||
            i.IntervalAfterHit) &&
          (CombatLog_1.CombatLog.Error(
            "Bullet",
            this.a7o?.Entity,
            "大范围子弹对场景物件生效必须配置【作用间隔】大于0.1秒且不能勾选【作用间隔基于个体】",
            ["BulletRowName", this.a7o?.BulletRowName],
          ),
          (t = !1)),
          BulletCollisionSystem.oWo.Start();
        for (const o of l) this.sWo(o, e, t);
        BulletCollisionSystem.oWo.Stop();
      }
    }
  }
  sWo(t, e, i) {
    var l,
      o,
      i = this.aSa(t, i);
    0 !== i &&
      (o = (l = t.Entity.GetComponent(1))?.ActorLocation) &&
      e.Detect(o, BulletConstant_1.BulletConstant.RegionKey) &&
      this.hSa(t, l, i);
  }
  iWo(t, e) {
    var i = t.MoveInfo;
    if (t.CollisionInfo.HasObstaclesCollision) {
      this.Bjo.ObstaclesTraceElement ||
        (this.Bjo.ObstaclesTraceElement =
          BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(
            ModelManager_1.ModelManager.BulletModel.ObjectTypeObstacles,
            t.AttackerId,
            this.Bjo.IgnoreQueries,
          ));
      var l,
        o,
        s = this.Bjo.ObstaclesTraceElement,
        t = t.BulletDataMain.Obstacle;
      if (
        ((s.Radius = t.Radius),
        i.ObstaclesOffset.IsZero()
          ? (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              s,
              this.Bjo.LastFramePosition,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, e))
          : ((t = BulletPool_1.BulletPool.CreateVector()),
            (l = BulletPool_1.BulletPool.CreateVector()),
            (o = UE.KismetMathLibrary.FindLookAtRotation(
              this.Bjo.LastFramePosition.ToUeVectorOld(),
              e.ToUeVectorOld(),
            )),
            BulletCollisionSystem.aWo.SetRotation(o.Quaternion()),
            BulletCollisionSystem.aWo.SetLocation(this.Bjo.LastFramePosition),
            BulletCollisionSystem.aWo.TransformPosition(i.ObstaclesOffset, t),
            BulletCollisionSystem.aWo.SetLocation(e),
            BulletCollisionSystem.aWo.TransformPosition(i.ObstaclesOffset, l),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, t),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, l),
            BulletPool_1.BulletPool.RecycleVector(t),
            BulletPool_1.BulletPool.RecycleVector(l)),
        TraceElementCommon_1.TraceElementCommon.SphereTrace(
          s,
          PROFILE_OBSTACLES,
        ))
      ) {
        var r = s.HitResult,
          a = r.Components,
          n = r.Actors,
          h = r.GetHitCount();
        for (let t = 0; t < h; t++) this.hWo(n.Get(t), a.Get(t), r, t);
      }
    }
  }
  lWo(t) {
    let e = this.Bjo.MapBulletConditionResult.get(t);
    return (
      e ||
        ((e = BulletPool_1.BulletPool.CreateBulletConditionResult()),
        this.Bjo.MapBulletConditionResult.set(t, e)),
      !e.KeepDisable &&
        !(
          (e.HasConstResult && !e.ConstResult) ||
          ((e.ConstResult = this._Wo(t)),
          (e.HasConstResult = !0),
          !e.ConstResult)
        )
    );
  }
  uWo(t) {
    var e = t.ConditionResult;
    return e
      ? (0 !== t.Type && !!this.cWo(t)) || !(e.KeepDisable = !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            17,
            "生成HitActorData前没有经过PreCheckCondition",
          ),
        !1);
  }
  cWo(t) {
    return !(
      4 === this.a7o.BulletDataMain.Base.Shape &&
      1 === t.Type &&
      !this.qjo.BlockByCharacter
    );
  }
  Zjo(t) {
    if (t.Actor?.IsValid()) {
      var e = t.ConditionResult;
      if (e)
        return (
          !e.KeepDisable && (this.mWo(t) ? this.dWo(t) : !(e.KeepDisable = !0))
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Bullet",
          17,
          "生成HitActorData前没有经过PreCheckCondition",
        );
      for (const i of this.Bjo.MapBulletConditionResult.keys()) {
        i === t.Actor &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            17,
            "MapBulletConditionResult有该actor的数据",
          );
        break;
      }
    }
    return !1;
  }
  _Wo(t) {
    var e;
    return !(
      !t ||
      ((e = this.a7o.BulletDataMain), t === this.a7o.Actor) ||
      (!(
        e.Base.HitConditionTagId ||
        this.a7o.BulletCamp & BulletActionInitHit_1.SELF_NUMBER
      ) &&
        t === this.a7o.AttackerActorComp.Actor)
    );
  }
  mWo(t) {
    if (0 === t.Type) return !1;
    if (!t.Actor?.IsValid()) return !1;
    if (t.EntityHandle && !t.EntityHandle.Valid) return !1;
    if (1 === t.Type) {
      var e =
        this.a7o.Attacker.GetComponent(55)?.GetAttributeHolder() ??
        this.a7o.Attacker;
      if (
        ExtraEffectDamageFilter_1.DamageFilter.ApplyEffects(
          e,
          t.Entity,
          this.a7o.BulletInitParams.BulletRowName,
          this.a7o.Tags,
          this.a7o.BulletInitParams.SkillId,
          this.a7o.CollisionInfo.DamageId,
          this.a7o.BulletInitParams.BattleFlags,
        )
      )
        return !1;
    }
    return !0;
  }
  dWo(t) {
    return !!this.CWo(t) && !!this.gWo(t) && !!this.fWo(t);
  }
  CWo(t) {
    var e = this.a7o.BulletDataMain,
      i = e.Base.HitConditionTagId;
    return i
      ? BulletUtil_1.BulletUtil.DoesEntityContainsTag(t.Entity, i)
      : !(i = e.Base.BanHitTagId) ||
          !BulletUtil_1.BulletUtil.DoesEntityContainsTag(t.Entity, i);
  }
  gWo(t) {
    if (this.a7o.CloseCollision) return !0;
    switch (this.a7o.BulletDataMain.Base.Shape) {
      case 3:
        var e = this.a7o.CenterLocation,
          i =
            (this.a7o.AttackerMoveComp?.IsStandardGravity ?? !0)
              ? void 0
              : this.a7o.AttackerMoveComp.GravityUp;
        for (const s of t.Components)
          if (
            SpaceUtils_1.SpaceUtils.IsComponentInRingArea(
              e,
              this.a7o.Size,
              s,
              i,
            )
          )
            return !0;
        return !1;
      case 2:
        var l = this.a7o.CenterLocation,
          o = BulletPool_1.BulletPool.CreateRotator();
        o.FromUeRotator(this.a7o.CollisionInfo.CollisionTransform.Rotator());
        for (const r of t.Components)
          if (
            SpaceUtils_1.SpaceUtils.IsComponentInSectorArea(
              l,
              this.a7o.Size,
              o.Quaternion(),
              r,
            )
          )
            return BulletPool_1.BulletPool.RecycleRotator(o), !0;
        return BulletPool_1.BulletPool.RecycleRotator(o), !1;
      default:
        return !0;
    }
  }
  fWo(t) {
    var e = t.Type;
    return (
      (1 !== e && 7 !== e) ||
      ((e = t.Entity.GetComponent(1)),
      BulletUtil_1.BulletUtil.AttackedCondition(this.a7o, e))
    );
  }
  Kjo(i, l, o, s, r) {
    if (
      (BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          17,
          "触发碰撞",
          ["BulletRowName", this.a7o.BulletRowName],
          ["Actor", i.GetName()],
          ["Component", l.GetName()],
          ["Bone", s?.BoneNameArray?.Num() ?? 0],
        ),
      this.lWo(i))
    ) {
      let t = this.Bjo.MapHitActorData.get(i),
        e = !1;
      if (t) {
        if (t.HasComponent(l)) return;
      } else if (((e = !0), !(t = this.pWo(i, l)))) return;
      this.vWo(t, l)
        ? (t.AddComponent(l),
          s &&
            4 === t.Type &&
            (o
              ? t.AddHitTempResult(o, s.BoneNameArray.Get(r))
              : t.AddHitResult(s, r)),
          e &&
            ((l = this.Bjo.MapBulletConditionResult.get(i)),
            (t.ConditionResult = l),
            this.uWo(t)
              ? (this.Bjo.AddHitActorData(i, t),
                BulletConstant_1.BulletConstant.OpenHitActorLog &&
                  Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Bullet",
                    17,
                    "碰撞通过预检测",
                    ["BulletRowName", this.a7o.BulletRowName],
                    ["actor", i.GetName()],
                    ["type", t.Type],
                  ))
              : BulletPool_1.BulletPool.RecycleBulletHitActorData(t)))
        : e && BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
    }
  }
  hWo(e, t, i, l) {
    if (
      this.Bjo.HasObstaclesCollision &&
      !this.a7o.NeedDestroy &&
      2 !== this.a7o.BulletDataMain.Move.FollowType
    ) {
      var o =
        ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
      if (
        !(o?.Entity?.GetComponent(152) ?? o?.Entity?.GetComponent(160)) &&
        !(
          (e &&
            (e instanceof UE.KuroEntityActor ||
              UE.KuroStaticLibrary.IsImplementInterface(
                e.GetClass(),
                UE.BPI_CreatureInterface_C.StaticClass(),
              ))) ||
          e instanceof UE.TriggerVolume
        )
      ) {
        o = this.Bjo.MapHitActorData.get(e);
        if (!o) {
          o = this.MWo(e);
          let t = this.Bjo.MapBulletConditionResult.get(e);
          t ||
            ((t = BulletPool_1.BulletPool.CreateBulletConditionResult()),
            this.Bjo.MapBulletConditionResult.set(e, t),
            (t.HasConstResult = !0),
            (t.ConstResult = !0)),
            (o.ConditionResult = t),
            o.AddHitResult(i, l),
            this.Bjo.AddHitActorData(e, o);
        }
        BulletConstant_1.BulletConstant.OpenHitActorLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            20,
            "触发碰撞 障碍物检测",
            ["Bullet", this.a7o?.BulletRowName],
            ["Actor", e.GetName()],
          );
      }
    }
  }
  hSa(e, i, l) {
    var o = i.Owner;
    if (
      (BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          17,
          "触发碰撞（大范围子弹）",
          ["BulletRowName", this.a7o.BulletRowName],
          ["Actor", o.GetName()],
          ["entityId", e.Id],
        ),
      this.lWo(o))
    ) {
      var s = this.Bjo.MapHitActorData.get(o);
      if (!s) {
        if (
          (((s = BulletPool_1.BulletPool.CreateBulletHitActorData()).Actor = o),
          (s.EntityHandle = e),
          1 === (s.Type = l))
        ) {
          var r = i,
            a = r.GetMapPartCollision();
          if (0 === a.size) s.AddComponent(r.Actor.CapsuleComponent);
          else {
            let t = !1;
            for (var [n, h] of a.entries())
              r.GetPartHitConf(n) &&
                r.IsPartComponentEnable(n) &&
                (s.AddComponent(h), (t = !0));
            if (!t)
              return (
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Bullet",
                    17,
                    "大范围子弹搜索到多部位的实体，没找到合适的碰撞部位",
                    ["BulletRowName", this.a7o.BulletRowName],
                    ["Actor", o.GetName()],
                    ["entityId", e.Id],
                  ),
                void BulletPool_1.BulletPool.RecycleBulletHitActorData(s)
              );
          }
        } else {
          if (3 !== l)
            return void BulletPool_1.BulletPool.RecycleBulletHitActorData(s);
          {
            let t = !1;
            (a = i),
              (l = a
                .GetMainCollisionActor()
                ?.GetComponentByClass(UE.PrimitiveComponent.StaticClass()));
            if (
              (l
                ? (s.AddComponent(l),
                  Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Bullet",
                      17,
                      "大范围子弹搜索到场景物",
                      ["BulletRowName", this.a7o.BulletRowName],
                      ["Actor", o.GetName()],
                      ["entityId", e.Id],
                    ),
                  (t = !0))
                : (i = a.GetPrimitiveComponent()) &&
                  (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Bullet",
                      17,
                      "大范围子弹搜索到场景物，没找到MainCollisionActor,用BaseItem的PrimitiveComponent代替",
                      ["BulletRowName", this.a7o.BulletRowName],
                      ["Actor", o.GetName()],
                      ["entityId", e.Id],
                    ),
                  s.AddComponent(i),
                  (t = !0)),
              !t)
            )
              return (
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Bullet",
                    17,
                    "大范围子弹搜索到场景物件，没找到合适的碰撞体",
                    ["BulletRowName", this.a7o.BulletRowName],
                    ["Actor", o.GetName()],
                    ["entityId", e.Id],
                  ),
                void BulletPool_1.BulletPool.RecycleBulletHitActorData(s)
              );
          }
        }
        l = this.Bjo.MapBulletConditionResult.get(o);
        (s.ConditionResult = l),
          this.uWo(s)
            ? (this.Bjo.AddHitActorData(o, s),
              BulletConstant_1.BulletConstant.OpenHitActorLog &&
                Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Bullet",
                  17,
                  "碰撞通过预检测",
                  ["BulletRowName", this.a7o.BulletRowName],
                  ["actor", o.GetName()],
                  ["type", s.Type],
                ))
            : BulletPool_1.BulletPool.RecycleBulletHitActorData(s);
      }
    }
  }
  vWo(t, e) {
    if (1 === t.Type) {
      (t = t.Entity.GetComponent(3)), (e = e.GetName());
      if (
        t.IsPartHit &&
        (e === BulletConstant_1.BulletConstant.MoveCylinder ||
          !t.IsPartComponentEnable(e))
      )
        return !1;
    }
    return !0;
  }
  pWo(e, t) {
    var i = BulletPool_1.BulletPool.CreateBulletHitActorData();
    if ((i.Actor = e)) {
      let t = void 0;
      if (
        (e instanceof UE.KuroEntityActor
          ? (t = e.EntityId)
          : UE.KuroStaticLibrary.IsImplementInterface(
              e.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            ) && (t = e.GetEntityId()),
        void 0 !== t)
      ) {
        var l = ModelManager_1.ModelManager.CharacterModel.GetHandle(t);
        if ((i.EntityHandle = l)?.Valid) {
          var l = l.Entity,
            o = l.GetComponent(0),
            s = o?.GetEntityType();
          if (s === Protocol_1.Aki.Protocol.kks.Proto_SceneItem)
            return (i.Type = this.aIa(3)), i;
          if (s === Protocol_1.Aki.Protocol.kks.HI_)
            return (i.Type = this.aIa(7)), i;
          if (s === Protocol_1.Aki.Protocol.kks.Proto_Npc)
            return (i.Type = this.aIa(5)), i;
          if (
            s === Protocol_1.Aki.Protocol.kks.Proto_Animal &&
            2 === o.GetEntityCamp()
          )
            return (i.Type = this.aIa(6)), i;
          if (l.GetComponent(3)) return (i.Type = this.aIa(1)), i;
        } else {
          s = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t);
          if (s && s instanceof BulletEntity_1.BulletEntity)
            return (i.Type = this.aIa(2)), (i.BulletEntityId = t), i;
        }
        return (i.Type = 0), i;
      }
    }
    o = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
    return o?.Valid
      ? ((i.EntityHandle = o), (i.Type = this.aIa(3)), i)
      : this.Bjo.HasObstaclesCollision
        ? void 0
        : (this.a7o.BulletDataMain.Logic.IgnoreWater &&
          BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(
            t.GetCollisionProfileName(),
          )
            ? (i.Type = 0)
            : (i.Type = this.aIa(4)),
          i);
  }
  aIa(t) {
    return 0 === this.sIa || t === this.sIa ? t : 0;
  }
  MWo(t) {
    var e = BulletPool_1.BulletPool.CreateBulletHitActorData();
    return (e.Actor = t), (e.Type = 4), (e.FromObstaclesCollision = !0), e;
  }
  eWo(t) {
    var e = this.a7o;
    if (!e.NeedDestroy) {
      BulletCollisionSystem.EWo.Start();
      var i = this.SWo(t);
      try {
        switch ((i?.Start(), t.Type)) {
          case 1:
            this.yWo(t);
            break;
          case 2:
            this.IWo(t);
            break;
          case 3:
            this.TWo(t);
            break;
          case 7:
            this.Wr_(t);
            break;
          case 4:
            this.LWo(t);
            break;
          case 5:
          case 6:
            if (t.EntityHandle?.Valid) break;
            return void EventSystem_1.EventSystem.EmitWithTarget(
              t.Entity,
              EventDefine_1.EEventName.BulletHitSpecialCharacter,
              e,
            );
        }
        BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountTotal(this.a7o) &&
          (BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
            this.a7o,
            8,
            "[BulletCollisionSystem.ProcessHit]",
          ),
          this.a7o.ChildInfo?.SetIsNumberNotEnough(!0),
          BulletController_1.BulletController.DestroyBullet(
            e.BulletEntityId,
            !1,
          ));
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Bullet",
              17,
              "Bullet ProcessHit Error",
              t,
              ["BulletEntityId", this.a7o.BulletEntityId],
              ["BulletRowName", this.a7o.BulletRowName],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              17,
              "Bullet ProcessHit Error",
              ["BulletEntityId", this.a7o.BulletEntityId],
              ["BulletRowName", this.a7o.BulletRowName],
              ["error", t],
            );
      } finally {
        i?.Stop();
      }
      BulletCollisionSystem.EWo.Stop();
    }
  }
  SWo(t) {
    var e;
    if (Stats_1.Stat.Enable && t.Entity)
      return (
        (e = t.Entity.Id),
        (t = t.Entity.GetComponent(0)?.GetPbDataId() ?? 0),
        Stats_1.Stat.CreateNoFlameGraph(`HitEntityId${e}PbDataId` + t)
      );
  }
  yWo(t) {
    var e;
    t.EntityHandle?.Valid &&
      ((e = t.Entity.GetComponent(68))?.Valid && e.IsMultiPart
        ? this.DWo(t)
        : this.RWo(t));
  }
  DWo(s) {
    var r = s.Entity.GetComponent(3),
      a = (this.UWo(s.Entity), this.a7o);
    if (
      this.AWo(s) &&
      BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(
        a,
        s.Entity,
      )
    ) {
      var n = r.Entity,
        h = r.ActorForwardProxy,
        _ = n.GetComponent(68),
        u = [],
        B = [],
        c = [];
      let i = !1;
      var v = new Map();
      let l = 0;
      var C = s.Components;
      let o = void 0;
      for (let t = 0, e = s.Components.length; t < e; t++) {
        var m = C[t];
        const d = m.GetName();
        if (d !== BulletConstant_1.BulletConstant.MoveCylinder) {
          var f = _.GetPart(d);
          if (!(u.includes(f) || B.includes(f) || c.includes(f))) {
            if (
              (BulletConstant_1.BulletConstant.OpenHitActorLog &&
                Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Bullet",
                  20,
                  "子弹击中部位",
                  ["部位", d],
                  ["子弹ID", a.BulletRowName],
                ),
              f?.Active)
            )
              if (((f.HitBoneName = d), f.IsShield)) {
                var E = BulletPool_1.BulletPool.CreateVector();
                if (
                  (BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
                    m,
                    a,
                    E,
                  ),
                  v.set(d, E),
                  this.CheckAngle(f.BlockAngle, a, E, h))
                ) {
                  u.push(f), (l = t);
                  break;
                }
              } else
                f.SeparateDamage
                  ? (B.push(f),
                    f.IsWeakness &&
                      ((E = BulletPool_1.BulletPool.CreateVector()),
                      BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
                        m,
                        a,
                        E,
                      ),
                      v.set(d, E)))
                  : (c.push(f),
                    f.IsWeakness &&
                      ((f = BulletPool_1.BulletPool.CreateVector()),
                      BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
                        m,
                        a,
                        f,
                      ),
                      v.set(d, f)),
                    (i = !0));
            else i = !0;
            f = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
              m,
              a,
            );
            BulletConstant_1.BulletConstant.OpenHitActorLog &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Bullet",
                20,
                "命中特效 选择",
                ["boneName", d],
                ["cos", f],
                ["bulletRowName", a.BulletRowName],
              ),
              (void 0 === o || f < o) && ((o = f), (l = t));
          }
        }
      }
      let e = !1;
      if (0 < u.length)
        BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(a, n);
      else {
        for (const U of B) {
          if (
            !BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(
              a,
              n,
            )
          )
            break;
          U.IsWeakness &&
            ((U.IsWeaknessHit = this.CheckWeakness(
              U,
              a,
              v.get(U.HitBoneName),
              h,
            )),
            U.IsWeaknessHit) &&
            (e = !0),
            BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(a, n);
        }
        if (0 < c.length) {
          let t = void 0;
          for (const g of c)
            if (
              g.IsWeakness &&
              ((g.IsWeaknessHit = this.CheckWeakness(
                g,
                a,
                v.get(g.HitBoneName),
                h,
              )),
              g.IsWeaknessHit)
            ) {
              t = g;
              break;
            }
          t && ((c.length = 0), (e = !0), c.push(t));
        }
      }
      BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(a, n)
        ? i && BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(a, n)
        : (i = !1);
      r = C[l];
      const d = r.GetName(),
        P = BulletPool_1.BulletPool.CreateVector();
      v.has(d)
        ? P.FromUeVector(v.get(d))
        : BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
            r,
            a,
            P,
          ),
        BulletConstant_1.BulletConstant.OpenHitActorLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            20,
            "命中特效 最终",
            ["boneName", d],
            ["bulletRowName", a.BulletRowName],
          );
      r = this.a7o.BulletDataMain;
      let t = !0;
      this.Bjo.StopHit || (t = this.PWo(s, r, P, i, d, u, B, c, e)),
        (this.Bjo.StopHit = !1),
        t ||
          (BulletUtil_1.BulletUtil.SummonBullet(
            this.a7o,
            1,
            s.Entity,
            !1,
            P,
            a.CollisionInfo.LastFramePosition,
          ),
          0 === a.BulletInitParams.SyncType &&
            this.$ba(
              r.Logic.DestroyOnHitCharacter,
              a.BulletEntityId,
              "本地子弹",
            ));
      for (const [, P] of v) BulletPool_1.BulletPool.RecycleVector(P);
      BulletPool_1.BulletPool.RecycleVector(P);
    }
  }
  CheckWeakness(t, e, i, l) {
    return (
      !(
        !t ||
        !t.IsWeakness ||
        (t.WeaknessTypeSet &&
          0 !== t.WeaknessTypeSet.size &&
          !t.WeaknessTypeSet.has(e.BulletDataMain.Logic.Type))
      ) && this.CheckAngle(t.WeaknessAngle, e, i, l)
    );
  }
  CheckAngle(t, e, i, l) {
    var o, s;
    return (
      0 === t ||
      (1 === (s = (o = e.Entity).Data.Logic.HitDirectionType)
        ? (o.GetComponent(1).ActorLocationProxy.Subtraction(i, this.Gjo),
          this.Gjo.Normalize(MathCommon_1.MathCommon.KindaSmallNumber))
        : 0 === s
          ? (this.Gjo.FromUeVector(e.AttackerActorComp.ActorLocationProxy),
            this.Gjo.SubtractionEqual(i),
            this.Gjo.Normalize(MathCommon_1.MathCommon.KindaSmallNumber))
          : this.Gjo.FromUeVector(Vector_1.Vector.ForwardVectorProxy),
      this.Njo.FromUeVector(l),
      0 <= t && this.Njo.MultiplyEqual(-1),
      Vector_1.Vector.DotProduct(this.Gjo, this.Njo) >= Math.cos(t))
    );
  }
  UWo(e) {
    if (e.GetComponent(17)) {
      this.Bjo.CharacterEntityMap.has(e) ||
        this.Bjo.CharacterEntityMap.set(e, -1);
      var i = this.a7o.BulletDataMain;
      if (
        i.Base.ContinuesCollision &&
        ((this.Bjo.HaveCharacterInBullet = !0),
        BulletUtil_1.BulletUtil.SummonBullet(this.a7o, 1, e, !0),
        i.Execution.GeIdApplyToVictim)
      ) {
        var l,
          o = this.a7o.Attacker.CheckGetComponent(172),
          s = e.CheckGetComponent(172),
          r = e.CheckGetComponent(203);
        let t = !0;
        if (
          (t =
            e.GetComponent(0).IsRole() && !e.GetComponent(3).IsRoleAndCtrlByMe
              ? !1
              : t)
        )
          for (const a of i.Execution.GeIdApplyToVictim)
            s.GetBuffApplyTarget(a, o.CreatureDataId)?.HasBuff(a) ||
              s.AddBuff(a, {
                InstigatorId: o.CreatureDataId,
                Level: this.a7o.SkillLevel,
                PreMessageId: this.a7o.ContextId,
                Reason: `子弹${i.BulletRowName}命中`,
                BulletMessageId: this.a7o.ContextId,
              });
        r.HasTag(-648310348) ||
          ((r = i.TimeScale.TimeScaleOnHit),
          i.TimeScale.AreaTimeScale
            ? 0 < this.Bjo.CharacterEntityMap.get(e) ||
              ((l = e.GetComponent(120))
                ? ((l = l.SetTimeScale(
                    r.优先级,
                    r.时间膨胀值,
                    r.时间膨胀变化曲线,
                    this.a7o.Duration,
                    2,
                  )),
                  this.Bjo.CharacterEntityMap.set(e, l))
                : this.Bjo.CharacterEntityMap.set(e, 0))
            : this.Bjo.CharacterEntityMap.set(e, 0));
      }
    }
  }
  $ba(t, e, i) {
    t &&
      (BulletController_1.BulletController.DestroyBullet(e, !1),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug("Bullet", 20, "子弹碰撞单位销毁", ["Info", i]);
  }
  RWo(i) {
    var l = i.Entity,
      o = i.Entity.GetComponent(3),
      s = this.a7o;
    if (
      (this.UWo(i.Entity),
      this.AWo(i) &&
        BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(s, i.Entity))
    ) {
      var r = s.BulletDataMain;
      if (this.xWo(i.Entity))
        UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
          o.Actor,
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-63529668),
          void 0,
        ),
          this.a7o?.Attacker &&
            l &&
            ((_ = [
              this.a7o.Attacker,
              l,
              this.a7o.BulletInitParams.SkillId,
              BigInt(this.a7o.BulletRowName ?? -1),
            ]),
            SceneTeamController_1.SceneTeamController.EmitEvent(
              l,
              EventDefine_1.EEventName.CharLimitDodge,
              ..._,
            )),
          BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
            s,
            10,
            "极限闪避",
          ),
          this.$ba(r.Logic.DestroyOnHitCharacter, s.BulletEntityId, "极限闪避");
      else {
        var l = BulletPool_1.BulletPool.CreateVector(),
          a = i.Components,
          n = a.length;
        let t = void 0;
        if (0 < n) {
          let e = 0,
            i = void 0;
          for (let t = 0; t < n; t++) {
            var h = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
              a[t],
              s,
            );
            (void 0 === i || h < e) && ((e = h), (i = t));
          }
          var _ = a[i];
          (t = _.GetName()),
            BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
              _,
              s,
              l,
            );
        } else
          l.FromUeVector(
            o.GetSocketLocation(BulletConstant_1.BulletConstant.HitCase),
          );
        let e = !0;
        this.Bjo.StopHit || (e = this.PWo(i, r, l, !0, t)),
          (this.Bjo.StopHit = !1),
          e ||
            (BulletUtil_1.BulletUtil.SummonBullet(
              this.a7o,
              1,
              i.Entity,
              !1,
              l,
              s.CollisionInfo.LastFramePosition,
            ),
            0 === s.BulletInitParams.SyncType &&
              this.$ba(
                r.Logic.DestroyOnHitCharacter,
                s.BulletEntityId,
                "本地子弹",
              )),
          BulletPool_1.BulletPool.RecycleVector(l);
      }
    }
  }
  xWo(t) {
    return (
      !!this.a7o.BulletDataMain.Logic.CanDodge &&
      !!BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -549410347) &&
      !BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -1221493771)
    );
  }
  PWo(t, e, i, l, o, s, r, a, n = !1) {
    var h = this.a7o,
      _ = h.AttackerActorComp,
      u = t.Entity.GetComponent(3),
      B = this.Bjo;
    const c = B.DamageId,
      v = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(c);
    var C = 0 < c ? v.CalculateType : -1;
    let m = void 0;
    m =
      n && FNameUtil_1.FNameUtil.IsNothing(B.WeaknessBeHitEffect)
        ? B.WeaknessBeHitEffect
        : B.BeHitEffect;
    var f = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
        h.Attacker,
        m,
      ),
      f = new BulletTypes_1.HitInformation(
        h.Attacker,
        t.Entity,
        f,
        h.BulletRowName,
        UE.KismetMathLibrary.D_TransformRotation(
          _.Actor.Mesh.D_K2_GetComponentToWorld(),
          e.Base.AttackDirection.ToUeRotator(),
        ),
        BulletUtil_1.BulletUtil.ShakeTest(h, t.Entity.GetComponent(1)),
        FNameUtil_1.FNameUtil.GetDynamicFName(o) ?? FNameUtil_1.FNameUtil.NONE,
        i,
        h.SkillLevel,
        e,
        this.a7o.BulletRowName,
        c,
        e.Logic.Data,
        h.BulletEntityId,
        C,
      );
    if (
      (GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(
        this.a7o.BulletEntityId,
        t.Entity.Id,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        h.Entity,
        EventDefine_1.EEventName.BulletHit,
        f,
        void 0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BulletHit,
        f,
        void 0,
      ),
      this.Ojo.ActionHit(t),
      !this.wWo(u))
    )
      return !1;
    var o = u.Entity.Id,
      C =
        (B.ObjectsHitCurrent.set(o, h.LiveTimeCurHit),
        this.BWo(e.Base.IntervalAfterHit, h, o),
        t.Entity.GetComponent(60)),
      o =
        (BulletCollisionUtil_1.BulletCollisionUtil.PlayHitEffect(
          h,
          u,
          f.HitPart.toString(),
          n,
          f.HitPosition,
          f.HitEffectRotation,
          C,
        ),
        u.Entity.GetComponent(60).OnHit(
          f,
          h.Entity,
          B.AllowedEnergy,
          l,
          s,
          r,
          a,
          n,
        ),
        e.Execution.SendGameplayEventTagToAttacker),
      l =
        (o.TagName !== StringUtils_1.NONE_STRING &&
          (((C = new UE.GameplayEventData()).Target = u.Actor),
          (C.Instigator = h.Actor),
          UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
            h.AttackerActorComp.Actor,
            o,
            C,
          )),
        e.Execution.SendGameplayEventTagToVictim),
      E =
        (l.TagName !== StringUtils_1.NONE_STRING &&
          t.Entity.GetComponent(17).SendGameplayEventToActor(l),
        _.Entity.CheckGetComponent(172)),
      s = f.ReBulletData.Execution;
    for (const U of s.SendGeIdToAttacker)
      E.AddBuff(U, {
        InstigatorId: E.CreatureDataId,
        Level: h.SkillLevel,
        PreMessageId: h.ContextId,
        Reason: `子弹${h.BulletRowName}命中后对攻击者应用GE添加`,
        BulletMessageId: h.ContextId,
      });
    var d = u.Entity.GetComponent(172);
    if (d?.Valid) {
      for (const g of s.SendGeIdToVictim)
        d.AddBuff(g, {
          InstigatorId: E.CreatureDataId,
          Level: h.SkillLevel,
          Reason: `子弹${h.BulletRowName}命中后对受击者应用GE添加`,
          PreMessageId: h.ContextId,
          BulletMessageId: h.ContextId,
        });
      if (d.HasBuffTrigger(16)) {
        r = _.Entity.GetComponent(39);
        const c = B.DamageId,
          v = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(c);
        (a = 0 < c ? v : void 0),
          (n = new ExtraEffectBaseTypes_1.RequirementPayload()),
          (o =
            ((n.SkillId = Number(h.BulletInitParams.SkillId ?? -1)),
            r.GetSkill(n.SkillId)));
        (n.SkillGenre = o ? o.SkillInfo.SkillGenre : -1),
          (n.BattleFlags = h.BulletInitParams.BattleFlags ?? []),
          a &&
            ((n.DamageType = a.Type),
            (n.DamageSubTypes = a.SubType),
            (n.CalculateType = a.CalculateType),
            (n.SmashType = a.SmashType),
            (n.ElementType =
              ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(
                E,
                a.Id,
              ) ?? a.Element)),
          (n.BulletId = BigInt(h.BulletRowName)),
          (n.BulletTags = h.Tags ?? []),
          d.TriggerEvents(16, E, n);
      }
    }
    if (B.AllowedEnergy) {
      for (const p of s.EnergyRecoverGeIds)
        E.AddBuff(p, {
          InstigatorId: E.CreatureDataId,
          Level: h.SkillLevel,
          PreMessageId: h.ContextId,
          Reason: `子弹${h.BulletRowName}命中后对攻击者应用能量恢复类GE`,
          BulletMessageId: h.ContextId,
        });
      B.AllowedEnergy = !1;
    }
    if (s.SendGeIdToRoleInGame) {
      var P =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.CheckGetComponent(
          172,
        );
      if (P)
        for (const T of s.SendGeIdToRoleInGame)
          P.AddBuff(T, {
            InstigatorId: E.CreatureDataId,
            Level: h.SkillLevel,
            PreMessageId: h.ContextId,
            Reason: `子弹${h.BulletRowName}命中后对场上角色应用GE添加`,
            BulletMessageId: h.ContextId,
          });
    }
    return (
      BulletUtil_1.BulletUtil.SummonBullet(
        this.a7o,
        1,
        t.Entity,
        !1,
        i,
        B.LastFramePosition,
        !1,
      ),
      this.$ba(e.Logic.DestroyOnHitCharacter, h.BulletEntityId, "结算时"),
      !0
    );
  }
  BWo(e, i, l) {
    if (e) {
      e = i.EntityHitCount;
      let t = !0;
      var o,
        s,
        r = e.get(l);
      for ([o, s] of e)
        if (o !== l && r <= s) {
          t = !1;
          break;
        }
      t && (this.Bjo.AllowedEnergy = !0),
        BulletConstant_1.BulletConstant.OpenCollisionLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            20,
            "RoleHit",
            ["BulletId", i.BulletRowName],
            ["Stage", this.Bjo.StageInterval],
            ["AllowedEnergy", this.Bjo.AllowedEnergy],
            ["EntityId", i.Entity.Id],
          );
    }
  }
  wWo(t) {
    var e,
      i,
      l,
      o = this.a7o.AttackerActorComp;
    return (
      !(!o?.Valid || !t?.Valid) &&
      ((i = o.Entity),
      (l = t.Entity),
      (e = (i = i.GetComponent(0)).IsRole() || i.IsVision()),
      (i = i.GetSummonerPlayerId()),
      (l = l.GetComponent(0)).IsRole() || l.IsVision()
        ? t.IsAutonomousProxy
        : e
          ? o.IsAutonomousProxy
          : 0 < i
            ? i === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
            : t.IsAutonomousProxy)
    );
  }
  IWo(t) {
    var e, i, l, o;
    !t.IsContinueHit &&
      this.a7o &&
      (t = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
        t.BulletEntityId,
      )) &&
      (this.bWo(t), this.a7o.IsAutonomousProxy) &&
      ((i = this.a7o.BulletDataMain),
      (e = t.GetBulletInfo()).IsTensile
        ? (o = e.Attacker) &&
          this.xWo(o) &&
          !this.qWo(o) &&
          (RoleAudioController_1.RoleAudioController.PlayRoleAudio(o, 2004),
          (l = o.GetComponent(3)),
          (0, RegisterComponent_1.isComponentInstance)(l, 3) &&
            (UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
              l.Actor,
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-63529668),
              void 0,
            ),
            BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
              this.a7o,
              10,
              "极限闪避",
            ),
            this.$ba(
              i.Logic.DestroyOnHitCharacter,
              this.a7o.BulletEntityId,
              "闪避子弹",
            ),
            this.a7o.Attacker) &&
            ((l = [
              this.a7o.Attacker,
              o,
              this.a7o.BulletInitParams.SkillId,
              BigInt(this.a7o.BulletRowName ?? -1),
            ]),
            SceneTeamController_1.SceneTeamController.EmitEvent(
              o,
              EventDefine_1.EEventName.CharLimitDodge,
              ...l,
            )),
          o.GetComponent(0).GetEntityType() ===
            Protocol_1.Aki.Protocol.kks.Proto_Monster &&
            (i = this.a7o.AttackerBuffComp)?.Valid &&
            i.AddTagWithReturnHandle([-2043183300], this.a7o.Duration),
          BulletController_1.BulletController.DestroyBullet(t.Id, !1))
        : e.IsShield
          ? t.GetComponent(13)?.ActionHitBullet(this.a7o)
          : ((l =
              0 <
              (this.a7o.BulletDataMain.Execution.ReboundBitMask &
                e.BulletDataMain.Logic.ReboundChannel)),
            (o = BulletUtil_1.BulletUtil.CheckSupport(
              e,
              this.a7o.AttackerCamp,
            )),
            (l || o) &&
              (o
                ? t.GetComponent(13).ActionSupport(this.a7o.Entity)
                : l &&
                  0 === e.AttackerCamp &&
                  BulletUtil_1.BulletUtil.AttackedCampCondition(
                    this.a7o,
                    e.AttackerActorComp,
                  ) &&
                  (this.Ojo.ActionRebound(e),
                  BulletController_1.BulletController.DestroyBullet(
                    this.a7o.BulletEntityId,
                    !1,
                  ),
                  EventSystem_1.EventSystem.EmitWithTarget(
                    e.Attacker,
                    EventDefine_1.EEventName.BulletRebound,
                    this.a7o.Attacker,
                    this.a7o.BulletInitParams.SkillId,
                  )))));
  }
  bWo(t) {
    var e = t.GetBulletInfo(),
      i = e.BulletDataMain,
      l = this.a7o.BulletDataMain;
    !l.Base.ContinuesCollision ||
      !l.TimeScale.ForceBulletTimeScaleInArea ||
      i.TimeScale.TimeScaleWithAttacker ||
      i.Base.ContinuesCollision ||
      this.Bjo.BulletEntityMap.get(t) ||
      ((i = l.TimeScale.TimeScaleOnHit),
      (l = BulletUtil_1.BulletUtil.SetTimeScale(
        e,
        i.优先级,
        i.时间膨胀值,
        i.时间膨胀变化曲线,
        this.a7o.Duration,
        2,
      )),
      this.Bjo.BulletEntityMap.set(t, l));
  }
  qWo(t) {
    var e = t.GetComponent(3);
    return (
      !BulletUtil_1.BulletUtil.AttackedCondition(this.a7o, e) ||
      !BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(this.a7o, t)
    );
  }
  TWo(e) {
    if (this.AWo(e)) {
      var l = this.a7o,
        i = l.BulletDataMain;
      if (e.EntityHandle?.Valid) {
        var o = e.Entity,
          s = BulletPool_1.BulletPool.CreateVector();
        if (e.HitResult)
          s.Set(
            e.HitResult.ImpactPointX[0],
            e.HitResult.ImpactPointY[0],
            e.HitResult.ImpactPointZ[0],
          );
        else {
          var r = e.Components,
            a = r.length;
          if (0 < a) {
            let e = 0,
              i = void 0;
            for (let t = 0; t < a; t++) {
              var n =
                BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
                  r[t],
                  l,
                );
              (void 0 === i || n < e) && ((e = n), (i = t));
            }
            BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointSceneItem(
              r[i],
              l,
              s,
            );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                20,
                "命中场景物获取不到碰撞体",
                ["bulletRowName", l.BulletRowName],
                ["SceneItemId", e.Entity.GetComponent(0).GetCreatureDataId()],
              );
        }
        var h = o.Id,
          _ = l.AttackerActorComp,
          u = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
            this.a7o.Attacker,
            l.CollisionInfo.BeHitEffect,
          ),
          B =
            (GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(
              l.BulletEntityId,
              h,
            ),
            l.BulletEntityId),
          c = l.CollisionInfo.DamageId,
          v = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(c),
          v = 0 < c ? v.CalculateType : -1,
          u = new BulletTypes_1.HitInformation(
            l.Attacker,
            void 0,
            u,
            Number(l.BulletRowName),
            UE.KismetMathLibrary.D_TransformRotation(
              _.Actor.Mesh.D_K2_GetComponentToWorld(),
              i.Base.AttackDirection.ToUeRotator(),
            ),
            !1,
            void 0,
            s,
            0,
            i,
            this.a7o.BulletRowName,
            c,
            i.Logic.Data,
            B,
            v,
          );
        BulletUtil_1.BulletUtil.SummonBullet(l, 1, e.Entity, !1),
          this.Ojo.ActionHitObstacles(e),
          EventSystem_1.EventSystem.EmitWithTarget(
            l.Entity,
            EventDefine_1.EEventName.BulletHit,
            u,
            void 0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BulletHit,
            u,
            void 0,
          ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Bullet",
              20,
              "HitSceneItem",
              ["BulletId", l.BulletRowName],
              ["EntityId", B],
              ["VitimEntityId", h],
            );
        let t = IMatch_1.EBulletPenetrationType.Penetrable;
        _ = o.GetComponent(152);
        _
          ? ((c = _.OnSceneItemHit(u, e)),
            (v =
              (t =
                void 0 === (t = _.GetPenetrationType())
                  ? IMatch_1.EBulletPenetrationType.Penetrable
                  : t) === IMatch_1.EBulletPenetrationType.Penetrable
                ? i.Logic.DestroyOnHitCharacter
                : i.Logic.DestroyOnHitObstacle),
            c &&
              v &&
              BulletController_1.BulletController.DestroyBullet(
                l.BulletEntityId,
                !1,
              ))
          : i.Logic.DestroyOnHitCharacter &&
            (BulletStaticFunction_1.BulletStaticFunction.BulletHitEffect(
              this.a7o,
              s.ToUeVector(),
            ),
            BulletController_1.BulletController.DestroyBullet(
              l.BulletEntityId,
              !1,
            )),
          BulletPool_1.BulletPool.RecycleVector(s),
          this.Bjo.ObjectsHitCurrent.set(h, l.LiveTimeCurHit),
          this.BWo(i.Base.IntervalAfterHit, l, h);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Bullet", 20, "HitSceneItem victim entity invalid", [
            "BulletId",
            l.BulletRowName,
          ]);
    }
  }
  Wr_(e) {
    if (e.EntityHandle?.Valid) {
      var l = this.a7o;
      if (
        (this.UWo(e.Entity),
        this.AWo(e) &&
          BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(
            l,
            e.Entity,
          ))
      ) {
        var i = e.Entity,
          o = i.Id,
          s = i.GetComponent(1),
          r = l.AttackerActorComp,
          a = l.BulletDataMain,
          n = BulletPool_1.BulletPool.CreateVector(),
          h = e.Components,
          _ = h.length;
        let t = void 0;
        if (0 < _) {
          let e = 0,
            i = void 0;
          for (let t = 0; t < _; t++) {
            var u = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
              h[t],
              l,
            );
            (void 0 === i || u < e) && ((e = u), (i = t));
          }
          var B = h[i];
          (t = B.GetName()),
            BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
              B,
              l,
              n,
            );
        } else n.DeepCopy(s.ActorLocationProxy);
        (B = l.CollisionInfo.DamageId),
          (s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(B)),
          (s = 0 < B ? s.CalculateType : -1),
          (r = new BulletTypes_1.HitInformation(
            l.Attacker,
            i,
            void 0,
            l.BulletRowName,
            UE.KismetMathLibrary.D_TransformRotation(
              r.Actor.Mesh.D_K2_GetComponentToWorld(),
              a.Base.AttackDirection.ToUeRotator(),
            ),
            BulletUtil_1.BulletUtil.ShakeTest(l, i.GetComponent(1)),
            FNameUtil_1.FNameUtil.GetDynamicFName(t) ??
              FNameUtil_1.FNameUtil.NONE,
            n,
            l.SkillLevel,
            a,
            this.a7o.BulletRowName,
            B,
            a.Logic.Data,
            l.BulletEntityId,
            s,
          ));
        GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(
          this.a7o.BulletEntityId,
          i.Id,
        ),
          EventSystem_1.EventSystem.EmitWithTarget(
            l.Entity,
            EventDefine_1.EEventName.BulletHit,
            r,
            void 0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BulletHit,
            r,
            void 0,
          ),
          this.Ojo.ActionHit(e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Bullet", 48, "HitVehicle", [
              "BulletId",
              l.BulletRowName,
            ]),
          BulletPool_1.BulletPool.RecycleVector(n),
          this.Bjo.ObjectsHitCurrent.set(o, l.LiveTimeCurHit),
          BulletCollisionUtil_1.BulletCollisionUtil.PlayVehicleHitEffect(
            l,
            r.HitPosition,
            r.HitEffectRotation,
          ),
          i.GetComponent(269).OnHit(r, l),
          BulletUtil_1.BulletUtil.SummonBullet(
            this.a7o,
            1,
            e.Entity,
            !1,
            n,
            l.CollisionInfo.LastFramePosition,
            !1,
          ),
          this.$ba(a.Logic.DestroyOnHitCharacter, l.BulletEntityId, "结算时");
      }
    }
  }
  LWo(t) {
    var e;
    t.IsContinueHit ||
      ((e = BulletPool_1.BulletPool.CreateVector()),
      t.HitResult
        ? e.Set(
            t.HitResult.ImpactPointX[0],
            t.HitResult.ImpactPointY[0],
            t.HitResult.ImpactPointZ[0],
          )
        : e.FromUeVector(this.a7o.ActorComponent.ActorLocationProxy),
      BulletUtil_1.BulletUtil.SummonBullet(this.a7o, 2, t.Entity, !1),
      this.Ojo.ActionHitObstacles(t),
      BulletStaticFunction_1.BulletStaticFunction.BulletHitEffect(
        this.a7o,
        e.ToUeVector(),
      ),
      BulletPool_1.BulletPool.RecycleVector(e),
      this.a7o.BulletDataMain.Logic.DestroyOnHitObstacle &&
        BulletController_1.BulletController.DestroyBullet(
          this.a7o.BulletEntityId,
          !1,
        ));
  }
  AWo(t) {
    return !this.Bjo.ObjectsHitCurrent.has(t.Entity.Id);
  }
  cth(t, e, i, l) {
    let o = 0;
    switch (t) {
      case 6:
        o = i.Size();
        break;
      case 7:
        o = i.X;
        break;
      case 8:
      case 9:
        o = Math.sqrt(i.X * i.X + i.Z * i.Z);
    }
    ControllerHolder_1.ControllerHolder.WorldController.GetEntitiesInRangeWithLocation(
      e,
      o,
      63,
      l,
      !0,
    );
  }
}
((exports.BulletCollisionSystem = BulletCollisionSystem).gW =
  Stats_1.Stat.Create("BulletCollisionTick")),
  (BulletCollisionSystem.oWo = Stats_1.Stat.Create(
    "BulletCollisionRegionSearchEntity",
  )),
  (BulletCollisionSystem.fW = Stats_1.Stat.Create("BulletCollisionAfterTick")),
  (BulletCollisionSystem.aWo = Transform_1.Transform.Create()),
  (BulletCollisionSystem.EWo = Stats_1.Stat.Create("BulletProcessHit"));
//# sourceMappingURL=BulletCollisionSystem.js.map
