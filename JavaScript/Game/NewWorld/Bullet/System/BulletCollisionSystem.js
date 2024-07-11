"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCollisionSystem = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Time_1 = require("../../../../Core/Common/Time"),
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
  BulletConstant_1 = require("../../Bullet/BulletConstant"),
  BulletStaticFunction_1 = require("../../Bullet/BulletStaticMethod/BulletStaticFunction"),
  BulletTypes_1 = require("../../Bullet/BulletTypes"),
  ExtraEffectBaseTypes_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectBaseTypes"),
  ExtraEffectDamageFilter_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectDamageFilter"),
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
  PROFILE_TICKTRACE = "BulletOnTickTrace";
class BulletCollisionSystem extends BulletSystemBase_1.BulletSystemBase {
  constructor() {
    super(...arguments),
      (this.BHo = Transform_1.Transform.Create()),
      (this.bHo = Vector_1.Vector.Create()),
      (this.qHo = Vector_1.Vector.Create()),
      (this._9o = void 0),
      (this.GHo = void 0),
      (this.NHo = void 0),
      (this.OHo = void 0),
      (this.mie = 0),
      (this.kHo = Vector_1.Vector.Create()),
      (this.FHo = Vector_1.Vector.Create());
  }
  get VHo() {
    return this._9o.ActionLogicComponent;
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
        this.HHo(t, i),
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
    (this._9o = void 0),
      (this.GHo = void 0),
      (this.NHo = void 0),
      (this.OHo = void 0);
  }
  HHo(t, e) {
    (this._9o = e),
      (this.GHo = e.CollisionInfo),
      (this.NHo = e.BulletDataMain.Base.Shape),
      4 === this.NHo && ((this.OHo = e.RayInfo), this.jHo(t)),
      this.WHo(),
      this.KHo(),
      this.QHo(),
      this.XHo(t),
      ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
        this._9o.Attacker.Id,
      ) && BulletCollisionUtil_1.BulletCollisionUtil.ShowBulletDeBugDraw(e);
  }
  jHo(t) {
    var e = this._9o;
    if (!e.NeedDestroy && e.CollisionInfo.IsStartup) {
      this.GHo.UpdateTraceSphere ||
        (this.GHo.UpdateTraceSphere =
          BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(
            ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
              this._9o.BulletDataMain.Logic.ProfileName.toString(),
              this._9o.BulletRowName,
            ),
            e.AttackerId,
            this.GHo.IgnoreQueries,
          ));
      var i = this.GHo.UpdateTraceSphere,
        t =
          ((this.OHo.IsBlock = !1),
          this.OHo.StartPoint.FromUeVector(
            this._9o.ActorComponent.ActorLocationProxy,
          ),
          this.OHo.EndPoint.FromUeVector(
            this._9o.ActorComponent.ActorForwardProxy,
          ),
          (this.OHo.Length += this.OHo.Speed * t),
          (this.OHo.Length = Math.min(this.OHo.Length, this._9o.Size.Y)),
          this.OHo.EndPoint.MultiplyEqual(this.OHo.Length),
          this.OHo.EndPoint.AdditionEqual(this.OHo.StartPoint),
          i.SetStartLocation(
            this.OHo.StartPoint.X,
            this.OHo.StartPoint.Y,
            this.OHo.StartPoint.Z,
          ),
          i.SetEndLocation(
            this.OHo.EndPoint.X,
            this.OHo.EndPoint.Y,
            this.OHo.EndPoint.Z,
          ),
          (i.Radius = e.Size.Z),
          this.GHo.ClearHitActorData(),
          (this.GHo.HasSearchedHitActorsCurFrame = !0),
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
            if ((this.$Ho(a, n), 0 < this.GHo.ArrayHitActorData.length))
              return (
                (this.OHo.IsBlock = !0),
                (this.OHo.Length = h.Distance),
                this.OHo.EndPoint.FromUeVector(
                  this._9o.ActorComponent.ActorForwardProxy,
                ),
                this.OHo.EndPoint.MultiplyEqual(this.OHo.Length),
                void this.OHo.EndPoint.AdditionEqual(this.OHo.StartPoint)
              );
          }
        }
      }
    }
  }
  WHo() {
    var t = this._9o.LiveTime - this.GHo.ActiveDelayMs;
    if (
      (!this.GHo.IsPassDelay &&
        0 < this.GHo.ActiveDelayMs &&
        0 <= t &&
        ((this.GHo.IsPassDelay = !0),
        (this.GHo.IsStartup = !0),
        (this.GHo.IsProcessOpen = !0),
        BulletConstant_1.BulletConstant.OpenCollisionLog) &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          21,
          "Bullet.UpdateInterval.Delay",
          ["IdName", this._9o.BulletRowName],
          ["Actor", this._9o.Actor?.GetName()],
          ["ActiveTime", t],
        ),
      this.GHo.IsPassDelay && 0 < this.GHo.IntervalMs)
    ) {
      var e = this.GHo.IntervalMs * this.GHo.StageInterval,
        i = this.GHo.ObjectsHitCurrent;
      if (this._9o.BulletDataMain.Base.IntervalAfterHit) {
        var l,
          o,
          s = new Array();
        for ([l, o] of i)
          Time_1.Time.Now - o >= this.GHo.IntervalMs && s.push(l);
        for (let t = 0, e = s.length; t < e; t++) i.delete(s[t]);
      } else
        e <= t &&
          (this.GHo.StageInterval++,
          (this.GHo.AllowedEnergy = !0),
          (this.GHo.IsProcessOpen = !0),
          i.clear(),
          BulletConstant_1.BulletConstant.OpenCollisionLog) &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            21,
            "Bullet.UpdateInterval",
            ["IdName", this._9o.BulletRowName],
            ["Actor", this._9o.Actor?.GetName()],
            ["TotalIntervalMs", e],
            ["ActiveTime", t],
          );
    }
  }
  KHo() {
    var t, e, i, l;
    this._9o.IsTensile &&
      (e = this._9o.AttackerActorComp)?.Actor &&
      ((t = this._9o.ActorComponent),
      (i = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
        e.Actor.Mesh.GetRelativeTransform().GetLocation(),
      ),
      i.AdditionEqual(e.ActorLocationProxy),
      (l = this.BHo).SetRotation(e.ActorQuatProxy),
      l.SetScale3D(e.ActorScaleProxy),
      l.SetLocation(i),
      BulletPool_1.BulletPool.RecycleVector(i),
      (e = BulletPool_1.BulletPool.CreateVector()),
      l.TransformPosition(this._9o.BornLocationOffset, e),
      (i = UE.KismetMathLibrary.FindLookAtRotation(
        t.ActorLocation,
        e.ToUeVector(),
      )),
      (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
        this._9o.InitPosition,
      ),
      l.AdditionEqual(e),
      l.DivisionEqual(2),
      e.SubtractionEqual(this._9o.InitPosition),
      this.bHo.FromUeVector(this._9o.Size),
      (this.bHo.X += e.Size() / 2),
      this.GHo.CollisionComponent instanceof UE.BoxComponent &&
        this.GHo.CollisionComponent.SetBoxExtent(this.bHo.ToUeVector(), !1),
      t.SetActorLocationAndRotation(l.ToUeVector(), i),
      BulletPool_1.BulletPool.RecycleVector(l),
      BulletPool_1.BulletPool.RecycleVector(e));
  }
  QHo() {
    var t, e;
    this.GHo.FinalScale.Equals(Vector_1.Vector.OneVectorProxy) ||
      (this.GHo.CollisionComponent
        ? ((t = this._9o.BulletDataMain).Scale.ScaleCurve
            ? (this.qHo.FromUeVector(
                BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
                  this._9o.LiveTime,
                  t.Base.Duration * TimeUtil_1.TimeUtil.InverseMillisecond,
                  t.Scale.ScaleCurve,
                ),
              ),
              this.qHo.MultiplyEqual(this.GHo.FinalScale))
            : Vector_1.Vector.Lerp(
                Vector_1.Vector.OneVectorProxy,
                this.GHo.FinalScale,
                this._9o.LiveTime /
                  (TimeUtil_1.TimeUtil.InverseMillisecond * t.Base.Duration),
                this.qHo,
              ),
          t.Base.Size.Multiply(this.qHo, this._9o.Size),
          3 === t.Base.Shape &&
            t.Scale.ShapeSwitch &&
            ((e = t.Base.Size.X - t.Base.Size.Y),
            (this._9o.Size.Y = this._9o.Size.X - e)),
          BulletCollisionUtil_1.BulletCollisionUtil.UpdateCollisionExtend(
            t.Base.Shape,
            this.GHo.CollisionComponent,
            this._9o.Size,
            this.GHo.CenterLocalLocation,
            t.Base.Rotator,
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            18,
            "更新子弹缩放时，子弹没有碰撞组件",
            ["BulletEntityId", this._9o.BulletEntityId],
            ["BulletRowName", this._9o.BulletRowName],
          ));
  }
  XHo(t) {
    this._9o.FrozenTime &&
      (BulletUtil_1.BulletUtil.BulletFrozen(this._9o),
      (this._9o.FrozenTime -= t),
      this._9o.FrozenTime <= 0) &&
      (BulletUtil_1.BulletUtil.BulletUnfrozen(this._9o),
      (this._9o.FrozenTime = void 0));
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
          this.YHo(t, i),
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
    (this._9o = void 0),
      (this.GHo = void 0),
      (this.NHo = void 0),
      (this.OHo = void 0);
  }
  YHo(t, e) {
    if (
      ((this._9o = e),
      (this.GHo = e.CollisionInfo),
      (this.NHo = e.BulletDataMain.Base.Shape),
      this.JHo())
    ) {
      if (7 === this.NHo) this.zHo();
      else {
        var i = this.ZHo();
        if (
          (e.HasCheckedPosition ||
            (i && e.BulletDataMain.Logic.DestroyOnHitObstacle && this.ejo(),
            e.CheckedPosition()),
          this.tjo(),
          !this.GHo.HasSearchedHitActorsCurFrame)
        ) {
          var i = (0, puerts_1.$ref)(void 0),
            l =
              (this.GHo.CollisionComponent?.GetOverlappingComponents(i),
              (0, puerts_1.$unref)(i));
          if (l) {
            var o = l.Num();
            for (let t = 0; t < o; t++) {
              var s = l.Get(t),
                r = s.GetOwner();
              this.$Ho(r, s);
            }
          }
        }
      }
      this.GHo.IsInProcessHit = !0;
      var a,
        e = this._9o.CollisionLocation,
        n = this.GHo.ArrayHitActorData,
        h = n.length;
      if (1 < h) {
        for (let t = 0; t < h; t++) {
          var _ = n[t],
            u = BulletCollisionInfo_1.bulletHitPriorityList[_.Type];
          _.Priority = void 0 !== u ? u - t : 0;
        }
        this.GHo.ArrayHitActorData.sort((t, e) => e.Priority - t.Priority);
      }
      if (this.GHo.IsProcessOpen) {
        let t = 1;
        for (const c of this.GHo.ArrayHitActorData)
          this.ijo(c)
            ? ((c.IsValidHit = !0),
              (c.ValidProcessIndex = t++),
              this.GHo.LastMapHitActorData.get(c.Actor)?.IsValidHit &&
                (c.IsContinueHit = !0),
              this.ojo(c))
            : ((c.IsValidHit = !1), (c.IsContinueHit = !1));
        !this._9o.BulletDataMain.Base.IntervalAfterHit &&
          0 < this.GHo.IntervalMs &&
          (this.GHo.IsProcessOpen = !1);
      }
      for (const B of this.GHo.LastArrayHitActorData)
        B.IsValidHit &&
          (!(a = B.Actor) ||
            ((a = this.GHo.MapHitActorData.get(a)) && a.IsValidHit) ||
            BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this._9o, B));
      this.GHo.LastFramePosition.FromUeVector(e),
        (this.GHo.IsInProcessHit = !1),
        this.GHo.UpdateLastHitActorData();
    } else {
      if (0 < this.GHo.LastArrayHitActorData.length) {
        this.GHo.IsInProcessHit = !0;
        for (const m of this.GHo.LastArrayHitActorData)
          m.IsValidHit &&
            BulletCollisionUtil_1.BulletCollisionUtil.EntityLeave(this._9o, m);
        (this.GHo.IsInProcessHit = !1), this.GHo.ClearLastHitActorData();
      }
      0 < this.GHo.ArrayHitActor.length && this.GHo.ClearHitActorData();
    }
  }
  JHo() {
    var t = this._9o;
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
  rjo(t) {
    var e = t.BulletDataMain.Move,
      i = t.ActorComponent.NeedDetach,
      e = e.Speed;
    return !(!i && (0 === e || e * this.mie < t.Size.X));
  }
  ZHo() {
    if (4 === this.NHo || this.GHo.RegionComponent) return !1;
    var t = this._9o,
      e = this.GHo.NeedHitObstacles,
      i = t.BulletDataMain.Base.IsOversizeForTrace;
    let l = !0,
      o = !0;
    (l = this.GHo.HasObstaclesCollision
      ? ((o = e), this.rjo(t))
      : ((o = !1), e ? !i : this.rjo(t))),
      this.GHo.ClearHitActorData();
    var s = t.CollisionLocation;
    if (
      (this.GHo.LastFramePosition.Equals(s) &&
        s.AdditionEqual(t.ActorComponent.ActorForwardProxy),
      o && this.njo(t, s),
      !l)
    )
      return !1;
    let r = !(this.GHo.HasSearchedHitActorsCurFrame = !0),
      a = void 0,
      n = void 0;
    switch (t.BulletDataMain.Base.Shape) {
      case 0:
        this.GHo.UpdateTraceBox ||
          (this.GHo.UpdateTraceBox =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.GHo.IgnoreQueries,
            )),
          (n = this.GHo.UpdateTraceBox),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.GHo.LastFramePosition,
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
        this.GHo.UpdateTraceSphere ||
          (this.GHo.UpdateTraceSphere =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.GHo.IgnoreQueries,
            )),
          ((n = this.GHo.UpdateTraceSphere).Radius = t.Size.X),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.GHo.LastFramePosition,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s),
          (r = TraceElementCommon_1.TraceElementCommon.SphereTrace(
            n,
            PROFILE_UPDATETRACE_SPHERE,
          )) && (a = n.HitResult);
        break;
      case 3:
        this.GHo.UpdateTraceBox ||
          (this.GHo.UpdateTraceBox =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.GHo.IgnoreQueries,
            )),
          (n = this.GHo.UpdateTraceBox),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.GHo.LastFramePosition,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s);
        var h = BulletPool_1.BulletPool.CreateVector();
        h.Set(this._9o.Size.X, this._9o.Size.X, this._9o.Size.Z),
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
        this.GHo.UpdateTraceBox ||
          (this.GHo.UpdateTraceBox =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceBoxElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.GHo.IgnoreQueries,
            )),
          (n = this.GHo.UpdateTraceBox),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.GHo.LastFramePosition,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, s),
          TraceElementCommon_1.TraceElementCommon.SetBoxHalfSize(
            n,
            BulletCollisionUtil_1.BulletCollisionUtil.GetSectorExtent(
              this._9o.Size,
              this.GHo.CenterLocalLocation,
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
        this.GHo.UpdateTraceLine ||
          (this.GHo.UpdateTraceLine =
            BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(
              ModelManager_1.ModelManager.BulletModel.GetFastMoveTrace(
                t.BulletDataMain.Logic.ProfileName.toString(),
                t.BulletRowName,
              ),
              t.AttackerId,
              this.GHo.IgnoreQueries,
            )),
          (n = this.GHo.UpdateTraceLine),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            n,
            this.GHo.LastFramePosition,
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
          this.$Ho(a.Actors.Get(0), a.Components.Get(0), void 0, a, 0);
        else {
          var u = new Array(),
            c = a.Components,
            B = a.Actors,
            m = a.LocationX_Array,
            v = a.LocationY_Array,
            C = a.LocationZ_Array;
          for (let t = 0; t < _; t++) {
            var f = BulletPool_1.BulletPool.CreateBulletHitTempResult();
            (f.Index = t),
              (f.ImpactPoint.X = m.Get(t)),
              (f.ImpactPoint.Y = v.Get(t)),
              (f.ImpactPoint.Z = C.Get(t)),
              (f.DistSquared = Vector_1.Vector.DistSquared(
                f.ImpactPoint,
                this.GHo.LastFramePosition,
              )),
              (f.Component = c.Get(t)),
              (f.Actor = B.Get(t)),
              u.push(f);
          }
          0 < u.length && u.sort((t, e) => t.DistSquared - e.DistSquared);
          for (const E of u)
            this.$Ho(E.Actor, E.Component, E, a),
              BulletPool_1.BulletPool.RecycleBulletHitTempResult(E);
        }
    }
    return !0;
  }
  ejo() {
    var e = this._9o;
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
            this.GHo.IgnoreQueries,
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
            (n && a === n) || this.$Ho(a, s.Get(t));
          }
        }
        BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceLineElement(
          l,
        );
      }
    }
  }
  zHo() {
    this.GHo.HasSearchedHitActorsCurFrame = !0;
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t) {
      var e = this._9o.Size.X,
        i = this._9o.ActorComponent.ActorLocationProxy;
      for (const l of t) this.ajo(l, i, e);
    }
  }
  ajo(t, e, i) {
    var l, o;
    t?.IsInit &&
      (o = t.Entity) &&
      (l = o.GetComponent(0)) &&
      ((l = l.GetEntityType()) === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
        l === Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
        l === Protocol_1.Aki.Protocol.HBs.Proto_Vision) &&
      (o = (l = o.GetComponent(3))?.ActorLocationProxy) &&
      Math.abs(o.X - e.X) <= i &&
      Math.abs(o.Y - e.Y) <= i &&
      Math.abs(o.Z - e.Z) <= i &&
      this.hjo(t, l);
  }
  tjo() {
    var t = this.GHo.RegionDetectComponent;
    if (t) {
      this.GHo.HasSearchedHitActorsCurFrame = !0;
      var e = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
      if (e) for (const i of e) this.ljo(i, t);
    }
  }
  ljo(t, e) {
    var i, l;
    t?.IsInit &&
      (i = t.Entity) &&
      (l = i.GetComponent(0)) &&
      ((l = l.GetEntityType()) === Protocol_1.Aki.Protocol.HBs.Proto_Player ||
        l === Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
        l === Protocol_1.Aki.Protocol.HBs.Proto_Vision) &&
      (l = i.GetComponent(3)) &&
      e.Detect(l.ActorLocation, BulletConstant_1.BulletConstant.RegionKey) &&
      this.hjo(t, l);
  }
  njo(t, e) {
    var i = t.MoveInfo;
    if (t.CollisionInfo.HasObstaclesCollision) {
      this.GHo.ObstaclesTraceElement ||
        (this.GHo.ObstaclesTraceElement =
          BulletTraceElementPool_1.BulletTraceElementPool.GetTraceSphereElement(
            ModelManager_1.ModelManager.BulletModel.ObjectTypeObstacles,
            t.AttackerId,
            this.GHo.IgnoreQueries,
          ));
      var l,
        o,
        s = this.GHo.ObstaclesTraceElement,
        t = t.BulletDataMain.Obstacle;
      if (
        ((s.Radius = t.Radius),
        i.ObstaclesOffset.IsZero()
          ? (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              s,
              this.GHo.LastFramePosition,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, e))
          : ((t = BulletPool_1.BulletPool.CreateVector()),
            (l = BulletPool_1.BulletPool.CreateVector()),
            (o = UE.KismetMathLibrary.FindLookAtRotation(
              this.GHo.LastFramePosition.ToUeVector(),
              e.ToUeVector(),
            )),
            BulletCollisionSystem._jo.SetRotation(o.Quaternion()),
            BulletCollisionSystem._jo.SetLocation(this.GHo.LastFramePosition),
            BulletCollisionSystem._jo.TransformPosition(i.ObstaclesOffset, t),
            BulletCollisionSystem._jo.SetLocation(e),
            BulletCollisionSystem._jo.TransformPosition(i.ObstaclesOffset, l),
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
        for (let t = 0; t < h; t++) this.ujo(n.Get(t), a.Get(t), r, t);
      }
    }
  }
  cjo(t) {
    let e = this.GHo.MapBulletConditionResult.get(t);
    return (
      e ||
        ((e = BulletPool_1.BulletPool.CreateBulletConditionResult()),
        this.GHo.MapBulletConditionResult.set(t, e)),
      !e.KeepDisable &&
        !(
          (e.HasConstResult && !e.ConstResult) ||
          ((e.ConstResult = this.mjo(t)),
          (e.HasConstResult = !0),
          !e.ConstResult)
        )
    );
  }
  djo(t) {
    var e = t.ConditionResult;
    return e
      ? (0 !== t.Type && !!this.Cjo(t)) || !(e.KeepDisable = !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            18,
            "生成HitActorData前没有经过PreCheckCondition",
          ),
        !1);
  }
  Cjo(t) {
    return !(
      4 === this._9o.BulletDataMain.Base.Shape &&
      1 === t.Type &&
      !this.OHo.BlockByCharacter
    );
  }
  ijo(t) {
    if (t.Actor?.IsValid()) {
      var e = t.ConditionResult;
      if (e)
        return (
          !e.KeepDisable && (this.gjo(t) ? this.fjo(t) : !(e.KeepDisable = !0))
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Bullet",
          18,
          "生成HitActorData前没有经过PreCheckCondition",
        );
      for (const i of this.GHo.MapBulletConditionResult.keys()) {
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
  mjo(t) {
    var e;
    return !(
      !t ||
      ((e = this._9o.BulletDataMain), t === this._9o.Actor) ||
      (!(
        e.Base.HitConditionTagId ||
        this._9o.BulletCamp & BulletActionInitHit_1.SELF_NUMBER
      ) &&
        t === this._9o.AttackerActorComp.Actor)
    );
  }
  gjo(t) {
    return (
      0 !== t.Type &&
      !!t.Actor?.IsValid() &&
      !(
        (t.EntityHandle && !t.EntityHandle.Valid) ||
        (1 === t.Type &&
          ExtraEffectDamageFilter_1.DamageFilter.ApplyEffects(
            this._9o.Attacker,
            t.Entity,
            this._9o.BulletInitParams.BulletRowName,
            this._9o.Tags,
            this._9o.BulletInitParams.SkillId,
            this._9o.BulletDataMain.Base.DamageId,
          ))
      )
    );
  }
  fjo(t) {
    return !!this.pjo(t) && !!this.vjo(t) && !!this.Mjo(t);
  }
  pjo(t) {
    var e = this._9o.BulletDataMain,
      i = e.Base.HitConditionTagId;
    return i
      ? BulletUtil_1.BulletUtil.DoesEntityContainsTag(t.Entity, i)
      : !(i = e.Base.BanHitTagId) ||
          !BulletUtil_1.BulletUtil.DoesEntityContainsTag(t.Entity, i);
  }
  vjo(t) {
    if (this._9o.CloseCollision) return !0;
    switch (this._9o.BulletDataMain.Base.Shape) {
      case 3:
        var e = this._9o.CenterLocation;
        for (const o of t.Components)
          if (
            SpaceUtils_1.SpaceUtils.IsComponentInRingArea(e, this._9o.Size, o)
          )
            return !0;
        return !1;
      case 2:
        var i = this._9o.CenterLocation,
          l = BulletPool_1.BulletPool.CreateRotator();
        l.FromUeRotator(this._9o.CollisionInfo.CollisionTransform.Rotator());
        for (const s of t.Components)
          if (
            SpaceUtils_1.SpaceUtils.IsComponentInSectorArea(
              i,
              this._9o.Size,
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
  Mjo(t) {
    return (
      1 !== t.Type ||
      ((t = t.Entity.GetComponent(3)),
      BulletUtil_1.BulletUtil.AttackedCondition(this._9o, t))
    );
  }
  $Ho(i, l, o, s, r) {
    if (
      (BulletConstant_1.BulletConstant.OpenHitActorLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          18,
          "触发碰撞",
          ["BulletRowName", this._9o.BulletRowName],
          ["Actor", i.GetName()],
          ["Component", l.GetName()],
          ["Bone", s?.BoneNameArray?.Num() ?? 0],
        ),
      this.cjo(i))
    ) {
      let t = this.GHo.MapHitActorData.get(i),
        e = !1;
      if (t) {
        if (t.HasComponent(l)) return;
      } else if (((e = !0), !(t = this.Sjo(i, l)))) return;
      this.Ejo(t, l)
        ? (t.AddComponent(l),
          s &&
            4 === t.Type &&
            (o
              ? t.AddHitTempResult(o, s.BoneNameArray.Get(r))
              : t.AddHitResult(s, r)),
          e &&
            ((l = this.GHo.MapBulletConditionResult.get(i)),
            (t.ConditionResult = l),
            this.djo(t)
              ? (this.GHo.AddHitActorData(i, t),
                BulletConstant_1.BulletConstant.OpenHitActorLog &&
                  Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Bullet",
                    18,
                    "碰撞通过预检测",
                    ["BulletRowName", this._9o.BulletRowName],
                    ["actor", i.GetName()],
                    ["type", t.Type],
                  ))
              : BulletPool_1.BulletPool.RecycleBulletHitActorData(t)))
        : e && BulletPool_1.BulletPool.RecycleBulletHitActorData(t);
    }
  }
  ujo(e, t, i, l) {
    if (
      this.GHo.HasObstaclesCollision &&
      !this._9o.NeedDestroy &&
      2 !== this._9o.BulletDataMain.Move.FollowType
    ) {
      var o =
        ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
      if (
        !(o?.Entity?.GetComponent(138) ?? o?.Entity?.GetComponent(146)) &&
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
        o = this.GHo.MapHitActorData.get(e);
        if (!o) {
          o = this.yjo(e);
          let t = this.GHo.MapBulletConditionResult.get(e);
          t ||
            ((t = BulletPool_1.BulletPool.CreateBulletConditionResult()),
            this.GHo.MapBulletConditionResult.set(e, t),
            (t.HasConstResult = !0),
            (t.ConstResult = !0)),
            (o.ConditionResult = t),
            o.AddHitResult(i, l),
            this.GHo.AddHitActorData(e, o);
        }
        BulletConstant_1.BulletConstant.OpenHitActorLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            21,
            "触发碰撞 障碍物检测",
            ["Bullet", this._9o?.BulletRowName],
            ["Actor", e.GetName()],
          );
      }
    }
  }
  hjo(t, e) {
    var i,
      l = e.Owner;
    BulletConstant_1.BulletConstant.OpenHitActorLog &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Bullet",
        18,
        "触发碰撞（大范围子弹）",
        ["BulletRowName", this._9o.BulletRowName],
        ["Actor", l.GetName()],
        ["entityId", t.Id],
      ),
      !this.cjo(l) ||
        (i = this.GHo.MapHitActorData.get(l)) ||
        (((i = BulletPool_1.BulletPool.CreateBulletHitActorData()).Actor = l),
        (i.EntityHandle = t),
        (i.Type = 1),
        i.AddComponent(e.Actor.Mesh),
        (t = this.GHo.MapBulletConditionResult.get(l)),
        (i.ConditionResult = t),
        this.djo(i)
          ? (this.GHo.AddHitActorData(l, i),
            BulletConstant_1.BulletConstant.OpenHitActorLog &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Bullet",
                18,
                "碰撞通过预检测",
                ["BulletRowName", this._9o.BulletRowName],
                ["actor", l.GetName()],
                ["type", i.Type],
              ))
          : BulletPool_1.BulletPool.RecycleBulletHitActorData(i));
  }
  Ejo(t, e) {
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
  Sjo(e, t) {
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
          if (s === Protocol_1.Aki.Protocol.HBs.Proto_SceneItem)
            return (i.Type = 3), i;
          if (s === Protocol_1.Aki.Protocol.HBs.Proto_Npc)
            return (i.Type = 5), i;
          if (
            s === Protocol_1.Aki.Protocol.HBs.Proto_Animal &&
            2 === o.GetEntityCamp()
          )
            return (i.Type = 6), i;
          if (l.GetComponent(3)) return (i.Type = 1), i;
        } else {
          s = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t);
          if (s && s instanceof BulletEntity_1.BulletEntity)
            return (i.Type = 2), (i.BulletEntityId = t), i;
        }
        return (i.Type = 0), i;
      }
    }
    o = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(e);
    return o?.Valid
      ? ((i.EntityHandle = o), (i.Type = 3), i)
      : this.GHo.HasObstaclesCollision
        ? void 0
        : (this._9o.BulletDataMain.Logic.IgnoreWater &&
          BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(
            t.GetCollisionProfileName(),
          )
            ? (i.Type = 0)
            : (i.Type = 4),
          i);
  }
  yjo(t) {
    var e = BulletPool_1.BulletPool.CreateBulletHitActorData();
    return (e.Actor = t), (e.Type = 4), (e.FromObstaclesCollision = !0), e;
  }
  ojo(t) {
    var e = this._9o;
    if (!e.NeedDestroy) {
      this.Tjo(t);
      try {
        switch (t.Type) {
          case 1:
            this.Ljo(t);
            break;
          case 2:
            this.Djo(t);
            break;
          case 3:
            this.Rjo(t);
            break;
          case 4:
            this.Ujo(t);
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
        BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountTotal(this._9o) &&
          (BulletStaticFunction_1.BulletStaticFunction.SpawnHitEffect(
            this._9o,
            8,
            "[BulletCollisionSystem.ProcessHit]",
          ),
          this._9o.ChildInfo?.SetIsNumberNotEnough(!0),
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
              ["BulletEntityId", this._9o.BulletEntityId],
              ["BulletRowName", this._9o.BulletRowName],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              18,
              "Bullet ProcessHit Error",
              ["BulletEntityId", this._9o.BulletEntityId],
              ["BulletRowName", this._9o.BulletRowName],
              ["error", t],
            );
      }
    }
  }
  Tjo(t) {
    Stats_1.Stat.Enable &&
      t.Entity &&
      (t.Entity.Id, t.Entity.GetComponent(0)?.GetPbDataId());
  }
  Ljo(t) {
    var e;
    t.EntityHandle?.Valid &&
      ((e = t.Entity.GetComponent(58))?.Valid && e.IsMultiPart
        ? this.Ajo(t)
        : this.Pjo(t));
  }
  Ajo(s) {
    var t = s.Entity.GetComponent(3),
      r = (this.xjo(s.Entity), this._9o);
    if (
      this.wjo(s) &&
      BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(
        r,
        s.Entity,
      )
    ) {
      var a = t.Entity,
        n = t.ActorForwardProxy,
        h = a.GetComponent(58),
        _ = [],
        u = [],
        c = [],
        B = [];
      let i = !1;
      var m = new Map(),
        t = BulletPool_1.BulletPool.CreateRotator();
      t.FromUeRotator(
        UE.KismetMathLibrary.TransformRotation(
          r.AttackerActorComp.ActorTransform,
          r.BulletDataMain.Base.AttackDirection.ToUeRotator(),
        ),
      );
      let l = 0;
      var v = s.Components;
      let o = void 0;
      for (let t = 0, e = s.Components.length; t < e; t++) {
        var C = v[t];
        const P = C.GetName();
        if (P !== BulletConstant_1.BulletConstant.MoveCylinder) {
          var f = h.GetPart(P);
          if (!(_.includes(f) || u.includes(f) || c.includes(f))) {
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
                  m.set(P, E),
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
                      m.set(P, E)))
                  : (c.push(f),
                    f.IsWeakness &&
                      ((f = BulletPool_1.BulletPool.CreateVector()),
                      BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
                        C,
                        r,
                        f,
                      ),
                      m.set(P, f)),
                    (i = !0));
            else B.push(P), (i = !0);
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
        for (const p of u) {
          if (
            !BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(
              r,
              a,
            )
          )
            break;
          p.IsWeakness &&
            ((p.IsWeaknessHit = this.CheckWeakness(
              p,
              r,
              m.get(p.HitBoneName),
              n,
            )),
            p.IsWeaknessHit) &&
            (e = !0),
            BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(r, a);
        }
        if (0 < c.length) {
          let t = void 0;
          for (const T of c)
            if (
              T.IsWeakness &&
              ((T.IsWeaknessHit = this.CheckWeakness(
                T,
                r,
                m.get(T.HitBoneName),
                n,
              )),
              T.IsWeaknessHit)
            ) {
              t = T;
              break;
            }
          t && ((c.length = 0), (e = !0), c.push(t));
        }
      }
      BulletHitCountUtil_1.BulletHitCountUtil.CheckHitCountPerVictim(r, a)
        ? i && BulletHitCountUtil_1.BulletHitCountUtil.AddHitCount(r, a)
        : (i = !1);
      var d = v[l];
      const P = d.GetName(),
        g = BulletPool_1.BulletPool.CreateVector();
      m.has(P)
        ? g.FromUeVector(m.get(P))
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
      d = this._9o.BulletDataMain;
      this.GHo.StopHit || this.Bjo(s, d, g, i, P, _, u, c, B, e),
        BulletUtil_1.BulletUtil.SummonBullet(
          this._9o,
          1,
          s.Entity,
          !1,
          g,
          r.CollisionInfo.LastFramePosition,
        ),
        d.Logic.DestroyOnHitCharacter &&
          this._9o.AttackerActorComp.IsAutonomousProxy &&
          BulletController_1.BulletController.DestroyBullet(
            this._9o.BulletEntityId,
            !1,
          ),
        (this.GHo.StopHit = !1);
      for (const [, g] of m) BulletPool_1.BulletPool.RecycleVector(g);
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
        ? (o.GetComponent(1).ActorLocationProxy.Subtraction(i, this.kHo),
          this.kHo.Normalize(MathCommon_1.MathCommon.KindaSmallNumber))
        : 0 === s
          ? (this.kHo.FromUeVector(e.AttackerActorComp.ActorLocationProxy),
            this.kHo.SubtractionEqual(i),
            this.kHo.Normalize(MathCommon_1.MathCommon.KindaSmallNumber))
          : this.kHo.FromUeVector(Vector_1.Vector.ForwardVectorProxy),
      this.FHo.FromUeVector(l),
      0 <= t && this.FHo.MultiplyEqual(-1),
      Vector_1.Vector.DotProduct(this.kHo, this.FHo) >= Math.cos(t))
    );
  }
  xjo(e) {
    if (e.GetComponent(17)) {
      this.GHo.CharacterEntityMap.has(e) ||
        this.GHo.CharacterEntityMap.set(e, -1);
      var i = this._9o.BulletDataMain;
      if (
        i.Base.ContinuesCollision &&
        ((this.GHo.HaveCharacterInBullet = !0),
        BulletUtil_1.BulletUtil.SummonBullet(this._9o, 1, e, !0),
        i.Execution.GeIdApplyToVictim)
      ) {
        var l,
          o = this._9o.Attacker.CheckGetComponent(157),
          s = e.CheckGetComponent(157),
          r = e.CheckGetComponent(185);
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
                Level: this._9o.SkillLevel,
                PreMessageId: this._9o.ContextId,
                Reason: `子弹${i.BulletRowName}命中`,
              });
        r.HasTag(-648310348) ||
          ((r = i.TimeScale.TimeScaleOnHit),
          i.TimeScale.AreaTimeScale
            ? 0 < this.GHo.CharacterEntityMap.get(e) ||
              ((l = e.GetComponent(107))
                ? ((l = l.SetTimeScale(
                    r.优先级,
                    r.时间膨胀值,
                    r.时间膨胀变化曲线,
                    i.Base.Duration,
                    2,
                  )),
                  this.GHo.CharacterEntityMap.set(e, l))
                : this.GHo.CharacterEntityMap.set(e, 0))
            : this.GHo.CharacterEntityMap.set(e, 0));
      }
    }
  }
  Pjo(e) {
    var i = e.Entity.GetComponent(3),
      l = this._9o;
    if (
      (this.xjo(e.Entity),
      this.wjo(e) &&
        BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(l, e.Entity))
    )
      if (this.bjo(e.Entity))
        UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
          i.Actor,
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(-63529668),
          void 0,
        );
      else {
        var o = l.BulletDataMain,
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
              l,
            );
            (void 0 === i || n < e) && ((e = n), (i = t));
          }
          var h = r[i];
          (t = h.GetName()),
            BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointCharacter(
              h,
              l,
              s,
            );
        } else
          s.FromUeVector(
            i.GetSocketLocation(BulletConstant_1.BulletConstant.HitCase),
          );
        this.GHo.StopHit || this.Bjo(e, o, s, !0, t),
          BulletUtil_1.BulletUtil.SummonBullet(
            this._9o,
            1,
            e.Entity,
            !1,
            s,
            l.CollisionInfo.LastFramePosition,
          ),
          o.Logic.DestroyOnHitCharacter &&
            this._9o.AttackerActorComp.IsAutonomousProxy &&
            BulletController_1.BulletController.DestroyBullet(
              this._9o.BulletEntityId,
              !1,
            ),
          (this.GHo.StopHit = !1),
          BulletPool_1.BulletPool.RecycleVector(s);
      }
  }
  bjo(t) {
    return (
      !!this._9o.BulletDataMain.Logic.CanDodge &&
      !!BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -549410347) &&
      !BulletUtil_1.BulletUtil.DoesEntityContainsTag(t, -1221493771)
    );
  }
  Bjo(t, e, i, l, o, s, r, a, n, h = !1) {
    var _ = this._9o,
      u = _.AttackerActorComp,
      c = t.Entity.GetComponent(3),
      B = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
        _.Attacker,
        e.Base.BeHitEffect,
      ),
      m = void 0 !== B,
      v = e.Base.DamageId,
      v = 0 < v ? DamageById_1.configDamageById.GetConfig(v).CalculateType : -1,
      B = new BulletTypes_1.HitInformation(
        _.Attacker,
        t.Entity,
        B,
        _.BulletRowName,
        UE.KismetMathLibrary.TransformRotation(
          u.Actor.Mesh.K2_GetComponentToWorld(),
          e.Base.AttackDirection.ToUeRotator(),
        ),
        BulletUtil_1.BulletUtil.ShakeTest(_, t.Entity.GetComponent(1)),
        FNameUtil_1.FNameUtil.GetDynamicFName(o) ?? FNameUtil_1.FNameUtil.NONE,
        i.ToUeVector(),
        _.SkillLevel,
        e,
        this._9o.BulletRowName,
        e.Logic.Data,
        _.BulletEntityId,
        v,
      );
    if (
      (GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(
        this._9o.BulletEntityId,
        t.Entity.Id,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        _.Entity,
        EventDefine_1.EEventName.BulletHit,
        B,
        void 0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BulletHit,
        B,
        void 0,
      ),
      this.VHo.ActionHit(t),
      this.qjo(c))
    ) {
      var o = c.Entity.Id,
        i =
          (this.GHo.ObjectsHitCurrent.set(o, Time_1.Time.Now),
          this.Gjo(e.Base.IntervalAfterHit, _, o),
          BulletCollisionUtil_1.BulletCollisionUtil.PlayHitEffect(
            _,
            c,
            B.HitPart.toString(),
            h,
            B.HitPosition,
            B.HitEffectRotation,
          ),
          c.Entity.GetComponent(51).OnHit(
            B,
            m,
            _.Entity,
            this.GHo.AllowedEnergy,
            l,
            s,
            r,
            a,
            n,
          ),
          e.Execution.SendGameplayEventTagToAttacker),
        o =
          (i.TagName !== StringUtils_1.NONE_STRING &&
            (((v = new UE.GameplayEventData()).Target = c.Actor),
            (v.Instigator = _.Actor),
            UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
              _.AttackerActorComp.Actor,
              i,
              v,
            )),
          e.Execution.SendGameplayEventTagToVictim),
        C =
          (o.TagName !== StringUtils_1.NONE_STRING &&
            t.Entity.GetComponent(17).SendGameplayEventToActor(o),
          u.Entity.CheckGetComponent(157)),
        h = B.ReBulletData.Execution;
      for (const d of h.SendGeIdToAttacker)
        C.AddBuff(d, {
          InstigatorId: C.CreatureDataId,
          Level: _.SkillLevel,
          PreMessageId: _.ContextId,
          Reason: `子弹${_.BulletRowName}命中后对攻击者应用GE添加`,
        });
      var f = c.Entity.GetComponent(157);
      if (f?.Valid) {
        for (const P of h.SendGeIdToVictim)
          f.AddBuff(P, {
            InstigatorId: C.CreatureDataId,
            Level: _.SkillLevel,
            Reason: `子弹${_.BulletRowName}命中后对受击者应用GE添加`,
            PreMessageId: _.ContextId,
          });
        f.HasBuffTrigger(16) &&
          ((m = u.Entity.GetComponent(33)),
          (l =
            0 < e.Base.DamageId
              ? DamageById_1.configDamageById.GetConfig(e.Base.DamageId)
              : void 0),
          ((s = new ExtraEffectBaseTypes_1.RequirementPayload()).SkillId =
            Number(_.BulletInitParams.SkillId ?? -1)),
          (s.SkillGenre = m.CurrentSkill
            ? m.CurrentSkill.SkillInfo.SkillGenre
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
      if (this.GHo.AllowedEnergy) {
        for (const g of h.EnergyRecoverGeIds)
          C.AddBuff(g, {
            InstigatorId: C.CreatureDataId,
            Level: _.SkillLevel,
            PreMessageId: _.ContextId,
            Reason: `子弹${_.BulletRowName}命中后对攻击者应用能量恢复类GE`,
          });
        this.GHo.AllowedEnergy = !1;
      }
      if (h.SendGeIdToRoleInGame) {
        var E =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.CheckGetComponent(
            157,
          );
        if (E)
          for (const p of h.SendGeIdToRoleInGame)
            E.AddBuff(p, {
              InstigatorId: C.CreatureDataId,
              Level: _.SkillLevel,
              PreMessageId: _.ContextId,
              Reason: `子弹${_.BulletRowName}命中后对场上角色应用GE添加`,
            });
      }
    }
  }
  Gjo(e, i, l) {
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
      t && (this.GHo.StageInterval++, (this.GHo.AllowedEnergy = !0)),
        BulletConstant_1.BulletConstant.OpenCollisionLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            21,
            "RoleHit",
            ["BulletId", i.BulletRowName],
            ["Stage", this.GHo.StageInterval],
            ["AllowedEnergy", this.GHo.AllowedEnergy],
            ["EntityId", i.Entity.Id],
          );
    }
  }
  qjo(t) {
    var e,
      i,
      l,
      o = this._9o.AttackerActorComp;
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
  Djo(t) {
    var e, i, l, o, s;
    !t.IsContinueHit &&
      this._9o &&
      ((t = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(
        t.BulletEntityId,
      ))
        ? (this.Njo(t),
          this._9o.IsAutonomousProxy
            ? ((o = this._9o.BulletDataMain),
              (e = t.GetBulletInfo()).IsTensile
                ? (i = e.Attacker) &&
                  this.bjo(i) &&
                  !this.Ojo(i) &&
                  ((l = i.GetComponent(3)),
                  (0, RegisterComponent_1.isComponentInstance)(l, 3) &&
                    (UE.AbilitySystemBlueprintLibrary.SendGameplayEventToActor(
                      l.Actor,
                      GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                        -63529668,
                      ),
                      void 0,
                    ),
                    this._9o.Attacker) &&
                    ((l = [
                      this._9o.Attacker,
                      i,
                      this._9o.BulletInitParams.SkillId,
                      BigInt(this._9o.BulletRowName ?? -1),
                    ]),
                    SceneTeamController_1.SceneTeamController.EmitEvent(
                      i,
                      EventDefine_1.EEventName.CharLimitDodge,
                      ...l,
                    )),
                  i.GetComponent(0).GetEntityType() ===
                    Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
                    (l = this._9o.AttackerBuffComp)?.Valid &&
                    l.AddTagWithReturnHandle([-2043183300], o.Base.Duration),
                  BulletController_1.BulletController.DestroyBullet(t.Id, !1))
                : ((i =
                    0 <
                    (o.Logic.ReboundChannel &
                      e.BulletDataMain.Execution.ReboundBitMask)),
                  (l =
                    0 <
                    (this._9o.BulletDataMain.Execution.ReboundBitMask &
                      e.BulletDataMain.Logic.ReboundChannel)),
                  (o = BulletUtil_1.BulletUtil.CheckSupport(
                    e,
                    this._9o.AttackerCamp,
                  )),
                  l || i || o
                    ? ((s = e.Attacker),
                      (!o && this.Ojo(s)) ||
                        (o
                          ? t.GetComponent(13).ActionSupport(this._9o.Entity)
                          : l &&
                            0 === e.AttackerCamp &&
                            (this.VHo.ActionRebound(e),
                            BulletController_1.BulletController.DestroyBullet(
                              this._9o.BulletEntityId,
                              !1,
                            ),
                            EventSystem_1.EventSystem.EmitWithTarget(
                              e.Attacker,
                              EventDefine_1.EEventName.BulletRebound,
                              this._9o.Attacker,
                              this._9o.BulletInitParams.SkillId,
                            ))))
                    : Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Bullet",
                        21,
                        "与子弹碰撞, 无效果",
                        ["This.Id", this._9o.BulletRowName],
                        ["Other.Id", e.BulletRowName],
                        ["isSupporting", o],
                        ["rebound", l],
                        ["hitRebound", i],
                      )))
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Bullet", 21, "与子弹碰撞,但是非主控", [
                "This.Id",
                this._9o.BulletRowName,
              ]))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 21, "与子弹碰撞, 碰到的子弹已经非法", [
            "This.Id",
            this._9o.BulletRowName,
          ]));
  }
  Njo(t) {
    var e = t.GetBulletInfo(),
      i = e.BulletDataMain,
      l = this._9o.BulletDataMain;
    !l.Base.ContinuesCollision ||
      !l.TimeScale.ForceBulletTimeScaleInArea ||
      i.TimeScale.TimeScaleWithAttacker ||
      i.Base.ContinuesCollision ||
      this.GHo.BulletEntityMap.get(t) ||
      ((i = l.TimeScale.TimeScaleOnHit),
      (e = BulletUtil_1.BulletUtil.SetTimeScale(
        e,
        i.优先级,
        i.时间膨胀值,
        i.时间膨胀变化曲线,
        l.Base.Duration,
        2,
      )),
      this.GHo.BulletEntityMap.set(t, e));
  }
  Ojo(t) {
    var e = t.GetComponent(3);
    return (
      !BulletUtil_1.BulletUtil.AttackedCondition(this._9o, e) ||
      !this.kjo() ||
      !BulletHitCountUtil_1.BulletHitCountUtil.HitCountCondition(this._9o, t)
    );
  }
  Rjo(i) {
    if (this.wjo(i)) {
      var l = this._9o,
        o = l.BulletDataMain;
      if (i.EntityHandle?.Valid) {
        var s = i.Entity,
          r = BulletPool_1.BulletPool.CreateVector();
        if (i.HitResult)
          r.Set(
            i.HitResult.ImpactPointX[0],
            i.HitResult.ImpactPointY[0],
            i.HitResult.ImpactPointZ[0],
          );
        else {
          var a = i.Components,
            n = a.length;
          if (0 < n) {
            let e = 0,
              i = void 0;
            for (let t = 0; t < n; t++) {
              var h =
                BulletCollisionUtil_1.BulletCollisionUtil.CalcPartDistance(
                  a[t],
                  l,
                );
              (void 0 === i || h < e) && ((e = h), (i = t));
            }
            BulletCollisionUtil_1.BulletCollisionUtil.GetImpactPointSceneItem(
              a[i],
              l,
              r,
            );
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                21,
                "命中场景物获取不到碰撞体",
                ["bulletRowName", l.BulletRowName],
                ["SceneItemId", i.Entity.GetComponent(0).GetCreatureDataId()],
              );
        }
        var _ = s.Id,
          u = l.AttackerActorComp,
          c = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(
            this._9o.Attacker,
            o.Base.BeHitEffect,
          ),
          B =
            (GlobalData_1.GlobalData.BpEventManager.子弹命中前.Broadcast(
              l.BulletEntityId,
              _,
            ),
            l.BulletEntityId),
          m =
            0 < o.Base.DamageId
              ? DamageById_1.configDamageById.GetConfig(o.Base.DamageId)
                  .CalculateType
              : -1,
          c = new BulletTypes_1.HitInformation(
            l.Attacker,
            void 0,
            c,
            Number(l.BulletRowName),
            UE.KismetMathLibrary.TransformRotation(
              u.Actor.Mesh.K2_GetComponentToWorld(),
              o.Base.AttackDirection.ToUeRotator(),
            ),
            !1,
            void 0,
            r.ToUeVector(),
            0,
            o,
            this._9o.BulletRowName,
            o.Logic.Data,
            B,
            m,
          );
        BulletUtil_1.BulletUtil.SummonBullet(l, 1, i.Entity, !1),
          this.VHo.ActionHitObstacles(i),
          EventSystem_1.EventSystem.EmitWithTarget(
            l.Entity,
            EventDefine_1.EEventName.BulletHit,
            c,
            void 0,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BulletHit,
            c,
            void 0,
          ),
          BulletPool_1.BulletPool.RecycleVector(r),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Bullet",
              21,
              "HitSceneItem",
              ["BulletId", l.BulletRowName],
              ["EntityId", B],
              ["VitimEntityId", _],
            );
        let t = !0,
          e = IMatch_1.EBulletPenetrationType.Penetrable;
        (u = s.GetComponent(138)),
          (m =
            (e =
              u &&
              ((t = u.OnSceneItemHit(c, i)),
              void 0 === (e = u.GetPenetrationType()))
                ? IMatch_1.EBulletPenetrationType.Penetrable
                : e) === IMatch_1.EBulletPenetrationType.Penetrable
              ? o.Logic.DestroyOnHitCharacter
              : o.Logic.DestroyOnHitObstacle);
        t &&
          m &&
          BulletController_1.BulletController.DestroyBullet(
            l.BulletEntityId,
            !1,
          ),
          u ||
            ((r = s.GetComponent(0)),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Bullet",
                18,
                "子弹打中的场景物件没有SceneItemHitComponent, 需要检查碰撞通道是否规范",
                ["BulletId", l.BulletRowName],
                ["SceneItemPbDataId", r?.GetPbDataId()],
              )),
          this.GHo.ObjectsHitCurrent.set(_, Time_1.Time.Now),
          this.Gjo(o.Base.IntervalAfterHit, l, _);
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Bullet", 21, "HitSceneItem victim entity invalid", [
            "BulletId",
            l.BulletRowName,
          ]);
    }
  }
  Ujo(t) {
    var e;
    t.IsContinueHit ||
      ((e = BulletPool_1.BulletPool.CreateVector()),
      t.HitResult
        ? e.Set(
            t.HitResult.ImpactPointX[0],
            t.HitResult.ImpactPointY[0],
            t.HitResult.ImpactPointZ[0],
          )
        : e.FromUeVector(this._9o.ActorComponent.ActorLocationProxy),
      BulletUtil_1.BulletUtil.SummonBullet(this._9o, 2, t.Entity, !1),
      this.VHo.ActionHitObstacles(t),
      BulletStaticFunction_1.BulletStaticFunction.BulletHitEffect(
        this._9o,
        e.ToUeVector(),
      ),
      BulletPool_1.BulletPool.RecycleVector(e),
      this._9o.BulletDataMain.Logic.DestroyOnHitObstacle &&
        BulletController_1.BulletController.DestroyBullet(
          this._9o.BulletEntityId,
          !1,
        ));
  }
  wjo(t) {
    return !!this.kjo() && !this.GHo.ObjectsHitCurrent.has(t.Entity.Id);
  }
  kjo() {
    var t,
      e = this._9o.BulletDataMain,
      i = Math.max(0, e.Base.CollisionActiveDelay),
      e = e.Base.CollisionActiveDuration;
    return (
      (e < 0 && i <= 0) ||
      ((t = this._9o.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond),
      e < 0 ? i <= t : 0 < e && i <= t && t <= i + e)
    );
  }
}
((exports.BulletCollisionSystem = BulletCollisionSystem).gW = void 0),
  (BulletCollisionSystem.sjo = void 0),
  (BulletCollisionSystem.fW = void 0),
  (BulletCollisionSystem._jo = Transform_1.Transform.Create()),
  (BulletCollisionSystem.Ijo = void 0);
//# sourceMappingURL=BulletCollisionSystem.js.map
