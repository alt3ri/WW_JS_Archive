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
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  BulletStaticFunction_1 = require("../../Bullet/BulletStaticMethod/BulletStaticFunction"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletController_1 = require("../BulletController"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletSystemBase_1 = require("./BulletSystemBase"),
  MIN_HEIGHT_FOLLOW_TARGET = 1200;
class BulletMoveSystem extends BulletSystemBase_1.BulletSystemBase {
  constructor() {
    super(...arguments), (this.mie = 0);
  }
  OnTick(t) {
    BulletMoveSystem.gW.Start(),
      (this.mie = t / TimeUtil_1.TimeUtil.InverseMillisecond);
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
        StatDefine_1.BATTLESTAT_ENABLED &&
          BulletController_1.BulletController.GetBulletMoveTickStat(
            o.BulletRowName,
          ).Start();
        try {
          this.dXs(o, t),
            o.BulletDataMain.Execution.MovementReplaced
              ? o.ActionLogicComponent.ActionTickMovement(t)
              : (this.NWo(o),
                (l = o.Actor.CustomTimeDilation * o.Entity.TimeDilation),
                this.OWo(o, l),
                this.kWo(o, l),
                this.FWo(o),
                o.ApplyCacheLocationAndRotation()),
            o.MoveInfo.LastFramePosition.FromUeVector(
              o.ActorComponent.ActorLocationProxy,
            );
        } catch (t) {
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Bullet",
                17,
                "BulletMoveTick Error",
                t,
                ["BulletEntityId", o.BulletEntityId],
                ["BulletRowName", o.BulletRowName],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                17,
                "BulletMoveTick Error",
                ["EntityId", o.BulletEntityId],
                ["BulletRowName", o.BulletRowName],
                ["error", t],
              );
        }
        StatDefine_1.BATTLESTAT_ENABLED &&
          BulletController_1.BulletController.GetBulletMoveTickStat(
            o.BulletRowName,
          ).Stop();
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
    BulletMoveSystem.gW.Stop();
  }
  dXs(e, l) {
    if (0 !== e.CreateFrame && e.CreateFrame !== Time_1.Time.Frame) {
      var o = e.Actor,
        r = e.Entity.TimeDilation;
      let t = e.LiveTime;
      var a = e.LiveTimeRatio;
      0 < a &&
        (o?.IsValid()
          ? (t += l * o.CustomTimeDilation * r * a)
          : (t += l * r * a)),
        0 <= e.Duration &&
          ((o = e.Duration * TimeUtil_1.TimeUtil.InverseMillisecond), t > o) &&
          (t = o),
        (e.LiveTimeAddDelta = t);
    }
  }
  NWo(t) {
    var e = t.MoveInfo;
    e.BaseAdditiveAccelerate.IsZero() &&
      e.AdditiveAccelerateCurve &&
      ((t = BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
        t.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond,
        t.Duration,
        e.AdditiveAccelerateCurve,
      )),
      e.AdditiveAccelerate.Set(
        e.BaseAdditiveAccelerate.X * t.X,
        e.BaseAdditiveAccelerate.Y * t.Y,
        e.BaseAdditiveAccelerate.Z * t.Z,
      ));
  }
  OWo(t, e) {
    switch (t.BulletDataMain.Move.Trajectory) {
      case 0:
        break;
      case 2:
        this.VWo(t);
        break;
      case 1:
        this.HWo(t, e);
        break;
      case 3:
        this.jWo(t, e);
        break;
      case 5:
      case 4:
        (t.AttackerMoveComp?.IsStandardGravity ?? !0)
          ? this.wNc(t)
          : this.WWo(t);
    }
  }
  KWo(t) {
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
        break;
      case 11:
        e = this.oc1(t);
    }
    return e;
  }
  oc1(t) {
    var e = t.Target;
    if (e)
      return (e = e.GetComponent(0))?.IsRole()
        ? (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(
            e.GetPlayerId(),
            { ParamType: 2, IsControl: !0 },
          )) && e.EntityHandle?.Valid
          ? (t.SetTargetById(e.EntityHandle.Id), t.TargetActorComp)
          : void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Bullet",
                20,
                "找不到技能目标的主控角色",
                ["TeamItem", void 0 === e],
                ["TeamItemValid", e?.EntityHandle?.Valid],
              )
            )
        : t.TargetActorComp;
  }
  QWo(t) {
    var e,
      l,
      o,
      r = t.MoveInfo,
      a = this.KWo(t);
    a?.Valid &&
      ((e = BulletPool_1.BulletPool.CreateVector()),
      r.FollowTargetBottom
        ? ((l = (o = a.Entity.GetComponent(176)).ActorComp.ActorLocation),
          e.Set(
            l.X,
            l.Y,
            l.Z -
              o.GetHeightAboveGround(
                Math.min(r.MinFollowHeight, MIN_HEIGHT_FOLLOW_TARGET),
              ) -
              o.ActorComp.HalfHeight,
          ))
        : ((l = t.BulletDataMain?.Move.TrackTargetBone),
          (o = BulletUtil_1.BulletUtil.GetTargetLocation(
            a,
            FNameUtil_1.FNameUtil.GetDynamicFName(l) ??
              FNameUtil_1.FNameUtil.EMPTY,
            t,
          )),
          e.FromUeVector(o)),
      r.SpeedFollowTarget < 1
        ? (Vector_1.Vector.Lerp(
            t.ActorComponent.ActorLocationProxy,
            e,
            r.SpeedFollowTarget,
            r.LocationFollowTarget,
          ),
          t.SetActorLocation(r.LocationFollowTarget))
        : t.SetActorLocation(e),
      BulletPool_1.BulletPool.RecycleVector(e));
  }
  VWo(t) {
    var e = this.KWo(t),
      e = BulletUtil_1.BulletUtil.GetTargetLocation(e, t.SkillBoneName, t);
    e &&
      t.SetActorRotation(
        UE.KismetMathLibrary.D_FindLookAtRotation(
          t.ActorComponent.ActorLocation,
          e,
        ),
      );
  }
  HWo(e, l) {
    var o = e.BulletDataMain.Move,
      r = o.TrackParams.length;
    if (!(r < 1)) {
      var a = this.KWo(e);
      let t = void 0;
      if (1 < r) {
        r = a?.Entity?.GetComponent(176);
        if (!r?.Valid) return;
        var i = BulletPool_1.BulletPool.CreateVector(),
          _ = BulletPool_1.BulletPool.CreateVector(),
          u = o.TrackParams[1],
          u = (i.FromUeVector(u), i.Z),
          s = ((i.Z = 0), r.ActorComp),
          r =
            (MathUtils_1.MathUtils.TransformPosition(
              s.ActorLocationProxy,
              s.ActorRotationProxy,
              s.ActorScaleProxy,
              i,
              _,
            ),
            r.GetHeightAboveGround(4e3));
        s.ActorUpProxy.Multiply(r + s.ScaledHalfHeight - u, i),
          _.SubtractionEqual(i),
          (t = _.ToUeVector()),
          Info_1.Info.IsBuildDevelopmentOrDebug &&
            ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(
              e.AttackerId,
            ) &&
            UE.KismetSystemLibrary.D_DrawDebugSphere(
              GlobalData_1.GlobalData.GameInstance,
              t,
              20,
              10,
              ColorUtils_1.ColorUtils.LinearGreen,
              2,
              4,
            ),
          BulletPool_1.BulletPool.RecycleVector(i),
          BulletPool_1.BulletPool.RecycleVector(_);
      } else {
        r = e.BulletDataMain?.Move.TrackTargetBone;
        t = BulletUtil_1.BulletUtil.GetTargetLocation(
          a,
          StringUtils_1.StringUtils.IsNothing(r)
            ? e.SkillBoneName
            : FNameUtil_1.FNameUtil.GetDynamicFName(r),
          e,
        );
      }
      t &&
        (a?.Entity.GetComponent(203)?.HasTag(1008164187)
          ? e.OnTargetInValid()
          : 0 !== o.TrackParams[0].X
            ? this.XWo(e, t, l)
            : (0 === o.TrackParams[0].Y && 0 === o.TrackParams[0].Z) ||
              this.$Wo(e, t));
    }
  }
  XWo(e, l, o) {
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
        i = r.TrackParams[0].X;
      let t = 0;
      t =
        0 < r.TrackCurves.length
          ? BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
              e.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond,
              e.Duration,
              r.TrackCurves[0],
            ).X *
            this.mie *
            i
          : i * this.mie;
      (r = Math.min(a, t)),
        (i = UE.KismetMathLibrary.D_FindLookAtRotation(
          e.ActorComponent.ActorLocation,
          l,
        )),
        (l = e.MoveInfo),
        (i =
          (l.TraceRotator.Set(
            i.Pitch,
            i.Yaw,
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
        l.TraceRotator,
        (r * o) / a,
        i,
      ),
        e.SetActorRotation(i);
    }
  }
  $Wo(t, e) {
    var l = t.BulletDataMain.Move,
      o = l.TrackParams[0].Y,
      r = l.TrackParams[0].Z,
      a = t.ActorComponent,
      e = UE.KismetMathLibrary.D_FindLookAtRotation(a.ActorLocation, e),
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
        ((e = BulletStaticFunction_1.BulletStaticFunction.CompCurveVector(
          t.LiveTime / TimeUtil_1.TimeUtil.InverseMillisecond,
          t.Duration,
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
  jWo(t, e) {
    var l = t.MoveInfo,
      o = BulletPool_1.BulletPool.CreateVector(),
      r = t.BulletDataMain.Move,
      e =
        (r.Speed * this.mie * e * MathCommon_1.MathCommon.RadToDeg) /
        r.TrackParams[0].X,
      a = BulletPool_1.BulletPool.CreateVector(),
      i =
        (a.FromUeVector(l.RoundCenter), BulletPool_1.BulletPool.CreateVector()),
      _ = 1 < r.TrackParams.length ? r.TrackParams[1] : void 0;
    const u = t.AttackerMoveComp?.IsStandardGravity ?? !0;
    if (_) {
      var s = r.TrackParams[0],
        n =
          (0 === r.TrackTarget || 10 === r.TrackTarget
            ? (n = BulletUtil_1.BulletUtil.GetCurrentRole(t))?.Valid
              ? BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(
                  s,
                  _,
                  l.RoundOnceAxis,
                  o,
                  n,
                  u ? void 0 : t.AttackerMoveComp.GravityUp,
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Bullet",
                  20,
                  "围绕中心旋转子弹获取不到当前玩家控制的角色",
                  ["Id", t.BulletRowName],
                  ["Attacker", t.AttackerActorComp.Actor.GetName()],
                )
            : (n = this.KWo(t))?.Valid
              ? BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(
                  s,
                  _,
                  l.RoundOnceAxis,
                  o,
                  n,
                  u ? void 0 : t.AttackerMoveComp.GravityUp,
                )
              : BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(
                  s,
                  _,
                  l.RoundOnceAxis,
                  o,
                  void 0,
                  u ? void 0 : t.AttackerMoveComp.GravityUp,
                ),
          (l.AroundAngle += e),
          o.RotateAngleAxis(l.AroundAngle, l.RoundOnceAxis, i),
          i.MultiplyEqual(s.X),
          a.AdditionEqual(i),
          o.RotateAngleAxis(l.AroundAngle + 90, l.RoundOnceAxis, i),
          BulletPool_1.BulletPool.CreateRotator());
      MathUtils_1.MathUtils.LookRotationUpFirst(i, l.RoundOnceAxis, n),
        t.SetActorRotation(n),
        BulletPool_1.BulletPool.RecycleRotator(n);
    } else {
      o.FromUeVector(t.ActorComponent.ActorLocationProxy),
        o.SubtractionEqual(l.RoundCenter),
        o.RotateAngleAxis(e, l.RoundOnceAxis, i),
        a.AdditionEqual(i);
      const u = t.AttackerMoveComp?.IsStandardGravity ?? !0;
      u
        ? t.SetActorRotation(
            UE.KismetMathLibrary.D_FindLookAtRotation(
              t.ActorComponent.ActorLocation,
              a.ToUeVector(),
            ),
          )
        : ((_ = BulletPool_1.BulletPool.CreateVector()).FromUeVector(
            t.GetActorLocation(),
          ),
          _.SubtractionEqual(l.RoundCenter),
          _.Normalize(),
          (s = BulletPool_1.BulletPool.CreateRotator()),
          MathUtils_1.MathUtils.LookRotationUpFirst(_, l.RoundOnceAxis, s),
          t.SetActorRotation(s),
          BulletPool_1.BulletPool.RecycleRotator(s),
          BulletPool_1.BulletPool.RecycleVector(_));
    }
    0 !== r.TrackTarget &&
      10 !== r.TrackTarget &&
      (n = this.KWo(t)?.Entity) &&
      ((e = BulletPool_1.BulletPool.CreateVector()),
      t.SetTargetById(n.Id),
      this.YWo(t, t.TargetActorComp, e),
      a.AdditionEqual(e),
      l.RoundCenter.AdditionEqual(e),
      BulletPool_1.BulletPool.RecycleVector(e)),
      t.SetActorLocation(a),
      BulletPool_1.BulletPool.RecycleVector(o),
      BulletPool_1.BulletPool.RecycleVector(a),
      BulletPool_1.BulletPool.RecycleVector(i);
  }
  YWo(t, e, l) {
    (e = e.ActorLocationProxy), l.FromUeVector(e), (t = t.MoveInfo);
    l.SubtractionEqual(t.RoundCenterLastLocation),
      t.RoundCenterLastLocation.FromUeVector(e);
  }
  WWo(t) {
    var e,
      l,
      o,
      r,
      a,
      i = t.BulletDataMain.Move.TrackParams;
    !i ||
      i.length < 2 ||
      (((i = t.MoveInfo).BulletSpeedZ += i.Gravity * this.mie),
      (i.BulletSpeed = Math.sqrt(
        Math.pow(i.BulletSpeed2D, 2) + Math.pow(i.BulletSpeedZ, 2),
      )),
      (e = BulletPool_1.BulletPool.CreateVector()),
      (l = BulletPool_1.BulletPool.CreateVector()),
      i.GravityMoveForward.Multiply(i.BulletSpeed2D, e),
      (t.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy).Multiply(
        i.BulletSpeedZ,
        l,
      ),
      e.AdditionEqual(l),
      e.Normalize(),
      (o = i.GravityMoveRotator),
      e.Rotation(o),
      (r = t.BulletDataMain.Move).InitVelocityRot.IsNearlyZero() ||
        ((a = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(o),
        MathUtils_1.MathUtils.ComposeRotator(r.InitVelocityRot, a, o),
        BulletPool_1.BulletPool.RecycleRotator(a)),
      BulletPool_1.BulletPool.RecycleVector(e),
      BulletPool_1.BulletPool.RecycleVector(l),
      i.ActorRotateParabola && t.SetActorRotation(i.GravityMoveRotator));
  }
  wNc(t) {
    var e,
      l = t.BulletDataMain.Move.TrackParams;
    !l ||
      l.length < 2 ||
      (((l = t.MoveInfo).BulletSpeedZ += l.Gravity * this.mie),
      (l.BulletSpeed = Math.sqrt(
        Math.pow(l.BulletSpeed2D, 2) + Math.pow(l.BulletSpeedZ, 2),
      )),
      (e = l.GravityMoveRotator).Set(
        Math.atan(l.BulletSpeedZ / l.BulletSpeed2D) *
          MathCommon_1.MathCommon.RadToDeg,
        e.Yaw,
        e.Roll,
      ),
      l.ActorRotateParabola && t.SetActorRotation(e));
  }
  kWo(t, e) {
    var l = t.MoveInfo,
      o = t.BulletDataMain.Move;
    let r = 0,
      a =
        ((r = o.SpeedCurve
          ? (Info_1.Info.IsBuildDevelopmentOrDebug &&
              !o.SpeedCurve.IsValid() &&
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "Obj Refs Name=DelayBulletSpeed",
              ),
            BulletStaticFunction_1.BulletStaticFunction.CompCurveFloat(
              t.LiveTime * MathUtils_1.MathUtils.MillisecondToSecond,
              t.Duration,
              o.SpeedCurve,
            ) * l.BulletSpeed)
          : l.BulletSpeed),
        t.Duration);
    var i,
      _,
      u,
      s = BulletPool_1.BulletPool.CreateVector();
    switch (o.Trajectory) {
      case 2:
        0 < o.TrackParams.length &&
          0 < o.TrackParams[0].X &&
          (a = o.TrackParams[0].X);
        var n,
          B,
          h = BulletUtil_1.BulletUtil.GetTargetLocation(
            t.TargetActorComp,
            t.SkillBoneName,
            t,
          );
        h
          ? ((n =
              a -
              (Time_1.Time.WorldTime - t.GenerateTime) /
                TimeUtil_1.TimeUtil.InverseMillisecond),
            (n = MathUtils_1.MathUtils.IsNearlyZero(
              n,
              MathCommon_1.MathCommon.KindaSmallNumber,
            )
              ? MathCommon_1.MathCommon.KindaSmallNumber
              : n),
            (B = BulletPool_1.BulletPool.CreateVector()).FromUeVector(h),
            (r =
              Vector_1.Vector.Dist(t.ActorComponent.ActorLocationProxy, B) / n),
            BulletPool_1.BulletPool.RecycleVector(B),
            r < o.Speed && (r = o.Speed),
            l.UpdateDirVector.Set(r * this.mie * e, 0, 0),
            t.ActorRotateVector(l.UpdateDirVector, s))
          : ((r = l.BulletSpeed),
            l.BeginSpeedRotator.Vector(s),
            s.MultiplyEqual(r * this.mie * e));
        break;
      case 5:
      case 4:
        l.GravityMoveRotator.Quaternion().RotateVector(
          Vector_1.Vector.ForwardVectorProxy,
          s,
        ),
          s.MultiplyEqual(r * this.mie * e);
        break;
      case 1:
        t.GetActorForward(s), s.MultiplyEqual(r * this.mie * e);
        break;
      case 3:
        return void BulletPool_1.BulletPool.RecycleVector(s);
      case 6:
        return this.QWo(t), void BulletPool_1.BulletPool.RecycleVector(s);
      default:
        l.BeginSpeedRotator.Vector(s), s.MultiplyEqual(r * this.mie * e);
    }
    s.MultiplyEqual(l.BulletSpeedRatio),
      l.BaseAdditiveAccelerate.IsZero() ||
        ((i = BulletPool_1.BulletPool.CreateVector()),
        l.V0.Multiply(this.mie, i),
        (_ = BulletPool_1.BulletPool.CreateVector()),
        l.AdditiveAccelerate.Multiply(0.5 * this.mie * this.mie, _),
        i.AdditionEqual(_),
        s.AdditionEqual(i),
        (u = BulletPool_1.BulletPool.CreateVector()),
        l.AdditiveAccelerate.Multiply(this.mie, u),
        l.V0.AdditionEqual(u),
        BulletPool_1.BulletPool.RecycleVector(i),
        BulletPool_1.BulletPool.RecycleVector(_),
        BulletPool_1.BulletPool.RecycleVector(u)),
      l.BulletSpeedDir.FromUeVector(s),
      this.JWo(t, s),
      BulletConstant_1.BulletConstant.OpenMoveLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Bullet",
          20,
          "OnTickMove",
          ["Bullet", t.BulletRowName],
          ["finalDirMove", s],
          ["Location", t.GetActorLocation()],
        ),
      BulletPool_1.BulletPool.RecycleVector(s),
      this.zWo(t, l, o.TrackTarget);
  }
  zWo(t, e, l) {
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
  JWo(t, e) {
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
  FWo(t) {
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
            20,
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
            ((r = Protocol_1.Aki.Protocol.Ce_.create()).Ajn = {
              K8n: void 0,
              uVn: l,
              CVn: MathUtils_1.MathUtils.NumberToLong(o),
            }),
            CombatMessage_1.CombatNet.Send(24809, t.Attacker, r),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Bullet",
              20,
              "修改子弹目标请求",
              ["新的目标id", e],
              ["CreatureId", o],
            ),
          (t.TargetIdLast = e)));
  }
}
(exports.BulletMoveSystem = BulletMoveSystem).gW =
  Stats_1.Stat.Create("BulletMoveTick");
//# sourceMappingURL=BulletMoveSystem.js.map
