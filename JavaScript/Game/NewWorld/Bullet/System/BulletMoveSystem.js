"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletMoveSystem = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  PerformanceController_1 = require("../../../../Core/Performance/PerformanceController"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  StatDefine_1 = require("../../../Common/StatDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
  BulletStaticFunction_1 = require("../../Bullet/BulletStaticMethod/BulletStaticFunction"),
  BulletController_1 = require("../BulletController"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletSystemBase_1 = require("./BulletSystemBase");
class BulletMoveSystem extends BulletSystemBase_1.BulletSystemBase {
  constructor() {
    super(...arguments), (this.mie = 0);
  }
  OnTick(t) {
    this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond;
    let e = 0;
    for (const r of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        (e = cpp_1.KuroTime.GetMilliseconds64());
      var l,
        o = r.GetBulletInfo();
      if (!o.NeedDestroy && o.IsInit && !o.IsFrozen) {
        if (!BulletUtil_1.BulletUtil.CheckBulletAttackerExist(o)) {
          BulletController_1.BulletController.DestroyBullet(
            o.BulletEntityId,
            !1,
          );
          continue;
        }
        StatDefine_1.BATTLESTAT_ENABLED;
        try {
          o.BulletDataMain.Execution.MovementReplaced
            ? o.ActionLogicComponent.ActionTickMovement(t)
            : (this.Fjo(o),
              (l = o.Actor.CustomTimeDilation * o.Entity.TimeDilation),
              this.Vjo(o, l),
              this.Hjo(o, l),
              this.jjo(o),
              o.ApplyCacheLocationAndRotation()),
            o.MoveInfo.LastFramePosition.FromUeVector(
              o.ActorComponent.ActorLocationProxy,
            );
        } catch (t) {
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Bullet",
                18,
                "BulletMoveTick Error",
                t,
                ["BulletEntityId", o.BulletEntityId],
                ["BulletRowName", o.BulletRowName],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                18,
                "BulletMoveTick Error",
                ["EntityId", o.BulletEntityId],
                ["BulletRowName", o.BulletRowName],
                ["error", t],
              );
        }
        StatDefine_1.BATTLESTAT_ENABLED;
      }
      PerformanceController_1.PerformanceController
        .IsEntityTickPerformanceTest &&
        PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
          "Bullet",
          !0,
          cpp_1.KuroTime.GetMilliseconds64() - e,
          1,
          o.BornFrameCount,
        );
    }
  }
  Fjo(t) {
    var e,
      l = t.MoveInfo;
    l.BaseAdditiveAccelerate.IsZero() &&
      l.AdditiveAccelerateCurve &&
      ((e = t.BulletDataMain.Base),
      (t = BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
        t.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond,
        e.Duration,
        l.AdditiveAccelerateCurve,
      )),
      l.AdditiveAccelerate.Set(
        l.BaseAdditiveAccelerate.X * t.X,
        l.BaseAdditiveAccelerate.Y * t.Y,
        l.BaseAdditiveAccelerate.Z * t.Z,
      ));
  }
  Vjo(t, e) {
    switch (t.BulletDataMain.Move.Trajectory) {
      case 0:
        break;
      case 2:
        this.Wjo(t);
        break;
      case 1:
        this.Kjo(t, e);
        break;
      case 3:
        this.Qjo(t, e);
        break;
      case 5:
      case 4:
        this.Xjo(t);
    }
  }
  $jo(t) {
    let e = void 0;
    switch (t.BulletDataMain.Move.TrackTarget) {
      case 6:
      case 2:
      case 7:
      case 8:
      case 5:
      case 9:
      case 4:
        e = t.TargetActorComp;
        break;
      case 1:
        e = BulletUtil_1.BulletUtil.GetCurrentRole(t);
        break;
      case 3:
        if (t.BulletInitParams.FromRemote) return t.TargetActorComp;
        (e = t.GetLockOnTargetDynamic()),
          this.OnChangeTargetRequest(t, e?.Entity ? e?.Entity.Id : -1);
    }
    return e;
  }
  Yjo(t) {
    var e,
      l,
      o = t.MoveInfo,
      r = this.$jo(t);
    r?.Valid &&
      ((e = (r = r.Entity.GetComponent(161)).ActorComp.ActorLocation),
      (l = BulletPool_1.BulletPool.CreateVector()).Set(
        e.X,
        e.Y,
        e.Z -
          Math.min(r.GetHeightAboveGround(), o.MinFollowHeight) -
          r.ActorComp.HalfHeight,
      ),
      o.SpeedFollowTarget < 1
        ? (Vector_1.Vector.Lerp(
            t.ActorComponent.ActorLocationProxy,
            l,
            o.SpeedFollowTarget,
            o.LocationFollowTarget,
          ),
          t.SetActorLocation(o.LocationFollowTarget))
        : t.SetActorLocation(l),
      BulletPool_1.BulletPool.RecycleVector(l));
  }
  Wjo(t) {
    var e = this.$jo(t),
      e = BulletUtil_1.BulletUtil.GetTargetLocation(e, t.SkillBoneName, t);
    e &&
      t.SetActorRotation(
        UE.KismetMathLibrary.FindLookAtRotation(
          t.ActorComponent.ActorLocation,
          e,
        ),
      );
  }
  Kjo(t, e) {
    var l = this.$jo(t),
      o = t.BulletDataMain?.Move.TrackTargetBone,
      o = BulletUtil_1.BulletUtil.GetTargetLocation(
        l,
        StringUtils_1.StringUtils.IsNothing(o)
          ? t.SkillBoneName
          : FNameUtil_1.FNameUtil.GetDynamicFName(o),
        t,
      );
    o &&
      (l?.Entity.GetComponent(185)?.HasTag(1008164187)
        ? t.OnTargetInValid()
        : (l = t.BulletDataMain.Move).TrackParams.length <= 0 ||
          (0 !== l.TrackParams[0].X
            ? this.Jjo(t, o, e)
            : (0 === l.TrackParams[0].Y && 0 === l.TrackParams[0].Z) ||
              this.zjo(t, o)));
  }
  Jjo(e, l, o) {
    var r = BulletPool_1.BulletPool.CreateVector(),
      a =
        (r.FromUeVector(l),
        r.SubtractionEqual(e.ActorComponent.ActorLocationProxy),
        r.Normalize(MathCommon_1.MathCommon.KindaSmallNumber),
        Vector_1.Vector.DotProduct(r, e.ActorComponent.ActorForwardProxy)),
      a = Math.acos(a) * MathCommon_1.MathCommon.RadToDeg;
    BulletPool_1.BulletPool.RecycleVector(r);
    if (!(a <= 0)) {
      var r = e.BulletDataMain.Move,
        i = e.BulletDataMain.Base,
        _ = r.TrackParams[0].X;
      let t = 0;
      t =
        0 < r.TrackCurves.length
          ? BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
              e.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond,
              i.Duration,
              r.TrackCurves[0],
            ).X *
            this.mie *
            _
          : _ * this.mie;
      (i = Math.min(a, t)),
        (r = UE.KismetMathLibrary.FindLookAtRotation(
          e.ActorComponent.ActorLocation,
          l,
        )),
        (_ = e.MoveInfo),
        (l =
          (_.TraceRotator.Set(
            r.Pitch,
            r.Yaw,
            e.ActorComponent.ActorRotation.Roll,
          ),
          (a = MathUtils_1.MathUtils.IsNearlyZero(
            a,
            MathCommon_1.MathCommon.KindaSmallNumber,
          )
            ? MathCommon_1.MathCommon.KindaSmallNumber
            : a),
          Rotator_1.Rotator.Create()));
      Rotator_1.Rotator.Lerp(
        e.ActorComponent.ActorRotationProxy,
        _.TraceRotator,
        (i * o) / a,
        l,
      ),
        e.SetActorRotation(l);
    }
  }
  zjo(t, e) {
    var l = t.BulletDataMain.Move,
      o = l.TrackParams[0].Y,
      r = l.TrackParams[0].Z,
      a = t.ActorComponent,
      e = UE.KismetMathLibrary.FindLookAtRotation(a.ActorLocation, e),
      i = e.Pitch - a.ActorRotationProxy.Pitch;
    let _ = e.Yaw - a.ActorRotationProxy.Yaw,
      u =
        (Math.abs(_) > MathCommon_1.MathCommon.FlatAngle &&
          (_ =
            (2 * MathCommon_1.MathCommon.FlatAngle - Math.abs(_)) *
            Math.sign(_) *
            -1),
        0),
      s = 0;
    (s = Math.abs(_) > r * this.mie ? r * this.mie * Math.sign(_) : _),
      0 < l.TrackCurves.length &&
        ((e = t.BulletDataMain.Base),
        (e = BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
          t.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond,
          e.Duration,
          l.TrackCurves[0],
        )),
        (s = e.Z * this.mie * r * Math.sign(_)),
        (u = e.Y * this.mie * o * Math.sign(i))),
      (u = Math.abs(i) > o * this.mie ? o * this.mie * Math.sign(i) : i),
      Math.abs(s) > Math.abs(_) && (s = _),
      Math.abs(u) > Math.abs(i) && (u = i);
    (l = a.ActorRotationProxy), (r = t.MoveInfo);
    r.TraceRotator.Set(l.Pitch + u, l.Yaw + s, l.Roll),
      t.SetActorRotation(r.TraceRotator);
  }
  Qjo(t, e) {
    var l = t.MoveInfo,
      o = BulletPool_1.BulletPool.CreateVector(),
      r =
        (o.FromUeVector(t.ActorComponent.ActorLocationProxy),
        o.SubtractionEqual(l.RoundCenter),
        t.BulletDataMain.Move),
      e =
        (r.Speed * this.mie * e * MathCommon_1.MathCommon.RadToDeg) /
        r.TrackParams[0].X,
      a = BulletPool_1.BulletPool.CreateVector(),
      i =
        (a.FromUeVector(l.RoundCenter), BulletPool_1.BulletPool.CreateVector());
    o.RotateAngleAxis(e, l.RoundOnceAxis, i),
      a.AdditionEqual(i),
      t.SetActorRotation(
        UE.KismetMathLibrary.FindLookAtRotation(
          t.ActorComponent.ActorLocation,
          a.ToUeVector(),
        ),
      ),
      0 !== r.TrackTarget &&
        10 !== r.TrackTarget &&
        (e = this.$jo(t)?.Entity) &&
        ((r = BulletPool_1.BulletPool.CreateVector()),
        t.SetTargetById(e.Id),
        this.Zjo(t, t.TargetActorComp, r),
        a.AdditionEqual(r),
        l.RoundCenter.AdditionEqual(r),
        BulletPool_1.BulletPool.RecycleVector(r)),
      t.SetActorLocation(a),
      BulletPool_1.BulletPool.RecycleVector(o),
      BulletPool_1.BulletPool.RecycleVector(a),
      BulletPool_1.BulletPool.RecycleVector(i);
  }
  Zjo(t, e, l) {
    (e = e.ActorLocationProxy), l.FromUeVector(e), (t = t.MoveInfo);
    l.SubtractionEqual(t.RoundCenterLastLocation),
      t.RoundCenterLastLocation.FromUeVector(e);
  }
  Xjo(t) {
    var e = t.BulletDataMain.Move.TrackParams;
    !e ||
      e.length < 2 ||
      (((e = t.MoveInfo).BulletSpeedZ += e.Gravity * this.mie),
      (e.BulletSpeed = Math.sqrt(
        Math.pow(e.BulletSpeed2D, 2) + Math.pow(e.BulletSpeedZ, 2),
      )),
      (t = e.GravityMoveRotator).Set(
        Math.atan(e.BulletSpeedZ / e.BulletSpeed2D) *
          MathCommon_1.MathCommon.RadToDeg,
        t.Yaw,
        t.Roll,
      ));
  }
  Hjo(t, e) {
    var l = t.MoveInfo,
      o = t.BulletDataMain.Move,
      r = t.BulletDataMain.Base;
    let a = 0,
      i =
        ((a = o.SpeedCurve
          ? (Info_1.Info.IsBuildDevelopmentOrDebug &&
              !o.SpeedCurve.IsValid() &&
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "Obj Refs Name=DelayBulletSpeed",
              ),
            BulletStaticFunction_1.BulletStaticFunction.CompCurveFloat(
              t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond,
              r.Duration,
              o.SpeedCurve,
            ) * l.BulletSpeed)
          : l.BulletSpeed),
        r.Duration);
    var _,
      u,
      s = BulletPool_1.BulletPool.CreateVector();
    switch (o.Trajectory) {
      case 2:
        0 < o.TrackParams.length &&
          0 < o.TrackParams[0].X &&
          (i = o.TrackParams[0].X);
        var n,
          h,
          c = BulletUtil_1.BulletUtil.GetTargetLocation(
            t.TargetActorComp,
            t.SkillBoneName,
            t,
          );
        c
          ? ((n =
              i -
              (Time_1.Time.WorldTime - t.GenerateTime) /
                TimeUtil_1.TimeUtil.InverseMillisecond),
            (n = MathUtils_1.MathUtils.IsNearlyZero(
              n,
              MathCommon_1.MathCommon.KindaSmallNumber,
            )
              ? MathCommon_1.MathCommon.KindaSmallNumber
              : n),
            (h = BulletPool_1.BulletPool.CreateVector()).FromUeVector(c),
            (a =
              Vector_1.Vector.Dist(t.ActorComponent.ActorLocationProxy, h) / n),
            BulletPool_1.BulletPool.RecycleVector(h),
            a < o.Speed && (a = o.Speed),
            l.UpdateDirVector.Set(a * this.mie * e, 0, 0),
            t.ActorRotateVector(l.UpdateDirVector, s))
          : ((a = l.BulletSpeed),
            l.BeginSpeedRotator.Vector(s),
            s.MultiplyEqual(a * this.mie * e));
        break;
      case 5:
      case 4:
        l.GravityMoveRotator.Quaternion().RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          s,
        ),
          s.MultiplyEqual(a * this.mie * e);
        break;
      case 1:
        t.GetActorForward(s), s.MultiplyEqual(a * this.mie * e);
        break;
      case 3:
        return void BulletPool_1.BulletPool.RecycleVector(s);
      case 6:
        return this.Yjo(t), void BulletPool_1.BulletPool.RecycleVector(s);
      default:
        l.BeginSpeedRotator.Vector(s), s.MultiplyEqual(a * this.mie * e);
    }
    s.MultiplyEqual(l.BulletSpeedRatio),
      l.BaseAdditiveAccelerate.IsZero() ||
        ((r = BulletPool_1.BulletPool.CreateVector()),
        l.V0.Multiply(this.mie, r),
        (_ = BulletPool_1.BulletPool.CreateVector()),
        l.AdditiveAccelerate.Multiply(0.5 * this.mie * this.mie, _),
        r.AdditionEqual(_),
        s.AdditionEqual(r),
        (u = BulletPool_1.BulletPool.CreateVector()),
        l.AdditiveAccelerate.Multiply(this.mie, u),
        l.V0.AdditionEqual(u),
        BulletPool_1.BulletPool.RecycleVector(r),
        BulletPool_1.BulletPool.RecycleVector(_),
        BulletPool_1.BulletPool.RecycleVector(u)),
      l.BulletSpeedDir.FromUeVector(s),
      this.eWo(t, s),
      BulletPool_1.BulletPool.RecycleVector(s),
      this.tWo(t, l, o.TrackTarget);
  }
  tWo(t, e, l) {
    10 === l &&
      ((l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
        BulletUtil_1.BulletUtil.GetTargetLocation(
          void 0,
          FNameUtil_1.FNameUtil.NONE,
          t,
        ),
      ),
      (e = e.BulletSpeedDir.SizeSquared()),
      Vector_1.Vector.DistSquared(t.GetActorLocation(), l) < e &&
        ((t.IsTimeNotEnough = !0),
        t?.SetActorLocation(l),
        BulletController_1.BulletController.DestroyBullet(
          t.BulletEntityId,
          !1,
        )),
      BulletPool_1.BulletPool.RecycleVector(l));
  }
  eWo(t, e) {
    var l,
      o = t.MoveInfo;
    o.IsOnBaseMovement &&
      ((l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
        o.LastBaseMovementSpeed,
      ),
      l.MultiplyEqual(this.mie),
      e.AdditionEqual(l),
      BulletPool_1.BulletPool.RecycleVector(l)),
      e.Equals(Vector_1.Vector.ZeroVectorProxy) ||
        ((o = BulletPool_1.BulletPool.CreateVector()),
        t.ActorComponent.ActorLocationProxy.Addition(e, o),
        t.SetActorLocation(o),
        BulletPool_1.BulletPool.RecycleVector(o));
  }
  jjo(t) {
    var e,
      l = t.BulletDataMain.Move,
      o = l.FollowType;
    (0 !== o && 3 !== o) ||
      ((o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
        l.FollowSkeletonRotLimit,
      ),
      o.IsZero()
        ? BulletPool_1.BulletPool.RecycleVector(o)
        : ((l = t.MoveInfo),
          (e = t.ActorComponent.ActorRotationProxy),
          o.X < 1
            ? (l.FollowBoneBulletRotator.Roll = e.Roll)
            : (l.FollowBoneBulletRotator.Roll = 0),
          o.Y < 1
            ? (l.FollowBoneBulletRotator.Pitch = e.Pitch)
            : (l.FollowBoneBulletRotator.Pitch = 0),
          o.Z < 1
            ? (l.FollowBoneBulletRotator.Yaw = e.Yaw)
            : (l.FollowBoneBulletRotator.Yaw =
                t.AttackerActorComp.ActorRotationProxy.Yaw),
          BulletPool_1.BulletPool.RecycleVector(o),
          t.SetActorRotation(l.FollowBoneBulletRotator)));
  }
  OnChangeTargetRequest(t, e) {
    var l, o, r;
    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      !t.BulletInitParams.FromRemote &&
      (1 !== t.BulletDataMain.Base.SyncType
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            21,
            "动态改变目标的子弹必须设置 基础设置.网络同步类型 为 网络同步子弹",
            ["BulletId", t.BulletRowName],
            ["Attacker", t.AttackerActorComp?.Actor?.GetName()],
          )
        : (t.TargetIdLast !== e &&
            ((l = ModelManager_1.ModelManager.BulletModel.GetBulletHandleById(
              t.BulletEntityId,
            )),
            (o =
              ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e)),
            ((r = Protocol_1.Aki.Protocol.aNn.create()).VVn = {
              r4n: void 0,
              E4n: l,
              L4n: MathUtils_1.MathUtils.NumberToLong(o),
            }),
            CombatMessage_1.CombatNet.Call(15723, t.Attacker, r),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Bullet",
              21,
              "修改子弹目标请求",
              ["新的目标id", e],
              ["CreatureId", o],
            ),
          (t.TargetIdLast = e)));
  }
}
(exports.BulletMoveSystem = BulletMoveSystem).gW = void 0;
//# sourceMappingURL=BulletMoveSystem.js.map
