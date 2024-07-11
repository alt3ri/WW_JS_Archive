"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCollisionSystem = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  DamageById_1 = require("../../../../Core/Define/ConfigQuery/DamageById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
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
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneTeamController_1 = require("../../../Module/SceneTeam/SceneTeamController"),
  CombatLog_1 = require("../../../Utils/CombatLog"),
  BulletConstant_1 = require("../../Bullet/BulletConstant"),
  BulletStaticFunction_1 = require("../../Bullet/BulletStaticMethod/BulletStaticFunction"),
  BulletTypes_1 = require("../../Bullet/BulletTypes"),
  ExtraEffectBaseTypes_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectBaseTypes"),
  ExtraEffectDamageFilter_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectDamageFilter"),
  RoleAudioController_1 = require("../../Character/Role/RoleAudioController"),
  BulletActionInitHit_1 = require("../Action/BulletActionInitHit"),
  BulletController_1 = require("../BulletController"),
  BulletCollisionUtil_1 = require("../BulletStaticMethod/BulletCollisionUtil"),
  BulletHitCountUtil_1 = require("../BulletStaticMethod/BulletHitCountUtil"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletEntity_1 = require("../Entity/BulletEntity"),
  BulletCollisionInfo_1 = require("../Model/BulletCollisionInfo"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletTraceElementPool_1 = require("../Model/BulletTraceElementPool"),
  BulletSystemBase_1 = require("./BulletSystemBase"),
  PROFILE_UPDATETRACE_BOX = "BulletMoveUpdateTraceBox",
  PROFILE_UPDATETRACE_SPHERE = "BulletMoveUpdateTraceSphere",
  PROFILE_UPDATE_TRACE_DEFAULT = "BulletMoveUpdateTraceDefault",
  PROFILE_OBSTACLES = "BulletMoveObstacles",
  PROFILE_TICKTRACE = "BulletOnTickTrace",
  MIN_DELTA_TIME = 16.7,
  BIG_BULLET_SEARCH_SCENE_ITME_MIN_TIME = 0.1;
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
      (this.VMa = 0),
      (this.Gjo = Vector_1.Vector.Create()),
      (this.Njo = Vector_1.Vector.Create());
  }
  get Ojo() {
    return this.a7o.ActionLogicComponent;
  }
  OnTick(t) {
    let e = 0;
    this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond;
    for (const l of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (e = cpp_1.KuroTime.GetMilliseconds64());
      var i = l.GetBulletInfo();
      !i.NeedDestroy &&
        i.IsInit &&
        (StatDefine_1.BATTLESTAT_ENABLED,
        this.kjo(t, i),
        StatDefine_1.BATTLESTAT_ENABLED),
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
      (this.VMa = 0);
  }
  kjo(t, e) {
    (this.a7o = e),
      (this.Bjo = e.CollisionInfo),
      (this.bjo = e.BulletDataMain.Base.Shape),
      4 === this.bjo &&
        ((this.qjo = e.RayInfo),
        (this.VMa = e.BulletDataMain.Base.HitActorType),
        this.Fjo(t),
        (this.VMa = 0)),
      this.Vjo(),
      this.Hjo(),
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
        21,
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
        e.Actor.Mesh.GetRelativeTransform().GetLocation(),
      ),
      i.AdditionEqual(e.ActorLocationProxy),
      (l = this.Pjo).SetRotation(e.ActorQuatProxy),
      l.SetScale3D(e.ActorScaleProxy),
      l.SetLocation(i),
      BulletPool_1.BulletPool.RecycleVector(i),
      (e = BulletPool_1.BulletPool.CreateVector()),
      l.TransformPosition(this.a7o.BornLocationOffset, e),
      (i = UE.KismetMathLibrary.FindLookAtRotation(
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
        this.Bjo.CollisionComponent.SetBoxExtent(this.xjo.ToUeVector(), !1),
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
                  t.Base.Duration * TimeUtil_1.TimeUtil.InverseMillisecond,
                  t.Scale.ScaleCurve,
                ),
              ),
              this.wjo.MultiplyEqual(this.Bjo.FinalScale))
            : Vector_1.Vector.Lerp(
                Vector_1.Vector.OneVectorProxy,
                this.Bjo.FinalScale,
                this.a7o.LiveTime /
                  (TimeUtil_1.TimeUtil.InverseMillisecond * t.Base.Duration),
                this.wjo,
              ),
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
            18,
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
    this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond;
    let e = 0;
    for (const l of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (e = cpp_1.KuroTime.GetMilliseconds64());
      var i = l.GetBulletInfo();
      if (!i.NeedDestroy && i.IsInit) {
        if (!BulletUtil_1.BulletUtil.CheckBulletAttackerExist(i)) {
          BulletController_1.BulletController.DestroyBullet(
            i.BulletEntityId,
            !1,
          );
          continue;
        }
        StatDefine_1.BATTLESTAT_ENABLED,
          this.Qjo(t, i),
          StatDefine_1.BATTLESTAT_ENABLED;
      }
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
      (this.qjo = void 0);
  }
  Qjo(t, i) {
    if (
      ((this.a7o = i),
      (this.Bjo = i.CollisionInfo),
      (this.bjo = i.BulletDataMain.Base.Shape),
      this.Xjo() && this.Yfa())
    ) {
      if (((this.VMa = i.BulletDataMain.Base.HitActorType), 7 === this.bjo))
        this.$jo();
      else {
        var e = this.Yjo();
        if (
          (i.HasCheckedPosition ||
            (e && i.BulletDataMain.Logic.DestroyOnHitObstacle && this.Jjo(),
            i.CheckedPosition()),
          this.zjo(),
          !this.Bjo.HasSearchedHitActorsCurFrame)
        ) {
          var e = (0, puerts_1.$ref)(void 0),
            l =
              (this.Bjo.CollisionComponent?.GetOverlappingComponents(e),
              (0, puerts_1.$unref)(e));
          if (l) {
            var o = l.Num();
            for (let t = 0; t < o; t++) {
              var s = l.Get(t),
                r = s.GetOwner();
              this.Kjo(r, s);
            }
          }
        }
      }
      this.Bjo.IsInProcessHit = !0;
      var a,
        e = this.a7o.CollisionLocation,
        n = this.Bjo.ArrayHitActorData,
        h = n.length;
      if (1 < h) {
        for (let t = 0; t < h; t++) {
          var _ = n[t],
            u = BulletCollisionInfo_1.bulletHitPriorityList[_.Type];
          _.Priority = void 0 !== u ? u - t : 0;
        }
        this.Bjo.ArrayHitActorData.sort((t, e) => e.Priority - t.Priority);
      }
      if (this.Bjo.IsProcessOpen) {
        var B = i.BulletDataMain.Base.IntervalAfterHit,
          c = this.Bjo.IntervalMs;
        if (c <= 0) {
          let t = 1;
          for (const P of this.Bjo.ArrayHitActorData) this.$Ks(P, t) && t++;
        } else if (B) {
          var v = Math.floor((i.LiveTimeAddDelta - i.LiveTime) / c) + 1,
            m = this.Bjo.ObjectsHitCurrent;
          for (let e = 0; e < v; e++) {
            var C = 0 === e;
            let t = 1;
            for (const g of this.Bjo.ArrayHitActorData) {
              var f = g.Entity?.Id;
              if (f) {
                var E = m.get(f);
                if (void 0 !== E) {
                  E = E + c;
                  if (i.LiveTimeAddDelta < E) continue;
                  (i.LiveTimeCurHit = E), m.delete(f);
                } else i.LiveTimeCurHit = i.LiveTime;
                this.XKs(g, t, C) && t++;
              } else 0 === e && this.$Ks(g, t) && t++;
            }
          }
        } else {
          let t = this.Bjo.StageInterval - this.Bjo.LastStageInterval;
          if (0 < t) {
            (this.Bjo.LastStageInterval = this.Bjo.StageInterval),
              c < MIN_DELTA_TIME && (t = 1);
            for (let e = 0; e < t; e++) {
              (this.Bjo.AllowedEnergy = !0), this.Bjo.ObjectsHitCurrent.clear();
              var d = 0 === e;
              let t = 1;
              for (const T of this.Bjo.ArrayHitActorData)
                this.XKs(T, t, d) && t++;
            }
          }
        }
      }
      for (const p of this.Bjo.LastArrayHitActorData)
        p.IsValidHit &&
          (!(a = p.Actor) ||
            ((a = this.Bjo.MapHitActorData.get(a)) && a.IsValidHit) ||
            BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this.a7o, p));
      this.Bjo.LastFramePosition.FromUeVector(e),
        (this.Bjo.IsInProcessHit = !1),
        this.Bjo.UpdateLastHitActorData();
    } else {
      if (0 < this.Bjo.LastArrayHitActorData.length) {
        this.Bjo.IsInProcessHit = !0;
        for (const U of this.Bjo.LastArrayHitActorData)
          U.IsValidHit &&
            BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this.a7o, U);
        (this.Bjo.IsInProcessHit = !1), this.Bjo.ClearLastHitActorData();
      }
      0 < this.Bjo.ArrayHitActor.length && this.Bjo.ClearHitActorData();
    }
  }
  $Ks(t, e) {
    return this.Zjo(t)
      ? ((t.ValidProcessIndex = e),
        (t.IsValidHit = !0),
        this.Bjo.LastMapHitActorData.get(t.Actor)?.IsValidHit &&
          (t.IsContinueHit = !0),
        this.eWo(t),
        !0)
      : ((t.IsValidHit = !1), (t.IsContinueHit = !1));
  }
  XKs(t, e, i) {
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
  Yfa() {
    var t = this.a7o,
      e = this.Bjo;
    if (!e.IsProcessOpen) return !1;
    if (0 < e.IntervalMs && !t.BulletDataMain.Base.IntervalAfterHit) {
      (t = t.LiveTimeAddDelta - e.ActiveDelayMs),
        (t =
          ((e.StageInterval = Math.floor(t / e.IntervalMs) + 1),
          e.StageInterval - e.LastStageInterval));
      if (t <= 0) return !1;
    }
    return !0;
  }
  tWo(t) {
    var e = t.BulletDataMain.Move,
      i = t.ActorComponent.NeedDetach,
      e = e.Speed;
    return !(!i && (0 === e || e * this.mie < t.Size.X));
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
    var s = t.CollisionLocation;
    if (
      (this.Bjo.LastFramePosition.Equals(s) &&
        s.AdditionEqual(t.ActorComponent.ActorForwardProxy),
      o && this.iWo(t, s),
      !l)
    )
      return !1;
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
    if (r) {
      var _ = a.GetHitCount();
      if (!(_ <= 0))
        if (1 === _)
          this.Kjo(a.Actors.Get(0), a.Components.Get(0), void 0, a, 0);
        else {
          var u = new Array(),
            B = a.Components,
            c = a.Actors,
            v = a.LocationX_Array,
            m = a.LocationY_Array,
            C = a.LocationZ_Array;
          for (let t = 0; t < _; t++) {
            var f = BulletPool_1.BulletPool.CreateBulletHitTempResult();
            (f.Index = t),
              (f.ImpactPoint.X = v.Get(t)),
              (f.ImpactPoint.Y = m.Get(t)),
              (f.ImpactPoint.Z = C.Get(t)),
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
    var e = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (e) {
      var i = this.a7o.Size.X,
        l = this.a7o.ActorComponent.ActorLocationProxy,
        o = this.a7o.BulletDataMain.Base;
      let t = o.BigRangeHitSceneItem;
      t &&
        (o.Interval < BIG_BULLET_SEARCH_SCENE_ITME_MIN_TIME ||
          o.IntervalAfterHit) &&
        (CombatLog_1.CombatLog.Error(
          "Bullet",
          this.a7o?.Entity,
          "大范围子弹对场景物件生效必须配置【作用间隔】大于0.1秒且不能勾选【作用间隔基于个体】",
          ["BulletRowName", this.a7o?.BulletRowName],
        ),
        (t = !1));
      for (const s of e) this.rWo(s, l, i, t);
    }
  }
  rWo(t, e, i, l) {
    var o,
      s,
      l = this.Jfa(t, l);
    0 !== l &&
      (s = (o = t.Entity.GetComponent(1))?.ActorLocationProxy) &&
      Math.abs(s.X - e.X) <= i &&
      Math.abs(s.Y - e.Y) <= i &&
      Math.abs(s.Z - e.Z) <= i &&
      this.zfa(t, o, l);
  }
  Jfa(t, e) {
    var i;
    return t?.IsInit && (t = t.Entity) && (i = t.GetComponent(0))
      ? (i = i.GetEntityType()) === Protocol_1.Aki.Protocol.wks.Proto_Player ||
        i === Protocol_1.Aki.Protocol.wks.Proto_Monster ||
        i === Protocol_1.Aki.Protocol.wks.Proto_Vision
        ? this.HMa(1)
        : e &&
            i === Protocol_1.Aki.Protocol.wks.Proto_SceneItem &&
            t.GetComponent(140)
          ? this.HMa(3)
          : 0
      : 0;
  }
  zjo() {
    var e = this.Bjo.RegionDetectComponent;
    if (e) {
      this.Bjo.HasSearchedHitActorsCurFrame = !0;
      var i = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
      if (i) {
        var l = this.a7o.BulletDataMain.Base;
        let t = l.BigRangeHitSceneItem;
        t &&
          (l.Interval < BIG_BULLET_SEARCH_SCENE_ITME_MIN_TIME ||
            l.IntervalAfterHit) &&
          (CombatLog_1.CombatLog.Error(
            "Bullet",
            this.a7o?.Entity,
            "大范围子弹对场景物件生效必须配置【作用间隔】大于0.1秒且不能勾选【作用间隔基于个体】",
            ["BulletRowName", this.a7o?.BulletRowName],
          ),
          (t = !1));
        for (const o of i) this.sWo(o, e, t);
      }
    }
  }
  sWo(t, e, i) {
    var l,
      o,
      i = this.Jfa(t, i);
    0 !== i &&
      (o = (l = t.Entity.GetComponent(1))?.ActorLocation) &&
      e.Detect(o, BulletConstant_1.BulletConstant.RegionKey) &&
      this.zfa(t, l, i);
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
              this.Bjo.LastFramePosition.ToUeVector(),
              e.ToUeVector(),
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
            18,
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
          18,
          "生成HitActorData前没有经过PreCheckCondition",
        );
      for (const i of this.Bjo.MapBulletConditionResult.keys()) {
        i === t.Actor &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            18,
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
    return (
      0 !== t.Type &&
      !!t.Actor?.IsValid() &&
      !(
        (t.EntityHandle && !t.EntityHandle.Valid) ||
        (1 === t.Type &&
          ExtraEffectDamageFilter_1.DamageFilter.ApplyEffects(
            this.a7o.Attacker,
            t.Entity,
            this.a7o.BulletInitParams.BulletRowName,
            this.a7o.Tags,
            this.a7o.BulletInitParams.SkillId,
            this.a7o.BulletDataMain.Base.DamageId,
          ))
      )
    );
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
        var e = this.a7o.CenterLocation;
        for (const o of t.Components)
          if (
            SpaceUtils_1.SpaceUtils.IsComponentInRingArea(e, this.a7o.Size, o)
          )
            return !0;
        return !1;
      case 2:
        var i = this.a7o.CenterLocation,
          l = BulletPool_1.BulletPool.CreateRotator();
        l.FromUeRotator(this.a7o.CollisionInfo.CollisionTransform.Rotator());
        for (const s of t.Components)
          if (
            SpaceUtils_1.SpaceUtils.IsComponentInSectorArea(
              i,
              this.a7o.Size,
              l.Quaternion(),
              s,
            )
          )
            return BulletPool_1.BulletPool.RecycleRotator(l), !0;
        return BulletPool_1.BulletPool.RecycleRotator(l), !1;
      default:
        return !0;
    }
  }
  fWo(t) {
    return (
      1 !== t.Type ||
      ((t = t.Entity.GetComponent(3)),
      BulletUtil_1.BulletUtil.AttackedCondition(this.a7o, t))
    );
  }
  Kjo(i, l, o, s, r) {
    if (
      (BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          18,
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
                    18,
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
        !(o?.Entity?.GetComponent(140) ?? o?.Entity?.GetComponent(148)) &&
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
            21,
            "触发碰撞 障碍物检测",
            ["Bullet", this.a7o?.BulletRowName],
            ["Actor", e.GetName()],
          );
      }
    }
  }
  zfa(e, i, l) {
    var o = i.Owner;
    if (
      (BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          18,
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
                    18,
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
                      18,
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
                      18,
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
                    18,
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
                  18,
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
          if (s === Protocol_1.Aki.Protocol.wks.Proto_SceneItem)
            return (i.Type = this.HMa(3)), i;
          if (s === Protocol_1.Aki.Protocol.wks.Proto_Npc)
            return (i.Type = this.HMa(5)), i;
          if (
            s === Protocol_1.Aki.Protocol.wks.Proto_Animal &&
            2 === o.GetEntityCamp()
          )
            return (i.Type = this.HMa(6)), i;
          if (l.GetComponent(3)) return (i.Type = this.HMa(1)), i;
        } else {
          s = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t);
          if (s && s instanceof BulletEntity_1.BulletEntity)
            return (i.Type = this.HMa(2)), (i.BulletEntityId = t), i;
        }
        return (i.Type = 0), i;
      }
    }
    o = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
    return o?.Valid
      ? ((i.EntityHandle = o), (i.Type = this.HMa(3)), i)
      : this.Bjo.HasObstaclesCollision
        ? void 0
        : (this.a7o.BulletDataMain.Logic.IgnoreWater &&
          BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(
            t.GetCollisionProfileName(),
          )
            ? (i.Type = 0)
            : (i.Type = this.HMa(4)),
          i);
  }
  HMa(t) {
    return 0 === this.VMa || t === this.VMa ? t : 0;
  }
  MWo(t) {
    var e = BulletPool_1.BulletPool.CreateBulletHitActorData();
    return (e.Actor = t), (e.Type = 4), (e.FromObstaclesCollision = !0), e;
  }
  eWo(t) {
    var e = this.a7o;
    if (!e.NeedDestroy) {
      this.SWo(t);
      try {
        switch (t.Type) {
          case 1:
            this.yWo(t);
            break;
          case 2:
            this.IWo(t);
            break;
          case 3:
            this.TWo(t);
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
              18,
              "Bullet ProcessHit Error",
              t,
              ["BulletEntityId", this.a7o.BulletEntityId],
              ["BulletRowName", this.a7o.BulletRowName],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              18,
              "Bullet ProcessHit Error",
              ["BulletEntityId", this.a7o.BulletEntityId],
              ["BulletRowName", this.a7o.BulletRowName],
              ["error", t],
            );
      }
    }
  }
  SWo(t) {
    Stats_1.Stat.Enable &&
      t.Entity &&
      (t.Entity.Id, t.Entity.GetComponent(0)?.GetPbDataId());
  }
  yWo(t) {
    var e;
    t.EntityHandle?.Valid &&
      ((e = t.Entity.GetComponent(60))?.Valid && e.IsMultiPart
        ? this.DWo(t)
        : this.RWo(t));
  }
  DWo(s) {
    var t = s.Entity.GetComponent(3),
      r = (this.UWo(s.Entity), this.a7o);
    if (
      this.AWo(s) &&
      BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(
        r,
        s.Entity,
      )
    ) {
      var a = t.Entity,
        n = t.ActorForwardProxy,
        h = a.GetComponent(60),
        _ = [],
        u = [],
        B = [],
        c = [];
      let i = !1;
      var v = new Map(),
        t = BulletPool_1.BulletPool.CreateRotator();
      t.FromUeRotator(
        UE.KismetMathLibrary.TransformRotation(
          r.AttackerActorComp.ActorTransform,
          r.BulletDataMain.Base.AttackDirection.ToUeRotator(),
        ),
      );
      let l = 0;
      var m = s.Components;
      let o = void 0;
      for (let t = 0, e = s.Components.length; t < e; t++) {
        var C = m[t];
        const P = C.GetName();
        if (P !== BulletConstant_1.BulletConstant.MoveCylinder) {
          var f = h.GetPart(P);
          if (!(_.includes(f) || u.includes(f) || B.includes(f))) {
            if (
              (BulletConstant_1.BulletConstant.OpenHitActorLog &&
                Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Bullet",
                  21,
                  "子弹击中部位",
                  ["部位", P],
                  ["子弹ID", r.BulletRowName],
                ),
              f?.Active)
            )
              if (((f.HitBoneName = P), f.IsShield)) {
                var E = BulletPool_1.BulletPool.CreateVector();
                if (
                  (BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
                    C,
                    r,
                    E,
                  ),
                  v.set(P, E),
                  this.CheckAngle(f.BlockAngle, r, E, n))
                ) {
                  _.push(f), (l = t);
                  break;
                }
              } else
                f.SeparateDamage
                  ? (u.push(f),
                    f.IsWeakness &&
                      ((E = BulletPool_1.BulletPool.CreateVector()),
                      BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
                        C,
                        r,
                        E,
                      ),
                      v.set(P, E)))
                  : (B.push(f),
                    f.IsWeakness &&
                      ((f = BulletPool_1.BulletPool.CreateVector()),
                      BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
                        C,
                        r,
                        f,
                      ),
                      v.set(P, f)),
                    (i = !0));
            else c.push(P), (i = !0);
            f = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
              C,
              r,
            );
            BulletConstant_1.BulletConstant.OpenHitActorLog &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Bullet",
                21,
                "命中特效 选择",
                ["boneName", P],
                ["cos", f],
                ["bulletRowName", r.BulletRowName],
              ),
              (void 0 === o || f < o) && ((o = f), (l = t));
          }
        }
      }
      let e = !1;
      if (0 < _.length)
        BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(r, a);
      else {
        for (const T of u) {
          if (
            !BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(
              r,
              a,
            )
          )
            break;
          T.IsWeakness &&
            ((T.IsWeaknessHit = this.CheckWeakness(
              T,
              r,
              v.get(T.HitBoneName),
              n,
            )),
            T.IsWeaknessHit) &&
            (e = !0),
            BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(r, a);
        }
        if (0 < B.length) {
          let t = void 0;
          for (const p of B)
            if (
              p.IsWeakness &&
              ((p.IsWeaknessHit = this.CheckWeakness(
                p,
                r,
                v.get(p.HitBoneName),
                n,
              )),
              p.IsWeaknessHit)
            ) {
              t = p;
              break;
            }
          t && ((B.length = 0), (e = !0), B.push(t));
        }
      }
      BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(r, a)
        ? i && BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(r, a)
        : (i = !1);
      var d = m[l];
      const P = d.GetName(),
        g = BulletPool_1.BulletPool.CreateVector();
      v.has(P)
        ? g.FromUeVector(v.get(P))
        : BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
            d,
            r,
            g,
          ),
        BulletConstant_1.BulletConstant.OpenHitActorLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            21,
            "命中特效 最终",
            ["boneName", P],
            ["bulletRowName", r.BulletRowName],
          );
      d = this.a7o.BulletDataMain;
      this.Bjo.StopHit || this.PWo(s, d, g, i, P, _, u, B, c, e),
        BulletUtil_1.BulletUtil.SummonBullet(
          this.a7o,
          1,
          s.Entity,
          !1,
          g,
          r.CollisionInfo.LastFramePosition,
        ),
        d.Logic.DestroyOnHitCharacter &&
          this.a7o.AttackerActorComp.IsAutonomousProxy &&
          BulletController_1.BulletController.DestroyBullet(
            this.a7o.BulletEntityId,
            !1,
          ),
        (this.Bjo.StopHit = !1);
      for (const [, g] of v) BulletPool_1.BulletPool.RecycleVector(g);
      BulletPool_1.BulletPool.RecycleVector(g),
        BulletPool_1.BulletPool.RecycleRotator(t);
    }
  }
  CheckWeakness(t, e, i, l) {
    if (t && t.IsWeakness) {
      var o = e.BulletDataMain.Logic.Type;
      if (
        !t.WeaknessTypeSet ||
        0 === t.WeaknessTypeSet.size ||
        (o && t.WeaknessTypeSet.has(o))
      )
        return this.CheckAngle(t.WeaknessAngle, e, i, l);
    }
    return !1;
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
          o = this.a7o.Attacker.CheckGetComponent(159),
          s = e.CheckGetComponent(159),
          r = e.CheckGetComponent(188);
        let t = !0;
        if (
          (t =
            e.GetComponent(0).IsRole() && !e.GetComponent(3).IsRoleAndCtrlByMe
              ? !1
              : t)
        )
          for (const a of i.Execution.GeIdApplyToVictim)
            0 === s.GetBuffTotalStackById(a) &&
              s.AddBuff(a, {
                InstigatorId: o.CreatureDataId,
                Level: this.a7o.SkillLevel,
                PreMessageId: this.a7o.ContextId,
                Reason: `子弹${i.BulletRowName}命中`,
              });
        r.HasTag(-648310348) ||
          ((r = i.TimeScale.TimeScaleOnHit),
          i.TimeScale.AreaTimeScale
            ? 0 < this.Bjo.CharacterEntityMap.get(e) ||
              ((l = e.GetComponent(109))
                ? ((l = l.SetTimeScale(
                    r.优先级,
                    r.时间膨胀值,
                    r.时间膨胀变化曲线,
                    i.Base.Duration,
                    2,
                  )),
                  this.Bjo.CharacterEntityMap.set(e, l))
                : this.Bjo.CharacterEntityMap.set(e, 0))
            : this.Bjo.CharacterEntityMap.set(e, 0));
      }
    }
  }
  RWo(e) {
    var i = e.Entity,
      l = e.Entity.GetComponent(3),
      o = this.a7o;
    if (
      (this.UWo(e.Entity),
      this.AWo(e) &&
        BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(o, e.Entity))
    )
      if (this.xWo(e.Entity))
        UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
          l.Actor,
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-63529668),
          void 0,
        ),
          this.a7o?.Attacker &&
            i &&
            ((s = [
              this.a7o.Attacker,
              i,
              this.a7o.BulletInitParams.SkillId,
              BigInt(this.a7o.BulletRowName ?? -1),
            ]),
            SceneTeamController_1.SceneTeamController.EmitEvent(
              i,
              EventDefine_1.EEventName.CharLimitDodge,
              ...s,
            ));
      else {
        var i = o.BulletDataMain,
          s = BulletPool_1.BulletPool.CreateVector(),
          r = e.Components,
          a = r.length;
        let t = void 0;
        if (0 < a) {
          let e = 0,
            i = void 0;
          for (let t = 0; t < a; t++) {
            var n = BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
              r[t],
              o,
            );
            (void 0 === i || n < e) && ((e = n), (i = t));
          }
          var h = r[i];
          (t = h.GetName()),
            BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
              h,
              o,
              s,
            );
        } else
          s.FromUeVector(
            l.GetSocketLocation(BulletConstant_1.BulletConstant.HitCase),
          );
        this.Bjo.StopHit || this.PWo(e, i, s, !0, t),
          BulletUtil_1.BulletUtil.SummonBullet(
            this.a7o,
            1,
            e.Entity,
            !1,
            s,
            o.CollisionInfo.LastFramePosition,
          ),
          i.Logic.DestroyOnHitCharacter &&
            this.a7o.AttackerActorComp.IsAutonomousProxy &&
            BulletController_1.BulletController.DestroyBullet(
              this.a7o.BulletEntityId,
              !1,
            ),
          (this.Bjo.StopHit = !1),
          BulletPool_1.BulletPool.RecycleVector(s);
      }
  }
  xWo(t) {
    return (
      !!this.a7o.BulletDataMain.Logic.CanDodge &&
      !!BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -549410347) &&
      !BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -1221493771)
    );
  }
  PWo(t, e, i, l, o, s, r, a, n, h = !1) {
    var _ = this.a7o,
      u = _.AttackerActorComp,
      B = t.Entity.GetComponent(3),
      c = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
        _.Attacker,
        e.Base.BeHitEffect,
      ),
      v = void 0 !== c,
      m = e.Base.DamageId,
      m = 0 < m ? DamageById_1.configDamageById.GetConfig(m).CalculateType : -1,
      c = new BulletTypes_1.HitInformation(
        _.Attacker,
        t.Entity,
        c,
        _.BulletRowName,
        UE.KismetMathLibrary.TransformRotation(
          u.Actor.Mesh.K2_GetComponentToWorld(),
          e.Base.AttackDirection.ToUeRotator(),
        ),
        BulletUtil_1.BulletUtil.ShakeTest(_, t.Entity.GetComponent(1)),
        FNameUtil_1.FNameUtil.GetDynamicFName(o) ?? FNameUtil_1.FNameUtil.NONE,
        i,
        _.SkillLevel,
        e,
        this.a7o.BulletRowName,
        e.Logic.Data,
        _.BulletEntityId,
        m,
      );
    if (
      (GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(
        this.a7o.BulletEntityId,
        t.Entity.Id,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        _.Entity,
        EventDefine_1.EEventName.BulletHit,
        c,
        void 0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BulletHit,
        c,
        void 0,
      ),
      this.Ojo.ActionHit(t),
      this.wWo(B))
    ) {
      var o = B.Entity.Id,
        i =
          (this.Bjo.ObjectsHitCurrent.set(o, _.LiveTimeCurHit),
          this.BWo(e.Base.IntervalAfterHit, _, o),
          BulletCollisionUtil_1.BulletCollisionUtil.PlayHitEffect(
            _,
            B,
            c.HitPart.toString(),
            h,
            c.HitPosition,
            c.HitEffectRotation,
          ),
          B.Entity.GetComponent(52).OnHit(
            c,
            v,
            _.Entity,
            this.Bjo.AllowedEnergy,
            l,
            s,
            r,
            a,
            n,
          ),
          e.Execution.SendGameplayEventTagToAttacker),
        o =
          (i.TagName !== StringUtils_1.NONE_STRING &&
            (((m = new UE.GameplayEventData()).Target = B.Actor),
            (m.Instigator = _.Actor),
            UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
              _.AttackerActorComp.Actor,
              i,
              m,
            )),
          e.Execution.SendGameplayEventTagToVictim),
        C =
          (o.TagName !== StringUtils_1.NONE_STRING &&
            t.Entity.GetComponent(17).SendGameplayEventToActor(o),
          u.Entity.CheckGetComponent(159)),
        h = c.ReBulletData.Execution;
      for (const d of h.SendGeIdToAttacker)
        C.AddBuff(d, {
          InstigatorId: C.CreatureDataId,
          Level: _.SkillLevel,
          PreMessageId: _.ContextId,
          Reason: `子弹${_.BulletRowName}命中后对攻击者应用GE添加`,
        });
      var f = B.Entity.GetComponent(159);
      if (f?.Valid) {
        for (const P of h.SendGeIdToVictim)
          f.AddBuff(P, {
            InstigatorId: C.CreatureDataId,
            Level: _.SkillLevel,
            Reason: `子弹${_.BulletRowName}命中后对受击者应用GE添加`,
            PreMessageId: _.ContextId,
          });
        f.HasBuffTrigger(16) &&
          ((v = u.Entity.GetComponent(33)),
          (l =
            0 < e.Base.DamageId
              ? DamageById_1.configDamageById.GetConfig(e.Base.DamageId)
              : void 0),
          ((s = new ExtraEffectBaseTypes_1.RequirementPayload()).SkillId =
            Number(_.BulletInitParams.SkillId ?? -1)),
          (s.SkillGenre = v.CurrentSkill
            ? v.CurrentSkill.SkillInfo.SkillGenre
            : -1),
          l &&
            ((s.DamageGenre = l.Type),
            (s.CalculateType = l.CalculateType),
            (s.SmashType = l.SmashType),
            (s.ElementType = l.Element)),
          (s.BulletId = BigInt(_.BulletRowName)),
          (s.BulletTags = _.Tags ?? []),
          f.TriggerEvents(16, C, s));
      }
      if (this.Bjo.AllowedEnergy) {
        for (const g of h.EnergyRecoverGeIds)
          C.AddBuff(g, {
            InstigatorId: C.CreatureDataId,
            Level: _.SkillLevel,
            PreMessageId: _.ContextId,
            Reason: `子弹${_.BulletRowName}命中后对攻击者应用能量恢复类GE`,
          });
        this.Bjo.AllowedEnergy = !1;
      }
      if (h.SendGeIdToRoleInGame) {
        var E =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.CheckGetComponent(
            159,
          );
        if (E)
          for (const T of h.SendGeIdToRoleInGame)
            E.AddBuff(T, {
              InstigatorId: C.CreatureDataId,
              Level: _.SkillLevel,
              PreMessageId: _.ContextId,
              Reason: `子弹${_.BulletRowName}命中后对场上角色应用GE添加`,
            });
      }
    }
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
            21,
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
      (l = l.GetComponent(0).IsRole()),
      0 < i
        ? i === ModelManager_1.ModelManager.PlayerInfoModel.GetId()
        : (e && !l ? o : t).IsAutonomousProxy)
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
      ((l = this.a7o.BulletDataMain),
      (e = t.GetBulletInfo()).IsTensile
        ? (o = e.Attacker) &&
          this.xWo(o) &&
          !this.qWo(o) &&
          (RoleAudioController_1.RoleAudioController.PlayRoleAudio(o, 2004),
          (i = o.GetComponent(3)),
          (0, RegisterComponent_1.isComponentInstance)(i, 3) &&
            (UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
              i.Actor,
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-63529668),
              void 0,
            ),
            this.a7o.Attacker) &&
            ((i = [
              this.a7o.Attacker,
              o,
              this.a7o.BulletInitParams.SkillId,
              BigInt(this.a7o.BulletRowName ?? -1),
            ]),
            SceneTeamController_1.SceneTeamController.EmitEvent(
              o,
              EventDefine_1.EEventName.CharLimitDodge,
              ...i,
            )),
          o.GetComponent(0).GetEntityType() ===
            Protocol_1.Aki.Protocol.wks.Proto_Monster &&
            (i = this.a7o.AttackerBuffComp)?.Valid &&
            i.AddTagWithReturnHandle([-2043183300], l.Base.Duration),
          BulletController_1.BulletController.DestroyBullet(t.Id, !1))
        : ((o =
            0 <
            (l.Logic.ReboundChannel &
              e.BulletDataMain.Execution.ReboundBitMask)),
          (i =
            0 <
            (this.a7o.BulletDataMain.Execution.ReboundBitMask &
              e.BulletDataMain.Logic.ReboundChannel)),
          (l = BulletUtil_1.BulletUtil.CheckSupport(e, this.a7o.AttackerCamp)),
          (i || o || l) &&
            ((o = e.Attacker),
            (!l && this.qWo(o)) ||
              (l
                ? t.GetComponent(13).ActionSupport(this.a7o.Entity)
                : i &&
                  0 === e.AttackerCamp &&
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
                  ))))));
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
      (e = BulletUtil_1.BulletUtil.SetTimeScale(
        e,
        i.优先级,
        i.时间膨胀值,
        i.时间膨胀变化曲线,
        l.Base.Duration,
        2,
      )),
      this.Bjo.BulletEntityMap.set(t, e));
  }
  qWo(t) {
    var e = t.GetComponent(3);
    return (
      !BulletUtil_1.BulletUtil.AttackedCondition(this.a7o, e) ||
      !this.GWo() ||
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
                21,
                "命中场景物获取不到碰撞体",
                ["bulletRowName", l.BulletRowName],
                ["SceneItemId", e.Entity.GetComponent(0).GetCreatureDataId()],
              );
        }
        var h = o.Id,
          _ = l.AttackerActorComp,
          u = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
            this.a7o.Attacker,
            i.Base.BeHitEffect,
          ),
          B =
            (GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(
              l.BulletEntityId,
              h,
            ),
            l.BulletEntityId),
          c =
            0 < i.Base.DamageId
              ? DamageById_1.configDamageById.GetConfig(i.Base.DamageId)
                  .CalculateType
              : -1,
          u = new BulletTypes_1.HitInformation(
            l.Attacker,
            void 0,
            u,
            Number(l.BulletRowName),
            UE.KismetMathLibrary.TransformRotation(
              _.Actor.Mesh.K2_GetComponentToWorld(),
              i.Base.AttackDirection.ToUeRotator(),
            ),
            !1,
            void 0,
            s,
            0,
            i,
            this.a7o.BulletRowName,
            i.Logic.Data,
            B,
            c,
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
              21,
              "HitSceneItem",
              ["BulletId", l.BulletRowName],
              ["EntityId", B],
              ["VitimEntityId", h],
            );
        let t = IMatch_1.EBulletPenetrationType.Penetrable;
        _ = o.GetComponent(140);
        _
          ? ((c = _.OnSceneItemHit(u, e)),
            (B =
              (t =
                void 0 === (t = _.GetPenetrationType())
                  ? IMatch_1.EBulletPenetrationType.Penetrable
                  : t) === IMatch_1.EBulletPenetrationType.Penetrable
                ? i.Logic.DestroyOnHitCharacter
                : i.Logic.DestroyOnHitObstacle),
            c &&
              B &&
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
          Log_1.Log.Warn("Bullet", 21, "HitSceneItem victim entity invalid", [
            "BulletId",
            l.BulletRowName,
          ]);
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
    return !!this.GWo() && !this.Bjo.ObjectsHitCurrent.has(t.Entity.Id);
  }
  GWo() {
    var t,
      e = this.a7o.BulletDataMain,
      i = Math.max(0, e.Base.CollisionActiveDelay),
      e = e.Base.CollisionActiveDuration;
    return (
      (e < 0 && i <= 0) ||
      ((t = this.a7o.LiveTimeAddDelta / TimeUtil_1.TimeUtil.InverseMillisecond),
      e < 0 ? i <= t : 0 < e && i <= t && t <= i + e)
    );
  }
}
((exports.BulletCollisionSystem = BulletCollisionSystem).gW = void 0),
  (BulletCollisionSystem.oWo = void 0),
  (BulletCollisionSystem.fW = void 0),
  (BulletCollisionSystem.aWo = Transform_1.Transform.Create()),
  (BulletCollisionSystem.EWo = void 0);
//# sourceMappingURL=BulletCollisionSystem.js.map
